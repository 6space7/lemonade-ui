import { Activity } from "lucide-react"

import {
  PixelStatusStack,
  type PixelStatusItem,
} from "@/components/lemonade/pixel-status-stack"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const statuses: PixelStatusItem[] = [
  {
    id: "great",
    title: "Doing Great!",
    message: "You are on the right track",
    tone: "great",
    face: "happy",
  },
  {
    id: "ok",
    title: "Doing OK",
    message: "You're doing pretty well",
    tone: "ok",
    face: "neutral",
  },
  {
    id: "attention",
    title: "Pay Attention!",
    message: "You're off track right now",
    tone: "attention",
    face: "sad",
  },
]

function PixelStatusStackDemo() {
  return (
    <div className="grid min-h-[32rem] w-full content-center justify-items-start bg-white p-4 sm:place-items-center sm:p-8">
      <PixelStatusStack
        className="max-w-[calc(100vw-4rem)] sm:max-w-[47rem]"
        items={statuses}
        defaultSelectedId="great"
        onStatusChange={(status) => console.log("Status:", status.title)}
      />
    </div>
  )
}

const usageCode = `import { PixelStatusStack, type PixelStatusItem } from "@/components/lemonade-ui/pixel-status-stack"

const statuses: PixelStatusItem[] = [
  {
    id: "great",
    title: "Doing Great!",
    message: "You are on the right track",
    tone: "great",
    face: "happy",
  },
  {
    id: "ok",
    title: "Doing OK",
    message: "You're doing pretty well",
    tone: "ok",
    face: "neutral",
  },
  {
    id: "attention",
    title: "Pay Attention!",
    message: "You're off track right now",
    tone: "attention",
    face: "sad",
  },
]

export default function Demo() {
  return (
    <PixelStatusStack
      items={statuses}
      defaultSelectedId="great"
      onStatusChange={(status) => console.log(status)}
    />
  )
}`

export const pixelStatusStackCatalogItem: CatalogItem = {
  metadata: {
    id: "pixel-status-stack",
    title: "Pixel Status Stack",
    category: "Widgets",
    command: `npx shadcn@latest add ${installBaseUrl}/pixel-status-stack.json`,
    filter: "widgets",
    icon: Activity,
    previewClassName: "bg-white",
  },
  detail: {
    id: "pixel-status-stack",
    title: "Pixel Status Stack",
    category: "Widgets",
    description:
      "A stack of soft status feedback rows with pixel faces, selectable states, and GSAP hover feedback.",
    inspirationCredit: {
      label: "Pixel Status Stack inspiration credit",
      url: "https://www.pinterest.com/pin/661395895314935550/",
    },
    registryUrl: `${installBaseUrl}/pixel-status-stack.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "PixelStatusStack",
    importPath: "@/components/lemonade-ui/pixel-status-stack",
    previewClassName: "bg-white",
    usageCode,
  },
  Preview: PixelStatusStackDemo,
}
