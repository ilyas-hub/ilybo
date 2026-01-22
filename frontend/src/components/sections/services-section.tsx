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
import { Card, CardHeader, CardTitle, CardDescription } from '@/lib/ui'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom web applications built with modern frameworks and best practices for optimal performance.',
    color: 'group-hover:bg-secondary group-hover:text-secondary-foreground',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    color: 'group-hover:bg-primary group-hover:text-primary-foreground',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centered design that combines aesthetics with functionality for intuitive interfaces.',
    color: 'group-hover:bg-accent group-hover:text-accent-foreground',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and migration services for modern businesses.',
    color: 'group-hover:bg-secondary group-hover:text-secondary-foreground',
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    description:
      'Streamlined development workflows with automated testing and deployment pipelines.',
    color: 'group-hover:bg-primary group-hover:text-primary-foreground',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Tailored software solutions designed to address your unique business challenges.',
    color: 'group-hover:bg-accent group-hover:text-accent-foreground',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description:
      'Seamless integration of third-party services and APIs to extend your capabilities.',
    color: 'group-hover:bg-secondary group-hover:text-secondary-foreground',
  },
  {
    icon: Users,
    title: 'Technical Consulting',
    description:
      'Expert guidance on technology strategy, architecture, and digital transformation.',
    color: 'group-hover:bg-primary group-hover:text-primary-foreground',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-20 lg:py-32"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -right-20 top-20 hidden lg:block"
        initial={{ opacity: 0, rotate: 45 }}
        animate={isInView ? { opacity: 0.1, rotate: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M150 50 L250 150 L150 250 L50 150 Z"
            stroke="hsl(var(--secondary))"
            strokeWidth="20"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Our Services
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
            What We
            <span className="text-primary"> Build</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Comprehensive software development services to bring your vision to
            life
          </p>
        </motion.div>

        {/* Services grid with staggered animation */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service, index) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="group h-full cursor-pointer border-2 border-transparent bg-card transition-all duration-300 hover:-translate-y-2 hover:border-secondary hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <motion.div
                    className={cn(
                      'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-all duration-300',
                      service.color
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="h-7 w-7" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm font-semibold text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="mb-6 text-lg text-muted-foreground">
            Don't see what you need? We offer custom solutions too.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk About Your Project
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
