import {
  type FilterId,
  type FilterOption,
  type InstallTab,
} from "./types"

export const filters: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "files", label: "Files" },
  { id: "buttons", label: "Buttons" },
  { id: "keyboards", label: "Keyboards" },
  { id: "ai-tools", label: "AI Tools" },
]

export const hashToFilter: Record<string, FilterId> = {
  "#all": "all",
  "#home": "all",
  "#featured": "all",
  "#files": "files",
  "#glass-folder": "files",
  "#buttons": "buttons",
  "#magnetic-button": "buttons",
  "#book-call-button": "buttons",
  "#keyboards": "keyboards",
  "#loop-pad-keyboard": "keyboards",
  "#ai-tools": "ai-tools",
  "#prompt-pad": "ai-tools",
  "#registry": "all",
  "#registry-output": "all",
}

export const filterToHash: Record<FilterId, string> = {
  all: "#all",
  files: "#files",
  buttons: "#buttons",
  keyboards: "#keyboards",
  "ai-tools": "#ai-tools",
}

export const installTabs: InstallTab[] = ["npm", "pnpm", "yarn", "bun", "manual"]
