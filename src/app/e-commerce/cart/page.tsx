'use client'
import {
  useCartContext,
  CartContextType,
  CartItemType
} from '@components/e-commerce/contexts/CartContext'
import { InventoryItem, image } from '../../../../types/ProductDetailsType'
import QuantitySelection from '@components/e-commerce/QuantitySelection'
import EmptyShoppingCart from '@components/e-commerce/pages/EmptyShoppingCart'
import { useEffect, useState } from 'react'
import Price from '@components/e-commerce/Price'
import { RiCouponLine, RiCloseLine } from 'react-icons/ri'
import Link from 'next/link'
import Modal from '@components/e-commerce/Modal'
import { createPortal } from 'react-dom'

export default function Cart() {
  const { itemsInCart, removeCartItem } = useCartContext() as CartContextType

  if (itemsInCart.length === 0) {
    return <EmptyShoppingCart />
  }

  return (
    <>
      <h1 className='text-3xl md:text-5xl text-neutral-900'>Shopping Cart</h1>
      <div className='flex flex-col xs:gap-8 lg:flex-row lg:gap-8 lg:mt-8'>
        <div className='mt-8 lg:mt-0'>
          {itemsInCart.map((item, index) => (
            <CartItem product={item} removeProduct={removeCartItem} key={index} />
          ))}
        </div>
        <CartTotal />
      </div>
    </>
  )
}

function CartItem({
  product,
  removeProduct
}: {
  product: CartItemType
  removeProduct: (sku: string) => void
}) {
  const { updateCartItemQuantity } = useCartContext() as CartContextType
  const { product: productDetails, sku, quantity, color, size } = product
  const [cartItemCount, setCartItemCount] = useState(quantity)
  const { image_url: productImageUrl }: image =
    productDetails?.images.find((image) => image.color === color) || productDetails?.images[0]!
  const colorCapitalized = color[0].toUpperCase() + color.slice(1, color.length)
  const {
    discount,
    discount_percentage,
    sale_price: salePrice,
    list_price: listPrice,
    stock
  }: InventoryItem = productDetails?.inventory.find((item) => item.sku === sku)!
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const colorStringMap: Record<string, string> = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
  }
  useEffect(() => {
    updateCartItemQuantity(sku, cartItemCount)
  }, [cartItemCount])

  const renderTitleTag = () => <span className='text-lg font-semibold'>Confirm Item Removal</span>
  const renderConfirmModal = (sku: string) => (
    <>
      <Modal
        setShowModal={setShowConfirmModal}
        titleTag={renderTitleTag()}
        className='xs:w-full sm:w-[343px]'>
        <div className='flex flex-col xs:justify-start justify-center items-center px-6'>
          <p className='text-neutral-600 mt-1'>
            Are you sure you want to remove this item from your shopping cart?
          </p>
          <div className='flex gap-3 mt-8'>
            <button
              className='py-2.5 px-[45.25px] shadow rounded-lg'
              onClick={() => setShowConfirmModal(false)}>
              Cancel
            </button>
            <button
              className='bg-indigo-700 text-white py-2.5 px-[57.75px] rounded-lg'
              onClick={() => removeProduct(sku)}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  )

  return (
    <div className='flex flex-col md:flex-row xs:gap-4 md:gap-8 first:pt-0 py-8 border-b border-dashed border-neutral-300 last:border-none'>
      <div>
        <Link href={`/e-commerce/products/${productDetails?.product_id}`}>
          <img
            src={productImageUrl}
            alt='product image'
            className={
              'min-w-full md:min-w-[280px] lg:min-w-[200px] xl:min-w-[280px] h-[200px] object-cover rounded-lg'
            }
          />
        </Link>
      </div>
      <div>
        <div className='flex flex-col gap-4'>
          <Link href={'/e-commerce/products/' + productDetails?.product_id}>
            <span className='text-2xl text-neutral-900'>{productDetails?.name}</span>
          </Link>
          <span className='text-neutral-600'>
            {size ? `${colorCapitalized} • ${colorStringMap[size] || size}` : `${colorCapitalized}`}
          </span>
          <p className='text-neutral-600'>{productDetails?.description}</p>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <QuantitySelection
                selectedQuantity={cartItemCount}
                currentItemStock={stock}
                setQuantity={setCartItemCount}
                showTitle={false}
              />
              <span
                onClick={() => setShowConfirmModal(true)}
                className='text-neutral-600 cursor-pointer hover:text-neutral-900'>
                Remove
              </span>
            </div>
            <Price
              discountPercentage={discount_percentage}
              listPrice={listPrice}
              salePrice={salePrice}
              size={18}
            />
          </div>
        </div>
      </div>
      {showConfirmModal && createPortal(renderConfirmModal(sku), document.body)}
    </div>
  )
}

function CartTotal() {
  const { cartSubtotal, cartTotal } = useCartContext() as CartContextType
  return (
    <div className='p-4 border border-neutral-200 rounded-lg max-h-fit'>
      <div className='pb-8 border-b border-neutral-300 border-dashed flex flex-col gap-[34px]'>
        <h2 className='text-2xl'>Order Summary</h2>
        <div className='flex flex-col gap-[18px]'>
          <span className='flex justify-between'>
            <label>Subtotal</label>
            <label>${cartSubtotal}</label>
          </span>
          <span className='flex justify-between'>
            <label>Shipping</label>
            <label>FREE</label>
          </span>
          <ActiveCoupons />
          <CouponCode />
        </div>
      </div>
      <span className='flex justify-between my-8'>
        <label className='text-2xl'>Total</label>
        <label className='text-4xl font-semibold'>${cartTotal.toFixed(2)}</label>
      </span>
      <button className='py-4 px-[102.5px] text-white rounded-lg w-full bg-indigo-700'>
        Checkout
      </button>
    </div>
  )
}

function ActiveCoupons() {
  const { coupons } = useCartContext() as CartContextType

  return (
    <>
      {coupons.length > 0 &&
        coupons.map(({ coupon_code, discount_amount, discount_percentage }, index) => {
          return (
            <span className='flex justify-between' key={index}>
              <label className='px-2.5 py-1 border border-indigo-200 bg-indigo-50 rounded-full font-light text-indigo-700'>
                {coupon_code}
              </label>
              {discount_amount && <label>- ${discount_amount?.toFixed(2)}</label>}
              {discount_percentage && <label>- {discount_percentage}%</label>}
            </span>
          )
        })}
    </>
  )
}

function CouponCode() {
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false)
  const [couponCode, setCouponCode] = useState<string>('')
  const { checkCoupon, coupons, removeCoupon, couponError } = useCartContext() as CartContextType

  const handleCouponSumbit = () => {
    checkCoupon(couponCode)
    setCouponCode('')
  }

  const renderError = () => <span className='text-red-600 mt-1.5'>{couponError as string}</span>

  if (showCouponInput) {
    return (
      <span>
        {coupons.length > 0}
        <label className='font-light text-sm text-neutral-700'>Coupon code</label>
        <span className='flex items-center lg:justify-center'>
          <div className='flex gap-2 w-full'>
            <input
              type='text'
              className='py-2.5 px-[21px] bg-neutral-50 border border-neutral-200 rounded-lg font-light w-full'
              placeholder='Enter coupon code'
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCouponSumbit()
                }
              }}
              value={couponCode}></input>
            <button
              className='py-2.5 px-[21px] rounded-lg border border-neutral-200 shadow-sm'
              onClick={handleCouponSumbit}>
              Apply
            </button>
          </div>
        </span>
        {couponError ? (
          renderError()
        ) : (
          <span className='flex gap-2 mt-2'>
            {coupons.map(({ coupon_code }, index) => {
              return (
                <span
                  key={index}
                  className='bg-[#E5E7EB] py-1 px-2.5 w-fit rounded-lg flex items-center gap-1'>
                  {coupon_code}{' '}
                  <button onClick={() => removeCoupon(coupon_code)}>
                    <RiCloseLine className='size-5' />
                  </button>
                </span>
              )
            })}
          </span>
        )}
      </span>
    )
  }

  return (
    <span onClick={() => setShowCouponInput(true)} className='cursor-pointer'>
      <label className='text-indigo-700 flex items-center justify-end font-medium cursor-pointer'>
        <RiCouponLine className='size-5 mr-2' />
        Add coupon code
      </label>
    </span>
  )
}
