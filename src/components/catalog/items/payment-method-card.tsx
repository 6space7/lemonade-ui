import { CreditCard } from "lucide-react"

import {
  PaymentMethodCard,
  type PaymentCountryOption,
} from "@/components/lemonade/payment-method-card"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const demoCountries = [
  { id: "pl", name: "Poland", code: "PL", flagColors: ["#ffffff", "#dc2f3f"] },
  {
    id: "us",
    name: "United States",
    code: "US",
    flagColors: ["#2457c5", "#ffffff", "#d92f3b"],
    flagDirection: "vertical",
  },
  {
    id: "gb",
    name: "United Kingdom",
    code: "GB",
    flagColors: ["#173b8f", "#ffffff", "#cf142b"],
    flagDirection: "vertical",
  },
  {
    id: "de",
    name: "Germany",
    code: "DE",
    flagColors: ["#111111", "#dd0000", "#ffce00"],
  },
] satisfies PaymentCountryOption[]

function PaymentMethodCardDemo() {
  return (
    <div className="grid min-h-[42rem] w-full place-items-center bg-[#e9ebec] p-4 sm:p-8">
      <PaymentMethodCard
        amount="$10.99"
        countryOptions={demoCountries}
        defaultCountryId="pl"
        onPay={(values) => console.log("Payment values:", values)}
      />
    </div>
  )
}

const usageCode = `import {
  PaymentMethodCard,
  type PaymentCountryOption,
  type PaymentMethodValues,
} from "@/components/lemonade-ui/payment-method-card"

const paymentCopy = {
  title: "Payment Method",
  methodLabel: "Credit card",
  cardBrand: "VISA",
  nameLabel: "Name on the card",
  cardDetailsLabel: "Card details",
  billingAddressLabel: "Billing address",
  namePlaceholder: "John Smith",
  cardNumberPlaceholder: "1234 5678 9012 3456",
  expiryPlaceholder: "MM/YY",
  cvcPlaceholder: "CVC",
  addressPlaceholder: "Address",
}

const amount = "$10.99"

const countries = [
  { id: "pl", name: "Poland", code: "PL", flagColors: ["#ffffff", "#dc2f3f"] },
  {
    id: "us",
    name: "United States",
    code: "US",
    flagColors: ["#2457c5", "#ffffff", "#d92f3b"],
    flagDirection: "vertical",
  },
  {
    id: "gb",
    name: "United Kingdom",
    code: "GB",
    flagColors: ["#173b8f", "#ffffff", "#cf142b"],
    flagDirection: "vertical",
  },
] satisfies PaymentCountryOption[]

const initialValues = {
  nameOnCard: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  address: "",
} satisfies Partial<PaymentMethodValues>

export default function Demo() {
  const handlePay = (values: PaymentMethodValues) => {
    console.log("Payment values:", values)
  }

  return (
    <PaymentMethodCard
      {...paymentCopy}
      amount={amount}
      payLabel={\`Pay \${amount}\`}
      countryOptions={countries}
      defaultCountryId="pl"
      initialValues={initialValues}
      onCountryChange={(country) => console.log("Country:", country)}
      onValueChange={(values) => console.log("Draft values:", values)}
      onPay={handlePay}
    />
  )
}`

export const paymentMethodCardCatalogItem: CatalogItem = {
  metadata: {
    id: "payment-method-card",
    title: "Payment Method Card",
    category: "Forms",
    command: `npx shadcn@latest add ${installBaseUrl}/payment-method-card.json`,
    filter: "forms",
    icon: CreditCard,
    previewClassName: "bg-[#e9ebec]",
  },
  detail: {
    id: "payment-method-card",
    title: "Payment Method Card",
    category: "Forms",
    description:
      "A tactile checkout payment form with segmented card fields, billing address, country dropdown, and an animated pay action.",
    inspirationCredit: {
      label: "~ e-commerce checkout ui components ~ by solya ~",
      url: "https://dribbble.com/shots/23992568--e-commerce-checkout-ui-components",
    },
    registryUrl: `${installBaseUrl}/payment-method-card.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "PaymentMethodCard",
    importPath: "@/components/lemonade-ui/payment-method-card",
    previewClassName: "bg-[#e9ebec]",
    usageCode,
  },
  Preview: PaymentMethodCardDemo,
}
