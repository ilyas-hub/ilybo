import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePublicFAQs } from '@/features/cms'

const FALLBACK_FAQS = [
  {
    question: 'How long does it take to build a project?',
    answer: 'Project timelines vary based on complexity. A simple MVP typically takes 4-8 weeks, while larger projects may take 3-6 months. We provide detailed timelines during our initial consultation after understanding your requirements.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern technologies including React, Next.js, Node.js, Python, Flutter, and cloud platforms like AWS and Firebase. We choose the best tech stack based on your project needs, scalability requirements, and budget.',
  },
  {
    question: 'How much does a project cost?',
    answer: 'Project costs depend on scope, complexity, and timeline. Our projects typically range from ₹50K for simple MVPs to ₹15L+ for enterprise solutions. We offer transparent pricing and provide detailed quotes after understanding your requirements.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes! We offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, and feature enhancements. We have flexible support packages ranging from basic maintenance to dedicated support teams.',
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className={cn(
          'flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left transition-all',
          isOpen ? 'bg-secondary text-white' : 'bg-white text-black hover:bg-primary/50'
        )}
      >
        <span className="text-lg font-bold">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            isOpen ? 'bg-white/20' : 'bg-secondary/10'
          )}
        >
          {isOpen ? (
            <Minus className={cn('h-5 w-5', isOpen ? 'text-white' : 'text-secondary')} aria-hidden="true" />
          ) : (
            <Plus className="h-5 w-5 text-secondary" aria-hidden="true" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="rounded-b-2xl bg-white px-5 pb-5 pt-4">
              <p className="text-black/90 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const { data, isLoading } = usePublicFAQs()
  const faqs = data?.data || FALLBACK_FAQS

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Split FAQs into two columns
  const leftFAQs = faqs.filter((_, i) => i % 2 === 0)
  const rightFAQs = faqs.filter((_, i) => i % 2 === 1)

  return (
    <section
      id="faq"
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
            FAQ
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            Everything you need to know about working with us
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/50" />
              ))}
            </div>
          </div>
        )}

        {/* FAQ Grid - Two columns on desktop */}
        {!isLoading && (
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {leftFAQs.map((faq, i) => {
                  const actualIndex = i * 2
                  return (
                    <FAQItem
                      key={actualIndex}
                      faq={faq}
                      isOpen={openIndex === actualIndex}
                      onToggle={() => handleToggle(actualIndex)}
                      index={actualIndex}
                    />
                  )
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {rightFAQs.map((faq, i) => {
                  const actualIndex = i * 2 + 1
                  return (
                    <FAQItem
                      key={actualIndex}
                      faq={faq}
                      isOpen={openIndex === actualIndex}
                      onToggle={() => handleToggle(actualIndex)}
                      index={actualIndex}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="mb-4 text-black/70">Still have questions?</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-white transition-all hover:bg-secondary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💬
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
