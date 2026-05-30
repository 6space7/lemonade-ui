import {
  BadgeCheck,
  Eclipse,
  FolderOpen,
  MousePointer2,
} from "lucide-react"

export const installBaseUrl = "http://localhost:3000/r"

export const components = [
  {
    name: "glass-folder",
    title: "Glass Folder",
    description:
      "A frosted blue folder that stays still at rest, then pops its layered papers open on hover.",
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
