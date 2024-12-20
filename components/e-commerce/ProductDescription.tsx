import Reviews from './Reviews'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import RatingsDisplay from './RatingsDisplay'
import Price from './Price'

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
      <Price
        className='mt-5'
        discountPercentage={discountPercentage}
        listPrice={listPrice}
        salePrice={salePrice}
      />
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
