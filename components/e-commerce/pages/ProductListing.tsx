'use client'
import ProductGrid from '@components/ProductGrid'
import FilterColumn from '@components/e-commerce/FilterColumn'

export default function ProductListing() {
  return (
    <div className='flex gap-16 lg:gap-10 xl:gap-16'>
      <FilterColumn className='hidden lg:block lg:h-full lg:overflow-y-auto sticky top-0' />
      <ProductGrid pageType='sort' />
    </div>
  )
}
