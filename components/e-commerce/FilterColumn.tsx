import ColorSwatches from './ColorSwatches'
import Stars from './Stars'
import { useState } from 'react'
import {
  ProductFilterContextProviderValueType,
  useProductFilterContext
} from './contexts/ProductFilterContext'

type Category = {
  title: string
  id: keyof FilterOptionsType
  options: CategoryOptions[]
  optionType: 'checkbox' | 'color-swatch' | 'stars'
}

type CategoryOptions = {
  value: string
  name?: string
}

const CATEGORIES: Category[] = [
  {
    title: 'Collections',
    id: 'collection',
    options: [
      { value: 'latest', name: 'Latest Arrivals' },
      { value: 'urban', name: 'Urban Oasis' },
      { value: 'cozy', name: 'Cozy Comfort' },
      { value: 'fresh', name: 'Fresh Fusion' }
    ],
    optionType: 'checkbox'
  },
  {
    title: 'Category',
    id: 'category',
    options: [
      { value: 'unisex', name: 'Unisex' },
      { value: 'women', name: 'Women' },
      { value: 'men', name: 'Men' }
    ],
    optionType: 'checkbox'
  },
  {
    title: 'Colors',
    id: 'color',
    options: [
      { value: '#FFFFFF', name: 'white' },
      { value: '#171717', name: 'black' },
      { value: '#DC2626', name: 'red' },
      { value: '#ea580c', name: 'orange' },
      { value: '#f59e0b', name: 'amber' },
      { value: '#059669', name: 'green' },
      { value: '#4338CA', name: 'blue' },
      { value: '#CA8A04', name: 'yellow' },
      { value: '#D2B08A', name: 'biege' },
      { value: '#DB2777', name: 'pink' }
    ],
    optionType: 'color-swatch'
  },
  {
    title: 'Rating',
    id: 'rating',
    options: [{ value: '5' }, { value: '4' }, { value: '3' }, { value: '2' }, { value: '1' }],
    optionType: 'stars'
  }
]

type FilterColumnProps = {
  className?: string
}

export default function FilterColumn({ className = '' }: FilterColumnProps) {
  const {
    filterOptions,
    numberOfFilters,
    clearFilterOptionHandler,
    filterOptionHandler,
    hasFiltersSeleted
  } = useProductFilterContext() as ProductFilterContextProviderValueType

  return (
    <div className={'lg:w-[180px] xl:w-[248px] ' + className}>
      {CATEGORIES.map(({ title, id, options, optionType }, index) => (
        <FilterSection
          id={id}
          title={title}
          options={options}
          optionType={optionType}
          key={index}
          filterOptions={filterOptions}
          filterOptionHandler={filterOptionHandler}
        />
      ))}
      {hasFiltersSeleted && (
        <button className='text-indigo-700 mt-6 w-full' onClick={clearFilterOptionHandler}>
          Clear All ({numberOfFilters})
        </button>
      )}
    </div>
  )
}

type FilterSectionProps = {
  title: string
  id: keyof FilterOptionsType
  options: { value: string; name?: string }[]
  optionType: 'checkbox' | 'color-swatch' | 'stars'
  filterOptions: FilterOptionsType
  filterOptionHandler: (key: keyof FilterOptionsType, value: string) => void
}

type FilterOptionsType = {
  collection: string[]
  category: string[]
  color: string[]
  rating: string[]
  direction: string[]
}

function FilterSection({
  title,
  id,
  options,
  optionType,
  filterOptions,
  filterOptionHandler
}: FilterSectionProps) {
  const [isAccordionOpen, setAccordionOpen] = useState<boolean>(true)

  const renderOptions = () => {
    switch (optionType) {
      case 'checkbox':
        return (
          <ul className='flex flex-col gap-4 text-neutral-600'>
            {options.map((option, index) => (
              <li key={option.value + index}>
                <label className='text-neutral-600'>
                  <input
                    type='checkbox'
                    value={option.value}
                    className='mr-3'
                    checked={filterOptions[id].includes(option.value)}
                    onChange={(e) => filterOptionHandler(id, option.value)}
                  />
                  {option.name}
                </label>
              </li>
            ))}
          </ul>
        )
      case 'color-swatch':
        return (
          <ul className='flex flex-wrap gap-4'>
            {options.map((color, index) => (
              <ColorSwatches
                key={color + id + index}
                color={color.value}
                selectedColor={filterOptions?.color}
                onClick={() => filterOptionHandler(id, color.name!)}
                swatchSize={18}
              />
            ))}
          </ul>
        )
      case 'stars':
        return (
          <div className='flex flex-col gap-6'>
            {options.map(({ value }) => (
              <Stars
                rating={Number(value)}
                key={id + value}
                starGapSize={2}
                className='cursor-pointer'
                onClick={() => filterOptionHandler(id, value)}
              />
            ))}
          </div>
        )
      default:
    }
  }

  return (
    <div className='border-b border-neutral-300 flex flex-col gap-6 py-6'>
      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={() => setAccordionOpen((prev) => !prev)}>
        <span>{title}</span>
        {isAccordionOpen ? <span>—</span> : <span className='text-2xl pb-1'>+</span>}
      </div>
      {isAccordionOpen && <div>{renderOptions()}</div>}
    </div>
  )
}
