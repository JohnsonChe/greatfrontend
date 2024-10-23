'use client'
import { useState, useEffect, useCallback } from 'react'
import { ProductLatestType } from '../types/ProductLatestType'

export default function useFetchProducts() {
  const [products, setProducts] = useState<ProductLatestType>()
  const [error, setError] = useState<unknown>()
  const baseUrl = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products'

  const fetchProducts = useCallback(async (queryString: string = '') => {
    try {
      const fetchUrl = queryString === '' ? baseUrl : baseUrl + '?' + queryString
      const response = await fetch(fetchUrl)
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
