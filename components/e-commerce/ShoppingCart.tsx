import { RiShoppingBag3Line } from 'react-icons/ri'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
interface ShoppingCartProps {
  items?: number
}

export default function ShoppingCart({ items = 0 }: ShoppingCartProps) {
  const [animating, setAnimating] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setAnimating(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setAnimating(false)
    }, 900)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [items])

  return (
    <Link href='/e-commerce/cart'>
      <RiShoppingBag3Line className='size-6 hover:text-neutral-400' />
      <span
        className={clsx(
          items > 0
            ? 'absolute right-[3.0rem] lg:right-[5.5rem] lg:top-[0.9rem] top-[1.1rem] h-[18px] w-[18px] text-xs text-center font-semibold bg-purple text-white rounded-full flex items-center justify-center'
            : 'hidden',
          animating && 'animate-ping'
        )}>
        <span>{items}</span>
      </span>
    </Link>
  )
}
