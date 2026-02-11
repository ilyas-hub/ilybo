import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Award, Users, Zap, Clock } from 'lucide-react'

const STATS = [
  { icon: Clock, value: 7, suffix: '+', label: 'Years of Experience' },
  { icon: Zap, value: 50, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 99, suffix: '%', label: 'Client Satisfaction' },
]

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const duration = 2000
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-20"
    >
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Icon className="h-8 w-8 text-secondary" />
                </motion.div>
                <div className="text-4xl font-black text-secondary md:text-5xl lg:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <p className="mt-2 text-sm font-medium text-black/70 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
