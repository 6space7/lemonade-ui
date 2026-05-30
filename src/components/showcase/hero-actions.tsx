"use client"

import { Code2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/lemonade/magnetic-button"

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <MagneticButton
        onClick={() => {
          document.getElementById("components")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }}
      >
        Explore components
      </MagneticButton>
      <Button
        variant="outline"
        className="h-14 rounded-lg border-[#11150f]/15 bg-white/60 px-6 text-[#11150f] hover:bg-white"
        onClick={() => {
          document.getElementById("registry")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }}
      >
        <Code2 className="size-4" />
        Source-ready
      </Button>
    </div>
  )
}
