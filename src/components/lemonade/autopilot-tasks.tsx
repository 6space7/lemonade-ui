"use client"

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Folder,
  GripVertical,
  List,
  Plus,
  SlidersHorizontal,
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type AutopilotTask = {
  id: string
  title: string
  completed?: boolean
}

export type AutopilotSidebarItem = {
  id: string
  label: string
  kind?: "folder" | "list"
  parentFolderId?: string
  title?: string
  tasks?: AutopilotTask[]
  disabled?: boolean
}

export type AutopilotFilterMode = "all" | "open" | "done"
export type AutopilotFilterLabels = Record<AutopilotFilterMode, string>
export type AutopilotEmptyTaskLabels = Record<AutopilotFilterMode, string>

export type AutopilotTasksProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  title?: string
  tasks?: AutopilotTask[]
  sidebarItems?: AutopilotSidebarItem[]
  activeSidebarItemId?: string
  defaultActiveSidebarItemId?: string
  defaultSidebarCollapsed?: boolean
  sidebarCollapsed?: boolean
  defaultFilterMode?: AutopilotFilterMode
  addTaskPlaceholder?: string
  newTaskPlaceholder?: string
  newSidebarItemLabel?: string
  newFolderLabel?: string
  emptyFolderLabel?: string
  filterLabels?: Partial<AutopilotFilterLabels>
  emptyTaskLabels?: Partial<AutopilotEmptyTaskLabels>
  taskFoldersLabel?: string
  taskListLabel?: (title: string) => string
  createSidebarItemAriaLabel?: string
  createFolderAriaLabel?: string
  filterButtonLabel?: string
  filterMenuLabel?: string
  collapseSidebarLabel?: string
  expandSidebarLabel?: string
  renameNoteLabel?: string
  newTaskInputLabel?: string
  onFilterChange?: (mode: AutopilotFilterMode) => void
  onFolderCreate?: (folder: AutopilotSidebarItem) => void
  onSidebarItemCreate?: (item: AutopilotSidebarItem) => void
  onSidebarItemMove?: (
    item: AutopilotSidebarItem,
    from: AutopilotSidebarItem | undefined,
    to: AutopilotSidebarItem
  ) => void
  onSidebarItemRename?: (item: AutopilotSidebarItem, label: string) => void
  onSidebarCollapsedChange?: (collapsed: boolean) => void
  onSidebarChange?: (item: AutopilotSidebarItem) => void
  onTaskCreate?: (task: AutopilotTask, list: AutopilotSidebarItem | undefined) => void
  onTaskMove?: (
    task: AutopilotTask,
    from: AutopilotSidebarItem | undefined,
    to: AutopilotSidebarItem
  ) => void
  onTaskToggle?: (task: AutopilotTask, completed: boolean) => void
}

type DraggedSidebarItem = {
  itemId: string
  itemLabel: string
}

type DragPosition = {
  x: number
  y: number
}

const defaultTasks: AutopilotTask[] = [
  { id: "llama", title: "Master the art of speaking llama language." },
  { id: "everest", title: "Conquer Mount Everest using a pogo stick." },
  { id: "cake", title: "Bake a cake made entirely of rainbows and unicorns." },
]

const defaultSidebarItems: AutopilotSidebarItem[] = [
  {
    id: "priority",
    label: "Priority",
    kind: "folder",
    tasks: [
      { id: "priority-launch", title: "Trim the launch notes into three crisp bullets." },
      { id: "priority-design", title: "Pick the calmer sidebar opacity before noon." },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    kind: "folder",
    tasks: [
      { id: "projects-board", title: "Sketch the new project board empty state." },
      { id: "projects-handoff", title: "Send component usage notes to engineering." },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    kind: "folder",
    tasks: [
      { id: "personal-tea", title: "Buy the dramatic tea that smells like rain." },
      { id: "personal-book", title: "Read one chapter without checking notifications." },
    ],
  },
  {
    id: "work",
    label: "Work",
    kind: "folder",
    tasks: [
      { id: "work-review", title: "Review the dashboard copy with fresh eyes." },
      { id: "work-inbox", title: "Answer the two emails that keep orbiting your brain." },
    ],
  },
  { id: "today", label: "Today", kind: "list", tasks: defaultTasks },
  {
    id: "next-week",
    label: "Next Week",
    kind: "list",
    tasks: [
      { id: "next-roadmap", title: "Draft the tiny roadmap that makes the big one less scary." },
      { id: "next-demo", title: "Record a quiet demo pass for the new workflow." },
    ],
  },
  {
    id: "brand",
    label: "New brand Identity",
    kind: "list",
    tasks: [
      { id: "brand-grid", title: "Test the identity grid against the soft glass surface." },
      { id: "brand-type", title: "Choose a headline weight that does not shout." },
    ],
  },
  {
    id: "share",
    label: "Share your work",
    kind: "list",
    tasks: [
      { id: "share-shot", title: "Crop the preview for a better first glance." },
      { id: "share-caption", title: "Write a caption that sounds like a human made it." },
    ],
  },
]

const defaultFilterLabels: AutopilotFilterLabels = {
  all: "All",
  open: "Open",
  done: "Done",
}

const filterOptions: AutopilotFilterMode[] = ["all", "open", "done"]

export function AutopilotTasks({
  title = "Today",
  tasks = defaultTasks,
  sidebarItems = defaultSidebarItems,
  activeSidebarItemId,
  defaultActiveSidebarItemId,
  defaultSidebarCollapsed = false,
  sidebarCollapsed,
  defaultFilterMode = "all",
  addTaskPlaceholder = "Add a task...",
  newTaskPlaceholder = "Type a task and press Enter",
  newSidebarItemLabel = "New Task",
  newFolderLabel = "New Folder",
  emptyFolderLabel = "Empty folder",
  filterLabels,
  emptyTaskLabels,
  taskFoldersLabel = "Task folders",
  taskListLabel,
  createSidebarItemAriaLabel = "Create task",
  createFolderAriaLabel = "Create folder",
  filterButtonLabel = "Filter tasks",
  filterMenuLabel = "Task filters",
  collapseSidebarLabel = "Collapse sidebar",
  expandSidebarLabel = "Expand sidebar",
  renameNoteLabel = "Rename note",
  newTaskInputLabel,
  onFilterChange,
  onFolderCreate,
  onSidebarItemCreate,
  onSidebarItemMove,
  onSidebarItemRename,
  onSidebarCollapsedChange,
  onSidebarChange,
  onTaskCreate,
  onTaskMove: _onTaskMove,
  onTaskToggle,
  className,
  "aria-label": ariaLabel,
  ...props
}: AutopilotTasksProps) {
  const rootRef = useRef<HTMLElement>(null)
  const filterMenuRef = useRef<HTMLDivElement>(null)
  const cancelTaskInputRef = useRef(false)
  const skipTaskBlurRef = useRef(false)
  const draggedSidebarItemRef = useRef<DraggedSidebarItem | null>(null)
  const skipSidebarClickRef = useRef(false)
  const nextFolderIdRef = useRef(1)
  const nextSidebarItemIdRef = useRef(1)
  const nextTaskIdRef = useRef(1)
  void _onTaskMove
  const reducedMotion = usePrefersReducedMotion()
  const [localSidebarItems, setLocalSidebarItems] = useState<AutopilotSidebarItem[]>(() =>
    cloneSidebarItems(sidebarItems)
  )
  const [internalActiveItemId, setInternalActiveItemId] = useState(
    activeSidebarItemId ??
      defaultActiveSidebarItemId ??
      sidebarItems.find((item) => !item.disabled)?.id ??
      sidebarItems[0]?.id
  )
  const [internalSidebarCollapsed, setInternalSidebarCollapsed] = useState(defaultSidebarCollapsed)
  const [expandedFolderIds, setExpandedFolderIds] = useState<Set<string>>(new Set())
  const [taskLists, setTaskLists] = useState(() => createTaskLists(sidebarItems, tasks))
  const [filterMode, setFilterMode] = useState<AutopilotFilterMode>(defaultFilterMode)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [draftTaskTitle, setDraftTaskTitle] = useState("")
  const [draggedSidebarItem, setDraggedSidebarItem] = useState<DraggedSidebarItem | null>(null)
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null)
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null)
  const [lastDroppedItemId, setLastDroppedItemId] = useState<string | null>(null)
  const currentActiveItemId = activeSidebarItemId ?? internalActiveItemId
  const currentSidebarCollapsed = sidebarCollapsed ?? internalSidebarCollapsed
  const activeSidebarItem =
    localSidebarItems.find(
      (item) => item.id === currentActiveItemId && item.kind !== "folder"
    ) ??
    localSidebarItems.find((item) => item.kind !== "folder" && !item.disabled)
  const activeTitle = activeSidebarItem?.title ?? activeSidebarItem?.label ?? title
  const activeListId = activeSidebarItem?.id ?? "default"
  const activeTasks =
    taskLists[activeListId] ??
    tasks.map((task) => ({ ...task }))
  const resolvedFilterLabels: AutopilotFilterLabels = {
    ...defaultFilterLabels,
    ...filterLabels,
  }
  const resolvedEmptyTaskLabels: AutopilotEmptyTaskLabels = {
    all: formatEmptyTaskLabel(resolvedFilterLabels.all),
    open: formatEmptyTaskLabel(resolvedFilterLabels.open),
    done: formatEmptyTaskLabel(resolvedFilterLabels.done),
    ...emptyTaskLabels,
  }
  const visibleTasks = filterTasks(activeTasks, filterMode)
  const taskCounts: Record<AutopilotFilterMode, number> = {
    all: activeTasks.length,
    open: activeTasks.filter((task) => !task.completed).length,
    done: activeTasks.filter((task) => task.completed).length,
  }
  const activeTaskListLabel = taskListLabel?.(activeTitle) ?? `${activeTitle} tasks`
  const rootSidebarItems = localSidebarItems.filter((item) => !item.parentFolderId)

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          rootRef.current,
          { opacity: 0, y: 18, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
        )
        gsap.fromTo(
          "[data-autopilot-reveal]",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.46, stagger: 0.045, ease: "power2.out", delay: 0.12 }
        )
      }, rootRef)

      return () => context.revert()
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  useEffect(() => {
    if (!isFilterMenuOpen) {
      return
    }

    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node) || filterMenuRef.current?.contains(target)) {
        return
      }

      setIsFilterMenuOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePress)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [isFilterMenuOpen])

  useEffect(() => {
    if (!lastDroppedItemId) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setLastDroppedItemId(null)
    }, 720)

    return () => window.clearTimeout(timeoutId)
  }, [lastDroppedItemId])

  const selectSidebarItem = (item: AutopilotSidebarItem) => {
    if (item.disabled) {
      return
    }

    if (item.kind === "folder") {
      toggleFolderExpanded(item.id)
      return
    }

    setInternalActiveItemId(item.id)
    onSidebarChange?.(item)
  }

  const toggleFolderExpanded = (folderId: string) => {
    setExpandedFolderIds((currentIds) => {
      const nextIds = new Set(currentIds)

      if (nextIds.has(folderId)) {
        nextIds.delete(folderId)
      } else {
        nextIds.add(folderId)
      }

      return nextIds
    })
  }

  const toggleSidebarCollapsed = () => {
    const nextCollapsed = !currentSidebarCollapsed

    setInternalSidebarCollapsed(nextCollapsed)
    onSidebarCollapsedChange?.(nextCollapsed)
  }

  const selectFilterMode = (nextFilterMode: AutopilotFilterMode) => {
    setIsFilterMenuOpen(false)

    if (nextFilterMode === filterMode) {
      return
    }

    setFilterMode(nextFilterMode)
    onFilterChange?.(nextFilterMode)
  }

  const startCreateTask = () => {
    cancelTaskInputRef.current = false
    skipTaskBlurRef.current = false
    setIsAddingTask(true)
    setDraftTaskTitle("")
    setFilterMode("all")
  }

  const createTask = (titleValue: string) => {
    const trimmedTitle = titleValue.trim()

    if (!trimmedTitle || !activeSidebarItem || activeSidebarItem.kind === "folder") {
      setIsAddingTask(false)
      setDraftTaskTitle("")
      return
    }

    const task: AutopilotTask = {
      id: `${activeListId}-task-${nextTaskIdRef.current}`,
      title: trimmedTitle,
    }

    nextTaskIdRef.current += 1
    setTaskLists((currentTaskLists) => ({
      ...currentTaskLists,
      [activeListId]: [...(currentTaskLists[activeListId] ?? []), task],
    }))
    setIsAddingTask(false)
    setDraftTaskTitle("")
    onTaskCreate?.(task, activeSidebarItem)
  }

  const renameSidebarItem = (itemId: string, label: string) => {
    const nextLabel = label.trimStart()
    const currentItem = localSidebarItems.find((item) => item.id === itemId)

    if (!currentItem || currentItem.kind === "folder") {
      return
    }

    const renamedItem: AutopilotSidebarItem = {
      ...currentItem,
      label: nextLabel,
      title: currentItem.title === undefined ? undefined : nextLabel,
    }

    setLocalSidebarItems((currentItems) =>
      currentItems.map((item) => (item.id === itemId ? renamedItem : item))
    )
    onSidebarItemRename?.(renamedItem, nextLabel)
  }

  const createSidebarItem = () => {
    const sidebarItemIndex = nextSidebarItemIdRef.current
    const sidebarItem: AutopilotSidebarItem = {
      id: `created-sidebar-task-${sidebarItemIndex}`,
      label: `${newSidebarItemLabel} ${sidebarItemIndex}`,
      kind: "list",
      tasks: [],
    }

    nextSidebarItemIdRef.current += 1
    cancelTaskInputRef.current = true
    setIsAddingTask(false)
    setDraftTaskTitle("")
    setFilterMode("all")
    setLocalSidebarItems((currentItems) => [...currentItems, sidebarItem])
    setTaskLists((currentTaskLists) => ({
      ...currentTaskLists,
      [sidebarItem.id]: [],
    }))
    setInternalActiveItemId(sidebarItem.id)
    onSidebarItemCreate?.(sidebarItem)
    onSidebarChange?.(sidebarItem)
  }

  const createFolder = () => {
    const folderIndex = nextFolderIdRef.current
    const folder: AutopilotSidebarItem = {
      id: `created-folder-${folderIndex}`,
      label: `${newFolderLabel} ${folderIndex}`,
      kind: "folder",
      tasks: [],
    }

    nextFolderIdRef.current += 1
    setLocalSidebarItems((currentItems) => [...currentItems, folder])
    setTaskLists((currentTaskLists) => ({
      ...currentTaskLists,
      [folder.id]: [],
    }))
    setExpandedFolderIds((currentIds) => {
      const nextIds = new Set(currentIds)
      nextIds.add(folder.id)
      return nextIds
    })
    onFolderCreate?.(folder)
  }

  const toggleTask = (selectedTask: AutopilotTask) => {
    const completed = !selectedTask.completed
    const nextTask = { ...selectedTask, completed }

    setTaskLists((currentTaskLists) => {
      const currentTasks = currentTaskLists[activeListId] ?? []

      return {
        ...currentTaskLists,
        [activeListId]: currentTasks.map((task) =>
          task.id === selectedTask.id ? nextTask : task
        ),
      }
    })
    onTaskToggle?.(nextTask, completed)
  }

  const setCurrentDraggedSidebarItem = (item: AutopilotSidebarItem) => {
    if (item.kind === "folder" || item.disabled) {
      return
    }

    const nextDraggedSidebarItem = {
      itemId: item.id,
      itemLabel: item.label,
    }

    draggedSidebarItemRef.current = nextDraggedSidebarItem
    setDraggedSidebarItem(nextDraggedSidebarItem)
    setDragPosition(null)
    setIsFilterMenuOpen(false)
  }

  const getSidebarFolderAtPoint = (clientX: number, clientY: number) => {
    const element = document.elementFromPoint(clientX, clientY)
    const dropTarget = element?.closest("[data-autopilot-sidebar-folder-drop-target]") as
      | HTMLElement
      | null
    const folderId = dropTarget?.dataset.autopilotSidebarFolderDropTarget

    return localSidebarItems.find((item) => item.id === folderId && item.kind === "folder")
  }

  const getDragPosition = (clientX: number, clientY: number): DragPosition | null => {
    const rootRect = rootRef.current?.getBoundingClientRect()

    if (!rootRect) {
      return null
    }

    return {
      x: clientX - rootRect.left,
      y: clientY - rootRect.top,
    }
  }

  const updateSidebarDropTarget = (clientX: number, clientY: number) => {
    if (!draggedSidebarItemRef.current) {
      return
    }

    setDragPosition(getDragPosition(clientX, clientY))
    setDragOverFolderId(getSidebarFolderAtPoint(clientX, clientY)?.id ?? null)
  }

  const releaseSidebarDrag = (clientX: number, clientY: number) => {
    if (!draggedSidebarItemRef.current) {
      return
    }

    const folder = getSidebarFolderAtPoint(clientX, clientY)

    if (folder) {
      moveDraggedSidebarItemToFolder(folder)
      return
    }

    clearDraggedSidebarItem()
  }

  const clearDraggedSidebarItem = () => {
    draggedSidebarItemRef.current = null
    setDraggedSidebarItem(null)
    setDragPosition(null)
    setDragOverFolderId(null)
  }

  const moveDraggedSidebarItemToFolder = (folder: AutopilotSidebarItem) => {
    const currentDraggedSidebarItem = draggedSidebarItemRef.current ?? draggedSidebarItem

    if (!currentDraggedSidebarItem || folder.kind !== "folder") {
      return
    }

    const movingItem = localSidebarItems.find(
      (item) => item.id === currentDraggedSidebarItem.itemId
    )

    if (!movingItem || movingItem.kind === "folder" || movingItem.id === folder.id) {
      return
    }

    const previousFolder = localSidebarItems.find(
      (item) => item.id === movingItem.parentFolderId
    )

    setLocalSidebarItems((currentItems) =>
      currentItems.map((item) =>
        item.id === movingItem.id ? { ...item, parentFolderId: folder.id } : item
      )
    )
    setExpandedFolderIds((currentIds) => {
      const nextIds = new Set(currentIds)
      nextIds.add(folder.id)
      return nextIds
    })
    setLastDroppedItemId(movingItem.id)
    skipSidebarClickRef.current = true
    setInternalActiveItemId(movingItem.id)
    clearDraggedSidebarItem()
    onSidebarItemMove?.(movingItem, previousFolder, folder)
    onSidebarChange?.(movingItem)
  }

  return (
    <section
      ref={rootRef}
      aria-label={ariaLabel ?? "Task board"}
      onPointerMove={(event) => updateSidebarDropTarget(event.clientX, event.clientY)}
      onPointerUp={(event) => {
        releaseSidebarDrag(event.clientX, event.clientY)
      }}
      onPointerCancel={clearDraggedSidebarItem}
      onMouseMove={(event) => updateSidebarDropTarget(event.clientX, event.clientY)}
      onMouseUp={(event) => {
        releaseSidebarDrag(event.clientX, event.clientY)
      }}
      className={cn(
        "relative mx-auto w-full max-w-[92rem] select-none rounded-2xl border border-white/70 bg-[#d6d6d3]/72 p-1.5 text-[#222222] shadow-[0_28px_90px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <style>
        {`
          @keyframes autopilot-drop-in {
            0% { opacity: 0; transform: translate3d(-10px, -4px, 0) scale(0.96); }
            68% { opacity: 1; transform: translate3d(3px, 0, 0) scale(1.01); }
            100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
          }

          @keyframes autopilot-folder-pulse {
            0%, 100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
            50% { box-shadow: 0 8px 22px rgba(255, 255, 255, 0.34); }
          }
        `}
      </style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,rgba(255,255,255,0.34),rgba(255,255,255,0.12)),repeating-linear-gradient(0deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_14px)] opacity-70"
      />

      {draggedSidebarItem && dragPosition ? (
        <div
          aria-hidden="true"
          data-autopilot-drag-preview
          className="pointer-events-none absolute z-50 flex h-9 min-w-40 max-w-56 items-center gap-2 rounded-md border border-white/72 bg-[#fbfbf8]/94 px-3 text-[0.86rem] font-bold tracking-normal text-[#303030] shadow-[0_14px_34px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-xl will-change-transform"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: "translate(14px, -50%)",
          }}
        >
          <List className="size-3.5 shrink-0 text-[#747474]" strokeWidth={2.2} />
          <span className="min-w-0 flex-1 truncate">{draggedSidebarItem.itemLabel}</span>
        </div>
      ) : null}

      <div
        className={cn(
          "relative grid min-h-[31rem] overflow-hidden rounded-[0.9rem] border border-black/20 bg-[#e8e8e5]/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] transition-[grid-template-columns] duration-300 md:aspect-[16/9] md:min-h-[36rem]",
          currentSidebarCollapsed
            ? "md:grid-cols-[5rem_1fr]"
            : "md:grid-cols-[16.5rem_1fr]"
        )}
      >
        <aside
          className={cn(
            "relative hidden border-r border-white/36 bg-white/16 py-7 backdrop-blur-2xl transition-[padding] duration-300 md:block",
            currentSidebarCollapsed ? "px-3" : "px-6"
          )}
        >
          <nav className="space-y-2.5" aria-label={taskFoldersLabel}>
            {rootSidebarItems.map((item) => {
              const isActive = item.id === activeSidebarItem?.id
              const isFolder = item.kind === "folder"
              const isExpanded = expandedFolderIds.has(item.id)
              const isDraggingThisItem = draggedSidebarItem?.itemId === item.id
              const childSidebarItems = localSidebarItems.filter(
                (childItem) => childItem.parentFolderId === item.id
              )
              const Icon = isFolder ? Folder : List

              return (
                <div
                  key={item.id}
                  data-autopilot-sidebar-folder-drop-target={isFolder ? item.id : undefined}
                >
                  <button
                    type="button"
                    disabled={item.disabled}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={isFolder ? isExpanded : undefined}
                    data-autopilot-sidebar-folder-drop-target={isFolder ? item.id : undefined}
                    data-autopilot-sidebar-item-draggable={!isFolder ? true : undefined}
                    title={currentSidebarCollapsed ? item.label : undefined}
                    className={cn(
                      "flex h-8 w-full items-center gap-3 rounded-md text-left text-[0.98rem] font-semibold tracking-normal outline-none transition-[background-color,box-shadow,color,opacity,transform] duration-200 motion-reduce:transition-none",
                      currentSidebarCollapsed && "justify-center gap-0",
                      !isFolder && "cursor-grab active:cursor-grabbing",
                      isActive
                        ? "text-[#1f1f1f]"
                        : "text-[#7c7c7c]/42 enabled:hover:text-[#343434]",
                      item.disabled && "cursor-default",
                      isDraggingThisItem &&
                        dragPosition &&
                        "translate-x-1 scale-[0.98] bg-white/28 opacity-45 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]",
                      isFolder &&
                        dragOverFolderId === item.id &&
                        "translate-x-1 bg-white/58 text-[#1f1f1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.76)] motion-safe:animate-[autopilot-folder-pulse_900ms_ease-in-out_infinite]"
                    )}
                    onClick={() => {
                      if (skipSidebarClickRef.current) {
                        skipSidebarClickRef.current = false
                        return
                      }

                      selectSidebarItem(item)
                    }}
                    onPointerEnter={() => {
                      if (isFolder && draggedSidebarItemRef.current) {
                        setDragOverFolderId(item.id)
                      }
                    }}
                    onPointerLeave={() => {
                      if (dragOverFolderId === item.id) {
                        setDragOverFolderId(null)
                      }
                    }}
                    onPointerUp={(event) => {
                      if (!isFolder && draggedSidebarItemRef.current?.itemId === item.id) {
                        clearDraggedSidebarItem()
                        return
                      }

                      if (!isFolder || !draggedSidebarItemRef.current) {
                        return
                      }

                      event.preventDefault()
                      moveDraggedSidebarItemToFolder(item)
                    }}
                    onMouseEnter={() => {
                      if (isFolder && draggedSidebarItemRef.current) {
                        setDragOverFolderId(item.id)
                      }
                    }}
                    onMouseLeave={() => {
                      if (dragOverFolderId === item.id) {
                        setDragOverFolderId(null)
                      }
                    }}
                    onMouseUp={(event) => {
                      if (!isFolder && draggedSidebarItemRef.current?.itemId === item.id) {
                        clearDraggedSidebarItem()
                        return
                      }

                      if (!isFolder || !draggedSidebarItemRef.current) {
                        return
                      }

                      event.preventDefault()
                      moveDraggedSidebarItemToFolder(item)
                    }}
                    onPointerDown={(event) => {
                      if (event.button !== 0 || isFolder) {
                        return
                      }

                      setCurrentDraggedSidebarItem(item)
                    }}
                    onPointerCancel={clearDraggedSidebarItem}
                    onMouseDown={(event) => {
                      if (event.button !== 0 || isFolder) {
                        return
                      }

                      setCurrentDraggedSidebarItem(item)
                    }}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        isActive ? "text-[#1f1f1f]" : "text-[#888888]/46"
                      )}
                      strokeWidth={2}
                    />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate transition-[opacity,width]",
                        currentSidebarCollapsed && "w-0 flex-none opacity-0"
                      )}
                    >
                      {item.label}
                    </span>
                    {isFolder && !currentSidebarCollapsed ? (
                      <ChevronRight
                        className={cn(
                          "size-3.5 shrink-0 transition-transform",
                          isExpanded && "rotate-90"
                        )}
                        strokeWidth={2.2}
                      />
                    ) : null}
                    {!isFolder && !currentSidebarCollapsed ? (
                      <GripVertical
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-[#9a9a9a]/45"
                        strokeWidth={2}
                      />
                    ) : null}
                  </button>

                  {isFolder && isExpanded && !currentSidebarCollapsed ? (
                    <div className="ml-7 mt-1 space-y-1">
                      {childSidebarItems.length > 0 ? (
                        childSidebarItems.map((childItem) => {
                          const isDraggingChild = draggedSidebarItem?.itemId === childItem.id
                          const wasJustDropped = lastDroppedItemId === childItem.id

                          return (
                            <button
                              key={childItem.id}
                              type="button"
                              data-autopilot-sidebar-item-draggable
                              aria-current={
                                childItem.id === activeSidebarItem?.id ? "page" : undefined
                              }
                              className={cn(
                                "flex max-w-full cursor-grab items-center gap-2 truncate rounded-sm text-left text-xs font-medium leading-5 text-[#868686]/70 transition-[background-color,color,opacity,transform] duration-200 hover:text-[#303030] active:cursor-grabbing motion-reduce:transition-none",
                                childItem.id === activeSidebarItem?.id && "text-[#303030]",
                                isDraggingChild && dragPosition && "translate-x-1 opacity-45",
                                wasJustDropped &&
                                  "bg-white/50 text-[#303030] motion-safe:animate-[autopilot-drop-in_560ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
                              )}
                              onClick={() => selectSidebarItem(childItem)}
                              onPointerDown={(event) => {
                                if (event.button !== 0) {
                                  return
                                }

                                setCurrentDraggedSidebarItem(childItem)
                              }}
                              onPointerUp={() => {
                                if (draggedSidebarItemRef.current?.itemId === childItem.id) {
                                  clearDraggedSidebarItem()
                                }
                              }}
                              onPointerCancel={clearDraggedSidebarItem}
                              onMouseDown={(event) => {
                                if (event.button !== 0) {
                                  return
                                }

                                setCurrentDraggedSidebarItem(childItem)
                              }}
                              onMouseUp={() => {
                                if (draggedSidebarItemRef.current?.itemId === childItem.id) {
                                  clearDraggedSidebarItem()
                                }
                              }}
                            >
                              <List className="size-3 shrink-0" strokeWidth={2} />
                              <span className="min-w-0 flex-1 truncate">{childItem.label}</span>
                            </button>
                          )
                        })
                      ) : (
                        <p className="text-xs font-medium leading-5 text-[#a7a7a7]/58">
                          {emptyFolderLabel}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>

          <div
            className={cn(
              "absolute bottom-6 flex text-[#848484]/52 transition-[left,right,flex-direction,gap]",
              currentSidebarCollapsed
                ? "left-1/2 -translate-x-1/2 flex-col gap-1"
                : "left-6 right-6 items-center justify-between"
            )}
          >
            <button
              type="button"
              className="grid size-8 place-items-center rounded-md hover:text-[#383838]"
              aria-label={createSidebarItemAriaLabel}
              onClick={createSidebarItem}
            >
              <Plus className="size-4" />
            </button>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-md hover:text-[#383838]"
              aria-label={createFolderAriaLabel}
              onClick={createFolder}
            >
              <Folder className="size-4" />
            </button>
            <div ref={filterMenuRef} className="relative">
              <button
                type="button"
                className={cn(
                  "grid size-8 place-items-center rounded-md hover:text-[#383838]",
                  (filterMode !== "all" || isFilterMenuOpen) && "bg-white/34 text-[#383838]"
                )}
                aria-controls="autopilot-filter-menu"
                aria-expanded={isFilterMenuOpen}
                aria-haspopup="menu"
                aria-label={`${filterButtonLabel}: ${resolvedFilterLabels[filterMode]}`}
                onClick={() => setIsFilterMenuOpen((isOpen) => !isOpen)}
              >
                <SlidersHorizontal className="size-4" />
              </button>

              {isFilterMenuOpen ? (
                <div
                  id="autopilot-filter-menu"
                  role="menu"
                  aria-label={filterMenuLabel}
                  className={cn(
                    "absolute z-30 w-40 rounded-md border border-black/10 bg-[#fbfbfb]/96 p-1 text-[#2b2b2b] shadow-[0_16px_34px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl",
                    currentSidebarCollapsed
                      ? "left-10 top-1/2 -translate-y-1/2"
                      : "bottom-10 left-1/2 -translate-x-1/2"
                  )}
                >
                  {filterOptions.map((mode) => {
                    const isSelected = mode === filterMode

                    return (
                      <button
                        key={mode}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isSelected}
                        className={cn(
                          "flex h-9 w-full items-center gap-2 rounded px-2.5 text-left text-[0.78rem] font-bold tracking-normal transition-colors",
                          isSelected
                            ? "bg-[#eeeeec] text-[#202020]"
                            : "text-[#7e7e7e] hover:bg-[#f2f2f0] hover:text-[#303030]"
                        )}
                        onClick={() => selectFilterMode(mode)}
                      >
                        <span className="min-w-0 flex-1 truncate">{resolvedFilterLabels[mode]}</span>
                        <span className="rounded-full bg-white px-1.5 text-[0.62rem] font-black leading-5 text-[#9c9c9c]">
                          {taskCounts[mode]}
                        </span>
                        <Check
                          className={cn("size-3.5 shrink-0", isSelected ? "opacity-100" : "opacity-0")}
                          strokeWidth={2.4}
                        />
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-md hover:text-[#383838]"
              aria-expanded={!currentSidebarCollapsed}
              aria-label={currentSidebarCollapsed ? expandSidebarLabel : collapseSidebarLabel}
              onClick={toggleSidebarCollapsed}
            >
              <ChevronLeft
                className={cn("size-4 transition-transform", currentSidebarCollapsed && "rotate-180")}
              />
            </button>
          </div>
        </aside>

        <div className="relative m-1.5 overflow-hidden rounded-xl border border-white/88 bg-[#fbfbfb] shadow-[0_18px_55px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] md:m-2">
          <div className="px-8 pb-16 pt-16 sm:px-14 md:px-20 md:pb-20 md:pt-24 lg:px-28">
            <div className="flex flex-wrap items-center gap-3">
              <h2
                data-autopilot-reveal
                className="text-xl font-bold leading-none tracking-normal text-[#202020] md:text-2xl"
              >
                {activeSidebarItem ? (
                  <input
                    aria-label={renameNoteLabel}
                    value={activeTitle}
                    className="min-w-[8rem] max-w-full bg-transparent outline-none"
                    onChange={(event) => renameSidebarItem(activeSidebarItem.id, event.target.value)}
                    onBlur={(event) => {
                      if (!event.currentTarget.value.trim()) {
                        renameSidebarItem(activeSidebarItem.id, "Untitled")
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.currentTarget.blur()
                      }
                    }}
                  />
                ) : (
                  activeTitle
                )}
              </h2>
              <span className="rounded-full border border-[#dadada] bg-[#f7f7f7] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#a7a7a7]">
                {resolvedFilterLabels[filterMode]}
              </span>
            </div>

            <ul className="mt-6 space-y-2.5" aria-label={activeTaskListLabel}>
              {visibleTasks.map((task) => (
                <li key={task.id} data-autopilot-reveal>
                  <button
                    type="button"
                    className="group flex max-w-[42rem] items-center gap-3 text-left outline-none"
                    aria-pressed={task.completed}
                    onClick={() => toggleTask(task)}
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                        task.completed
                          ? "border-[#303030] bg-[#303030]"
                          : "border-[#99a0aa] bg-white group-hover:border-[#4f5660]"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full bg-white transition-opacity",
                          task.completed ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[0.98rem] font-medium leading-6 tracking-normal text-[#444444]",
                        task.completed && "text-[#9a9a9a] line-through"
                      )}
                    >
                      {task.title}
                    </span>
                  </button>
                </li>
              ))}

              {isAddingTask ? (
                <li className="flex max-w-[42rem] items-center gap-3">
                  <span className="size-5 shrink-0 rounded-full border-2 border-[#99a0aa] bg-white" />
                  <input
                    autoFocus
                    value={draftTaskTitle}
                    aria-label={newTaskInputLabel ?? newTaskPlaceholder}
                    placeholder={newTaskPlaceholder}
                    className="h-7 min-w-0 flex-1 bg-transparent text-[0.98rem] font-medium text-[#444444] outline-none placeholder:text-[#b6babf]"
                    onChange={(event) => setDraftTaskTitle(event.target.value)}
                    onBlur={(event) => {
                      if (cancelTaskInputRef.current || skipTaskBlurRef.current) {
                        cancelTaskInputRef.current = false
                        skipTaskBlurRef.current = false
                        return
                      }

                      createTask(event.currentTarget.value)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault()
                        skipTaskBlurRef.current = true
                        createTask(event.currentTarget.value)
                      }

                      if (event.key === "Escape") {
                        cancelTaskInputRef.current = true
                        setIsAddingTask(false)
                        setDraftTaskTitle("")
                      }
                    }}
                  />
                </li>
              ) : null}
            </ul>

            {visibleTasks.length === 0 && !isAddingTask ? (
              <p className="mt-6 text-[0.95rem] font-medium text-[#b6babf]">
                {resolvedEmptyTaskLabels[filterMode]}
              </p>
            ) : null}

            {!isAddingTask ? (
              <button
                data-autopilot-reveal
                type="button"
                className="mt-3 max-w-full text-left text-[0.95rem] font-medium leading-6 tracking-normal text-[#b6babf] outline-none transition-colors hover:text-[#7d8288]"
                onClick={startCreateTask}
              >
                {addTaskPlaceholder}
              </button>
            ) : null}
          </div>

        </div>
      </div>
    </section>
  )
}

function cloneSidebarItems(items: AutopilotSidebarItem[]): AutopilotSidebarItem[] {
  return items.map((item) => ({
    ...item,
    tasks: item.tasks?.map((task) => ({ ...task })),
  }))
}

function createTaskLists(
  sidebarItems: AutopilotSidebarItem[],
  fallbackTasks: AutopilotTask[]
) {
  const lists = sidebarItems.reduce(
    (taskLists, item) => {
      taskLists[item.id] = (item.tasks ?? fallbackTasks).map((task) => ({ ...task }))
      return taskLists
    },
    {} as Record<string, AutopilotTask[]>
  )

  if (!lists.default) {
    lists.default = fallbackTasks.map((task) => ({ ...task }))
  }

  return lists
}

function filterTasks(tasks: AutopilotTask[], filterMode: AutopilotFilterMode) {
  if (filterMode === "open") {
    return tasks.filter((task) => !task.completed)
  }

  if (filterMode === "done") {
    return tasks.filter((task) => task.completed)
  }

  return tasks
}

function formatEmptyTaskLabel(filterLabel: string) {
  return `No ${filterLabel.toLowerCase()} tasks here.`
}
