import clsx from 'clsx'

type PriceProps = {
  className?: string
  discountPercentage?: number
  salePrice: number
  listPrice: number
  size?: number
}

export default function Price({
  className,
  discountPercentage,
  salePrice,
  listPrice,
  size = 30
}: PriceProps) {
  return (
    <div className={className}>
      <span
        className={clsx(size !== 30 ? 'text-neutral-600' : 'text-neutral-900', 'font-medium')}
        style={{ fontSize: `${size}px` }}>
        ${salePrice}
      </span>
      {discountPercentage && (
        <span
          className={clsx(
            size !== 30 ? 'text-xs text-neutral-600' : 'text-lg text-neutral-400',
            'line-through font-medium ml-2'
          )}>
          ${listPrice}
        </span>
      )}
    </div>
  )
}
