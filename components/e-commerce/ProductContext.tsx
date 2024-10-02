'use client'
import { useState, useContext, createContext, useMemo } from 'react'
import {
  ProductDetailsType,
  InventoryItem,
  colors,
  image,
  size,
  info
} from '../../types/ProductDetailsType'
import { useCartContext, cartItemType, CartContextType } from './CartContext'

interface ProductContextProviderProps {
  data: ProductDetailsType
  children: React.ReactNode
}

export interface ProductContextProviderValueType {
  description: string
  name: string
  rating: number
  reviews: number
  colors: colors
  info: info[]
  sizes: size[]
  selectedColor: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  selectedSize: string
  setSize: React.Dispatch<React.SetStateAction<string>>
  selectedQuantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  selectedPicture: number
  setSelectedPicture: React.Dispatch<React.SetStateAction<number>>
  imagesBySelectedColor: image[]
  currItemListPrice: number
  currItemSalePrice: number
  currItemDiscountPercentage: number
  currentItemStock: number
  currentSelectedSku: string
  sizesInStock: size[]
  addToCartHandler: () => void
}

const ProductContext = createContext<ProductContextProviderValueType | null>(null)
export const useProductContext = () => useContext(ProductContext)

export default function ProductContextProvider({ data, children }: ProductContextProviderProps) {
  const { setCartItems } = useCartContext() as CartContextType
  const {
    product_id,
    name,
    description,
    category,
    collection,
    created_at,
    colors,
    images,
    info,
    inventory,
    priceRange,
    rating,
    reviews,
    sizes,
    sold
  } = useMemo(() => data, [data])
  const [selectedColor, setColor] = useState<string>(colors[0])
  const [selectedSize, setSize] = useState<string>(sizes[0])
  const [selectedQuantity, setQuantity] = useState<number>(1)
  const [selectedPicture, setSelectedPicture] = useState<number>(0)

  const imagesBySelectedColor = useMemo(() => {
    setSelectedPicture(0)
    return images.filter((image) => image.color === selectedColor)
  }, [selectedColor])

  const {
    list_price: currItemListPrice,
    sale_price: currItemSalePrice,
    discount_percentage: currItemDiscountPercentage,
    stock: currentItemStock,
    sku: currentSelectedSku
  } = useMemo(
    () =>
      inventory.filter(({ color, size }) => color === selectedColor && size === selectedSize)[0],
    [selectedSize, selectedColor]
  )

  const sizesInStock = useMemo(
    () =>
      inventory.reduce((inStock: size[], sku: InventoryItem) => {
        if (sku.stock > 0 && sku.color === selectedColor) {
          inStock.push(sku.size)
        }
        return inStock
      }, []),
    [inventory, selectedColor]
  )

  const addToCartHandler = () => {
    const cartItem: cartItemType = {
      productId: product_id,
      sku: currentSelectedSku,
      quantity: selectedQuantity
    }
    setCartItems((prev) => {
      const newCartList = [...prev]
      const existingCartItemIndex = newCartList.findIndex(
        (item) => item.sku === cartItem.sku && item.productId === cartItem.productId
      )

      if (existingCartItemIndex >= 0) {
        newCartList[existingCartItemIndex].quantity += cartItem.quantity
      } else {
        newCartList.push(cartItem)
      }

      return newCartList
    })
  }

  const value: ProductContextProviderValueType = useMemo(() => {
    return {
      description,
      name,
      rating,
      reviews,
      colors,
      info,
      sizes,
      selectedColor,
      setColor,
      selectedSize,
      setSize,
      selectedQuantity,
      setQuantity,
      selectedPicture,
      setSelectedPicture,
      imagesBySelectedColor,
      currItemListPrice,
      currItemSalePrice,
      currItemDiscountPercentage,
      currentItemStock,
      currentSelectedSku,
      sizesInStock,
      addToCartHandler
    }
  }, [
    description,
    name,
    rating,
    reviews,
    colors,
    info,
    sizes,
    selectedColor,
    setColor,
    selectedSize,
    setSize,
    selectedQuantity,
    setQuantity,
    selectedPicture,
    setSelectedPicture,
    imagesBySelectedColor,
    currItemListPrice,
    currItemSalePrice,
    currItemDiscountPercentage,
    currentItemStock,
    currentSelectedSku,
    sizesInStock,
    addToCartHandler
  ])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
