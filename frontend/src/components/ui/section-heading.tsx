import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  /** Optional right-aligned slot (e.g. a "View all" link) for editorial rows. */
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  action,
  className,
}: SectionHeadingProps) {
  const block = (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'left' ? 'items-start text-left' : 'items-center text-center',
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
          <span className="h-px w-6 bg-primary/50" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )

  if (action) {
    return (
      <div
        className={cn(
          'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
          className,
        )}
      >
        {block}
        <div className="shrink-0">{action}</div>
      </div>
    )
  }

  return <div className={cn('mx-auto max-w-4xl', className)}>{block}</div>
}
