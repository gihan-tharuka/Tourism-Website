import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: Array<string | false | null | undefined>) => {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
