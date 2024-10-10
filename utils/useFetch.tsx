'use client'

import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loading) return

        const response = await fetch(url)
        const result = await response.json()

        setData(result)
        setLoading(false)
      } catch (error: unknown) {
        setError(error as any)
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
