import ProductDetails from '../../../components/e-commerce/ProductDetails'
import { ProductDetailsType } from '../../../types/ProductDetailsType'
import ProductContextProvider from '@components/e-commerce/ProductContext'
import ProductGrid from '@components/ProductGrid'
import StoreFront from '@components/e-commerce/pages/StoreFront'

export default async function LandingPage() {
  const response = await fetch(
    'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/voyager-hoodie'
  )
  const data: ProductDetailsType = await response.json()

  return (
    <>
      <ProductContextProvider data={data}>
        {/* <ProductGrid /> */}
        <StoreFront />
      </ProductContextProvider>
    </>
  )
}
