import { PanelBottom } from "lucide-react"

import { AnimatedDock, type AnimatedDockItem } from "@/components/lemonade/animated-dock"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const dockItems: AnimatedDockItem[] = [
  { id: "figma", label: "Figma", icon: "figma" },
  { id: "framer", label: "Framer", icon: "framer" },
  { id: "finder", label: "Finder", icon: "finder" },
  { id: "arc", label: "Arcade", icon: "mesh" },
  { id: "todoist", label: "Todoist", icon: "todoist" },
  { id: "photoshop", label: "Photoshop", icon: "photoshop" },
  { id: "illustrator", label: "Illustrator", icon: "illustrator" },
]

function AnimatedDockDemo() {
  return (
    <div className="grid min-h-[28rem] w-full content-center justify-items-start overflow-hidden bg-[#1f1f1f] p-4 sm:place-items-center sm:p-6">
      <AnimatedDock
        className="max-w-[calc(100vw-2rem)] sm:max-w-fit"
        items={dockItems}
        defaultActiveId="finder"
        onItemSelect={(item) => console.log("Dock item:", item.label)}
      />
    </div>
  )
}

const usageCode = `import { AnimatedDock, type AnimatedDockItem } from "@/components/lemonade-ui/animated-dock"

const dockItems: AnimatedDockItem[] = [
  { id: "figma", label: "Figma", icon: "figma" },
  { id: "framer", label: "Framer", icon: "framer" },
  { id: "finder", label: "Finder", icon: "finder" },
  { id: "arc", label: "Arcade", icon: "mesh" },
  { id: "todoist", label: "Todoist", icon: "todoist" },
  { id: "photoshop", label: "Photoshop", icon: "photoshop" },
  { id: "illustrator", label: "Illustrator", icon: "illustrator" },
]

export default function Demo() {
  return (
    <AnimatedDock
      items={dockItems}
      defaultActiveId="finder"
      magnification={0.56}
      spread={30}
      onItemSelect={(item) => console.log("Selected:", item.label)}
    />
  )
}`

export const animatedDockCatalogItem: CatalogItem = {
  metadata: {
    id: "animated-dock",
    title: "Animated Dock",
    category: "Widgets",
    command: `npx shadcn@latest add ${installBaseUrl}/animated-dock.json`,
    filter: "widgets",
    icon: PanelBottom,
    previewClassName: "bg-[#1f1f1f]",
  },
  detail: {
    id: "animated-dock",
    title: "Animated Dock",
    category: "Widgets",
    description:
      "A macOS-style app dock with pointer magnification, hover labels, active selection, and GSAP bounce feedback.",
    registryUrl: `${installBaseUrl}/animated-dock.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "AnimatedDock",
    importPath: "@/components/lemonade-ui/animated-dock",
    previewClassName: "bg-[#1f1f1f]",
    usageCode,
  },
  Preview: AnimatedDockDemo,
}
