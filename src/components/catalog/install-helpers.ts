import { type ComponentDetail, type InstallTab } from "./types"

export function getInstallCommand(registryUrl: string, tab: InstallTab) {
  switch (tab) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${registryUrl}`
    case "yarn":
      return `yarn dlx shadcn@latest add ${registryUrl}`
    case "bun":
      return `bunx shadcn@latest add ${registryUrl}`
    case "manual":
      return ""
    default:
      return `npx shadcn@latest add ${registryUrl}`
  }
}

export function getManualInstallText(detail: ComponentDetail, usageCode: string) {
  const dependencyText = detail.dependencies.length
    ? `npm install ${detail.dependencies.join(" ")}`
    : "No package dependencies."
  const registryDependencyText = detail.registryDependencies?.length
    ? `\nshadcn dependencies: ${detail.registryDependencies.join(", ")}`
    : ""

  return `1. Copy the registry source from ${detail.registryUrl}
2. Place ${detail.title} at components/lemonade-ui/${detail.id}.tsx
3. Install dependencies:
${dependencyText}${registryDependencyText}
4. Import it:
${usageCode}`
}

export function getAiPrompt({
  detail,
  installCommand,
  usageCode,
}: {
  detail: ComponentDetail
  installCommand: string
  usageCode: string
}) {
  return `Install and use Lemonade UI's ${detail.title} component in my shadcn project.

Registry item:
${detail.registryUrl}

Install command:
${installCommand}

Dependencies:
${detail.dependencies.join(", ")}${detail.registryDependencies?.length ? `; shadcn: ${detail.registryDependencies.join(", ")}` : ""}

Example how to use:
${usageCode}

Use this example as the starting point. I will customize props, content, and styling in code as needed. Make sure imports match my project aliases and keep the GSAP interaction behavior intact.`
}
