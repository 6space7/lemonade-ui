import { SunMedium } from "lucide-react"

import { MorningNoteCard, type MorningNote } from "@/components/lemonade/morning-note-card"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const notes: MorningNote[] = [
  {
    sender: "Morning Jay",
    message: "You have to start delegating tasks, now go carpe diem :)",
    emphasis: "delegating tasks",
  },
  {
    sender: "Morning X'ies",
    message: "You should finish your portfolio today, what do you think?",
    emphasis: "finish your portfolio",
  },
]

function MorningNoteCardDemo() {
  return (
    <div className="grid min-h-[28rem] w-full place-items-center p-8">
      <MorningNoteCard notes={notes} onNoteChange={(note) => console.log("Note:", note.sender)} />
    </div>
  )
}

const usageCode = `import { MorningNoteCard, type MorningNote } from "@/components/lemonade-ui/morning-note-card"

const notes: MorningNote[] = [
  {
    sender: "Morning Jay",
    message: "You have to start delegating tasks, now go carpe diem :)",
    emphasis: "delegating tasks",
  },
  {
    sender: "Morning X'ies",
    message: "You should finish your portfolio today, what do you think?",
    emphasis: "finish your portfolio",
  },
]

export default function Demo() {
  return <MorningNoteCard notes={notes} />
}`

export const morningNoteCardCatalogItem: CatalogItem = {
  metadata: {
    id: "morning-note-card",
    title: "Morning Note Card",
    category: "Cards",
    command: `npx shadcn@latest add ${installBaseUrl}/morning-note-card.json`,
    filter: "cards",
    icon: SunMedium,
    previewClassName: "bg-[#dededc]",
  },
  detail: {
    id: "morning-note-card",
    title: "Morning Note Card",
    category: "Cards",
    description:
      "A colorful morning card with a time header and a floating note that cycles through messages on click.",
    registryUrl: `${installBaseUrl}/morning-note-card.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "MorningNoteCard",
    importPath: "@/components/lemonade-ui/morning-note-card",
    previewClassName: "bg-[#dededc]",
    usageCode,
  },
  Preview: MorningNoteCardDemo,
}
