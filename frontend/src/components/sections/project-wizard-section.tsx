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
  Clock,
  MessageSquare,
  DollarSign,
  Building2,
  Target,
  Users,
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
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Global event for opening wizard from anywhere
const OPEN_WIZARD_EVENT = 'openProjectWizard'

export function openProjectWizard() {
  window.dispatchEvent(new CustomEvent(OPEN_WIZARD_EVENT))
}

// Step types
type StepId =
  | 'welcome'
  | 'project'
  | 'industry'
  | 'audience'
  | 'service'
  | 'features'
  | 'design'
  | 'timeline'
  | 'budget'
  | 'inspiration'
  | 'company'
  | 'contact'
  | 'complete'

interface WizardData {
  projectDescription: string
  industry: string
  targetAudience: string
  serviceType: string
  features: string[]
  designStyle: string
  timeline: string
  budget: string
  inspirationUrls: string
  companyName: string
  companyWebsite: string
  hasWebsite: boolean
  name: string
  email: string
  phone: string
}

const INDUSTRIES = [
  { id: 'ecommerce', icon: ShoppingCart, label: 'E-Commerce', desc: 'Online stores' },
  { id: 'healthcare', icon: Stethoscope, label: 'Healthcare', desc: 'Medical & health' },
  { id: 'education', icon: GraduationCap, label: 'Education', desc: 'Learning platforms' },
  { id: 'finance', icon: CreditCard, label: 'Finance', desc: 'Banking & fintech' },
  { id: 'realestate', icon: Home, label: 'Real Estate', desc: 'Property & housing' },
  { id: 'travel', icon: Plane, label: 'Travel', desc: 'Booking & tourism' },
  { id: 'food', icon: Utensils, label: 'Food & Restaurant', desc: 'Dining & delivery' },
  { id: 'fitness', icon: Dumbbell, label: 'Fitness', desc: 'Health & wellness' },
  { id: 'entertainment', icon: Gamepad2, label: 'Entertainment', desc: 'Media & gaming' },
  { id: 'automotive', icon: Car, label: 'Automotive', desc: 'Vehicles & transport' },
  { id: 'nonprofit', icon: Heart, label: 'Non-Profit', desc: 'Charity & social' },
  { id: 'other', icon: Briefcase, label: 'Other', desc: 'Something else' },
]

const AUDIENCES = [
  { id: 'b2c', label: 'Consumers (B2C)', desc: 'General public', icon: '👥' },
  { id: 'b2b', label: 'Businesses (B2B)', desc: 'Companies & enterprises', icon: '🏢' },
  { id: 'both', label: 'Both B2B & B2C', desc: 'Mixed audience', icon: '🤝' },
  { id: 'internal', label: 'Internal Team', desc: 'Company employees', icon: '👨‍💼' },
]

const SERVICES = [
  { id: 'web', icon: Globe, label: 'Web Development', desc: 'Websites & web apps' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile Apps', desc: 'iOS & Android' },
  { id: 'design', icon: Palette, label: 'UI/UX Design', desc: 'User experience' },
  { id: 'custom', icon: Code2, label: 'Custom Software', desc: 'Tailored solutions' },
  { id: 'cloud', icon: Cloud, label: 'Cloud Solutions', desc: 'Infrastructure' },
  { id: 'fullstack', icon: Zap, label: 'Full Stack', desc: 'End-to-end' },
]

const FEATURES = [
  { id: 'auth', icon: Lock, label: 'User Authentication', desc: 'Login & signup' },
  { id: 'payment', icon: CreditCard, label: 'Payment Gateway', desc: 'Online payments' },
  { id: 'dashboard', icon: BarChart3, label: 'Admin Dashboard', desc: 'Management panel' },
  { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Push & email alerts' },
  { id: 'search', icon: Search, label: 'Search & Filter', desc: 'Advanced search' },
  { id: 'social', icon: Share2, label: 'Social Integration', desc: 'Social media login' },
  { id: 'multilang', icon: Languages, label: 'Multi-Language', desc: 'Multiple languages' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', desc: 'Track user behavior' },
  { id: 'chat', icon: MessageSquare, label: 'Live Chat', desc: 'Real-time messaging' },
  { id: 'api', icon: Link, label: 'API Integration', desc: 'Third-party APIs' },
]

const DESIGN_STYLES = [
  { id: 'modern', icon: Layers, label: 'Modern & Minimal', desc: 'Clean and simple' },
  { id: 'bold', icon: Paintbrush, label: 'Bold & Creative', desc: 'Eye-catching design' },
  { id: 'corporate', icon: Briefcase, label: 'Professional', desc: 'Corporate & formal' },
  { id: 'playful', icon: Sparkles, label: 'Playful & Fun', desc: 'Vibrant & colorful' },
  { id: 'existing', icon: Monitor, label: 'Match Existing', desc: 'Follow brand guidelines' },
  { id: 'unsure', icon: Target, label: 'Need Guidance', desc: 'Help me decide' },
]

const TIMELINES = [
  { id: 'urgent', label: 'Within 2 weeks', icon: '⚡', desc: 'Rush project' },
  { id: 'soon', label: 'Within 1 month', icon: '🚀', desc: 'Fast track' },
  { id: 'planned', label: '1-3 months', icon: '📅', desc: 'Standard timeline' },
  { id: 'flexible', label: 'Flexible', icon: '🤔', desc: 'No rush' },
]

const BUDGETS = [
  { id: 'starter', label: '₹50K - ₹2L', desc: 'Small projects' },
  { id: 'growth', label: '₹2L - ₹5L', desc: 'Medium projects' },
  { id: 'scale', label: '₹5L - ₹15L', desc: 'Large projects' },
  { id: 'enterprise', label: '₹15L+', desc: 'Enterprise solutions' },
  { id: 'discuss', label: 'Let\'s discuss', desc: 'Not sure yet' },
]

const STEPS: StepId[] = [
  'welcome',
  'project',
  'industry',
  'audience',
  'service',
  'features',
  'design',
  'timeline',
  'budget',
  'inspiration',
  'company',
  'contact',
  'complete'
]

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
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <Sparkles className="h-10 w-10 text-white" />
      </motion.div>

      <h2 className="text-2xl font-black text-black md:text-3xl">
        Let's Build Something <span className="text-secondary">Amazing</span>
      </h2>

      <p className="mt-3 max-w-md text-black/70">
        Answer a few quick questions about your project and get a personalized proposal from our team.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-black/60">
        <span className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" /> 3 minutes
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
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-10 py-4 font-bold text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

// Project Description Step
function ProjectStep({
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
      <div className="mb-6 text-center">
        <motion.div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Target className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What's your project about?
        </h2>
        <p className="mt-1 text-sm text-black/60">
          Tell us about your goals and vision
        </p>
      </div>

      <div className="space-y-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="E.g., I want to build an e-commerce website for my clothing brand..."
          rows={4}
          className="w-full rounded-xl border-2 border-black/10 bg-white p-4 text-sm focus:border-secondary focus:outline-none resize-none"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value.trim() ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Industry Step
function IndustryStep({
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Briefcase className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What's your industry?
        </h2>
        <p className="mt-1 text-sm text-black/60">Select your business sector</p>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {INDUSTRIES.map((industry) => {
          const Icon = industry.icon
          const isSelected = value === industry.id
          return (
            <motion.button
              key={industry.id}
              onClick={() => onChange(industry.id)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all',
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

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Audience Step
function AudienceStep({
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Users className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          Who is your target audience?
        </h2>
        <p className="mt-1 text-sm text-black/60">Select your primary users</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {AUDIENCES.map((audience) => {
          const isSelected = value === audience.id
          return (
            <motion.button
              key={audience.id}
              onClick={() => onChange(audience.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl border-2 p-4 transition-all',
                isSelected
                  ? 'border-secondary bg-secondary/10 shadow-md'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{audience.icon}</span>
              <div className="text-left">
                <span className="block text-sm font-bold text-black">{audience.label}</span>
                <span className="text-xs text-black/50">{audience.desc}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Code2 className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What service do you need?
        </h2>
        <p className="mt-1 text-sm text-black/60">Select the primary service</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
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
                  ? 'border-secondary bg-secondary/10 shadow-md'
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

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Features Step (Multi-select)
function FeaturesStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string[]
  onChange: (value: string[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const toggleFeature = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(f => f !== id))
    } else {
      onChange([...value, id])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What features do you need?
        </h2>
        <p className="mt-1 text-sm text-black/60">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          const isSelected = value.includes(feature.id)
          return (
            <motion.button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 p-3 transition-all text-left',
                isSelected
                  ? 'border-secondary bg-secondary/10 shadow-md'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                isSelected ? 'bg-secondary text-white' : 'bg-black/5 text-black/40'
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-black">{feature.label}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white"
          whileHover={{ scale: 1.02 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Design Style Step
function DesignStep({
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Palette className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What's your design preference?
        </h2>
        <p className="mt-1 text-sm text-black/60">Choose a style direction</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {DESIGN_STYLES.map((style) => {
          const Icon = style.icon
          const isSelected = value === style.id
          return (
            <motion.button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                isSelected
                  ? 'border-secondary bg-secondary/10 shadow-md'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={cn('h-6 w-6', isSelected ? 'text-secondary' : 'text-black/40')} />
              <span className="text-xs font-bold text-black">{style.label}</span>
              <span className="text-[10px] text-black/50">{style.desc}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Clock className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          When do you want to start?
        </h2>
        <p className="mt-1 text-sm text-black/60">Select your timeline</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TIMELINES.map((timeline) => {
          const isSelected = value === timeline.id
          return (
            <motion.button
              key={timeline.id}
              onClick={() => onChange(timeline.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl border-2 p-4 transition-all',
                isSelected
                  ? 'border-secondary bg-secondary/10 shadow-md'
                  : 'border-black/10 bg-white hover:border-secondary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{timeline.icon}</span>
              <div className="text-left">
                <span className="block text-sm font-bold text-black">{timeline.label}</span>
                <span className="text-xs text-black/50">{timeline.desc}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Budget Step
function BudgetStep({
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <DollarSign className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          What's your budget range?
        </h2>
        <p className="mt-1 text-sm text-black/60">This helps us tailor solutions</p>
      </div>

      <div className="space-y-2">
        {BUDGETS.map((budget) => {
          const isSelected = value === budget.id
          return (
            <motion.button
              key={budget.id}
              onClick={() => onChange(budget.id)}
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
                <div className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border-2',
                  isSelected ? 'border-secondary bg-secondary' : 'border-black/20'
                )}>
                  {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
                <span className="font-bold text-black">{budget.label}</span>
              </div>
              <span className="text-sm text-black/50">{budget.desc}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!value}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: value ? 1.02 : 1 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Inspiration Step
function InspirationStep({
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
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Globe className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          Any inspiration websites?
        </h2>
        <p className="mt-1 text-sm text-black/60">Share websites you like (optional)</p>
      </div>

      <div className="space-y-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="E.g., www.apple.com, www.stripe.com..."
          rows={3}
          className="w-full rounded-xl border-2 border-black/10 bg-white p-4 text-sm focus:border-secondary focus:outline-none resize-none"
        />
        <p className="text-xs text-black/40">
          List any websites whose design or features you admire
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white"
          whileHover={{ scale: 1.02 }}
        >
          Next <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Company Step
function CompanyStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: { companyName: string; companyWebsite: string; hasWebsite: boolean }
  onChange: (field: string, value: string | boolean) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Building2 className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          Tell us about your company
        </h2>
        <p className="mt-1 text-sm text-black/60">Basic company information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-black/70">Company/Project Name</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder="Your company name"
            className="h-11 w-full rounded-xl border-2 border-black/10 bg-white px-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-black/70">Do you have a website?</label>
          <div className="flex gap-3">
            <button
              onClick={() => onChange('hasWebsite', true)}
              className={cn(
                'flex-1 rounded-xl border-2 py-3 font-medium transition-all',
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
                'flex-1 rounded-xl border-2 py-3 font-medium transition-all',
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <label className="mb-1 block text-sm font-medium text-black/70">Website URL</label>
            <input
              type="url"
              value={data.companyWebsite}
              onChange={(e) => onChange('companyWebsite', e.target.value)}
              placeholder="https://yourcompany.com"
              className="h-11 w-full rounded-xl border-2 border-black/10 bg-white px-4 text-sm focus:border-secondary focus:outline-none"
            />
          </motion.div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!data.companyName.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: data.companyName.trim() ? 1.02 : 1 }}
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
  error,
}: {
  data: { name: string; email: string; phone: string }
  onChange: (field: string, value: string) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  error?: string | null
}) {
  const isValid = data.name.trim() && data.email.trim()

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="mb-5 text-center">
        <motion.div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MessageSquare className="h-7 w-7 text-secondary" />
        </motion.div>
        <h2 className="text-xl font-black text-black">
          How can we reach you?
        </h2>
        <p className="mt-1 text-sm text-black/60">We'll send your proposal here</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your Full Name *"
            className="h-11 w-full rounded-xl border-2 border-black/10 bg-white pl-12 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Email Address *"
            className="h-11 w-full rounded-xl border-2 border-black/10 bg-white pl-12 pr-4 text-sm focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Phone Number (Optional)"
            className="h-11 w-full rounded-xl border-2 border-black/10 bg-white pl-12 pr-4 text-sm focus:border-secondary focus:outline-none"
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

      <div className="mt-5 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-black/60 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <motion.button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Confetti
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

// Complete Step
function CompleteStep({ onClose }: { onClose: () => void }) {
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
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <CheckCircle2 className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>

      <div className="mb-3 flex items-center gap-2">
        <motion.span className="text-2xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>🎉</motion.span>
        <motion.span className="text-3xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>🏆</motion.span>
        <motion.span className="text-2xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>🎉</motion.span>
      </div>

      <motion.h2 className="text-2xl font-black text-black" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        You're All Set!
      </motion.h2>

      <motion.p className="mt-2 text-black/70" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        Thank you for choosing <span className="font-bold text-secondary">IlyBo</span>
      </motion.p>

      <motion.div
        className="mt-5 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="h-5 w-5 text-white" />
          </motion.div>
          <div className="text-left">
            <p className="text-sm font-bold text-black">We'll contact you within</p>
            <p className="text-xl font-black text-secondary">24 Hours</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={onClose}
        className="mt-6 rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-8 py-3 font-bold text-white shadow-xl"
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

// Progress bar
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100
  return (
    <div className="mb-4 pr-10">
      <div className="mb-1 flex items-center justify-between text-xs text-black/50">
        <span>Step {current} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-secondary/70"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

// Main Wizard Component
export function ProjectWizardSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<WizardData>({
    projectDescription: '',
    industry: '',
    targetAudience: '',
    serviceType: '',
    features: [],
    designStyle: '',
    timeline: '',
    budget: '',
    inspirationUrls: '',
    companyName: '',
    companyWebsite: '',
    hasWebsite: false,
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener(OPEN_WIZARD_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_WIZARD_EVENT, handleOpen)
  }, [])

  const currentStep = STEPS[currentStepIndex]
  const totalSteps = STEPS.length - 2 // Exclude welcome and complete

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

  const handleFieldChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
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
Budget: ${formData.budget}
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

      setCurrentStepIndex(STEPS.length - 1)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentStepIndex(0)
    setSubmitError(null)
    setFormData({
      projectDescription: '',
      industry: '',
      targetAudience: '',
      serviceType: '',
      features: [],
      designStyle: '',
      timeline: '',
      budget: '',
      inspirationUrls: '',
      companyName: '',
      companyWebsite: '',
      hasWebsite: false,
      name: '',
      email: '',
      phone: '',
    })
  }

  const getStepNumber = () => {
    const stepMap: Record<StepId, number> = {
      welcome: 0,
      project: 1,
      industry: 2,
      audience: 3,
      service: 4,
      features: 5,
      design: 6,
      timeline: 7,
      budget: 8,
      inspiration: 9,
      company: 10,
      contact: 11,
      complete: 12,
    }
    return stepMap[currentStep]
  }

  return (
    <>
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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

      {/* Wizard Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose()
            }}
          >
            <motion.div
              className="relative flex w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl md:flex-row"
              style={{ maxHeight: '90vh' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Left side - decorative */}
              <div className="relative hidden w-2/5 bg-secondary p-6 lg:flex lg:flex-col lg:justify-between overflow-hidden rounded-l-3xl">
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
                <div className="relative text-white">
                  <h3 className="text-xl font-black">Let's Build Something Amazing</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Fill out this form and we'll get back to you within 24 hours.
                  </p>
                </div>
                <div className="relative space-y-2">
                  {['Free consultation', 'No commitment', 'Expert guidance'].map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-2 text-white"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right side - form with scroll */}
              <div className="relative flex-1 flex flex-col overflow-hidden rounded-r-3xl">
                {/* Close button - fixed position */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black transition-all hover:bg-black/10"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Progress bar */}
                  {currentStep !== 'welcome' && currentStep !== 'complete' && (
                    <ProgressBar current={getStepNumber()} total={totalSteps} />
                  )}

                  {/* Step content */}
                  <div className="flex min-h-[400px] items-center justify-center py-2">
                    <AnimatePresence mode="wait">
                    {currentStep === 'welcome' && <WelcomeStep key="welcome" onNext={handleNext} />}
                    {currentStep === 'project' && (
                      <ProjectStep
                        key="project"
                        value={formData.projectDescription}
                        onChange={(value) => handleFieldChange('projectDescription', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'industry' && (
                      <IndustryStep
                        key="industry"
                        value={formData.industry}
                        onChange={(value) => handleFieldChange('industry', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'audience' && (
                      <AudienceStep
                        key="audience"
                        value={formData.targetAudience}
                        onChange={(value) => handleFieldChange('targetAudience', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
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
                    {currentStep === 'features' && (
                      <FeaturesStep
                        key="features"
                        value={formData.features}
                        onChange={(value) => handleFieldChange('features', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'design' && (
                      <DesignStep
                        key="design"
                        value={formData.designStyle}
                        onChange={(value) => handleFieldChange('designStyle', value)}
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
                    {currentStep === 'budget' && (
                      <BudgetStep
                        key="budget"
                        value={formData.budget}
                        onChange={(value) => handleFieldChange('budget', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'inspiration' && (
                      <InspirationStep
                        key="inspiration"
                        value={formData.inspirationUrls}
                        onChange={(value) => handleFieldChange('inspirationUrls', value)}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 'company' && (
                      <CompanyStep
                        key="company"
                        data={{
                          companyName: formData.companyName,
                          companyWebsite: formData.companyWebsite,
                          hasWebsite: formData.hasWebsite,
                        }}
                        onChange={handleFieldChange}
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
                        }}
                        onChange={handleFieldChange}
                        onSubmit={handleSubmit}
                        onBack={handleBack}
                        isSubmitting={isSubmitting}
                        error={submitError}
                      />
                    )}
                    {currentStep === 'complete' && <CompleteStep key="complete" onClose={handleClose} />}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
