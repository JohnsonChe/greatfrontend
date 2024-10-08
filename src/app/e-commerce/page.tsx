import ProductDetails from '../../../components/e-commerce/ProductDetails'
import { ProductDetailsType } from '../../../types/ProductDetailsType'
import ProductContextProvider from '@components/e-commerce/ProductContext'

export default async function LandingPage() {
  const response = await fetch(
    'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/voyager-hoodie'
  )
  const data: ProductDetailsType = await response.json()
  console.log('data', data)

  return (
    <>
      <ProductContextProvider data={data}>
        <ProductDetails />
      </ProductContextProvider>
    </>
  )
}
