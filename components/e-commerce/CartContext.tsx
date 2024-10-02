'use client'
import { useContext, createContext, useState, useMemo } from 'react'

export interface cartItemType {
  productId: string
  sku: string
  quantity: number
}
export interface CartContextType {
  itemsInCart: cartItemType[]
  setCartItems: React.Dispatch<React.SetStateAction<cartItemType[]>>
}

const CartContext = createContext<CartContextType | []>([])

export const useCartContext = () => useContext(CartContext)

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [itemsInCart, setCartItems] = useState<cartItemType[]>([])

  const value = useMemo(() => ({ itemsInCart, setCartItems }), [itemsInCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
