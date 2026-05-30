"use client"

import { type ComponentPropsWithoutRef, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

type MagneticButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  intensity?: number
  glow?: boolean
}

export function MagneticButton({
  children,
  className,
  intensity = 0.42,
  glow = true,
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  ...props
}: MagneticButtonProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const haloRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        rootRef.current,
        { y: 14, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.55)",
        }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  return (
    <Button
      ref={rootRef}
      className={cn(
        "group/button relative h-14 overflow-hidden rounded-lg border border-black/10 bg-[#f7f34a] px-6 text-[0.94rem] font-semibold text-[#10120d] shadow-[0_20px_60px_rgba(155,145,14,0.28)] transition-colors duration-300 hover:bg-[#fff863] focus-visible:ring-[#f7f34a]/50 dark:border-white/10 dark:bg-[#f7f34a] dark:text-[#10120d]",
        className
      )}
      onPointerMove={(event) => {
        onPointerMove?.(event)

        if (reducedMotion || !rootRef.current || !haloRef.current) {
          return
        }

        const rect = rootRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(rootRef.current, {
          x: x * intensity,
          y: y * intensity,
          rotateX: y * -0.08,
          rotateY: x * 0.08,
          duration: 0.55,
          ease: "power3.out",
        })

        gsap.to(haloRef.current, {
          x,
          y,
          opacity: 0.8,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        })
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)

        if (reducedMotion || !rootRef.current || !haloRef.current) {
          return
        }

        gsap.to(rootRef.current, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.45)",
        })

        gsap.to(haloRef.current, {
          opacity: 0,
          scale: 0.75,
          duration: 0.35,
          ease: "power2.out",
        })
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)

        if (!reducedMotion && rootRef.current) {
          gsap.to(rootRef.current, {
            scale: 0.94,
            duration: 0.18,
            ease: "power2.out",
          })
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)

        if (!reducedMotion && rootRef.current) {
          gsap.to(rootRef.current, {
            scale: 1,
            duration: 0.45,
            ease: "elastic.out(1, 0.5)",
          })
        }
      }}
      {...props}
    >
      {glow ? (
        <span
          ref={haloRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 opacity-0 blur-2xl"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
      </span>
    </Button>
  )
}
