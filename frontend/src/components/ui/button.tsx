import * as React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const buttonVariants = {
  primary:
    'bg-amber-300 text-slate-950 shadow-lg shadow-amber-300/15 hover:bg-amber-200 focus-visible:ring-amber-200',
  secondary:
    'bg-slate-900/90 text-slate-100 border border-white/10 hover:bg-slate-900 focus-visible:ring-slate-200/40',
  ghost:
    'bg-transparent text-slate-100 hover:bg-white/5 focus-visible:ring-slate-200/40',
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
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
          buttonVariants[variant],
          buttonSizes[size],
          className,
        ),
      )}
      {...props}
    />
  )
}
