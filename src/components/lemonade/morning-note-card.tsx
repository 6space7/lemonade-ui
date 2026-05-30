"use client"

import { type ComponentPropsWithoutRef, useRef, useState } from "react"
import { SunMedium } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type MorningNote = {
  sender: string
  message: string
  emphasis?: string
}

export type MorningNoteCardProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label?: string
  time?: string
  period?: string
  notes?: MorningNote[]
  onNoteChange?: (note: MorningNote) => void
}

const defaultNotes: MorningNote[] = [
  {
    sender: "Morning Jay",
    message: "You have to start delegating tasks, now go carpe diem :)",
    emphasis: "delegating tasks",
  },
  {
    sender: "Morning Team",
    message: "Protect the deep work block and ship the tiny brave thing.",
    emphasis: "deep work",
  },
]

export function MorningNoteCard({
  label = "Morning note card",
  time = "9:41",
  period = "AM",
  notes = defaultNotes,
  onNoteChange,
  className,
  onPointerMove,
  onPointerLeave,
  onClick,
  type = "button",
  ...props
}: MorningNoteCardProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [noteIndex, setNoteIndex] = useState(0)
  const activeNote = notes[noteIndex] ?? defaultNotes[0]

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        noteRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const cycleNote = () => {
    const nextIndex = (noteIndex + 1) % Math.max(notes.length, 1)
    const nextNote = notes[nextIndex] ?? activeNote

    setNoteIndex(nextIndex)
    onNoteChange?.(nextNote)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf(noteRef.current)
    gsap.fromTo(
      noteRef.current,
      { y: 16, scale: 0.98, opacity: 0.7 },
      { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }
    )
  }

  return (
    <button
      ref={rootRef}
      type={type}
      aria-label={`${label}: ${activeNote.sender}`}
      className={cn(
        "relative isolate mx-auto aspect-[1.2] w-full max-w-[29rem] overflow-hidden rounded-[3rem] border border-white/70 bg-white text-left shadow-[0_24px_70px_rgba(76,75,95,0.18)] outline-none focus-visible:ring-4 focus-visible:ring-[#7767ff]/20",
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
          rotateX: y * -4,
          rotateY: x * 5,
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
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
        })
      }}
      onClick={(event) => {
        onClick?.(event)
        cycleNote()
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,#ffd76d_0%,rgba(255,215,109,0.75)_18%,transparent_46%),radial-gradient(circle_at_74%_38%,#ff778a_0%,rgba(255,119,138,0.75)_24%,transparent_58%),radial-gradient(circle_at_16%_100%,#625dff_0%,rgba(98,93,255,0.78)_28%,transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-white/18 backdrop-blur-[1px]"
      />

      <div className="absolute left-[9%] top-[13%] z-10 text-white">
        <div className="flex items-end gap-2">
          <span className="text-6xl font-black leading-none tracking-normal sm:text-7xl">
            {time}
          </span>
          <span className="pb-1 text-3xl font-black leading-none tracking-normal sm:text-4xl">
            {period}
          </span>
        </div>
      </div>

      <div
        ref={noteRef}
        className="absolute inset-x-[4%] bottom-[4%] z-10 h-[43%] rounded-[2rem] bg-white/94 p-[6%] text-[#101010] shadow-[0_18px_45px_rgba(62,55,96,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]"
      >
        <p className="mb-3 inline-flex items-center gap-2 text-base font-black uppercase tracking-normal text-black/18">
          <SunMedium className="size-5 text-[#ffbd21]" />
          {activeNote.sender}
        </p>
        <p className="text-xl font-semibold leading-tight tracking-normal text-black/38 sm:text-2xl">
          {renderMessage(activeNote)}
        </p>
      </div>
    </button>
  )
}

function renderMessage(note: MorningNote) {
  if (!note.emphasis || !note.message.includes(note.emphasis)) {
    return note.message
  }

  const [before, after] = note.message.split(note.emphasis)

  return (
    <>
      {before}
      <span className="text-black">{note.emphasis}</span>
      {after}
    </>
  )
}
