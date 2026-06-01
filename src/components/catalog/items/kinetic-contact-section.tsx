import { AtSign } from "lucide-react"

import { KineticContactSection } from "@/components/lemonade/kinetic-contact-section"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

function KineticContactSectionDemo() {
  return (
    <div className="w-full overflow-hidden bg-[#f8f8f4]">
      <KineticContactSection
        email="hello@example.com"
        emailHref="mailto:hello@example.com"
        addressLines={["123 Example Ave.", "Placeholder City, ST 00000"]}
        suite="#000"
        phone="000-000-0000"
        phoneHref="tel:+10000000000"
        alternatePhone="000-000-0000"
        onEmailClick={() => console.log("Email clicked")}
        onPhoneClick={() => console.log("Phone clicked")}
      />
    </div>
  )
}

const usageCode = `import { KineticContactSection } from "@/components/lemonade-ui/kinetic-contact-section"

export default function Demo() {
  return (
    <KineticContactSection
      email="hello@example.com"
      emailHref="mailto:hello@example.com"
      addressLines={["123 Example Ave.", "Placeholder City, ST 00000"]}
      suite="#000"
      phone="000-000-0000"
      phoneHref="tel:+10000000000"
      alternatePhone="000-000-0000"
      labels={{
        email: "Email",
        address: "Address",
        phone: "Phone",
        copyEmail: "Copy email",
      }}
      onEmailClick={() => console.log("Email clicked")}
      onPhoneClick={() => console.log("Phone clicked")}
    />
  )
}`

export const kineticContactSectionCatalogItem: CatalogItem = {
  metadata: {
    id: "kinetic-contact-section",
    title: "Kinetic Contact Section",
    category: "Contact Sections",
    command: `npx shadcn@latest add ${installBaseUrl}/kinetic-contact-section.json`,
    filter: "contact-sections",
    icon: AtSign,
    previewClassName: "!place-items-stretch bg-[#f8f8f4] !p-0 [&>*]:!w-full",
  },
  detail: {
    id: "kinetic-contact-section",
    title: "Kinetic Contact Section",
    category: "Contact Sections",
    description:
      "A tactile contact block with cursor-reactive elastic dividers, bold email typography, animated address details, and a sliding phone capsule.",
    registryUrl: `${installBaseUrl}/kinetic-contact-section.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "KineticContactSection",
    importPath: "@/components/lemonade-ui/kinetic-contact-section",
    inspirationCredit: {
      label: "Kffein contact page design credit",
      url: "https://kffein.com/en/contact/",
    },
    previewClassName: "!place-items-stretch bg-[#f8f8f4] !p-0 [&>*]:!w-full",
    usageCode,
  },
  Preview: KineticContactSectionDemo,
}
