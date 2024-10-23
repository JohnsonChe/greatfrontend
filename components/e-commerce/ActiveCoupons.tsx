import { useCartContext, CartContextType } from './contexts/CartContext'

export default function ActiveCoupons({ listStyle = 'pill' }: { listStyle?: 'pill' | 'text' }) {
  const { coupons } = useCartContext() as CartContextType

  return (
    <>
      {coupons.length > 0 &&
        coupons.map(({ coupon_code, discount_amount, discount_percentage }, index) => {
          return (
            <span className='flex justify-between' key={index}>
              <span className='flex flex-col md:gap-8 md:flex-row gap-2'>
                {listStyle === 'text' && (
                  <label className='text-neutral-600'>Coupon discount</label>
                )}
                <label className='px-2.5 py-1 border border-indigo-200 bg-indigo-50 rounded-full text-indigo-700 font-light w-fit'>
                  {coupon_code}
                </label>
              </span>
              {discount_amount && <label>- ${discount_amount?.toFixed(2)}</label>}
              {discount_percentage && <label>- {discount_percentage}%</label>}
            </span>
          )
        })}
    </>
  )
}
