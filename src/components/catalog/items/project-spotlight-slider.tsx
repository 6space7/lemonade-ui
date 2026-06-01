import { Images } from "lucide-react"

import {
  ProjectSpotlightSlider,
  type ProjectSpotlightItem,
} from "@/components/lemonade/project-spotlight-slider"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const projects: ProjectSpotlightItem[] = [
  {
    id: "wired",
    title: "Wired",
    eyebrow: "Project",
    href: "#wired",
    imageSrc: "/project-spotlight/wired.jpg",
    imageAlt: "Fashion editorial portrait with a lime sweater.",
    objectPosition: "50% 34%",
    accentColor: "#c9f230",
  },
  {
    id: "niek-roosen",
    title: "Niek Roosen",
    eyebrow: "Project",
    href: "#niek-roosen",
    imageSrc: "/project-spotlight/niek-roosen.jpg",
    imageAlt: "Fashion portrait of a person wearing sunglasses.",
    objectPosition: "50% 35%",
    accentColor: "#d86b4e",
  },
  {
    id: "nova",
    title: "Nova",
    eyebrow: "Project",
    href: "#nova",
    imageSrc: "/project-spotlight/nova.jpg",
    imageAlt: "Close-up fashion portrait with a yellow sweater.",
    objectPosition: "50% 42%",
    accentColor: "#f1dc32",
  },
]

function ProjectSpotlightSliderDemo() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#111111]">
      <ProjectSpotlightSlider
        projects={projects}
        initialIndex={0}
        labels={{
          project: "Project",
          previous: "Previous project",
          next: "Next project",
          expand: "Expand project controls",
        }}
        onProjectChange={(project) => console.log("Project:", project.title)}
        onProjectSelect={(project) => console.log("Open project:", project.title)}
      />
    </div>
  )
}

const usageCode = `import {
  ProjectSpotlightSlider,
  type ProjectSpotlightItem,
} from "@/components/lemonade-ui/project-spotlight-slider"

const projects: ProjectSpotlightItem[] = [
  {
    id: "wired",
    title: "Wired",
    eyebrow: "Project",
    href: "/work/wired",
    imageSrc: "/projects/wired.jpg",
    imageAlt: "Fashion editorial portrait for the Wired project.",
    thumbnailSrc: "/projects/wired-thumb.jpg",
    objectPosition: "50% 34%",
    accentColor: "#c9f230",
  },
  {
    id: "niek-roosen",
    title: "Niek Roosen",
    eyebrow: "Project",
    href: "/work/niek-roosen",
    imageSrc: "/projects/niek-roosen.jpg",
    imageAlt: "Portrait for the Niek Roosen project.",
    thumbnailSrc: "/projects/niek-roosen-thumb.jpg",
    objectPosition: "50% 35%",
    accentColor: "#d86b4e",
  },
]

export default function Demo() {
  return (
    <ProjectSpotlightSlider
      projects={projects}
      initialIndex={0}
      expandOnHover
      labels={{
        project: "Project",
        previous: "Previous project",
        next: "Next project",
        expand: "Expand project controls",
      }}
      onProjectChange={(project, index) => console.log("Current:", index, project.title)}
      onProjectSelect={(project) => console.log("Selected:", project.href)}
    />
  )
}`

export const projectSpotlightSliderCatalogItem: CatalogItem = {
  metadata: {
    id: "project-spotlight-slider",
    title: "Project Spotlight Slider",
    category: "Sliders",
    command: `npx shadcn@latest add ${installBaseUrl}/project-spotlight-slider.json`,
    filter: "sliders",
    icon: Images,
    previewClassName: "!place-items-stretch bg-[#111111] !p-0 [&>*]:!w-full",
  },
  detail: {
    id: "project-spotlight-slider",
    title: "Project Spotlight Slider",
    category: "Sliders",
    description:
      "A full-bleed editorial project slider with cinematic image transitions, an expandable glass control pill, avatars, and configurable project links.",
    inspirationCredit: {
      label: "Ottografie",
      url: "https://www.ottografie.nl/",
    },
    registryUrl: `${installBaseUrl}/project-spotlight-slider.json`,
    dependencies: ["gsap", "@gsap/react", "lucide-react"],
    importName: "ProjectSpotlightSlider",
    importPath: "@/components/lemonade-ui/project-spotlight-slider",
    previewClassName: "!place-items-stretch bg-[#111111] !p-0 [&>*]:!w-full",
    usageCode,
  },
  Preview: ProjectSpotlightSliderDemo,
}
