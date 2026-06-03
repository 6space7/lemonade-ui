"use client"

import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useMemo,
  useRef,
} from "react"
import {
  Apple,
  Archive,
  CalendarDays,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Folder,
  Grid2X2,
  Hash,
  Kanban,
  ListFilter,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Star,
  Trash2,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type ChoresHeroNavItem = {
  label: string
  href?: string
}

export type ChoresHeroCta = {
  label: string
  href?: string
  target?: ComponentPropsWithoutRef<"a">["target"]
  rel?: string
  ariaLabel?: string
}

export type ChoresHeroLogo = {
  label: string
  muted?: boolean
}

export type ChoresHeroTask = {
  title: string
  description: string
  date: string
  comments?: number
  attachments?: number
  checklist?: string
  label?: string
  accentColor?: string
  progressColor?: string
  assignees?: string[]
}

export type ChoresHeroColumn = {
  title: string
  count: number
  accentColor?: string
  tasks: ChoresHeroTask[]
}

export type ChoresHeroProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  brandName?: string
  brandHref?: string
  navItems?: ChoresHeroNavItem[]
  navCta?: ChoresHeroCta
  trialBadge?: string
  headline?: string
  description?: string
  primaryCta?: ChoresHeroCta
  boardLabel?: string
  boardTitle?: string
  boardEditedLabel?: string
  newTaskLabel?: string
  sidebarPlanLabel?: string
  trustedLabel?: string
  trustedLogos?: ChoresHeroLogo[]
  columns?: ChoresHeroColumn[]
}

const defaultNavItems: ChoresHeroNavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Blog", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
]

const defaultLogos: ChoresHeroLogo[] = [
  { label: "slack" },
  { label: "GitHub" },
  { label: "Clearbit" },
  { label: "hotjar" },
  { label: "Spotify", muted: true },
  { label: "HubSpot", muted: true },
]

const defaultColumns: ChoresHeroColumn[] = [
  {
    title: "To do",
    count: 3,
    accentColor: "#ef4444",
    tasks: [
      {
        title: "Implement Multi-Language Support",
        description: "Add the ability for users to switch between different languages.",
        date: "09 Sept - 30 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#ef4444",
        progressColor: "#54c878",
        assignees: ["AR", "JS"],
      },
      {
        title: "Create User Authentication",
        description: "Develop a secure user authentication system with session handling.",
        date: "17 Sept - 4 Oct",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        progressColor: "#54c878",
        assignees: ["NL", "MP"],
      },
      {
        title: "Set Up SEO Meta Tags",
        description: "Implement dynamic meta tags for SEO purposes across all pages.",
        date: "21 Sept - 30 Sept",
        comments: 12,
        attachments: 3,
        checklist: "9/10",
        label: "Bug",
        accentColor: "#f59e0b",
        progressColor: "#54c878",
        assignees: ["KL"],
      },
    ],
  },
  {
    title: "Progress",
    count: 5,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Redesign Product Detail Page",
        description: "Revamp the product detail page for better readability and engagement.",
        date: "02 Sept - 25 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#eab308",
        progressColor: "#54c878",
        assignees: ["SK", "AM"],
      },
      {
        title: "Build Dynamic Search Functionality",
        description: "Develop a dynamic search bar with real-time suggestions.",
        date: "23 August - 4 Oct",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        progressColor: "#54c878",
        assignees: ["HD", "LT"],
      },
      {
        title: "API Fails to Fetch Data on Slow Connections",
        description: "Optimize the API to handle slower speeds and implement retry logic.",
        date: "21 Sept - 18 Oct",
        comments: 12,
        attachments: 3,
        checklist: "9/10",
        label: "Bug",
        accentColor: "#f59e0b",
        progressColor: "#54c878",
        assignees: ["KO"],
      },
    ],
  },
  {
    title: "Completed",
    count: 2,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Create Dashboard Wireframes",
        description: "Design wireframes for the user dashboard with clear navigation.",
        date: "02 Sept - 05 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#22c55e",
        progressColor: "#54c878",
        assignees: ["MR", "CB"],
      },
      {
        title: "Incorrect Error Message on Failed Login",
        description: "Update failed login messages with clearer recovery guidance.",
        date: "17 Sept - 20 Sept",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        progressColor: "#54c878",
        assignees: ["AV"],
      },
    ],
  },
]

const sidebarItems = [
  { label: "Tasks", icon: Kanban, active: true },
  { label: "Files", icon: Folder },
  { label: "Archive", icon: Archive },
  { label: "Trash", icon: Trash2 },
]

const featureItems = [
  { label: "Integrations", icon: Zap },
  { label: "Analytics", icon: ChartNoAxesColumn },
  { label: "Schedule", icon: CalendarDays },
]

export function ChoresHero({
  brandName = "Chores",
  brandHref = "#home",
  navItems = defaultNavItems,
  navCta = { label: "Book a demo", href: "#demo" },
  trialBadge = "30-day trial, no credit cards required",
  headline = "Get Clarity. Get Things Done",
  description = "Chores empowers you to manage tasks, projects, and teams in one place to boost productivity at any time.",
  primaryCta = { label: "Download for Mac", href: "#download" },
  boardLabel = "Tasks / Kanban Design Project",
  boardTitle = "Kanban",
  boardEditedLabel = "Edited 19 mins ago",
  newTaskLabel = "New Task",
  sidebarPlanLabel = "Trial ends in 5 days",
  trustedLabel = "Trusted by leading tech companies",
  trustedLogos = defaultLogos,
  columns = defaultColumns,
  className,
  ...props
}: ChoresHeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const safeColumns = columns.length ? columns : defaultColumns
  const safeLogos = useMemo(
    () => (trustedLogos.length ? trustedLogos : defaultLogos),
    [trustedLogos]
  )

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-chores-reveal]",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }
        )
        gsap.fromTo(
          "[data-chores-board]",
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.24 }
        )
        gsap.to("[data-chores-cloud]", {
          x: (index) => (index % 2 === 0 ? 18 : -14),
          y: (index) => (index % 2 === 0 ? -8 : 6),
          duration: 5.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: 0.8,
        })
      }, rootRef)

      return () => context.revert()
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative isolate min-h-[58rem] w-full overflow-hidden bg-[#dce8ff] px-4 pt-7 text-[#111111] sm:px-8 lg:min-h-[68rem]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 -z-20 h-[70%] bg-[linear-gradient(180deg,#7896f8_0%,#9ab4ff_48%,#c8dbff_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-[34%] bg-[linear-gradient(180deg,rgba(220,232,255,0),#dce8ff_38%,#dce8ff_100%)]" />
      <Cloud className="left-[8%] top-[44%] h-24 w-56 opacity-35" />
      <Cloud className="right-[10%] top-[52%] h-28 w-64 opacity-38" />
      <Cloud className="left-[42%] top-[30%] h-24 w-72 opacity-55" />

      <div className="mx-auto flex w-full max-w-[92rem] flex-col items-center">
        <nav
          data-chores-reveal
          aria-label="Main navigation"
          className="flex min-h-16 w-full max-w-3xl items-center gap-3 rounded-full border border-white/70 bg-white/95 px-4 shadow-[0_18px_45px_rgba(29,48,112,0.22)] backdrop-blur"
        >
          <a
            href={brandHref}
            className="flex shrink-0 items-center gap-2 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-white/70"
          >
            <span aria-hidden="true" className="relative grid size-7 place-items-center">
              <span className="absolute left-1 top-1 h-5 w-2.5 -rotate-[38deg] rounded-sm bg-[#141414]" />
              <span className="absolute right-1 top-1 h-5 w-2.5 -rotate-[38deg] rounded-sm bg-[#141414]" />
            </span>
            <span className="text-base font-black tracking-normal">{brandName}</span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                aria-label={item.label}
                className="group/cta inline-flex h-9 items-center overflow-hidden rounded-full px-1 text-sm font-bold tracking-normal text-black/72 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7896f8]/25"
              >
                <AnimatedCtaLabel label={item.label} />
              </a>
            ))}
          </div>

          <a
            href={navCta.href ?? "#"}
            target={navCta.target}
            rel={navCta.rel}
            aria-label={navCta.ariaLabel ?? navCta.label}
            className="group/cta relative ml-auto inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111111] px-5 text-sm font-bold tracking-normal text-white shadow-[inset_0_-3px_0_rgba(255,255,255,0.14),0_8px_18px_rgba(0,0,0,0.2)] transition-transform before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:before:translate-x-full focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7896f8]/35 focus-visible:before:translate-x-full"
          >
            <AnimatedCtaLabel label={navCta.label} />
          </a>
        </nav>

        <div className="relative z-10 flex w-full flex-col items-center pt-16 text-center sm:pt-20">
          <div
            data-chores-reveal
            className="inline-flex min-h-8 items-center rounded-full border border-white/65 bg-white/16 px-4 text-xs font-bold tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] backdrop-blur"
          >
            {trialBadge}
          </div>

          <h1
            data-chores-reveal
            className="mt-6 max-w-5xl text-5xl font-black leading-[1.04] tracking-normal text-white drop-shadow-[0_6px_24px_rgba(55,83,167,0.22)] sm:text-6xl lg:text-7xl"
          >
            {headline}
          </h1>

          <p
            data-chores-reveal
            className="mt-7 max-w-3xl text-lg font-semibold leading-8 tracking-normal text-white/90 sm:text-xl"
          >
            {description}
          </p>

          <a
            data-chores-reveal
            href={primaryCta.href ?? "#"}
            target={primaryCta.target}
            rel={primaryCta.rel}
            aria-label={primaryCta.ariaLabel ?? primaryCta.label}
            className="group/cta relative isolate mt-10 inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-[#2467f2] px-7 text-base font-black tracking-normal text-white shadow-[0_18px_32px_rgba(30,82,214,0.38),inset_0_-3px_0_rgba(0,0,0,0.16)] transition-transform before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] before:transition-transform before:duration-700 hover:-translate-y-1 hover:before:translate-x-full focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:before:translate-x-full"
          >
            <Apple className="relative z-10 size-5 fill-current" />
            <AnimatedCtaLabel label={primaryCta.label} />
          </a>
        </div>

        <div
          data-chores-board
          className="relative z-10 mt-14 w-full max-w-[74rem] px-0 sm:px-4"
        >
          <div className="absolute inset-x-4 -top-7 -z-10 h-24 rounded-[2rem] bg-white/20 blur-xl" />
          <div className="overflow-hidden rounded-2xl border border-white/70 bg-[#f7f9fc] shadow-[0_24px_75px_rgba(54,83,145,0.34)]">
            <div className="flex h-12 items-center border-b border-[#dfe5ee] bg-[#fbfcff] px-4">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-8 flex items-center gap-3 text-xs font-bold text-[#7e8797]">
                <ChevronLeft className="size-3.5" />
                <ChevronRight className="size-3.5" />
                <MoreHorizontal className="size-4" />
              </div>
              <div className="ml-5 hidden items-center gap-1 text-xs font-bold text-[#7b8493] sm:flex">
                <span className="size-3 rounded-sm border border-[#c8ceda]" />
                {boardLabel}
              </div>
              <div className="ml-auto hidden items-center gap-3 text-xs font-bold text-[#a1a8b4] md:flex">
                <span>{boardEditedLabel}</span>
                <AvatarStack labels={["A", "M", "K"]} extra="+15" />
                <button
                  type="button"
                  className="rounded-md border border-[#d6dce7] bg-white px-3 py-1.5 text-[#111111] shadow-sm"
                >
                  Share
                </button>
                <Clock3 className="size-4" />
                <Star className="size-4 fill-[#ffc83d] text-[#ffc83d]" />
                <MoreHorizontal className="size-4" />
              </div>
            </div>

            <div className="grid min-h-[34rem] grid-cols-1 md:grid-cols-[13.5rem_minmax(0,1fr)]">
              <aside className="hidden border-r border-[#dfe5ee] bg-[#f6f8fb] p-4 md:block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-md bg-[#2e6bf2] text-xs font-black text-white">
                      K
                    </span>
                    <span className="text-sm font-black">{boardTitle}</span>
                    <ChevronDown className="size-3.5 text-[#717a89]" />
                  </div>
                  <Grid2X2 className="size-4 text-[#717a89]" />
                </div>

                <div className="mt-5 flex h-8 items-center gap-2 rounded-md border border-[#dfe5ee] bg-white px-2 text-xs font-bold text-[#9aa3b2]">
                  <Search className="size-3.5" />
                  <span>Search...</span>
                  <span className="ml-auto text-[#111111]">Cmd K</span>
                </div>

                <div className="mt-5 space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={cn(
                          "flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs font-bold text-[#444c59]",
                          item.active && "bg-[#e8ebf0] text-[#111111]"
                        )}
                      >
                        <Icon className="size-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>

                <SidebarSection title="Feature" items={featureItems} />
                <SidebarSection
                  title="Teamspace"
                  items={[
                    { label: "Design", icon: Circle, color: "#7c3aed" },
                    { label: "Engineering", icon: Circle, color: "#f59e0b" },
                  ]}
                />
                <SidebarSection
                  title="Starred"
                  items={[
                    { label: "Created by me", icon: Star },
                    { label: "Kanban Design Project", icon: Folder },
                    { label: "development", icon: Hash },
                  ]}
                />

                <div className="mt-7 rounded-lg border border-[#dcd8ff] bg-white p-3 shadow-[0_12px_30px_rgba(78,80,128,0.1)]">
                  <div className="rounded-md bg-[#d7ccff] p-3">
                    <div className="mb-2 flex justify-between text-[0.62rem] font-black">
                      <span>Basic Plan</span>
                      <span className="rounded-full bg-white px-1.5 text-[#6d4eff]">3/7</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="block h-1.5 w-full rounded-full bg-white/70" />
                      <span className="block h-1.5 w-4/5 rounded-full bg-white/70" />
                    </div>
                  </div>
                  <p className="mt-2 text-[0.64rem] font-black text-[#111111]">
                    {sidebarPlanLabel}
                  </p>
                  <p className="mt-1 text-[0.6rem] font-semibold leading-3 text-[#6b7280]">
                    You are on a free trial of the Basic plan.
                  </p>
                </div>
              </aside>

              <main className="min-w-0 bg-[#f7f9fc]">
                <div className="flex flex-wrap items-center gap-3 border-b border-[#dfe5ee] px-4 py-3">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-[#dfe5ee] bg-white px-3 text-xs font-bold text-[#6b7280]"
                  >
                    <ListFilter className="size-3.5" />
                    Apply filter
                  </button>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous month"
                      className="hidden size-9 place-items-center rounded-md border border-[#dfe5ee] bg-white text-[#6b7280] sm:grid"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="hidden h-9 rounded-md border border-[#dfe5ee] bg-white px-4 text-xs font-black sm:block"
                    >
                      This month
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      className="hidden size-9 place-items-center rounded-md border border-[#dfe5ee] bg-white text-[#6b7280] sm:grid"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Switch board view"
                      className="grid size-9 place-items-center rounded-md border border-[#dfe5ee] bg-white text-[#6b7280]"
                    >
                      <Kanban className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2e6bf2] px-4 text-xs font-black text-white shadow-[0_8px_18px_rgba(46,107,242,0.28)]"
                    >
                      <Plus className="size-4" />
                      {newTaskLabel}
                    </button>
                  </div>
                </div>

                <div className="grid min-w-[54rem] grid-cols-3 gap-4 p-4 md:min-w-0">
                  {safeColumns.map((column) => (
                    <KanbanColumn key={column.title} column={column} />
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>

        <div data-chores-reveal className="w-full max-w-6xl pb-10 pt-16 text-center">
          <p className="text-sm font-bold tracking-normal text-[#4d5668]">{trustedLabel}</p>
          <div className="mt-7 grid grid-cols-2 items-center gap-7 text-[#1d2430] sm:grid-cols-3 lg:grid-cols-6">
            {safeLogos.map((logo) => (
              <div
                key={logo.label}
                className={cn(
                  "text-2xl font-black tracking-normal",
                  logo.muted && "text-[#7e899c]"
                )}
              >
                {logo.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AnimatedCtaLabel({ label }: { label: string }) {
  const letters = Array.from(label)
  const renderLetter = (letter: string, index: number, isClone = false) => (
    <span
      key={`${isClone ? "clone" : "base"}-${letter}-${index}`}
      className={cn(
        "inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.82,0.18,1)] motion-reduce:transition-none",
        isClone
          ? "translate-y-full group-hover/cta:translate-y-0 group-focus-visible/cta:translate-y-0"
          : "group-hover/cta:-translate-y-full group-focus-visible/cta:-translate-y-full"
      )}
      style={{ transitionDelay: `${index * 18}ms` }}
    >
      {letter === " " ? "\u00a0" : letter}
    </span>
  )

  return (
    <span aria-hidden="true" className="relative z-10 block h-[1.15em] overflow-hidden leading-[1.15]">
      <span className="flex">{letters.map((letter, index) => renderLetter(letter, index))}</span>
      <span className="absolute inset-0 flex">
        {letters.map((letter, index) => renderLetter(letter, index, true))}
      </span>
    </span>
  )
}

function Cloud({ className }: { className?: string }) {
  return (
    <div
      data-chores-cloud
      aria-hidden="true"
      className={cn("absolute -z-10", className)}
    >
      <span className="absolute bottom-0 left-[8%] h-[45%] w-[74%] rounded-full bg-white blur-[2px]" />
      <span className="absolute bottom-[18%] left-[26%] h-[60%] w-[38%] rounded-full bg-white blur-[2px]" />
      <span className="absolute bottom-[12%] right-[12%] h-[48%] w-[34%] rounded-full bg-white blur-[2px]" />
    </div>
  )
}

function SidebarSection({
  title,
  items,
}: {
  title: string
  items: {
    label: string
    icon: LucideIcon
    color?: string
  }[]
}) {
  return (
    <div className="mt-5">
      <p className="px-2 text-[0.62rem] font-black text-[#9aa3b2]">{title}</p>
      <div className="mt-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.label}
              type="button"
              className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs font-bold text-[#444c59] hover:bg-[#e8ebf0]"
            >
              <Icon
                className="size-4"
                style={item.color ? ({ color: item.color, fill: item.color } as CSSProperties) : undefined}
              />
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function KanbanColumn({ column }: { column: ChoresHeroColumn }) {
  return (
    <section className="min-w-0 rounded-xl bg-[#edf0f5] p-3">
      <div className="mb-3 flex h-8 items-center gap-2">
        <span
          className="size-4 rounded-full border-2 bg-white"
          style={{ borderColor: column.accentColor ?? "#22c55e" }}
        />
        <h3 className="truncate text-sm font-black">{column.title}</h3>
        <span className="rounded-md bg-white px-2 py-0.5 text-xs font-black text-[#6b7280]">
          {column.count}
        </span>
        <MoreHorizontal className="ml-auto size-4 text-[#7e8797]" />
        <Plus className="size-4 text-[#7e8797]" />
      </div>

      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.title} task={task} />
        ))}
      </div>
    </section>
  )
}

function TaskCard({ task }: { task: ChoresHeroTask }) {
  return (
    <article
      className="rounded-xl border border-[#e4e8f0] bg-white p-3 shadow-[0_8px_20px_rgba(33,42,64,0.08)]"
    >
      <div className="flex items-start gap-2">
        <span
          className="mt-1 h-4 w-3 rounded-sm"
          style={{ backgroundColor: task.accentColor ?? "#ef4444" }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h4 className="line-clamp-1 text-xs font-black leading-5">{task.title}</h4>
            <MoreHorizontal className="ml-auto size-4 shrink-0 text-[#9aa3b2]" />
          </div>
          <p className="line-clamp-2 text-[0.68rem] font-semibold leading-4 text-[#697384]">
            {task.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-[0.64rem] font-black text-[#6b7280]">
        <CalendarDays className="size-3" />
        {task.date}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <AvatarStack labels={task.assignees ?? ["A"]} />
        <Pill icon={<Users className="size-3" />} label={String(task.comments ?? 0)} />
        <Pill icon={<Share2 className="size-3" />} label={String(task.attachments ?? 0)} />
        <Pill
          label={task.checklist ?? "0/0"}
          dotColor={task.progressColor ?? "#54c878"}
        />
        {task.label ? (
          <span className="rounded-full bg-[#eef3ff] px-2 py-1 text-[0.62rem] font-black text-[#3267d6]">
            {task.label}
          </span>
        ) : null}
      </div>
    </article>
  )
}

function Pill({
  icon,
  label,
  dotColor,
}: {
  icon?: ReactNode
  label: string
  dotColor?: string
}) {
  return (
    <span className="inline-flex h-6 items-center gap-1 rounded-full border border-[#e3e8f0] bg-[#f8fafc] px-2 text-[0.62rem] font-black text-[#596273]">
      {dotColor ? (
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      ) : (
        icon
      )}
      {label}
    </span>
  )
}

function AvatarStack({ labels, extra }: { labels: string[]; extra?: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {labels.slice(0, 3).map((label, index) => (
        <span
          key={`${label}-${index}`}
          className="-ml-1 first:ml-0 grid size-5 place-items-center rounded-full border border-white bg-[#dbeafe] text-[0.55rem] font-black text-[#1d4ed8]"
        >
          {label.slice(0, 1)}
        </span>
      ))}
      {extra ? (
        <span className="-ml-1 grid size-5 place-items-center rounded-full border border-white bg-[#111111] text-[0.5rem] font-black text-white">
          {extra}
        </span>
      ) : null}
    </div>
  )
}
