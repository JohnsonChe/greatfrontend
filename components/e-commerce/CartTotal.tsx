import { useCartContext, CartContextType } from './contexts/CartContext'
import Link from 'next/link'
import ActiveCoupons from './ActiveCoupons'
import CouponCode from './CouponCode'

export default function CartTotal({
  cartType,
  children,
  className = ''
}: {
  cartType: 'checkout' | 'confirm-order'
  children?: React.ReactNode
  className?: string
}) {
  const { cartSubtotal, cartTotal, triggerSubmit, selectedDeliveryMethod } =
    useCartContext() as CartContextType

  const submitButton =
    cartType === 'checkout' ? (
      <Link href='/e-commerce/checkout'>
        <button className='py-4 px-[102.5px] text-white rounded-lg w-full bg-indigo-700'>
          Checkout
        </button>
      </Link>
    ) : (
      <Link href='/e-commerce/checkout/success'>
        <button
          className='py-4 px-[45px] text-white rounded-lg w-full bg-indigo-700'
          onClick={() => {
            triggerSubmit()
          }}>
          Confirm order
        </button>
      </Link>
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
