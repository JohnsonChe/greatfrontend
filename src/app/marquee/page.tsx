const logos = [
  '/logos/logo-1.svg',
  '/logos/logo-2.svg',
  '/logos/logo-3.svg',
  '/logos/logo-4.svg',
  '/logos/logo-5.svg',
  '/logos/logo-6.svg',
  '/logos/logo-7.svg',
  '/logos/logo.svg'
]

export default function Marquee() {
  return (
    <div className='flex overflow-hidden'>
      <div className='flex animate-marquee'>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt='company logo' className='block mx-4 min-w-[218px]' />
        ))}
      </div>
      <div className='flex animate-marquee'>
        {logos.map((logo, index) => (
          <img key={index} src={logo} className='block mx-4 min-w-[218px]' />
        ))}
      </div>
      <div className='flex animate-marquee'>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt='company logos' className='block mx-4 min-w-[218px]' />
        ))}
      </div>
    </div>
  )
}
