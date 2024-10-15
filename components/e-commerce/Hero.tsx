import Image from 'next/image'
export default function Hero() {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8'>
      <div className='xl:w-[488px]'>
        <h2 className='text-4xl md:text-5xl lg:text-4xl xl:text-[3.75rem] xl:leading-none font-medium'>
          Summer styles are finally here
        </h2>
        <p className='text-neutral-600 text-lg md:text-xl lg:text-lg xl:text-xl mt-4'>
          This year, our new summer collection will be your haven from the world&apos;s harsh
          elements.
        </p>
        <button className='py-3 px-[37.75px] md:px-16 md:py-4 bg-indigo-700 text-white rounded-lg mt-8 md:text-lg hover:bg-indigo-800'>
          Shop now
        </button>
      </div>
      <div>
        <Image
          src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/banner.jpg'
          alt='Stylenext hero'
          className='w-full min-h-[264px] lg:min-w-[450px] xl:min-h-[525px] lg:bg-center'
          width={319}
          height={264}
        />
      </div>
    </div>
  )
}
