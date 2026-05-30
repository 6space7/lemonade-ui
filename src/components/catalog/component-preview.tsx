import { GlassFolder } from "@/components/lemonade/glass-folder"
import { MagneticButton } from "@/components/lemonade/magnetic-button"
import { PromptPad } from "@/components/lemonade/prompt-pad"

import { glassFolderShowcaseItems, promptPadShowcaseKeys } from "./data"
import { type ComponentKey } from "./types"

export function ComponentPreview({ id }: { id: ComponentKey }) {
  if (id === "glass-folder") {
    return <GlassFolder folderLabel="Resources" items={glassFolderShowcaseItems} />
  }

  if (id === "prompt-pad") {
    return (
      <PromptPad
        screenPrompt="Correct my English and make my language more polite"
        modeLabel="P2"
        statusLabel="0"
        keys={promptPadShowcaseKeys}
        defaultActiveKeyId="english"
        onKeyChange={(key) => console.log("Selected prompt:", key.prompt)}
      />
    )
  }

  return (
    <div className="grid min-h-[28rem] place-items-center">
      <MagneticButton intensity={0.5}>Launch motion</MagneticButton>
    </div>
  )
}
