import { catalogItemsById } from "./items"
import { type ComponentKey } from "./types"

export function ComponentPreview({ id }: { id: ComponentKey }) {
  const Preview = catalogItemsById[id].Preview

  return <Preview />
}
