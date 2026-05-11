export const formatCurrency = (value: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export const joinClassNames = (...classes: Array<string | false | null | undefined>) => {
  return classes.filter(Boolean).join(' ')
}
