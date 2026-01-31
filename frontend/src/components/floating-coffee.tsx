import { motion } from 'motion/react'
import { useState } from 'react'

// Animated smoke particle - more realistic wispy smoke
function SmokeParticle({ delay, offsetX }: { delay: number; offsetX: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-t from-gray-400/40 to-transparent"
      style={{
        left: `calc(50% + ${offsetX}px)`,
        width: '8px',
        height: '12px',
        filter: 'blur(2px)'
      }}
      initial={{
        y: 0,
        opacity: 0,
        scale: 0.3
      }}
      animate={{
        y: [-5, -25, -45],
        x: [0, offsetX * 0.5, offsetX],
        opacity: [0, 0.6, 0],
        scale: [0.3, 0.8, 0.4],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Realistic Coffee mug SVG
function CoffeeMug({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative">
      {/* Smoke particles - wispy effect */}
      <div className="absolute -top-4 left-1/2 w-10 -translate-x-1/2">
        <SmokeParticle delay={0} offsetX={-3} />
        <SmokeParticle delay={0.4} offsetX={2} />
        <SmokeParticle delay={0.8} offsetX={-1} />
        <SmokeParticle delay={1.2} offsetX={4} />
        <SmokeParticle delay={1.6} offsetX={0} />
      </div>

      {/* Mug */}
      <motion.svg
        width="52"
        height="52"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={isHovered ? { rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Shadow under mug */}
        <ellipse cx="26" cy="58" rx="18" ry="3" fill="rgba(0,0,0,0.1)" />

        {/* Mug body - ceramic white */}
        <path
          d="M10 22 L10 52 Q10 56 14 56 L38 56 Q42 56 42 52 L42 22 Z"
          fill="#FAFAFA"
          stroke="#E5E5E5"
          strokeWidth="1"
        />

        {/* Mug rim */}
        <ellipse cx="26" cy="22" rx="16" ry="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />

        {/* Coffee inside - dark brown with gradient */}
        <ellipse cx="26" cy="24" rx="13" ry="3" fill="#3D2314" />

        {/* Coffee surface - lighter brown with shine */}
        <ellipse cx="26" cy="24" rx="11" ry="2.5" fill="#5D3A1A" />

        {/* Coffee highlight/reflection */}
        <ellipse cx="22" cy="23.5" rx="4" ry="1" fill="#7D4A2A" opacity="0.6" />

        {/* Mug handle - ceramic */}
        <path
          d="M42 28 C52 28 54 36 54 40 C54 44 52 52 42 52"
          stroke="#F0F0F0"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M42 28 C52 28 54 36 54 40 C54 44 52 52 42 52"
          stroke="#E5E5E5"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mug body shine/reflection */}
        <path
          d="M14 28 L14 48"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Small heart or decorative element on mug */}
        <path
          d="M26 38 C24 36 22 37 22 39 C22 41 26 44 26 44 C26 44 30 41 30 39 C30 37 28 36 26 38"
          fill="#FFD93D"
          opacity="0.8"
        />
      </motion.svg>
    </div>
  )
}

export function FloatingCoffee() {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => {
        setIsHovered(true)
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowTooltip(false)
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/90 px-3 py-1 text-xs font-medium text-white shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        Back to top
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/90" />
      </motion.div>

      {/* Floating animation container */}
      <motion.div
        className="relative rounded-full bg-white p-3 shadow-xl"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.6, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        <CoffeeMug isHovered={isHovered} />
      </motion.div>
    </motion.div>
  )
}
