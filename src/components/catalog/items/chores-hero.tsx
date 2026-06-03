import { Kanban } from "lucide-react"

import {
  ChoresHero,
  type ChoresHeroColumn,
  type ChoresHeroLogo,
  type ChoresHeroNavItem,
} from "@/components/lemonade/chores-hero"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const navItems: ChoresHeroNavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Blog", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
]

const trustedLogos: ChoresHeroLogo[] = [
  { label: "slack" },
  { label: "GitHub" },
  { label: "Clearbit" },
  { label: "hotjar" },
  { label: "Spotify", muted: true },
  { label: "HubSpot", muted: true },
]

const columns: ChoresHeroColumn[] = [
  {
    title: "To do",
    count: 3,
    accentColor: "#ef4444",
    tasks: [
      {
        title: "Implement Multi-Language Support",
        description: "Add the ability for users to switch between different languages.",
        date: "09 Sept - 30 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#ef4444",
        assignees: ["A", "J"],
      },
      {
        title: "Create User Authentication",
        description: "Develop a secure authentication system with session handling.",
        date: "17 Sept - 4 Oct",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        assignees: ["N", "M"],
      },
      {
        title: "Set Up SEO Meta Tags",
        description: "Implement dynamic meta tags for SEO purposes across all pages.",
        date: "21 Sept - 30 Sept",
        comments: 12,
        attachments: 3,
        checklist: "9/10",
        label: "Bug",
        accentColor: "#f59e0b",
        assignees: ["K"],
      },
    ],
  },
  {
    title: "Progress",
    count: 5,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Redesign Product Detail Page",
        description: "Revamp the detail page for better readability and engagement.",
        date: "02 Sept - 25 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#eab308",
        assignees: ["S", "A"],
      },
      {
        title: "Build Dynamic Search Functionality",
        description: "Develop a dynamic search bar with real-time suggestions.",
        date: "23 August - 4 Oct",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        assignees: ["H", "L"],
      },
      {
        title: "API Fails to Fetch Data on Slow Connections",
        description: "Optimize the API to handle slower speeds and retry states.",
        date: "21 Sept - 18 Oct",
        comments: 12,
        attachments: 3,
        checklist: "9/10",
        label: "Bug",
        accentColor: "#f59e0b",
        assignees: ["O"],
      },
    ],
  },
  {
    title: "Completed",
    count: 2,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Create Dashboard Wireframes",
        description: "Design wireframes for the dashboard and navigation flow.",
        date: "02 Sept - 05 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#22c55e",
        assignees: ["M", "C"],
      },
      {
        title: "Incorrect Error Message on Failed Login",
        description: "Update failed login messages with clearer recovery guidance.",
        date: "17 Sept - 20 Sept",
        comments: 8,
        attachments: 7,
        checklist: "3/6",
        label: "2 Labels",
        accentColor: "#ef4444",
        assignees: ["V"],
      },
    ],
  },
]

function ChoresHeroDemo() {
  return (
    <div className="w-full min-w-0 overflow-hidden bg-[#dfeaff]">
      <ChoresHero
        navItems={navItems}
        navCta={{ label: "Book a demo", href: "#book-demo" }}
        primaryCta={{ label: "Download for Mac", href: "#download" }}
        trustedLogos={trustedLogos}
        columns={columns}
      />
    </div>
  )
}

const usageCode = `import {
  ChoresHero,
  type ChoresHeroColumn,
  type ChoresHeroLogo,
  type ChoresHeroNavItem,
} from "@/components/lemonade-ui/chores-hero"

const navItems: ChoresHeroNavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
]

const trustedLogos: ChoresHeroLogo[] = [
  { label: "slack" },
  { label: "GitHub" },
  { label: "Clearbit" },
  { label: "hotjar" },
  { label: "Spotify", muted: true },
  { label: "HubSpot", muted: true },
]

const columns: ChoresHeroColumn[] = [
  {
    title: "To do",
    count: 3,
    accentColor: "#ef4444",
    tasks: [
      {
        title: "Implement Multi-Language Support",
        description: "Add the ability for users to switch between different languages.",
        date: "09 Sept - 30 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#ef4444",
        assignees: ["A", "J"],
      },
    ],
  },
  {
    title: "Progress",
    count: 5,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Redesign Product Detail Page",
        description: "Revamp the detail page for better readability and engagement.",
        date: "02 Sept - 25 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#eab308",
        assignees: ["S", "A"],
      },
    ],
  },
  {
    title: "Completed",
    count: 2,
    accentColor: "#22c55e",
    tasks: [
      {
        title: "Create Dashboard Wireframes",
        description: "Design wireframes for the dashboard and navigation flow.",
        date: "02 Sept - 05 Sept",
        comments: 5,
        attachments: 10,
        checklist: "2/5",
        label: "3 Labels",
        accentColor: "#22c55e",
        assignees: ["M", "C"],
      },
    ],
  },
]

export default function Demo() {
  return (
    <ChoresHero
      brandName="Chores"
      brandHref="/"
      navItems={navItems}
      navCta={{ label: "Book a demo", href: "/demo" }}
      trialBadge="30-day trial, no credit cards required"
      headline="Get Clarity. Get Things Done"
      description="Chores empowers you to manage tasks, projects, and teams in one place to boost productivity at any time."
      primaryCta={{ label: "Download for Mac", href: "/download" }}
      boardLabel="Tasks / Kanban Design Project"
      boardTitle="Kanban"
      boardEditedLabel="Edited 19 mins ago"
      newTaskLabel="New Task"
      sidebarPlanLabel="Trial ends in 5 days"
      trustedLabel="Trusted by leading tech companies"
      trustedLogos={trustedLogos}
      columns={columns}
    />
  )
}`

export const choresHeroCatalogItem: CatalogItem = {
  metadata: {
    id: "chores-hero",
    title: "Chores Hero",
    category: "Hero Sections",
    command: `npx shadcn@latest add ${installBaseUrl}/chores-hero.json`,
    filter: "hero-sections",
    icon: Kanban,
    previewClassName: "!place-items-stretch bg-[#dfeaff] !p-0 [&>*]:!w-full",
  },
  detail: {
    id: "chores-hero",
    title: "Chores Hero",
    category: "Hero Sections",
    description:
      "A soft SaaS hero with a pill navigation bar, clouded sky backdrop, animated CTA, detailed kanban product mockup, and trusted-logo row.",
    registryUrl: `${installBaseUrl}/chores-hero.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "ChoresHero",
    importPath: "@/components/lemonade-ui/chores-hero",
    previewClassName: "!place-items-stretch bg-[#dfeaff] !p-0 [&>*]:!w-full",
    usageCode,
  },
  Preview: ChoresHeroDemo,
}
