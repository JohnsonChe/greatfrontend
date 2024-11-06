import { useCartContext, CartContextType } from './contexts/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import ActiveCoupons from './ActiveCoupons'
import CouponCode from './CouponCode'
import { RiLockLine } from 'react-icons/ri'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

export default function CartTotal({
  cartType,
  children,
  className = ''
}: {
  cartType: 'checkout' | 'confirm-order'
  children?: React.ReactNode
  className?: string
}) {
  const [submittingOrder, setSubmittingOrder] = useState<boolean>(false)
  const { cartSubtotal, cartTotal, triggerSubmit, selectedDeliveryMethod } =
    useCartContext() as CartContextType

  const submitButton =
    cartType === 'checkout' ? (
      <Link href='/e-commerce/checkout'>
        <button className='py-4 px-[102.5px] text-white rounded-lg w-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-700'>
          Checkout
        </button>
      </Link>
    ) : (
      <button
        className={clsx(
          'py-4 px-[45px] text-white rounded-lg w-full bg-indigo-700 disabled:bg-neutral-100 disabled:text-neutral-400 flex items-center justify-center gap-1.5 hover:bg-indigo-800 active:bg-indigo-700'
        )}
        disabled={submittingOrder}
        onClick={() => {
          setSubmittingOrder(true)
          setTimeout(() => {
            triggerSubmit()
            setSubmittingOrder(false)
          }, 300)
        }}>
        {submittingOrder ? (
          <CgSpinner className='size-5 text-neutral-500 animate-spin' />
        ) : (
          <RiLockLine className={clsx('size-4 text-white')} />
        )}
        Confirm order
      </button>
    )

  return (
    <div className={'p-4 border border-neutral-200 rounded-lg max-h-fit ' + className}>
      <div className='pb-8 border-b border-neutral-300 border-dashed flex flex-col gap-[34px]'>
        <h2 className='text-2xl'>Order Summary</h2>
        <div className='flex flex-col gap-[18px]'>
          <span className='border-b border-neutral-300'>{children}</span>
          <span className='flex justify-between'>
            <label>Subtotal</label>
            <label>${cartSubtotal.toFixed(2)}</label>
          </span>
          <span className='flex justify-between'>
            <label>Shipping</label>
            <label>{selectedDeliveryMethod === 'express' ? '$15.00' : 'FREE'}</label>
          </span>
          <ActiveCoupons listStyle={cartType === 'confirm-order' ? 'text' : 'pill'} />
          {cartType === 'checkout' && <CouponCode />}
        </div>
      </div>
      <span className='flex justify-between my-8'>
        <label className='text-2xl'>Total</label>
        <label className='text-4xl font-semibold'>${cartTotal.toFixed(2)}</label>
      </span>
      {submitButton}
    </div>
  )
}
