'use client'
import { useState, useEffect, useCallback } from 'react'
import { Product } from '../types/Product'
import { ProductLatestType } from '../types/ProductLatestType'

export default function useFetchProducts() {
  const [products, setProducts] = useState<ProductLatestType>()
  const [error, setError] = useState<unknown>()

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest'
      )
      const data = await response.json()

      if (data) {
        setProducts(data)
      }
    } catch (e) {
      setError(e)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, error, fetchProducts }
}
