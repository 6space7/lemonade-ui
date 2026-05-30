import { CalendarClock } from "lucide-react"

import { GradientCallScheduler } from "@/components/lemonade/gradient-call-scheduler"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function GradientCallSchedulerDemo() {
  return (
    <div className="grid min-h-[28rem] w-full place-items-center p-8">
      <GradientCallScheduler
        durations={[15, 30, 45, 60]}
        defaultDuration={30}
        onBook={(duration) => console.log("Book call:", duration)}
      />
    </div>
  )
}

const usageCode = `import { GradientCallScheduler } from "@/components/lemonade-ui/gradient-call-scheduler"

export default function Demo() {
  return (
    <GradientCallScheduler
      durations={[15, 30, 45, 60]}
      defaultDuration={30}
      onBook={(duration) => console.log("Book call:", duration)}
    />
  )
}`

export const gradientCallSchedulerCatalogItem: CatalogItem = {
  metadata: {
    id: "gradient-call-scheduler",
    title: "Gradient Call Scheduler",
    category: "Widgets",
    command: `npx shadcn@latest add ${installBaseUrl}/gradient-call-scheduler.json`,
    filter: "widgets",
    icon: CalendarClock,
    previewClassName: "bg-[#dededc]",
  },
  detail: {
    id: "gradient-call-scheduler",
    title: "Gradient Call Scheduler",
    category: "Widgets",
    description:
      "A soft duration selector paired with an animated gradient call-to-action for booking flows.",
    registryUrl: `${installBaseUrl}/gradient-call-scheduler.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "GradientCallScheduler",
    importPath: "@/components/lemonade-ui/gradient-call-scheduler",
    previewClassName: "bg-[#dededc]",
    usageCode,
  },
  Preview: GradientCallSchedulerDemo,
}
