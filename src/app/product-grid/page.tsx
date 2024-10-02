'use client'

import ProductGrid from '../../../components/ProductGrid'
import useFetch from '../../../utils/useFetch'
import { Product } from '../../../types/Product'

type ProductDataType = {
  data: Product[]
  pagination: {
    has_more: boolean
    page: number
    total: number
  }
}

export default function ProductComponent() {
  const { data, loading, error }: { data: ProductDataType | null; loading: boolean; error: any } =
    useFetch(
      'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest'
    )
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data available</div>

  const { data: products, pagination } = data

  return (
    <>
      <ProductGrid data={products} />
    </>
  )
}
