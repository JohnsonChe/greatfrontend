'use client'
import ShoppingCart from '@components/e-commerce/ShoppingCart'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useCartContext, CartContextType } from './contexts/CartContext'
import Link from 'next/link'

const links = [
  {
    name: 'Shop all',
    href: '/e-commerce/products'
  },
  {
    name: 'Latest arrivals',
    href: '/e-commerce/latest'
  }
]

export default function NavBar() {
  const { itemsInCart } = useCartContext() as CartContextType
  const [isDrawerOpen, setDrawer] = useState(false)
  return (
    <nav className='flex w-full py-4.5 px-4 gap-4 items-center md:px-4 lg:px-24 lg:py-4 lg:gap-24 lg:w-[1024px] xl:px-24 xl:w-[1418px] sticky top-0'>
      <ol className='grow lg:flex-none'>
        <a href='/e-commerce'>
          <img
            src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg'
            alt="StyleNest's logo"></img>
        </a>
      </ol>
      <ol className='hidden lg:flex lg:grow lg:gap-8 text-grey'>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.name}
          </Link>
        ))}
      </ol>
      <ol className='flex-none text-grey'>
        <ShoppingCart items={itemsInCart.length} />
      </ol>
      <ol className='flex-none lg:hidden text-grey'>
        <NavMenuDrawer onClick={() => setDrawer(true)} />
      </ol>
      {isDrawerOpen &&
        createPortal(
          <nav className='flex flex-col fixed h-full w-full inset-0 bottom-0 z-1000 overflow-x-hidden bg-white px-4 py-8 gap-6 animate-menuBar'>
            <div className='flex justify-between items-center'>
              <img
                src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg'
                alt="StyleNest's logo"></img>
              <RiCloseLine onClick={() => setDrawer(false)} className='size-6 text-grey' />
            </div>
            <div className='flex flex-col grow gap-2'>
              {links.map((link, index) => (
                <a className='py-2 px-3' href={link.href} key={index}>
                  {link.name}
                </a>
              ))}
            </div>
          </nav>,
          document.body
        )}
    </nav>
  )
}

const NavMenuDrawer = ({ onClick }: { onClick: React.MouseEventHandler<SVGElement> }) => {
  return <RiMenuLine className='size-6 cursor-pointer' onClick={onClick} />
}
