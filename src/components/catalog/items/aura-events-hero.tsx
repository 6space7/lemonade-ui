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
  { label: "Night party", src: "/aura-events/night-party.jpg", alt: "Friends dancing during an indoor music party." },
  { label: "Fairground", src: "/aura-events/fairground.jpg", alt: "A colorful ferris wheel against a clear sky." },
  { label: "Celebration toast", src: "/aura-events/celebration-toast.jpg", alt: "Guests raising champagne glasses at a celebration." },
  { label: "Costume moment", src: "/aura-events/costume-moment.jpg", alt: "A bright carnival performer in a colorful costume." },
  { label: "Garden dinner", src: "/aura-events/garden-dinner.jpg", alt: "Guests gathered around a garden dinner table." },
  { label: "Dance floor", src: "/aura-events/dance-floor.jpg", alt: "A lively dance floor with colorful party lights." },
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
  { label: "Night party", src: "/aura-events/night-party.jpg", alt: "Friends dancing during an indoor music party." },
  { label: "Fairground", src: "/aura-events/fairground.jpg", alt: "A colorful ferris wheel against a clear sky." },
  { label: "Celebration toast", src: "/aura-events/celebration-toast.jpg", alt: "Guests raising champagne glasses at a celebration." },
  { label: "Costume moment", src: "/aura-events/costume-moment.jpg", alt: "A bright carnival performer in a colorful costume." },
  { label: "Garden dinner", src: "/aura-events/garden-dinner.jpg", alt: "Guests gathered around a garden dinner table." },
  { label: "Dance floor", src: "/aura-events/dance-floor.jpg", alt: "A lively dance floor with colorful party lights." },
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
