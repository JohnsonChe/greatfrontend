import Modal from './Modal'
import RatingsDisplay from './RatingsDisplay'
import { useProductContext } from './contexts/ProductContext'
import { ProductContextProviderValueType } from './contexts/ProductContext'
import { useState } from 'react'
import useFetchReviews from '../../utils/useFetchReviews'
import { RiChatSmile3Line } from 'react-icons/ri'
import { RatingCount, UserReview, Rating } from '../../types/ProductRatingType'
import Stars from './Stars'
import clsx from 'clsx'

interface ReviewsProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Reviews({ setShowModal }: ReviewsProps) {
  const { productId } = useProductContext() as ProductContextProviderValueType
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null)
  const { reviews, page, rating, clearFilters, hasMoreReviews, remainingReviews, refetchReviews } =
    useFetchReviews(productId)

  const showMoreReviewsHandler = async () => {
    refetchReviews(selectedRating, page && page + 1)
  }

  return (
    <>
      <Modal setShowModal={setShowModal}>
        {reviews ? (
          <div className='px-6 overflow-auto lg:flex lg:gap-8'>
            <div className='flex flex-col gap-6 lg:w-96 self-stretch'>
              <div className='flex flex-col'>
                <h4 className='font-semibold text-xl'>Overall Rating</h4>
                <RatingsDisplay
                  rating={reviews.aggregate.rating}
                  reviews={reviews.aggregate.total}
                  setShowReviews={setShowModal}
                  modalView={true}
                />
              </div>
              <div>
                <RatingPercentageBreakdown
                  setProductReviews={refetchReviews}
                  counts={reviews.aggregate.counts}
                  total={reviews.aggregate.total}
                  setSelectedRating={setSelectedRating}
                />
              </div>
              <div className='flex justify-center gap-6'>
                {rating && (
                  <button
                    className='text-indigo-700 py-3 px-[1.375rem] w-fit'
                    onClick={() => clearFilters()}>
                    Clear Filter
                  </button>
                )}
                <button className='py-3 px-[1.375rem] shadow w-fit font-medium text-neutral-900 hover:bg-neutral-50'>
                  Write a review
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-8 overflow-hidden mt-10 lg:w-full lg:flex-1 lg:overflow-y-auto lg:max-h-[80vh]'>
              {reviews.data.length === 0 ? (
                <div className='flex h-full flex-col items-center justify-center gap-5'>
                  <div
                    className={clsx(
                      'size-12 rounded-full bg-white shadow',
                      'flex items-center justify-center',
                      'text-indigo-700'
                    )}>
                    <RiChatSmile3Line className='size-6' />
                  </div>
                  <div
                    className={clsx(
                      "gap-2', 'text-neutral-900 flex flex-col items-center text-center"
                    )}>
                    <span className='text-xl font-medium'>No reviews yet!</span>
                    <span>Be the first to review this product</span>
                  </div>
                </div>
              ) : (
                reviews.data.map((review) => (
                  <UserReviews data={review} key={crypto.randomUUID()} />
                ))
              )}
              {hasMoreReviews && (
                <div className='py-6'>
                  <button
                    className='text-neutral-900 py-2.5 xs:px-[2rem] sm:px-[3rem] lg:px-[11.15rem] w-full border border-neutral-200 rounded-lg shadow hover:bg-neutral-50'
                    onClick={() => showMoreReviewsHandler()}>
                    Show{' '}
                    {Math.min(
                      reviews.pagination.per_page,
                      remainingReviews || reviews.pagination.per_page
                    )}{' '}
                    more reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading reviews...</p>
        )}
      </Modal>
    </>
  )
}
export const ratingMap: Record<string, string> = {
  1: 'Poor',
  2: 'Below Average',
  3: 'Average',
  4: 'Good',
  5: 'Excellent'
}

function RatingPercentageBreakdown({
  counts,
  total,
  setProductReviews,
  setSelectedRating
}: {
  counts: RatingCount[]
  total: number
  setProductReviews: (rating?: Rating | null | undefined, page?: number | null | undefined) => void
  setSelectedRating: (rating: Rating | null) => void
}) {
  const colorMap: Record<string, string> = {
    1: '#DC2626',
    2: '#EAB308',
    3: '#FDE047',
    4: '#22C55E',
    5: '#16A34A'
  }
  const handleRatingFilter = async (rating: Rating) => {
    setProductReviews(rating)
    setSelectedRating(rating)
  }

  const calcPercentage = (count: number) => Math.round((count / total) * 100)

  const RenderRating = ({ count, rating }: { count: number; rating: Rating }) => {
    const ratingPercent = calcPercentage(count)

    return (
      <div
        className='flex items-center w-full gap-2 cursor-pointer'
        onClick={async () => await handleRatingFilter(rating)}>
        <span className='text-neutral-600 w-[116px]'>{ratingMap[rating]}</span>
        <div className='bg-[#E5E7EB] min-w-[117px] h-[8px] rounded-full grow'>
          <div
            className={`h-[8px] rounded-full`}
            style={{ width: `${ratingPercent}%`, backgroundColor: colorMap[rating] }}></div>
        </div>
        <span className='w-[40px] text-right text-neutral-600'>{ratingPercent}%</span>
      </div>
    )
  }

  return (
    <div className='flex flex-col-reverse py-4 gap-4'>
      {counts.map(({ count, rating }) => (
        <RenderRating count={count} rating={rating} key={crypto.randomUUID()} />
      ))}
    </div>
  )
}

function UserReviews({ data }: { data: UserReview }) {
  const { content, created_at: createdAt, rating, user } = data
  const [firstName, lastName] = user.name.split(' ')
  const localeDateString = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='flex flex-col gap-4'>
      <div className={clsx('flex', user.avatar_url ? 'gap-4' : 'gap-3')}>
        {!user.avatar_url ? (
          <div className='w-12 h-12 bg-[#E5E7EB] flex justify-center items-center rounded-full px-2'>
            <span className='text-lg text-center text-neutral-600 px-2'>
              {firstName[0] + lastName[0]}
            </span>
          </div>
        ) : (
          <img
            src={user.avatar_url}
            alt={user.name + ' profile picture'}
            className='rounded-full w-12 h-12 object-cover'
          />
        )}
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <span className='font-medium'>{user.name}</span>
            <span className='text-xs font-light'>{localeDateString}</span>
          </div>
          <Stars rating={rating} className='w-5 h-5' />
        </div>
      </div>
      <p className='text-neutral-600'>{content}</p>
    </div>
  )
}
