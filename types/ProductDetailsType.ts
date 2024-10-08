export interface ProductDetailsType {
  product_id: string
  name: string
  description: string
  category: category
  collection: collection
  created_at: string
  colors: colors
  images: image[]
  info: info[]
  inventory: InventoryItem[]
  priceRange: PriceRange
  rating: number
  reviews: number
  sizes: size[]
  sold: number
}

export type category = {
  collection_id: string
  name: string
  created_at: string
}

export type collection = {
  collection_id: string
  name: string
  description: string
  image_url: string
  created_at: string
}

export type colors = string[]

export type image = {
  color: string
  image_url: string
}

export type info = {
  title: string
  description: description
}

export type description = string[]

export type InventoryItem = {
  sku: string
  color: string
  size: size
  list_price: number
  discount: Boolean | null
  discount_percentage: number
  sale_price: number
  sold: number,
  stock: number
}

export type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number

export type PriceRange = {
  highest: number
  lowest: number
}