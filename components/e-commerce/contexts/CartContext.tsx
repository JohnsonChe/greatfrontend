'use client'
import { useContext, createContext, useState, useMemo, useEffect } from 'react'
import { ProductDetailsType } from '../../../types/ProductDetailsType'
import { Coupon } from '../../../utils/useCouponDiscount'
import useCouponDiscount from '../../../utils/useCouponDiscount'
import getFromLocalStorage from '../../../utils/getFromLocalStorage'

export interface CartItemType {
  product: ProductDetailsType | null
  sku: string
  quantity: number
  size: string | number | null
  color: string
}
export interface CartContextType {
  itemsInCart: CartItemType[]
  couponError: unknown
  cartSubtotal: number
  cartTotal: number
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
  removeCartItem: (sku: string) => void
  updateCartItemQuantity: (sku: string, quantity: number) => void
  coupons: Coupon[]
  checkCoupon: (coupon: string) => void
  removeCoupon: (couponCode: string) => void
  triggerSubmit: () => void
  setTriggerSubmit: React.Dispatch<React.SetStateAction<() => void>>
  selectedDeliveryMethod: 'standard' | 'express'
  setDeliveryMethod: React.Dispatch<React.SetStateAction<'standard' | 'express'>>
}

export interface LocalStorageCart {
  cartItems: CartItemType[]
  coupons: Coupon[]
}

const CartContext = createContext<CartContextType | []>([])

export const useCartContext = () => useContext(CartContext)

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { fetchCoupon, error: couponError } = useCouponDiscount()
  const [localStorageCartItems, setLocalStorageCartItems] = useState<LocalStorageCart | null>(null)
  const [itemsInCart, setCartItems] = useState<CartItemType[]>(
    localStorageCartItems?.cartItems || []
  )
  const [coupons, setCoupons] = useState<Coupon[]>(localStorageCartItems?.coupons || [])
  const [triggerSubmit, setTriggerSubmit] = useState<() => void>(() => {})
  const [selectedDeliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard')

  const cartSubtotal = itemsInCart.reduce((total, item) => {
    const product = item.product?.inventory.find((inventoryItem) => item.sku === inventoryItem.sku)
    if (product) {
      total += (product?.sale_price || product?.list_price) * item.quantity
    }
    return total
  }, 0)
  const cartTotal =
    coupons.reduce((total, coupon) => {
      if (coupon.discount_percentage) {
        const discountAmount = (total * coupon.discount_percentage) / 100
        return (total -= discountAmount)
      }

      return (total -= coupon.discount_amount)
    }, cartSubtotal) + (selectedDeliveryMethod === 'express' ? 15 : 0)

  const checkCoupon = async (coupon: string) => {
    if (coupons.some((couponCode) => couponCode.coupon_code === coupon)) {
      return
    }

    const fetchedCoupon = await fetchCoupon(coupon)
    if (!fetchedCoupon) {
      return
    }
    setCoupons((prev) => {
      const newCoupons = [...prev, fetchedCoupon]
      localStorage.setItem('cart', JSON.stringify({ cartItems: itemsInCart, coupons: newCoupons }))
      return newCoupons
    })
  }

  const removeCoupon = (couponCode: string) => {
    setCoupons((prev) => {
      const existingCoupons = [...prev]
      const pendingCouponChange = existingCoupons.filter(
        (coupon) => coupon.coupon_code !== couponCode
      )

      localStorage.setItem(
        'cart',
        JSON.stringify({ cartItems: [...itemsInCart], coupons: pendingCouponChange })
      )
      return pendingCouponChange
    })
  }

  const removeCartItem = (sku: string) => {
    setCartItems((prev: CartItemType[]) => {
      const existingCart = [...prev]
      const newCart = existingCart.filter((cartItem) => sku !== cartItem.sku)

      localStorage.setItem('cart', JSON.stringify({ cartItems: newCart, coupons }))
      return newCart
    })
  }

  const updateCartItemQuantity = (sku: string, quantity: number) => {
    setCartItems((prev: CartItemType[]) => {
      const cart = [...prev]
      const cartItemPendingUpdate = cart.find((item) => item.sku === sku)

      if (cartItemPendingUpdate) {
        cartItemPendingUpdate.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify({ cartItems: cart, coupons }))
      return cart
    })
  }

  useEffect(() => {
    const storedCart = getFromLocalStorage('cart')
    console.log('storedCart', storedCart)
    if (!storedCart) {
      setLocalStorageCartItems(null)
      return
    }

    try {
      const parsedCart = JSON.parse(storedCart) as LocalStorageCart
      setLocalStorageCartItems(parsedCart)
      setCartItems(parsedCart.cartItems || [])
      setCoupons(parsedCart.coupons || [])
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error)
      setLocalStorageCartItems(null)
    }
  }, [])

  const value: CartContextType = useMemo(
    () => ({
      itemsInCart,
      couponError,
      cartSubtotal,
      cartTotal,
      setCartItems,
      removeCartItem,
      updateCartItemQuantity,
      coupons,
      checkCoupon,
      removeCoupon,
      triggerSubmit,
      setTriggerSubmit,
      selectedDeliveryMethod,
      setDeliveryMethod
    }),
    [
      itemsInCart,
      couponError,
      cartSubtotal,
      cartTotal,
      setCartItems,
      removeCartItem,
      updateCartItemQuantity,
      coupons,
      checkCoupon,
      removeCoupon,
      triggerSubmit,
      setTriggerSubmit,
      selectedDeliveryMethod,
      setDeliveryMethod
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
