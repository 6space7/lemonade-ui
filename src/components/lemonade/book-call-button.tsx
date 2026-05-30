"use client"

import { type ComponentPropsWithoutRef, type ReactNode, useRef } from "react"
import { PhoneCall } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type BookCallButtonProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  label?: string
  icon?: ReactNode
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
  icon,
  href = "#",
  className,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onFocus,
  onBlur,
  "aria-label": ariaLabel,
  ...props
}: BookCallButtonProps) {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      gsap.set(fillRef.current, { width: "34%" })
      gsap.set(arrowRef.current, { x: 0, opacity: 1, scale: 1 })
      gsap.set(labelRef.current, { x: 0, opacity: 1 })
      gsap.set(iconRef.current, { scale: 0.7, opacity: 0, rotate: -12 })
      gsap.set(rootRef.current, { scale: 1 })
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const open = () => {
    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([
      rootRef.current,
      fillRef.current,
      arrowRef.current,
      labelRef.current,
      iconRef.current,
    ])

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    })

    timeline
      .to(rootRef.current, { scale: 1.015, duration: 0.32 }, 0)
      .to(fillRef.current, { width: "100%", duration: 0.5 }, 0)
      .to(labelRef.current, { x: 18, opacity: 0, duration: 0.2, ease: "power2.out" }, 0)
      .to(arrowRef.current, { x: 24, opacity: 0, scale: 0.82, duration: 0.2 }, 0)
      .to(
        iconRef.current,
        { scale: 1, opacity: 1, rotate: 0, duration: 0.38, ease: "back.out(1.7)" },
        0.16
      )
  }

  const close = () => {
    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([
      rootRef.current,
      fillRef.current,
      arrowRef.current,
      labelRef.current,
      iconRef.current,
    ])

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    })

    timeline
      .to(rootRef.current, { scale: 1, duration: 0.32 }, 0)
      .to(fillRef.current, { width: "34%", duration: 0.44 }, 0)
      .to(iconRef.current, { scale: 0.7, opacity: 0, rotate: 12, duration: 0.18 }, 0)
      .to(labelRef.current, { x: 0, opacity: 1, duration: 0.24 }, 0.1)
      .to(arrowRef.current, { x: 0, opacity: 1, scale: 1, duration: 0.24 }, 0.1)
  }

  const press = () => {
    if (reducedMotion) {
      return
    }

    gsap.to(rootRef.current, {
      scale: 0.985,
      duration: 0.16,
      ease: "power2.out",
    })
  }

  const release = () => {
    if (reducedMotion) {
      return
    }

    gsap.to(rootRef.current, {
      scale: 1.015,
      duration: 0.28,
      ease: "back.out(1.7)",
    })
  }

  return (
    <a
      ref={rootRef}
      href={href}
      aria-label={ariaLabel ?? label}
      className={cn(
        "group/book-call relative isolate inline-flex h-20 w-[min(31rem,calc(100vw-3rem))] items-center overflow-hidden rounded-full border-[7px] border-[#111111] bg-[#080808] px-2 text-white shadow-[0_20px_45px_rgba(0,0,0,0.22)] outline-none transition-shadow duration-300 focus-visible:shadow-[0_0_0_4px_rgba(119,255,31,0.3),0_22px_50px_rgba(0,0,0,0.28)] sm:h-24",
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        open()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        close()
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        press()
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        release()
      }}
      onFocus={(event) => {
        onFocus?.(event)
        open()
      }}
      onBlur={(event) => {
        onBlur?.(event)
        close()
      }}
      {...props}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute bottom-2 left-2 top-2 z-0 rounded-full bg-[linear-gradient(135deg,#62ff3d,#b6ff14)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-14px_24px_rgba(0,0,0,0.08)]"
      />

      <span
        ref={arrowRef}
        aria-hidden="true"
        className="absolute left-[12%] top-1/2 z-10 h-8 w-10 -translate-y-1/2"
      >
        {arrowDots.map((dot) => (
          <span
            key={`${dot.x}-${dot.y}`}
            className="absolute size-[4px] rounded-full bg-[#111111]"
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </span>

      <span
        ref={labelRef}
        className="relative z-10 ml-[37%] block min-w-0 flex-1 whitespace-nowrap text-center text-2xl font-medium leading-none tracking-normal text-white sm:text-[2.4rem]"
      >
        {label}
      </span>

      <span
        ref={iconRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 grid place-items-center text-[#111111]"
      >
        {icon ?? <PhoneCall className="size-7 sm:size-9" strokeWidth={2.3} />}
      </span>
    </a>
  )
}
