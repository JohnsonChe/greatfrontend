'use client'
import Image from 'next/image'
import { ColorMap } from '../types/Product'
import useFetchProducts from '../utils/useFetchProducts'
import Link from 'next/link'
import { ProductDetailsType } from '../types/ProductDetailsType'

const ProductGrid = () => {
  const { products, error, fetchProducts } = useFetchProducts()

  return (
    <div className='flex flex-col bg-white'>
      <div className='w-full h-fit flex items-center place-content-between mb-10'>
        <span className='text-3xl xs:text-2xl xs:font-medium'>Latest Arrivals</span>
        <button className='px-[18px] py-[10px] border rounded-md border-neutral-400 shadow-sm hover:bg-neutral-50'>
          View all
        </button>
      </div>
      <div className='grid place-content-center gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products &&
          products.data.map((product, index) => <ProductCard product={product} key={index} />)}
      </div>
    </div>
  )
}

const ProductCard = ({ product }: { product: ProductDetailsType }) => {
  const isRegularPrice = product.inventory[0].list_price === product.inventory[0].sale_price
  const capitalizedColor =
    product.images[0].color?.charAt(0).toUpperCase() + product.images[0].color?.slice(1)!

  const colorMap: ColorMap = {
    black: 'bg-black',
    orange: 'bg-orange',
    beige: 'bg-beige',
    yellow: 'bg-yellow',
    blue: 'bg-blue',
    green: 'bg-green',
    white: 'bg-white',
    brown: 'bg-brown'
  }

  return (
    <Link href={`/e-commerce/product/${product.product_id}`}>
      <div className='h-[468px] w-full xl:w-[280px]'>
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
                } border-[#D4D4D4] h-4 w-4 mr-3`}></div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductGrid
