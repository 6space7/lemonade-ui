"use client"

import { ArrowUpRight, Check, Clipboard, X } from "lucide-react"
import { type ReactNode, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { ComponentPreview } from "./component-preview"
import { CopyBlock } from "./copy-block"
import { installTabs } from "./data"
import { getAiPrompt, getInstallCommand, getManualInstallText } from "./install-helpers"
import { type ComponentDetail, type InstallTab } from "./types"

type ComponentDetailsDialogProps = {
  detail: ComponentDetail | null
  onClose: () => void
}

export function ComponentDetailsDialog({ detail, onClose }: ComponentDetailsDialogProps) {
  const [installTab, setInstallTab] = useState<InstallTab>("npm")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    if (!detail) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [detail, onClose])

  if (!detail) {
    return null
  }

  const registryPath = new URL(detail.registryUrl).pathname
  const installCommand = getInstallCommand(detail.registryUrl, installTab)
  const usageCode = detail.usageCode
  const aiPrompt = getAiPrompt({
    detail,
    installCommand: getInstallCommand(detail.registryUrl, "npm"),
    usageCode,
  })
  const manualText = getManualInstallText(detail, usageCode)
  const installOutput = installTab === "manual" ? manualText : installCommand

  const copyText = async (value: string, key: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        copyWithFallback(value)
      }
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1400)
    } catch {
      copyWithFallback(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1400)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 p-3 backdrop-blur-xl sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="component-details-title"
        className="mx-auto grid h-[calc(100vh-1.5rem)] max-w-[92rem] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] text-white shadow-[0_40px_140px_rgba(0,0,0,0.72)] sm:h-[calc(100vh-2.5rem)] lg:grid-cols-[minmax(25rem,34rem)_1fr]"
      >
        <div className="lemonade-scrollbar overflow-y-auto border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-start gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/42">
                Components / {detail.category} / {detail.title}
              </p>
              <h2
                id="component-details-title"
                className="mt-5 text-xl font-semibold tracking-normal text-white"
              >
                {detail.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/55">{detail.description}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-white/58 transition-colors hover:bg-white/[0.09] hover:text-white"
              aria-label="Close component details"
            >
              <X className="size-4" />
            </button>
          </div>

          <DetailSection title="Dependencies">
            <div className="flex flex-wrap gap-2">
              {detail.dependencies.map((dependency) => (
                <span
                  key={dependency}
                  className="rounded-md bg-white/[0.08] px-2.5 py-1.5 text-xs font-semibold text-white/72"
                >
                  {dependency}
                </span>
              ))}
              {detail.registryDependencies?.map((dependency) => (
                <span
                  key={dependency}
                  className="rounded-md bg-[#f7f34a]/12 px-2.5 py-1.5 text-xs font-semibold text-[#f7f34a]"
                >
                  shadcn/{dependency}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Copy for AI">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyText(aiPrompt, "prompt")}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f7f34a]"
              >
                {copiedKey === "prompt" ? <Check className="size-4" /> : <Clipboard className="size-4" />}
                {copiedKey === "prompt" ? "Copied prompt" : "Copy prompt"}
              </button>
              <button
                type="button"
                onClick={() => copyText(usageCode, "usage")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/68 transition-colors hover:bg-white/[0.09] hover:text-white"
              >
                {copiedKey === "usage" ? <Check className="size-4" /> : <Clipboard className="size-4" />}
                Copy usage
              </button>
            </div>
          </DetailSection>

          <DetailSection title="Installation">
            <div className="flex flex-wrap gap-2">
              {installTabs.map((tab) => {
                const isActive = installTab === tab

                return (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setInstallTab(tab)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-colors",
                      isActive
                        ? "bg-[#f7f34a] text-[#111111]"
                        : "bg-white/[0.07] text-white/62 hover:bg-white/[0.1] hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            <CopyBlock
              className="mt-3"
              value={installOutput}
              copied={copiedKey === `install-${installTab}`}
              onCopy={() => copyText(installOutput, `install-${installTab}`)}
            />
          </DetailSection>
        </div>

        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] bg-[#0f0f0f]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-xs font-semibold text-white/72">
              Preview
            </div>
            <a
              href={registryPath}
              className="inline-flex items-center gap-1 text-xs font-semibold text-white/42 transition-colors hover:text-white"
            >
              Open JSON <ArrowUpRight className="size-3" />
            </a>
          </div>

          <div className={cn("grid min-h-0 place-items-center overflow-hidden p-6", detail.previewClassName)}>
            <ComponentPreview id={detail.id} />
          </div>

          <div className="min-h-0 border-t border-white/10 bg-[#0b0b0b] p-4">
            <p className="mb-2 text-xs font-semibold text-white/48">How to use</p>
            <CopyBlock
              className="max-h-[14rem] min-h-0"
              value={usageCode}
              copied={copiedKey === "usage-bottom"}
              onCopy={() => copyText(usageCode, "usage-bottom")}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function copyWithFallback(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.left = "-9999px"
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="mb-3 text-xs font-semibold text-white/72">{title}</h3>
      {children}
    </section>
  )
}
