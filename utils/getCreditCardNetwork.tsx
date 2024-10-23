const cardNetworks: { name: CardNetworkName; regex: RegExp }[] = [
  { name: 'Visa', regex: /^4[0-9]{0,15}$/ },
  {
    name: 'Mastercard',
    regex:
      /^(5[1-5][0-9]{0,14}|2(22[1-9][0-9]{0,12}|2[3-9][0-9]{0,13}|[3-6][0-9]{0,14}|7[01][0-9]{0,13}|720[0-9]{0,12}))$/
  },
  { name: 'Amex', regex: /^3[47][0-9]{0,13}$/ }
]

export default function getCreditCardNetwork(cardNumber: string): CardNetworkName {
  const number = cardNumber.replace(/[\s-]/g, '')
  const cardNetwork = cardNetworks.find((network) => network.regex.test(number))

  return cardNetwork ? cardNetwork.name : 'Card'
}

export type CardNetworkName = 'Visa' | 'Mastercard' | 'Amex' | 'Card'
