'use client'
import { useState, useMemo } from 'react'

export default function Contact() {
  return (
    <div className='lg:flex lg:justify-center sm:my-12 md:my-16 lg:gap-8 lg:my-24'>
      <div className='lg:grow lg:max-w-xl'>
        <h3 className='font-semibold text-4xl md:text-5xl lg:text-6xl lg:font-medium'>
          Talk to our team
        </h3>
        <p className='text-lg text-neutral-600 mt-5 md:text-xl'>
          We&apos;sre committed to delivering the support you require to make your experience as
          smooth as possible.
        </p>
        <div className='mt-10 md:mt-11 flex flex-col gap-6 text-neutral-600'>
          <div className='flex items-center'>
            <span className='p-3.5 shadow rounded-full mr-3'>
              <AddressSVG className='text-indigo-700' />
            </span>
            <span>
              123 Maple Street,
              <span className='block md:inline'> Springfield IL, USA</span>
            </span>
          </div>
          <div className='flex items-center'>
            <span className='p-3.5 shadow rounded-full mr-3'>
              <PhoneSVG className='text-indigo-700' />
            </span>
            <span>+1 (650) 555-0198</span>
          </div>
          <div className='flex items-center'>
            <span className='p-3.5 shadow rounded-full mr-3'>
              <EmailSVG className='text-indigo-700' />
            </span>
            <span>hello@abstractly.com</span>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}

function ContactForm() {
  const [charCount, setCharCount] = useState(0)
  const [isTouched, setIsTouched] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isMaxCharCount = useMemo(() => charCount > 500, [charCount])

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTouched(true)
    const form = new FormData(e.currentTarget)
    // Convert all entries into an object of strings
    const data = Object.fromEntries(
      Array.from(form.entries()).map(([key, value]) => [key, value instanceof File ? '' : value])
    )

    const submissionRequirements = [
      isMaxCharCount === false,
      data.name.length > 0,
      data.email.length > 0
    ]
    const canSendForm = submissionRequirements.every((requirement) => requirement === true)

    if (canSendForm) {
      alert('Form Sent!')
      e.currentTarget.reset()
    } else {
      alert('Somethings Wrong')
    }
  }
  return (
    <div className='border border-neutral-200 rounded-lg sm:p-4 mt-12 md:p-8 md:mt-16 lg:mt-0 lg:grow lg:max-w-xl'>
      <form onSubmit={formSubmitHandler} className='flex flex-col gap-6 md:flex-row md:flex-wrap'>
        <label className='text-neutral-700 md:grow'>
          Name
          <input
            className='block border border-neutral-200 rounded-lg w-full px-3.5 py-2.5 bg-neutral-50 mt-1.5'
            type='text'
            placeholder='Your name'
            name='name'
          />
        </label>
        <label className='text-neutral-700 md:grow'>
          Email
          <input
            className='block border border-neutral-200 rounded-lg w-full px-3.5 py-2.5 bg-neutral-50 mt-1.5'
            type='email'
            placeholder='example@example.com'
            name='email'
          />
        </label>
        <label className='text-neutral-700 md:basis-full'>
          Message
          <textarea
            onChange={(e) => setCharCount(e.target.value.length)}
            onBlur={() => setIsTouched(true)}
            className={`${
              isMaxCharCount || (charCount === 0 && isTouched) || isSubmitted
                ? 'border-red-600 border-2'
                : ''
            } block w-full mt-1.5 border border-neutral-200 rounded-lg px-3.5 py-3 self-stretch bg-neutral-50 h-28`}
            placeholder='Write your message...'
            name='message'
          />
          <div className={`flex ${charCount === 0 && isTouched ? 'flex-row' : 'flex-row-reverse'}`}>
            <p
              className={`${
                (charCount === 0 && isTouched) || isSubmitted ? 'block text-red-600' : 'hidden'
              } mt-1.5 text-left text-xs`}>
              This field is required
            </p>
            <p
              className={`${isMaxCharCount && 'text-red-600'} ${
                charCount === 0 && isTouched ? 'hidden' : 'block'
              } mt-1.5 text-right text-neutral-500 text-xs`}>
              {charCount}/500
            </p>
          </div>
        </label>
        <button className='text-white bg-indigo-700 px-4 py-2.5 rounded basis-full' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

function AddressSVG({ className = '' }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}>
      <path
        d='M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z'
        fill='currentColor'
      />
    </svg>
  )
}

function PhoneSVG({ className = '' }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}>
      <path
        d='M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z'
        fill='currentColor'
      />
    </svg>
  )
}

function EmailSVG({ className = '' }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}>
      <path
        d='M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z'
        fill='currentColor'
      />
    </svg>
  )
}
