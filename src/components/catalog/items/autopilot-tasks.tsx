import { ListTodo } from "lucide-react"

import {
  AutopilotTasks,
  type AutopilotSidebarItem,
} from "@/components/lemonade/autopilot-tasks"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const sidebarItems = [
  {
    id: "priority",
    label: "Priority",
    kind: "folder",
    tasks: [
      { id: "priority-one", title: "Fix the one thing everyone notices first." },
      { id: "priority-two", title: "Ship the calmest version of the task surface." },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    kind: "folder",
    tasks: [
      { id: "projects-one", title: "Rename the project lanes before the review." },
      { id: "projects-two", title: "Turn the rough notes into a clean board." },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    kind: "folder",
    tasks: [
      { id: "personal-one", title: "Take the long walk that keeps solving bugs." },
      { id: "personal-two", title: "Buy coffee before the afternoon fog arrives." },
    ],
  },
  {
    id: "work",
    label: "Work",
    kind: "folder",
    tasks: [
      { id: "work-one", title: "Clean up the handoff notes for the team." },
      { id: "work-two", title: "Review the tiny interaction states." },
    ],
  },
  {
    id: "today",
    label: "Today",
    kind: "list",
    tasks: [
      { id: "llama", title: "Master the art of speaking llama language." },
      { id: "everest", title: "Conquer Mount Everest using a pogo stick." },
      { id: "cake", title: "Bake a cake made entirely of rainbows and unicorns." },
    ],
  },
  {
    id: "next-week",
    label: "Next Week",
    kind: "list",
    tasks: [
      { id: "next-one", title: "Plan the tiny launch ritual for next week." },
      { id: "next-two", title: "Batch the tasks that need quieter thinking." },
    ],
  },
  {
    id: "brand",
    label: "New brand Identity",
    kind: "list",
    tasks: [
      { id: "brand-one", title: "Test the softer gray against the orange button." },
      { id: "brand-two", title: "Write the new identity principles in plain words." },
    ],
  },
  {
    id: "share",
    label: "Share your work",
    kind: "list",
    tasks: [
      { id: "share-one", title: "Crop the preview for a cleaner first glance." },
      { id: "share-two", title: "Write the post without sounding like release notes." },
    ],
  },
] satisfies AutopilotSidebarItem[]

function AutopilotTasksDemo() {
  return (
    <div className="grid min-h-[44rem] w-full place-items-center bg-[#d2d2cf] p-4 sm:p-8">
      <AutopilotTasks
        sidebarItems={sidebarItems}
        defaultActiveSidebarItemId="today"
        defaultSidebarCollapsed={false}
        onFilterChange={(mode) => console.log("Filter:", mode)}
        onFolderCreate={(folder) => console.log("Folder created:", folder.label)}
        onSidebarItemCreate={(item) => console.log("Sidebar task created:", item.label)}
        onSidebarItemMove={(item, from, to) =>
          console.log("Moved sidebar task:", item.label, from?.label, "to", to.label)
        }
        onSidebarItemRename={(item, label) =>
          console.log("Renamed sidebar task:", item.id, label)
        }
        onSidebarCollapsedChange={(collapsed) => console.log("Collapsed:", collapsed)}
        onTaskCreate={(task, list) => console.log("Task created:", task.title, list?.label)}
        onTaskToggle={(task, completed) => console.log("Task:", task.title, completed)}
      />
    </div>
  )
}

const usageCode = `import {
  AutopilotTasks,
  type AutopilotFilterMode,
  type AutopilotSidebarItem,
} from "@/components/lemonade-ui/autopilot-tasks"

const taskBoardCopy = {
  boardLabel: "Weekly planning board",
  sidebarLabel: "Workspaces",
  addTaskPlaceholder: "Add a new task...",
  newTaskPlaceholder: "Type a task and press Enter",
  newTaskInputLabel: "New task title",
  newSidebarItemLabel: "New List",
  newFolderLabel: "New Folder",
  emptyFolderLabel: "Drop a list here",
  createSidebarItemAriaLabel: "Create list",
  createFolderAriaLabel: "Create folder",
  filterButtonLabel: "Show tasks",
  filterMenuLabel: "Task status filters",
  collapseSidebarLabel: "Collapse folders",
  expandSidebarLabel: "Expand folders",
  renameNoteLabel: "Rename list",
}

const filterLabels = {
  all: "All",
  open: "Open",
  done: "Done",
} satisfies Partial<Record<AutopilotFilterMode, string>>

const emptyTaskLabels = {
  all: "No tasks in this list yet.",
  open: "No open tasks here.",
  done: "No completed tasks here.",
} satisfies Partial<Record<AutopilotFilterMode, string>>

const sidebarItems = [
  {
    id: "priority",
    label: "Priority",
    kind: "folder",
    tasks: [
      { id: "priority-one", title: "Fix the one thing everyone notices first." },
      { id: "priority-two", title: "Ship the calmest version of the task surface." },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    kind: "folder",
    tasks: [
      { id: "projects-one", title: "Rename the project lanes before the review." },
      { id: "projects-two", title: "Turn the rough notes into a clean board." },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    kind: "folder",
    tasks: [
      { id: "personal-one", title: "Take the long walk that keeps solving bugs." },
      { id: "personal-two", title: "Buy coffee before the afternoon fog arrives." },
    ],
  },
  {
    id: "work",
    label: "Work",
    kind: "folder",
    tasks: [
      { id: "work-one", title: "Clean up the handoff notes for the team." },
      { id: "work-two", title: "Review the tiny interaction states." },
    ],
  },
  {
    id: "today",
    label: "Today",
    kind: "list",
    tasks: [
      { id: "llama", title: "Master the art of speaking llama language." },
      { id: "everest", title: "Conquer Mount Everest using a pogo stick." },
      { id: "cake", title: "Bake a cake made entirely of rainbows and unicorns." },
    ],
  },
  {
    id: "next-week",
    label: "Next Week",
    kind: "list",
    tasks: [
      { id: "next-one", title: "Plan the tiny launch ritual for next week." },
      { id: "next-two", title: "Batch the tasks that need quieter thinking." },
    ],
  },
  {
    id: "brand",
    label: "New brand Identity",
    kind: "list",
    tasks: [
      { id: "brand-one", title: "Test the softer gray against the sidebar." },
      { id: "brand-two", title: "Write the new identity principles in plain words." },
    ],
  },
  {
    id: "share",
    label: "Share your work",
    kind: "list",
    tasks: [
      { id: "share-one", title: "Crop the preview for a cleaner first glance." },
      { id: "share-two", title: "Write the post without sounding like release notes." },
    ],
  },
] satisfies AutopilotSidebarItem[]

export default function Demo() {
  return (
    <AutopilotTasks
      aria-label={taskBoardCopy.boardLabel}
      className="max-w-[92rem]"
      sidebarItems={sidebarItems}
      defaultActiveSidebarItemId="today"
      defaultSidebarCollapsed={false}
      defaultFilterMode="all"
      filterLabels={filterLabels}
      emptyTaskLabels={emptyTaskLabels}
      taskListLabel={(title) => \`\${title} tasks\`}
      taskFoldersLabel={taskBoardCopy.sidebarLabel}
      addTaskPlaceholder={taskBoardCopy.addTaskPlaceholder}
      newTaskPlaceholder={taskBoardCopy.newTaskPlaceholder}
      newTaskInputLabel={taskBoardCopy.newTaskInputLabel}
      newSidebarItemLabel={taskBoardCopy.newSidebarItemLabel}
      newFolderLabel={taskBoardCopy.newFolderLabel}
      emptyFolderLabel={taskBoardCopy.emptyFolderLabel}
      createSidebarItemAriaLabel={taskBoardCopy.createSidebarItemAriaLabel}
      createFolderAriaLabel={taskBoardCopy.createFolderAriaLabel}
      filterButtonLabel={taskBoardCopy.filterButtonLabel}
      filterMenuLabel={taskBoardCopy.filterMenuLabel}
      collapseSidebarLabel={taskBoardCopy.collapseSidebarLabel}
      expandSidebarLabel={taskBoardCopy.expandSidebarLabel}
      renameNoteLabel={taskBoardCopy.renameNoteLabel}
      onFilterChange={(mode) => console.log("Filter:", mode)}
      onFolderCreate={(folder) => console.log("Folder created:", folder.label)}
      onSidebarItemCreate={(item) => console.log("Sidebar task created:", item.label)}
      onSidebarItemMove={(item, from, to) =>
        console.log("Moved sidebar task:", item.label, from?.label, "to", to.label)
      }
      onSidebarItemRename={(item, label) =>
        console.log("Renamed sidebar task:", item.id, label)
      }
      onSidebarCollapsedChange={(collapsed) => console.log("Collapsed:", collapsed)}
      onSidebarChange={(item) => console.log("Selected list:", item.label)}
      onTaskCreate={(task, list) => console.log("Task created:", task.title, list?.label)}
      onTaskToggle={(task, completed) => console.log("Task:", task.title, completed)}
    />
  )
}`

export const autopilotTasksCatalogItem: CatalogItem = {
  metadata: {
    id: "autopilot-tasks",
    title: "Autopilot Tasks",
    category: "AI Tools",
    command: `npx shadcn@latest add ${installBaseUrl}/autopilot-tasks.json`,
    filter: "ai-tools",
    icon: ListTodo,
    previewClassName: "bg-[#d2d2cf]",
  },
  detail: {
    id: "autopilot-tasks",
    title: "Autopilot Tasks",
    category: "AI Tools",
    description:
      "A frosted desktop task board with create controls, switchable folders, sidebar tasks that drag into folders, and a compact filter popover.",
    inspirationCredit: {
      label: "To-do list app ~ Powered by AI. by Rafael",
      url: "https://dribbble.com/shots/22535022-To-do-list-app-Powered-by-AI",
    },
    registryUrl: `${installBaseUrl}/autopilot-tasks.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "AutopilotTasks",
    importPath: "@/components/lemonade-ui/autopilot-tasks",
    previewClassName: "bg-[#d2d2cf]",
    usageCode,
  },
  Preview: AutopilotTasksDemo,
}
