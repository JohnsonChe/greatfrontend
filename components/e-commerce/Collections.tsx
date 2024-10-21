'use client'
import clsx from 'clsx'
import useFetchCollections from '../../utils/useFetchCollections'
import {
  useProductFilterContext,
  ProductFilterContextProviderValueType
} from './contexts/ProductFilterContext'
import Link from 'next/link'

export default function Collections() {
  const { collections } = useFetchCollections()
  const { filterOptionHandler } = useProductFilterContext() as ProductFilterContextProviderValueType

  return (
    <div className='flex flex-col gap-8'>
      <h2 className='text-3xl'>Our Collections</h2>
      <div className='grid xs:grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 gap-7'>
        {collections &&
          collections.map((collection, index) => (
            <Link
              href='/e-commerce/products'
              className={clsx(
                index === 0 && 'xs:row-span-2 lg:row-span-2 lg:col-span-2',
                index === 1 && 'lg:col-span-2',
                index === 2 && 'md:col-start-2 md:col-end-3 lg:col-start-3 lg:col-span-2',
                'flex flex-col justify-end text-white w-full min-h-[337px]',
                'lg:w-full object-bottom p-4 rounded-lg cursor-pointer'
              )}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${collection.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              onClick={() => {
                filterOptionHandler('collection', collection.collection_id)
              }}
              key={index}>
              <div className='flex flex-col'>
                <label className='font-extralight text-sm'>{collection.name}</label>
                <label>{collection.description}</label>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
