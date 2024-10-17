import ProductGrid from '@components/ProductGrid'
import Hero from '../Hero'
import Collections from '../Collections'
import Features from '../Features'

export default function StoreFront() {
  return (
    <div className='flex flex-col gap-24'>
      <Hero />
      <ProductGrid pageType='view' />
      <Collections />
      <Features />
    </div>
  )
}
