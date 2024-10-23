import { NETWORKS } from '@components/e-commerce/ui/PaymentCard'
import getCreditCardNetwork, { CardNetworkName } from './getCreditCardNetwork'

export function applyMask(
  normalizeFunction: (
    value: string,
    setCreditCardIcon?: React.Dispatch<React.SetStateAction<JSX.Element>>
  ) => string,
  setCreditCardIcon?: React.Dispatch<React.SetStateAction<JSX.Element>>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const normalizedValue = normalizeFunction(value, setCreditCardIcon)
    e.target.value = normalizedValue
  }
}

export function normalizeCardNumber(
  value: string,
  setCreditCardIcon?: React.Dispatch<React.SetStateAction<JSX.Element>>
) {
  const iconClasses = 'size-8 pointer-events-none absolute inset-y-[4px] left-3'
  if (setCreditCardIcon) {
    if (value.length === 0) {
      const DefaultCardIcon = NETWORKS['Card']
      setCreditCardIcon(<DefaultCardIcon className={iconClasses} />)
    }
    if (value.length >= 4 && value.length < 20) {
      const cardNetwork: CardNetworkName = getCreditCardNetwork(value)
      const IconComponent = NETWORKS[cardNetwork]
      setCreditCardIcon(<IconComponent className={iconClasses} />)
    }
  }
  return (
    value
      .replace(/\D/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .slice(0, 19) || ''
  )
}

export function normalizeMonthYearDate(value: string) {
  return (
    value
      .replace(/\D/g, '')
      .match(/.{1,2}/g)
      ?.join('/')
      .slice(0, 5) || ''
  )
}

export function normalizeCVV(value: string) {
  return value.replace(/\D/g, '').slice(0, 3) || ''
}

export function normalizeZip(value: string) {
  return value.replace(/\D/g, '').slice(0, 5) || ''
}

export function normalizeCity(value: string) {
  return value.replace(/^[A-Za-z]+$/, '')
}
