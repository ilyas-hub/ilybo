import { useState, useRef } from 'react'
import {
  Lightbulb,
  FileCheck,
  Rocket,
  Code2,
  Cloud,
  Truck,
  TrendingUp,
  X,
  Play,
  ChevronRight,
  Eye,
} from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

const JOURNEY_STEPS = [
  {
    number: 1,
    icon: Lightbulb,
    title: 'Idea',
    description: 'Share your vision with us. We listen, understand, and refine your concept into a clear roadmap.',
    color: '#3366FF',
  },
  {
    number: 2,
    icon: FileCheck,
    title: 'POC',
    description: 'We build a Proof of Concept to validate your idea and demonstrate technical feasibility.',
    color: '#3366FF',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'MVP',
    description: 'Launch your Minimum Viable Product with core features to test the market and gather feedback.',
    color: '#3366FF',
  },
  {
    number: 4,
    icon: Code2,
    title: 'Development',
    description: 'Full-scale development with iterative sprints, regular updates, and continuous improvement.',
    color: '#3366FF',
  },
  {
    number: 5,
    icon: Cloud,
    title: 'Deployment',
    description: 'Seamless deployment to production with CI/CD pipelines, monitoring, and security measures.',
    color: '#3366FF',
  },
  {
    number: 6,
    icon: Truck,
    title: 'Delivery',
    description: 'Your product goes live! Complete handover with documentation and training for your team.',
    color: '#3366FF',
  },
  {
    number: 7,
    icon: TrendingUp,
    title: 'Growth',
    description: 'Ongoing support, optimization, and scaling as your business grows and evolves.',
    color: '#3366FF',
  },
]

// Journey Modal/Overlay
function JourneyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleNext = () => {
    if (currentStep < JOURNEY_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleAutoPlay = () => {
    setIsPlaying(true)
    setCurrentStep(0)

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= JOURNEY_STEPS.length) {
        clearInterval(interval)
        setIsPlaying(false)
      } else {
        setCurrentStep(step)
      }
    }, 1800)
  }

  const handleStepClick = (index: number) => {
    if (!isPlaying) {
      setCurrentStep(index)
    }
  }

  const progress = ((currentStep + 1) / JOURNEY_STEPS.length) * 100
  const currentStepData = JOURNEY_STEPS[currentStep]
  const Icon = currentStepData.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-black transition-all hover:bg-white/40"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="container relative mx-auto min-h-screen px-4 py-8">
            {/* Header */}
            <motion.div
              className="mb-12 pt-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-bold text-secondary">
                <span className="flex h-2 w-2 rounded-full bg-secondary" />
                Step {currentStep + 1} of {JOURNEY_STEPS.length}
              </span>
            </motion.div>

            {/* Timeline dots */}
            <div className="mb-12 flex items-center justify-center gap-3">
              {JOURNEY_STEPS.map((step, index) => {
                const isActive = index === currentStep
                const isPast = index < currentStep

                return (
                  <motion.button
                    key={step.number}
                    onClick={() => handleStepClick(index)}
                    className={cn(
                      'relative flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all md:h-12 md:w-12',
                      isActive
                        ? 'scale-125 bg-secondary text-white shadow-lg'
                        : isPast
                        ? 'bg-secondary/80 text-white'
                        : 'bg-white/50 text-black/50 hover:bg-white/80'
                    )}
                    whileHover={{ scale: isActive ? 1.25 : 1.1 }}
                    disabled={isPlaying}
                  >
                    {step.number}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-secondary"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Current Step Content */}
            <motion.div
              key={currentStep}
              className="mx-auto max-w-3xl"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Step title */}
              <div className="mb-8 text-center">
                <motion.h2
                  className="text-5xl font-black text-black md:text-7xl lg:text-8xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentStepData.title}
                </motion.h2>
              </div>

              {/* Content card */}
              <motion.div
                className="rounded-3xl bg-white p-8 shadow-2xl md:p-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-secondary md:h-24 md:w-24"
                  >
                    <Icon className="h-10 w-10 text-white md:h-12 md:w-12" />
                  </div>

                  <div className="text-center md:text-left">
                    <p className="text-lg text-black/70 md:text-xl">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handlePrev}
                disabled={currentStep === 0 || isPlaying}
                className="flex h-12 items-center gap-2 rounded-full bg-secondary/10 px-6 font-bold text-black transition-all hover:bg-secondary/20 disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
                Previous
              </button>

              <button
                onClick={handleAutoPlay}
                disabled={isPlaying}
                className="flex h-14 items-center gap-3 rounded-full bg-secondary px-8 font-bold text-white shadow-lg transition-all hover:bg-secondary/90 disabled:opacity-50"
              >
                <Play className={cn('h-5 w-5', isPlaying && 'animate-pulse')} />
                {isPlaying ? 'Playing...' : 'Auto Play'}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === JOURNEY_STEPS.length - 1 || isPlaying}
                className="flex h-12 items-center gap-2 rounded-full bg-secondary/10 px-6 font-bold text-black transition-all hover:bg-secondary/20 disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Progress bar */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="h-2 overflow-hidden rounded-full bg-secondary/20">
                <motion.div
                  className="h-full bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mini Journey Preview for the section
function JourneyPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/20 p-4 backdrop-blur-sm md:p-6">
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 md:gap-2">
        {JOURNEY_STEPS.map((step, index) => {
          const StepIcon = step.icon
          return (
            <div key={step.number} className="flex items-center">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary md:h-14 md:w-14">
                  <StepIcon className="h-5 w-5 text-white md:h-7 md:w-7" />
                </div>
                <span className="mt-2 whitespace-nowrap text-xs font-bold text-black md:text-sm">
                  {step.title}
                </span>
              </motion.div>

              {index < JOURNEY_STEPS.length - 1 && (
                <motion.div
                  className="mx-1 flex items-center md:mx-2"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  viewport={{ once: true }}
                >
                  <ChevronRight className="h-4 w-4 text-secondary/50 md:h-5 md:w-5" />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function JourneySection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <>
      <section
        id="how-it-works"
        ref={sectionRef}
        className="relative overflow-hidden bg-primary py-16 lg:py-24"
      >
        <div className="container relative mx-auto px-4">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white">
              Our Process
            </span>
            <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              From Idea to Growth
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              A proven 7-step journey that transforms your vision into a successful product
            </p>
          </motion.div>

          {/* Journey Preview */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <JourneyPreview />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-4 rounded-full bg-secondary px-8 py-5 font-bold text-white shadow-xl transition-all hover:shadow-2xl"
            >
              <div className="text-left">
                <div className="text-lg font-black">How We Work</div>
                <div className="text-sm font-normal text-white/70">In 7 simple steps</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-110">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Journey Modal */}
      <JourneyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
