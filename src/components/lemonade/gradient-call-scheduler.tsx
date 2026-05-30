"use client"

import { type ComponentPropsWithoutRef, useRef, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type GradientCallSchedulerProps = Omit<ComponentPropsWithoutRef<"div">, "onChange"> & {
  label?: string
  ctaLabel?: string
  durations?: number[]
  defaultDuration?: number
  onChange?: (duration: number) => void
  onBook?: (duration: number) => void
}

export function GradientCallScheduler({
  label = "Call duration scheduler",
  ctaLabel = "Book a Call",
  durations = [15, 30, 45, 60],
  defaultDuration = 30,
  onChange,
  onBook,
  className,
  ...props
}: GradientCallSchedulerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const initialIndex = Math.max(0, durations.indexOf(defaultDuration))
  const [durationIndex, setDurationIndex] = useState(initialIndex)
  const duration = durations[durationIndex] ?? durations[0] ?? defaultDuration

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        rootRef.current,
        { y: 10, opacity: 0.86 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const setDuration = (direction: 1 | -1) => {
    const nextIndex = (durationIndex + direction + durations.length) % durations.length
    const nextDuration = durations[nextIndex] ?? duration

    setDurationIndex(nextIndex)
    onChange?.(nextDuration)

    if (reducedMotion || !rootRef.current) {
      return
    }

    const value = rootRef.current.querySelector("[data-duration-value]")

    gsap.fromTo(
      value,
      { y: direction * 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.34, ease: "power3.out" }
    )
  }

  const book = () => {
    onBook?.(duration)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([buttonRef.current, sheenRef.current])
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.97 },
      { scale: 1, duration: 0.48, ease: "elastic.out(1, 0.45)" }
    )
    gsap.fromTo(
      sheenRef.current,
      { xPercent: -130, opacity: 0 },
      { xPercent: 130, opacity: 0.7, duration: 0.72, ease: "power3.out" }
    )
  }

  return (
    <div
      ref={rootRef}
      aria-label={label}
      className={cn(
        "relative mx-auto flex h-28 w-full max-w-[44rem] items-center gap-6 rounded-[2.6rem] bg-white/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_26px_70px_rgba(60,60,70,0.14)] backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center justify-center gap-4 pl-3">
        <span
          data-duration-value
          className="whitespace-nowrap text-5xl font-black tracking-normal text-black sm:text-6xl"
        >
          {duration}
        </span>
        <span className="whitespace-nowrap text-4xl font-semibold tracking-normal text-black/32 sm:text-5xl">
          mins
        </span>
        <div className="grid gap-1.5">
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full text-black/20 transition-colors hover:bg-black/5 hover:text-black/42 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/12"
            aria-label="Increase call duration"
            onClick={() => setDuration(1)}
          >
            <ChevronUp className="size-6" />
          </button>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full text-black/20 transition-colors hover:bg-black/5 hover:text-black/42 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/12"
            aria-label="Decrease call duration"
            onClick={() => setDuration(-1)}
          >
            <ChevronDown className="size-6" />
          </button>
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        className="relative h-full min-w-[17rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(155deg,#ffd075_0%,#ff7d8f_28%,#8d49ff_61%,#4c6cff_100%)] px-8 text-4xl font-semibold tracking-normal text-white shadow-[0_18px_40px_rgba(93,82,255,0.34),inset_0_1px_0_rgba(255,255,255,0.5)] outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-[#7a65ff]/24"
        onClick={book}
      >
        <span
          ref={sheenRef}
          aria-hidden="true"
          className="absolute inset-y-[-20%] left-0 w-1/2 -skew-x-12 bg-white/35 blur-xl"
        />
        <span className="relative">{ctaLabel}</span>
      </button>
    </div>
  )
}
