'use client'
import CartTotal from './CartTotal'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { useRef, useEffect, useState } from 'react'
import { FormProvider, FieldValues, useForm, useFormContext, FieldError } from 'react-hook-form'
import clsx from 'clsx'
import {
  CartContextType,
  CartItemType,
  ConfirmedOrder,
  useCartContext
} from './contexts/CartContext'
import { RiArrowDownSLine } from 'react-icons/ri'
import {
  applyValidation,
  validateEmail,
  validateExpiryDate,
  validateZip
} from '../../utils/normalizeInputs'

import {
  applyMask,
  normalizeCardNumber,
  normalizeMonthYearDate,
  normalizeCVV,
  normalizeZip,
  normalizeCity
} from '../../utils/inputMasks'
import CartItemReadOnly from './CartItemReadOnly'

const checkoutForm = [ContactInformation, ShippingInformation, DeliveryMethod, PaymentMethod]

function CheckoutInformationListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-10 first:pt-0 last:pb-0 border-b border-b-neutral-300 last:border-none'>
      {children}
    </div>
  )
}

export default function UserCheckoutInformation() {
  const methods = useForm({ mode: 'onBlur' })
  const { setTriggerSubmit, itemsInCart, cartTotal, setConfirmedOrder } =
    useCartContext() as CartContextType
  const formRef = useRef<HTMLFormElement | null>(null)

  const submitOrder = async (data: FieldValues) => {
    setConfirmedOrder(data as ConfirmedOrder)
    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        body: JSON.stringify({ formData: data, itemsInCart })
      })
      const submittedOrder = await res.json()
      console.log('submittedOrder', submittedOrder)
    } catch {}
    console.log('Form Submitted', data)
  }
  useEffect(() => {
    setTriggerSubmit(() => () => formRef?.current?.requestSubmit())
  }, [setTriggerSubmit])

  useEffect(() => {
    methods.setValue('cartTotal', cartTotal)
  }, [cartTotal])

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>
      <FormProvider {...methods}>
        <div className='flex-grow w-full'>
          <form ref={formRef} onSubmit={methods.handleSubmit(submitOrder)}>
            {checkoutForm.map((Component, index) => (
              <CheckoutInformationListItem key={index}>
                <Component />
              </CheckoutInformationListItem>
            ))}
          </form>
        </div>
        <CartTotal cartType='confirm-order' className='w-full'>
          {itemsInCart.map((item, index) => (
            <CartItemReadOnly product={item} key={index} />
          ))}
        </CartTotal>
      </FormProvider>
    </div>
  )
}

function InputLabelField({
  register,
  placeholder,
  inputType,
  labelText,
  fieldName,
  CreditCardIcon
}: {
  placeholder: string
  inputType: 'text' | 'email' | 'number'
  labelText: string
  fieldName: string
  register: any
  CreditCardIcon?: React.FC<{ className?: string }>
}) {
  const {
    formState: { errors }
  } = useFormContext()
  const inputFieldError: FieldError = errors?.[fieldName] as FieldError
  return (
    <div className='flex flex-col w-full gap-1.5'>
      <label htmlFor={fieldName} className='font-light text-neutral-700'>
        {labelText}
      </label>
      <span className={clsx(CreditCardIcon && 'relative')}>
        <input
          {...register}
          id={fieldName}
          type={inputType}
          placeholder={placeholder}
          className={clsx(
            'appearance-none w-full rounded-lg bg-neutral-50 py-2.5 font-light max-h-10 focus:outline-none focus:border-indigo-700 focus:border-2',
            inputFieldError ? 'border-2 border-red-600' : 'border border-neutral-200',
            CreditCardIcon ? 'pl-[50px] pr-3.5' : 'px-3.5'
          )}
        />
        {CreditCardIcon && (
          <span className='pointer-events-none absolute inset-y-[4px] left-3'>
            {<CreditCardIcon className='size-8' />}
          </span>
        )}
        {inputFieldError && <p className='text-red-600'>{inputFieldError?.message!}</p>}
      </span>
    </div>
  )
}

function ContactInformation() {
  const { register } = useFormContext()
  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-neutral-600 font-normal text-lg'>Contact Information</h2>
      <span className='flex flex-col'>
        <InputLabelField
          register={{
            ...register('email', {
              required: 'Email field is required',
              validate: applyValidation(validateEmail)
            })
          }}
          inputType='email'
          placeholder='user@example.com'
          labelText='Email'
          fieldName='email'
        />
      </span>
    </div>
  )
}

function ShippingInformation() {
  const { register } = useFormContext()
  const {
    formState: { errors }
  } = useFormContext()

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-neutral-600 font-normal text-lg'>Shipping Information</h2>
      <div className='flex flex-col gap-6'>
        <span className='flex flex-col gap-1.5 w-full relative'>
          <label htmlFor='shippingCountry' className='font-light text-neutral-700'>
            Country/Region
          </label>
          <select
            id='shippingCountry'
            className='appearance-none border border-neutral-200 rounded-lg bg-neutral-50 py-2.5 px-3.5 font-light max-h-10 focus:outline-none focus:border-indigo-700 focus:border-2 text-left leading-none'
            {...register('shippingCountry', { required: true })}>
            <option value='united states'>United States</option>
          </select>
          <RiArrowDownSLine className='pointer-events-none size-8 absolute inset-y-[34px] right-0 flex items-center px-2 text-neutral-400' />
        </span>
        <span className='flex flex-col lg:flex-row gap-4'>
          <InputLabelField
            register={{ ...register('shippingFirstName', { required: 'First name is required' }) }}
            inputType='text'
            placeholder='John'
            labelText='First name'
            fieldName='shippingFirstName'
          />
          <InputLabelField
            register={{ ...register('shippingLastName', { required: 'Last name is required' }) }}
            inputType='text'
            placeholder='Appleseed'
            labelText='Last name'
            fieldName='shippingLastName'
          />
        </span>
        <span>
          <AddressField />
        </span>
        <div className='flex flex-col gap-6 justify-stretch md:flex-row'>
          <span className='w-full'>
            <InputLabelField
              register={{
                ...register('shippingCity', {
                  required: 'City is required',
                  onChange: applyMask(normalizeCity)
                })
              }}
              inputType='text'
              placeholder='City'
              labelText='City'
              fieldName='shippingCity'
            />
          </span>
          <span className='flex flex-col w-full relative gap-1.5'>
            <label className='font-light text-neutral-700'>State</label>
            <select
              className={clsx(
                'appearance-none rounded-lg bg-neutral-50 py-2.5 px-3.5 font-light min-h-10 focus:outline-none focus:border-indigo-700 focus:border-2 w-full text-left leading-none',
                errors?.['shippingState'] ? 'border-2 border-red-600' : 'border border-neutral-200'
              )}
              {...register('shippingState', { required: 'State is required' })}>
              <option value=''>State</option>
              <option value='New York'>NY</option>
            </select>
            {errors?.['shippingState'] && (
              <p className='text-red-600'>{errors?.['shippingState']?.message as string}</p>
            )}
            <RiArrowDownSLine className='pointer-events-none size-8 absolute inset-y-[34px] right-0 flex items-center px-2 text-neutral-400' />
          </span>
          <span className='w-full'>
            <InputLabelField
              register={{
                ...register('shippingZip', {
                  required: 'Zipcode is required',
                  onChange: applyMask(normalizeZip),
                  validate: applyValidation(validateZip)
                })
              }}
              inputType='number'
              labelText='Zip'
              placeholder='12345'
              fieldName='shippingZip'
            />
          </span>
        </div>
      </div>
    </div>
  )
}

function AddressField() {
  const {
    formState: { errors },
    register
  } = useFormContext()

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor='address' className='font-light'>
        Address
      </label>
      <div className='flex flex-col gap-4'>
        <span>
          <input
            {...register('shippingAddressLineOne', { required: 'Street Address is required' })}
            id='address'
            type='text'
            placeholder='Street address'
            className={clsx(
              'w-full  rounded-lg bg-neutral-50 py-2.5 px-3.5 font-light max-h-10 focus:outline-none focus:border-indigo-700 focus:border-2',
              errors?.['shippingAddressLineOne']
                ? 'border-2 border-red-600'
                : 'border border-neutral-200'
            )}
          />
          {errors?.['shippingAddressLineOne'] && (
            <p className='text-red-600'>{errors['shippingAddressLineOne'].message as string}</p>
          )}
        </span>
        <input
          {...register('shippingAddressLineTwo')}
          type='text'
          placeholder='Apartment, suite, etc (optional)'
          className='border border-neutral-200 rounded-lg bg-neutral-50 py-2.5 px-3.5 font-light max-h-10 focus:outline-none focus:border-indigo-700 focus:border-2'
        />
      </div>
    </div>
  )
}

function DeliveryMethod() {
  const { setValue } = useFormContext()
  const { selectedDeliveryMethod, setDeliveryMethod } = useCartContext() as CartContextType

  useEffect(() => {
    setValue('deliveryMethod', 'standard')
  }, [])

  const handleDeliveryMethodChange = (value: 'standard' | 'express') => {
    setDeliveryMethod(value)
    setValue('deliveryMethod', value)
  }
  const DeliveryMethodButton = ({
    title,
    subtext,
    priceText,
    value
  }: {
    title: string
    subtext: string
    priceText: string
    value: 'standard' | 'express'
  }) => (
    <button
      type='button'
      tabIndex={0}
      className={clsx(
        'w-full rounded-lg p-4 focus:outline-none focus:border-2 focus:border-indigo-50',
        selectedDeliveryMethod === value
          ? 'border-2 border-indigo-700'
          : 'border border-neutral-200'
      )}
      onClick={() => handleDeliveryMethodChange(value)}>
      <div className='cursor-pointer'>
        <div className='flex h-14 justify-start cursor-pointer lg:text-[0.92rem] xl:text-base'>
          <div className='flex flex-col text-left flex-grow cursor-pointer'>
            <label className='text-neutral-900'>{title}</label>
            <label className='font-extralight text-neutral-600'>{subtext}</label>
          </div>
          {selectedDeliveryMethod === value && (
            <RiCheckboxCircleFill className='text-indigo-500 size-5' />
          )}
        </div>
        <label className='flex justify-start text-neutral-900 lg:text-[0.92rem] xl:text-base'>
          {priceText}
        </label>
      </div>
    </button>
  )

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-neutral-600 font-normal text-lg'>Delivery Method</h2>
      <div className='flex flex-col md:flex-row gap-4'>
        <DeliveryMethodButton
          title='Standard'
          subtext='4-10 business days'
          priceText='FREE'
          value='standard'
        />
        <DeliveryMethodButton
          title='Express'
          subtext='2-5 business days'
          priceText='$15.00'
          value='express'
        />
      </div>
    </div>
  )
}

function PaymentMethod() {
  const { register } = useFormContext()
  const { creditCardIcon, setCreditCardIcon } = useCartContext() as CartContextType

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-neutral-600 font-normal text-lg'>Payment Method</h2>
      <div className='flex flex-col gap-6'>
        <InputLabelField
          register={{
            ...register('cc-card', {
              required: 'Card number is required',
              onChange: applyMask(normalizeCardNumber, setCreditCardIcon)
            })
          }}
          labelText='Card Number'
          placeholder='1234 1234 1234 1234'
          inputType='text'
          fieldName='cc-card'
          CreditCardIcon={creditCardIcon}
        />
        <InputLabelField
          register={{ ...register('cc-name', { required: 'Card name is required' }) }}
          labelText='Name on card'
          placeholder='Full name on card'
          inputType='text'
          fieldName='cc-name'
        />
        <div className='flex gap-8 w-full'>
          <InputLabelField
            register={{
              ...register('cc-expiry', {
                required: 'Credit card expiry is required',
                onChange: applyMask(normalizeMonthYearDate),
                validate: applyValidation(validateExpiryDate)
              })
            }}
            labelText='Expiry'
            placeholder='MM/YY'
            inputType='text'
            fieldName='cc-expiry'
          />
          <InputLabelField
            register={{
              ...register('cc-cvv', {
                required: 'CVV is required',
                onChange: applyMask(normalizeCVV)
              })
            }}
            labelText='CVV'
            placeholder='123'
            inputType='number'
            fieldName='cc-cvv'
          />
        </div>
      </div>
    </div>
  )
}
