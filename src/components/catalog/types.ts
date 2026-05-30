import { type LucideIcon } from "lucide-react"

export type FilterId = "all" | "files" | "buttons" | "ai-tools"

export type FilterOption = {
  id: FilterId
  label: string
}

export type ComponentKey = "glass-folder" | "magnetic-button" | "prompt-pad"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export type InstallTab = PackageManager | "manual"

export type ComponentDetail = {
  id: ComponentKey
  title: string
  category: string
  description: string
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
