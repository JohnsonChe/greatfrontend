'use client'
import { useToastContext } from './contexts/ToastContext'
import clsx from 'clsx'

export default function Toast() {
  const { toast } = useToastContext()
  const { type, message, show } = toast
  const isSuccessMessage = toast.type === 'success'
  const typeBadge = (
    <span
      className={clsx(
        'bg-white px-2.5 py-[2px] rounded-full shadow',
        isSuccessMessage ? 'text-lime-600' : 'text-red-600'
      )}>
      {type.slice(0, 1).toUpperCase() + type.slice(1)}
    </span>
  )

  if (!show) return null

  return (
    <div className='fixed inset-0 top-10 mx-auto w-fit h-fit z-[1000] rounded-full shadow-xl'>
      <div
        className={clsx(
          'rounded-full flex justify-center items-center gap-4 py-1.5 px-2.5',
          isSuccessMessage ? 'bg-lime-50' : 'bg-red-50'
        )}>
        {typeBadge}
        <p className={clsx(isSuccessMessage ? 'text-lime-600' : 'text-red-600')}>{message}</p>
      </div>
    </div>
  )
}
