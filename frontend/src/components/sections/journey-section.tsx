import { useState, useRef, useEffect } from 'react'
import {
  MessageSquare,
  Lightbulb,
  Code2,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const JOURNEY_STEPS = [
  {
    number: 1,
    icon: MessageSquare,
    title: 'Discovery Call',
    description:
      'We start with a conversation to understand your vision, goals, and challenges.',
    color: 'bg-secondary text-secondary-foreground',
    highlight: 'Free consultation',
    image: '/images/discovery.jpg',
  },
  {
    number: 2,
    icon: Lightbulb,
    title: 'Strategy & Planning',
    description:
      'Our team crafts a detailed roadmap with timelines, milestones, and transparent pricing.',
    color: 'bg-accent text-accent-foreground',
    highlight: 'Clear roadmap',
    image: '/images/planning.jpg',
  },
  {
    number: 3,
    icon: Code2,
    title: 'Design & Development',
    description:
      'We bring your vision to life with iterative development, keeping you involved every step.',
    color: 'bg-white text-primary-foreground',
    highlight: 'Agile process',
    image: '/images/development.jpg',
  },
  {
    number: 4,
    icon: Rocket,
    title: 'Launch & Support',
    description:
      'We deploy your solution and provide ongoing support to ensure your continued success.',
    color: 'bg-secondary text-secondary-foreground',
    highlight: 'Ongoing support',
    image: '/images/launch.jpg',
  },
]

export function JourneySection() {
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
  }

  const prevStep = () => {
    setCurrentStep(
      (prev) => (prev - 1 + JOURNEY_STEPS.length) % JOURNEY_STEPS.length
    )
  }

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary py-20 lg:py-32"
    >
      {/* Animated geometric decorations - Banky style */}
      <motion.div
        className="absolute -left-20 top-20 hidden lg:block"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 0.3, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M250 50 L250 150 L50 250 L50 350"
            stroke="white"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -right-10 bottom-40 hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 0.25, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M30 30 L30 120 L120 120 L120 220 L220 220"
            stroke="white"
            strokeWidth="35"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </svg>
      </motion.div>

      {/* Blue splash decoration */}
      <motion.div
        className="absolute left-1/4 top-1/3 hidden -translate-x-1/2 lg:block"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="relative">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 20 C140 40, 160 80, 140 120 C120 160, 60 180, 40 140 C20 100, 40 40, 100 20"
              fill="hsl(217 91% 50%)"
              className="opacity-80"
            />
          </svg>
          {/* Security badge on splash */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/90 p-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Lock className="mb-1 h-5 w-5 text-secondary" />
            <p className="max-w-[120px] text-xs font-medium text-primary-foreground">
              Built on secure, proven technologies
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container relative mx-auto px-4">
        {/* Section header - Banky style with step number */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-black text-secondary-foreground"
              key={currentStep}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {JOURNEY_STEPS[currentStep].number}
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentStep}
                className="text-3xl font-black tracking-tight text-primary-foreground sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {JOURNEY_STEPS[currentStep].title}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main content area - Card carousel style */}
        <div className="relative flex items-center justify-center gap-8">
          {/* Left arrow */}
          <motion.button
            onClick={prevStep}
            className="hidden h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-110 lg:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          {/* Card display */}
          <div className="relative h-[450px] w-full max-w-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Card image placeholder */}
                <div className="relative h-[60%] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  {/* Placeholder content simulating a product/service */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={cn(
                        'flex h-24 w-24 items-center justify-center rounded-2xl',
                        JOURNEY_STEPS[currentStep].color
                      )}
                    >
                      {(() => {
                        const IconComponent = JOURNEY_STEPS[currentStep].icon
                        return <IconComponent className="h-12 w-12" />
                      })()}
                    </div>
                  </div>
                  {/* Highlight badge */}
                  <motion.div
                    className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    STEP {JOURNEY_STEPS[currentStep].number}
                  </motion.div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold text-primary-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {JOURNEY_STEPS[currentStep].title}
                  </motion.h3>
                  <motion.p
                    className="mt-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {JOURNEY_STEPS[currentStep].description}
                  </motion.p>
                  <motion.div
                    className="mt-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {JOURNEY_STEPS[currentStep].highlight}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Side preview cards */}
            <div className="pointer-events-none absolute -left-20 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="h-[350px] w-[250px] rounded-2xl bg-white/30 shadow-lg blur-sm" />
            </div>
            <div className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="h-[350px] w-[250px] rounded-2xl bg-white/30 shadow-lg blur-sm" />
            </div>
          </div>

          {/* Right arrow */}
          <motion.button
            onClick={nextStep}
            className="hidden h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-110 lg:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Mobile navigation */}
        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            onClick={prevStep}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextStep}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="mt-8 flex justify-center gap-3">
          {JOURNEY_STEPS.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setCurrentStep(index)}
              className={cn(
                'h-3 w-3 rounded-full transition-all duration-300',
                index === currentStep
                  ? 'w-8 bg-secondary'
                  : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
              )}
              aria-label={`Go to step ${step.number}`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-secondary-foreground shadow-lg transition-all hover:scale-105 hover:bg-secondary/90 hover:shadow-xl"
          >
            Start Your Journey
            <Rocket className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
