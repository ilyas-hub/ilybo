import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

// Sketch/Cartoon style logo like Google Doodles
export function Logo({ className, size = 'md', animated = true }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  }

  const iconSize = sizes[size]

  return (
    <motion.svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      initial={animated ? { rotate: -5 } : undefined}
      animate={animated ? { rotate: [0, -3, 3, 0] } : undefined}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    >
      {/* Background blob - hand drawn style */}
      <motion.path
        d="M24 4C12 4 4 12 4 24C4 36 12 44 24 44C36 44 44 36 44 24C44 12 36 4 24 4Z"
        fill="#FFD93D"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: animated ? '200' : undefined,
        }}
        initial={animated ? { strokeDashoffset: 200 } : undefined}
        animate={animated ? { strokeDashoffset: 0 } : undefined}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Letter I - sketchy style */}
      <motion.g
        initial={animated ? { scale: 0, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        {/* I stem */}
        <path
          d="M14 16L14 32"
          stroke="#3366FF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* I top */}
        <path
          d="M11 16L17 16"
          stroke="#3366FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* I bottom */}
        <path
          d="M11 32L17 32"
          stroke="#3366FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* Letter B - sketchy style */}
      <motion.g
        initial={animated ? { scale: 0, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        {/* B stem */}
        <path
          d="M24 15L24 33"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* B top bump */}
        <path
          d="M24 15C24 15 32 15 32 20C32 25 24 24 24 24"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* B bottom bump */}
        <path
          d="M24 24C24 24 34 24 34 29C34 34 24 33 24 33"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>

      {/* Decorative dots - cartoon style */}
      <motion.circle
        cx="40"
        cy="12"
        r="2"
        fill="#3366FF"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: [0, 1.2, 1] } : undefined}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.circle
        cx="8"
        cy="38"
        r="1.5"
        fill="#3366FF"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: [0, 1.2, 1] } : undefined}
        transition={{ delay: 0.9, duration: 0.3 }}
      />
    </motion.svg>
  )
}

// Text logo component - IlyBo with correct capitalization and animation
export function LogoText({
  className,
  scrolled = false,
  animated = true,
}: {
  className?: string
  scrolled?: boolean
  animated?: boolean
}) {
  const letters = [
    { char: 'I', color: 'secondary', isSerif: true },
    { char: 'l', color: 'secondary', isSerif: false },
    { char: 'y', color: 'secondary', isSerif: false },
    { char: 'B', color: 'black', isSerif: false },
    { char: 'o', color: 'black', isSerif: false },
  ]

  return (
    <span className={cn('font-black tracking-tight', className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={cn(
            'inline-block',
            letter.color === 'secondary' ? 'text-secondary' : 'text-black',
            letter.isSerif && 'font-serif'
          )}
          style={letter.isSerif ? { fontFamily: 'Georgia, "Times New Roman", serif' } : undefined}
          initial={animated ? { y: -20, opacity: 0 } : undefined}
          animate={animated ? { y: 0, opacity: 1 } : undefined}
          transition={{
            delay: index * 0.08,
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
          whileHover={{
            y: -3,
            scale: 1.1,
            transition: { duration: 0.15 },
          }}
        >
          {letter.char}
        </motion.span>
      ))}
    </span>
  )
}

// Combined logo with icon and text
export function LogoFull({
  className,
  scrolled = false,
}: {
  className?: string
  scrolled?: boolean
}) {
  return (
    <motion.div
      className={cn('inline-flex items-center gap-2', className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Logo size="md" animated />
      <LogoText className="text-2xl" scrolled={scrolled} />
    </motion.div>
  )
}
