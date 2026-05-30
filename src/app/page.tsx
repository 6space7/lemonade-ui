"use client"

import {
  Code2,
  Command,
  ExternalLink,
  FolderOpen,
  Layers3,
  MousePointer2,
  PackagePlus,
  PanelLeft,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { type ReactNode, useEffect, useState } from "react"

import { GlassFolder } from "@/components/lemonade/glass-folder"
import { MagneticButton } from "@/components/lemonade/magnetic-button"
import { components } from "@/lib/registry"
import { cn } from "@/lib/utils"

type SidebarLink = {
  label: string
  href: string
  icon: LucideIcon
  meta?: string
}

type SidebarCategory = {
  title: string
  href: string
  icon: LucideIcon
  activeHrefs: string[]
}

const overviewLinks: SidebarLink[] = [
  {
    label: "Home",
    href: "#home",
    icon: Sparkles,
  },
  {
    label: "Featured Components",
    href: "#featured",
    icon: Layers3,
  },
  {
    label: "Registry Output",
    href: "#registry-output",
    icon: PackagePlus,
  },
]

const validNavigationHrefs = new Set([
  "#home",
  "#featured",
  "#registry-output",
  "#files",
  "#glass-folder",
  "#buttons",
  "#magnetic-button",
])

export default function Home() {
  const [glassFolder, magneticButton] = components
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeHref, setActiveHref] = useState("#home")

  useEffect(() => {
    const syncActiveHash = () => {
      const nextHash = window.location.hash || "#home"

      setActiveHref(validNavigationHrefs.has(nextHash) ? nextHash : "#home")
    }

    syncActiveHash()
    window.addEventListener("hashchange", syncActiveHash)

    return () => window.removeEventListener("hashchange", syncActiveHash)
  }, [])

  const componentCategories: SidebarCategory[] = [
    {
      title: "Files",
      href: "#files",
      icon: FolderOpen,
      activeHrefs: ["#glass-folder"],
    },
    {
      title: "Buttons",
      href: "#buttons",
      icon: MousePointer2,
      activeHrefs: ["#magnetic-button"],
    },
  ]

  const handleSelect = (href: string) => {
    setActiveHref(href)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  const isOverviewView = activeHref === "#home" || activeHref === "#featured"
  const showGlassFolder =
    isOverviewView || activeHref === "#files" || activeHref === "#glass-folder"
  const showMagneticButton =
    isOverviewView || activeHref === "#buttons" || activeHref === "#magnetic-button"
  const showRegistryOutput = isOverviewView || activeHref === "#registry-output"
  const showAnimatedOverview = isOverviewView
  const viewHeader = getViewHeader(activeHref)

  return (
    <main className="min-h-screen bg-[#070707] text-[#f4f4f1]">
      <aside
        data-sidebar-state={isSidebarCollapsed ? "collapsed" : "expanded"}
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-white/[0.08] bg-[#111111] transition-[width] duration-300 lg:flex lg:flex-col",
          isSidebarCollapsed ? "w-[4.75rem]" : "w-[15rem]"
        )}
      >
        <div
          className={cn(
            "relative flex items-center border-b border-white/[0.06]",
            isSidebarCollapsed ? "h-[5.75rem] flex-col justify-center gap-2 px-0" : "h-16 gap-3 px-5"
          )}
        >
          <span
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f7f34a] text-[#111111] shadow-[0_0_30px_rgba(247,243,74,0.18)]"
            title="Lemonade UI"
          >
            <Sparkles className="size-4" />
          </span>
          <div className={cn("min-w-0", isSidebarCollapsed && "sr-only")}>
            <p className="truncate text-sm font-semibold">Lemonade UI</p>
            <span className="rounded bg-[#f7f34a]/14 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#f7f34a]">
              beta
            </span>
          </div>
          <button
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-md border border-white/[0.08] bg-white/[0.05] text-white/60 transition-colors hover:bg-white/[0.09] hover:text-white",
              isSidebarCollapsed ? "mx-auto" : "ml-auto"
            )}
            type="button"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isSidebarCollapsed}
            onClick={() => setIsSidebarCollapsed((current) => !current)}
          >
            <PanelLeft
              className={cn(
                "size-4 transition-transform duration-300",
                isSidebarCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        <nav
          aria-label="Component categories"
          className={cn(
            "lemonade-scrollbar flex-1 overflow-y-auto py-5 text-sm",
            isSidebarCollapsed ? "px-0" : "px-4"
          )}
        >
          <SidebarGroup
            title="Overview"
            items={overviewLinks}
            activeHref={activeHref}
            isCollapsed={isSidebarCollapsed}
            onSelect={handleSelect}
          />

          <div className="mb-7">
            <div
              className={cn(
                "mb-3 flex items-center justify-between text-xs font-semibold text-white/58",
                isSidebarCollapsed && "sr-only"
              )}
            >
              <span>Animated Components</span>
              <span className="rounded bg-[#f7f34a]/14 px-1.5 py-0.5 text-[0.62rem] text-[#f7f34a]">
                {components.length}
              </span>
            </div>
            <div className="space-y-1">
              {componentCategories.map((category) => (
                <SidebarCategoryGroup
                  key={category.title}
                  category={category}
                  activeHref={activeHref}
                  isCollapsed={isSidebarCollapsed}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>

          <div className={cn("mt-8", isSidebarCollapsed && "sr-only")}>
            <div className="flex items-center justify-between text-xs font-semibold text-white/58">
              <span>Templates</span>
              <span className="rounded bg-[#f7f34a]/14 px-1.5 py-0.5 text-[0.62rem] text-[#f7f34a]">
                Soon
              </span>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            "border-t border-white/[0.06]",
            isSidebarCollapsed ? "p-3" : "p-4"
          )}
        >
          <div
            className={cn(
              "flex items-center rounded-lg border border-white/[0.08] bg-white/[0.04] p-2",
              isSidebarCollapsed ? "justify-center" : "justify-between"
            )}
          >
            <button
              type="button"
              className="grid size-8 place-items-center rounded-md bg-[#f7f34a] text-[#111111]"
              aria-label="Theme"
            >
              <Sparkles className="size-4" />
            </button>
            <div
              className={cn(
                "flex items-center gap-1 text-white/60",
                isSidebarCollapsed && "sr-only"
              )}
            >
              <Code2 className="size-4" />
              <PackagePlus className="size-4" />
            </div>
          </div>
          <p className={cn("mt-4 text-[0.68rem] text-white/38", isSidebarCollapsed && "sr-only")}>
            (c) 2026 Lemonade. All rights reserved.
          </p>
        </div>
      </aside>

      <section
        id="home"
        className={cn(
          "scroll-mt-24 transition-[padding] duration-300",
          isSidebarCollapsed ? "lg:pl-[4.75rem]" : "lg:pl-[15rem]"
        )}
      >
        <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#070707]/88 px-5 py-3 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Link
                href="#home"
                scroll={false}
                className="flex items-center gap-2"
                onClick={() => handleSelect("#home")}
              >
                <span className="grid size-9 place-items-center rounded-lg bg-[#f7f34a] text-[#111111]">
                  <Sparkles className="size-4" />
                </span>
                <span className="text-sm font-semibold">Lemonade UI</span>
              </Link>
            </div>
            <div className="ml-auto flex h-11 w-full max-w-[27rem] items-center gap-3 rounded-lg border border-white/[0.09] bg-[#101010] px-4 text-white/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <Search className="size-4" />
              <span className="text-sm font-medium">Search components...</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-xs text-white/42">
                <Command className="size-3" />K
              </span>
            </div>
          </div>
        </header>

        <div className="px-5 py-6 sm:px-7">
          <div id="featured" className="mb-6 scroll-mt-24">
            <h1 className="text-base font-semibold tracking-normal text-white">
              {viewHeader.eyebrow}
            </h1>
            <h2 className="mt-6 text-lg font-semibold tracking-normal text-white">
              {viewHeader.title}
            </h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {showGlassFolder ? (
              <ComponentPreviewCard
                id="glass-folder"
                title={glassFolder.title}
                category="Files"
                command={glassFolder.command}
                icon={<FolderOpen className="size-4" />}
                href="/r/glass-folder.json"
                previewClassName="bg-[#f8fbff]"
              >
                <GlassFolder />
              </ComponentPreviewCard>
            ) : null}

            {showMagneticButton ? (
              <ComponentPreviewCard
                id="magnetic-button"
                title={magneticButton.title}
                category="Buttons"
                command={magneticButton.command}
                icon={<MousePointer2 className="size-4" />}
                href="/r/magnetic-button.json"
                previewClassName="bg-[#10120f]"
              >
                <div className="grid min-h-[28rem] place-items-center">
                  <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
                </div>
              </ComponentPreviewCard>
            ) : null}

            {showRegistryOutput ? (
              <InfoCard
                id="registry-output"
                title="Registry Output"
                category="Install"
                icon={<PackagePlus className="size-4" />}
              >
                <div className="mx-auto flex w-full max-w-xl flex-col justify-center rounded-lg border border-[#e8e8e8] bg-white p-8 text-[#161616] shadow-[0_30px_90px_rgba(0,0,0,0.12)]">
                  <p className="text-sm font-semibold text-black/42">CLI</p>
                  <code className="mt-4 overflow-hidden rounded-lg bg-[#111111] px-4 py-4 text-sm text-[#f7f34a]">
                    npx shadcn@latest add http://localhost:3000/r/glass-folder.json
                  </code>
                  <p className="mt-5 text-sm leading-6 text-black/50">
                    Every Lemonade component ships as local shadcn registry JSON.
                  </p>
                </div>
              </InfoCard>
            ) : null}

            {showAnimatedOverview ? (
              <InfoCard
                id="animated-components"
                title="Animated Components"
                category="GSAP"
                icon={<Layers3 className="size-4" />}
              >
                <div className="mx-auto grid w-full max-w-lg gap-3 rounded-lg border border-[#e8e8e8] bg-white p-8 text-[#161616] shadow-[0_30px_90px_rgba(0,0,0,0.12)]">
                  {components.map((component) => {
                    const Icon = component.icon

                    return (
                      <div
                        key={component.name}
                        className="flex items-center gap-3 rounded-lg border border-black/10 bg-black/[0.03] p-3"
                      >
                        <span className="grid size-9 place-items-center rounded-lg bg-[#f7f34a] text-[#111111]">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{component.title}</p>
                          <p className="text-xs text-black/45">{component.status}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </InfoCard>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}

function SidebarGroup({
  title,
  items,
  activeHref,
  isCollapsed,
  onSelect,
}: {
  title: string
  items: SidebarLink[]
  activeHref: string
  isCollapsed: boolean
  onSelect: (href: string) => void
}) {
  return (
    <div className="mb-7">
      <div
        className={cn(
          "mb-3 flex items-center justify-between text-xs font-semibold text-white/58",
          isCollapsed && "sr-only"
        )}
      >
        <span>{title}</span>
      </div>
      <div className={cn("space-y-1", !isCollapsed && "border-l border-white/[0.07] pl-3")}>
        {items.map((item) => (
          <SidebarNavLink
            key={item.href}
            item={item}
            isActive={activeHref === item.href}
            isCollapsed={isCollapsed}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function SidebarCategoryGroup({
  category,
  activeHref,
  isCollapsed,
  onSelect,
}: {
  category: SidebarCategory
  activeHref: string
  isCollapsed: boolean
  onSelect: (href: string) => void
}) {
  const CategoryIcon = category.icon
  const isCategoryActive = activeHref === category.href || category.activeHrefs.includes(activeHref)

  return (
    <div>
      <Link
        href={category.href}
        scroll={false}
        title={category.title}
        aria-current={isCategoryActive ? "location" : undefined}
        onClick={() => onSelect(category.href)}
        className={cn(
          "flex min-h-9 items-center gap-2 rounded-md px-2 text-[0.82rem] font-medium transition-colors",
          isCategoryActive
            ? "bg-[#f7f34a]/12 text-[#f7f34a]"
            : "text-white/45 hover:bg-white/[0.045] hover:text-white/78",
          isCollapsed && "mx-auto grid size-9 place-items-center px-0"
        )}
      >
        <CategoryIcon className="size-4 shrink-0" />
        <span className={cn(isCollapsed && "sr-only")}>{category.title}</span>
      </Link>
    </div>
  )
}

function SidebarNavLink({
  item,
  isActive,
  isCollapsed,
  onSelect,
}: {
  item: SidebarLink
  isActive: boolean
  isCollapsed: boolean
  onSelect: (href: string) => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      scroll={false}
      title={item.label}
      aria-label={item.label}
      aria-current={isActive ? "location" : undefined}
      onClick={() => onSelect(item.href)}
      className={cn(
        "flex min-h-9 items-center gap-2 rounded-md px-2 text-[0.82rem] font-medium transition-colors",
        isActive ? "bg-white/[0.07] text-white" : "text-white/45 hover:bg-white/[0.045] hover:text-white/78",
        isCollapsed && "mx-auto grid size-9 place-items-center px-0"
      )}
    >
      <Icon className={cn("size-4 shrink-0", isActive && "text-[#f7f34a]")} />
      <span className={cn("min-w-0 truncate", isCollapsed && "sr-only")}>{item.label}</span>
      {item.meta ? (
        <span
          aria-hidden="true"
          className={cn("ml-auto text-[0.66rem] text-white/32", isCollapsed && "sr-only")}
        >
          {item.meta}
        </span>
      ) : null}
    </Link>
  )
}

function getViewHeader(activeHref: string) {
  switch (activeHref) {
    case "#files":
      return {
        eyebrow: "Animated Components / Files",
        title: "Files",
      }
    case "#glass-folder":
      return {
        eyebrow: "Files",
        title: "Glass Folder",
      }
    case "#buttons":
      return {
        eyebrow: "Animated Components / Buttons",
        title: "Buttons",
      }
    case "#magnetic-button":
      return {
        eyebrow: "Buttons",
        title: "Magnetic Button",
      }
    case "#registry-output":
      return {
        eyebrow: "Overview",
        title: "Registry Output",
      }
    case "#featured":
      return {
        eyebrow: "Home",
        title: "Featured Components",
      }
    default:
      return {
        eyebrow: "Home",
        title: "Featured Components",
      }
  }
}

function ComponentPreviewCard({
  id,
  title,
  category,
  command,
  icon,
  href,
  previewClassName,
  children,
}: {
  id: string
  title: string
  category: string
  command: string
  icon: ReactNode
  href: string
  previewClassName: string
  children: ReactNode
}) {
  return (
    <article
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-lg border border-white/[0.13] bg-[#141414] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="flex min-h-16 items-center gap-3 border-b border-white/[0.09] px-5">
        <span className="grid size-9 place-items-center rounded-lg border border-white/[0.1] bg-white/[0.05] text-[#f7f34a]">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs font-medium text-white/44">{category}</p>
        </div>
        <a
          href={href}
          className="ml-auto grid size-9 place-items-center rounded-lg border border-white/[0.12] bg-white/[0.05] text-white/58 transition-colors hover:text-white"
          aria-label={`${title} registry item`}
        >
          <ExternalLink className="size-4" />
        </a>
      </div>
      <div className={`grid min-h-[34rem] place-items-center ${previewClassName}`}>
        {children}
      </div>
      <div className="border-t border-white/[0.08] bg-[#101010] px-5 py-4">
        <code className="block truncate text-xs text-[#d8ff6a]/74">{command}</code>
      </div>
    </article>
  )
}

function InfoCard({
  id,
  title,
  category,
  icon,
  children,
}: {
  id: string
  title: string
  category: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <article
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-lg border border-white/[0.13] bg-[#141414] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="flex min-h-16 items-center gap-3 border-b border-white/[0.09] px-5">
        <span className="grid size-9 place-items-center rounded-lg border border-white/[0.1] bg-white/[0.05] text-[#f7f34a]">
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs font-medium text-white/44">{category}</p>
        </div>
      </div>
      <div className="grid min-h-[34rem] place-items-center bg-[#f8f8f7] p-8">
        {children}
      </div>
    </article>
  )
}
