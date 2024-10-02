import HeroImage from '../../../public/img/Prism-1392x1052.jpg'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className='lg:flex lg:justify-center sm:pb-12'>
      <div className='sm:py-12 lg:py-40 lg:max-w-[500px]'>
        <h1 className='hidden lg:block text-neutral-900 lg:font-medium lg:text-6xl'>
          From a tiny desk to the entire world
        </h1>
        <h1 className='lg:hidden text-neutral-900 lg:font-semibold lg:text-5xl sm:text-[2.5rem]/tight sm:font-medium md:text-[2.2rem]/tight'>
          Well crafted abstract gradient
        </h1>
        <p className='lg:text-xl sm:text-[1.4rem]/tight sm:font-light text-neutral-600 lg:mt-6 sm:mt-4'>
          As a lean, passionate team, we&apos;sve made something that most would think is impossible
          - premium abstract images for free and for all.
        </p>
        <div className='flex lg:gap-8 sm:gap-4 lg:mt-16 md:mt-16 sm:mt-8 sm:justify-center md:justify-start lg:justify-start lg:text-lg sm:text-lg'>
          <a
            className='lg:py-4 lg:px-12 lg:text-lg border border-neutral-200 rounded-lg bg-white shadow-md sm:py-4 sm:px-8'
            href='/features'>
            Features
          </a>
          <a
            className='lg:py-4 lg:px-12 lg:text-lg border bg-indigo-700 rounded-lg text-white sm:py-4 sm:px-8'
            href='/pricing shadow-md'>
            See pricing
          </a>
        </div>
      </div>
      <div className='lg:py-24 lg:max-w-[45rem]'>
        <Image src={HeroImage} alt='Hero Banner' priority />
      </div>
    </div>
  )
}
