import NavBar from '../../../components/e-commerce/NavBar'
import Footer from '@components/e-commerce/Footer'
import CartContextProvider from '@components/e-commerce/contexts/CartContext'
import ProductFilterContextProvider from '@components/e-commerce/contexts/ProductFilterContext'
import ToastContextProvider from '@components/e-commerce/contexts/ToastContext'
import clsx from 'clsx'
import Toast from '@components/e-commerce/Toast'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        'py-4 overflow-auto scroll-smooth flex flex-col items-center justify-center'
      )}>
      <ToastContextProvider>
        <ProductFilterContextProvider>
          <CartContextProvider>
            <NavBar />
            <main className='bg-white flex-1 flex flex-col px-4 py-12 w-full lg:w-[1024px] xl:w-[1418px] lg:px-24 lg:pb-24'>
              {<Toast />}
              {children}
            </main>
            <Footer />
          </CartContextProvider>
        </ProductFilterContextProvider>
      </ToastContextProvider>
    </div>
  )
}
