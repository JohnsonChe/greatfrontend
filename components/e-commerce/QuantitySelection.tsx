import clsx from 'clsx'
import { useMemo } from 'react'

interface QuantitySelectionProps {
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  currentItemStock: number
  selectedQuantity: number
}

export default function QuantitySelection({
  setQuantity,
  currentItemStock,
  selectedQuantity
}: QuantitySelectionProps) {
  const isDisabled = useMemo(() => currentItemStock === 0, [currentItemStock])
  return (
    <div className='mt-8'>
      <span className='text-neutral-500'>Quantity</span>
      <div className='flex gap-4 bg-neutral-50 border-neutral-200 border rounded-lg w-fit mt-4 px-[6px] min-w-[110px]'>
        <button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          className={clsx(
            selectedQuantity > 1 ? 'text-neutral-900' : 'text-neutral-400 cursor-not-allowed'
          )}
          disabled={isDisabled}>
          -
        </button>
        <label className='py-[6px] flex flex-grow justify-center'>
          {isDisabled ? '0' : selectedQuantity}
        </label>
        <button
          onClick={() => setQuantity((prev) => (prev !== currentItemStock ? prev + 1 : prev))}
          disabled={isDisabled}
          className={clsx(
            (isDisabled || currentItemStock === selectedQuantity) &&
              'text-neutral-400 cursor-not-allowed'
          )}>
          +
        </button>
      </div>
    </div>
  )
}
