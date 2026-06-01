"use client"

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type ProjectSpotlightItem = {
  id: string
  title: string
  eyebrow?: string
  href?: string
  imageSrc: string
  imageAlt?: string
  thumbnailSrc?: string
  thumbnailAlt?: string
  objectPosition?: string
  accentColor?: string
}

export type ProjectSpotlightLabels = {
  project?: string
  previous?: string
  next?: string
  expand?: string
}

export type ProjectSpotlightSliderProps = Omit<ComponentPropsWithoutRef<"section">, "children" | "onChange"> & {
  projects?: ProjectSpotlightItem[]
  initialIndex?: number
  expandOnHover?: boolean
  labels?: ProjectSpotlightLabels
  onProjectChange?: (project: ProjectSpotlightItem, index: number) => void
  onProjectSelect?: (project: ProjectSpotlightItem, index: number) => void
}

const defaultProjects: ProjectSpotlightItem[] = [
  {
    id: "wired",
    title: "Wired",
    eyebrow: "Project",
    href: "#wired",
    imageSrc:
      "https://images.pexels.com/photos/14718397/pexels-photo-14718397.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imageAlt: "Fashion editorial portrait with a lime sweater.",
    objectPosition: "50% 35%",
    accentColor: "#f2d42f",
  },
  {
    id: "niek-roosen",
    title: "Niek Roosen",
    eyebrow: "Project",
    href: "#niek-roosen",
    imageSrc:
      "https://images.pexels.com/photos/19921709/pexels-photo-19921709.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imageAlt: "Fashion portrait of a person wearing sunglasses.",
    objectPosition: "50% 36%",
    accentColor: "#d66f4f",
  },
  {
    id: "nova",
    title: "Nova",
    eyebrow: "Project",
    href: "#nova",
    imageSrc:
      "https://images.pexels.com/photos/33118167/pexels-photo-33118167.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imageAlt: "Close-up fashion portrait with a yellow sweater.",
    objectPosition: "50% 40%",
    accentColor: "#b7e22b",
  },
]

const defaultLabels: Required<ProjectSpotlightLabels> = {
  project: "Project",
  previous: "Previous project",
  next: "Next project",
  expand: "Expand project controls",
}

export function ProjectSpotlightSlider({
  projects = defaultProjects,
  initialIndex = 0,
  expandOnHover = true,
  labels,
  onProjectChange,
  onProjectSelect,
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: ProjectSpotlightSliderProps) {
  const rootRef = useRef<HTMLElement>(null)
  const previousIndexRef = useRef<number | null>(null)
  const directionRef = useRef(1)
  const reducedMotion = usePrefersReducedMotion()
  const safeProjects = projects.length ? projects : defaultProjects
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [isExpanded, setIsExpanded] = useState(false)
  const activeIndex = normalizeIndex(selectedIndex, safeProjects.length)
  const activeProject = safeProjects[activeIndex] ?? safeProjects[0]
  const mergedLabels = { ...defaultLabels, ...labels }

  useEffect(() => {
    onProjectChange?.(activeProject, activeIndex)
  }, [activeIndex, activeProject, onProjectChange])

  useGSAP(
    () => {
      if (!rootRef.current) {
        return
      }

      const layers = Array.from(rootRef.current.querySelectorAll<HTMLElement>("[data-spotlight-layer]"))
      const activeLayer = layers.find((layer) => Number(layer.dataset.index) === activeIndex)
      const previousIndex = previousIndexRef.current
      const previousLayer = layers.find((layer) => Number(layer.dataset.index) === previousIndex)

      if (!activeLayer) {
        return
      }

      if (reducedMotion) {
        gsap.set(layers, { autoAlpha: 0, xPercent: 0, scale: 1 })
        gsap.set(activeLayer, { autoAlpha: 1 })
        previousIndexRef.current = activeIndex
        return
      }

      if (previousIndex === null) {
        gsap.set(layers, { autoAlpha: 0, xPercent: 0, scale: 1.04 })
        gsap.to(activeLayer, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        })
      } else {
        if (previousLayer) {
          gsap.to(previousLayer, {
            autoAlpha: 0,
            xPercent: directionRef.current * -16,
            scale: 1.02,
            duration: 0.72,
            ease: "power3.inOut",
          })
        }
        gsap.fromTo(
          activeLayer,
          {
            autoAlpha: 0,
            xPercent: directionRef.current * 18,
            scale: 1.08,
            filter: "blur(10px)",
          },
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out",
          }
        )
      }

      const content = rootRef.current.querySelector("[data-spotlight-content]")

      if (content) {
        gsap.fromTo(
          content,
          { y: 10, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out", delay: 0.1 }
        )
      }

      previousIndexRef.current = activeIndex
    },
    { dependencies: [activeIndex, reducedMotion], scope: rootRef }
  )

  const move = (direction: number) => {
    directionRef.current = direction
    setIsExpanded(true)
    setSelectedIndex((current) => normalizeIndex(current + direction, safeProjects.length))
  }

  const handleSelect = () => {
    onProjectSelect?.(activeProject, activeIndex)
  }

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative isolate grid min-h-screen w-full overflow-hidden bg-[#dfe8e9] text-white",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {safeProjects.map((project, index) => (
          <div
            key={project.id}
            data-spotlight-layer
            data-index={index}
            className="absolute inset-0 opacity-0"
            aria-hidden={index !== activeIndex}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageSrc}
              alt={project.imageAlt ?? project.title}
              className="size-full object-cover"
              style={{ objectPosition: project.objectPosition ?? "50% 50%" }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_0_22%,rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.16)_100%)]"
      />

      <div className="relative z-10 grid min-h-[inherit] place-items-center p-4 sm:p-8">
        <div
          className={cn(
            "flex max-w-[calc(100vw-2rem)] items-center rounded-full border border-white/8 bg-black/76 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_54px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-[width,max-width,height,padding,gap,background-color] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isExpanded
              ? "h-[5.25rem] w-full max-w-[44rem] gap-2 p-3 sm:h-[7.5rem] sm:gap-5 sm:p-5"
              : "h-[4.5rem] w-full max-w-[35rem] gap-2.5 p-3 sm:h-[6rem] sm:gap-3 sm:p-4"
          )}
          onPointerEnter={(event) => {
            onPointerEnter?.(event)
            if (expandOnHover) {
              setIsExpanded(true)
            }
          }}
          onPointerLeave={(event) => {
            onPointerLeave?.(event)
            if (expandOnHover) {
              setIsExpanded(false)
            }
          }}
          onFocus={() => setIsExpanded(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsExpanded(false)
            }
          }}
          style={{
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 22px 64px ${hexToRgba(
              activeProject.accentColor ?? "#000000",
              0.18
            )}`,
          }}
        >
          <SliderControl
            label={mergedLabels.previous}
            hidden={!isExpanded}
            onClick={() => move(-1)}
            className="ml-0"
          >
            <ArrowLeft className="size-5" />
          </SliderControl>

          <ProjectThumb project={activeProject} expanded={isExpanded} />

          <ProjectContent
            project={activeProject}
            projectLabel={activeProject.eyebrow ?? mergedLabels.project}
            expanded={isExpanded}
            onSelect={handleSelect}
          />

          <button
            type="button"
            aria-label={isExpanded ? mergedLabels.next : mergedLabels.expand}
            onClick={() => (isExpanded ? move(1) : setIsExpanded(true))}
            className={cn(
              "ml-auto grid shrink-0 place-items-center rounded-full bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/22",
              isExpanded ? "size-11 sm:size-16" : "size-12 sm:size-16"
            )}
          >
            {isExpanded ? <ArrowRight className="size-5" /> : <ChevronDown className="size-5" />}
          </button>
        </div>
      </div>
    </section>
  )
}

function ProjectThumb({ project, expanded }: { project: ProjectSpotlightItem; expanded: boolean }) {
  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-white/12 bg-white/12 transition-[width,height] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        expanded ? "size-12 sm:size-20" : "size-11 sm:size-16"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.thumbnailSrc ?? project.imageSrc}
        alt={project.thumbnailAlt ?? project.imageAlt ?? project.title}
        className="size-full object-cover"
        style={{ objectPosition: project.objectPosition ?? "50% 50%" }}
        draggable={false}
      />
    </span>
  )
}

function ProjectContent({
  project,
  projectLabel,
  expanded,
  onSelect,
}: {
  project: ProjectSpotlightItem
  projectLabel: string
  expanded: boolean
  onSelect: () => void
}) {
  const content = (
    <span data-spotlight-content className="block min-w-0">
      <span
        className={cn(
          "block overflow-hidden text-white/42 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "max-h-7 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <span className="block text-sm font-semibold leading-none sm:text-[1.65rem]">{projectLabel}</span>
      </span>
      <span
        className={cn(
          "block truncate font-bold tracking-normal text-white transition-[font-size,line-height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "text-[1.35rem] leading-none sm:text-[2.65rem]" : "text-xl leading-tight sm:text-[2.15rem]"
        )}
      >
        {project.title}
      </span>
    </span>
  )

  if (project.href) {
    return (
      <a
        href={project.href}
        onClick={onSelect}
        className="min-w-0 flex-1 outline-none focus-visible:ring-4 focus-visible:ring-white/20"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="min-w-0 flex-1 text-left outline-none focus-visible:ring-4 focus-visible:ring-white/20"
    >
      {content}
    </button>
  )
}

function SliderControl({
  label,
  hidden,
  onClick,
  className,
  children,
}: {
  label: string
  hidden: boolean
  onClick: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/22",
        hidden ? "pointer-events-none size-0 opacity-0" : "size-11 opacity-100 sm:size-16",
        className
      )}
    >
      {children}
    </button>
  )
}

function normalizeIndex(index: number, total: number) {
  if (total <= 0) {
    return 0
  }

  return ((index % total) + total) % total
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "")
  const value = normalized.length === 3
    ? normalized
        .split("")
        .map((character) => character + character)
        .join("")
    : normalized
  const numberValue = Number.parseInt(value, 16)

  if (Number.isNaN(numberValue)) {
    return `rgba(0,0,0,${alpha})`
  }

  const red = (numberValue >> 16) & 255
  const green = (numberValue >> 8) & 255
  const blue = numberValue & 255

  return `rgba(${red},${green},${blue},${alpha})`
}
