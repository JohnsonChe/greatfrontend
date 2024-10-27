import { CartItemType } from './contexts/CartContext'
import { InventoryItem } from '../../types/ProductDetailsType'
import Price from './Price'
import { image } from '../../types/ProductDetailsType'
import clsx from 'clsx'

export default function CartItemReadOnly({
  product,
  priceLabelDirectionForMobile = 'bottom',
  borderStyle = 'dashed'
}: {
  product: CartItemType
  priceLabelDirectionForMobile?: 'top' | 'bottom'
  borderStyle?: 'solid' | 'dashed'
}) {
  const { product: productDetails, sku, quantity, color, size } = product
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
  const colorStringMap: Record<string, string> = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
  }

  return (
    <div
      className={clsx(
        'flex md:items-start md:flex-row xs:gap-4 md:gap-8 md:min-h-[92px] first:pt-0 py-8 border-b border-neutral-300 last:border-none',
        priceLabelDirectionForMobile === 'bottom' ? 'flex-col' : '',
        borderStyle === 'dashed' ? 'border-dashed' : 'border-solid'
      )}>
      <div className='flex gap-6 flex-grow'>
        <img
          src={productImageUrl}
          alt='product image'
          className={
            'min-w-[56px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[80px] lg:min-h-[80px] xl:min-w-[80px] h-[56px] object-cover rounded-lg'
          }
        />
        <div className='flex flex-col gap-2 w-full'>
          <span className='text-neutral-900 text-xl font-medium'>{productDetails?.name}</span>
          <span className='text-neutral-600'>
            {size ? `${colorCapitalized} • ${colorStringMap[size] || size}` : `${colorCapitalized}`}
          </span>
          <span className='text-neutral-600'>Quantity: {quantity}</span>
        </div>
      </div>

      <div
        className={clsx(
          priceLabelDirectionForMobile === 'bottom'
            ? 'justify-end items-center'
            : 'justify-start items-start',
          'flex'
        )}>
        <Price
          discountPercentage={discount_percentage}
          listPrice={listPrice}
          salePrice={salePrice}
          size={18}
          className='flex flex-col gap-2'
        />
      </div>
    </div>
  )
}
