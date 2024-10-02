import FooterNav from './FooterNav'
import FooterSocial from './FooterSocial'
import Newsletter from './Newsletter'
export default function Footer() {
  return (
    <div className='py-4.5 px-4 md:px-4 md:py-4.5 lg:px-28 lg:py-4 flex flex-col gap-12 lg:items-center'>
      <Newsletter />
      <FooterNav />
      <FooterSocial />
    </div>
  )
}
