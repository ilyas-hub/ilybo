import { useRef, useState } from 'react'
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
  X,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'motion/react'
import { openProjectWizard } from './project-wizard-section'

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks.',
    fullDescription: 'We craft high-performance web applications that scale with your business. From complex enterprise platforms to sleek consumer-facing products, we leverage modern architectures to deliver exceptional user experiences.',
    features: ['Single Page Applications', 'Progressive Web Apps', 'E-commerce Platforms', 'Custom CMS Solutions'],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    color: '#3366FF',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications.',
    fullDescription: 'Build stunning mobile experiences that users love. We develop native and cross-platform apps with smooth animations, offline support, and seamless device integration.',
    features: ['iOS & Android Apps', 'Cross-platform Development', 'App Store Optimization', 'Push Notifications'],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    color: '#10B981',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality.',
    fullDescription: 'Design is more than pixels—it\'s about creating intuitive experiences. We blend research, creativity, and strategy to craft interfaces that delight users and drive results.',
    features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    color: '#F59E0B',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services.',
    fullDescription: 'Future-proof your infrastructure with cloud-native solutions. We design, migrate, and optimize cloud architectures that balance performance, security, and cost efficiency.',
    features: ['Cloud Migration', 'Auto-scaling Setup', 'Cost Optimization', '24/7 Monitoring'],
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Firebase'],
    color: '#8B5CF6',
  },
  {
    icon: GitBranch,
    title: 'DevOps',
    description: 'Streamlined workflows with automated testing and deployment.',
    fullDescription: 'Ship faster with confidence. We implement robust CI/CD pipelines, infrastructure as code, and automated testing to accelerate your development lifecycle.',
    features: ['CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code', 'Automated Testing'],
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    color: '#EC4899',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored solutions for your unique business challenges.',
    fullDescription: 'When off-the-shelf doesn\'t cut it, we build custom. From internal tools to customer-facing platforms, we engineer solutions that fit your exact requirements.',
    features: ['Requirements Analysis', 'Custom Development', 'System Integration', 'Maintenance & Support'],
    technologies: ['Python', 'Java', '.NET', 'Go'],
    color: '#14B8A6',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Seamless integration of third-party services and APIs.',
    fullDescription: 'Connect your digital ecosystem. We specialize in integrating disparate systems, payment gateways, and third-party services into unified, efficient workflows.',
    features: ['REST & GraphQL APIs', 'Payment Gateways', 'CRM Integration', 'Data Synchronization'],
    technologies: ['GraphQL', 'REST', 'Webhooks', 'OAuth'],
    color: '#F97316',
  },
  {
    icon: Users,
    title: 'Technical Consulting',
    description: 'Expert guidance on technology strategy and architecture.',
    fullDescription: 'Navigate complex technology decisions with confidence. Our consultants bring decades of combined experience to help you choose the right tools, architecture, and approach.',
    features: ['Technology Audit', 'Architecture Review', 'Team Training', 'Strategy Planning'],
    technologies: ['System Design', 'Code Review', 'Best Practices', 'Security'],
    color: '#6366F1',
  },
]

interface ServiceCardProps {
  service: typeof SERVICES[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  hasExpandedCard: boolean
  isInView: boolean
}

function ServiceCard({ service, index, isExpanded, onToggle, hasExpandedCard, isInView }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <motion.div
      layout
      className={`
        relative cursor-pointer rounded-2xl bg-white overflow-hidden
        ${isExpanded ? 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 z-10' : 'col-span-1'}
        ${hasExpandedCard && !isExpanded ? 'opacity-50' : 'opacity-100'}
      `}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? {
        opacity: hasExpandedCard && !isExpanded ? 0.5 : 1,
        y: 0,
        scale: 1
      } : {}}
      transition={{
        duration: 0.5,
        delay: isInView ? index * 0.08 : 0,
        layout: { duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }
      }}
      whileHover={!isExpanded ? {
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      } : {}}
      onClick={() => !isExpanded && onToggle()}
      style={{
        boxShadow: isExpanded
          ? `0 25px 50px -12px ${service.color}30`
          : '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed Card
          <motion.div
            key="collapsed"
            className="p-6 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: service.color + '20' }}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              whileHover={{ rotate: 10, scale: 1.2 }}
            >
              <Icon className="h-6 w-6" style={{ color: service.color }} />
            </motion.div>
            <h3 className="text-lg font-bold text-black group-hover:text-secondary transition-colors">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-black/60 line-clamp-2">{service.description}</p>
            <motion.div
              className="mt-4 flex items-center gap-1 text-sm font-bold"
              style={{ color: service.color }}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 5 }}
            >
              Learn more <ChevronRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
        ) : (
          // Expanded Card
          <motion.div
            key="expanded"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with colored background */}
            <div
              className="relative p-6 overflow-hidden"
              style={{ backgroundColor: service.color + '10' }}
            >
              {/* Decorative circles */}
              <motion.div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
                style={{ backgroundColor: service.color }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Close button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black/70 transition-colors hover:bg-black/20 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>

              <div className="relative flex items-start gap-4">
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
                  style={{ backgroundColor: service.color }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-xl font-black text-black">{service.title}</h3>
                  <p className="mt-1 text-sm text-black/70">{service.fullDescription}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-4">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Features */}
                <div>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-black/50">
                    What We Offer
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-black/80"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                      >
                        <CheckCircle
                          className="h-4 w-4 shrink-0"
                          style={{ color: service.color }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-black/50">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: service.color }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.08, type: 'spring' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                  setTimeout(() => openProjectWizard(), 300)
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition-all"
                style={{ backgroundColor: service.color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

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
        <LayoutGroup>
          <motion.div
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr"
            layout
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
                hasExpandedCard={expandedIndex !== null}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </LayoutGroup>

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
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
