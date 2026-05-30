import { MousePointer2 } from "lucide-react"

import { MagneticButton } from "@/components/lemonade/magnetic-button"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function MagneticButtonDemo() {
  return (
    <div className="grid min-h-[28rem] place-items-center">
      <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
    </div>
  )
}

const usageCode = `import { MagneticButton } from "@/components/lemonade-ui/magnetic-button"

export default function Demo() {
  return <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
}`

export const magneticButtonCatalogItem: CatalogItem = {
  metadata: {
    id: "magnetic-button",
    title: "Magnetic Button",
    category: "Buttons",
    command: `npx shadcn@latest add ${installBaseUrl}/magnetic-button.json`,
    filter: "buttons",
    icon: MousePointer2,
    previewClassName: "bg-[#10120f]",
  },
  detail: {
    id: "magnetic-button",
    title: "Magnetic Button",
    category: "Buttons",
    description:
      "An elastic call-to-action that bends toward the cursor and snaps back with GSAP.",
    registryUrl: `${installBaseUrl}/magnetic-button.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    registryDependencies: ["button"],
    importName: "MagneticButton",
    importPath: "@/components/lemonade-ui/magnetic-button",
    previewClassName: "bg-[#10120f]",
    usageCode,
  },
  Preview: MagneticButtonDemo,
}
