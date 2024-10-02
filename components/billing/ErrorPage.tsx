import { FiFrown, FiCreditCard } from 'react-icons/fi'

export function ErrorPage() {
  return (
    <div className='grid place-content-center mt-40'>
      <div className='flex flex-col items-center w-80 text-center'>
        <FiFrown size={50} />
        <h1 className='text-xl mt-5'>Unexpected Error</h1>
        <p className='mt-2'>
          We&apos;re facing some issues at the moment. Please try again later or contact support at
          <a href='mailto:support@codepluse.com' className='text-[#4338CA]'>
            support@codepulse.com
          </a>
        </p>
      </div>
    </div>
  )
}

export function EmptyDataPage() {
  return (
    <div className='grid place-content-center mt-40'>
      <div className='flex flex-col items-center w-80 text-center'>
        <FiCreditCard size={50} />
        <h1 className='text-xl mt-5'>No payment history available</h1>
        <p className='mt-2'>
          Once you start making transactions, your payment details will appear here.
        </p>
      </div>
    </div>
  )
}
