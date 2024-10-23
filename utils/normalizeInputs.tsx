export function applyValidation(validationFunction: (value: string) => true | string) {
  return (value: string) => validationFunction(value)
}

export function validateZip(value: string) {
  if (value.length < 5) {
    return 'Zipcode must contain 5 numbers'
  }
  return true
}

export function validateExpiryDate(value: string) {
  const [month, year] = value.split('/').map(Number)

  if (!month || !year || month < 1 || month > 12) {
    return 'Invalid date format'
  }
  const currentDate = new Date()
  const inputDate = new Date(Number(`20${year}`), month - 1)

  if (inputDate <= currentDate) {
    return 'Expiration date must be in the future'
  }
  return true
}

export function validateEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    return 'Invalid email format'
  }

  return true
}
