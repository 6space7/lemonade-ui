"use client"

import { type ComponentPropsWithoutRef, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

type GlassFolderProps = ComponentPropsWithoutRef<"figure"> & {
  label?: string
}

const paperLines = [
  ["w-28", "w-20", "w-24", "w-16"],
  ["w-24", "w-28", "w-20", "w-24"],
  ["w-20", "w-24", "w-28", "w-16"],
]

export function GlassFolder({
  label = "Frosted folder with layered documents",
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: GlassFolderProps) {
  const rootRef = useRef<HTMLElement>(null)
  const folderBackRef = useRef<HTMLDivElement>(null)
  const folderFrontRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      const papers = gsap.utils.toArray<HTMLElement>("[data-folder-paper]")
      const lines = gsap.utils.toArray<HTMLElement>("[data-folder-line]")

      gsap.set(rootRef.current, {
        clearProps: "transform",
        opacity: 1,
      })

      gsap.set(papers, {
        transformOrigin: "50% 100%",
        x: 0,
        y: 0,
        opacity: 1,
        rotate: (index) => [-6, 0, 6][index] ?? 0,
      })

      gsap.set(lines, {
        scaleX: 1,
        opacity: 1,
      })

      gsap.set([folderFrontRef.current, folderBackRef.current, glowRef.current], {
        clearProps: "transform",
      })
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  return (
    <figure
      ref={rootRef}
      aria-label={label}
      className={cn(
        "group/folder relative isolate mx-auto aspect-[1.18] w-[min(27rem,calc(100vw-3rem))] cursor-default select-none [perspective:900px]",
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)

        if (reducedMotion || !rootRef.current) {
          return
        }

        const papers = gsap.utils.toArray<HTMLElement>(
          rootRef.current.querySelectorAll("[data-folder-paper]")
        )
        const animatedTargets = [
          rootRef.current,
          folderFrontRef.current,
          folderBackRef.current,
          glowRef.current,
          ...papers,
        ].filter(Boolean)

        gsap.killTweensOf(animatedTargets)

        gsap.to(papers, {
          y: (index) => [-42, -56, -42][index] ?? -42,
          x: (index) => [-8, 0, 8][index] ?? 0,
          rotate: (index) => [-10, 0, 10][index] ?? 0,
          duration: 0.58,
          ease: "elastic.out(1, 0.62)",
          stagger: 0.035,
        })

        gsap.to(folderFrontRef.current, {
          y: 14,
          scaleY: 0.94,
          duration: 0.42,
          ease: "power3.out",
        })

        gsap.to(folderBackRef.current, {
          y: -8,
          duration: 0.42,
          ease: "power3.out",
        })

        gsap.to(glowRef.current, {
          opacity: 0.95,
          scale: 1.18,
          duration: 0.42,
          ease: "power3.out",
        })
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)

        if (reducedMotion || !rootRef.current) {
          return
        }

        const papers = gsap.utils.toArray<HTMLElement>(
          rootRef.current.querySelectorAll("[data-folder-paper]")
        )
        const animatedTargets = [
          rootRef.current,
          folderFrontRef.current,
          folderBackRef.current,
          glowRef.current,
          ...papers,
        ].filter(Boolean)

        gsap.killTweensOf(animatedTargets)

        gsap.set(rootRef.current, {
          clearProps: "transform",
        })

        gsap.to(papers, {
          x: 0,
          y: 0,
          rotate: (index) => [-6, 0, 6][index] ?? 0,
          duration: 0.58,
          ease: "elastic.out(1, 0.58)",
          stagger: 0.04,
        })

        gsap.to([folderFrontRef.current, folderBackRef.current], {
          y: 0,
          scaleY: 1,
          duration: 0.55,
          ease: "power3.out",
        })

        gsap.to(glowRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        })
      }}
      {...props}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-x-[11%] bottom-[1%] -z-20 h-[18%] rounded-full bg-[#51afe3]/28 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[10%] -z-10 rounded-[2rem] bg-[#8fd5ff]/16 blur-3xl"
      />

      <div className="absolute inset-x-[9%] bottom-[13%] h-[65%] [transform-style:preserve-3d]">
        <div
          ref={folderBackRef}
          className="absolute inset-x-[5%] bottom-[17%] h-[74%] rounded-[1.35rem] border border-white/30 bg-[linear-gradient(180deg,rgba(130,209,249,0.92),rgba(68,169,224,0.86))] shadow-[inset_0_1px_8px_rgba(255,255,255,0.42),0_28px_60px_rgba(37,126,184,0.26)]"
        />
        <div className="absolute left-[5%] top-[6%] h-[22%] w-[44%] rounded-t-[1.35rem] bg-[linear-gradient(180deg,rgba(135,214,251,0.94),rgba(85,183,232,0.88))]" />

        {paperLines.map((lines, paperIndex) => (
          <div
            key={paperIndex}
            data-folder-paper
            className={cn(
              "absolute bottom-[31%] h-[58%] w-[39%] -translate-x-1/2 rounded-xl border border-[#d9f3ff] bg-[#f7fbfc] shadow-[0_14px_28px_rgba(30,91,132,0.12)]",
              paperIndex === 0 && "left-[34%]",
              paperIndex === 1 && "left-1/2 z-10",
              paperIndex === 2 && "left-[66%]"
            )}
          >
            <div className="mx-auto mt-6 h-2 w-[70%] rounded-full bg-[#61b9e9]" />
            <div className="mt-6 space-y-3 px-8">
              {lines.map((width, lineIndex) => (
                <div key={lineIndex} className="grid grid-cols-[1fr_0.7fr] gap-3">
                  <span
                    data-folder-line
                    className={cn(
                      "h-1.5 origin-left rounded-full bg-[#8ed2f3]/75",
                      width
                    )}
                  />
                  <span
                    data-folder-line
                    className="h-1.5 origin-left rounded-full bg-[#8ed2f3]/55"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          ref={folderFrontRef}
          className="absolute inset-x-0 bottom-0 z-20 h-[55%] overflow-hidden rounded-b-[1.55rem] rounded-t-[1.15rem] border border-white/30 bg-[linear-gradient(180deg,rgba(163,225,255,0.62),rgba(64,170,226,0.78))] shadow-[inset_0_1px_10px_rgba(255,255,255,0.5),inset_0_-24px_42px_rgba(50,146,203,0.16),0_22px_52px_rgba(24,106,164,0.28)] backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_12%,rgba(255,255,255,0.58),transparent_32%),linear-gradient(110deg,rgba(255,255,255,0.38),transparent_34%,rgba(255,255,255,0.18)_64%,transparent)]" />
          <div className="absolute inset-x-[12%] top-[26%] space-y-3 opacity-45 blur-[1.4px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[1fr_0.8fr] gap-4">
                <span className="h-2 rounded-full bg-[#2f9ed7]/48" />
                <span className="h-2 rounded-full bg-[#2f9ed7]/36" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  )
}
