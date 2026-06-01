import { animatedDockCatalogItem } from "./animated-dock"
import { auraEventsHeroCatalogItem } from "./aura-events-hero"
import { bookCallButtonCatalogItem } from "./book-call-button"
import { glassFolderCatalogItem } from "./glass-folder"
import { gradientCallSchedulerCatalogItem } from "./gradient-call-scheduler"
import { happyFilesCardCatalogItem } from "./happy-files-card"
import { loopPadKeyboardCatalogItem } from "./loop-pad-keyboard"
import { magneticButtonCatalogItem } from "./magnetic-button"
import { morningNoteCardCatalogItem } from "./morning-note-card"
import { pixelStatusStackCatalogItem } from "./pixel-status-stack"
import { pricingPlansCatalogItem } from "./pricing-plans"
import { projectSpotlightSliderCatalogItem } from "./project-spotlight-slider"
import { promptPadCatalogItem } from "./prompt-pad"
import { threeDButtonCatalogItem } from "./three-d-button"

import { type CatalogItem, type ComponentDetail, type ComponentKey } from "../types"

export const catalogItems = [
  glassFolderCatalogItem,
  magneticButtonCatalogItem,
  bookCallButtonCatalogItem,
  threeDButtonCatalogItem,
  gradientCallSchedulerCatalogItem,
  pixelStatusStackCatalogItem,
  animatedDockCatalogItem,
  pricingPlansCatalogItem,
  auraEventsHeroCatalogItem,
  projectSpotlightSliderCatalogItem,
  morningNoteCardCatalogItem,
  happyFilesCardCatalogItem,
  loopPadKeyboardCatalogItem,
  promptPadCatalogItem,
] satisfies CatalogItem[]

export const catalogComponents = catalogItems.map((item) => item.metadata)

export const componentDetails = catalogItems.reduce(
  (details, item) => {
    details[item.detail.id] = item.detail
    return details
  },
  {} as Record<ComponentKey, ComponentDetail>
)

export const catalogItemsById = catalogItems.reduce(
  (items, item) => {
    items[item.detail.id] = item
    return items
  },
  {} as Record<ComponentKey, CatalogItem>
)
