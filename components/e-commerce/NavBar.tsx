'use client'
import ShoppingCart from '@components/e-commerce/ShoppingCart'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useCartContext, CartContextType } from './CartContext'

const links = [
  {
    name: 'Shop all',
    href: '#'
  },
  {
    name: 'Latest arrivals',
    href: '#'
  }
]

export default function NavBar() {
  const { itemsInCart } = useCartContext() as CartContextType
  const [isDrawerOpen, setDrawer] = useState(false)
  return (
    <nav className='flex py-4.5 px-4 gap-4 items-center md:px-8 md:py-4.5 lg:px-28 lg:py-4 lg:gap-24'>
      <ol className='grow lg:flex-none'>
        <a href='/e-commerce'>
          <img
            src='https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/logo.svg'
            alt="StyleNest's logo"></img>
        </a>
      </ol>
      <ol className='hidden lg:flex lg:grow lg:gap-8 text-grey'>
        {links.map((link, index) => (
          <a href={link.href} key={index}>
            {link.name}
          </a>
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
  return <RiMenuLine className='size-6' onClick={onClick} />
}
