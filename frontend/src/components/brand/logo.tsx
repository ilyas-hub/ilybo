import { motion, useAnimationControls } from 'motion/react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

// Clean circular logo matching the favicon
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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      initial={animated ? { scale: 0, rotate: -10 } : undefined}
      animate={animated ? { scale: 1, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Circular yellow background */}
      <circle cx="16" cy="16" r="16" fill="#FFD93D" />

      {/* Bold IB text */}
      <motion.text
        x="16"
        y="22"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="#3366FF"
        textAnchor="middle"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        IB
      </motion.text>
    </motion.svg>
  )
}

// Text logo component - IlyBo with correct capitalization and auto wave animation
export function LogoText({
  className,
  scrolled: _scrolled = false,
  animated = true,
  variant = 'light',
}: {
  className?: string
  scrolled?: boolean
  animated?: boolean
  variant?: 'light' | 'dark'
}) {
  void _scrolled // kept for backwards compatibility
  const letters = [
    { char: 'I', color: 'secondary', isSerif: true },
    { char: 'l', color: 'secondary', isSerif: false },
    { char: 'y', color: 'secondary', isSerif: false },
    { char: 'B', color: 'primary', isSerif: false },
    { char: 'o', color: 'primary', isSerif: false },
  ]

  const controls = letters.map(() => useAnimationControls())

  useEffect(() => {
    if (!animated) return

    // Initial entrance animation
    controls.forEach((control, index) => {
      control.start({
        y: 0,
        opacity: 1,
        transition: {
          delay: index * 0.08,
          type: 'spring',
          stiffness: 300,
          damping: 15,
        },
      })
    })

    // Auto wave animation every 4 seconds
    const interval = setInterval(() => {
      controls.forEach((control, index) => {
        control.start({
          y: [0, -4, 0],
          scale: [1, 1.08, 1],
          transition: {
            delay: index * 0.07,
            duration: 0.4,
            ease: 'easeInOut',
          },
        })
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [animated])

  const getTextColor = (color: string) => {
    if (color === 'secondary') return 'text-secondary'
    if (variant === 'dark') return 'text-primary'
    return 'text-black'
  }

  return (
    <span className={cn('font-black tracking-tight', className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={cn(
            'inline-block',
            getTextColor(letter.color),
            letter.isSerif && 'font-serif'
          )}
          style={letter.isSerif ? { fontFamily: 'Georgia, "Times New Roman", serif' } : undefined}
          initial={animated ? { y: -20, opacity: 0 } : undefined}
          animate={controls[index]}
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
