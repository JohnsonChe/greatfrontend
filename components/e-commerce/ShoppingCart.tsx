import { RiShoppingBag3Line } from 'react-icons/ri'

interface ShoppingCartProps {
  items?: number
}

export default function ShoppingCart({ items = 0 }: ShoppingCartProps) {
  return (
    <>
      <RiShoppingBag3Line className='size-6' />
      <span
        className={[
          items > 0
            ? 'absolute right-[3.0rem] lg:right-[5.5rem] lg:top-[0.9rem] top-[1.1rem] h-[18px] w-[18px] text-xs text-center font-semibold bg-purple text-white rounded-full flex items-center justify-center'
            : 'hidden'
        ].join(' ')}>
        {items}
      </span>
    </>
  )
}
