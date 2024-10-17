import { InventoryItem } from '../types/ProductDetailsType'
import { colors } from '../types/ProductDetailsType'

export default function getColorsInStock(inventory: InventoryItem[]) {
  return inventory.reduce((colorsInStock: colors, sku: InventoryItem) => {
    if (sku.stock > 0) {
      colorsInStock.push(sku.color)
    }
    return colorsInStock
  }, [])
}
