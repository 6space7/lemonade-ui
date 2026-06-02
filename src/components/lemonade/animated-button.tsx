"use client"

import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { ArrowRight, Check } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type AnimatedButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label?: string
  hoverLabel?: string
  completeLabel?: string
  icon?: ReactNode
  completeIcon?: ReactNode
  accentColor?: string
  surfaceColor?: string
  textColor?: string
  activeTextColor?: string
  glowColor?: string
  resetOnComplete?: boolean
  resetDelay?: number
  onComplete?: () => void
}

const sparkSeeds = [
  { left: 12, top: 24, x: -26, y: -26 },
  { left: 26, top: 76, x: -18, y: 28 },
  { left: 48, top: 18, x: 0, y: -32 },
  { left: 65, top: 80, x: 18, y: 30 },
  { left: 84, top: 28, x: 28, y: -24 },
  { left: 92, top: 64, x: 34, y: 12 },
]

export function AnimatedButton({
  label = "Start creating",
  hoverLabel = "Make it move",
  completeLabel = "Done",
  icon,
  completeIcon,
  accentColor = "#f7f34a",
  surfaceColor = "#111111",
  textColor = "#ffffff",
  activeTextColor = "#111111",
  glowColor = "#f04444",
  resetOnComplete = true,
  resetDelay = 1400,
  type = "button",
  disabled,
  className,
  style,
  onClick,
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onComplete,
  "aria-label": ariaLabel,
  ...props
}: AnimatedButtonProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const completedRef = useRef(false)
  const resetTimeoutRef = useRef<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const displayLabel = isComplete ? completeLabel : label
  const displayHoverLabel = isComplete ? completeLabel : hoverLabel

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 14, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: "elastic.out(1, 0.55)" }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  function reset() {
    completedRef.current = false
    setIsComplete(false)
  }

  function playCompleteMotion() {
    if (reducedMotion || !rootRef.current) {
      return
    }

    const sparks = rootRef.current.querySelectorAll("[data-button-spark]")

    gsap.killTweensOf([rootRef.current, iconRef.current, sparks])
    gsap.timeline().to(rootRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: "power2.out",
    }).to(rootRef.current, {
      scale: 1,
      duration: 0.48,
      ease: "elastic.out(1, 0.52)",
    })

    gsap.fromTo(
      iconRef.current,
      { rotate: -18, scale: 0.82 },
      { rotate: 0, scale: 1, duration: 0.42, ease: "back.out(2)" }
    )

    gsap.fromTo(
      sparks,
      { opacity: 0, scale: 0.25, x: 0, y: 0 },
      {
        opacity: 0.9,
        scale: 1,
        x: (index) => sparkSeeds[index]?.x ?? 0,
        y: (index) => sparkSeeds[index]?.y ?? 0,
        duration: 0.46,
        stagger: 0.025,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(sparks, {
            opacity: 0,
            scale: 0.2,
            duration: 0.24,
            stagger: 0.018,
            ease: "power2.out",
          })
        },
      }
    )
  }

  function complete() {
    if (disabled) {
      return
    }

    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    if (!completedRef.current) {
      completedRef.current = true
      setIsComplete(true)
      onComplete?.()
    }

    playCompleteMotion()

    if (resetOnComplete) {
      resetTimeoutRef.current = window.setTimeout(reset, resetDelay)
    }
  }

  return (
    <button
      ref={rootRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel ?? displayLabel}
      aria-pressed={isComplete}
      className={cn(
        "group/button relative isolate inline-flex h-14 min-w-[13rem] max-w-full touch-manipulation items-center justify-between gap-4 overflow-hidden rounded-full border border-white/15 bg-[var(--animated-button-surface)] px-2 pl-16 text-[0.95rem] font-semibold tracking-normal text-[var(--animated-button-text)] shadow-[0_22px_55px_rgba(0,0,0,0.2)] outline-none transition-[color,box-shadow,opacity] duration-500 [transform-style:preserve-3d] hover:text-[var(--animated-button-active-text)] focus-visible:ring-4 focus-visible:ring-[var(--animated-button-accent)]/30 disabled:pointer-events-none disabled:opacity-55 aria-pressed:text-[var(--animated-button-active-text)]",
        className
      )}
      style={
        {
          ...style,
          "--animated-button-accent": accentColor,
          "--animated-button-surface": surfaceColor,
          "--animated-button-text": textColor,
          "--animated-button-active-text": activeTextColor,
          "--animated-button-glow": glowColor,
        } as CSSProperties
      }
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          complete()
        }
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)

        if (reducedMotion || !rootRef.current || !sheenRef.current) {
          return
        }

        const rect = rootRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const rotateY = ((x - rect.width / 2) / rect.width) * 8
        const rotateX = ((rect.height / 2 - y) / rect.height) * 8

        gsap.to(rootRef.current, {
          rotateX,
          rotateY,
          duration: 0.45,
          ease: "power3.out",
        })
        gsap.to(sheenRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          opacity: 0.72,
          duration: 0.35,
          ease: "power3.out",
        })
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)

        if (reducedMotion || !rootRef.current || !sheenRef.current) {
          return
        }

        gsap.to(rootRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.58,
          ease: "elastic.out(1, 0.5)",
        })
        gsap.to(sheenRef.current, {
          opacity: 0,
          x: 0,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
        })
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)

        if (!reducedMotion && rootRef.current) {
          gsap.to(rootRef.current, { scale: 0.97, duration: 0.14, ease: "power2.out" })
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)

        if (!reducedMotion && rootRef.current) {
          gsap.to(rootRef.current, { scale: 1, duration: 0.34, ease: "elastic.out(1, 0.5)" })
        }
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-2 left-2 rounded-full bg-[var(--animated-button-accent)] shadow-[0_0_34px_var(--animated-button-glow)] transition-[width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:w-[calc(100%-1rem)]",
          isComplete ? "w-[calc(100%-1rem)]" : "w-10"
        )}
      />
      <span
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/42 opacity-0 blur-xl"
      />
      {sparkSeeds.map((spark, index) => (
        <span
          key={`${spark.left}-${spark.top}`}
          data-button-spark
          aria-hidden="true"
          className="pointer-events-none absolute z-20 size-1.5 rounded-full opacity-0"
          style={{
            left: `${spark.left}%`,
            top: `${spark.top}%`,
            backgroundColor: index % 2 === 0 ? "var(--animated-button-accent)" : "var(--animated-button-glow)",
          }}
        />
      ))}

      <span className="relative z-10 min-w-0">
        <span className="relative block h-5 overflow-hidden leading-5">
          <span
            className={cn(
              "block truncate transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              !isComplete && "group-hover/button:-translate-y-full"
            )}
          >
            {displayLabel}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-full block max-w-full truncate transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              !isComplete && "group-hover/button:-translate-y-full"
            )}
          >
            {displayHoverLabel}
          </span>
        </span>
      </span>

      <span
        ref={iconRef}
        aria-hidden="true"
        className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-[background,color,transform] duration-500 group-hover/button:bg-[#111111] group-hover/button:text-white group-hover/button:translate-x-0.5"
      >
        {isComplete ? completeIcon ?? <Check className="size-4" /> : icon ?? <ArrowRight className="size-4" />}
      </span>
    </button>
  )
}
