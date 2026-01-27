import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Custom hook for scroll-triggered animations
 * Triggers once when element enters viewport
 */
export function useScrollReveal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return { ref, isInView }
}

/**
 * Staggered animation variants for lists
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

/**
 * Fade up animation (most common)
 */
export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/**
 * Fade in animation (simple)
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

/**
 * Scale in animation (for cards)
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: 'easeOut' },
}
