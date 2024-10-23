'use client'
import CartTotal from './CartTotal'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { useRef, useEffect, useState } from 'react'
import {
  FormProvider,
  FieldValues,
  useForm,
  UseFormRegister,
  useFormContext,
  FieldError
} from 'react-hook-form'
import clsx from 'clsx'
import { CartContextType, CartItemType, useCartContext } from './contexts/CartContext'
import { RiArrowDownSLine } from 'react-icons/ri'
import {
  applyValidation,
  validateZip,
  validateExpiryDate,
  validateEmail
} from '../../utils/normalizeInputs'

import {
  applyMask,
  normalizeCardNumber,
  normalizeMonthYearDate,
  normalizeCVV,
  normalizeZip,
  normalizeCity
} from '../../utils/inputMasks'

import Price from './Price'
import { image, InventoryItem } from '../../types/ProductDetailsType'
import { NETWORKS } from '@components/e-commerce/ui/PaymentCard/index'

function CheckoutInformationListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-10 first:pt-0 last:pb-0 border-b border-b-neutral-300 last:border-none'>
      {children}
    </div>
  )
}

export default function UserCheckoutInformation() {
  const methods = useForm({ mode: 'onBlur' })
  const { setTriggerSubmit, itemsInCart, cartTotal } = useCartContext() as CartContextType
  const formRef = useRef<HTMLFormElement | null>(null)

  const submitOrder = (data: FieldValues) => {
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
            <CheckoutInformationListItem>
              <ContactInformation register={methods.register} />
            </CheckoutInformationListItem>
            <CheckoutInformationListItem>
              <ShippingInformation register={methods.register} />
            </CheckoutInformationListItem>
            <CheckoutInformationListItem>
              <DeliveryMethod />
            </CheckoutInformationListItem>
            <CheckoutInformationListItem>
              <PaymentMethod register={methods.register} />
            </CheckoutInformationListItem>
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
  CreditCardIcon?: any
}) {
  const {
    formState: { errors },
    getValues
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
        {CreditCardIcon}
        {inputFieldError && <p className='text-red-600'>{inputFieldError?.message!}</p>}
      </span>
    </div>
  )
}

function ContactInformation({ register }: { register: UseFormRegister<FieldValues> }) {
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

function ShippingInformation({ register }: { register: UseFormRegister<FieldValues> }) {
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
        <span className='flex flex-col gap-4'>
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
          <AddressField register={register} />
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

function AddressField({ register }: { register: UseFormRegister<FieldValues> }) {
  const {
    formState: { errors }
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
      className={clsx(
        'w-full rounded-lg p-4 focus:outline-none',
        selectedDeliveryMethod === value
          ? 'border-2 border-indigo-700'
          : 'border border-neutral-200'
      )}
      onClick={() => handleDeliveryMethodChange(value)}>
      <div className='cursor-pointer'>
        <div className='flex h-14 justify-start cursor-pointer'>
          <div className='flex flex-col text-left flex-grow cursor-pointer'>
            <label className='text-neutral-900'>{title}</label>
            <label className='font-extralight text-neutral-600'>{subtext}</label>
          </div>
          {selectedDeliveryMethod === value && (
            <RiCheckboxCircleFill className='text-indigo-500 size-5' />
          )}
        </div>
        <label className='flex justify-start text-neutral-900'>{priceText}</label>
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

function PaymentMethod({ register }: { register: UseFormRegister<FieldValues> }) {
  const [creditCardIcon, setCreditCardIcon] = useState<JSX.Element>(() => {
    const Icon = NETWORKS['Card']
    return <Icon className='size-8 pointer-events-none absolute inset-y-[4px] left-3' />
  })

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

function CartItemReadOnly({ product }: { product: CartItemType }) {
  const { product: productDetails, sku, quantity, color, size } = product
  const { image_url: productImageUrl }: image =
    productDetails?.images.find((image) => image.color === color) || productDetails?.images[0]!
  const colorCapitalized = color[0].toUpperCase() + color.slice(1, color.length)
  const {
    discount,
    discount_percentage,
    sale_price: salePrice,
    list_price: listPrice,
    stock
  }: InventoryItem = productDetails?.inventory.find((item) => item.sku === sku)!
  const colorStringMap: Record<string, string> = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
  }

  return (
    <div className='flex flex-col md:items-start md:flex-row xs:gap-4 md:gap-8 md:min-h-[92px] first:pt-0 py-8 border-b border-dashed border-neutral-300 last:border-none'>
      <div className='flex gap-6 flex-grow'>
        <img
          src={productImageUrl}
          alt='product image'
          className={
            'min-w-[56px] md:min-w-[80px] md:min-h-[80px] lg:min-w-[80px] lg:min-h-[80px] xl:min-w-[80px] h-[56px] object-cover rounded-lg'
          }
        />
        <div className='flex flex-col gap-2 w-full'>
          <span className='text-neutral-900 text-xl font-medium'>{productDetails?.name}</span>
          <span className='text-neutral-600'>
            {size ? `${colorCapitalized} • ${colorStringMap[size] || size}` : `${colorCapitalized}`}
          </span>
          <span className='text-neutral-600'>Quantity: {quantity}</span>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'></div>
        <Price
          discountPercentage={discount_percentage}
          listPrice={listPrice}
          salePrice={salePrice}
          size={18}
          className='flex flex-col gap-2'
        />
      </div>
    </div>
  )
}
