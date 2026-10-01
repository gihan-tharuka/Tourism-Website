import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const buttonVariants = {
  primary:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-[#0b6b74] focus-visible:ring-primary',
  secondary:
    'bg-white text-foreground border border-border shadow-sm hover:border-primary/40 hover:text-primary focus-visible:ring-primary',
  ghost:
    'bg-transparent text-foreground hover:bg-secondary focus-visible:ring-primary',
}

const buttonSizes = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          buttonVariants[variant],
          buttonSizes[size],
          className,
        ),
      )}
      {...props}
    />
  )
}
