"use client"

import { type ComponentPropsWithoutRef, type LucideIcon, useRef } from "react"
import { Camera, File, Image, MoreVertical, Video } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type HappyFilesStat = {
  label: string
  value: number
  icon?: "image" | "video" | "file" | "camera"
}

export type HappyFilesCardProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  eyebrow?: string
  title?: string
  stats?: HappyFilesStat[]
  onOpen?: () => void
}

const defaultStats: HappyFilesStat[] = [
  { label: "Images", value: 88, icon: "image" },
  { label: "Videos", value: 24, icon: "video" },
  { label: "Docs", value: 9, icon: "file" },
  { label: "Clips", value: 89, icon: "camera" },
]

const statIcons: Record<NonNullable<HappyFilesStat["icon"]>, LucideIcon> = {
  image: Image,
  video: Video,
  file: File,
  camera: Camera,
}

export function HappyFilesCard({
  eyebrow = "New",
  title = "Happy Files",
  stats = defaultStats,
  onOpen,
  className,
  onPointerEnter,
  onPointerLeave,
  onClick,
  type = "button",
  ...props
}: HappyFilesCardProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const folderRef = useRef<HTMLSpanElement>(null)
  const flapRef = useRef<HTMLSpanElement>(null)
  const statsRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      gsap.set([folderRef.current, flapRef.current, statsRef.current], {
        clearProps: "transform",
        opacity: 1,
      })
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const openFolder = () => {
    if (reducedMotion) {
      return
    }

    gsap.to(folderRef.current, {
      y: -8,
      rotate: -2,
      duration: 0.44,
      ease: "power3.out",
    })
    gsap.to(flapRef.current, {
      y: -10,
      rotate: -8,
      duration: 0.44,
      ease: "back.out(1.7)",
    })
  }

  const closeFolder = () => {
    if (reducedMotion) {
      return
    }

    gsap.to([folderRef.current, flapRef.current], {
      y: 0,
      rotate: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.6)",
    })
  }

  const open = () => {
    onOpen?.()

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf(statsRef.current)
    gsap.fromTo(
      statsRef.current,
      { y: 8, opacity: 0.55 },
      { y: 0, opacity: 1, duration: 0.42, ease: "power3.out" }
    )
  }

  return (
    <button
      ref={rootRef}
      type={type}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-[3rem] bg-white/90 p-[12%] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_24px_70px_rgba(60,60,70,0.16)] outline-none focus-visible:ring-4 focus-visible:ring-black/10",
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        openFolder()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        closeFolder()
      }}
      onClick={(event) => {
        onClick?.(event)
        open()
      }}
      {...props}
    >
      <span
        ref={folderRef}
        aria-hidden="true"
        className="absolute left-[12%] top-[10%] block h-[29%] w-[38%] rounded-[1.15rem] bg-[linear-gradient(160deg,#ffbc75_0%,#ff7d8d_34%,#4c54ff_82%)] shadow-[0_20px_38px_rgba(85,86,255,0.22)]"
      >
        <span
          ref={flapRef}
          className="absolute left-0 top-[-15%] h-[38%] w-[62%] rounded-t-[1.1rem] bg-[linear-gradient(160deg,#ffbd7c,#ff8490_55%,#7458ff)]"
        />
        <span className="absolute inset-x-0 bottom-0 h-[48%] rounded-b-[1.15rem] bg-[#545cff]" />
      </span>

      <MoreVertical className="absolute right-[10%] top-[11%] size-9 text-black" strokeWidth={3.4} />

      <div className="absolute inset-x-[12%] bottom-[6%]">
        <p className="text-2xl font-black uppercase tracking-normal text-black/16">{eyebrow}</p>
        <h3 className="mt-1 text-5xl font-black leading-none tracking-normal text-black sm:text-6xl">
          {title}
        </h3>
        <span ref={statsRef} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-black/30">
          {stats.slice(0, 4).map((stat) => {
            const Icon = stat.icon ? statIcons[stat.icon] : File

            return (
              <span key={stat.label} className="inline-flex items-center gap-2">
                <Icon className="size-5" strokeWidth={3} />
                <span className="text-2xl font-black tracking-normal">{stat.value}</span>
              </span>
            )
          })}
        </span>
      </div>
    </button>
  )
}
