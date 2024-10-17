'use client'
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'
import useFetchProducts from '../../../utils/useFetchProducts'
import { ProductLatestType } from '../../../types/ProductLatestType'

const ProductFilterContext = createContext<ProductFilterContextProviderValueType | null>(null)
export const useProductFilterContext = () => useContext(ProductFilterContext)

export default function ProductFilterContextProvider({
  children
}: ProductFilterContextProviderProps) {
  const { products, error, fetchProducts } = useFetchProducts()
  const [isFilterPanelOpen, setOpenFilterPanel] = useState<boolean>(false)
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    collection: [],
    category: [],
    color: [],
    rating: [],
    sort: [],
    direction: []
  })

  const numberOfFilters = Object.entries(filterOptions).reduce(
    (arg, [_, options]) => (arg += options.length),
    0
  )
  const hasFiltersSeleted = numberOfFilters > 0
  const queryString = queryStringBuilder(filterOptions)

  const filterOptionHandler = (key: keyof FilterOptionsType, value: string, direction = 'desc') => {
    setFilterOptions((prev) => {
      const options = prev[key]

      if (options.includes(value)) {
        return {
          ...prev,
          [key]: options.filter((option) => option !== value),
          direction: [direction],
          ...(key === 'sort' ? value === 'price' && { sort: ['price'] } : { sort: [] })
        }
      } else {
        const newValue = key === 'sort' ? [value] : [...options, value]
        return { ...prev, [key]: newValue, direction: [direction] }
      }
    })
  }

  const clearFilterOptionHandler = () => {
    setFilterOptions({
      collection: [],
      category: [],
      color: [],
      rating: [],
      sort: [],
      direction: []
    })
  }

  useEffect(() => {
    console.log('filterOptions', filterOptions)
    fetchProducts(queryString)
  }, [filterOptions])

  const value: ProductFilterContextProviderValueType = useMemo(
    () => ({
      filterOptions,
      filterOptionHandler,
      clearFilterOptionHandler,
      numberOfFilters,
      hasFiltersSeleted,
      queryString,
      products,
      error,
      fetchProducts,
      isFilterPanelOpen,
      setOpenFilterPanel
    }),
    [filterOptions, filterOptionHandler, clearFilterOptionHandler, hasFiltersSeleted, queryString]
  )

  return <ProductFilterContext.Provider value={value}>{children}</ProductFilterContext.Provider>
}

export function queryStringBuilder(params: Record<string, any>): string {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key]

      // Handle arrays: e.g. ?tags=tag1&tags=tag2
      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join('&')
      }

      // Handle boolean values: e.g. ?isActive=true
      if (typeof value === 'boolean') {
        return `${encodeURIComponent(key)}=${value}`
      }

      // Handle undefined or null values: skip them
      if (value === undefined || value === null) {
        return ''
      }

      // Default behavior for other types (numbers, strings, etc.)
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean) // Remove empty strings from the result
    .join('&')

  return queryString
}

interface ProductFilterContextProviderProps {
  children: ReactNode
}

export interface ProductFilterContextProviderValueType {
  filterOptions: FilterOptionsType
  filterOptionHandler: (
    key: keyof FilterOptionsType,
    value: string,
    description?: 'desc' | 'asc'
  ) => void
  clearFilterOptionHandler: () => void
  numberOfFilters: number
  hasFiltersSeleted: boolean
  queryString: string
  products: ProductLatestType | undefined
  error: unknown
  fetchProducts: (queryString?: string | undefined) => Promise<void>
  isFilterPanelOpen: boolean
  setOpenFilterPanel: Dispatch<SetStateAction<boolean>>
}

type FilterOptionsType = {
  collection: string[]
  category: string[]
  color: string[]
  rating: string[]
  sort: string[]
  direction: string[]
}
