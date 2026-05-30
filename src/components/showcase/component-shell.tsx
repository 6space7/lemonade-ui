import { type ReactNode } from "react"
import { Terminal } from "lucide-react"

import { cn } from "@/lib/utils"

type ComponentShellProps = {
  eyebrow: string
  title: string
  description: string
  command: string
  children: ReactNode
  className?: string
}

export function ComponentShell({
  eyebrow,
  title,
  description,
  command,
  children,
  className,
}: ComponentShellProps) {
  return (
    <section
      className={cn(
        "grid gap-5 border-t border-[#1c2118]/10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8",
        className
      )}
    >
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#708152]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#11150f]">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#566148]">
            {description}
          </p>
        </div>
        <div className="flex min-h-12 items-center gap-3 overflow-hidden rounded-md border border-[#1f2718]/10 bg-[#11150f] px-4 text-sm text-[#efff9f]">
          <Terminal className="size-4 shrink-0" />
          <code className="truncate text-xs text-[#efff9f]/86">{command}</code>
        </div>
      </div>
      <div className="min-h-72">{children}</div>
    </section>
  )
}
