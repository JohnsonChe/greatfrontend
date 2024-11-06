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
import Link from 'next/link'
import Modal from '@components/e-commerce/Modal'
import { createPortal } from 'react-dom'
import CartTotal from '@components/e-commerce/CartTotal'

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
        <CartTotal cartType='checkout' />
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
              onClick={() => {
                removeProduct(sku)
                setShowConfirmModal(false)
              }}>
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
