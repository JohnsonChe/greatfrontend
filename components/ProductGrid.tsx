import Image from 'next/image'
import { Product, ColorMap } from '../types/Product'

const ProductGrid = ({ data }: { data: Product[] }) => {
  return (
    <div className='bg-white w-screen h-screen lg:p-[96px] md:px-[16px] md:py-[72px] sm:px-[12px]sm:py-[70px]'>
      <div className='w-full h-fit flex place-content-between mb-10'>
        <span className='text-3xl'>Latest Arrivals</span>
        <button className='px-[18px] py-[10px] border rounded-md border-neutral-400 shadow-sm'>
          View all
        </button>
      </div>
      <div className='flex flex-wrap place-content-between'>
        {data.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
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
    <div className='h-[468px] w-[280px]'>
      <div className='relative w-full h-[300px] mb-4'>
        <Image
          src={product.images[0].image_url!}
          alt='product-image'
          fill
          objectFit='cover'
          objectPosition='50% 50%'
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
  )
}

export default ProductGrid
