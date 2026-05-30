import { PhoneCall } from "lucide-react"

import { BookCallButton } from "@/components/lemonade/book-call-button"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function BookCallButtonDemo() {
  return (
    <div className="grid min-h-[28rem] place-items-center p-8">
      <BookCallButton
        href="#book-a-call"
        label="Book a call"
        onClick={(event) => event.preventDefault()}
      />
    </div>
  )
}

const usageCode = `import { BookCallButton } from "@/components/lemonade-ui/book-call-button"

export default function Demo() {
  return (
    <BookCallButton
      href="/book"
      label="Book a call"
    />
  )
}`

export const bookCallButtonCatalogItem: CatalogItem = {
  metadata: {
    id: "book-call-button",
    title: "Book Call Button",
    category: "Buttons",
    command: `npx shadcn@latest add ${installBaseUrl}/book-call-button.json`,
    filter: "buttons",
    icon: PhoneCall,
    previewClassName: "bg-[#f6f5f0]",
  },
  detail: {
    id: "book-call-button",
    title: "Book Call Button",
    category: "Buttons",
    description:
      "A booking CTA that expands its neon action segment into a full call state on hover or focus.",
    registryUrl: `${installBaseUrl}/book-call-button.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "BookCallButton",
    importPath: "@/components/lemonade-ui/book-call-button",
    previewClassName: "bg-[#f6f5f0]",
    usageCode,
  },
  Preview: BookCallButtonDemo,
}
