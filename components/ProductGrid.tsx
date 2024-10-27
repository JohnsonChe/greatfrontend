'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ColorMap } from '../types/Product'
import Link from 'next/link'
import { ProductDetailsType } from '../types/ProductDetailsType'
import clsx from 'clsx'
import getColorsInStock from '../utils/getColorsInStock'
import {
  useProductFilterContext,
  ProductFilterContextProviderValueType
} from './e-commerce/contexts/ProductFilterContext'
import ProductGridButton from './e-commerce/ProductGridButton'
import { RiFilterLine, RiCloseLine } from 'react-icons/ri'
import { createPortal } from 'react-dom'
import FilterColumn from './e-commerce/FilterColumn'
import { RiTShirt2Line } from 'react-icons/ri'

type ProductGridProps = {
  pageType: 'view' | 'sort'
  className?: string
}

const ProductGrid = ({ pageType = 'view', className = '' }: ProductGridProps) => {
  const isPageTypeViewOnly = pageType === 'view'
  const { products, isFilterPanelOpen, setOpenFilterPanel, clearFilterOptionHandler } =
    useProductFilterContext() as ProductFilterContextProviderValueType

  return (
    <>
      <div className={'flex flex-col w-full bg-white ' + className}>
        <div className='w-full flex items-center place-content-between mb-10'>
          <span className='text-3xl xs:text-2xl xs:font-medium'>
            {isPageTypeViewOnly ? (
              'Latest Arrivals'
            ) : (
              <button
                className={clsx(
                  'lg:hidden px-[18px] py-[10px] rounded-md shadow text-neutral-600 hover:bg-neutral-50 text-base flex justify-center items-center',
                  (!products || products.data?.length === 0) && 'bg-neutral-300 text-neutral-100'
                )}
                onClick={() => setOpenFilterPanel(true)}
                disabled={!products || products.data?.length === 0}>
                <RiFilterLine className='w-[16px] h-[16px] mr-1' />
                Filter
              </button>
            )}
          </span>
          <ProductGridButton buttonType={pageType} />
        </div>
        <div
          className={clsx(
            'grid place-content-center gap-8 grid-cols-1',
            !products || products.data?.length === 0
              ? 'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 w-full h-full'
              : isPageTypeViewOnly
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
          )}>
          {products && products.data?.length > 0 ? (
            products.data.map((product, index) => <ProductCard product={product} key={index} />)
          ) : (
            <div className='flex flex-col justify-center items-center gap-5 min-h-[500px]'>
              <RiTShirt2Line className='text-indigo-700 size-12 p-3 shadow-lg rounded-full' />
              <div className='flex flex-col items-center justify-center text-center gap-2'>
                <span className='text-neutral-900 text-xl font-medium'>Nothing found just yet</span>
                <span className='text-neutral-900 font-light'>
                  Adjust your filters a bit, and let&apos;s see what we can find!
                </span>
              </div>
              <button
                className='py-2.5 px-4.5 bg-indigo-700 text-white rounded-lg'
                onClick={() => clearFilterOptionHandler()}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
      {isFilterPanelOpen &&
        createPortal(
          <div className='fixed h-full w-full inset-0 bottom-0 z-[999]'>
            <div
              className='absolute inset-0 bg-neutral-800 opacity-80'
              onClick={() => setOpenFilterPanel(false)}></div>
            <div className='flex flex-col fixed h-full md:w-1/2 lg:w-full inset-0 bottom-0 z-1000 overflow-x-hidden bg-white px-4 py-8 animate-menuBar opacity-100'>
              <div className='flex justify-between items-center border-b border-neutral-300 pb-6'>
                <span className='text-neutral-900 text-xl'>Filter</span>
                <RiCloseLine
                  onClick={() => setOpenFilterPanel(false)}
                  className='w-[20px] h-[20px]'
                />
              </div>
              <FilterColumn />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

const colorMap: ColorMap = {
  black: 'bg-black',
  orange: 'bg-orange',
  beige: 'bg-beige',
  yellow: 'bg-yellow',
  blue: 'bg-blue',
  green: 'bg-green',
  white: 'bg-white',
  brown: 'bg-brown',
  red: 'bg-[#DC2626]',
  pink: 'bg-pink-300'
}

const ProductCard = ({ product }: { product: ProductDetailsType }) => {
  const isRegularPrice = product.inventory[0].list_price === product.inventory[0].sale_price
  const capitalizedColor =
    product.images[0].color?.charAt(0).toUpperCase() + product.images[0].color?.slice(1)!

  const inventoryInStock = getColorsInStock(product.inventory)
  return (
    <Link href={`/e-commerce/products/${product.product_id}`}>
      <div className='h-[468px] w-full lg:w-full xl:w-full'>
        <div className='relative w-full h-[300px] mb-4 rounded-lg overflow-clip'>
          <Image
            priority
            src={product.images[0].image_url!}
            alt='product-image'
            fill
            className='object-cover'
            sizes='(max-width: 319px) 100vw, (max-width: 336px) 50vw, (max-width: 280px) 25vw'
          />
        </div>
        {/* Card Deteails */}
        <div className='h-[168px] w-full'>
          <span className='mt-5 text-[#525252] text-xs'>{capitalizedColor}</span>
          <h3 className='text-lg mb-3'>{product.name}</h3>
          <span className='text-[#737373]'>${product.inventory[0].sale_price}</span>
          {!isRegularPrice && (
            <span className='line-through ml-2 text-xs text-[#525252]'>
              ${product.inventory[0].list_price}
            </span>
          )}
          {/* Color Swatches */}
          <div className='flex mt-3'>
            {product.colors?.map((color, index) => (
              <div
                key={index}
                className={`rounded-full ${
                  colorMap[color] || ''
                }  border border-[#D4D4D4] h-4 w-4 mr-3`}>
                {!inventoryInStock.includes(color) && (
                  <div className='relative top-1.5 right-[3px] w-[140%] h-[2px] bg-neutral-600 -rotate-45 origin-center'></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductGrid
