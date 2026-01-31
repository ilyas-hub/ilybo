import type { Variants, Transition } from 'motion/react'

// Page transition animations
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export const pageTransition: Transition = {
  duration: 0.2,
  ease: 'easeInOut',
}

// Fade in up animation
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const fadeInUpTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
}

// Fade in animation
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

// Scale fade animation
export const scaleFade: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

// Stagger children animation
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const staggerContainerSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Slide animations
export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
}

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
}

export const slideInFromBottom: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Card hover animation
export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
}

// Button tap animation
export const buttonTap = {
  whileTap: { scale: 0.98 },
}

// List item animation
export const listItem: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
}

// Table row animation
export const tableRow: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}

// Modal/dialog animations
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
}

// Badge/chip animation
export const badge: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
}

// Progress bar animation
export const progressBar = (value: number) => ({
  initial: { width: 0 },
  animate: { width: `${value}%` },
})

// Spring transition for bouncy effects
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Delayed stagger factory
export const createStaggerDelay = (index: number, baseDelay = 0, staggerDelay = 0.05) => ({
  delay: baseDelay + index * staggerDelay,
})
