'use client'
import {
  useCartContext,
  CartContextType,
  ConfirmedOrder
} from '@components/e-commerce/contexts/CartContext'
import CartItemReadOnly from '@components/e-commerce/CartItemReadOnly'
import CopyToClipboard from '@components/e-commerce/CopyToClipboard'
import ActiveCoupons from '@components/e-commerce/ActiveCoupons'
import { RiArrowRightLine } from 'react-icons/ri'
import Link from 'next/link'
import { withConfirmedOrder } from '../../../../../utils/withConfirmedOrder'

function SuccessPage() {
  return (
    <div className='flex flex-col lg:flex-row gap-8 lg:items-start lg:min-h-min'>
      <CartImage />
      <ConfirmedCartSummary />
    </div>
  )
}

export default withConfirmedOrder(SuccessPage)

function CartImage() {
  // Use different image sizes
  return (
    <div className='flex-shrink-0'>
      <img
        src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/order-success-desktop.jpg'
        className='w-full lg:max-w-[592px] sm:h-[196px] md:h-[420px] lg:h-full object-cover object-[center_bottom_60%] rounded-lg'
      />
    </div>
  )
}

function ConfirmedCartSummary() {
  const { confirmedOrder } = useCartContext() as CartContextType
  const { cartItems, cartSubTotal, cartTotal, deliveryMethod } =
    (confirmedOrder as ConfirmedOrder) ?? {}

  return (
    <div className='w-full flex flex-col gap-12 flex-grow'>
      <div>
        <h1 className='text-neutral-900 text-3xl font-medium'>Your order is confirmed.</h1>
        <p className='text-neutral-600 font-light mt-4'>
          Your order is now in the queue and being processed. We&apos;ll let you know when we ship
          it out!
        </p>
      </div>
      <OrderNumber />
      <div>
        {cartItems.map((item, index) => (
          <CartItemReadOnly
            product={item}
            key={index}
            priceLabelDirectionForMobile='top'
            borderStyle='solid'
          />
        ))}
        <div className='flex flex-col gap-6 py-8'>
          <span className='flex justify-between'>
            <label>Subtotal</label>
            <label>${cartSubTotal.toFixed(2)}</label>
          </span>
          <span className='flex justify-between'>
            <label>Shipping</label>
            <label>{deliveryMethod === 'express' ? '$15.00' : 'FREE'}</label>
          </span>
          <ActiveCoupons listStyle={'text'} />
        </div>
        <span className='flex justify-between border-t border-neutral-300 py-8'>
          <label className='text-neutral-900'>Total</label>
          <label className='text-2xl font-medium'>${cartTotal.toFixed(2)}</label>
        </span>
        <span className='flex flex-col gap-8 md:flex-row'>
          <ShippingAddress />
          <Payment />
        </span>
      </div>
      <ContinueShoppingButton />
    </div>
  )
}

function ShippingAddress() {
  const { confirmedOrder } = useCartContext() as CartContextType
  return (
    <span className='flex flex-col gap-4 w-full'>
      <h4 className='text-neutral-600 text-base'>Shipping address</h4>
      <div className='flex flex-col text-neutral-600 text-sm'>
        <p>{confirmedOrder?.shippingAddressLineOne}</p>
        <p>{`${confirmedOrder?.shippingCity}, ${confirmedOrder?.shippingState} ${confirmedOrder?.shippingZip}`}</p>
        <p>{confirmedOrder?.shippingCountry}</p>
      </div>
    </span>
  )
}

function Payment() {
  const { creditCardIcon: CreditCardIcon, confirmedOrder } = useCartContext() as CartContextType
  return (
    <span className='flex flex-col gap-4 w-full'>
      <h4 className='text-neutral-600 text-base'>Payment</h4>
      <div className='flex gap-4 justify-start items-start'>
        {<CreditCardIcon className='w-[70px] h-[48px]' />}
        <span className='flex flex-col'>
          <p className='text-neutral-900 text-sm'>
            Ends with {confirmedOrder?.['cc-card'].slice(-4)}
          </p>
          <p className='text-neutral-300 text-sm'>Expires {confirmedOrder?.['cc-expiry']}</p>
        </span>
      </div>
    </span>
  )
}

function OrderNumber() {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-neutral-600'>Order Number</span>
      <CopyToClipboard text='123456789' />
    </div>
  )
}

function ContinueShoppingButton() {
  return (
    <Link href='/e-commerce/products'>
      <button className='w-full py-2.5 shadow rounded-lg flex gap-2 justify-center text-neutral-900 border border-neutral-200 hover:bg-neutral-50'>
        <label>Continue Shopping</label>
        <RiArrowRightLine className='size-6' />
      </button>
    </Link>
  )
}
