"use client"

import { type ComponentPropsWithoutRef, useId, useMemo, useRef } from "react"
import { ArrowRight, CalendarDays, Menu, Play, Search } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type AuraHeroAvatar = {
  label: string
  src?: string
  initials?: string
  color?: string
}

export type AuraHeroCta = {
  label: string
  href?: string
  target?: ComponentPropsWithoutRef<"a">["target"]
  rel?: string
  ariaLabel?: string
}

export type AuraHeroNavAction = {
  label: string
  icon: "search" | "calendar" | "menu"
  href?: string
  target?: ComponentPropsWithoutRef<"a">["target"]
  rel?: string
  ariaLabel?: string
}

export type AuraHeroLogo = {
  label: string
}

export type AuraHeroGalleryItem = {
  label: string
  src?: string
  alt?: string
  objectPosition?: string
  scene?: "party" | "wheel" | "toast" | "festival" | "fashion" | "motion"
  gradient?: string
}

export type AuraEventsHeroProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  brandName?: string
  brandHref?: string
  navActions?: AuraHeroNavAction[]
  joinedCount?: string
  joinedLabel?: string
  joinedHref?: string
  joinedAriaLabel?: string
  avatars?: AuraHeroAvatar[]
  description?: string
  headlineTop?: string
  headlineBottom?: string
  note?: string
  primaryCta?: AuraHeroCta
  playCta?: AuraHeroCta
  logos?: AuraHeroLogo[]
  gallery?: AuraHeroGalleryItem[]
}

const defaultNavActions: AuraHeroNavAction[] = [
  { label: "Search events", icon: "search", href: "#search" },
  { label: "Open calendar", icon: "calendar", href: "#calendar" },
  { label: "Menu", icon: "menu", href: "#menu" },
]

const defaultAvatars: AuraHeroAvatar[] = [
  { label: "Maya", initials: "M", color: "#f0c4a8" },
  { label: "Noah", initials: "N", color: "#9ec4df" },
  { label: "Kai", initials: "K", color: "#d4a178" },
  { label: "Ari", initials: "A", color: "#d9b3a7" },
]

const defaultLogos: AuraHeroLogo[] = [
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "LOGOIPSUM" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
]

const defaultGallery: AuraHeroGalleryItem[] = [
  { label: "Night party", scene: "party", gradient: "linear-gradient(135deg,#19191d,#8c6d51 46%,#f7ece3)" },
  { label: "Fairground", scene: "wheel", gradient: "linear-gradient(135deg,#bfe7f6,#f5f9fb)" },
  { label: "Celebration toast", scene: "toast", gradient: "linear-gradient(135deg,#f597c4,#ffcc75 52%,#7a43ff)" },
  { label: "Costume moment", scene: "festival", gradient: "linear-gradient(135deg,#8bf2e9,#fbf7d9 48%,#ff88b9)" },
  { label: "Garden dinner", scene: "fashion", gradient: "linear-gradient(135deg,#252321,#dbaeb4 55%,#f8d76e)" },
  { label: "Dance floor", scene: "motion", gradient: "linear-gradient(135deg,#f5e5d4,#eff7eb 55%,#d7a16d)" },
]

const iconMap = {
  search: Search,
  calendar: CalendarDays,
  menu: Menu,
}

export function AuraEventsHero({
  brandName = "Aura",
  brandHref = "#home",
  navActions = defaultNavActions,
  joinedCount = "250K+",
  joinedLabel = "People joined",
  joinedHref = "#community",
  joinedAriaLabel = "View community",
  avatars = defaultAvatars,
  description = "We spark the fun of celebrations, putting together events that create laughter, connections, and great memories.",
  headlineTop = "AWESOME",
  headlineBottom = "EVENTS!",
  note = "Based on your needs",
  primaryCta = { label: "Get Started", href: "#get-started" },
  playCta = { label: "Play intro", href: "#intro" },
  logos = defaultLogos,
  gallery = defaultGallery,
  className,
  ...props
}: AuraEventsHeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const logoTrackRef = useRef<HTMLDivElement>(null)
  const galleryTrackRef = useRef<HTMLDivElement>(null)
  const galleryLoopRef = useRef<HTMLDivElement>(null)
  const galleryMarqueeTweenRef = useRef<ReturnType<typeof gsap.to> | null>(null)
  const avatarTooltipId = useId()
  const reducedMotion = usePrefersReducedMotion()
  const marqueeLogos = useMemo(() => [...logos, ...logos], [logos])

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-aura-reveal]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, ease: "power3.out", stagger: 0.08 }
        )
        gsap.fromTo(
          "[data-aura-gallery]",
          { y: 46, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.78, ease: "power3.out", stagger: 0.08, delay: 0.28 }
        )

        if (logoTrackRef.current) {
          gsap.to(logoTrackRef.current, {
            xPercent: -50,
            duration: 24,
            repeat: -1,
            ease: "none",
          })
        }

        if (galleryTrackRef.current && galleryLoopRef.current) {
          const travelDistance = galleryLoopRef.current.offsetWidth

          gsap.set(galleryTrackRef.current, { x: 0 })
          galleryMarqueeTweenRef.current = gsap.to(galleryTrackRef.current, {
            x: -travelDistance,
            duration: Math.max(28, travelDistance / 58),
            repeat: -1,
            ease: "none",
          })
        }
      }, rootRef)

      return () => {
        galleryMarqueeTweenRef.current = null
        context.revert()
      }
    },
    { dependencies: [reducedMotion, logos.length, gallery.length], scope: rootRef }
  )

  const liftGalleryCard = (card: HTMLElement) => {
    if (galleryMarqueeTweenRef.current && !reducedMotion) {
      gsap.to(galleryMarqueeTweenRef.current, {
        timeScale: 0,
        duration: 0.32,
        ease: "power2.out",
        overwrite: true,
      })
    }

    if (reducedMotion) {
      return
    }

    gsap.to(card, {
      y: -10,
      scale: 1.025,
      duration: 0.35,
      ease: "power3.out",
    })
  }

  const settleGalleryCard = (card: HTMLElement) => {
    if (galleryMarqueeTweenRef.current && !reducedMotion) {
      gsap.to(galleryMarqueeTweenRef.current, {
        timeScale: 1,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
      })
    }

    if (reducedMotion) {
      return
    }

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.52,
      ease: "elastic.out(1, 0.72)",
    })
  }

  return (
    <section
      ref={rootRef}
      className={cn(
        "@container/aura relative isolate min-h-[47rem] w-full min-w-0 max-w-full overflow-hidden bg-white text-[#080808]",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between px-6 pt-6 sm:px-16 @5xl/aura:px-24">
        <a
          href={brandHref}
          data-aura-reveal
          className="inline-flex items-center gap-2 text-xl font-black tracking-normal"
          aria-label={brandName}
        >
          <span className="grid size-7 place-items-center rounded-[0.55rem] bg-[#2557ff] text-white shadow-[0_8px_22px_rgba(37,87,255,0.24)]">
            <AuraMark />
          </span>
          <span>{brandName}</span>
        </a>

        <nav data-aura-reveal className="flex items-center gap-2" aria-label={`${brandName} actions`}>
          {navActions.map((action) => {
            const Icon = iconMap[action.icon]
            const isMenuAction = action.icon === "menu"
            const content = (
              <>
                <Icon className={cn("size-4", isMenuAction && "relative z-10")} strokeWidth={2.5} />
                {isMenuAction ? (
                  <span className="relative z-10 text-sm font-semibold">
                    <AnimatedCtaLabel label={action.label} />
                  </span>
                ) : null}
              </>
            )
            const actionClassName = cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#f7f7f7] px-4 text-[#101010] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_8px_20px_rgba(20,20,20,0.05)] transition-[background-color,transform] hover:bg-[#eeeeee] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2557ff]/12",
              !isMenuAction && "w-11 px-0",
              isMenuAction &&
                "group/cta relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.74),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:before:translate-x-full focus-visible:-translate-y-0.5 focus-visible:before:translate-x-full"
            )

            return action.href ? (
              <a
                key={action.label}
                href={action.href}
                target={action.target}
                rel={action.rel ?? (action.target === "_blank" ? "noreferrer" : undefined)}
                className={actionClassName}
                aria-label={action.ariaLabel ?? action.label}
              >
                {content}
              </a>
            ) : (
              <button
                key={action.label}
                type="button"
                className={actionClassName}
                aria-label={action.ariaLabel ?? action.label}
              >
                {content}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mx-auto grid w-full max-w-[88rem] justify-items-center px-6 pb-10 pt-20 text-center sm:px-10">
        <div data-aura-reveal className="flex items-center gap-6 text-left">
          <div>
            <p className="text-base font-black leading-none text-[#2557ff]">{joinedCount}</p>
            <p className="mt-1 text-xs font-medium text-black/36">{joinedLabel}</p>
          </div>

          <div className="flex -space-x-2">
            {avatars.slice(0, 4).map((avatar, index) => (
              <span
                key={avatar.label}
                tabIndex={0}
                className="group/avatar relative z-0 inline-flex size-9 rounded-full outline-none transition-[transform,z-index] duration-300 ease-[cubic-bezier(0.2,0.82,0.18,1)] hover:z-20 hover:-translate-y-2 hover:scale-110 focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:scale-110"
                aria-label={avatar.label}
                aria-describedby={`${avatarTooltipId}-${index}`}
              >
                <span
                  className="grid size-9 overflow-hidden rounded-full border-2 border-white text-[0.68rem] font-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.1)] transition-shadow duration-300 group-hover/avatar:shadow-[0_14px_30px_rgba(37,87,255,0.2)] group-focus-visible/avatar:shadow-[0_14px_30px_rgba(37,87,255,0.2)]"
                  style={{ background: avatar.color }}
                >
                  {avatar.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar.src} alt={avatar.label} className="size-full object-cover" />
                  ) : (
                    <span className="grid place-items-center">{avatar.initials ?? avatar.label.slice(0, 1)}</span>
                  )}
                </span>
                <span
                  id={`${avatarTooltipId}-${index}`}
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full bg-[#080808] px-3 py-1.5 text-[0.68rem] font-black text-white opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.82,0.18,1)] group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100 group-focus-visible/avatar:translate-y-0 group-focus-visible/avatar:opacity-100"
                >
                  {avatar.label}
                  <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-[#080808]" />
                </span>
              </span>
            ))}
          </div>

          <a
            href={joinedHref}
            className="grid size-10 place-items-center rounded-full text-[#2557ff] transition-colors hover:bg-[#2557ff]/8 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2557ff]/12"
            aria-label={joinedAriaLabel}
          >
            <ArrowRight className="size-6" strokeWidth={2.2} />
          </a>
        </div>

        <p
          data-aura-reveal
          className="mt-10 max-w-[36rem] text-balance text-[1.34rem] font-semibold leading-[1.18] tracking-normal text-black/82"
        >
          {description}
        </p>

        <div className="relative mt-16 w-full">
          <div className="relative mx-auto w-full">
            <div
              data-aura-reveal
              className="pointer-events-none absolute right-[11%] top-[14%] hidden text-left @5xl/aura:block"
            >
              <p className="border-l-2 border-[#2557ff]/65 bg-[linear-gradient(90deg,rgba(37,87,255,0.08),rgba(37,87,255,0))] px-4 py-3 text-base font-semibold leading-tight text-black/82">
                {note}
              </p>
            </div>

            <h1
              data-aura-reveal
              className="w-full font-serif text-[4.2rem] font-black leading-[0.86] tracking-normal text-black @sm/aura:text-[5.2rem] @3xl/aura:text-[6.8rem] @5xl/aura:text-[8rem] @7xl/aura:text-[9.2rem]"
            >
              <span className="block pl-[7.5%] text-left">{headlineTop}</span>
              <span className="mt-6 block pr-[5%] text-right">{headlineBottom}</span>
            </h1>

            <div
              data-aura-reveal
              className="mt-8 flex items-center justify-center gap-3 @5xl/aura:absolute @5xl/aura:left-[19%] @5xl/aura:top-[68%] @5xl/aura:mt-0 @5xl/aura:justify-start"
            >
              <HeroCta cta={primaryCta} variant="primary" />
              <HeroCta cta={playCta} variant="play" />
            </div>
          </div>
        </div>

        <div data-aura-reveal className="mt-28 w-[calc(100%+3rem)] overflow-hidden text-black/28 sm:w-[calc(100%+5rem)]">
          <div ref={logoTrackRef} className="flex w-max items-center gap-20 px-8">
            {marqueeLogos.map((logo, index) => (
              <span
                key={`${logo.label}-${index}`}
                className="inline-flex min-w-max items-center gap-2 text-2xl font-black tracking-normal text-black/30"
              >
                <LogoGlyph index={index} />
                {logo.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-24 h-[20rem] w-full overflow-visible">
          <div className="absolute left-1/2 top-0 w-[calc(100%+4rem)] -translate-x-1/2 overflow-visible sm:w-[calc(100%+8rem)] @5xl/aura:w-[calc(100%+12rem)]">
            <div ref={galleryTrackRef} className="flex w-max will-change-transform">
              {[0, 1, 2].map((groupIndex) => (
                <div
                  key={groupIndex}
                  ref={groupIndex === 0 ? galleryLoopRef : undefined}
                  className="flex w-max justify-start gap-4 pr-4"
                  aria-hidden={groupIndex > 0}
                >
                  {gallery.map((item, index) => (
                    <EventGalleryCard
                      key={`${item.label}-${groupIndex}-${index}`}
                      item={item}
                      onPointerEnter={liftGalleryCard}
                      onPointerLeave={settleGalleryCard}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroCta({ cta, variant }: { cta: AuraHeroCta; variant: "primary" | "play" }) {
  const className =
    variant === "primary"
      ? "group/cta relative inline-flex h-12 min-w-32 items-center justify-center overflow-hidden rounded-full bg-black px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:before:translate-x-full focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/12 focus-visible:before:translate-x-full"
      : "grid size-12 place-items-center rounded-full bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/12"
  const content =
    variant === "primary" ? <AnimatedCtaLabel label={cta.label} /> : <Play className="ml-0.5 size-4 fill-white" strokeWidth={0} />

  return cta.href ? (
    <a
      href={cta.href}
      target={cta.target}
      rel={cta.rel ?? (cta.target === "_blank" ? "noreferrer" : undefined)}
      className={className}
      aria-label={cta.ariaLabel ?? cta.label}
    >
      {content}
    </a>
  ) : (
    <button type="button" className={className} aria-label={cta.ariaLabel ?? cta.label}>
      {content}
    </button>
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
      <span className="absolute inset-0 flex">{letters.map((letter, index) => renderLetter(letter, index, true))}</span>
    </span>
  )
}

function AuraMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        d="M7.5 4H10v5H7.5a2.5 2.5 0 0 1 0-5Zm6.5 0h2.5a2.5 2.5 0 0 1 0 5H14V4ZM4 14h5v2.5a2.5 2.5 0 0 1-5 0V14Zm11 0h5v2.5a2.5 2.5 0 0 1-5 0V14Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M10 9v2.5A2.5 2.5 0 0 1 7.5 14H4m10-5v2.5a2.5 2.5 0 0 0 2.5 2.5H20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  )
}

function LogoGlyph({ index }: { index: number }) {
  const shapes = ["rotate-45", "rounded-full", "rotate-12", "-rotate-45"]

  return (
    <span className={cn("grid size-7 place-items-center", shapes[index % shapes.length])} aria-hidden="true">
      <span className="block size-4 border-[5px] border-current" />
    </span>
  )
}

function EventGalleryCard({
  item,
  onPointerEnter,
  onPointerLeave,
}: {
  item: AuraHeroGalleryItem
  onPointerEnter: (card: HTMLElement) => void
  onPointerLeave: (card: HTMLElement) => void
}) {
  return (
    <article
      data-aura-gallery
      aria-label={item.alt ?? item.label}
      className="group relative h-[20rem] w-[18rem] shrink-0 overflow-hidden rounded-[3rem] bg-black shadow-[0_28px_60px_rgba(0,0,0,0.14)] transition-[border-radius] duration-500 ease-[cubic-bezier(0.2,0.82,0.18,1)] will-change-transform hover:rounded-none"
      onPointerEnter={(event) => onPointerEnter(event.currentTarget)}
      onPointerLeave={(event) => onPointerLeave(event.currentTarget)}
    >
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt ?? item.label}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: item.objectPosition }}
        />
      ) : (
        <GeneratedEventScene item={item} />
      )}
    </article>
  )
}

function GeneratedEventScene({ item }: { item: AuraHeroGalleryItem }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: item.gradient }}>
      {item.scene === "wheel" ? <WheelScene /> : null}
      {item.scene === "toast" ? <ToastScene /> : null}
      {item.scene === "festival" ? <FestivalScene /> : null}
      {item.scene === "fashion" ? <FashionScene /> : null}
      {item.scene === "motion" ? <MotionScene /> : null}
      {!item.scene || item.scene === "party" ? <PartyScene /> : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.36),transparent_34%),linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.12))]" />
    </div>
  )
}

function PartyScene() {
  return (
    <>
      <span className="absolute bottom-8 left-8 size-28 rounded-full bg-[#f1d2c3] shadow-[0_0_0_14px_rgba(255,255,255,0.18)]" />
      <span className="absolute bottom-16 left-14 size-5 rounded-full bg-black" />
      <span className="absolute bottom-16 left-24 size-5 rounded-full bg-black" />
      <span className="absolute bottom-8 left-16 h-3 w-14 rounded-full bg-[#ef5d52]" />
      <span className="absolute inset-x-6 top-8 h-1 rotate-12 rounded-full bg-white/35" />
      <span className="absolute right-8 top-10 h-24 w-2 rotate-[28deg] rounded-full bg-[#ffd262]/80" />
      <span className="absolute right-20 top-16 h-24 w-2 rotate-[-34deg] rounded-full bg-[#7bdcff]/75" />
    </>
  )
}

function WheelScene() {
  return (
    <>
      <span className="absolute -bottom-24 left-7 size-72 rounded-full border-[10px] border-white/70" />
      {["#ff4f4f", "#ffc43d", "#2775ff", "#2cc36b", "#ff7ab7"].map((color, index) => (
        <span
          key={color}
          className="absolute top-[44%] h-12 w-10 rounded-b-xl rounded-t-md border-2 border-white/80"
          style={{
            background: color,
            left: `${22 + index * 15}%`,
            transform: `translateY(${Math.sin(index) * 14}px) rotate(${index * 12 - 22}deg)`,
          }}
        />
      ))}
      <span className="absolute bottom-0 left-1/2 h-48 w-2 -translate-x-1/2 bg-white/70" />
    </>
  )
}

function ToastScene() {
  return (
    <>
      <span className="absolute left-10 top-20 h-32 w-20 rotate-[-22deg] rounded-b-full rounded-t-[2rem] border-[7px] border-white/58" />
      <span className="absolute right-14 top-10 h-36 w-24 rotate-[28deg] rounded-b-full rounded-t-[2rem] border-[7px] border-white/58" />
      <span className="absolute bottom-10 left-20 h-28 w-3 rotate-[-18deg] rounded-full bg-white/54" />
      <span className="absolute bottom-9 right-24 h-28 w-3 rotate-[22deg] rounded-full bg-white/54" />
      <span className="absolute left-8 top-8 size-24 rounded-full bg-[#ff78c4]/50 blur-xl" />
      <span className="absolute bottom-10 right-8 size-28 rounded-full bg-[#ffd25d]/60 blur-2xl" />
    </>
  )
}

function FestivalScene() {
  return (
    <>
      <span className="absolute left-6 top-0 h-32 w-64 rounded-full bg-white/72 blur-sm" />
      <span className="absolute bottom-3 left-1/2 size-36 -translate-x-1/2 rounded-full bg-[#f4cfb7]" />
      <span className="absolute bottom-28 left-[43%] size-4 rounded-full bg-black" />
      <span className="absolute bottom-28 right-[43%] size-4 rounded-full bg-black" />
      <span className="absolute bottom-20 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-[#ea5b83]" />
      <span className="absolute right-9 bottom-14 size-14 rotate-12 rounded-[1.1rem] bg-[#ff76b8]/90 shadow-[0_0_24px_rgba(255,118,184,0.68)]" />
      <span className="absolute right-14 bottom-19 size-7 rounded-full bg-[#7b54ff]/70" />
    </>
  )
}

function FashionScene() {
  return (
    <>
      <span className="absolute bottom-0 left-4 h-48 w-20 rounded-t-full bg-[#f2c0b7]/85 blur-[1px]" />
      <span className="absolute bottom-0 left-24 h-56 w-24 rounded-t-full bg-[#2b2525]/74 blur-[1px]" />
      <span className="absolute bottom-0 right-16 h-52 w-24 rounded-t-full bg-[#f7e7d8]/82 blur-[1px]" />
      <span className="absolute bottom-8 left-3 right-3 h-20 rounded-[2rem] bg-[linear-gradient(90deg,#f8d76e,#f4a2c0,#ffffff,#f8d76e)] opacity-70 blur-sm" />
    </>
  )
}

function MotionScene() {
  return (
    <>
      <span className="absolute -right-10 top-0 h-72 w-32 rotate-12 rounded-full bg-white/70 blur-sm" />
      <span className="absolute bottom-0 left-20 h-64 w-32 -rotate-12 rounded-t-full bg-[#efd5bc]/85" />
      <span className="absolute bottom-20 left-8 h-24 w-48 rotate-[-28deg] rounded-full bg-white/34 blur-md" />
      <span className="absolute right-6 bottom-8 h-20 w-28 rounded-full bg-[#d58a46]/50 blur-lg" />
    </>
  )
}
