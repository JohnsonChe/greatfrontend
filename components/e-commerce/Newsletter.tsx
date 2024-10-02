'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState<string>('')
  const [toggleErrorMsg, setToggleErrorMsg] = useState<boolean>(false)

  const validateEmailAddress = (userInputtedEmail: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(userInputtedEmail)
  }

  const subscribeNewsletterHandler = async () => {
    try {
      if (!validateEmailAddress(email)) {
        throw new Error('Invalid Email Format')
      }

      const response = await fetch(
        'https://www.greatfrontend.com/api/projects/challenges/newsletter',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email
          })
        }
      )
      const { error, message } = await response.json()

      if (error) {
        throw new Error('Server Error')
      }

      if (message && message.includes('success')) {
        setToggleErrorMsg(false)
        // toggle success toast
      }
    } catch (e) {
      console.error(e)
      setToggleErrorMsg(true)
    }
  }
  return (
    <div className='flex xs:flex-col lg:flex-row lg:items-center lg:justify-between lg:min-w-[1245px] gap-8'>
      <div className='flex flex-col gap-2'>
        <h3 className='font-semibold text-xl'>Join our newsletter</h3>
        <span className='text-neutral-600'>
          We&apos;ll send you a nice letter once per week. No spam.
        </span>
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='md:grow md:flex md:flex-col'>
          <input
            type='email'
            onBlur={(e) => setEmail(e.target.value)}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={async (e) => {
              if (e.code === 'Enter') {
                console.log('Enter Key Clicked!')
                await subscribeNewsletterHandler()
              }
            }}
            placeholder='Enter your email'
            className='py-2.5 px-3.5 xs:w-full lg:w-[270px] text-sm text-neutral-500 bg-neutral-50 border-2 border-neutral-200 rounded-lg'
          />
          {toggleErrorMsg && (
            <label className='text-red-600 inline-block mt-1.5'>
              Please enter a valid email address.
            </label>
          )}
        </div>
        <button
          className='border bg-indigo-700 text-white py-2.5 px-3.5 md:px-4 rounded-lg max-h-[46px]'
          onClick={subscribeNewsletterHandler}>
          Subscribe
        </button>
      </div>
    </div>
  )
}
