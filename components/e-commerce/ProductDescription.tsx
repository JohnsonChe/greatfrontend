import { InventoryItem } from '../../types/ProductDetailsType'
import Star from '@components/e-commerce/ui/Star'

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
  return (
    <div>
      <h2 className='font-semibold text-3xl'>{name}</h2>
      <div className='mt-5'>
        <span className='font-medium text-3xl text-neutral-600'>${salePrice}</span>
        <span className='line-through font-medium text-lg text-neutral-400 ml-2'>${listPrice}</span>
      </div>
      <div className='mt-3'>
        <span className='text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1'>
          {discountPercentage}% OFF
        </span>
      </div>
      <div
        className={`mt-4 flex items-center gap-2 ${
          rating === 0 ? 'flex-wrap' : 'flex-nowrap'
        } md:flex-nowrap`}>
        <span className='text-xl leading-7'>{rating}</span>
        <Stars rating={rating} />
        <span className='font-medium text-sm text-indigo-700 leading-5 w-full'>
          {rating === 0 ? (
            <span className='text-sm md:ml-2 text-neutral-900'>
              No reviews yet. <span className='text-indigo-700'>Be the first </span>
            </span>
          ) : (
            `See all ${reviews} reviews`
          )}
        </span>
      </div>
      <div className='mt-8'>
        <p className='text-neutral-600'>{description}</p>
      </div>
    </div>
  )
}

function Stars({ rating }: { rating: number }) {
  const [wholeNumber, decimal] = rating.toString().split('.')
  const hasHalfStar = Number(decimal) >= 5
  const starsNotFilled = 5 - (Number(wholeNumber) + (hasHalfStar ? 1 : 0))

  return (
    <div className='flex'>
      {Array.from({ length: Number(wholeNumber) }).map((_, index) => (
        <Star filled={true} halfFilled={false} key={index} />
      ))}

      {hasHalfStar && <Star filled={false} halfFilled={true} />}

      {Array.from({ length: starsNotFilled }).map((_, index) => (
        <Star filled={false} halfFilled={false} key={index} />
      ))}
    </div>
  )
}
