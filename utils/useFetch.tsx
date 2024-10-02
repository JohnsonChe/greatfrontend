'use client'

import { useEffect, useState, useRef } from 'react'

const useFetch = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const isMounted = useRef(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loading) return

        const response = await fetch(url)
        const result = await response.json()
        console.log('🚀 ~ fetchData ~ result:', result)
        // if (isMounted.current) {
        setData(result)
        setLoading(false)
        // }
      } catch (error: unknown) {
        // if (isMounted.current) {
        setError(error as any)
        setLoading(false)
        // }
      }
    }

    fetchData()
    // return () => {
    //   isMounted.current = false
    // }
  }, [url])

  return { data, loading, error }
}

export default useFetch
