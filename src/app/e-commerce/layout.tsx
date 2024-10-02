import NavBar from '../../../components/e-commerce/NavBar'
import Footer from '@components/e-commerce/Footer'
import CartContextProvider from '@components/e-commerce/CartContext'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-4'>
      <CartContextProvider>
        <NavBar />
        <main className='px-4 py-12 lg:p-24'>{children}</main>
        <Footer />
      </CartContextProvider>
    </div>
  )
}
