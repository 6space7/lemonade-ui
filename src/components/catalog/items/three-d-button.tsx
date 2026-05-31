import { CircleDotDashed } from "lucide-react"

import { ThreeDButton } from "@/components/lemonade/three-d-button"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function ThreeDButtonDemo() {
  return (
    <div className="grid min-h-[28rem] place-items-center bg-[#f6f7f1] p-8">
      <ThreeDButton
        label="Slide to launch"
        completeMessage="Launch ready"
        dragMessage="Keep sliding"
        onComplete={() => console.log("3D slider completed")}
      />
    </div>
  )
}

const usageCode = `import { ThreeDButton } from "@/components/lemonade-ui/three-d-button"

export default function Demo() {
  return (
    <ThreeDButton
      label="Slide to launch"
      completeMessage="Launch ready"
      dragMessage="Keep sliding"
      accentColor="#19d814"
      onComplete={() => {
        console.log("Run the action after the knob reaches the end")
      }}
    />
  )
}`

export const threeDButtonCatalogItem: CatalogItem = {
  metadata: {
    id: "three-d-button",
    title: "3D Button",
    category: "Buttons",
    command: `npx shadcn@latest add ${installBaseUrl}/three-d-button.json`,
    filter: "buttons",
    icon: CircleDotDashed,
    previewClassName: "bg-[#f6f7f1]",
  },
  detail: {
    id: "three-d-button",
    title: "3D Button",
    category: "Buttons",
    description:
      "A glossy 3D slide button with a draggable raised cap and configurable completion messages.",
    registryUrl: `${installBaseUrl}/three-d-button.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "ThreeDButton",
    importPath: "@/components/lemonade-ui/three-d-button",
    previewClassName: "bg-[#f6f7f1]",
    usageCode,
  },
  Preview: ThreeDButtonDemo,
}
