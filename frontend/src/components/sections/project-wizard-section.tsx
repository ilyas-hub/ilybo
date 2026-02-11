import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { START_PROJECT_PATH } from './open-project-wizard'

export function ProjectWizardSection() {
  return (
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
          <Link to={START_PROJECT_PATH}>
            <motion.span
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 font-bold text-black shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-5 w-5" />
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
