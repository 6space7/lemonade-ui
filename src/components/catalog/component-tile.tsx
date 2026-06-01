import { ArrowUpRight } from "lucide-react"
import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { type CatalogComponent } from "./types"

type ComponentTileProps = CatalogComponent & {
  className?: string
  onOpenDetails: () => void
  children: ReactNode
}

export function ComponentTile({
  id,
  title,
  category,
  command,
  icon: Icon,
  previewClassName,
  className,
  onOpenDetails,
  children,
}: ComponentTileProps) {
  return (
    <article
      id={id}
      data-card={id}
      className={cn(
        "group min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#121212] shadow-[0_30px_90px_rgba(0,0,0,0.22)]",
        className
      )}
    >
      <div className="flex min-h-16 items-center gap-3 border-b border-white/10 px-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-[#f7f34a]">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold tracking-normal text-white">{title}</h2>
          <p className="text-xs font-medium text-white/38">{category}</p>
        </div>
        <button
          type="button"
          onClick={onOpenDetails}
          className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-white/58 transition-colors hover:bg-white/[0.09] hover:text-white"
          aria-label={`${title} registry item`}
        >
          <ArrowUpRight className="size-4" />
        </button>
      </div>
      <div className={cn("grid min-h-[30rem] min-w-0 place-items-center", previewClassName)}>{children}</div>
      <div className="border-t border-white/10 bg-[#101010] px-4 py-3">
        <code className="block truncate text-xs text-[#d8ff6a]/76">{command}</code>
      </div>
    </article>
  )
}
