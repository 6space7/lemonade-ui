import { FolderOpen } from "lucide-react"

import { GlassFolder, type GlassFolderItem } from "@/components/lemonade/glass-folder"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const folderText = {
  folderLabel: "Resources",
  ctaLabel: "Open",
  noteLabel: "Note",
}

const folderItems: GlassFolderItem[] = [
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

function GlassFolderDemo() {
  return <GlassFolder {...folderText} items={folderItems} />
}

const usageCode = `import { GlassFolder } from "@/components/lemonade-ui/glass-folder"

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
}`

export const glassFolderCatalogItem: CatalogItem = {
  metadata: {
    id: "glass-folder",
    title: "Glass Folder",
    category: "Files",
    command: `npx shadcn@latest add ${installBaseUrl}/glass-folder.json`,
    filter: "files",
    icon: FolderOpen,
    previewClassName: "bg-[#f5f8fb]",
  },
  detail: {
    id: "glass-folder",
    title: "Glass Folder",
    category: "Files",
    description:
      "A frosted resource folder that opens on hover to reveal configurable link or note cards.",
    registryUrl: `${installBaseUrl}/glass-folder.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "GlassFolder",
    importPath: "@/components/lemonade-ui/glass-folder",
    previewClassName: "bg-[#f5f8fb]",
    usageCode,
  },
  Preview: GlassFolderDemo,
}
