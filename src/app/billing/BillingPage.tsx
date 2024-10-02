'use client'
import { useEffect, useState } from 'react'
import { EmptyDataPage } from '@components/billing/ErrorPage'
import { PaidBadgePill, PendingBadgePill } from '@components/ui/BadgePill'

const months: { [key: string]: string } = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

export function formatDate(invoiceDate: string) {
  const [year, month, date] = invoiceDate.split('-')
  const formattedDate = date[0] === '0' ? date.slice(1) : date
  const formattedMonth = month[0] === '0' ? month.slice(1) : month
  return `${formattedDate} ${months[formattedMonth]}, ${year}`
}

export interface BillingDataType {
  amount: number
  plan: 'basic' | 'professional' | 'starter'
  status: 'paid' | 'pending'
  invoice_url: string
  created_at: string
}

export interface BillingDisplayProps {
  data: BillingDataType[]
}

export default function BillingDisplay({ data }: BillingDisplayProps) {
  return (
    <>
      <h1 className='font-semibold text-xl'>Payment History</h1>
      <p className='mt-2 text-neutral-500'>
        Please reach out to our friendly team via team@codepulse.com if you have questions.
      </p>
      {data.length === 0 ? <EmptyDataPage /> : <DesktopView data={data} />}
    </>
  )
}

function DesktopView({ data }: BillingDisplayProps) {
  return (
    <div className='border lg:w-full mt-8 overflow-hidden rounded-lg border-[#E5E5E5]'>
      <table className='w-full border-collapse border-spacing-0 table-auto rounded-lg border-[#E5E5E5]'>
        <thead>
          <tr className='text-left text-neutral-600'>
            <th scope='col'>Invoice</th>
            <th scope='col'>Status</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Plan</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody className=''>
          {data?.map((post, index) => (
            <tr key={index} className='border-b border-[#E5E5E5] last:'>
              <td className=''>{formatDate(post.created_at)}</td>
              <td className=''>
                {post.status === 'paid' ? (
                  <PaidBadgePill>
                    {post.status[0].toUpperCase() + post.status.slice(1)}
                  </PaidBadgePill>
                ) : (
                  <PendingBadgePill>
                    {post.status[0].toUpperCase() + post.status.slice(1)}
                  </PendingBadgePill>
                )}
              </td>
              <td className='text-neutral-600'>${post.amount.toFixed(2)}</td>
              <td className='text-neutral-600'>
                {`${post.plan[0].toUpperCase() + post.plan.slice(1)}`} plan
              </td>
              <td className='text-indigo-700 text-right'>
                {post.status === 'paid' ? (
                  <a
                    className='focus:outline-none focus-visible:ring focus:shadow-[#E9EAFC] focus:rounded-sm'
                    href={post.invoice_url}>
                    Download
                  </a>
                ) : (
                  <p className='text-[#A3A3A3]'>Download</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MobileView({ data }: BillingDisplayProps) {
  return <div>MOBILE VIEW</div>
}
