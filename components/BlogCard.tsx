import Image from 'next/image'
import blogPicture from '../public/img/spacejoy-YqFz7UMm8qE-unsplash.jpg'

const BlogCard = () => {
  return (
    <div className='w-[375px] max-w-[340px] rounded-md mt-[7.5rem] overflow-hidden'>
      <div className='w-full'>
        <Image src={blogPicture} alt='blog image' className='object-cover' />
      </div>
      <div className='bg-white px-4 py-6 rounded-b-md'>
        <div className='mb-3'>
          <span className='text-green-700 bg-green-50 py-[1px] px-[6px]  border border-green-200 rounded-full'>
            Interior
          </span>
          <h3 className='mt-2 text-lg font-semibold'>Top 5 Living Room Inspirations</h3>
        </div>
        <p className='mb-6 text-neutral-600 text-base'>
          Curated vibrants colors for your living, make it pop & calm in the same time.
        </p>
        <a
          href='/blog'
          className='text-indigo-700 inline-flex items-center focus:outline-none focus:ring focus:ring-focus focus:rounded-md focus:pl-[2px]'>
          <span>Read More</span>
          <ArrowIcon className='ml-3' />
        </a>
      </div>
    </div>
  )
}

const ArrowIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M13.4763 9.16658L9.00633 4.69657L10.1848 3.51807L16.6667 9.99992L10.1848 16.4817L9.00633 15.3032L13.4763 10.8332H3.33333V9.16658H13.4763Z'
      fill='#4338CA'
    />
  </svg>
)

export default BlogCard
