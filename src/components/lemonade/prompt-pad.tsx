"use client"

import { type ComponentPropsWithoutRef, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type PromptPadKeyTone =
  | "cream"
  | "peach"
  | "lilac"
  | "blue"
  | "yellow"
  | "green"
  | "coral"

type PromptPadKeyIcon = "us" | "jp" | "br" | "smile" | "bug" | "text"

export type PromptPadKey = {
  id: string
  label: string
  prompt: string
  caption?: string
  prefix?: string
  icon?: PromptPadKeyIcon
  tone?: PromptPadKeyTone
}

export type PromptPadProps = ComponentPropsWithoutRef<"figure"> & {
  label?: string
  screenPrompt: string
  modeLabel?: string
  statusLabel?: string
  keys: PromptPadKey[]
  defaultActiveKeyId?: string
  onKeyChange?: (key: PromptPadKey) => void
}

const keyToneClassName: Record<PromptPadKeyTone, string> = {
  cream: "bg-[linear-gradient(145deg,#fffdf6,#ebe4d2)] text-[#16120c]",
  peach: "bg-[linear-gradient(145deg,#fff1e7,#ffc49b)] text-[#20130c]",
  lilac: "bg-[linear-gradient(145deg,#f9dfff,#d99de8)] text-[#24142a]",
  blue: "bg-[linear-gradient(145deg,#17c7ff,#005bda_70%,#0037a4)] text-white",
  yellow: "bg-[linear-gradient(145deg,#fff600,#ffd500_72%,#d9ad00)] text-[#221900]",
  green: "bg-[linear-gradient(145deg,#10df5e,#00aa43_70%,#008032)] text-white",
  coral: "bg-[linear-gradient(145deg,#ff9d8d,#ff6058_72%,#db3d37)] text-[#210b08]",
}

export function PromptPad({
  label = "AI prompt keypad with language and tone presets",
  screenPrompt,
  modeLabel = "P2",
  statusLabel = "0",
  keys,
  defaultActiveKeyId,
  onKeyChange,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: PromptPadProps) {
  const rootRef = useRef<HTMLElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const availableKeys = keys.slice(0, 9)
  const [activeKeyId, setActiveKeyId] = useState(defaultActiveKeyId)
  const activeKey = activeKeyId ? availableKeys.find((key) => key.id === activeKeyId) : undefined
  const screenLines = splitPrompt(activeKey?.prompt ?? screenPrompt)

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.set(rootRef.current, {
        clearProps: "opacity,scale,transform",
      })

      gsap.to(dialRef.current, {
        rotate: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      })
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const pressKey = (key: PromptPadKey, element: HTMLButtonElement) => {
    setActiveKeyId(key.id)
    onKeyChange?.(key)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([element, screenRef.current, dialRef.current, glowRef.current])
    gsap.fromTo(
      element,
      { y: 8, scale: 0.94 },
      { y: 0, scale: 1, duration: 0.48, ease: "elastic.out(1, 0.5)" }
    )
    gsap.fromTo(
      screenRef.current,
      { boxShadow: "inset 0 0 0 rgba(111,255,167,0), 0 0 0 rgba(111,255,167,0)" },
      {
        boxShadow:
          "inset 0 0 24px rgba(111,255,167,0.08), 0 0 36px rgba(111,255,167,0.16)",
        duration: 0.36,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    )
    gsap.to(dialRef.current, {
      rotate: "+=28",
      scale: 1.05,
      duration: 0.42,
      ease: "power3.out",
      yoyo: true,
      repeat: 1,
    })
    gsap.fromTo(
      glowRef.current,
      { opacity: 0.3, scale: 0.92 },
      { opacity: 0.85, scale: 1.08, duration: 0.38, yoyo: true, repeat: 1, ease: "power2.out" }
    )
  }

  return (
    <figure
      ref={rootRef}
      aria-label={label}
      className={cn(
        "relative isolate mx-auto aspect-[0.76] w-[min(25rem,calc(100vw-3rem))] select-none [perspective:1000px]",
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
          rotateX: y * -5,
          rotateY: x * 6,
          duration: 0.65,
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
          duration: 0.8,
          ease: "elastic.out(1, 0.55)",
        })
      }}
      {...props}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-x-[8%] bottom-[-4%] -z-20 h-[22%] rounded-full bg-[#f5dfc3]/38 blur-2xl"
      />

      <div className="absolute inset-[3%] rounded-[2.45rem] bg-[#fff7e5] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_-22px_-18px_36px_rgba(123,98,48,0.16),0_28px_70px_rgba(0,0,0,0.26)]" />
      <div className="absolute inset-x-[9%] top-[5%] h-[28%] rounded-t-[2.1rem] bg-[linear-gradient(180deg,#f7f0de,#e8dcc4)]" />
      <div className="absolute -left-[1%] top-[36%] h-[12%] w-[4%] rounded-l-xl bg-[linear-gradient(180deg,#4da0ff,#1b58e9)] shadow-[inset_2px_0_5px_rgba(255,255,255,0.45)]" />
      <div className="absolute -left-[4%] top-[58%] h-[10%] w-[7%] rounded-l-2xl bg-[#fbf3df] shadow-[inset_-5px_0_10px_rgba(68,42,20,0.15),0_10px_18px_rgba(0,0,0,0.16)]" />

      <div
        ref={dialRef}
        className="absolute -right-[4%] top-[4%] z-20 grid aspect-square w-[31%] place-items-center rounded-full border border-[#ede4cc] bg-[#fff9ea] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.86),0_0_0_4px_rgba(37,33,23,0.18),0_18px_34px_rgba(0,0,0,0.24)]"
      >
        <div className="absolute inset-[10%] rounded-full border-[3px] border-[#3034ff] shadow-[0_0_18px_rgba(48,52,255,0.28)]" />
        <div className="relative grid size-[46%] place-items-center">
          <span className="absolute left-[5%] top-[13%] h-[52%] w-[48%] rounded-[30%] border-[3px] border-[#19150f] bg-[#fff9ea]" />
          <span className="absolute bottom-[10%] right-[5%] h-[52%] w-[48%] rounded-[30%] border-[3px] border-[#19150f] bg-[#fff9ea]" />
        </div>
      </div>

      <div className="absolute right-[16%] top-[29%] z-20 size-4 rounded-full bg-[#00a72e] shadow-[inset_0_1px_4px_rgba(255,255,255,0.6),0_0_18px_rgba(0,167,46,0.52)]" />

      <div
        ref={screenRef}
        className="absolute left-[10%] top-[10%] z-10 h-[20%] w-[68%] overflow-hidden rounded-tl-[1.65rem] rounded-tr-[1.15rem] rounded-bl-md border border-[#30291f]/35 bg-[#242523] px-[7%] py-[5%] shadow-[inset_0_0_18px_rgba(255,255,255,0.04),0_10px_20px_rgba(52,38,20,0.12)]"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:100%_7px] opacity-45" />
        <div className="relative font-mono text-[0.86rem] font-semibold uppercase leading-[1.1] tracking-[0.14em] text-[#ece8d6] [text-shadow:0_0_8px_rgba(236,232,214,0.25)]">
          {screenLines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
        <div className="absolute bottom-[10%] left-[7%] font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#d7d0bb]/70">
          {activeKey?.caption ?? modeLabel}
        </div>
        <div className="absolute bottom-[10%] right-[9%] font-mono text-[0.68rem] font-bold text-[#43e37b]">
          {statusLabel}
        </div>
      </div>

      <div className="absolute inset-x-[10%] bottom-[7%] z-10 grid h-[58%] grid-cols-3 gap-[3.1%]">
        {availableKeys.slice(0, 9).map((key) => {
          const isActive = activeKeyId === key.id

          return (
            <button
              key={key.id}
              type="button"
              data-prompt-pad-key
              aria-pressed={isActive}
              onClick={(event) => pressKey(key, event.currentTarget)}
              className={cn(
                "group/key relative min-h-0 overflow-hidden rounded-[1.2rem] border-[3px] border-[#2c160d] p-[7%] text-left shadow-[inset_0_2px_7px_rgba(255,255,255,0.72),inset_0_-16px_24px_rgba(0,0,0,0.12),0_10px_0_rgba(46,22,11,0.26),0_18px_24px_rgba(46,22,11,0.15)] outline-none transition-[filter,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:shadow-[inset_0_2px_7px_rgba(255,255,255,0.72),0_0_0_4px_rgba(48,52,255,0.22),0_10px_0_rgba(46,22,11,0.26)]",
                keyToneClassName[key.tone ?? "cream"],
                isActive && "shadow-[inset_0_2px_7px_rgba(255,255,255,0.76),inset_0_-16px_24px_rgba(0,0,0,0.12),0_0_0_4px_rgba(48,52,255,0.2),0_10px_0_rgba(46,22,11,0.22),0_0_28px_rgba(48,52,255,0.18)]"
              )}
            >
              <span className="pointer-events-none absolute inset-x-[12%] top-[8%] h-[38%] rounded-[1rem] bg-white/28 blur-[1px]" />
              <span className="relative flex h-full flex-col items-center justify-center">
                <span className="min-h-[2.8rem] w-full">{renderKeyFace(key)}</span>
                {key.caption ? (
                  <span className="mt-auto max-w-full truncate text-[0.52rem] font-black uppercase tracking-[0.14em] opacity-[0.58]">
                    {key.caption}
                  </span>
                ) : null}
              </span>
            </button>
          )
        })}
      </div>
    </figure>
  )
}

function renderKeyFace(key: PromptPadKey) {
  switch (key.icon) {
    case "us":
      return (
        <span className="mx-auto mt-1 block h-10 w-14 overflow-hidden rounded-sm border border-black/5 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
          <span className="block h-full bg-[linear-gradient(to_bottom,#d92f3b_0_8%,#fff_8%_16%,#d92f3b_16%_24%,#fff_24%_32%,#d92f3b_32%_40%,#fff_40%_48%,#d92f3b_48%_56%,#fff_56%_64%,#d92f3b_64%_72%,#fff_72%_80%,#d92f3b_80%_88%,#fff_88%_100%)]">
            <span className="block h-[54%] w-[46%] bg-[#2457c5]" />
          </span>
        </span>
      )
    case "jp":
      return (
        <span className="mx-auto grid h-12 w-14 place-items-center rounded-md bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
          <span className="size-7 rounded-full bg-[#ff0d23]" />
        </span>
      )
    case "br":
      return (
        <span className="mx-auto grid h-12 w-14 place-items-center rounded-md bg-[#18bb48] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
          <span className="grid size-10 rotate-45 place-items-center bg-[#ffe044]">
            <span className="size-4 -rotate-45 rounded-full bg-[#1b70df]" />
          </span>
        </span>
      )
    case "smile":
      return <span className="block text-center text-[2rem] font-black leading-none">:)</span>
    case "bug":
      return (
        <span className="mx-auto mt-1 grid size-12 place-items-center">
          <span className="relative block size-8 rounded-full bg-[#fa5252] shadow-[inset_8px_0_0_rgba(0,0,0,0.12)]">
            <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-[#2b1b0d]/55" />
            <span className="absolute left-1.5 top-2 size-1.5 rounded-full bg-[#2b1b0d]" />
            <span className="absolute right-1.5 top-2 size-1.5 rounded-full bg-[#2b1b0d]" />
            <span className="absolute left-2 bottom-2 size-1.5 rounded-full bg-[#2b1b0d]" />
            <span className="absolute right-2 bottom-2 size-1.5 rounded-full bg-[#2b1b0d]" />
          </span>
        </span>
      )
    default:
      return (
        <span className="grid h-full place-items-center text-center">
          {key.prefix ? (
            <span className="absolute left-[24%] top-[20%] text-[0.78rem] font-medium opacity-80">
              {key.prefix}
            </span>
          ) : null}
          <span className="text-[2.35rem] font-light leading-none tracking-normal">{key.label}</span>
        </span>
      )
  }
}

function splitPrompt(prompt: string) {
  const normalizedPrompt = prompt.replace(/\s+/g, " ").trim()
  const words = normalizedPrompt.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length > 20 && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = nextLine
    }

    if (lines.length === 3) {
      break
    }
  }

  if (currentLine && lines.length < 3) {
    lines.push(currentLine)
  }

  return lines.length > 0 ? lines : ["Ready"]
}
