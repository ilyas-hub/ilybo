import { useRef } from 'react'
import { CheckCircle, Award, Users, Zap, type LucideIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useAboutContent } from '@/features/cms'

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Users,
  Zap,
}

const DEFAULT_FEATURES = [
  'Agile Development Methodology',
  'Dedicated Project Managers',
  'Transparent Communication',
  'Quality Assurance at Every Step',
  'Post-Launch Support',
  'Scalable Solutions',
]

const DEFAULT_STATS = [
  { icon: 'Award', value: '7+', label: 'Years of Excellence' },
  { icon: 'Users', value: '50+', label: 'Happy Clients' },
  { icon: 'Zap', value: '50+', label: 'Projects Delivered' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { about } = useAboutContent()

  const features = about?.features?.length ? about.features : DEFAULT_FEATURES
  const stats = about?.stats?.length ? about.stats : DEFAULT_STATS

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-secondary py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
              About IlyBo
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Why Choose <span className="text-primary">Us?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              We are a team of passionate developers, designers, and strategists
              dedicated to delivering exceptional digital solutions. Our
              approach combines technical expertise with creative innovation.
            </p>
            <p className="mt-4 text-white/60">
              With years of experience across various industries, we understand
              the unique challenges businesses face in the digital landscape.
            </p>

            {/* Features list */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <CheckCircle className="h-4 w-4 text-black" />
                  </motion.div>
                  <span className="text-sm font-medium text-white">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right side - Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl lg:p-12">
              <h3 className="text-2xl font-black text-black lg:text-3xl">
                Building Digital Excellence Since 2019
              </h3>
              <p className="mt-4 text-black/60">
                From startups to enterprises, we've helped businesses of all
                sizes achieve their digital goals.
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = ICON_MAP[stat.icon] || Award
                  return (
                    <motion.div
                      key={stat.label}
                      className="rounded-2xl bg-primary/40 p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <IconComponent className="mx-auto h-6 w-6 text-secondary" />
                      </motion.div>
                      <div className="mt-2 text-2xl font-black text-black lg:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-xs text-black/60">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 rounded-2xl bg-primary p-4 shadow-xl lg:-bottom-6 lg:-right-6 lg:p-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl font-black text-secondary lg:text-4xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  99%
                </motion.div>
                <div className="text-xs font-semibold text-black/70 lg:text-sm">
                  Client Satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
