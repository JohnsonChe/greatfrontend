import { RiTruckLine, RiShieldCheckLine, RiExchangeLine } from 'react-icons/ri'

type FeatureType = {
  Icon: JSX.ElementType
  name: string
  description: string
}

const FEATURES: FeatureType[] = [
  {
    Icon: RiTruckLine,
    name: 'Complimentary Shipping',
    description:
      'Enjoy the convenience of free shipping for all orders. We believe in transparent pricing, and the price you see is the price you pay—no surprise fees'
  },
  {
    Icon: RiShieldCheckLine,
    name: '2-Year Quality Promise',
    description: `Shop with confidence knowing that we stand behind our products. Should any issue arise within the first two years, rest assured we're here to help with a hassle-free replacement.`
  },
  {
    Icon: RiExchangeLine,
    name: 'Easy Exchanges',
    description: `If your purchase isn't quite right, pass it on to a friend who might love it, and let us know. We're happy to facilitate an exchange to ensure you have the perfect item to complement your lifestyle.`
  }
]

export default function Features() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col text-center'>
        <span className='text-indigo-700 font-semibold'>Elevate your experience</span>
        <span className='text-3xl font-semibold mt-3'>Our Commitment to Exceptional Service</span>
        <p className='text-lg text-neutral-600 mt-5'>
          We pride ourselves on a foundation of exceptional customer service, where every
          interaction is a testament to our dedication to excellence.
        </p>
      </div>
      <div className='flex flex-col lg:flex-row gap-8'>
        {FEATURES.map(({ Icon, name, description }, index) => (
          <div key={index} className='flex flex-col justify-center items-center text-center'>
            <Icon className='text-indigo-700 rounded-full shadow size-14 p-3' />
            <span className='text-xl font-semibold mt-5'>{name}</span>
            <span className='text-neutral-600 mt-2'>{description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
