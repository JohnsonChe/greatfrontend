// import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import ProductDetails from '@components/e-commerce/ProductDetails'
import { useEffect, useState } from 'react'
import { ProductDetailsType } from '../../../../../types/ProductDetailsType'
import ProductContextProvider from '@components/e-commerce/ProductContext'

type ProductPageProps = {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params
  const url = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`
  const data = await fetch(url)
  const product = await data.json()

  if (!product || product.error) {
    return <div>{product.error}</div>
  }

  return (
    <>
      <ProductContextProvider data={product}>
        <ProductDetails />
      </ProductContextProvider>
    </>
  )
}
