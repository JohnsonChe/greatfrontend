import UserCheckoutInformation from '@components/e-commerce/UserCheckoutInformation'

export default function Checkout() {
  return (
    <>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-medium'>Checkout</h1>
      <div className='mt-8'>
        <UserCheckoutInformation />
      </div>
    </>
  )
}
