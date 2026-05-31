import { BadgeDollarSign } from "lucide-react"

import { PricingPlans, type PricingPlan } from "@/components/lemonade/pricing-plans"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const plans: PricingPlan[] = [
  {
    name: "Basic plan",
    monthlyPrice: 10,
    description: "Basic features for up to 10 users.",
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
    description: "Basic features for up to 20 users.",
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
    description: "Advanced features + unlimited users.",
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

function PricingPlansDemo() {
  return (
    <div className="grid min-h-[42rem] w-full place-items-center overflow-hidden bg-white">
      <PricingPlans
        plans={plans}
        logos={logos}
        onPlanSelect={(plan, billing) => console.log("Selected plan:", plan.name, billing)}
      />
    </div>
  )
}

const usageCode = `import { PricingPlans, type PricingPlan } from "@/components/lemonade-ui/pricing-plans"

const plans: PricingPlan[] = [
  {
    name: "Basic plan",
    monthlyPrice: 10,
    description: "Basic features for up to 10 users.",
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
    description: "Basic features for up to 20 users.",
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
    description: "Advanced features + unlimited users.",
    featureIntro: "Everything in Business plus....",
    features: [
      "Advanced custom fields",
      "Audit log and data history",
      "Unlimited individual users",
      "Unlimited individual data",
    ],
  },
]

export default function Demo() {
  return (
    <PricingPlans
      title="We've got a plan"
      accentTitle="that's perfect for you"
      plans={plans}
      annualDiscount={0.16}
      logos={["upwork", "PLAID", "splunk>", "ghost", "Square", "Wealthsimple", "Uber", "twitch"]}
      rating="5.0"
      reviewText="from 4,000+ reviews"
      onBillingChange={(billing) => console.log("Billing:", billing)}
      onPlanSelect={(plan, billing) => console.log("Selected:", plan.name, billing)}
    />
  )
}`

export const pricingPlansCatalogItem: CatalogItem = {
  metadata: {
    id: "pricing-plans",
    title: "Pricing Plans",
    category: "Widgets",
    command: `npx shadcn@latest add ${installBaseUrl}/pricing-plans.json`,
    filter: "widgets",
    icon: BadgeDollarSign,
    previewClassName: "bg-white",
  },
  detail: {
    id: "pricing-plans",
    title: "Pricing Plans",
    category: "Widgets",
    description:
      "An animated pricing section with billing toggles, review proof, plan cards, feature lists, and brand logos.",
    registryUrl: `${installBaseUrl}/pricing-plans.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "PricingPlans",
    importPath: "@/components/lemonade-ui/pricing-plans",
    previewClassName: "bg-white",
    usageCode,
  },
  Preview: PricingPlansDemo,
}
