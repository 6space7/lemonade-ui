import { Keyboard } from "lucide-react"

import { LoopPadKeyboard, type LoopPadKey } from "@/components/lemonade/loop-pad-keyboard"
import { installBaseUrl } from "@/lib/registry"

import { type CatalogItem } from "../types"

const keyRows: LoopPadKey[][] = [
  [
    { id: "esc", label: "esc" },
    { id: "q", label: "Q", hint: "1" },
    { id: "w", label: "W", hint: "2" },
    { id: "e", label: "E", hint: "3" },
    { id: "r", label: "R", hint: "4" },
    { id: "t", label: "T", hint: "5" },
    { id: "y", label: "Y", hint: "6" },
    { id: "u", label: "U", hint: "7" },
    { id: "i", label: "I", hint: "8" },
    { id: "o", label: "O", hint: "9" },
    { id: "p", label: "P", hint: "0" },
    { id: "backspace", label: "bck" },
  ],
  [
    { id: "tab", label: "tab" },
    { id: "a", label: "A" },
    { id: "s", label: "S" },
    { id: "d", label: "D" },
    { id: "f", label: "F" },
    { id: "g", label: "G" },
    { id: "h", label: "H" },
    { id: "j", label: "J" },
    { id: "k", label: "K" },
    { id: "l", label: "L" },
    { id: "quote", label: "'", hint: "\"" },
    { id: "semicolon", label: ";", hint: ":" },
  ],
  [
    { id: "shift", label: "shft" },
    { id: "z", label: "Z" },
    { id: "x", label: "X" },
    { id: "c", label: "C" },
    { id: "v", label: "V" },
    { id: "b", label: "B" },
    { id: "n", label: "N" },
    { id: "m", label: "M" },
    { id: "comma", label: ",", hint: "<" },
    { id: "period", label: ".", hint: ">" },
    { id: "up", label: "^" },
    { id: "go", label: "go" },
  ],
  [
    { id: "ctrl", label: "ctrl" },
    { id: "alt", label: "alt" },
    { id: "spark", label: "+*" },
    { id: "dot-1", label: "" },
    { id: "dot-2", label: "" },
    { id: "space", label: "", span: 2, tone: "space" },
    { id: "dot-3", label: "" },
    { id: "slash", label: "/", hint: "?" },
    { id: "left", label: "<-" },
    { id: "down", label: "dn" },
    { id: "right", label: "->" },
  ],
]

function LoopPadKeyboardDemo() {
  return (
    <div className="grid min-h-[28rem] w-full place-items-center p-6">
      <LoopPadKeyboard
        keys={keyRows}
        onKeyPress={(key) => console.log("Pressed key:", key.id)}
        onMacroPress={(key) => console.log("Pressed macro:", key)}
        onKnobTurn={(knob) => console.log("Turned knob:", knob)}
      />
    </div>
  )
}

const usageCode = `import { LoopPadKeyboard, type LoopPadKey } from "@/components/lemonade-ui/loop-pad-keyboard"

const keyRows: LoopPadKey[][] = [
  [
    { id: "esc", label: "esc" },
    { id: "q", label: "Q", hint: "1" },
    { id: "w", label: "W", hint: "2" },
    { id: "e", label: "E", hint: "3" },
    { id: "r", label: "R", hint: "4" },
    { id: "t", label: "T", hint: "5" },
    { id: "y", label: "Y", hint: "6" },
    { id: "u", label: "U", hint: "7" },
    { id: "i", label: "I", hint: "8" },
    { id: "o", label: "O", hint: "9" },
    { id: "p", label: "P", hint: "0" },
    { id: "backspace", label: "bck" },
  ],
  [
    { id: "tab", label: "tab" },
    { id: "a", label: "A" },
    { id: "s", label: "S" },
    { id: "d", label: "D" },
    { id: "f", label: "F" },
    { id: "g", label: "G" },
    { id: "h", label: "H" },
    { id: "j", label: "J" },
    { id: "k", label: "K" },
    { id: "l", label: "L" },
    { id: "quote", label: "'", hint: "\\"" },
    { id: "semicolon", label: ";", hint: ":" },
  ],
  [
    { id: "shift", label: "shft" },
    { id: "z", label: "Z" },
    { id: "x", label: "X" },
    { id: "c", label: "C" },
    { id: "v", label: "V" },
    { id: "b", label: "B" },
    { id: "n", label: "N" },
    { id: "m", label: "M" },
    { id: "comma", label: ",", hint: "<" },
    { id: "period", label: ".", hint: ">" },
    { id: "up", label: "^" },
    { id: "go", label: "go" },
  ],
  [
    { id: "ctrl", label: "ctrl" },
    { id: "alt", label: "alt" },
    { id: "spark", label: "+*" },
    { id: "dot-1", label: "" },
    { id: "dot-2", label: "" },
    { id: "space", label: "", span: 2, tone: "space" },
    { id: "dot-3", label: "" },
    { id: "slash", label: "/", hint: "?" },
    { id: "left", label: "<-" },
    { id: "down", label: "dn" },
    { id: "right", label: "->" },
  ],
]

export default function Demo() {
  return (
    <LoopPadKeyboard
      keys={keyRows}
      onKeyPress={(key) => console.log("Pressed key:", key.id)}
      onMacroPress={(key) => console.log("Pressed macro:", key)}
      onKnobTurn={(knob) => console.log("Turned knob:", knob)}
    />
  )
}`

export const loopPadKeyboardCatalogItem: CatalogItem = {
  metadata: {
    id: "loop-pad-keyboard",
    title: "Loop Pad Keyboard",
    category: "Keyboards",
    command: `npx shadcn@latest add ${installBaseUrl}/loop-pad-keyboard.json`,
    filter: "keyboards",
    icon: Keyboard,
    previewClassName: "bg-[#d8d8d5]",
  },
  detail: {
    id: "loop-pad-keyboard",
    title: "Loop Pad Keyboard",
    category: "Keyboards",
    description:
      "A configurable 40% creator keyboard with clickable keycaps, macro pads, rotating knobs, and GSAP press feedback.",
    registryUrl: `${installBaseUrl}/loop-pad-keyboard.json`,
    dependencies: ["gsap", "@gsap/react"],
    importName: "LoopPadKeyboard",
    importPath: "@/components/lemonade-ui/loop-pad-keyboard",
    previewClassName: "bg-[#d8d8d5]",
    usageCode,
  },
  Preview: LoopPadKeyboardDemo,
}
