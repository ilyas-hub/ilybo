import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Smartphone,
  Palette,
  Code2,
  Cloud,
  Zap,
  Mail,
  User,
  Phone,
  Send,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Global event for opening wizard from anywhere
const OPEN_WIZARD_EVENT = 'openProjectWizard'

export function openProjectWizard() {
  window.dispatchEvent(new CustomEvent(OPEN_WIZARD_EVENT))
}

// Step types
type StepId = 'welcome' | 'service' | 'timeline' | 'contact' | 'complete'

interface WizardData {
  serviceType: string
  timeline: string
  name: string
  email: string
  phone: string
  message: string
}

const SERVICES = [
  { id: 'web', icon: Globe, label: 'Web Development' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile Apps' },
  { id: 'design', icon: Palette, label: 'UI/UX Design' },
  { id: 'custom', icon: Code2, label: 'Custom Software' },
  { id: 'cloud', icon: Cloud, label: 'Cloud Solutions' },
  { id: 'fullstack', icon: Zap, label: 'Full Stack' },
]

const TIMELINES = [
  { id: 'urgent', label: 'Within 2 weeks', icon: '⚡' },
  { id: 'soon', label: 'Within 1 month', icon: '🚀' },
  { id: 'planned', label: '1-3 months', icon: '📅' },
  { id: 'flexible', label: 'Flexible', icon: '🤔' },
]

const STEPS: StepId[] = ['welcome', 'service', 'timeline', 'contact', 'complete']

// Welcome Step
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <Sparkles className="h-8 w-8 text-white" />
      </motion.div>

      <h2 className="text-2xl font-black text-black md:text-3xl">
        Let's Build Something <span className="text-secondary">Amazing</span>
      </h2>

      <p className="mt-2 text-black/70">
        Answer a few quick questions and get a personalized proposal
      </p>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-black/60">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-secondary" /> 1 minute
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-secondary" /> Free
        </span>
      </div>

      <motion.button
        onClick={onNext}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 font-bold text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

// Service Step
function ServiceStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-black text-black md:text-2xl">
          What do you need?
        </h2>
        <p className="text-sm text-black/60">Select your service type</p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon
          const isSelected = value === service.id
          return (
            <motion.button
              key={service.id}
              onClick={() => onChange(service.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all',
                isSelected
                  ? 'border-secondary bg-secondary/10'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={cn('h-6 w-6', isSelected ? 'text-secondary' : 'text-black/40')} />
              <span className="text-xs font-bold text-black">{service.label}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Timeline Step
function TimelineStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-black text-black md:text-2xl">
          When do you want to start?
        </h2>
        <p className="text-sm text-black/60">Select your timeline</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {TIMELINES.map((timeline) => {
          const isSelected = value === timeline.id
          return (
            <motion.button
              key={timeline.id}
              onClick={() => onChange(timeline.id)}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 p-3 transition-all',
                isSelected
                  ? 'border-secondary bg-secondary/10'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{timeline.icon}</span>
              <span className="text-sm font-bold text-black">{timeline.label}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Contact Step
function ContactStep({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
}: {
  data: { name: string; email: string; phone: string; message: string }
  onChange: (field: string, value: string) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}) {
  const isValid = data.name.trim() && data.email.trim()

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-black text-black md:text-2xl">
          How can we reach you?
        </h2>
        <p className="text-sm text-black/60">We'll send your proposal here</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your Name *"
            className="h-10 w-full rounded-xl border-2 border-black/10 bg-white pl-10 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Email Address *"
            className="h-10 w-full rounded-xl border-2 border-black/10 bg-white pl-10 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Phone (Optional)"
            className="h-10 w-full rounded-xl border-2 border-black/10 bg-white pl-10 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <textarea
          value={data.message}
          onChange={(e) => onChange('message', e.target.value)}
          placeholder="Tell us about your project..."
          rows={2}
          className="w-full rounded-xl border-2 border-black/10 bg-white p-3 text-sm focus:border-secondary focus:outline-none resize-none"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Complete Step
function CompleteStep({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <CheckCircle2 className="h-8 w-8 text-white" />
      </motion.div>

      <h2 className="text-2xl font-black text-black">Thank You!</h2>
      <p className="mt-2 text-black/70">
        We'll get back to you within 24 hours
      </p>

      <button
        onClick={onClose}
        className="mt-6 rounded-full bg-secondary px-8 py-3 font-bold text-white"
      >
        Close
      </button>
    </motion.div>
  )
}

// Progress Dots
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-2 rounded-full transition-all',
            i === current ? 'w-6 bg-secondary' : i < current ? 'w-2 bg-secondary/50' : 'w-2 bg-black/20'
          )}
        />
      ))}
    </div>
  )
}

// Main Wizard Component
export function ProjectWizardSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<WizardData>({
    serviceType: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // Listen for global open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener(OPEN_WIZARD_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_WIZARD_EVENT, handleOpen)
  }, [])

  const currentStep = STEPS[currentStepIndex]

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: '',
            message: `Service: ${formData.serviceType}\nTimeline: ${formData.timeline}\nPhone: ${formData.phone}\n\n${formData.message}`,
          }),
        }
      )
      setCurrentStepIndex(STEPS.length - 1)
    } catch {
      setCurrentStepIndex(STEPS.length - 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentStepIndex(0)
    setFormData({
      serviceType: '',
      timeline: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <>
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white">
              Ready to Start?
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Let's Build Your <span className="text-primary">Dream Project</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Share your vision with us and get a personalized proposal
            </p>

            <motion.button
              onClick={() => setIsOpen(true)}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 font-bold text-black shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-5 w-5" />
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Wizard Modal - No Scroll */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose()
            }}
          >
            <motion.div
              className="relative w-full max-w-md rounded-3xl bg-primary p-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black transition-all hover:bg-black/20"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Progress dots - hide on welcome and complete */}
              {currentStep !== 'welcome' && currentStep !== 'complete' && (
                <ProgressDots current={currentStepIndex - 1} total={STEPS.length - 2} />
              )}

              {/* Step content */}
              <AnimatePresence mode="wait">
                {currentStep === 'welcome' && (
                  <WelcomeStep key="welcome" onNext={handleNext} />
                )}
                {currentStep === 'service' && (
                  <ServiceStep
                    key="service"
                    value={formData.serviceType}
                    onChange={(value) => handleFieldChange('serviceType', value)}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'timeline' && (
                  <TimelineStep
                    key="timeline"
                    value={formData.timeline}
                    onChange={(value) => handleFieldChange('timeline', value)}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'contact' && (
                  <ContactStep
                    key="contact"
                    data={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      message: formData.message,
                    }}
                    onChange={handleFieldChange}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                    isSubmitting={isSubmitting}
                  />
                )}
                {currentStep === 'complete' && (
                  <CompleteStep key="complete" onClose={handleClose} />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
