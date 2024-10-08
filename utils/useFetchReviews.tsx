import { useEffect, useState, useMemo, useCallback } from 'react'
import { ProductRatingType, Rating } from '../types/ProductRatingType'

interface useMoreReviewsReturnTypes {
  reviews: ProductRatingType | undefined
  loading: boolean
  error: string | null
  page: number | null
  rating: Rating | null
  clearFilters: () => void
  hasMoreReviews: boolean
  remainingReviews: number | null
  refetchReviews: (rating?: Rating | null, page?: number | null) => Promise<void>
}

export default function useFetchReviews(productId: string): useMoreReviewsReturnTypes {
  const [reviews, setReviews] = useState<ProductRatingType>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number | null>(null)
  const [rating, setRating] = useState<Rating | null>(null)
  const [remainingReviews, setRemainingReviews] = useState<number | null>(null)
  const [hasMoreReviews, setHasMoreReviews] = useState<boolean>(false)

  const fetchReviews = useCallback(
    async (rating: Rating | null = null, page: number | null = null) => {
      let productIdReviewPage = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews`

      if (rating) {
        setRating(rating)
        productIdReviewPage = productIdReviewPage + `?rating=${rating}`
      }

      if (page) {
        productIdReviewPage = productIdReviewPage + `${rating ? `&page=${page}` : `?page=${page}`}`
      }

      try {
        setPage(null)
        setLoading(true)
        const response = await fetch(productIdReviewPage)
        const { aggregate, data, pagination }: ProductRatingType = await response.json()
        setPage(pagination.page)
        setHasMoreReviews(pagination.has_more)
        setRemainingReviews(pagination.total - pagination.page * pagination.per_page)
        setReviews((prevReviews: any) => {
          if (prevReviews && page) {
            return {
              ...prevReviews,
              data: [...(prevReviews?.data || []), ...(data || [])],
              pagination: { ...pagination }
            }
          } else {
            return { aggregate, data, pagination }
          }
        })
      } catch {
        setError('Something went wrong fetching reviews')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const clearFilters = () => {
    setPage(null)
    setRating(null)
    fetchReviews()
  }

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return {
    reviews,
    loading,
    error,
    page,
    rating,
    hasMoreReviews,
    remainingReviews,
    clearFilters,
    refetchReviews: fetchReviews
  }
}
