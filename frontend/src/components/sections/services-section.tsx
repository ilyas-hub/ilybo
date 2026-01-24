import { useRef } from 'react'
import {
  Globe,
  Smartphone,
  Palette,
  Cloud,
  GitBranch,
  Code2,
  Plug,
  Users,
  ArrowRight,
} from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { openProjectWizard } from './project-wizard-section'

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services.',
  },
  {
    icon: GitBranch,
    title: 'DevOps',
    description: 'Streamlined workflows with automated testing and deployment.',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored solutions for your unique business challenges.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Seamless integration of third-party services and APIs.',
  },
  {
    icon: Users,
    title: 'Technical Consulting',
    description: 'Expert guidance on technology strategy and architecture.',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary py-16 lg:py-24"
    >
      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white">
            Our Services
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            What We Build
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            Comprehensive software development services to bring your vision to life
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <motion.div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="h-6 w-6 text-secondary" />
                </motion.div>
                <h3 className="text-lg font-bold text-black group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-black/60">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={openProjectWizard}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-white transition-colors hover:bg-secondary/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Talk About Your Project
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
