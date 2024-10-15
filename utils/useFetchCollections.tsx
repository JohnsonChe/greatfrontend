'use client'
import { useState, useEffect, useCallback } from 'react'
import { Product } from '../types/Product'
import { ProductLatestType } from '../types/ProductLatestType'

export type CollectionType = {
  collection_id: string
  name: string
  description: string
  image_url: string
  created_at: string
}

export default function useFetchCollections() {
  const [collections, setCollections] = useState<CollectionType[]>()
  const [error, setError] = useState<unknown>()

  const fetchCollections = useCallback(async () => {
    try {
      const response = await fetch(
        'https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections'
      )
      const data = await response.json()

      if (data) {
        setCollections(data.data)
      } else {
        setError('No Data')
      }
    } catch (e) {
      setError(e)
    }
  }, [])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  return { collections, error, fetchCollections }
}
