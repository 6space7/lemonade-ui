"use client"

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  useRef,
  useState,
} from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type AnimatedDockIcon =
  | "finder"
  | "figma"
  | "framer"
  | "mesh"
  | "todoist"
  | "photoshop"
  | "illustrator"

export type AnimatedDockItem = {
  id: string
  label: string
  icon?: AnimatedDockIcon
  href?: string
  initials?: string
  color?: string
  content?: ReactNode
}

export type AnimatedDockProps = Omit<ComponentPropsWithoutRef<"nav">, "children" | "onSelect"> & {
  items?: AnimatedDockItem[]
  defaultActiveId?: string
  magnification?: number
  collisionGap?: number
  onItemSelect?: (item: AnimatedDockItem) => void
}

const defaultItems: AnimatedDockItem[] = [
  { id: "figma", label: "Figma", icon: "figma" },
  { id: "framer", label: "Framer", icon: "framer" },
  { id: "finder", label: "Finder", icon: "finder" },
  { id: "arc", label: "Arcade", icon: "mesh" },
  { id: "todoist", label: "Todoist", icon: "todoist" },
  { id: "photoshop", label: "Photoshop", icon: "photoshop" },
  { id: "illustrator", label: "Illustrator", icon: "illustrator" },
]

export function AnimatedDock({
  items = defaultItems,
  defaultActiveId = "finder",
  magnification = 0.56,
  collisionGap = 4,
  onItemSelect,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: AnimatedDockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const reducedMotion = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(defaultActiveId)
  const [hoveredId, setHoveredId] = useState<string | null>(defaultActiveId)

  useGSAP(
    () => {
      if (!dockRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        dockRef.current,
        { y: 18, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.75, ease: "elastic.out(1, 0.58)" }
      )
      gsap.from(itemRefs.current.filter(Boolean), {
        y: 18,
        opacity: 0,
        duration: 0.48,
        stagger: 0.045,
        delay: 0.08,
        ease: "power3.out",
      })
    },
    { dependencies: [items.length, reducedMotion], scope: dockRef }
  )

  const animateToPointer = (clientX: number) => {
    if (!dockRef.current || reducedMotion) {
      return
    }

    const dockRect = dockRef.current.getBoundingClientRect()
    const itemsToAnimate = itemRefs.current.flatMap((node) => {
      if (!node) return []
      const itemWidth = node.offsetWidth
      const center = dockRect.left + node.offsetLeft + itemWidth / 2
      const distance = Math.abs(clientX - center)
      const influence = Math.max(0, 1 - distance / 142)
      const scale = 1 + influence * magnification

      return [{ center, influence, node, scale, width: itemWidth }]
    })

    if (itemsToAnimate.length === 0) {
      return
    }

    const hoverIndex = itemsToAnimate.reduce(
      (closestIndex, item, index) => {
        const closest = itemsToAnimate[closestIndex]
        return Math.abs(clientX - item.center) < Math.abs(clientX - closest.center) ? index : closestIndex
      },
      0
    )
    const positions = itemsToAnimate.map((item) => item.center)
    const visualWidths = itemsToAnimate.map((item) => item.width * item.scale)

    for (let index = hoverIndex + 1; index < itemsToAnimate.length; index++) {
      const minimumCenter =
        positions[index - 1] + visualWidths[index - 1] / 2 + visualWidths[index] / 2 + collisionGap
      positions[index] = Math.max(positions[index], minimumCenter)
    }

    for (let index = hoverIndex - 1; index >= 0; index--) {
      const maximumCenter =
        positions[index + 1] - visualWidths[index + 1] / 2 - visualWidths[index] / 2 - collisionGap
      positions[index] = Math.min(positions[index], maximumCenter)
    }

    itemsToAnimate.forEach((item, index) => {
      const x = positions[index] - item.center

      gsap.to(item.node, {
        scale: item.scale,
        x,
        y: item.influence * -18,
        duration: 0.32,
        ease: "power3.out",
      })
    })
  }

  const resetDock = () => {
    setHoveredId(activeId)

    if (reducedMotion) {
      return
    }

    gsap.to(itemRefs.current.filter(Boolean), {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.58,
      ease: "elastic.out(1, 0.55)",
    })
  }

  const selectItem = (item: AnimatedDockItem, index: number) => {
    setActiveId(item.id)
    setHoveredId(item.id)
    onItemSelect?.(item)

    if (reducedMotion) {
      return
    }

    gsap.fromTo(
      itemRefs.current[index],
      { x: 0, y: -22, scale: 1.26 },
      { x: 0, y: 0, scale: 1.08, duration: 0.62, ease: "elastic.out(1, 0.48)" }
    )
  }

  return (
    <nav
      aria-label="Animated application dock"
      className={cn("mx-auto grid w-full max-w-fit place-items-center px-1 py-10 sm:px-4", className)}
      {...props}
    >
      <div
        ref={dockRef}
        className="relative flex items-end gap-1.5 rounded-[1.35rem] border border-white/12 bg-[#242424]/88 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.5),0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:gap-5 sm:rounded-[2rem] sm:p-3"
        onPointerMove={(event) => {
          onPointerMove?.(event)
          animateToPointer(event.clientX)
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event)
          resetDock()
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_48%,rgba(0,0,0,0.22))]"
        />

        {items.map((item, index) => {
          const isActive = item.id === activeId
          const showLabel = item.id === hoveredId || isActive
          const sharedClassName = cn(
            "group/dock-item relative z-10 grid size-9 shrink-0 origin-bottom place-items-center rounded-[0.85rem] outline-none sm:size-16 sm:rounded-[1.15rem]",
            "focus-visible:ring-4 focus-visible:ring-white/20"
          )
          const content = (
            <>
              <span
                className={cn(
                  "pointer-events-none absolute -top-11 left-1/2 z-20 -translate-x-1/2 rounded-md border border-white/10 bg-[#242424] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-opacity duration-150",
                  showLabel && "opacity-100"
                )}
              >
                {item.label}
                <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-white/10 bg-[#242424]" />
              </span>
              <span
                className={cn(
                  "relative grid size-full place-items-center overflow-hidden rounded-[inherit] border border-white/10 bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.24)]",
                  isActive && "ring-2 ring-white/16"
                )}
              >
                {item.content ?? (
                  <DockIcon
                    icon={item.icon}
                    color={item.color}
                    initials={item.initials ?? item.label.slice(0, 2)}
                  />
                )}
              </span>
            </>
          )

          if (item.href) {
            return (
              <a
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                href={item.href}
                className={sharedClassName}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(activeId)}
                onPointerEnter={() => setHoveredId(item.id)}
                onClick={() => selectItem(item, index)}
              >
                {content}
              </a>
            )
          }

          return (
            <button
              key={item.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="button"
              className={sharedClassName}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(activeId)}
              onPointerEnter={() => setHoveredId(item.id)}
              onClick={() => selectItem(item, index)}
            >
              {content}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function DockIcon({
  icon,
  color = "#333333",
  initials,
}: {
  icon?: AnimatedDockIcon
  color?: string
  initials: string
}) {
  if (icon === "finder") {
    return (
      <span className="relative grid size-full grid-cols-2 overflow-hidden bg-white text-[#151515]">
        <span className="bg-[#4db6ff]" />
        <span className="bg-[#f2f3f4]" />
        <span className="absolute inset-x-[16%] top-[33%] flex justify-between">
          <span className="h-2 w-1 rounded-full bg-[#151515] sm:h-3 sm:w-1.5" />
          <span className="h-2 w-1 rounded-full bg-[#151515] sm:h-3 sm:w-1.5" />
        </span>
        <span className="absolute bottom-[22%] left-[20%] h-[19%] w-[58%] rounded-b-full border-b-2 border-[#151515] sm:border-b-[3px]" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/10" />
      </span>
    )
  }

  if (icon === "figma") {
    return (
      <span className="grid size-full place-items-center bg-[#171717]">
        <span className="grid grid-cols-2 grid-rows-3">
          <span className="size-3 rounded-l-full bg-[#ff6554] sm:size-5" />
          <span className="size-3 rounded-r-full bg-[#ff8066] sm:size-5" />
          <span className="size-3 rounded-l-full bg-[#a05aff] sm:size-5" />
          <span className="size-3 rounded-r-full bg-[#25c5ff] sm:size-5" />
          <span className="size-3 rounded-l-full rounded-br-full bg-[#16d987] sm:size-5" />
        </span>
      </span>
    )
  }

  if (icon === "framer") {
    return (
      <span className="relative grid size-full place-items-center bg-[linear-gradient(145deg,#21c5ff,#216dff_52%,#0c2ce8)]">
        <span className="absolute left-[28%] top-[19%] h-[29%] w-[43%] bg-white/95" />
        <span className="absolute left-[28%] top-[43%] h-[20%] w-[43%] bg-white/95 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        <span className="absolute left-[28%] top-[57%] h-[25%] w-[43%] bg-white/95 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      </span>
    )
  }

  if (icon === "mesh") {
    return (
      <span className="relative grid size-full place-items-center bg-[#fff0f3]">
        <span className="absolute size-[64%] rounded-[1rem] bg-[radial-gradient(circle_at_24%_30%,#7b68ff_0_12%,transparent_13%),radial-gradient(circle_at_72%_68%,#ff6c93_0_13%,transparent_14%)] opacity-90 blur-[1px]" />
        <span className="relative h-[48%] w-[58%] rounded-full border-[6px] border-transparent bg-[linear-gradient(135deg,#6c5cff,#ff6b93,#ffb15c)] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)] [mask-composite:exclude] sm:border-[9px]" />
      </span>
    )
  }

  if (icon === "todoist") {
    return (
      <span className="grid size-full place-items-center bg-[linear-gradient(145deg,#ff6757,#de332c)]">
        <span className="grid gap-1.5">
          {[0, 1, 2].map((row) => (
            <span key={row} className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white sm:size-2" />
              <span className="h-1.5 w-5 rounded-full bg-white sm:w-8 sm:h-2" />
            </span>
          ))}
        </span>
      </span>
    )
  }

  if (icon === "photoshop") {
    return <LetterTile background="#061827" color="#28a9ff" label="Ps" />
  }

  if (icon === "illustrator") {
    return <LetterTile background="#3a1104" color="#ff9f25" label="Ai" />
  }

  return (
    <span
      className="grid size-full place-items-center text-lg font-black text-white sm:text-2xl"
      style={{ background: color } as CSSProperties}
    >
      {initials}
    </span>
  )
}

function LetterTile({
  background,
  color,
  label,
}: {
  background: string
  color: string
  label: string
}) {
  return (
    <span
      className="grid size-full place-items-center text-lg font-black tracking-normal sm:text-3xl"
      style={{ background, color } as CSSProperties}
    >
      {label}
    </span>
  )
}
