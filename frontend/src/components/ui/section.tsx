import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionTone = 'white' | 'surface' | 'deep'

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-background text-foreground',
  surface: 'bg-surface text-foreground',
  deep: 'bg-deep text-deep-foreground',
}

interface SectionProps {
  children: ReactNode
  /** Background band for page rhythm. */
  tone?: SectionTone
  id?: string
  className?: string
  /** Drop the default vertical rhythm (e.g. full-bleed hero / custom bands). */
  bare?: boolean
}

/**
 * Section wrapper owning background tone + vertical rhythm so bands stay
 * consistent across the page.
 */
export function Section({ children, tone = 'white', id, className, bare = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(!bare && 'py-20 lg:py-28', toneClasses[tone], className)}
    >
      {children}
    </section>
  )
}