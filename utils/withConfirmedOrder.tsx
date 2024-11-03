'use client'
import { ComponentType, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { CartContextType, useCartContext } from '@components/e-commerce/contexts/CartContext'

export const withConfirmedOrder = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return function WithConfirmedOrder(props: P) {
    const { confirmedOrder } = useCartContext() as CartContextType
    useEffect(() => {
      if (!confirmedOrder) {
        redirect('/e-commerce/cart')
      }
    }, [])

    if (!confirmedOrder) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
