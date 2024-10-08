import Link from 'next/link'
import { Stars } from './ProductDescription'

interface RatingsDisplayProps {
  rating: number
  reviews: number
  setShowReviews?: React.Dispatch<React.SetStateAction<boolean>>
  modalView: boolean
}

export default function RatingsDisplay({
  rating,
  setShowReviews,
  reviews,
  modalView = false
}: RatingsDisplayProps) {
  return (
    <div
      className={`mt-1 flex items-center gap-2 ${
        rating === 0 ? 'flex-wrap' : 'flex-nowrap'
      } md:flex-nowrap`}>
      <span className='text-xl font-medium'>{rating}</span>
      <Stars rating={rating} className='w-[1.625rem] h-[1.625rem]' />
      <span className='font-medium text-sm text-indigo-700 leading-5 w-full flex items-center'>
        {rating === 0 ? (
          <span className='text-sm md:ml-2 text-neutral-900'>
            No reviews yet. <span className='text-indigo-700'>Be the first </span>
          </span>
        ) : modalView ? (
          <span className='sm:text-[15px] text-[10px] font-medium sm:font-light md:ml-2 text-neutral-600'>
            Based on {reviews} reviews
          </span>
        ) : (
          <Link onClick={() => setShowReviews?.(true)} href=''>
            {`See all ${reviews} reviews`}
          </Link>
        )}
      </span>
    </div>
  )
}
