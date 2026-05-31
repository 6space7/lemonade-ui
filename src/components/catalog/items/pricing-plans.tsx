import { BadgeDollarSign } from "lucide-react"

import {
  PricingPlans,
  type PricingPlan,
  type PricingReviewAvatar,
} from "@/components/lemonade/pricing-plans"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const plans: PricingPlan[] = [
  {
    name: "Basic plan",
    monthlyPrice: 10,
    annualPrice: 8,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 10 users.",
    ctaLabel: "Get started",
    ctaHref: "#basic-plan",
    ctaAriaLabel: "Start the Basic plan",
    featureHeading: "Features",
    featureIntro: "Everything in our free plan plus....",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
    ],
  },
  {
    name: "Business plan",
    monthlyPrice: 20,
    annualPrice: 17,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 20 users.",
    ctaLabel: "Get started",
    ctaHref: "#business-plan",
    ctaAriaLabel: "Start the Business plan",
    featureHeading: "Features",
    featureIntro: "Everything in Basic plus....",
    features: [
      "200+ integrations",
      "Advanced reporting and analytics",
      "Up to 20 individual users",
      "40GB individual data each user",
    ],
    badge: "Popular",
  },
  {
    name: "Enterprise plan",
    monthlyPrice: 40,
    annualPrice: 34,
    unit: "per user",
    period: "per month",
    description: "Advanced features + unlimited users.",
    ctaLabel: "Get started",
    ctaHref: "#enterprise-plan",
    ctaAriaLabel: "Contact sales for the Enterprise plan",
    featureHeading: "Features",
    featureIntro: "Everything in Business plus....",
    features: [
      "Advanced custom fields",
      "Audit log and data history",
      "Unlimited individual users",
      "Unlimited individual data",
    ],
  },
]

const logos = ["upwork", "PLAID", "splunk>", "ghost", "Square", "Wealthsimple", "Uber", "twitch"]

const avatars: PricingReviewAvatar[] = [
  { label: "Jay", initials: "J", tooltip: "Jay", color: "#c98958" },
  { label: "Noa", initials: "N", tooltip: "Noa", color: "#2d3946" },
  { label: "Rae", initials: "R", tooltip: "Rae", color: "#f0d7bf" },
  { label: "Mia", initials: "M", tooltip: "Mia", color: "#38302b" },
  { label: "Ana", initials: "A", tooltip: "Ana", color: "#e2b9a8" },
]

function PricingPlansDemo() {
  return (
    <div className="grid min-h-[42rem] w-full place-items-center overflow-hidden bg-white">
      <PricingPlans
        title="We've got a plan"
        accentTitle="that's perfect for you"
        defaultBilling="monthly"
        billingLabels={{ monthly: "Monthly billing", annual: "Annual billing" }}
        saveLabel="Save 16%"
        currency="$"
        unitLabel="per user"
        periodLabel="per month"
        ctaLabel="Get started"
        featureHeading="Features"
        plans={plans}
        avatars={avatars}
        avatarLimit={5}
        starCount={5}
        rating="5.0"
        reviewText="from 4,000+ reviews"
        logos={logos}
        onPlanSelect={(plan, billing) => console.log("Selected plan:", plan.name, billing)}
      />
    </div>
  )
}

const usageCode = `import {
  PricingPlans,
  type PricingPlan,
  type PricingReviewAvatar,
} from "@/components/lemonade-ui/pricing-plans"

const plans: PricingPlan[] = [
  {
    name: "Basic plan",
    monthlyPrice: 10,
    annualPrice: 8,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 10 users.",
    ctaLabel: "Get started",
    ctaHref: "/checkout?plan=basic",
    ctaAriaLabel: "Start the Basic plan",
    featureHeading: "Features",
    featureIntro: "Everything in our free plan plus....",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
    ],
  },
  {
    name: "Business plan",
    monthlyPrice: 20,
    annualPrice: 17,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 20 users.",
    ctaLabel: "Get started",
    ctaHref: "/checkout?plan=business",
    ctaAriaLabel: "Start the Business plan",
    featureHeading: "Features",
    featureIntro: "Everything in Basic plus....",
    features: [
      "200+ integrations",
      "Advanced reporting and analytics",
      "Up to 20 individual users",
      "40GB individual data each user",
    ],
    badge: "Popular",
  },
  {
    name: "Enterprise plan",
    monthlyPrice: 40,
    annualPrice: 34,
    unit: "per user",
    period: "per month",
    description: "Advanced features + unlimited users.",
    ctaLabel: "Get started",
    ctaHref: "/contact-sales?plan=enterprise",
    ctaAriaLabel: "Contact sales for the Enterprise plan",
    featureHeading: "Features",
    featureIntro: "Everything in Business plus....",
    features: [
      "Advanced custom fields",
      "Audit log and data history",
      "Unlimited individual users",
      "Unlimited individual data",
    ],
  },
]

const avatars: PricingReviewAvatar[] = [
  { label: "Jay", initials: "J", tooltip: "Jay", color: "#c98958" },
  { label: "Noa", initials: "N", tooltip: "Noa", color: "#2d3946" },
  { label: "Rae", initials: "R", tooltip: "Rae", color: "#f0d7bf" },
  { label: "Mia", initials: "M", tooltip: "Mia", color: "#38302b" },
  { label: "Ana", initials: "A", tooltip: "Ana", color: "#e2b9a8" },
]

const logos = ["upwork", "PLAID", "splunk>", "ghost", "Square", "Wealthsimple", "Uber", "twitch"]

export default function Demo() {
  return (
    <PricingPlans
      title="We've got a plan"
      accentTitle="that's perfect for you"
      defaultBilling="monthly"
      billingLabels={{ monthly: "Monthly billing", annual: "Annual billing" }}
      annualDiscount={0.16}
      saveLabel="Save 16%"
      currency="$"
      unitLabel="per user"
      periodLabel="per month"
      ctaLabel="Get started"
      featureHeading="Features"
      plans={plans}
      avatars={avatars}
      avatarLimit={5}
      starCount={5}
      rating="5.0"
      reviewText="from 4,000+ reviews"
      logos={logos}
      onBillingChange={(billing) => console.log("Billing:", billing)}
      onPlanSelect={(plan, billing) => console.log("Selected:", plan.name, billing)}
    />
  )
}`

export const pricingPlansCatalogItem: CatalogItem = {
  metadata: {
    id: "pricing-plans",
    title: "Pricing Plans",
    category: "Pricing Plans",
    command: `npx shadcn@latest add ${installBaseUrl}/pricing-plans.json`,
    filter: "pricing-plans",
    icon: BadgeDollarSign,
    previewClassName: "bg-white",
  },
  detail: {
    id: "pricing-plans",
    title: "Pricing Plans",
    category: "Pricing Plans",
    description:
      "An animated pricing section with billing toggles, review proof, plan cards, feature lists, and brand logos.",
    inspirationCredit: {
      label: "Pricing — Untitled UI by Jordan Hughes",
      url: "https://dribbble.com/shots/24074397-Pricing-Untitled-UI",
    },
    registryUrl: `${installBaseUrl}/pricing-plans.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "PricingPlans",
    importPath: "@/components/lemonade-ui/pricing-plans",
    previewClassName: "bg-white",
    usageCode,
  },
  Preview: PricingPlansDemo,
}
