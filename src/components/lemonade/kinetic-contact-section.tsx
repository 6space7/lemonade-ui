"use client"

import {
  type ComponentPropsWithoutRef,
  type PointerEvent,
  useEffect,
  useRef,
} from "react"
import { ArrowRight, Copy, Mail } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type KineticContactLabels = {
  email?: string
  address?: string
  phone?: string
  copyEmail?: string
}

export type KineticContactSectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  email?: string
  emailHref?: string
  addressLines?: [string, string] | string[]
  suite?: string
  phone?: string
  phoneHref?: string
  alternatePhone?: string
  labels?: KineticContactLabels
  onEmailClick?: () => void
  onPhoneClick?: () => void
}

const defaultLabels: Required<KineticContactLabels> = {
  email: "Email",
  address: "Address",
  phone: "Phone",
  copyEmail: "Copy email",
}

export function KineticContactSection({
  email = "hello@example.com",
  emailHref,
  addressLines = ["123 Example Ave.", "Placeholder City, ST 00000"],
  suite = "#000",
  phone = "000-000-0000",
  phoneHref,
  alternatePhone = "000-000-0000",
  labels,
  onEmailClick,
  onPhoneClick,
  className,
  ...props
}: KineticContactSectionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const mergedLabels = { ...defaultLabels, ...labels }
  const resolvedEmailHref = emailHref ?? `mailto:${email}`
  const resolvedPhoneHref = phoneHref ?? `tel:${phone.replace(/[^\d+]/g, "")}`
  const [firstAddress = "", secondAddress = ""] = addressLines

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      gsap.fromTo(
        rootRef.current.querySelectorAll("[data-contact-intro]"),
        { y: 28, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.72, stagger: 0.08, ease: "power3.out" }
      )
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative isolate w-full overflow-hidden bg-[#f8f8f4] px-5 py-7 text-[#18191c] sm:px-9 sm:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-[72rem] gap-1">
        <div data-contact-intro className="grid grid-cols-[3.5rem_1fr] items-center gap-4 sm:grid-cols-[5rem_1fr]">
          <KineticMark />
          <ElasticDivider ariaLabel="Top contact divider" />
        </div>

        <a
          data-contact-intro
          href={resolvedEmailHref}
          onClick={onEmailClick}
          className="group/email grid min-w-0 grid-cols-[3.25rem_1fr] items-center gap-3 py-5 outline-none sm:grid-cols-[6rem_1fr] sm:gap-4 sm:py-8"
          aria-label={`${mergedLabels.email}: ${email}`}
        >
          <span
            aria-hidden="true"
            className="relative size-11 justify-self-center rounded-full border-[0.75rem] border-[#ff4853] transition-all duration-500 group-hover/email:scale-110 group-hover/email:border-[0.45rem] group-focus-visible/email:scale-110"
          >
            <span className="absolute inset-1 rounded-full bg-[#ff4853] opacity-0 transition-opacity duration-500 group-hover/email:opacity-100 group-focus-visible/email:opacity-100" />
          </span>
          <span className="flex min-w-0 items-center gap-4">
            <span className="block min-w-0 truncate text-[clamp(1.1rem,5.8vw,2rem)] font-black leading-none tracking-normal sm:text-[clamp(2rem,7vw,4.6rem)]">
              {email}
            </span>
            <Mail className="hidden size-8 shrink-0 opacity-0 transition-all duration-500 group-hover/email:translate-x-1 group-hover/email:opacity-100 sm:block" />
          </span>
        </a>

        <ElasticDivider ariaLabel="Email and address divider" />

        <div
          data-contact-intro
          className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:py-9"
          aria-label={mergedLabels.address}
        >
          <MenuGlyph />
          <div className="min-w-0 pl-1 sm:pl-0">
            <p className="text-[clamp(2.45rem,7.2vw,5.4rem)] font-medium leading-[0.95] tracking-normal">
              {firstAddress}
            </p>
            <p className="mt-7 text-[clamp(2.05rem,6.4vw,4.65rem)] font-medium leading-[0.95] tracking-normal">
              {secondAddress}
            </p>
          </div>
          {suite ? (
            <span className="group/suite mt-1 inline-flex h-20 w-fit items-center justify-center rounded-full border-2 border-[#18191c]/42 px-9 text-[clamp(1.8rem,4.2vw,3.1rem)] font-medium tracking-normal transition-transform duration-500 hover:-rotate-3 hover:scale-105 sm:mt-4 sm:h-24">
              <span className="transition-transform duration-500 group-hover/suite:-translate-y-1">{suite}</span>
            </span>
          ) : null}
        </div>

        <ElasticDivider ariaLabel="Address and phone divider" />

        <div
          data-contact-intro
          className="grid items-center gap-5 py-6 sm:grid-cols-[18rem_1fr] sm:py-7"
          aria-label={mergedLabels.phone}
        >
          <a
            href={resolvedPhoneHref}
            onClick={onPhoneClick}
            className="group/arrow inline-flex w-fit items-center gap-0 outline-none"
            aria-label={`${mergedLabels.phone}: ${phone}`}
          >
            <span className="h-1.5 w-44 bg-[#050505] transition-all duration-500 group-hover/arrow:w-52 group-focus-visible/arrow:w-52" />
            <ArrowRight className="-ml-5 size-24 stroke-[1.4] transition-transform duration-500 group-hover/arrow:translate-x-4 group-focus-visible/arrow:translate-x-4" />
          </a>

          <a
            href={resolvedPhoneHref}
            onClick={onPhoneClick}
            className="group/phone relative min-w-0 w-full max-w-full justify-self-start overflow-hidden rounded-full border-2 border-[#18191c]/35 bg-[#f8f8f4]/72 px-8 py-5 text-[clamp(1.55rem,3.2vw,2.55rem)] font-medium leading-none tracking-normal outline-none transition-all duration-500 hover:border-[#18191c]/70 hover:bg-white focus-visible:ring-4 focus-visible:ring-[#18191c]/12 sm:w-auto sm:px-12"
          >
            <span className="block max-w-full overflow-hidden sm:max-w-[min(32rem,calc(100vw-6rem))]">
              <span className="flex min-w-max gap-12 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/phone:-translate-x-[42%] group-focus-visible/phone:-translate-x-[42%]">
                <span>{phone}</span>
                <span>{alternatePhone}</span>
                <span>{phone}</span>
              </span>
            </span>
            <PhoneCord />
          </a>
        </div>

        <ElasticDivider ariaLabel="Bottom contact divider" />

        <button
          type="button"
          data-contact-intro
          onClick={() => navigator.clipboard?.writeText(email)}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#18191c]/18 px-4 py-2 text-sm font-semibold text-[#18191c]/68 transition-colors hover:border-[#18191c]/45 hover:text-[#18191c] focus-visible:ring-4 focus-visible:ring-[#18191c]/10"
        >
          <Copy className="size-4" />
          {mergedLabels.copyEmail}
        </button>
      </div>
    </section>
  )
}

function ElasticDivider({ ariaLabel }: { ariaLabel: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const pointRef = useRef({ x: 0, y: 18 })
  const widthRef = useRef(0)
  const height = 42
  const baseY = 21

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current

    if (!svg || !path) {
      return
    }

    const render = () => {
      path.setAttribute("d", `M 0 ${baseY} Q ${pointRef.current.x} ${pointRef.current.y} ${widthRef.current} ${baseY}`)
    }

    const resize = () => {
      widthRef.current = svg.getBoundingClientRect().width
      pointRef.current.x = widthRef.current / 2
      pointRef.current.y = baseY
      render()
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(svg)

    return () => observer.disconnect()
  }, [])

  const animateLine = (event: PointerEvent<SVGSVGElement>) => {
    if (reducedMotion || !svgRef.current || !pathRef.current) {
      return
    }

    const rect = svgRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const distance = Math.abs(y - baseY)
    const influence = Math.max(0, 1 - distance / 64)
    const direction = y < baseY ? 1 : -1
    const targetY = baseY + direction * 38 * influence

    gsap.to(pointRef.current, {
      x,
      y: targetY,
      duration: 0.36,
      ease: "power3.out",
      onUpdate: () => {
        pathRef.current?.setAttribute(
          "d",
          `M 0 ${baseY} Q ${pointRef.current.x} ${pointRef.current.y} ${widthRef.current} ${baseY}`
        )
      },
    })
  }

  const settleLine = () => {
    if (reducedMotion || !pathRef.current) {
      return
    }

    gsap.to(pointRef.current, {
      x: widthRef.current / 2,
      y: baseY,
      duration: 0.9,
      ease: "elastic.out(1, 0.45)",
      onUpdate: () => {
        pathRef.current?.setAttribute(
          "d",
          `M 0 ${baseY} Q ${pointRef.current.x} ${pointRef.current.y} ${widthRef.current} ${baseY}`
        )
      },
    })
  }

  return (
    <svg
      ref={svgRef}
      role="img"
      aria-label={ariaLabel}
      height={height}
      className="h-[42px] w-full overflow-visible"
      onPointerMove={animateLine}
      onPointerLeave={settleLine}
    >
      <path
        ref={pathRef}
        d={`M 0 ${baseY} Q 0 ${baseY} 1 ${baseY}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        className="text-[#18191c]/45"
      />
    </svg>
  )
}

function KineticMark() {
  return (
    <span className="relative grid size-12 place-items-center sm:size-16" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="size-12 sm:size-14">
        <path
          d="M32 4 56 18v28L32 60 8 46V18L32 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="text-[#18191c]"
        />
        <path
          d="M32 4v56M8 18l48 28M56 18 8 46M8 18h48M8 46h48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
          className="text-[#18191c]/72"
        />
      </svg>
    </span>
  )
}

function MenuGlyph() {
  return (
    <span className="grid w-16 gap-2 self-start pt-2" aria-hidden="true">
      <span className="h-0.5 w-16 bg-[#18191c]/80 transition-transform duration-500 hover:translate-x-2" />
      <span className="h-0.5 w-16 bg-[#18191c]/80" />
      <span className="h-0.5 w-16 bg-[#18191c]/80" />
    </span>
  )
}

function PhoneCord() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-8 -top-14 hidden size-36 rotate-[22deg] text-[#18191c]/48 transition-transform duration-700 group-hover/phone:-translate-y-2 group-hover/phone:rotate-[10deg] sm:block"
    >
      <svg viewBox="0 0 140 140" className="size-full overflow-visible">
        <path
          d="M23 83 C12 55 25 24 53 16 C83 7 113 24 122 54 C128 75 120 96 103 109"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M18 78 C8 69 4 58 12 50 C20 42 39 49 49 64 C57 76 58 89 49 94 C39 100 26 88 18 78Z"
          fill="#f8f8f4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M92 102 C82 92 78 80 86 72 C95 64 114 72 123 87 C131 100 130 113 121 118 C110 124 99 110 92 102Z"
          fill="#f8f8f4"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </span>
  )
}
