'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const DISTANCE = 24

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const

type RevealTag = keyof typeof tags

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to delay the reveal — use with `staggerDelay` for grids. */
  delay?: number
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number
  as?: RevealTag
}

/**
 * Standard in-view reveal used across home sections. Single reveal per section
 * with per-item stagger, and it renders statically when the visitor has
 * `prefers-reduced-motion` enabled.
 */
export function Reveal({ children, className, delay = 0, amount = 0.2, as = 'div' }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = tags[as]

  return (
    <MotionTag
      initial={prefersReducedMotion ? false : { opacity: 0, y: DISTANCE }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/** Deterministic stagger offset for list/grid items (index * step seconds). */
export const staggerDelay = (index: number, step = 0.08) => index * step