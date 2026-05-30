import { UserRound } from "lucide-react"

import { AvatarOrb } from "@/components/lemonade/avatar-orb"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function AvatarOrbDemo() {
  return (
    <div className="grid min-h-[28rem] place-items-center p-8">
      <AvatarOrb
        name="Jay"
        statusLabels={["Available", "In focus", "Back soon"]}
        onStatusChange={(status) => console.log("Avatar status:", status)}
      />
    </div>
  )
}

const usageCode = `import { AvatarOrb } from "@/components/lemonade-ui/avatar-orb"

export default function Demo() {
  return (
    <AvatarOrb
      name="Jay"
      statusLabels={["Available", "In focus", "Back soon"]}
      onStatusChange={(status) => console.log("Avatar status:", status)}
    />
  )
}`

export const avatarOrbCatalogItem: CatalogItem = {
  metadata: {
    id: "avatar-orb",
    title: "Avatar Orb",
    category: "Widgets",
    command: `npx shadcn@latest add ${installBaseUrl}/avatar-orb.json`,
    filter: "widgets",
    icon: UserRound,
    previewClassName: "bg-[#dededc]",
  },
  detail: {
    id: "avatar-orb",
    title: "Avatar Orb",
    category: "Widgets",
    description:
      "A soft profile tile with a generated avatar, tilt motion, and click-to-cycle status states.",
    registryUrl: `${installBaseUrl}/avatar-orb.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "AvatarOrb",
    importPath: "@/components/lemonade-ui/avatar-orb",
    previewClassName: "bg-[#dededc]",
    usageCode,
  },
  Preview: AvatarOrbDemo,
}
