"use client"

import {
  ArrowUpRight,
  Check,
  Clipboard,
  FolderOpen,
  MousePointer2,
  type LucideIcon,
  X,
} from "lucide-react"
import { type ReactNode, useEffect, useMemo, useState } from "react"

import { GlassFolder, type GlassFolderItem } from "@/components/lemonade/glass-folder"
import { MagneticButton } from "@/components/lemonade/magnetic-button"
import { components } from "@/lib/registry"
import { cn } from "@/lib/utils"

type FilterId = "all" | "files" | "buttons"

type FilterOption = {
  id: FilterId
  label: string
}

type ComponentKey = "glass-folder" | "magnetic-button"
type PackageManager = "npm" | "pnpm" | "yarn" | "bun"
type InstallTab = PackageManager | "manual"

type ComponentDetail = {
  id: ComponentKey
  title: string
  category: string
  description: string
  registryUrl: string
  dependencies: string[]
  registryDependencies?: string[]
  importName: string
  importPath: string
  defaultUsage: string
}

const filters: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "files", label: "Files" },
  { id: "buttons", label: "Buttons" },
]

const hashToFilter: Record<string, FilterId> = {
  "#all": "all",
  "#home": "all",
  "#featured": "all",
  "#files": "files",
  "#glass-folder": "files",
  "#buttons": "buttons",
  "#magnetic-button": "buttons",
  "#registry": "all",
  "#registry-output": "all",
}

const filterToHash: Record<FilterId, string> = {
  all: "#all",
  files: "#files",
  buttons: "#buttons",
}

const componentDetails: Record<ComponentKey, ComponentDetail> = {
  "glass-folder": {
    id: "glass-folder",
    title: "Glass Folder",
    category: "Files",
    description:
      "A frosted resource folder that opens on hover to reveal configurable link or note cards.",
    registryUrl: "http://localhost:3000/r/glass-folder.json",
    dependencies: ["gsap", "@gsap/react"],
    importName: "GlassFolder",
    importPath: "@/components/lemonade-ui/glass-folder",
    defaultUsage: `import { GlassFolder } from "@/components/lemonade-ui/glass-folder"

const folderText = {
  folderLabel: "Resources",
  ctaLabel: "Open",
  noteLabel: "Note",
}

const folderItems = [
  {
    title: "Docs",
    description: "Read setup notes and component behavior.",
    href: "/docs",
    badge: "Guide",
    actionLabel: "Read",
  },
  {
    title: "Design kit",
    description: "Open the source visuals and variants.",
    href: "/design",
    badge: "Figma",
    actionLabel: "Open",
  },
  {
    title: "Roadmap",
    description: "Track launch items and release notes.",
    href: "/roadmap",
    badge: "Plan",
    actionLabel: "View",
  },
]

export default function Demo() {
  return <GlassFolder {...folderText} items={folderItems} />
}`,
  },
  "magnetic-button": {
    id: "magnetic-button",
    title: "Magnetic Button",
    category: "Buttons",
    description:
      "An elastic call-to-action that bends toward the cursor and snaps back with GSAP.",
    registryUrl: "http://localhost:3000/r/magnetic-button.json",
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    registryDependencies: ["button"],
    importName: "MagneticButton",
    importPath: "@/components/lemonade-ui/magnetic-button",
    defaultUsage: `import { MagneticButton } from "@/components/lemonade-ui/magnetic-button"

export default function Demo() {
  return <MagneticButton>Launch motion</MagneticButton>
}`,
  },
}

const installTabs: InstallTab[] = ["npm", "pnpm", "yarn", "bun", "manual"]

const glassFolderShowcaseItems: GlassFolderItem[] = [
  {
    title: "Docs",
    description: "Read setup notes and component behavior.",
    href: "/docs",
    badge: "Guide",
    actionLabel: "Read",
  },
  {
    title: "Design kit",
    description: "Open the source visuals and variants.",
    href: "/design",
    badge: "Figma",
    actionLabel: "Open",
  },
  {
    title: "Roadmap",
    description: "Track launch items and release notes.",
    href: "/roadmap",
    badge: "Plan",
    actionLabel: "View",
  },
]

export default function Home() {
  const [glassFolder, magneticButton] = components
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

  const visibleSections = useMemo(
    () => ({
      glass: activeFilter === "all" || activeFilter === "files",
      magnetic: activeFilter === "all" || activeFilter === "buttons",
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
        <a
          href="/r/registry.json"
          className="inline-flex items-center gap-1 text-xs font-medium text-white/36 transition-colors hover:text-white/78"
        >
          Registry <ArrowUpRight className="size-3" />
        </a>
      </header>

      <section className="px-3 pb-4 pt-4 sm:px-5">
        <div className="max-w-[21rem]">
          <h1 className="text-[1.05rem] font-semibold leading-5 tracking-normal text-white">
            Animated components for shadcn registry.
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
            : "max-w-[56rem] grid-cols-1"
        )}
      >
        {visibleSections.glass ? (
          <ComponentTile
            id="glass-folder"
            title={glassFolder.title}
            category="Files"
            command={glassFolder.command}
            icon={FolderOpen}
            onOpenDetails={() => setSelectedComponent("glass-folder")}
            previewClassName="bg-[#f5f8fb]"
          >
            <GlassFolder folderLabel="Resources" items={glassFolderShowcaseItems} />
          </ComponentTile>
        ) : null}

        {visibleSections.magnetic ? (
          <ComponentTile
            id="magnetic-button"
            title={magneticButton.title}
            category="Buttons"
            command={magneticButton.command}
            icon={MousePointer2}
            onOpenDetails={() => setSelectedComponent("magnetic-button")}
            previewClassName="bg-[#10120f]"
          >
            <div className="grid min-h-[28rem] place-items-center">
              <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
            </div>
          </ComponentTile>
        ) : null}
      </section>

      <ComponentDetailsDialog
        detail={selectedComponent ? componentDetails[selectedComponent] : null}
        onClose={() => setSelectedComponent(null)}
      />
    </main>
  )
}

function ComponentTile({
  id,
  title,
  category,
  command,
  icon: Icon,
  previewClassName,
  className,
  onOpenDetails,
  children,
}: {
  id: string
  title: string
  category: string
  command: string
  icon: LucideIcon
  previewClassName: string
  className?: string
  onOpenDetails: () => void
  children: ReactNode
}) {
  return (
    <article
      id={id}
      data-card={id}
      className={cn(
        "group overflow-hidden rounded-lg border border-white/10 bg-[#121212] shadow-[0_30px_90px_rgba(0,0,0,0.22)]",
        className
      )}
    >
      <div className="flex min-h-16 items-center gap-3 border-b border-white/10 px-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-[#f7f34a]">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold tracking-normal text-white">{title}</h2>
          <p className="text-xs font-medium text-white/38">{category}</p>
        </div>
        <button
          type="button"
          onClick={onOpenDetails}
          className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-white/58 transition-colors hover:bg-white/[0.09] hover:text-white"
          aria-label={`${title} registry item`}
        >
          <ArrowUpRight className="size-4" />
        </button>
      </div>
      <div className={cn("grid min-h-[30rem] place-items-center", previewClassName)}>{children}</div>
      <div className="border-t border-white/10 bg-[#101010] px-4 py-3">
        <code className="block truncate text-xs text-[#d8ff6a]/76">{command}</code>
      </div>
    </article>
  )
}

function ComponentDetailsDialog({
  detail,
  onClose,
}: {
  detail: ComponentDetail | null
  onClose: () => void
}) {
  const [installTab, setInstallTab] = useState<InstallTab>("npm")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    if (!detail) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [detail, onClose])

  if (!detail) {
    return null
  }

  const installCommand = getInstallCommand(detail.registryUrl, installTab)
  const usageCode = detail.defaultUsage
  const aiPrompt = getAiPrompt({
    detail,
    installCommand: getInstallCommand(detail.registryUrl, "npm"),
    usageCode,
  })
  const manualText = getManualInstallText(detail, usageCode)
  const installOutput = installTab === "manual" ? manualText : installCommand

  const copyText = async (value: string, key: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        copyWithFallback(value)
      }
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1400)
    } catch {
      copyWithFallback(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1400)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 p-3 backdrop-blur-xl sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="component-details-title"
        className="mx-auto grid h-[calc(100vh-1.5rem)] max-w-[92rem] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_40px_140px_rgba(0,0,0,0.72)] sm:h-[calc(100vh-2.5rem)] lg:grid-cols-[minmax(25rem,34rem)_1fr]"
      >
        <div className="lemonade-scrollbar overflow-y-auto border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-start gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/42">
                Components / {detail.category} / {detail.title}
              </p>
              <h2
                id="component-details-title"
                className="mt-5 text-xl font-semibold tracking-normal text-white"
              >
                {detail.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/55">{detail.description}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-white/58 transition-colors hover:bg-white/[0.09] hover:text-white"
              aria-label="Close component details"
            >
              <X className="size-4" />
            </button>
          </div>

          <DetailSection title="Dependencies">
            <div className="flex flex-wrap gap-2">
              {detail.dependencies.map((dependency) => (
                <span
                  key={dependency}
                  className="rounded-md bg-white/[0.08] px-2.5 py-1.5 text-xs font-semibold text-white/72"
                >
                  {dependency}
                </span>
              ))}
              {detail.registryDependencies?.map((dependency) => (
                <span
                  key={dependency}
                  className="rounded-md bg-[#f7f34a]/12 px-2.5 py-1.5 text-xs font-semibold text-[#f7f34a]"
                >
                  shadcn/{dependency}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Copy for AI">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyText(aiPrompt, "prompt")}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f7f34a]"
              >
                {copiedKey === "prompt" ? <Check className="size-4" /> : <Clipboard className="size-4" />}
                {copiedKey === "prompt" ? "Copied prompt" : "Copy prompt"}
              </button>
              <button
                type="button"
                onClick={() => copyText(usageCode, "usage")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/68 transition-colors hover:bg-white/[0.09] hover:text-white"
              >
                {copiedKey === "usage" ? <Check className="size-4" /> : <Clipboard className="size-4" />}
                Copy usage
              </button>
            </div>
          </DetailSection>

          <DetailSection title="Installation">
            <div className="flex flex-wrap gap-2">
              {installTabs.map((tab) => {
                const isActive = installTab === tab

                return (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setInstallTab(tab)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-colors",
                      isActive
                        ? "bg-[#f7f34a] text-[#111111]"
                        : "bg-white/[0.07] text-white/62 hover:bg-white/[0.1] hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            <CopyBlock
              className="mt-3"
              value={installOutput}
              copied={copiedKey === `install-${installTab}`}
              onCopy={() => copyText(installOutput, `install-${installTab}`)}
            />
          </DetailSection>

        </div>

        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] bg-[#0f0f0f]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-xs font-semibold text-white/72">
              Preview
            </div>
            <a
              href={detail.registryUrl.replace("http://localhost:3000", "")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-white/42 transition-colors hover:text-white"
            >
              Open JSON <ArrowUpRight className="size-3" />
            </a>
          </div>

          <div
            className={cn(
              "grid min-h-0 place-items-center overflow-hidden p-6",
              detail.id === "glass-folder" ? "bg-[#f5f8fb]" : "bg-[#10120f]"
            )}
          >
            {renderComponentPreview(detail)}
          </div>

          <div className="min-h-0 border-t border-white/10 bg-[#0b0b0b] p-4">
            <p className="mb-2 text-xs font-semibold text-white/48">How to use</p>
            <CopyBlock
              className="max-h-[14rem] min-h-0"
              value={usageCode}
              copied={copiedKey === "usage-bottom"}
              onCopy={() => copyText(usageCode, "usage-bottom")}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function copyWithFallback(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.left = "-9999px"
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="mb-3 text-xs font-semibold text-white/72">{title}</h3>
      {children}
    </section>
  )
}

function CopyBlock({
  value,
  copied,
  onCopy,
  className,
}: {
  value: string
  copied: boolean
  onCopy: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid min-h-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]",
        className
      )}
    >
      <pre className="lemonade-scrollbar min-h-0 max-h-[inherit] overflow-auto whitespace-pre-wrap p-4 text-xs leading-6 text-white/82">
        <code>{value}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="grid w-11 place-items-start border-l border-white/10 p-3 text-white/54 transition-colors hover:bg-white/[0.07] hover:text-white"
        aria-label="Copy text"
      >
        {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
      </button>
    </div>
  )
}

function renderComponentPreview(detail: ComponentDetail) {
  if (detail.id === "glass-folder") {
    return <GlassFolder />
  }

  return (
    <MagneticButton intensity={0.5}>
      Launch motion
    </MagneticButton>
  )
}

function getInstallCommand(registryUrl: string, tab: InstallTab) {
  switch (tab) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${registryUrl}`
    case "yarn":
      return `yarn dlx shadcn@latest add ${registryUrl}`
    case "bun":
      return `bunx shadcn@latest add ${registryUrl}`
    case "manual":
      return ""
    default:
      return `npx shadcn@latest add ${registryUrl}`
  }
}

function getManualInstallText(detail: ComponentDetail, usageCode: string) {
  const dependencyText = detail.dependencies.length
    ? `npm install ${detail.dependencies.join(" ")}`
    : "No package dependencies."
  const registryDependencyText = detail.registryDependencies?.length
    ? `\nshadcn dependencies: ${detail.registryDependencies.join(", ")}`
    : ""

  return `1. Copy the registry source from ${detail.registryUrl}
2. Place ${detail.title} at components/lemonade-ui/${detail.id}.tsx
3. Install dependencies:
${dependencyText}${registryDependencyText}
4. Import it:
${usageCode}`
}

function getAiPrompt({
  detail,
  installCommand,
  usageCode,
}: {
  detail: ComponentDetail
  installCommand: string
  usageCode: string
}) {
  return `Install and use Lemonade UI's ${detail.title} component in my shadcn project.

Registry item:
${detail.registryUrl}

Install command:
${installCommand}

Dependencies:
${detail.dependencies.join(", ")}${detail.registryDependencies?.length ? `; shadcn: ${detail.registryDependencies.join(", ")}` : ""}

Example how to use:
${usageCode}

Use this example as the starting point. I will customize props, content, and styling in code as needed. Make sure imports match my project aliases and keep the GSAP interaction behavior intact.`
}
