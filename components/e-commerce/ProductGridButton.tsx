import { RiArrowDownSLine } from 'react-icons/ri'
import Link from 'next/link'
import { useState } from 'react'
import {
  useProductFilterContext,
  ProductFilterContextProviderValueType
} from '../e-commerce/contexts/ProductFilterContext'
import clsx from 'clsx'

type ProductGridButtonProps = {
  buttonType: 'sort' | 'view'
}

export default function ProductGridButton({ buttonType = 'view' }: ProductGridButtonProps) {
  const { filterOptions, filterOptionHandler } =
    useProductFilterContext() as ProductFilterContextProviderValueType
  const [isSortByOpen, setSortByOpen] = useState<boolean>(false)

  const sortByHandler = (value: OptionValue, direction?: DirectionValue) => {
    filterOptionHandler('sort', value, direction)
    setSortByOpen(false)
  }

  if (buttonType === 'view') {
    return (
      <Link href='/e-commerce/products'>
        <button className='px-[18px] py-[10px] rounded-md shadow text-neutral-600 hover:bg-neutral-50'>
          View all
        </button>
      </Link>
    )
  }

  return (
    <div className='relative inline-block'>
      <button
        className='px-[18px] py-[10px] rounded-md text-neutral-600 hover:bg-neutral-50 shadow flex justify-center items-center gap-1'
        onClick={() => setSortByOpen((prev) => !prev)}>
        Sort By
        <RiArrowDownSLine className='size-5' />
      </button>
      <div
        className={clsx(
          isSortByOpen
            ? 'w-[228px] h-[228px] shadow-2xl rounded-lg p-2 absolute top-[3.6875rem] left-[-7.25rem] z-[1000] bg-white flex flex-col justify-center border border-neutral-200'
            : 'hidden'
        )}>
        <ul>
          {sortByOptions.map(({ title, value, direction }, index) => {
            const currentDirection = filterOptions['direction'][0]
            const currentSort = filterOptions['sort'][0]
            const isActive =
              (currentDirection === direction && currentSort === 'price') ||
              (currentSort === value && currentSort !== 'price')
            return (
              <li
                key={index}
                onClick={() => sortByHandler(value, direction)}
                className={clsx(
                  'p-2 font-light cursor-pointer hover:bg-neutral-50',
                  isActive ? 'text-indigo-700' : 'text-neutral-600'
                )}>
                {title}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const sortByOptions: SortByOptionType[] = [
  { title: 'Newest', value: 'created' },
  { title: 'Best Rating', value: 'rating' },
  { title: 'Most popular', value: 'popularity' },
  { title: 'Price: Low to High', value: 'price', direction: 'asc' },
  { title: 'Price: High to Low', value: 'price', direction: 'desc' }
]

type SortByOptionType = {
  title: string
  value: OptionValue
  direction?: DirectionValue
}

type OptionValue = 'created' | 'rating' | 'popularity' | 'price' | 'sort'
type DirectionValue = 'asc' | 'desc'
