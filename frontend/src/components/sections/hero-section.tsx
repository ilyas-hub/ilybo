import { ArrowRight, Play, Star, Users, Zap } from 'lucide-react'
import { Button } from '@/lib/ui'
import { motion } from 'motion/react'
import { openProjectWizard } from './project-wizard-section'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-primary pt-24">
      {/* Subtle background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-40 bottom-40 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2"
            >
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-black">
                Trusted by 100+ businesses worldwide
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-4xl font-black leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Build{' '}
              <span className="text-secondary">Digital</span>
              <br />
              Products That
              <br />
              <span className="text-secondary">Matter</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-black/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We transform your ideas into powerful software solutions. From
              concept to launch, we're your trusted technology partner.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="h-14 rounded-full bg-secondary px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl"
                onClick={openProjectWizard}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-2 border-black/20 bg-white/50 px-8 text-base font-bold text-black transition-all hover:bg-white"
                asChild
              >
                <a href="#how-it-works">
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </a>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['JD', 'MK', 'AS', 'RB'].map((initials, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-black text-xs font-bold text-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="ml-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-sm text-black/60">50+ happy clients</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Simple card */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative z-10 overflow-hidden rounded-3xl bg-white p-8 shadow-2xl">
                {/* Dashboard header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-black">Project Dashboard</h3>
                    <p className="text-sm text-black/50">Real-time analytics</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-primary/30 p-4">
                    <Users className="mb-2 h-6 w-6 text-secondary" />
                    <p className="text-2xl font-black text-black">2,847</p>
                    <p className="text-xs text-black/50">Active users</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/10 p-4">
                    <Zap className="mb-2 h-6 w-6 text-secondary" />
                    <p className="text-2xl font-black text-black">99.9%</p>
                    <p className="text-xs text-black/50">Uptime</p>
                  </div>
                </div>

                {/* Chart placeholder */}
                <div className="h-32 overflow-hidden rounded-xl bg-gradient-to-r from-primary/40 to-secondary/20">
                  <svg className="h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M0,80 C50,60 100,90 150,50 C200,10 250,40 300,30 C350,20 400,50 400,40 L400,100 L0,100 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M0,80 C50,60 100,90 150,50 C200,10 250,40 300,30 C350,20 400,50 400,40"
                      fill="none"
                      stroke="hsl(220 91% 54%)"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(220 91% 54%)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(48 100% 62%)" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 z-20 rounded-2xl bg-secondary p-5 shadow-xl">
                <p className="text-4xl font-black text-primary">5+</p>
                <p className="text-sm text-white/90">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-4 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { value: '50+', label: 'Projects' },
            { value: '99%', label: 'Satisfaction' },
            { value: '5+', label: 'Years' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/50 p-4 text-center">
              <div className="text-2xl font-black text-black">{stat.value}</div>
              <div className="text-xs text-black/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
