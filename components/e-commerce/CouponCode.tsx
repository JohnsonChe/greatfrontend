import { useState } from 'react'
import { useCartContext, CartContextType } from './contexts/CartContext'
import { RiCloseLine, RiCouponLine } from 'react-icons/ri'

export default function CouponCode() {
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
