"use client"

import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type ThreeDButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label?: string
  completeMessage?: string
  dragMessage?: string
  accentColor?: string
  knobColor?: string
  threshold?: number
  resetOnComplete?: boolean
  resetDelay?: number
  glow?: boolean
  onComplete?: () => void
  onReset?: () => void
}

export function ThreeDButton({
  label = "Slide to activate",
  completeMessage = "Activated",
  dragMessage,
  accentColor = "#19d814",
  knobColor = "#f8f8f3",
  threshold = 0.78,
  resetOnComplete = false,
  resetDelay = 1800,
  glow = true,
  type = "button",
  disabled,
  className,
  style,
  onClick,
  onKeyDown,
  onComplete,
  onReset,
  "aria-label": ariaLabel,
  ...props
}: ThreeDButtonProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const knobRef = useRef<HTMLSpanElement>(null)
  const messageRef = useRef<HTMLSpanElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const positionRef = useRef({ x: 0 })
  const activePointerIdRef = useRef<number | null>(null)
  const dragStartClientXRef = useRef(0)
  const dragStartXRef = useRef(0)
  const maxXRef = useRef(0)
  const knobWidthRef = useRef(0)
  const knobStartXRef = useRef(0)
  const completedRef = useRef(false)
  const draggedRef = useRef(false)
  const resetTimeoutRef = useRef<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      measure()
      updatePosition(completedRef.current ? maxXRef.current : 0)

      if (!reducedMotion) {
        gsap.fromTo(
          rootRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.68, ease: "elastic.out(1, 0.58)" }
        )
      }

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
    if (!trackRef.current || !knobRef.current) {
      return
    }

    knobWidthRef.current = knobRef.current.offsetWidth
    knobStartXRef.current = knobRef.current.offsetLeft
    maxXRef.current = Math.max(
      0,
      trackRef.current.clientWidth - knobWidthRef.current - knobStartXRef.current * 2
    )
  }

  function updatePosition(nextX: number) {
    const x = clamp(nextX, 0, maxXRef.current)
    const progress = maxXRef.current > 0 ? x / maxXRef.current : 0

    positionRef.current.x = x

    gsap.set(knobRef.current, { x })
    gsap.set(sheenRef.current, {
      x: progress * 34,
      opacity: 0.32 + progress * 0.34,
    })
  }

  function animateTo(targetX: number, onDone?: () => void) {
    gsap.killTweensOf(positionRef.current)

    if (reducedMotion) {
      updatePosition(targetX)
      onDone?.()
      return
    }

    gsap.to(positionRef.current, {
      x: targetX,
      duration: targetX > positionRef.current.x ? 0.42 : 0.56,
      ease: targetX > positionRef.current.x ? "power3.out" : "elastic.out(1, 0.58)",
      onUpdate: () => updatePosition(positionRef.current.x),
      onComplete: () => {
        updatePosition(targetX)
        onDone?.()
      },
    })
  }

  function showMessage(message: string) {
    setVisibleMessage(message)

    if (reducedMotion) {
      gsap.set(messageRef.current, { opacity: 1, y: 0, scale: 1 })
      return
    }

    window.requestAnimationFrame(() => {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 8, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "back.out(1.8)" }
      )
    })
  }

  function hideMessage(onHidden?: () => void) {
    if (!visibleMessage) {
      onHidden?.()
      return
    }

    if (reducedMotion) {
      setVisibleMessage(null)
      onHidden?.()
      return
    }

    gsap.to(messageRef.current, {
      opacity: 0,
      y: 8,
      scale: 0.96,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        setVisibleMessage(null)
        onHidden?.()
      },
    })
  }

  function reset() {
    completedRef.current = false
    setIsComplete(false)
    hideMessage()
    animateTo(0, onReset)
  }

  function complete() {
    if (completedRef.current) {
      animateTo(maxXRef.current)
      return
    }

    completedRef.current = true
    setIsComplete(true)
    animateTo(maxXRef.current, () => {
      showMessage(completeMessage)
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

    if (dragMessage) {
      showMessage(dragMessage)
    }

    if (!reducedMotion) {
      gsap.to(rootRef.current, { scale: 0.99, duration: 0.16, ease: "power2.out" })
      gsap.to(knobRef.current, { y: 4, scale: 0.96, duration: 0.16, ease: "power2.out" })
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
      gsap.to(rootRef.current, { scale: 1, duration: 0.24, ease: "power3.out" })
      gsap.to(knobRef.current, { y: 0, scale: 1, duration: 0.42, ease: "elastic.out(1, 0.5)" })
    }

    if (maxXRef.current > 0 && positionRef.current.x / maxXRef.current >= threshold) {
      complete()
    } else {
      hideMessage()
      animateTo(0)
    }
  }

  return (
    <button
      ref={rootRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel ?? (isComplete ? completeMessage : `${label}. Drag right to activate.`)}
      aria-pressed={isComplete}
      className={cn(
        "relative isolate inline-grid h-[5.5rem] w-[15.5rem] touch-manipulation place-items-center overflow-visible rounded-full outline-none [transform-style:preserve-3d]",
        "focus-visible:ring-4 focus-visible:ring-[#1dd816]/30 disabled:pointer-events-none disabled:opacity-55",
        className
      )}
      style={
        {
          ...style,
          "--three-d-accent": accentColor,
          "--three-d-knob": knobColor,
        } as CSSProperties
      }
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

        if (event.key === "Escape") {
          event.preventDefault()
          reset()
        }
      }}
      {...props}
    >
      {glow ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-8 bottom-0 h-10 translate-y-8 rounded-full bg-[#16ce12]/40 blur-2xl"
        />
      ) : null}

      <span
        ref={trackRef}
        aria-hidden="true"
        className="relative block h-full w-full overflow-hidden rounded-full border border-white/80 bg-[linear-gradient(145deg,#ffffff,#dfe4dc_48%,#ffffff)] p-[0.45rem] shadow-[0_1.35rem_2.6rem_rgba(31,58,27,0.2),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-0.35rem_0.75rem_rgba(93,106,84,0.22)]"
      >
        <span className="absolute inset-[0.45rem] rounded-full bg-[linear-gradient(145deg,var(--three-d-accent),#3af52f_48%,#0baa12)] shadow-[inset_0_0.55rem_0.9rem_rgba(255,255,255,0.28),inset_0_-0.8rem_1.05rem_rgba(5,91,8,0.22),0_0.55rem_1.3rem_rgba(24,207,19,0.3)]" />
        <span className="absolute inset-[0.45rem] rounded-full bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(90deg,rgba(5,109,9,0.16),transparent_42%,rgba(255,255,255,0.24))]" />
        <span
          ref={sheenRef}
          className="absolute left-[5rem] top-3 h-10 w-24 rounded-full bg-white/28 opacity-35 blur-xl"
        />
        <span
          ref={knobRef}
          className="absolute left-[0.54rem] top-[0.54rem] z-10 grid size-[4.42rem] touch-none cursor-grab place-items-center rounded-full border border-black/5 bg-[var(--three-d-knob)] shadow-[0_0.95rem_1.45rem_rgba(15,45,13,0.28),inset_0_0.22rem_0.55rem_rgba(255,255,255,0.98),inset_0_-0.45rem_0.75rem_rgba(177,184,172,0.45)] active:cursor-grabbing"
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className="size-[3.38rem] rounded-full bg-[linear-gradient(145deg,#ffffff,var(--three-d-knob)_58%,#d9ded5)] shadow-[inset_0_1px_0_rgba(255,255,255,1)]" />
        </span>
      </span>

      <span
        ref={messageRef}
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-20 mt-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#163016] opacity-0 shadow-[0_0.9rem_2rem_rgba(28,58,22,0.16)]",
          visibleMessage && "opacity-100"
        )}
      >
        {visibleMessage}
      </span>

      <span className="sr-only">{label}</span>
    </button>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
