import NavBar from '../../../components/e-commerce/NavBar'
import Footer from '@components/e-commerce/Footer'
import CartContextProvider from '@components/e-commerce/CartContext'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-4 overflow-auto scroll-smooth flex flex-col items-center justify-center'>
      <CartContextProvider>
        <NavBar />
        <main className='flex-1 flex flex-col px-4 py-12 w-full lg:w-[1024px] xl:w-[1418px] lg:p-24'>
          {children}
        </main>
        <Footer />
      </CartContextProvider>
    </div>
  )
}
