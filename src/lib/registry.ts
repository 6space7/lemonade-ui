import {
  Activity,
  AtSign,
  BadgeCheck,
  BadgeDollarSign,
  CalendarClock,
  CircleDotDashed,
  CreditCard,
  Eclipse,
  FolderHeart,
  FolderOpen,
  Images,
  Kanban,
  Keyboard,
  Languages,
  ListTodo,
  MousePointer2,
  PanelBottom,
  PhoneCall,
  Sparkles,
  SunMedium,
} from "lucide-react"

export const siteUrl = "https://www.lemonadeui.com"
export const installBaseUrl = `${siteUrl}/r`

export const components = [
  {
    name: "glass-folder",
    title: "Glass Folder",
    description:
      "A frosted resource folder that opens on hover to reveal configurable link or note cards.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/glass-folder.json`,
    icon: FolderOpen,
  },
  {
    name: "magnetic-button",
    title: "Magnetic Button",
    description:
      "An elastic call-to-action that bends toward the cursor and snaps back with GSAP.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/magnetic-button.json`,
    icon: MousePointer2,
  },
  {
    name: "animated-button",
    title: "Animated Button",
    description:
      "A polished CTA with cursor tilt, liquid fill, animated label swap, completion burst, and configurable colors.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/animated-button.json`,
    icon: Sparkles,
  },
  {
    name: "book-call-button",
    title: "Book Call Button",
    description:
      "A slide-to-book CTA with a draggable neon handle that completes into a full call state.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/book-call-button.json`,
    icon: PhoneCall,
  },
  {
    name: "three-d-button",
    title: "3D Button",
    description:
      "A glossy 3D slide button with a draggable raised cap and configurable completion messages.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/three-d-button.json`,
    icon: CircleDotDashed,
  },
  {
    name: "gradient-call-scheduler",
    title: "Gradient Call Scheduler",
    description:
      "A soft duration selector paired with an animated gradient call-to-action for booking flows.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/gradient-call-scheduler.json`,
    icon: CalendarClock,
  },
  {
    name: "payment-method-card",
    title: "Payment Method Card",
    description:
      "A tactile checkout payment form with segmented card fields, billing address, country dropdown, and an animated pay action.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/payment-method-card.json`,
    icon: CreditCard,
  },
  {
    name: "pixel-status-stack",
    title: "Pixel Status Stack",
    description:
      "A stack of soft status feedback rows with pixel faces, selectable states, and GSAP hover feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/pixel-status-stack.json`,
    icon: Activity,
  },
  {
    name: "animated-dock",
    title: "Animated Dock",
    description:
      "A macOS-style app dock with pointer magnification, hover labels, active selection, and GSAP bounce feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/animated-dock.json`,
    icon: PanelBottom,
  },
  {
    name: "pricing-plans",
    title: "Pricing Plans",
    description:
      "An animated pricing section with billing toggles, review proof, plan cards, feature lists, and brand logos.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/pricing-plans.json`,
    icon: BadgeDollarSign,
  },
  {
    name: "aura-events-hero",
    title: "Aura Events Hero",
    description:
      "A cinematic event landing hero with social proof, massive serif headline, CTA controls, logo marquee, and animated event cards.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/aura-events-hero.json`,
    icon: Sparkles,
  },
  {
    name: "chores-hero",
    title: "Chores Hero",
    description:
      "A soft SaaS hero with a pill navigation bar, clouded sky backdrop, animated CTA, detailed kanban product mockup, and trusted-logo row.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/chores-hero.json`,
    icon: Kanban,
  },
  {
    name: "project-spotlight-slider",
    title: "Project Spotlight Slider",
    description:
      "A full-bleed editorial project slider with cinematic image transitions, an expandable glass control pill, avatars, and configurable project links.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/project-spotlight-slider.json`,
    icon: Images,
  },
  {
    name: "kinetic-contact-section",
    title: "Kinetic Contact Section",
    description:
      "A tactile contact block with cursor-reactive elastic dividers, bold email typography, animated address details, and a sliding phone capsule.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/kinetic-contact-section.json`,
    icon: AtSign,
  },
  {
    name: "morning-note-card",
    title: "Morning Note Card",
    description:
      "A colorful morning card with a time header and a floating note that cycles through messages on click.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/morning-note-card.json`,
    icon: SunMedium,
  },
  {
    name: "happy-files-card",
    title: "Happy Files Card",
    description:
      "A soft folder stats card with a gradient file icon, menu affordance, and animated stat feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/happy-files-card.json`,
    icon: FolderHeart,
  },
  {
    name: "loop-pad-keyboard",
    title: "Loop Pad Keyboard",
    description:
      "A configurable 40% creator keyboard with clickable keycaps, macro pads, rotating knobs, and GSAP press feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/loop-pad-keyboard.json`,
    icon: Keyboard,
  },
  {
    name: "prompt-pad",
    title: "Prompt Pad",
    description:
      "A retro hardware prompt keypad with a glowing LCD, language presets, tone buttons, and GSAP press feedback.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/prompt-pad.json`,
    icon: Languages,
  },
  {
    name: "autopilot-tasks",
    title: "Autopilot Tasks",
    description:
      "A frosted desktop task board with create controls, switchable folders, sidebar tasks that drag into folders, and a compact filter popover.",
    status: "registry:component",
    command: `npx shadcn@latest add ${installBaseUrl}/autopilot-tasks.json`,
    icon: ListTodo,
  },
]

export const principles = [
  {
    title: "Registry-native",
    description:
      "Each showcase component maps to a shadcn registry item, so preview and install output share source files.",
    icon: BadgeCheck,
  },
  {
    title: "GSAP-first motion",
    description:
      "The components use GSAP and React-safe cleanup patterns for hover feedback, paper popover, and reset motion.",
    icon: Eclipse,
  },
  {
    title: "Accessible by default",
    description:
      "Semantic markup, focus behavior, and reduced-motion handling stay intact.",
    icon: MousePointer2,
  },
]
