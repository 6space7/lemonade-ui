"use client"

import { ArrowUpRight, GitFork } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

import { ComponentDetailsDialog } from "./component-details-dialog"
import { ComponentPreview } from "./component-preview"
import { ComponentTile } from "./component-tile"
import { filters, filterToHash, hashToFilter } from "./data"
import { catalogComponents, componentDetails } from "./items"
import { type ComponentKey, type FilterId } from "./types"

export function ComponentCatalog() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all")
  const [selectedComponent, setSelectedComponent] = useState<ComponentKey | null>(null)

  useEffect(() => {
    const syncFilterFromHash = () => {
      setActiveFilter(hashToFilter[window.location.hash] ?? "all")
    }

    syncFilterFromHash()
    window.addEventListener("hashchange", syncFilterFromHash)

    return () => window.removeEventListener("hashchange", syncFilterFromHash)
  }, [])

  const visibleComponents = useMemo(
    () =>
      catalogComponents.filter((component) => {
        return activeFilter === "all" || component.filter === activeFilter
      }),
    [activeFilter]
  )

  const handleFilterChange = (filter: FilterId) => {
    setActiveFilter(filter)
    window.history.replaceState(null, "", filterToHash[filter])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#202020] text-[#f5f2e8]">
      <header className="flex items-start justify-between gap-6 px-3 pt-3 sm:px-5 sm:pt-4">
        <a href="#all" className="group inline-flex items-center gap-2" aria-label="Lemonade UI">
          <span className="h-3 w-9 rounded-sm bg-[linear-gradient(90deg,#f04444_0_33%,#f7f34a_33%_66%,#37d678_66%)] shadow-[0_0_22px_rgba(247,243,74,0.12)]" />
          <span className="text-[0.95rem] font-semibold tracking-tight text-white/34 transition-colors group-hover:text-white/70">
            Lemonade UI
          </span>
        </a>
        <nav className="flex items-center gap-3" aria-label="Project links">
          <a
            href="/r/registry.json"
            className="inline-flex items-center gap-1 text-xs font-medium text-white/36 transition-colors hover:text-white/78"
          >
            Registry <ArrowUpRight className="size-3" />
          </a>
          <a
            href="https://github.com/6space7/lemonade-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/44 transition-colors hover:text-white/86"
          >
            <GitFork className="size-3.5" />
            GitHub <ArrowUpRight className="size-3" />
          </a>
        </nav>
      </header>

      <section className="px-3 pb-4 pt-4 sm:px-5">
        <div className="max-w-[21rem]">
          <h1 className="text-[1.05rem] font-semibold leading-5 tracking-normal text-white">
            Animated components for your next project.
          </h1>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Component filters">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterChange(filter.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-[#f5f2e8] text-[#202020]"
                      : "bg-[#111111] text-white/72 hover:bg-[#151515] hover:text-white"
                  )}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section
        className={cn(
          "grid gap-3 px-3 pb-12 sm:px-5",
          activeFilter === "all"
            ? "md:grid-cols-2"
            : activeFilter === "hero-sections" || activeFilter === "sliders" || activeFilter === "contact-sections"
              ? "grid-cols-1"
              : "max-w-[70rem] grid-cols-1"
        )}
      >
        {visibleComponents.map((component) => (
          <ComponentTile
            key={component.id}
            {...component}
            className={
              ["pricing-plans", "aura-events-hero", "project-spotlight-slider", "kinetic-contact-section"].includes(
                component.id
              )
                ? "md:col-span-2"
                : undefined
            }
            onOpenDetails={() => setSelectedComponent(component.id)}
          >
            <ComponentPreview id={component.id} />
          </ComponentTile>
        ))}
      </section>

      <ComponentDetailsDialog
        detail={selectedComponent ? componentDetails[selectedComponent] : null}
        onClose={() => setSelectedComponent(null)}
      />
    </main>
  )
}
