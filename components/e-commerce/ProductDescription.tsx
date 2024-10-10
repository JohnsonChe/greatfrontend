import Star from '@components/e-commerce/ui/Star'
import Reviews from './Reviews'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import RatingsDisplay from './RatingsDisplay'

interface ProductDescription {
  name: string
  listPrice: number
  salePrice: number
  discountPercentage: number
  rating: number
  reviews: number
  description: string
}

export default function ProductDescription({
  name,
  listPrice,
  salePrice,
  discountPercentage,
  rating,
  reviews,
  description
}: ProductDescription) {
  const [showReviews, setShowReviews] = useState<boolean>(false)

  return (
    <div>
      <h2 className='font-semibold text-3xl'>{name}</h2>
      <div className='mt-5'>
        <span className='font-medium text-3xl text-neutral-600'>${salePrice}</span>
        {discountPercentage && (
          <span className='line-through font-medium text-lg text-neutral-400 ml-2'>
            ${listPrice}
          </span>
        )}
      </div>
      {discountPercentage && (
        <div className='mt-3'>
          <span className='text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1'>
            {discountPercentage}% OFF
          </span>
        </div>
      )}
      <RatingsDisplay
        rating={rating}
        setShowReviews={setShowReviews}
        reviews={reviews}
        modalView={false}
      />
      <div className='mt-8'>
        <p className='text-neutral-600'>{description}</p>
      </div>
      {showReviews && createPortal(<Reviews setShowModal={setShowReviews} />, document.body)}
    </div>
  )
}

export function Stars({ rating, className = '' }: { rating: number; className: string }) {
  const [wholeNumber, decimal] = rating.toString().split('.')
  const hasHalfStar = Number(decimal) >= 5
  const starsNotFilled = 5 - (Number(wholeNumber) + (hasHalfStar ? 1 : 0))

  return (
    <div className='flex'>
      {Array.from({ length: Number(wholeNumber) }).map((_, index) => (
        <Star filled={true} halfFilled={false} key={index} className={className} />
      ))}

      {hasHalfStar && <Star filled={false} halfFilled={true} className={className} />}

      {Array.from({ length: starsNotFilled }).map((_, index) => (
        <Star filled={false} halfFilled={false} key={index} className={className} />
      ))}
    </div>
  )
}
