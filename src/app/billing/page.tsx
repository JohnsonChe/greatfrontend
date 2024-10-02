import BillingPage, { BillingDataType } from './BillingPage'
import { ErrorPage } from '@components/billing/ErrorPage'

async function getData() {
  const data = await fetch(
    'https://www.greatfrontend.com/api/projects/challenges/account/billing/history'
  )
  return (await data.json()).data
}

export default async function UserBilling() {
  let data: BillingDataType[] = await getData()

  return (
    <div className='pt-16 lg:px-16 md:px-8 sm:px-2'>
      {data ? <BillingPage data={data} /> : <ErrorPage />}
    </div>
  )
}
