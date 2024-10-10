import FooterNav from './FooterNav'
import FooterSocial from './FooterSocial'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <div className='py-4.5 px-4 md:px-4 md:py-4.5 lg:px-24 lg:py-4 flex flex-col gap-12 lg:justify-center lg:items-center md:w-full lg:w-[1024px] xl:w-[1418px]'>
      <Newsletter />
      <FooterNav />
      <FooterSocial />
    </div>
  )
}
