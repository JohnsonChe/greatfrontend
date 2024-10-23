'use client'
import Link from 'next/link'
import {
  useProductFilterContext,
  ProductFilterContextProviderValueType
} from './contexts/ProductFilterContext'

export default function FooterNav() {
  const { filterOptionHandler } = useProductFilterContext() as ProductFilterContextProviderValueType
  const productLink = '/e-commerce/products'
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-8 lg:w-full'>
      <div className='flex flex-col gap-6 md:w-[320px]'>
        <img
          src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg'
          alt='Stylenest logo'
          className='w-[105px]'
        />
        <p className='text-neutral-600'>
          Craft stunning style journeys that weave more joy into every thread.
        </p>
      </div>
      <div className='flex flex-col md:flex-row md:gap-8 gap-8 lg:w-full lg:justify-center'>
        <div className='md:w-[336px]'>
          <h4 className='text-neutral-600'>SHOP CATEGORIES</h4>
          <ul className='flex flex-col gap-3 mt-4'>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('category', 'unisex')}>
                Unisex
              </Link>
            </li>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('category', 'women')}>
                Women
              </Link>
            </li>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('category', 'men')}>
                Men
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='text-neutral-600'>SHOP COLLECTIONS</h4>
          <ul className='flex flex-col gap-3 mt-4'>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('collection', 'latest')}>
                Latest Arrivals
              </Link>
            </li>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('collection', 'urban')}>
                Urban Oasis
              </Link>
            </li>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('collection', 'cozy')}>
                Cozy Comfort
              </Link>
            </li>
            <li>
              <Link href={productLink} onClick={() => filterOptionHandler('collection', 'fresh')}>
                Fresh Fusion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
