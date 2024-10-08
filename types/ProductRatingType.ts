

export interface ProductRatingType{
  aggregate: RatingAggregate
  data: UserReview[]
  pagination: Pagination
}

export type Pagination = {
  has_more: boolean
  page: number
  per_page: number
  total: number
}

export type RatingAggregate = {
  counts: RatingCount[]
  rating: number
  total: number
}

export interface RatingCount {
  count: number
  rating: Rating
}

export interface UserReview {
  rating: Rating
  content: string
  created_at: string
  user: UserData
}

export type Rating = 1 | 2 | 3 | 4 | 5

export interface UserData {
  name: string
  user_id: string
  avatar_url: string
}