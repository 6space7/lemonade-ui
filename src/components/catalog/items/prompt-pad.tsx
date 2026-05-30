import { Languages } from "lucide-react"

import { PromptPad, type PromptPadKey } from "@/components/lemonade/prompt-pad"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

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

function PromptPadDemo() {
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
}

const usageCode = `import { PromptPad, type PromptPadKey } from "@/components/lemonade-ui/prompt-pad"

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

export const promptPadCatalogItem: CatalogItem = {
  metadata: {
    id: "prompt-pad",
    title: "Prompt Pad",
    category: "AI Tools",
    command: `npx shadcn@latest add ${installBaseUrl}/prompt-pad.json`,
    filter: "ai-tools",
    icon: Languages,
    previewClassName: "bg-[#050505]",
  },
  detail: {
    id: "prompt-pad",
    title: "Prompt Pad",
    category: "AI Tools",
    description:
      "A retro hardware prompt keypad with a glowing LCD, language presets, tone buttons, and GSAP press feedback.",
    registryUrl: `${installBaseUrl}/prompt-pad.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "PromptPad",
    importPath: "@/components/lemonade-ui/prompt-pad",
    previewClassName: "bg-[#050505]",
    usageCode,
  },
  Preview: PromptPadDemo,
}
