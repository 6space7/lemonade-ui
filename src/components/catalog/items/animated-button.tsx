import { Sparkles } from "lucide-react"

import { AnimatedButton } from "@/components/lemonade/animated-button"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function AnimatedButtonDemo() {
  return (
    <div className="grid min-h-[28rem] place-items-center bg-[#f0eee7] p-8">
      <AnimatedButton
        label="Start creating"
        hoverLabel="Make it move"
        completeLabel="Created"
        onComplete={() => console.log("Animated button clicked")}
      />
    </div>
  )
}

const usageCode = `import { Rocket, Sparkles } from "lucide-react"

import { AnimatedButton } from "@/components/lemonade-ui/animated-button"

export default function Demo() {
  return (
    <AnimatedButton
      label="Start creating"
      hoverLabel="Make it move"
      completeLabel="Created"
      icon={<Rocket className="size-4" />}
      completeIcon={<Sparkles className="size-4" />}
      accentColor="#f7f34a"
      surfaceColor="#111111"
      textColor="#ffffff"
      activeTextColor="#111111"
      glowColor="#f04444"
      resetOnComplete
      resetDelay={1400}
      onComplete={() => {
        console.log("Run your button action")
      }}
    />
  )
}`

export const animatedButtonCatalogItem: CatalogItem = {
  metadata: {
    id: "animated-button",
    title: "Animated Button",
    category: "Buttons",
    command: `npx shadcn@latest add ${installBaseUrl}/animated-button.json`,
    filter: "buttons",
    icon: Sparkles,
    previewClassName: "bg-[#f0eee7]",
  },
  detail: {
    id: "animated-button",
    title: "Animated Button",
    category: "Buttons",
    description:
      "A polished CTA with cursor tilt, liquid fill, animated label swap, completion burst, and configurable colors.",
    registryUrl: `${installBaseUrl}/animated-button.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "AnimatedButton",
    importPath: "@/components/lemonade-ui/animated-button",
    previewClassName: "bg-[#f0eee7]",
    usageCode,
  },
  Preview: AnimatedButtonDemo,
}
