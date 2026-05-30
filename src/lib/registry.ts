import {
  BadgeCheck,
  Eclipse,
  FolderOpen,
  Languages,
  MousePointer2,
  PhoneCall,
} from "lucide-react"

export const installBaseUrl = "http://localhost:3000/r"

export const components = [
  {
    name: "glass-folder",
    title: "Glass Folder",
    description:
      "A frosted resource folder that opens on hover to reveal configurable link or note cards.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/glass-folder.json`,
    icon: FolderOpen,
  },
  {
    name: "magnetic-button",
    title: "Magnetic Button",
    description:
      "An elastic call-to-action that bends toward the cursor and snaps back with GSAP.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/magnetic-button.json`,
    icon: MousePointer2,
  },
  {
    name: "book-call-button",
    title: "Book Call Button",
    description:
      "A slide-to-book CTA with a draggable neon handle that completes into a full call state.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/book-call-button.json`,
    icon: PhoneCall,
  },
  {
    name: "prompt-pad",
    title: "Prompt Pad",
    description:
      "A retro hardware prompt keypad with a glowing LCD, language presets, tone buttons, and GSAP press feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/prompt-pad.json`,
    icon: Languages,
  },
]

export const principles = [
  {
    title: "Registry-native",
    description:
      "Each showcase component maps to a shadcn registry item, so preview and install output share source files.",
    icon: BadgeCheck,
  },
  {
    title: "GSAP-first motion",
    description:
      "The components use GSAP and React-safe cleanup patterns for hover feedback, paper popover, and reset motion.",
    icon: Eclipse,
  },
  {
    title: "Accessible by default",
    description:
      "Semantic markup, focus behavior, and reduced-motion handling stay intact.",
    icon: MousePointer2,
  },
]
