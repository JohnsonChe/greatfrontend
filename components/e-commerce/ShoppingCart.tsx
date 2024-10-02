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
            ? 'absolute right-[3.0rem] md:right-[4rem] lg:right-[6.5rem] lg:top-[1.7rem] top-[1.8rem] h-[18px] w-[18px] text-xs text-center font-semibold bg-purple text-white rounded-full flex items-center justify-center'
            : 'hidden'
        ].join(' ')}>
        {items}
      </span>
    </>
  )
}
