"use client"

import { type ComponentPropsWithoutRef, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type LoopPadKeyTone = "dark" | "accent" | "space"

export type LoopPadKey = {
  id: string
  label: string
  hint?: string
  span?: number
  tone?: LoopPadKeyTone
}

export type LoopPadKeyboardProps = Omit<ComponentPropsWithoutRef<"figure">, "onKeyPress"> & {
  label?: string
  title?: string
  topLabel?: string
  sideLabel?: string
  topKeys?: string[]
  keys?: LoopPadKey[][]
  onKeyPress?: (key: LoopPadKey) => void
  onMacroPress?: (key: string, index: number) => void
  onKnobTurn?: (id: string) => void
}

const defaultTopKeys = ["record", "clip", "mix", "loop", "mute", "send", "grid", "tap", "hold"]

const defaultKeyRows: LoopPadKey[][] = [
  [
    { id: "esc", label: "esc" },
    { id: "q", label: "Q", hint: "1" },
    { id: "w", label: "W", hint: "2" },
    { id: "e", label: "E", hint: "3" },
    { id: "r", label: "R", hint: "4" },
    { id: "t", label: "T", hint: "5" },
    { id: "y", label: "Y", hint: "6" },
    { id: "u", label: "U", hint: "7" },
    { id: "i", label: "I", hint: "8" },
    { id: "o", label: "O", hint: "9" },
    { id: "p", label: "P", hint: "0" },
    { id: "backspace", label: "bck" },
  ],
  [
    { id: "tab", label: "tab" },
    { id: "a", label: "A" },
    { id: "s", label: "S" },
    { id: "d", label: "D" },
    { id: "f", label: "F" },
    { id: "g", label: "G" },
    { id: "h", label: "H" },
    { id: "j", label: "J" },
    { id: "k", label: "K" },
    { id: "l", label: "L" },
    { id: "quote", label: "'", hint: "\"" },
    { id: "semicolon", label: ";", hint: ":" },
  ],
  [
    { id: "shift", label: "shft" },
    { id: "z", label: "Z" },
    { id: "x", label: "X" },
    { id: "c", label: "C" },
    { id: "v", label: "V" },
    { id: "b", label: "B" },
    { id: "n", label: "N" },
    { id: "m", label: "M" },
    { id: "comma", label: ",", hint: "<" },
    { id: "period", label: ".", hint: ">" },
    { id: "up", label: "^" },
    { id: "go", label: "go" },
  ],
  [
    { id: "ctrl", label: "ctrl" },
    { id: "alt", label: "alt" },
    { id: "spark", label: "+*" },
    { id: "dot-1", label: "" },
    { id: "dot-2", label: "" },
    { id: "space", label: "", span: 2, tone: "space" },
    { id: "dot-3", label: "" },
    { id: "slash", label: "/", hint: "?" },
    { id: "left", label: "<-" },
    { id: "down", label: "dn" },
    { id: "right", label: "->" },
  ],
]

const sideKeys: LoopPadKey[] = [
  { id: "nano-one", label: "" },
  { id: "nano-two", label: "" },
]

export function LoopPadKeyboard({
  label = "Loop pad mechanical keyboard",
  title = "work keeb 40% +1",
  topLabel = "loop pad",
  sideLabel = "nano pad",
  topKeys = defaultTopKeys,
  keys = defaultKeyRows,
  onKeyPress,
  onMacroPress,
  onKnobTurn,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: LoopPadKeyboardProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      gsap.set(rootRef.current, {
        opacity: 1,
        scale: 1,
        clearProps: "transform",
      })
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const pressKey = (key: LoopPadKey, element: HTMLElement) => {
    onKeyPress?.(key)
    pulseKey(element)
  }

  const pressMacro = (key: string, index: number, element: HTMLElement) => {
    onMacroPress?.(key, index)
    pulseKey(element)
  }

  const turnKnob = (id: string, element: HTMLElement) => {
    onKnobTurn?.(id)

    if (reducedMotion) {
      return
    }

    gsap.to(element, {
      rotate: "+=32",
      duration: 0.38,
      ease: "power3.out",
    })
  }

  const pulseKey = (element: HTMLElement) => {
    if (reducedMotion) {
      return
    }

    gsap.killTweensOf(element)
    gsap.fromTo(
      element,
      { y: 4, scale: 0.96 },
      { y: 0, scale: 1, duration: 0.42, ease: "elastic.out(1, 0.52)" }
    )
  }

  return (
    <figure
      ref={rootRef}
      aria-label={label}
      className={cn(
        "relative isolate mx-auto aspect-[2.03/1] w-full max-w-[58rem] select-none",
        className
      )}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[4%] bottom-[2%] -z-20 h-[18%] rounded-full bg-black/18 blur-xl"
      />
      <div className="absolute left-[2%] top-[6%] h-[24%] w-[15%] rounded-2xl bg-white/42 shadow-[inset_0_1px_1px_rgba(255,255,255,0.72),0_12px_28px_rgba(20,20,20,0.12)] backdrop-blur-md">
        <Screw className="left-[14%] top-[18%]" />
        <Screw className="right-[14%] top-[18%]" />
        <Screw className="left-[14%] bottom-[18%]" />
        <Screw className="right-[14%] bottom-[18%]" />
      </div>

      <section className="absolute left-[14%] right-[1.5%] top-[5%] h-[24%] rounded-xl border border-white/10 bg-[#202020] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-20px_28px_rgba(0,0,0,0.32),0_14px_28px_rgba(0,0,0,0.2)]">
        <Screw className="left-[1.4%] top-[12%]" />
        <Screw className="right-[1.4%] top-[12%]" />
        <Screw className="left-[1.4%] bottom-[12%]" />
        <Screw className="right-[1.4%] bottom-[12%]" />

        <div className="grid h-full grid-cols-[1.25fr_3fr_0.55fr] items-center gap-[2%] px-[3%] py-[1.8%]">
          <div className="flex h-full items-center gap-[4%]">
            {[0, 1, 2].map((knob) => (
              <Knob
                key={knob}
                ariaLabel={`Turn top knob ${knob + 1}`}
                onTurn={(element) => turnKnob(`top-${knob + 1}`, element)}
              />
            ))}
          </div>

          <div className="grid h-[72%] grid-cols-9 gap-[1.5%]">
            {topKeys.slice(0, 9).map((key, index) => (
              <button
                key={`${key}-${index}`}
                type="button"
                className="group/key relative min-w-0 rounded-lg border border-black/50 bg-[#262626] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-10px_18px_rgba(0,0,0,0.34),0_4px_0_#141414] outline-none transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/28"
                aria-label={`Macro ${key}`}
                onClick={(event) => pressMacro(key, index, event.currentTarget)}
              >
                <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/78 shadow-[0_0_12px_rgba(255,255,255,0.28)]" />
              </button>
            ))}
          </div>

          <div className="justify-self-end text-right text-[0.72rem] font-black leading-[0.9] tracking-normal text-white max-sm:hidden">
            <span className="block text-[1rem] leading-none">+</span>
            {topLabel.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </div>
        </div>

        <p className="absolute inset-x-0 bottom-[6%] text-center text-[0.45rem] font-medium tracking-normal text-white/62 max-sm:hidden">
          From louder minds to creative people // Work Louder 2022
        </p>
      </section>

      <section className="absolute bottom-[5%] left-[2%] top-[33%] w-[12%] rounded-xl border border-white/10 bg-[#202020] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-20px_28px_rgba(0,0,0,0.34),0_14px_30px_rgba(0,0,0,0.22)]">
        <Screw className="left-[11%] top-[7%]" />
        <Screw className="right-[11%] top-[7%]" />
        <Screw className="left-[11%] bottom-[7%]" />
        <Screw className="right-[11%] bottom-[7%]" />

        <div className="absolute inset-x-[22%] top-[12%]">
          <Knob
            ariaLabel="Turn nano pad knob"
            onTurn={(element) => turnKnob("nano", element)}
          />
        </div>

        <div className="absolute inset-x-[22%] top-[37%] grid gap-[9%]">
          {sideKeys.map((key) => (
            <KeyboardKey
              key={key.id}
              item={key}
              onPress={pressKey}
              className="aspect-square"
            />
          ))}
        </div>

        <p className="absolute bottom-[9%] left-[48%] origin-left -rotate-90 whitespace-nowrap text-[0.72rem] font-black leading-[0.86] tracking-normal text-white max-sm:hidden">
          +*<br />
          {sideLabel}
        </p>
        <p className="absolute left-[9%] top-[20%] origin-left rotate-90 whitespace-nowrap text-[0.42rem] font-semibold text-white/58 max-sm:hidden">
          Tiny module // Work louder 2022
        </p>
      </section>

      <section className="absolute bottom-[5%] left-[14%] right-[1.5%] top-[33%] overflow-hidden rounded-xl border border-white/10 bg-[#202020] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-24px_36px_rgba(0,0,0,0.34),0_16px_34px_rgba(0,0,0,0.24)]">
        <Screw className="left-[1.4%] top-[5%]" />
        <Screw className="right-[1.4%] top-[5%]" />
        <Screw className="left-[1.4%] bottom-[5%]" />
        <Screw className="right-[1.4%] bottom-[5%]" />

        <div className="absolute left-[3.8%] right-[12.2%] top-[11%] grid h-[72%] grid-rows-4 gap-[4%]">
          {keys.slice(0, 4).map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-12 gap-[1.1%]">
              {row.map((key) => (
                <KeyboardKey key={key.id} item={key} onPress={pressKey} />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute right-[2.4%] top-[11%] w-[7.4%]">
          <Knob
            ariaLabel="Turn main keyboard knob"
            onTurn={(element) => turnKnob("main", element)}
          />
        </div>

        <div className="absolute right-[2.6%] top-[43%] flex gap-[10%]">
          {["#f6f34b", "#96d7ff", "#f6f34b"].map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="h-2 w-1.5 rotate-[-28deg] rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <p className="absolute bottom-[9%] right-[3.6%] text-[0.86rem] font-black leading-[0.9] tracking-normal text-white max-sm:hidden">
          +*<br />
          {title.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </p>
      </section>

      <div
        aria-hidden="true"
        className="absolute left-[12.6%] top-[31%] h-[3%] w-[2.4%] rounded-full bg-[#121212] shadow-[0_0_0_2px_rgba(255,255,255,0.03)]"
      />
    </figure>
  )
}

function KeyboardKey({
  item,
  onPress,
  className,
}: {
  item: LoopPadKey
  onPress: (key: LoopPadKey, element: HTMLElement) => void
  className?: string
}) {
  const isBlank = item.label.length === 0

  return (
    <button
      type="button"
      aria-label={isBlank ? item.id : item.label}
      className={cn(
        "relative min-w-0 overflow-hidden rounded-lg border border-black/55 bg-[#272727] px-1 text-center text-[0.62rem] font-semibold tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-12px_18px_rgba(0,0,0,0.34),0_4px_0_#141414] outline-none transition-[filter] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/28",
        item.tone === "accent" && "bg-[#303030]",
        item.tone === "space" && "grid place-items-center",
        className
      )}
      style={{ gridColumn: `span ${item.span ?? 1}` }}
      onClick={(event) => onPress(item, event.currentTarget)}
    >
      {isBlank ? (
        <span className="mx-auto block size-2 rounded-full bg-white/78 shadow-[0_0_12px_rgba(255,255,255,0.22)]" />
      ) : (
        <>
          {item.hint ? (
            <span className="absolute left-[18%] top-[14%] text-[0.42rem] font-semibold text-white/48 max-sm:hidden">
              {item.hint}
            </span>
          ) : null}
          <span className="relative top-[1px] block truncate">{item.label}</span>
        </>
      )}
      {item.tone === "space" ? (
        <span className="absolute left-1/2 top-1/2 h-1.5 w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/78" />
      ) : null}
    </button>
  )
}

function Knob({
  ariaLabel,
  onTurn,
}: {
  ariaLabel: string
  onTurn: (element: HTMLElement) => void
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="relative aspect-square w-full rounded-full border border-black/20 bg-[linear-gradient(90deg,#f3f3ee_0_46%,#d6d6d1_46%_54%,#f3f3ee_54%_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.85),inset_0_-10px_18px_rgba(0,0,0,0.16),0_5px_10px_rgba(0,0,0,0.22)] outline-none transition-[filter] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-white/36"
      onClick={(event) => onTurn(event.currentTarget)}
    >
      <span className="absolute inset-y-[12%] left-1/2 w-px -translate-x-1/2 bg-black/40" />
    </button>
  )
}

function Screw({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute size-3 rounded-full bg-[#050505] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.18),inset_-1px_-1px_1px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/18" />
    </span>
  )
}
