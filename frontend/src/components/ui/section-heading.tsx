import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-4xl flex-col gap-4',
        align === 'left' ? 'items-start text-left' : 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs uppercase tracking-[0.36em] text-amber-200/90">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
