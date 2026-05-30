import { FolderHeart } from "lucide-react"

import { HappyFilesCard, type HappyFilesStat } from "@/components/lemonade/happy-files-card"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const stats: HappyFilesStat[] = [
  { label: "Images", value: 88, icon: "image" },
  { label: "Videos", value: 24, icon: "video" },
  { label: "Docs", value: 9, icon: "file" },
  { label: "Clips", value: 89, icon: "camera" },
]

function HappyFilesCardDemo() {
  return (
    <div className="grid min-h-[28rem] w-full place-items-center p-8">
      <HappyFilesCard stats={stats} onOpen={() => console.log("Open happy files")} />
    </div>
  )
}

const usageCode = `import { HappyFilesCard, type HappyFilesStat } from "@/components/lemonade-ui/happy-files-card"

const stats: HappyFilesStat[] = [
  { label: "Images", value: 88, icon: "image" },
  { label: "Videos", value: 24, icon: "video" },
  { label: "Docs", value: 9, icon: "file" },
  { label: "Clips", value: 89, icon: "camera" },
]

export default function Demo() {
  return <HappyFilesCard stats={stats} onOpen={() => console.log("Open happy files")} />
}`

export const happyFilesCardCatalogItem: CatalogItem = {
  metadata: {
    id: "happy-files-card",
    title: "Happy Files Card",
    category: "Cards",
    command: `npx shadcn@latest add ${installBaseUrl}/happy-files-card.json`,
    filter: "cards",
    icon: FolderHeart,
    previewClassName: "bg-[#dededc]",
  },
  detail: {
    id: "happy-files-card",
    title: "Happy Files Card",
    category: "Cards",
    description:
      "A soft folder stats card with a gradient file icon, menu affordance, and animated stat feedback.",
    registryUrl: `${installBaseUrl}/happy-files-card.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "HappyFilesCard",
    importPath: "@/components/lemonade-ui/happy-files-card",
    previewClassName: "bg-[#dededc]",
    usageCode,
  },
  Preview: HappyFilesCardDemo,
}
