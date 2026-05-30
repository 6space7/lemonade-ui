"use client"

import { type ComponentPropsWithoutRef, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type AvatarOrbProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label?: string
  name?: string
  statusLabels?: string[]
  onStatusChange?: (status: string) => void
}

export function AvatarOrb({
  label = "Profile avatar",
  name = "Jay",
  statusLabels = ["Available", "In focus", "Back soon"],
  onStatusChange,
  className,
  onPointerMove,
  onPointerLeave,
  onClick,
  type = "button",
  ...props
}: AvatarOrbProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const portraitRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [statusIndex, setStatusIndex] = useState(0)
  const status = statusLabels[statusIndex] ?? statusLabels[0] ?? "Available"

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        portraitRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.62, ease: "back.out(1.7)" }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const nextStatus = () => {
    const nextIndex = (statusIndex + 1) % Math.max(statusLabels.length, 1)
    const nextStatusLabel = statusLabels[nextIndex] ?? status

    setStatusIndex(nextIndex)
    onStatusChange?.(nextStatusLabel)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([portraitRef.current, glowRef.current])
    gsap.fromTo(
      portraitRef.current,
      { scale: 0.92, y: 6 },
      { scale: 1, y: 0, duration: 0.48, ease: "elastic.out(1, 0.5)" }
    )
    gsap.fromTo(
      glowRef.current,
      { opacity: 0.25, scale: 0.86 },
      { opacity: 0.8, scale: 1.08, duration: 0.34, yoyo: true, repeat: 1, ease: "power2.out" }
    )
  }

  return (
    <button
      ref={rootRef}
      type={type}
      aria-label={`${label}: ${name}, ${status}`}
      className={cn(
        "relative isolate grid aspect-square w-[min(13rem,70vw)] place-items-center rounded-[2.4rem] bg-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_26px_72px_rgba(60,60,70,0.16)] outline-none transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-black/10",
        className
      )}
      onPointerMove={(event) => {
        onPointerMove?.(event)

        if (reducedMotion || !rootRef.current) {
          return
        }

        const rect = rootRef.current.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        gsap.to(rootRef.current, {
          rotateX: y * -7,
          rotateY: x * 7,
          duration: 0.55,
          ease: "power3.out",
        })
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)

        if (reducedMotion || !rootRef.current) {
          return
        }

        gsap.to(rootRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.55)",
        })
      }}
      onClick={(event) => {
        onClick?.(event)
        nextStatus()
      }}
      {...props}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-[18%] -z-10 rounded-full bg-[radial-gradient(circle,#ffe0b0_0%,#f08a69_42%,#6c6aff_100%)] opacity-25 blur-2xl"
      />

      <span
        ref={portraitRef}
        className="relative grid aspect-square w-[48%] place-items-center overflow-hidden rounded-full bg-[#ecebea] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_8px_22px_rgba(0,0,0,0.12)]"
      >
        <span className="absolute bottom-[-13%] h-[42%] w-[62%] rounded-t-full bg-[#111111]" />
        <span className="absolute top-[24%] h-[38%] w-[34%] rounded-full bg-[#c86b39]" />
        <span className="absolute top-[12%] h-[25%] w-[42%] rounded-t-full bg-[#1f150e] shadow-[8px_3px_0_#1f150e,-8px_4px_0_#1f150e]" />
        <span className="absolute left-[28%] top-[38%] h-[12%] w-[18%] rounded-full bg-[#080808] shadow-[22px_0_0_#080808]" />
        <span className="absolute left-[25%] top-[37%] h-[10%] w-[23%] rounded-full border-2 border-[#080808]" />
        <span className="absolute right-[25%] top-[37%] h-[10%] w-[23%] rounded-full border-2 border-[#080808]" />
      </span>

      <span className="absolute bottom-[16%] rounded-full bg-black/5 px-3 py-1 text-[0.62rem] font-semibold text-black/38">
        {status}
      </span>
    </button>
  )
}
