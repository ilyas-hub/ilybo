import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiAmazonwebservices,
  SiDocker,
  SiGraphql,
  SiFlutter,
  SiTailwindcss,
  SiVuedotjs,
  SiFirebase,
  SiKubernetes,
  SiRedis,
  SiAngular,
  SiDjango,
} from 'react-icons/si'
import { ArrowRight } from 'lucide-react'
import { openProjectWizard } from './project-wizard-section'

// Main techs for static grid (2 rows x 7 = 14)
const MAIN_TECHS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
]

// Extra techs for marquee rows
const MARQUEE_TECHS_1 = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
]

const MARQUEE_TECHS_2 = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
]

// Marquee component
function TechMarquee({
  techs,
  direction = 'left',
  speed = 25
}: {
  techs: typeof MARQUEE_TECHS_1
  direction?: 'left' | 'right'
  speed?: number
}) {
  const duplicated = [...techs, ...techs, ...techs]

  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        className="flex items-center gap-6"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: { duration: speed, repeat: Infinity, ease: 'linear' },
        }}
      >
        {duplicated.map((tech, i) => {
          const Icon = tech.icon
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm"
            >
              <Icon className="h-5 w-5" style={{ color: tech.color }} />
              <span className="whitespace-nowrap text-sm font-bold text-black/70">
                {tech.name}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
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
            Our Tech Stack
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Technologies We <span className="text-secondary">Master</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            Industry-leading technologies to build scalable, secure applications
          </p>
        </motion.div>

        {/* Static Tech Grid - 2 rows with boxes and bouncing */}
        <div className="mx-auto mb-8 grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {MAIN_TECHS.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center justify-center rounded-2xl bg-primary/30 p-4 shadow-sm transition-shadow hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon
                    className="h-10 w-10 transition-transform group-hover:scale-110 md:h-12 md:w-12"
                    style={{ color: tech.color }}
                  />
                </motion.div>
                <span className="mt-2 text-center text-xs font-bold text-black/70">
                  {tech.name}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Moving Marquee Rows */}
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TechMarquee techs={MARQUEE_TECHS_1} direction="left" speed={30} />
          <TechMarquee techs={MARQUEE_TECHS_2} direction="right" speed={35} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={openProjectWizard}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-white transition-all hover:bg-secondary/90"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
