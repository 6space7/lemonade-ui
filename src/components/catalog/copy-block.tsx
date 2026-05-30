import { Check, Clipboard } from "lucide-react"

import { cn } from "@/lib/utils"

type CopyBlockProps = {
  value: string
  copied: boolean
  onCopy: () => void
  className?: string
}

export function CopyBlock({ value, copied, onCopy, className }: CopyBlockProps) {
  return (
    <div
      className={cn(
        "grid min-h-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border border-white/10 bg-white/[0.06]",
        className
      )}
    >
      <pre className="lemonade-scrollbar min-h-0 max-h-[inherit] overflow-auto whitespace-pre-wrap p-4 text-xs leading-6 text-white/82">
        <code>{value}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="grid w-11 place-items-start border-l border-white/10 p-3 text-white/54 transition-colors hover:bg-white/[0.07] hover:text-white"
        aria-label="Copy text"
      >
        {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
      </button>
    </div>
  )
}
