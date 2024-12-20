'use client'
import { useState, useContext, createContext, useMemo } from 'react'
import {
  ProductDetailsType,
  InventoryItem,
  colors,
  image,
  size,
  info
} from '../../../types/ProductDetailsType'
import { useCartContext, CartItemType, CartContextType } from './CartContext'
import { useToast } from './ToastContext'
interface ProductContextProviderProps {
  data: ProductDetailsType | null
  children: React.ReactNode
}

export interface ProductContextProviderValueType {
  productId: string
  description: string
  name: string
  rating: number
  reviews: number
  colors: colors
  colorsInStock: string[]
  info: info[]
  sizes: size[] | null
  selectedColor: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  selectedSize: string | number | null
  setSize: React.Dispatch<React.SetStateAction<string | number | null>>
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
    product_id: productId,
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
  } = useMemo(() => data!, [data])
  const [selectedColor, setColor] = useState<string>(colors[0])
  const [selectedSize, setSize] = useState<string | number | null>(sizes[0] || null)
  const [selectedQuantity, setQuantity] = useState<number>(1)
  const [selectedPicture, setSelectedPicture] = useState<number>(0)

  const imagesBySelectedColor = useMemo(() => {
    setSelectedPicture(0)
    return images.filter((image) => image.color === selectedColor)
  }, [selectedColor, images])

  const {
    list_price: currItemListPrice,
    sale_price: currItemSalePrice,
    discount_percentage: currItemDiscountPercentage,
    stock: currentItemStock,
    sku: currentSelectedSku
  } = useMemo(
    () =>
      inventory.filter(({ color, size }) => color === selectedColor && size === selectedSize)[0],
    [selectedSize, selectedColor, inventory]
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

  const colorsInStock = useMemo(
    () =>
      inventory.reduce((colorsInStock: colors, sku: InventoryItem) => {
        if (sku.size === selectedSize && sku.stock > 0) {
          colorsInStock.push(sku.color)
        }
        return colorsInStock
      }, []),
    [selectedSize, inventory]
  )
  const toast = useToast()
  const addToCartHandler = () => {
    const cartItem: CartItemType = {
      product: data,
      sku: currentSelectedSku,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedColor
    }
    setCartItems((prev) => {
      const newCartList = [...prev]
      const existingCartItemIndex = newCartList.findIndex(
        (item) =>
          item.sku === cartItem.sku && item.product?.product_id === cartItem?.product?.product_id
      )

      if (existingCartItemIndex >= 0) {
        newCartList[existingCartItemIndex].quantity += cartItem.quantity
      } else {
        newCartList.push(cartItem)
      }
      localStorage.setItem('cart', JSON.stringify(newCartList))
      return newCartList
    })
    toast.success('Added to cart!')
  }

  const value: ProductContextProviderValueType = useMemo(() => {
    return {
      productId,
      description,
      name,
      rating,
      reviews,
      colors,
      colorsInStock,
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
    productId,
    description,
    name,
    rating,
    reviews,
    colors,
    colorsInStock,
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
