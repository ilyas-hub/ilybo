import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from '@tanstack/react-router'
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
  Clock,
  MessageSquare,
  Building2,
  Target,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  Heart,
  Utensils,
  Home,
  Car,
  Plane,
  Gamepad2,
  Dumbbell,
  Stethoscope,
  CreditCard,
  BarChart3,
  Bell,
  Search,
  Share2,
  Lock,
  Languages,
  Paintbrush,
  Layers,
  Monitor,
  Link,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// localStorage key
const STORAGE_KEY = 'ilybo-wizard-progress'

// Step types — now 5 steps
type StepId = 'welcome' | 'project' | 'needs' | 'timeline-budget' | 'about' | 'complete'

type Currency = 'USD' | 'EUR' | 'INR'

interface WizardData {
  // Step 1: Tell Us About Your Project
  projectDescription: string
  industry: string
  targetAudience: string
  // Step 2: What Do You Need?
  serviceType: string
  features: string[]
  designStyle: string
  // Step 3: Timeline & Budget
  timeline: string
  currency: Currency
  budget: string
  inspirationUrls: string
  // Step 4: About You
  companyName: string
  companyWebsite: string
  hasWebsite: boolean
  name: string
  email: string
  phone: string
}

const DEFAULT_FORM_DATA: WizardData = {
  projectDescription: '',
  industry: '',
  targetAudience: '',
  serviceType: '',
  features: [],
  designStyle: '',
  timeline: '',
  currency: 'USD',
  budget: '',
  inspirationUrls: '',
  companyName: '',
  companyWebsite: '',
  hasWebsite: false,
  name: '',
  email: '',
  phone: '',
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const INDUSTRIES = [
  { id: 'ecommerce', icon: ShoppingCart, label: 'E-Commerce' },
  { id: 'healthcare', icon: Stethoscope, label: 'Healthcare' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'finance', icon: CreditCard, label: 'Finance' },
  { id: 'realestate', icon: Home, label: 'Real Estate' },
  { id: 'travel', icon: Plane, label: 'Travel' },
  { id: 'food', icon: Utensils, label: 'Food & Restaurant' },
  { id: 'fitness', icon: Dumbbell, label: 'Fitness' },
  { id: 'entertainment', icon: Gamepad2, label: 'Entertainment' },
  { id: 'automotive', icon: Car, label: 'Automotive' },
  { id: 'nonprofit', icon: Heart, label: 'Non-Profit' },
  { id: 'other', icon: Briefcase, label: 'Other' },
]

const AUDIENCES = [
  { id: 'b2c', label: 'Consumers (B2C)', desc: 'General public' },
  { id: 'b2b', label: 'Businesses (B2B)', desc: 'Companies & enterprises' },
  { id: 'both', label: 'Both B2B & B2C', desc: 'Mixed audience' },
  { id: 'internal', label: 'Internal Team', desc: 'Company employees' },
]

const SERVICES = [
  { id: 'web', icon: Globe, label: 'Web Development' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile Apps' },
  { id: 'design', icon: Palette, label: 'UI/UX Design' },
  { id: 'custom', icon: Code2, label: 'Custom Software' },
  { id: 'cloud', icon: Cloud, label: 'Cloud Solutions' },
  { id: 'fullstack', icon: Zap, label: 'Full Stack' },
]

const FEATURES = [
  { id: 'auth', icon: Lock, label: 'User Authentication' },
  { id: 'payment', icon: CreditCard, label: 'Payment Gateway' },
  { id: 'dashboard', icon: BarChart3, label: 'Admin Dashboard' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'search', icon: Search, label: 'Search & Filter' },
  { id: 'social', icon: Share2, label: 'Social Integration' },
  { id: 'multilang', icon: Languages, label: 'Multi-Language' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'chat', icon: MessageSquare, label: 'Live Chat' },
  { id: 'api', icon: Link, label: 'API Integration' },
]

const DESIGN_STYLES = [
  { id: 'modern', icon: Layers, label: 'Modern & Minimal' },
  { id: 'bold', icon: Paintbrush, label: 'Bold & Creative' },
  { id: 'corporate', icon: Briefcase, label: 'Professional' },
  { id: 'playful', icon: Sparkles, label: 'Playful & Fun' },
  { id: 'existing', icon: Monitor, label: 'Match Existing' },
  { id: 'unsure', icon: Target, label: 'Need Guidance' },
]

const TIMELINES = [
  { id: 'urgent', label: 'Within 2 weeks', desc: 'Rush project' },
  { id: 'soon', label: 'Within 1 month', desc: 'Fast track' },
  { id: 'planned', label: '1-3 months', desc: 'Standard timeline' },
  { id: 'flexible', label: 'Flexible', desc: 'No rush' },
]

const BUDGET_OPTIONS: Record<Currency, { id: string; label: string; desc: string }[]> = {
  USD: [
    { id: 'starter', label: '$1K - $5K', desc: 'Small projects' },
    { id: 'growth', label: '$5K - $15K', desc: 'Medium projects' },
    { id: 'scale', label: '$15K - $50K', desc: 'Large projects' },
    { id: 'enterprise', label: '$50K+', desc: 'Enterprise solutions' },
    { id: 'discuss', label: "Let's discuss", desc: 'Not sure yet' },
  ],
  EUR: [
    { id: 'starter', label: '\u20AC1K - \u20AC5K', desc: 'Small projects' },
    { id: 'growth', label: '\u20AC5K - \u20AC15K', desc: 'Medium projects' },
    { id: 'scale', label: '\u20AC15K - \u20AC50K', desc: 'Large projects' },
    { id: 'enterprise', label: '\u20AC50K+', desc: 'Enterprise solutions' },
    { id: 'discuss', label: "Let's discuss", desc: 'Not sure yet' },
  ],
  INR: [
    { id: 'starter', label: '\u20B950K - \u20B92L', desc: 'Small projects' },
    { id: 'growth', label: '\u20B92L - \u20B95L', desc: 'Medium projects' },
    { id: 'scale', label: '\u20B95L - \u20B915L', desc: 'Large projects' },
    { id: 'enterprise', label: '\u20B915L+', desc: 'Enterprise solutions' },
    { id: 'discuss', label: "Let's discuss", desc: 'Not sure yet' },
  ],
}

const CURRENCIES: { id: Currency; label: string; symbol: string }[] = [
  { id: 'USD', label: 'USD', symbol: '$' },
  { id: 'EUR', label: 'EUR', symbol: '\u20AC' },
  { id: 'INR', label: 'INR', symbol: '\u20B9' },
]

const STEPS: StepId[] = ['welcome', 'project', 'needs', 'timeline-budget', 'about', 'complete']

const FORM_STEPS = [
  { id: 'project', icon: Target, label: 'Project' },
  { id: 'needs', icon: Code2, label: 'Needs' },
  { id: 'timeline-budget', icon: Clock, label: 'Timeline' },
  { id: 'about', icon: Building2, label: 'About' },
]

// ----- Page Header -----
function PageHeader() {
  return (
    <div className="relative overflow-hidden bg-secondary pb-8 pt-28 sm:pt-32 md:pb-12">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/20"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.span
          className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Start Your Project
        </motion.span>

        <motion.h1
          className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let's Build Something <span className="text-primary">Amazing</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Answer a few quick questions about your project and get a personalized proposal from our team.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {['2 minutes', '100% Free', 'No commitment'].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white"
            >
              <CheckCircle2 className="h-4 w-4 text-green-300" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ----- Vertical Step Indicator (desktop) -----
function StepIndicator({
  currentStepIndex,
  completedSteps,
}: {
  currentStepIndex: number
  completedSteps: number[]
}) {
  const formStepIndex = currentStepIndex - 1

  return (
    <div className="sticky top-32 flex flex-col items-center">
      {FORM_STEPS.map((step, i) => {
        const Icon = step.icon
        const isActive = formStepIndex === i
        const isCompleted = completedSteps.includes(i)

        return (
          <div key={step.id}>
            {/* Step row: icon + label */}
            <div className="flex items-center gap-3">
              <motion.div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                  isActive
                    ? 'bg-white shadow-lg'
                    : isCompleted
                      ? 'bg-green-400'
                      : 'bg-white/20'
                )}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                ) : (
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isActive ? 'text-secondary' : 'text-black/30'
                    )}
                  />
                )}
              </motion.div>
              <span
                className={cn(
                  'text-sm font-bold whitespace-nowrap',
                  isActive
                    ? 'text-secondary'
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-black/40'
                )}
              >
                {step.label}
              </span>
            </div>
            {/* Vertical connecting line */}
            {i < FORM_STEPS.length - 1 && (
              <div className="ml-5 flex justify-center py-1">
                <div
                  className={cn(
                    'h-8 w-0.5 rounded-full',
                    i < formStepIndex ? 'bg-green-400' : 'bg-black/10'
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ----- Mobile Step Indicator (horizontal) -----
function MobileStepIndicator({
  currentStepIndex,
  completedSteps,
}: {
  currentStepIndex: number
  completedSteps: number[]
}) {
  const formStepIndex = currentStepIndex - 1

  return (
    <div className="flex items-center justify-center gap-3">
      {FORM_STEPS.map((step, i) => {
        const isActive = formStepIndex === i
        const isCompleted = completedSteps.includes(i)

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all text-xs font-bold',
                  isActive
                    ? 'bg-secondary text-white shadow-md'
                    : isCompleted
                      ? 'bg-green-400 text-white'
                      : 'bg-black/10 text-black/40'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  'mt-1 text-[10px] font-bold',
                  isActive
                    ? 'text-secondary'
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-black/40'
                )}
              >
                {step.label}
              </span>
            </div>
            {/* Connecting line */}
            {i < FORM_STEPS.length - 1 && (
              <div className="mx-1.5 h-0.5 w-6 sm:mx-2 sm:w-10">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    i < formStepIndex ? 'bg-green-400' : 'bg-black/10'
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ----- Step 1: Tell Us About Your Project -----
function ProjectStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: WizardData
  onChange: (field: string, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const canProceed = data.projectDescription.trim() && data.industry && data.targetAudience

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Target className="h-8 w-8 text-secondary" />
        </motion.div>
        <h2 className="text-2xl font-black text-black">Tell Us About Your Project</h2>
        <p className="mt-1 text-sm text-black/60">Your goals, industry, and audience</p>
      </div>

      <div className="space-y-5">
        {/* Project Description */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Project Description *</label>
          <textarea
            value={data.projectDescription}
            onChange={(e) => onChange('projectDescription', e.target.value)}
            placeholder="E.g., I want to build an e-commerce website for my clothing brand..."
            rows={3}
            className="w-full rounded-xl border-2 border-black/10 bg-white p-4 text-sm focus:border-secondary focus:outline-none resize-none"
          />
        </div>

        {/* Industry dropdown */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Industry *</label>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon
              const isSelected = data.industry === industry.id
              return (
                <motion.button
                  key={industry.id}
                  onClick={() => onChange('industry', industry.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn('h-5 w-5', isSelected ? 'text-secondary' : 'text-black/40')} />
                  <span className="text-xs font-bold text-black">{industry.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Target Audience *</label>
          <div className="grid grid-cols-2 gap-2">
            {AUDIENCES.map((audience) => {
              const isSelected = data.targetAudience === audience.id
              return (
                <motion.button
                  key={audience.id}
                  onClick={() => onChange('targetAudience', audience.id)}
                  className={cn(
                    'flex flex-col items-start rounded-xl border-2 p-4 transition-all text-left',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-bold text-black">{audience.label}</span>
                  <span className="text-xs text-black/50">{audience.desc}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-base text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white disabled:opacity-50"
          whileHover={{ scale: canProceed ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ----- Step 2: What Do You Need? -----
function NeedsStep({
  data,
  onChange,
  onToggleFeature,
  onNext,
  onBack,
}: {
  data: WizardData
  onChange: (field: string, value: string) => void
  onToggleFeature: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const canProceed = data.serviceType && data.designStyle

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Code2 className="h-8 w-8 text-secondary" />
        </motion.div>
        <h2 className="text-2xl font-black text-black">What Do You Need?</h2>
        <p className="mt-1 text-sm text-black/60">Service, features, and design preference</p>
      </div>

      <div className="space-y-5">
        {/* Service Type */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Service Type *</label>
          <div className="grid grid-cols-3 gap-2">
            {SERVICES.map((service) => {
              const Icon = service.icon
              const isSelected = data.serviceType === service.id
              return (
                <motion.button
                  key={service.id}
                  onClick={() => onChange('serviceType', service.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn('h-5 w-5', isSelected ? 'text-secondary' : 'text-black/40')} />
                  <span className="text-xs font-bold text-black">{service.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Features (multi-select) */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Features (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              const isSelected = data.features.includes(feature.id)
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => onToggleFeature(feature.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-2 p-3 transition-all text-left',
                    isSelected
                      ? 'border-secondary bg-secondary/10'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                      isSelected ? 'bg-secondary text-white' : 'bg-black/5 text-black/40'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-black">{feature.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Design Style */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Design Style *</label>
          <div className="grid grid-cols-3 gap-2">
            {DESIGN_STYLES.map((style) => {
              const Icon = style.icon
              const isSelected = data.designStyle === style.id
              return (
                <motion.button
                  key={style.id}
                  onClick={() => onChange('designStyle', style.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn('h-5 w-5', isSelected ? 'text-secondary' : 'text-black/40')} />
                  <span className="text-xs font-bold text-black">{style.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-base text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white disabled:opacity-50"
          whileHover={{ scale: canProceed ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ----- Step 3: Timeline & Budget -----
function TimelineBudgetStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: WizardData
  onChange: (field: string, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const canProceed = data.timeline && data.budget

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl font-bold text-secondary">
            {CURRENCIES.find((c) => c.id === data.currency)?.symbol ?? '$'}
          </span>
        </motion.div>
        <h2 className="text-2xl font-black text-black">Timeline & Budget</h2>
        <p className="mt-1 text-sm text-black/60">When and how much?</p>
      </div>

      <div className="space-y-5">
        {/* Timeline */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Timeline *</label>
          <div className="grid grid-cols-2 gap-2">
            {TIMELINES.map((timeline) => {
              const isSelected = data.timeline === timeline.id
              return (
                <motion.button
                  key={timeline.id}
                  onClick={() => onChange('timeline', timeline.id)}
                  className={cn(
                    'flex flex-col items-start rounded-xl border-2 p-4 transition-all text-left',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-bold text-black">{timeline.label}</span>
                  <span className="text-xs text-black/50">{timeline.desc}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Currency selector */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Currency</label>
          <div className="flex gap-2">
            {CURRENCIES.map((cur) => {
              const isSelected = data.currency === cur.id
              return (
                <button
                  key={cur.id}
                  onClick={() => {
                    onChange('currency', cur.id)
                    // Reset budget when currency changes so the user picks a new range
                    onChange('budget', '')
                  }}
                  className={cn(
                    'flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-black/10 text-black/60 hover:border-secondary/50'
                  )}
                >
                  {cur.symbol} {cur.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Budget options */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Budget Range *</label>
          <div className="space-y-2">
            {BUDGET_OPTIONS[data.currency].map((budget) => {
              const isSelected = data.budget === budget.id
              return (
                <motion.button
                  key={budget.id}
                  onClick={() => onChange('budget', budget.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all',
                    isSelected
                      ? 'border-secondary bg-secondary/10 shadow-md'
                      : 'border-black/10 bg-white hover:border-secondary/50'
                  )}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full border-2',
                        isSelected ? 'border-secondary bg-secondary' : 'border-black/20'
                      )}
                    >
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-base font-bold text-black">{budget.label}</span>
                  </div>
                  <span className="text-sm text-black/50">{budget.desc}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Inspiration URLs (optional) */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Inspiration Websites (optional)</label>
          <textarea
            value={data.inspirationUrls}
            onChange={(e) => onChange('inspirationUrls', e.target.value)}
            placeholder="E.g., www.apple.com, www.stripe.com..."
            rows={2}
            className="w-full rounded-xl border-2 border-black/10 bg-white p-4 text-sm focus:border-secondary focus:outline-none resize-none"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-base text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white disabled:opacity-50"
          whileHover={{ scale: canProceed ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ----- Step 4: About You -----
function AboutStep({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: {
  data: WizardData
  onChange: (field: string, value: string | boolean) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  error?: string | null
}) {
  const [emailError, setEmailError] = useState<string | null>(null)

  const isEmailValid = EMAIL_REGEX.test(data.email)
  const canSubmit = data.name.trim() && data.email.trim() && isEmailValid

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(data.email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError(null)
    onSubmit()
  }

  const handleEmailChange = (value: string) => {
    onChange('email', value)
    if (emailError && EMAIL_REGEX.test(value)) {
      setEmailError(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Building2 className="h-8 w-8 text-secondary" />
        </motion.div>
        <h2 className="text-2xl font-black text-black">About You</h2>
        <p className="mt-1 text-sm text-black/60">Company info and how to reach you</p>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Company/Project Name</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder="Your company name"
            className="h-12 w-full rounded-xl border-2 border-black/10 bg-white px-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        {/* Has Website */}
        <div>
          <label className="mb-1.5 block text-sm font-bold text-black">Do you have a website?</label>
          <div className="flex gap-3">
            <button
              onClick={() => onChange('hasWebsite', true)}
              className={cn(
                'flex-1 rounded-xl border-2 py-2.5 font-medium transition-all text-sm',
                data.hasWebsite
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-black/10 text-black/60 hover:border-secondary/50'
              )}
            >
              Yes
            </button>
            <button
              onClick={() => onChange('hasWebsite', false)}
              className={cn(
                'flex-1 rounded-xl border-2 py-2.5 font-medium transition-all text-sm',
                !data.hasWebsite
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-black/10 text-black/60 hover:border-secondary/50'
              )}
            >
              No
            </button>
          </div>
        </div>

        {data.hasWebsite && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <label className="mb-1.5 block text-sm font-bold text-black">Website URL</label>
            <input
              type="url"
              value={data.companyWebsite}
              onChange={(e) => onChange('companyWebsite', e.target.value)}
              placeholder="https://yourcompany.com"
              className="h-12 w-full rounded-xl border-2 border-black/10 bg-white px-4 text-sm focus:border-secondary focus:outline-none"
            />
          </motion.div>
        )}

        <hr className="border-black/10" />

        {/* Contact Info */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your Full Name *"
            className="h-12 w-full rounded-xl border-2 border-black/10 bg-white pl-12 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Email Address *"
              className={cn(
                'h-12 w-full rounded-xl border-2 bg-white pl-12 pr-4 text-sm focus:outline-none',
                emailError ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-secondary'
              )}
            />
          </div>
          {emailError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-red-500"
            >
              {emailError}
            </motion.p>
          )}
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Phone Number (Optional)"
            className="h-12 w-full rounded-xl border-2 border-black/10 bg-white pl-12 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-red-200 bg-red-50 p-3 text-center text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-base text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-base font-bold text-white disabled:opacity-50"
          whileHover={{ scale: canSubmit && !isSubmitting ? 1.02 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ----- Welcome Step -----
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <Sparkles className="h-12 w-12 text-white" />
      </motion.div>

      <h2 className="text-3xl font-black text-black md:text-4xl">
        Let's Build Something <span className="text-secondary">Amazing</span>
      </h2>

      <p className="mt-3 max-w-md text-base text-black/70">
        Answer a few quick questions about your project and get a personalized proposal from our team.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-black/60">
        <span className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" /> 2 minutes
        </span>
        <span className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" /> 100% Free
        </span>
        <span className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" /> No commitment
        </span>
      </div>

      <motion.button
        onClick={onNext}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-12 py-5 text-lg font-bold text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

// ----- Confetti -----
function Confetti() {
  const colors = ['#FFD93D', '#3366FF', '#10B981', '#EC4899', '#F97316', '#8B5CF6']
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: Math.random() * 0.5,
    startX: Math.random() * 100,
    rotation: Math.random() * 720,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute h-3 w-3 rounded-sm"
          style={{ backgroundColor: piece.color, left: `${piece.startX}%` }}
          initial={{ top: '50%', opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            top: ['-10%'],
            opacity: [1, 1, 0],
            rotate: [0, piece.rotation],
            x: [(Math.random() - 0.5) * 200],
            scale: [1, 0.5],
          }}
          transition={{ duration: 2, delay: piece.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ----- Complete Step -----
function CompleteStep({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Confetti />

      <motion.div
        className="relative mb-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <CheckCircle2 className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>

      <motion.h2
        className="text-3xl font-black text-black"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        You're All Set!
      </motion.h2>

      <motion.p
        className="mt-2 text-black/70"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Thank you for choosing <span className="font-bold text-secondary">IlyBo</span>
      </motion.p>

      <motion.div
        className="mt-5 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="h-6 w-6 text-white" />
          </motion.div>
          <div className="text-left">
            <p className="text-sm font-bold text-black">We'll contact you within</p>
            <p className="text-xl font-black text-secondary">24 Hours</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={onDone}
        className="mt-6 rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-10 py-4 text-lg font-bold text-white shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Done
      </motion.button>
    </motion.div>
  )
}

// ----- Resume Dialog -----
function ResumeDialog({
  onResume,
  onStartOver,
}: {
  onResume: () => void
  onStartOver: () => void
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <RotateCcw className="h-12 w-12 text-secondary" />
      </motion.div>

      <h2 className="text-3xl font-black text-black">Welcome Back!</h2>

      <p className="mt-3 max-w-md text-base text-black/70">
        We found your previous progress. Would you like to continue where you left off?
      </p>

      <div className="mt-8 flex gap-4">
        <motion.button
          onClick={onStartOver}
          className="inline-flex items-center gap-2 rounded-full border-2 border-black/10 px-10 py-4 text-base font-bold text-black/70 hover:border-black/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Over
        </motion.button>
        <motion.button
          onClick={onResume}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-10 py-4 text-base font-bold text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Resume
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ===== localStorage helpers =====
function saveProgress(stepIndex: number, formData: WizardData) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stepIndex, formData, savedAt: Date.now() })
    )
  } catch {
    // localStorage may be unavailable — silently ignore
  }
}

function loadProgress(): { stepIndex: number; formData: WizardData } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.stepIndex === 'number' && parsed.formData) {
      return { stepIndex: parsed.stepIndex, formData: parsed.formData }
    }
  } catch {
    // corrupted data — ignore
  }
  return null
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ===== Main Wizard Page Component =====
export function ProjectWizardPage() {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const [savedProgress, setSavedProgress] = useState<{ stepIndex: number; formData: WizardData } | null>(null)
  const [formData, setFormData] = useState<WizardData>({ ...DEFAULT_FORM_DATA })

  // On mount, check for saved progress
  useEffect(() => {
    const progress = loadProgress()
    if (progress && progress.stepIndex > 0) {
      setSavedProgress(progress)
      setShowResumeDialog(true)
    }
  }, [])

  // Save progress on step change (only for active steps, not welcome/complete)
  useEffect(() => {
    if (currentStepIndex > 0 && currentStepIndex < STEPS.length - 1) {
      saveProgress(currentStepIndex, formData)
    }
  }, [currentStepIndex, formData])

  const currentStep = STEPS[currentStepIndex]

  const handleNext = useCallback(() => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }, [currentStepIndex])

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }, [currentStepIndex])

  const handleFieldChange = useCallback((field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleToggleFeature = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }))
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      // Build the budget label for the message
      const budgetOptions = BUDGET_OPTIONS[formData.currency]
      const budgetLabel = budgetOptions.find((b) => b.id === formData.budget)?.label || formData.budget

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.companyName,
            message: `
Project: ${formData.projectDescription}
Industry: ${formData.industry}
Target Audience: ${formData.targetAudience}
Service: ${formData.serviceType}
Features: ${formData.features.join(', ')}
Design Style: ${formData.designStyle}
Timeline: ${formData.timeline}
Budget: ${budgetLabel} (${formData.currency})
Inspiration: ${formData.inspirationUrls || 'N/A'}
Website: ${formData.companyWebsite || 'N/A'}
Phone: ${formData.phone || 'N/A'}
            `.trim(),
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || 'Failed to submit. Please try again.')
      }

      // Clear saved progress on successful submission
      clearProgress()
      setCurrentStepIndex(STEPS.length - 1)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetWizard = useCallback(() => {
    setCurrentStepIndex(0)
    setSubmitError(null)
    setShowResumeDialog(false)
    setSavedProgress(null)
    setFormData({ ...DEFAULT_FORM_DATA })
    clearProgress()
  }, [])

  const handleDone = useCallback(() => {
    resetWizard()
    navigate({ to: '/' })
  }, [resetWizard, navigate])

  const handleResume = useCallback(() => {
    if (savedProgress) {
      setFormData(savedProgress.formData)
      setCurrentStepIndex(savedProgress.stepIndex)
    }
    setShowResumeDialog(false)
    setSavedProgress(null)
  }, [savedProgress])

  const handleStartOver = useCallback(() => {
    resetWizard()
  }, [resetWizard])

  // Compute completed steps for StepIndicator
  const getCompletedSteps = (): number[] => {
    const completed: number[] = []
    const formStepIndex = currentStepIndex - 1 // 0-based form step
    for (let i = 0; i < formStepIndex && i < FORM_STEPS.length; i++) {
      completed.push(i)
    }
    return completed
  }

  const showStepIndicator =
    currentStep !== 'welcome' && currentStep !== 'complete' && !showResumeDialog

  return (
    <section className="min-h-screen bg-primary">
      {/* Hero Header */}
      <PageHeader />

      {/* Content */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-5xl gap-12">
            {/* Vertical Step Indicator — left side, desktop only */}
            {showStepIndicator && (
              <div className="hidden lg:block">
                <StepIndicator
                  currentStepIndex={currentStepIndex}
                  completedSteps={getCompletedSteps()}
                />
              </div>
            )}

            {/* Form Content */}
            <div className="mx-auto w-full max-w-3xl">
              {/* Mobile step indicator */}
              {showStepIndicator && (
                <div className="mb-8 lg:hidden">
                  <MobileStepIndicator
                    currentStepIndex={currentStepIndex}
                    completedSteps={getCompletedSteps()}
                  />
                </div>
              )}

              <AnimatePresence mode="wait">
                {showResumeDialog ? (
                  <ResumeDialog
                    key="resume"
                    onResume={handleResume}
                    onStartOver={handleStartOver}
                  />
                ) : (
                  <>
                    {currentStep === 'welcome' && <WelcomeStep key="welcome" onNext={handleNext} />}
                    {currentStep === 'project' && (
                      <ProjectStep
                        key="project"
                        data={formData}
                        onChange={handleFieldChange}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'needs' && (
                      <NeedsStep
                        key="needs"
                        data={formData}
                        onChange={handleFieldChange}
                        onToggleFeature={handleToggleFeature}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'timeline-budget' && (
                      <TimelineBudgetStep
                        key="timeline-budget"
                        data={formData}
                        onChange={handleFieldChange}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'about' && (
                      <AboutStep
                        key="about"
                        data={formData}
                        onChange={handleFieldChange}
                        onSubmit={handleSubmit}
                        onBack={handleBack}
                        isSubmitting={isSubmitting}
                        error={submitError}
                      />
                    )}
                    {currentStep === 'complete' && <CompleteStep key="complete" onDone={handleDone} />}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
