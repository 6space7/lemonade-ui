import { type LucideIcon } from "lucide-react"
import { type ComponentType } from "react"

export type FilterId =
  | "all"
  | "files"
  | "buttons"
  | "widgets"
  | "pricing-plans"
  | "hero-sections"
  | "cards"
  | "keyboards"
  | "ai-tools"

export type FilterOption = {
  id: FilterId
  label: string
}

export type ComponentKey =
  | "glass-folder"
  | "magnetic-button"
  | "book-call-button"
  | "three-d-button"
  | "gradient-call-scheduler"
  | "pixel-status-stack"
  | "animated-dock"
  | "pricing-plans"
  | "aura-events-hero"
  | "morning-note-card"
  | "happy-files-card"
  | "loop-pad-keyboard"
  | "prompt-pad"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export type InstallTab = PackageManager | "manual"

export type ComponentDetail = {
  id: ComponentKey
  title: string
  category: string
  description: string
  inspirationCredit?: {
    label: string
    url: string
  }
  registryUrl: string
  dependencies: string[]
  registryDependencies?: string[]
  importName: string
  importPath: string
  previewClassName: string
  usageCode: string
}

export type CatalogComponent = {
  id: ComponentKey
  title: string
  category: string
  command: string
  filter: FilterId
  icon: LucideIcon
  previewClassName: string
}

export type CatalogItem = {
  metadata: CatalogComponent
  detail: ComponentDetail
  Preview: ComponentType
}
