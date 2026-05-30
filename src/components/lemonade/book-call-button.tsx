"use client"

import {
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { PhoneCall } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type BookCallButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label?: string
  completeIcon?: ReactNode
  completeLabel?: string
  threshold?: number
  resetOnComplete?: boolean
  resetDelay?: number
  onComplete?: () => void
}

const arrowDots = [
  { x: 6, y: 4 },
  { x: 14, y: 8 },
  { x: 22, y: 12 },
  { x: 30, y: 16 },
  { x: 22, y: 20 },
  { x: 14, y: 24 },
  { x: 6, y: 28 },
  { x: 14, y: 16 },
  { x: 22, y: 16 },
  { x: 6, y: 12 },
  { x: 6, y: 20 },
]

export function BookCallButton({
  label = "Book a call",
  completeIcon,
  completeLabel = "Call booked",
  threshold = 0.82,
  resetOnComplete = false,
  resetDelay = 1400,
  onComplete,
  type = "button",
  disabled,
  className,
  onClick,
  onKeyDown,
  "aria-label": ariaLabel,
  ...props
}: BookCallButtonProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const handleRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const positionRef = useRef({ x: 0 })
  const activePointerIdRef = useRef<number | null>(null)
  const dragStartClientXRef = useRef(0)
  const dragStartXRef = useRef(0)
  const maxXRef = useRef(0)
  const handleWidthRef = useRef(0)
  const completedRef = useRef(false)
  const draggedRef = useRef(false)
  const resetTimeoutRef = useRef<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      measure()
      updatePosition(completedRef.current ? maxXRef.current : 0)

      const handleResize = () => {
        measure()
        updatePosition(completedRef.current ? maxXRef.current : positionRef.current.x)
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
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

  function measure() {
    if (!trackRef.current || !handleRef.current) {
      return
    }

    const handleWidth = handleRef.current.offsetWidth
    handleWidthRef.current = handleWidth
    maxXRef.current = Math.max(0, trackRef.current.clientWidth - handleWidth)
  }

  function updatePosition(nextX: number) {
    const maxX = maxXRef.current
    const handleWidth = handleWidthRef.current
    const x = clamp(nextX, 0, maxX)
    const progress = maxX > 0 ? x / maxX : 0

    positionRef.current.x = x

    gsap.set(handleRef.current, { x })
    gsap.set(handleRef.current, {
      opacity: clamp(1 - (progress - 0.9) / 0.1, 0, 1),
    })
    gsap.set(fillRef.current, { width: handleWidth + x })
    gsap.set(labelRef.current, {
      x: progress * 18,
      opacity: clamp(1 - progress * 1.8, 0, 1),
    })
    gsap.set(arrowRef.current, {
      x: progress * 12,
      opacity: clamp(1 - progress * 2.4, 0, 1),
      scale: 1 - progress * 0.1,
    })
    gsap.set(iconRef.current, {
      opacity: clamp((progress - 0.58) / 0.42, 0, 1),
      rotate: -14 + progress * 14,
      scale: 0.72 + progress * 0.28,
    })
  }

  const animateTo = (targetX: number, onDone?: () => void) => {
    gsap.killTweensOf(positionRef.current)

    if (reducedMotion) {
      updatePosition(targetX)
      onDone?.()
      return
    }

    gsap.to(positionRef.current, {
      x: targetX,
      duration: targetX > positionRef.current.x ? 0.42 : 0.5,
      ease: targetX > positionRef.current.x ? "power3.out" : "elastic.out(1, 0.62)",
      onUpdate: () => updatePosition(positionRef.current.x),
      onComplete: () => {
        updatePosition(targetX)
        onDone?.()
      },
    })
  }

  const reset = () => {
    completedRef.current = false
    setIsComplete(false)
    animateTo(0)
  }

  const complete = () => {
    if (completedRef.current) {
      animateTo(maxXRef.current)
      return
    }

    completedRef.current = true
    setIsComplete(true)
    animateTo(maxXRef.current, () => {
      onComplete?.()

      if (resetOnComplete) {
        resetTimeoutRef.current = window.setTimeout(reset, resetDelay)
      }
    })
  }

  const startDrag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (disabled || completedRef.current) {
      return
    }

    event.preventDefault()
    measure()
    activePointerIdRef.current = event.pointerId
    dragStartClientXRef.current = event.clientX
    dragStartXRef.current = positionRef.current.x
    draggedRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
    gsap.killTweensOf(positionRef.current)

    if (!reducedMotion) {
      gsap.to(rootRef.current, {
        scale: 0.992,
        duration: 0.18,
        ease: "power2.out",
      })
    }
  }

  const drag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (activePointerIdRef.current !== event.pointerId || completedRef.current) {
      return
    }

    const delta = event.clientX - dragStartClientXRef.current

    if (Math.abs(delta) > 3) {
      draggedRef.current = true
    }

    updatePosition(dragStartXRef.current + delta)
  }

  const endDrag = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return
    }

    activePointerIdRef.current = null

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (!reducedMotion) {
      gsap.to(rootRef.current, {
        scale: 1,
        duration: 0.24,
        ease: "power3.out",
      })
    }

    if (maxXRef.current > 0 && positionRef.current.x / maxXRef.current >= threshold) {
      complete()
    } else {
      animateTo(0)
    }
  }

  return (
    <button
      ref={rootRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel ?? (isComplete ? completeLabel : `${label}. Drag right to activate.`)}
      aria-pressed={isComplete}
      className={cn(
        "relative isolate inline-flex h-20 w-[min(31rem,calc(100vw-3rem))] items-center overflow-hidden rounded-full border-[7px] border-[#111111] bg-[#080808] text-white shadow-[0_20px_45px_rgba(0,0,0,0.22)] outline-none transition-[box-shadow,opacity] duration-300 focus-visible:shadow-[0_0_0_4px_rgba(119,255,31,0.3),0_22px_50px_rgba(0,0,0,0.28)] disabled:cursor-not-allowed disabled:opacity-55 sm:h-24",
        className
      )}
      onClick={(event) => {
        if (draggedRef.current) {
          event.preventDefault()
          draggedRef.current = false
          return
        }

        onClick?.(event)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        if (event.defaultPrevented || disabled) {
          return
        }

        if ((event.key === "Enter" || event.key === " ") && !completedRef.current) {
          event.preventDefault()
          measure()
          complete()
        }

        if (event.key === "Escape" && !completedRef.current) {
          animateTo(0)
        }
      }}
      {...props}
    >
      <span
        ref={trackRef}
        aria-hidden="true"
        className="absolute inset-2 overflow-hidden rounded-full"
      >
        <span
          ref={fillRef}
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(135deg,#62ff3d,#b6ff14)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-14px_24px_rgba(0,0,0,0.08)]"
        />
        <span
          ref={handleRef}
          className="absolute inset-y-0 left-0 z-10 grid w-[34%] touch-none cursor-grab place-items-center rounded-full bg-[linear-gradient(135deg,#62ff3d,#b6ff14)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-14px_24px_rgba(0,0,0,0.08)] active:cursor-grabbing"
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span
            ref={arrowRef}
            className="relative h-8 w-10"
          >
            {arrowDots.map((dot) => (
              <span
                key={`${dot.x}-${dot.y}`}
                className="absolute size-[4px] rounded-full bg-[#111111]"
                style={{ left: dot.x, top: dot.y }}
              />
            ))}
          </span>
        </span>
      </span>

      <span
        ref={labelRef}
        className="pointer-events-none absolute inset-y-0 left-[37%] right-8 z-10 grid place-items-center whitespace-nowrap text-2xl font-medium leading-none tracking-normal text-white sm:text-[2.4rem]"
      >
        {label}
      </span>

      <span
        ref={iconRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 grid place-items-center text-[#111111]"
      >
        {completeIcon ?? <PhoneCall className="size-7 sm:size-9" strokeWidth={2.3} />}
      </span>
    </button>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
