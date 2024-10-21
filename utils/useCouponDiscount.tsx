import { useCallback, useState } from 'react'

const ERROR_MSG: Record<string, string> = {
  'Invalid coupon': `Sorry, this coupon doesn't exist.`,
  'Please provide a coupon code to validate': `Please enter a valid code.`
}

export default function useCouponDiscount() {
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [error, setError] = useState<string>()
  const couponURL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/coupons/apply'
  const fetchCoupon = useCallback(async (couponCode: string) => {
    try {
      setError('')
      const response = await fetch(couponURL, {
        method: 'PUT',
        body: JSON.stringify({
          coupon_code: couponCode.toUpperCase()
        })
      })
      const data = await response.json()
      if (!data || data.error) {
        const errorMessage = ERROR_MSG[data.error]
        setError(errorMessage || 'Unable to confirm coupon.')
        return null
      }
      setCoupon(data)
      return data
    } catch (error: any) {
      setError(ERROR_MSG[error] || 'Unable to confirm coupon.')
      return null
    }
  }, [])

  return { fetchCoupon, coupon, error }
}

export type Coupon = {
  coupon_code: string
  discount_amount: number
  discount_percentage: number
}
