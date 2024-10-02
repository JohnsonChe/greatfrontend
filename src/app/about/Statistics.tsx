import Image from 'next/image'
const stats = [
  { value: '25,664,890', metric: 'Downloads' },
  { value: '17,219', metric: 'Paid Users' },
  { value: '190,654,321', metric: 'Images in library' }
]

export default function Statistics() {
  return (
    <div className='flex flex-col gap-12 py-12'>
      <div className='text-center'>
        <span className='font-semibold text-indigo-700'>Statistics</span>
        <h3 className='font-medium text-3xl mt-3 md:font-semibold md:text-5xl'>
          More than premium abstract imagery
        </h3>
        <p className='text-[1.45rem]/snug md:text-xl/snug text-neutral-600 mt-5 lg:font-light'>
          Our platform is more than just as a service to us - it is a catalyst for enriching lives
          through premium abstract imagery.
        </p>
      </div>
      <div className='flex flex-col gap-12 lg:gap-8 lg:flex-row lg:justify-center'>
        <div className='flex justify-center items-center lg:min-w-1/2'>
          <Image
            src='https://marketing-website-phi.vercel.app/_next/image?url=%2Fimages%2Fstatistics-mobile.png&w=3840&q=75'
            className='min-w-full min-h-full lg:w-[592px] lg:h-[544px]'
            alt='Hero picture'
          />
        </div>
        <div className='flex flex-col gap-6 lg:justify-between lg:gap-0'>
          <span className='text-lg text-neutral-600 lg:font-light'>Our mission, in numbers</span>
          {stats.map((stat, index) => (
            <div
              className='border border-neutral-200 rounded-lg text-center py-6 lg:w-[36rem]'
              key={index}>
              <span className='block font-bold text-4xl text-indigo-700'>{stat.value}</span>
              <span className='block pt-4 text-xl text-neutral-600'>{stat.metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
