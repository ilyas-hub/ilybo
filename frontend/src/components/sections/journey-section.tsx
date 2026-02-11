import { useState, useRef, useEffect } from 'react'
import {
  Lightbulb,
  FileCheck,
  Rocket,
  Code2,
  Cloud,
  Truck,
  TrendingUp,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { START_PROJECT_PATH } from './open-project-wizard'

const JOURNEY_STEPS = [
  {
    number: 1,
    icon: Lightbulb,
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'We start by deeply understanding your business goals, target audience, and project requirements through collaborative sessions.',
    highlights: ['Strategic consultation', 'Market research', 'Technical feasibility'],
    color: '#3B82F6',
  },
  {
    number: 2,
    icon: FileCheck,
    title: 'Planning',
    subtitle: 'Blueprint & Architecture',
    description: 'Our architects design a scalable solution with detailed specifications, timelines, and technology recommendations.',
    highlights: ['System architecture', 'Project roadmap', 'Risk mitigation'],
    color: '#8B5CF6',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'MVP Launch',
    subtitle: 'Quick Market Entry',
    description: 'We build and launch a Minimum Viable Product to validate your concept and gather real user feedback fast.',
    highlights: ['Rapid prototyping', 'User validation', 'Iterative feedback'],
    color: '#10B981',
  },
  {
    number: 4,
    icon: Code2,
    title: 'Development',
    subtitle: 'Building Excellence',
    description: 'Full-scale development using agile methodology with weekly sprints, code reviews, and continuous integration.',
    highlights: ['Agile sprints', 'Quality assurance', 'Progress tracking'],
    color: '#F59E0B',
  },
  {
    number: 5,
    icon: Cloud,
    title: 'Deployment',
    subtitle: 'Going Live',
    description: 'Seamless deployment to cloud infrastructure with automated pipelines, security hardening, and performance optimization.',
    highlights: ['Cloud hosting', 'CI/CD pipeline', 'Security audit'],
    color: '#EC4899',
  },
  {
    number: 6,
    icon: Truck,
    title: 'Handover',
    subtitle: 'Complete Transfer',
    description: 'Full project handover with comprehensive documentation, source code, and training sessions for your team.',
    highlights: ['Documentation', 'Team training', 'Knowledge transfer'],
    color: '#F97316',
  },
  {
    number: 7,
    icon: TrendingUp,
    title: 'Growth',
    subtitle: 'Scale & Evolve',
    description: 'Ongoing partnership with dedicated support, feature enhancements, and scaling assistance as your business grows.',
    highlights: ['24/7 support', 'Feature updates', 'Performance scaling'],
    color: '#14B8A6',
  },
]

const AUTOPLAY_DURATION = 4000

export function JourneySection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isPlaying || !isInView) return

    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const newProgress = (elapsed / AUTOPLAY_DURATION) * 100

      if (newProgress >= 100) {
        setProgress(0)
        setDirection(1)
        setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
      } else {
        setProgress(newProgress)
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, activeStep, isInView])

  const handleStepClick = (index: number) => {
    setDirection(index > activeStep ? 1 : -1)
    setActiveStep(index)
    setProgress(0)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveStep((prev) => (prev - 1 + JOURNEY_STEPS.length) % JOURNEY_STEPS.length)
    setProgress(0)
  }

  const handleNext = () => {
    setDirection(1)
    setActiveStep((prev) => (prev + 1) % JOURNEY_STEPS.length)
    setProgress(0)
  }

  const currentStep = JOURNEY_STEPS[activeStep]
  const Icon = currentStep.icon

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary py-12 lg:py-16"
    >
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-2 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-white">
            Our Process
          </span>
          <h2 className="text-2xl font-black tracking-tight text-black sm:text-3xl md:text-4xl">
            From <span className="text-secondary">Idea</span> to <span className="text-secondary">Growth</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-black/60 md:text-base">
            A proven 7-step journey that transforms your vision into a successful product
          </p>
        </motion.div>

        {/* Main Player */}
        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="overflow-hidden rounded-2xl bg-[#111] shadow-2xl">
            {/* Content */}
            <div className="relative h-[280px] overflow-hidden sm:h-[300px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 flex"
                >
                  {/* Left - Icon */}
                  <div
                    className="hidden w-[35%] items-center justify-center sm:flex"
                    style={{ backgroundColor: currentStep.color }}
                  >
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        className="absolute -inset-6 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black"
                        style={{ color: currentStep.color }}
                      >
                        {currentStep.number}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right - Content */}
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-8">
                    {/* Mobile icon */}
                    <div className="mb-3 flex items-center gap-3 sm:hidden">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: currentStep.color }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                        style={{ backgroundColor: currentStep.color }}
                      >
                        Step {currentStep.number}
                      </span>
                    </div>

                    <div className="mb-2 hidden items-center gap-2 sm:flex">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: currentStep.color }}
                      >
                        Step {currentStep.number} of 7
                      </span>
                      <span className="text-xs text-white/60">{currentStep.subtitle}</span>
                    </div>

                    <h3 className="mb-2 text-2xl font-black text-white sm:text-3xl">
                      {currentStep.title}
                    </h3>

                    <p className="mb-4 text-sm text-white/60 sm:text-base">
                      {currentStep.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {currentStep.highlights.map((item, i) => (
                        <motion.span
                          key={item}
                          className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          <CheckCircle2 className="h-3 w-3" style={{ color: currentStep.color }} />
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 border-t border-white/5 bg-black/50 px-3 py-2 sm:px-4 sm:py-2.5">
              <motion.button
                onClick={() => { setIsPlaying(!isPlaying); if (!isPlaying) setProgress(0); }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
              </motion.button>

              <button onClick={handlePrev} className="p-2 text-white/50 hover:text-white" aria-label="Previous step">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button onClick={handleNext} className="p-2 text-white/50 hover:text-white" aria-label="Next step">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* Progress */}
              <div className="flex flex-1 gap-1">
                {JOURNEY_STEPS.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className="group relative flex h-6 flex-1 items-center"
                    aria-label={`Go to step ${i + 1}: ${step.title}`}
                  >
                    <div className="h-1 w-full rounded-full bg-white/10">
                      {i < activeStep && (
                        <div className="h-full w-full rounded-full" style={{ backgroundColor: step.color }} />
                      )}
                      {i === activeStep && (
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ backgroundColor: step.color, width: `${progress}%` }}
                        />
                      )}
                    </div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-black opacity-0 transition-opacity group-hover:opacity-100">
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>

              <span className="text-xs text-white/30">{activeStep + 1}/{JOURNEY_STEPS.length}</span>
            </div>
          </div>

          {/* Step Pills */}
          <div className="mt-4 flex justify-center gap-1 overflow-x-auto pb-2 sm:gap-2">
            {JOURNEY_STEPS.map((step, i) => {
              const StepIcon = step.icon
              const isActive = i === activeStep
              return (
                <motion.button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all sm:px-4 sm:py-2 ${
                    isActive ? 'text-white shadow-lg' : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}
                  style={isActive ? { backgroundColor: step.color } : undefined}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <StepIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link to={START_PROJECT_PATH}>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-primary shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
