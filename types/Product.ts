export type ColorKey = 'black' | 'orange' | 'beige' | 'yellow' | 'blue' | 'green' | 'white' | 'brown';

export type ColorMap = Record<string, string>;

export type Product = {
    category: {
      catergory_id?: string
      name?: string
      created_at?: string
    }
    collection: {
      collection_id?: string
      name?: string
      description?: string
      image_url: string
    }
    colors?: ColorKey[]
    created_at?: string
    description?: string
    images: { color?: string; image_url?: string }[]
    inventory: {
      color?: string
      discount?: string | null
      discount_percentage?: number | null
      list_price?: number
      sale_price?: number
      size?: number | string | null
      sku?: string
      sold?: number
      stock?: number
    }[]
    name?: string
    priceRange?: { highest: number; lowest: number }
    product_id?: string
    rating?: number
    reviews?: number
    sizes?: number[]
    sold?: number
  }