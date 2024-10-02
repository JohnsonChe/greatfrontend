import clsx from 'clsx'
import { size } from '../../types/ProductDetailsType'

const SIZE_MAP = {
  xs: 'XS',
  sm: 'S',
  md: 'M',
  lg: 'L',
  xl: 'XL',
  '2xl': 'XXL'
}

interface SizeSelection {
  onClick: (size: string) => void
  selectedSize: string
  sizeInventory: string[]
  sizes: size[]
}

export default function SizeSelection({
  onClick,
  selectedSize,
  sizeInventory,
  sizes
}: SizeSelection) {
  return (
    <div className='flex justify-start gap-4 flex-wrap mt-4'>
      {sizes.map((value, index) => (
        <button
          key={value + index}
          onClick={() => onClick(value)}
          disabled={!sizeInventory.includes(value)}
          className={clsx(
            'w-16 py-3 px-[22.5px] border rounded-lg',
            selectedSize === value ? 'border-indigo-700 border-2' : 'border-neutral-200',
            !sizeInventory.includes(value) && 'border-none bg-neutral-100 text-neutral-400'
          )}>
          {SIZE_MAP[value]}
        </button>
      ))}
    </div>
  )
}
