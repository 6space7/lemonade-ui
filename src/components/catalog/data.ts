import { FolderOpen, Languages, MousePointer2 } from "lucide-react"

import { type GlassFolderItem } from "@/components/lemonade/glass-folder"
import { type PromptPadKey } from "@/components/lemonade/prompt-pad"
import { components } from "@/lib/registry"

import {
  type CatalogComponent,
  type ComponentDetail,
  type ComponentKey,
  type FilterId,
  type FilterOption,
  type InstallTab,
} from "./types"

type RegistryComponent = (typeof components)[number]

export const filters: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "files", label: "Files" },
  { id: "buttons", label: "Buttons" },
  { id: "ai-tools", label: "AI Tools" },
]

export const hashToFilter: Record<string, FilterId> = {
  "#all": "all",
  "#home": "all",
  "#featured": "all",
  "#files": "files",
  "#glass-folder": "files",
  "#buttons": "buttons",
  "#magnetic-button": "buttons",
  "#ai-tools": "ai-tools",
  "#prompt-pad": "ai-tools",
  "#registry": "all",
  "#registry-output": "all",
}

export const filterToHash: Record<FilterId, string> = {
  all: "#all",
  files: "#files",
  buttons: "#buttons",
  "ai-tools": "#ai-tools",
}

export const installTabs: InstallTab[] = ["npm", "pnpm", "yarn", "bun", "manual"]

export const glassFolderShowcaseItems: GlassFolderItem[] = [
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

export const promptPadShowcaseKeys: PromptPadKey[] = [
  {
    id: "english",
    label: "US",
    caption: "EN-US",
    prompt: "Correct my English and make my language more polite",
    icon: "us",
    tone: "cream",
  },
  {
    id: "polite",
    label: "2",
    prefix: "P",
    caption: "Polite",
    prompt: "Make this warmer, shorter, and more respectful",
    tone: "peach",
  },
  {
    id: "clear",
    label: "3",
    prefix: "P",
    caption: "Clear",
    prompt: "Rewrite this with simple clear wording",
    tone: "lilac",
  },
  {
    id: "friendly",
    label: ":)",
    caption: "Friendly",
    prompt: "Make this sound friendly without being too casual",
    icon: "smile",
    tone: "blue",
  },
  {
    id: "fix",
    label: "Fix",
    caption: "Grammar",
    prompt: "Fix grammar, spelling, punctuation, and flow",
    icon: "bug",
    tone: "yellow",
  },
  {
    id: "japanese",
    label: "JP",
    caption: "Japanese",
    prompt: "Translate this into natural Japanese",
    icon: "jp",
    tone: "cream",
  },
  {
    id: "portuguese",
    label: "BR",
    caption: "PT-BR",
    prompt: "Translate this into Brazilian Portuguese",
    icon: "br",
    tone: "green",
  },
  {
    id: "brief",
    label: "8",
    prefix: "P",
    caption: "Brief",
    prompt: "Compress this into one crisp sentence",
    tone: "peach",
  },
  {
    id: "urgent",
    label: "9",
    prefix: "P",
    caption: "Urgent",
    prompt: "Make this direct and action-oriented",
    tone: "coral",
  },
]

const glassFolderUsageCode = `import { GlassFolder } from "@/components/lemonade-ui/glass-folder"

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

const magneticButtonUsageCode = `import { MagneticButton } from "@/components/lemonade-ui/magnetic-button"

export default function Demo() {
  return <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
}`

const promptPadUsageCode = `import { PromptPad, type PromptPadKey } from "@/components/lemonade-ui/prompt-pad"

const promptKeys: PromptPadKey[] = [
  {
    id: "english",
    label: "US",
    caption: "EN-US",
    prompt: "Correct my English and make my language more polite",
    icon: "us",
    tone: "cream",
  },
  {
    id: "polite",
    label: "2",
    prefix: "P",
    caption: "Polite",
    prompt: "Make this warmer, shorter, and more respectful",
    tone: "peach",
  },
  {
    id: "clear",
    label: "3",
    prefix: "P",
    caption: "Clear",
    prompt: "Rewrite this with simple clear wording",
    tone: "lilac",
  },
  {
    id: "friendly",
    label: ":)",
    caption: "Friendly",
    prompt: "Make this sound friendly without being too casual",
    icon: "smile",
    tone: "blue",
  },
  {
    id: "fix",
    label: "Fix",
    caption: "Grammar",
    prompt: "Fix grammar, spelling, punctuation, and flow",
    icon: "bug",
    tone: "yellow",
  },
  {
    id: "japanese",
    label: "JP",
    caption: "Japanese",
    prompt: "Translate this into natural Japanese",
    icon: "jp",
    tone: "cream",
  },
  {
    id: "portuguese",
    label: "BR",
    caption: "PT-BR",
    prompt: "Translate this into Brazilian Portuguese",
    icon: "br",
    tone: "green",
  },
  {
    id: "brief",
    label: "8",
    prefix: "P",
    caption: "Brief",
    prompt: "Compress this into one crisp sentence",
    tone: "peach",
  },
  {
    id: "urgent",
    label: "9",
    prefix: "P",
    caption: "Urgent",
    prompt: "Make this direct and action-oriented",
    tone: "coral",
  },
]

export default function Demo() {
  return (
    <PromptPad
      screenPrompt="Correct my English and make my language more polite"
      modeLabel="P2"
      statusLabel="0"
      keys={promptKeys}
      defaultActiveKeyId="english"
      onKeyChange={(key) => console.log("Selected prompt:", key.prompt)}
    />
  )
}`

const registryComponent = (name: ComponentKey): RegistryComponent => {
  const component = components.find((item) => item.name === name)

  if (!component) {
    throw new Error(`Missing registry component: ${name}`)
  }

  return component
}

export const catalogComponents: CatalogComponent[] = [
  {
    ...registryComponent("glass-folder"),
    id: "glass-folder",
    category: "Files",
    filter: "files",
    icon: FolderOpen,
    previewClassName: "bg-[#f5f8fb]",
  },
  {
    ...registryComponent("magnetic-button"),
    id: "magnetic-button",
    category: "Buttons",
    filter: "buttons",
    icon: MousePointer2,
    previewClassName: "bg-[#10120f]",
  },
  {
    ...registryComponent("prompt-pad"),
    id: "prompt-pad",
    category: "AI Tools",
    filter: "ai-tools",
    icon: Languages,
    previewClassName: "bg-[#050505]",
  },
]

export const componentDetails: Record<ComponentKey, ComponentDetail> = {
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
    previewClassName: "bg-[#f5f8fb]",
    usageCode: glassFolderUsageCode,
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
    previewClassName: "bg-[#10120f]",
    usageCode: magneticButtonUsageCode,
  },
  "prompt-pad": {
    id: "prompt-pad",
    title: "Prompt Pad",
    category: "AI Tools",
    description:
      "A retro hardware prompt keypad with a glowing LCD, language presets, tone buttons, and GSAP press feedback.",
    registryUrl: "http://localhost:3000/r/prompt-pad.json",
    dependencies: ["gsap", "@gsap/react"],
    importName: "PromptPad",
    importPath: "@/components/lemonade-ui/prompt-pad",
    previewClassName: "bg-[#050505]",
    usageCode: promptPadUsageCode,
  },
}
