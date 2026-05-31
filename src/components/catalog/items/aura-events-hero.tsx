import { Sparkles } from "lucide-react"

import {
  AuraEventsHero,
  type AuraHeroAvatar,
  type AuraHeroGalleryItem,
  type AuraHeroLogo,
  type AuraHeroNavAction,
} from "@/components/lemonade/aura-events-hero"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const navActions: AuraHeroNavAction[] = [
  { label: "Search events", icon: "search", href: "#search" },
  { label: "Open calendar", icon: "calendar", href: "#calendar" },
  { label: "Menu", icon: "menu", href: "#menu" },
]

const avatars: AuraHeroAvatar[] = [
  { label: "Maya", initials: "M", color: "#f0c4a8" },
  { label: "Noah", initials: "N", color: "#9ec4df" },
  { label: "Kai", initials: "K", color: "#d4a178" },
  { label: "Ari", initials: "A", color: "#d9b3a7" },
]

const logos: AuraHeroLogo[] = [
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "LOGOIPSUM" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
]

const gallery: AuraHeroGalleryItem[] = [
  { label: "Night party", scene: "party", gradient: "linear-gradient(135deg,#19191d,#8c6d51 46%,#f7ece3)" },
  { label: "Fairground", scene: "wheel", gradient: "linear-gradient(135deg,#bfe7f6,#f5f9fb)" },
  { label: "Celebration toast", scene: "toast", gradient: "linear-gradient(135deg,#f597c4,#ffcc75 52%,#7a43ff)" },
  { label: "Costume moment", scene: "festival", gradient: "linear-gradient(135deg,#8bf2e9,#fbf7d9 48%,#ff88b9)" },
  { label: "Garden dinner", scene: "fashion", gradient: "linear-gradient(135deg,#252321,#dbaeb4 55%,#f8d76e)" },
  { label: "Dance floor", scene: "motion", gradient: "linear-gradient(135deg,#f5e5d4,#eff7eb 55%,#d7a16d)" },
]

function AuraEventsHeroDemo() {
  return (
    <div className="w-full min-w-0 justify-self-stretch overflow-hidden bg-white">
      <AuraEventsHero
        brandName="Aura"
        brandHref="#aura"
        navActions={navActions}
        joinedCount="250K+"
        joinedLabel="People joined"
        joinedHref="#community"
        joinedAriaLabel="View Aura community"
        avatars={avatars}
        description="We spark the fun of celebrations, putting together events that create laughter, connections, and great memories."
        headlineTop="AWESOME"
        headlineBottom="EVENTS!"
        note="Based on your needs"
        primaryCta={{ label: "Get Started", href: "#get-started" }}
        playCta={{ label: "Play intro", href: "#intro" }}
        logos={logos}
        gallery={gallery}
      />
    </div>
  )
}

const usageCode = `import {
  AuraEventsHero,
  type AuraHeroAvatar,
  type AuraHeroGalleryItem,
  type AuraHeroLogo,
  type AuraHeroNavAction,
} from "@/components/lemonade-ui/aura-events-hero"

const navActions: AuraHeroNavAction[] = [
  { label: "Search events", icon: "search", href: "/events" },
  { label: "Open calendar", icon: "calendar", href: "/calendar" },
  { label: "Menu", icon: "menu", href: "/menu" },
]

const avatars: AuraHeroAvatar[] = [
  { label: "Maya", initials: "M", color: "#f0c4a8" },
  { label: "Noah", initials: "N", color: "#9ec4df" },
  { label: "Kai", initials: "K", color: "#d4a178" },
  { label: "Ari", initials: "A", color: "#d9b3a7" },
]

const logos: AuraHeroLogo[] = [
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "LOGOIPSUM" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
  { label: "Logoipsum" },
]

const gallery: AuraHeroGalleryItem[] = [
  { label: "Night party", scene: "party", gradient: "linear-gradient(135deg,#19191d,#8c6d51 46%,#f7ece3)" },
  { label: "Fairground", scene: "wheel", gradient: "linear-gradient(135deg,#bfe7f6,#f5f9fb)" },
  { label: "Celebration toast", scene: "toast", gradient: "linear-gradient(135deg,#f597c4,#ffcc75 52%,#7a43ff)" },
  { label: "Costume moment", scene: "festival", gradient: "linear-gradient(135deg,#8bf2e9,#fbf7d9 48%,#ff88b9)" },
  { label: "Garden dinner", scene: "fashion", gradient: "linear-gradient(135deg,#252321,#dbaeb4 55%,#f8d76e)" },
  { label: "Dance floor", scene: "motion", gradient: "linear-gradient(135deg,#f5e5d4,#eff7eb 55%,#d7a16d)" },
]

export default function Demo() {
  return (
    <AuraEventsHero
      brandName="Aura"
      brandHref="/"
      navActions={navActions}
      joinedCount="250K+"
      joinedLabel="People joined"
      joinedHref="/community"
      joinedAriaLabel="View Aura community"
      avatars={avatars}
      description="We spark the fun of celebrations, putting together events that create laughter, connections, and great memories."
      headlineTop="AWESOME"
      headlineBottom="EVENTS!"
      note="Based on your needs"
      primaryCta={{ label: "Get Started", href: "/events/new" }}
      playCta={{ label: "Play intro", href: "/intro" }}
      logos={logos}
      gallery={gallery}
    />
  )
}`

export const auraEventsHeroCatalogItem: CatalogItem = {
  metadata: {
    id: "aura-events-hero",
    title: "Aura Events Hero",
    category: "Hero Sections",
    command: `npx shadcn@latest add ${installBaseUrl}/aura-events-hero.json`,
    filter: "hero-sections",
    icon: Sparkles,
    previewClassName: "!place-items-stretch bg-white [&>*]:!w-full [&>*]:min-w-0",
  },
  detail: {
    id: "aura-events-hero",
    title: "Aura Events Hero",
    category: "Hero Sections",
    description:
      "A cinematic event landing hero with social proof, massive serif headline, CTA controls, logo marquee, and animated event cards.",
    registryUrl: `${installBaseUrl}/aura-events-hero.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "AuraEventsHero",
    importPath: "@/components/lemonade-ui/aura-events-hero",
    previewClassName: "!place-items-stretch bg-white [&>*]:!w-full [&>*]:min-w-0",
    usageCode,
  },
  Preview: AuraEventsHeroDemo,
}
