"use client"

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  useRef,
  useState,
} from "react"
import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type PixelStatusTone = "great" | "ok" | "attention"

export type PixelStatusItem = {
  id: string
  title: string
  message: string
  tone?: PixelStatusTone
  face?: "happy" | "neutral" | "sad"
}

export type PixelStatusStackProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "onChange"> & {
  items?: PixelStatusItem[]
  selectedId?: string
  defaultSelectedId?: string
  onStatusChange?: (item: PixelStatusItem) => void
}

const defaultItems: PixelStatusItem[] = [
  {
    id: "great",
    title: "Doing Great!",
    message: "You are on the right track",
    tone: "great",
    face: "happy",
  },
  {
    id: "ok",
    title: "Doing OK",
    message: "You're doing pretty well",
    tone: "ok",
    face: "neutral",
  },
  {
    id: "attention",
    title: "Pay Attention!",
    message: "You're off track right now",
    tone: "attention",
    face: "sad",
  },
]

const toneConfig: Record<
  PixelStatusTone,
  {
    row: string
    selected: string
    accent: string
    face: string
    Icon: LucideIcon
    fallbackFace: NonNullable<PixelStatusItem["face"]>
  }
> = {
  great: {
    row: "bg-[#effdf2]",
    selected: "ring-[#58d866]/35",
    accent: "text-[#22bf4c]",
    face: "#52d95c",
    Icon: TrendingUp,
    fallbackFace: "happy",
  },
  ok: {
    row: "bg-[#edf5ff]",
    selected: "ring-[#3d8be6]/30",
    accent: "text-[#2f86de]",
    face: "#3f8de9",
    Icon: Minus,
    fallbackFace: "neutral",
  },
  attention: {
    row: "bg-[#ffefef]",
    selected: "ring-[#ff4b4b]/28",
    accent: "text-[#f33838]",
    face: "#ff3f3f",
    Icon: TrendingDown,
    fallbackFace: "sad",
  },
}

const pixelMask = new Set([
  "0-2",
  "0-3",
  "0-4",
  "0-5",
  "0-6",
  "1-1",
  "1-2",
  "1-3",
  "1-4",
  "1-5",
  "1-6",
  "1-7",
  "2-0",
  "2-1",
  "2-2",
  "2-3",
  "2-4",
  "2-5",
  "2-6",
  "2-7",
  "2-8",
  "3-0",
  "3-1",
  "3-2",
  "3-3",
  "3-4",
  "3-5",
  "3-6",
  "3-7",
  "3-8",
  "4-0",
  "4-1",
  "4-2",
  "4-3",
  "4-4",
  "4-5",
  "4-6",
  "4-7",
  "4-8",
  "5-0",
  "5-1",
  "5-2",
  "5-3",
  "5-4",
  "5-5",
  "5-6",
  "5-7",
  "5-8",
  "6-0",
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "6-6",
  "6-7",
  "6-8",
  "7-1",
  "7-2",
  "7-3",
  "7-4",
  "7-5",
  "7-6",
  "7-7",
  "8-2",
  "8-3",
  "8-4",
  "8-5",
  "8-6",
])

const expressionPixels: Record<NonNullable<PixelStatusItem["face"]>, Set<string>> = {
  happy: new Set(["3-3", "3-5", "5-2", "5-6", "6-3", "6-4", "6-5"]),
  neutral: new Set(["3-3", "3-5", "5-3", "5-4", "5-5"]),
  sad: new Set(["3-3", "3-5", "5-3", "5-4", "5-5", "6-2", "6-6"]),
}

export function PixelStatusStack({
  items = defaultItems,
  selectedId,
  defaultSelectedId,
  onStatusChange,
  className,
  ...props
}: PixelStatusStackProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([])
  const faceRefs = useRef<Array<HTMLSpanElement | null>>([])
  const reducedMotion = usePrefersReducedMotion()
  const [internalSelectedId, setInternalSelectedId] = useState(
    defaultSelectedId ?? items[0]?.id ?? ""
  )
  const fallbackSelectedId = items[0]?.id ?? ""
  const resolvedInternalId = items.some((item) => item.id === internalSelectedId)
    ? internalSelectedId
    : fallbackSelectedId

  const activeId = selectedId ?? resolvedInternalId

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.from(rowRefs.current.filter(Boolean), {
        y: 18,
        opacity: 0,
        duration: 0.52,
        stagger: 0.08,
        ease: "power3.out",
      })
    },
    { dependencies: [items.length, reducedMotion], scope: rootRef }
  )

  const handleSelect = (item: PixelStatusItem, index: number) => {
    if (selectedId === undefined) {
      setInternalSelectedId(item.id)
    }

    onStatusChange?.(item)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf(faceRefs.current[index])
    gsap.fromTo(
      faceRefs.current[index],
      { scale: 0.92, rotate: -3 },
      { scale: 1, rotate: 0, duration: 0.55, ease: "elastic.out(1, 0.55)" }
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn("mx-auto grid w-full max-w-full gap-6 sm:max-w-[47rem]", className)}
      {...props}
    >
      {items.map((item, index) => {
        const tone = item.tone ?? "great"
        const config = toneConfig[tone]
        const Icon = config.Icon
        const isSelected = item.id === activeId

        return (
          <button
            key={item.id}
            ref={(node) => {
              rowRefs.current[index] = node
            }}
            type="button"
            aria-pressed={isSelected}
            onClick={() => handleSelect(item, index)}
            onPointerEnter={() => animateRow(rowRefs.current[index], faceRefs.current[index], reducedMotion)}
            onPointerLeave={() => settleRow(rowRefs.current[index], faceRefs.current[index], reducedMotion)}
            className={cn(
              "group flex min-h-[7.1rem] w-full items-center gap-4 overflow-hidden rounded-[1.6rem] px-5 py-5 text-left outline-none transition-[box-shadow,transform] duration-300 focus-visible:ring-4 focus-visible:ring-black/10 sm:min-h-[8.9rem] sm:gap-8 sm:rounded-[2.1rem] sm:px-9 sm:py-7",
              config.row,
              isSelected
                ? cn("ring-4 shadow-[0_22px_56px_rgba(20,20,20,0.08)]", config.selected)
                : "shadow-[0_14px_42px_rgba(20,20,20,0.04)]"
            )}
          >
            <span
              ref={(node) => {
                faceRefs.current[index] = node
              }}
              className="shrink-0"
            >
              <PixelFace
                color={config.face}
                face={item.face ?? config.fallbackFace}
              />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-2xl font-semibold leading-tight tracking-normal text-black sm:text-[2.35rem]">
                {item.title}
              </span>
              <span className={cn("mt-2 flex min-w-0 items-center gap-2 text-xl leading-tight tracking-normal sm:gap-3 sm:text-[2.05rem]", config.accent)}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-current sm:size-9">
                  <Icon className="size-5 text-white sm:size-6" strokeWidth={3.2} />
                </span>
                <span className="truncate">{item.message}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function PixelFace({
  color,
  face,
}: {
  color: string
  face: NonNullable<PixelStatusItem["face"]>
}) {
  const details = expressionPixels[face]

  return (
    <span
      aria-hidden="true"
      className="grid size-14 grid-cols-9 grid-rows-9 sm:size-20"
      style={{ "--pixel-color": color } as CSSProperties}
    >
      {Array.from({ length: 81 }).map((_, index) => {
        const row = Math.floor(index / 9)
        const column = index % 9
        const key = `${row}-${column}`
        const isFace = pixelMask.has(key)
        const isDetail = details.has(key)

        return (
          <span
            key={key}
            className={cn(
              "block",
              isDetail ? "bg-black" : isFace ? "bg-[var(--pixel-color)]" : "bg-transparent"
            )}
          />
        )
      })}
    </span>
  )
}

function animateRow(
  row: HTMLButtonElement | null,
  face: HTMLSpanElement | null,
  reducedMotion: boolean
) {
  if (reducedMotion) {
    return
  }

  gsap.to(row, {
    y: -4,
    scale: 1.01,
    duration: 0.36,
    ease: "power3.out",
  })
  gsap.to(face, {
    y: -3,
    rotate: 2,
    duration: 0.36,
    ease: "power3.out",
  })
}

function settleRow(
  row: HTMLButtonElement | null,
  face: HTMLSpanElement | null,
  reducedMotion: boolean
) {
  if (reducedMotion) {
    return
  }

  gsap.to(row, {
    y: 0,
    scale: 1,
    duration: 0.5,
    ease: "elastic.out(1, 0.6)",
  })
  gsap.to(face, {
    y: 0,
    rotate: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.6)",
  })
}
