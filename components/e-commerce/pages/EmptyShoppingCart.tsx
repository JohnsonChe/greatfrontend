import { RiShoppingCart2Line, RiArrowRightLine } from 'react-icons/ri'
import Link from 'next/link'

export default function EmptyShoppingCart() {
  return (
    <>
      <h1 className='text-3xl md:text-5xl text-neutral-900'>Shopping Cart</h1>
      <div className='flex flex-col mt-16 xs:min-h-[584px] md:min-h-fit md:max-h-[432px] lg:flex-row xl:gap-8 lg:justify-center lg:min-h-[736px]'>
        <div className='flex flex-col justify-center items-center xs:max-w-full xs:min-h-[372px] lg:min-w-[400px] xl:min-w-[488px]'>
          <RiShoppingCart2Line className='text-indigo-700 size-12 p-3 rounded-full shadow' />
          <span className='text-xl font-medium mt-5'>Your cart is empty</span>
          <span className='font-light mt-2'>Let&apos;s go explore some products</span>
          <Link href='/e-commerce/products'>
            <button className='flex py-2.5 px-4 items-center gap-2 bg-indigo-700 rounded-lg text-white mt-5'>
              Explore products
              <RiArrowRightLine className='size-4' />
            </button>
          </Link>
        </div>
        <div>
          <img
            src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/empty-cart.jpg'
            alt='Empty cart'
            className='w-full lg:h-full'
          />
        </div>
      </div>
    </>
  )
}
