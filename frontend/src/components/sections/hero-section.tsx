import { ArrowRight, Eye, Volume2 } from 'lucide-react'
import { Button } from '@/lib/ui'
import { motion } from 'motion/react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-primary pt-20">
      {/* Animated decorative geometric shapes - Banky.io style */}
      {/* Right side zigzag path */}
      <motion.div
        className="absolute right-0 top-0 hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg
          width="500"
          height="800"
          viewBox="0 0 500 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          <motion.path
            d="M100 0 L100 150 L400 350 L400 550 L200 650 L200 800"
            stroke="white"
            strokeWidth="50"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Left side geometric shape */}
      <motion.div
        className="absolute -left-20 bottom-20 hidden lg:block"
        initial={{ opacity: 0, x: -100, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30"
        >
          <motion.path
            d="M50 350 L50 200 L200 200 L200 50 L350 50"
            stroke="white"
            strokeWidth="45"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Floating pentagon shape - top right */}
      <motion.div
        className="absolute right-20 top-40 hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-25"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M75 10 L140 55 L115 130 L35 130 L10 55 Z"
            stroke="white"
            strokeWidth="8"
            fill="none"
          />
        </motion.svg>
      </motion.div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <div className="relative z-10">
            {/* Main headline - styled like banky */}
            <motion.h1
              className="text-5xl font-black uppercase tracking-tight text-secondary sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ILYBO*
            </motion.h1>
            <motion.h2
              className="mt-2 text-4xl font-black uppercase tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              YOUR DIGITAL
              <br />
              PARTNER!
            </motion.h2>

            {/* Dictionary style definition */}
            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <span className="text-secondary">*</span>
                <span className="font-mono">[ il-ee-bo ]</span>
                <button className="rounded-full p-1 transition-colors hover:bg-primary-foreground/10">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="border-l-2 border-primary-foreground/30 pl-3 text-sm text-primary-foreground/70">
                <span className="italic">verb</span> (ilybo-fies, ilybo-fying)
              </p>
              <p className="max-w-md text-lg text-primary-foreground/90">
                Transform your business with cutting-edge software solutions.{' '}
                <span className="italic">
                  "My business is finally ilybo-fied!"
                </span>
              </p>
            </motion.div>

            {/* CTA Button - Similar to banky's "How it works" button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Button
                size="lg"
                className="group rounded-full bg-secondary px-8 py-6 text-lg font-semibold text-secondary-foreground shadow-lg transition-all hover:scale-105 hover:bg-secondary/90 hover:shadow-xl"
                asChild
              >
                <a href="#how-it-works" className="flex items-center gap-3">
                  <span>
                    <span className="block text-base font-bold">
                      How Ilybo works
                    </span>
                    <span className="block text-sm font-normal opacity-80">
                      In 4 simple steps
                    </span>
                  </span>
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye className="h-5 w-5" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Stats cards with enhanced animations */}
          <div className="relative hidden lg:block">
            <div className="absolute -right-10 top-20 space-y-6">
              {/* Floating stat cards with staggered animations */}
              <motion.div
                className="rounded-2xl bg-white p-6 shadow-xl"
                initial={{ opacity: 0, x: 100, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div
                  className="text-4xl font-black text-secondary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  50+
                </motion.div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-accent p-6 text-accent-foreground shadow-xl"
                initial={{ opacity: 0, x: 100, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <motion.div
                  className="text-4xl font-black text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  99%
                </motion.div>
                <div className="text-sm opacity-80">Client Satisfaction</div>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-xl"
                initial={{ opacity: 0, x: 100, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div
                  className="text-4xl font-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  5+
                </motion.div>
                <div className="text-sm opacity-80">Years Experience</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 lg:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="rounded-xl bg-white p-4 shadow-lg">
            <div className="text-2xl font-black text-secondary">50+</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="rounded-xl bg-accent p-4 text-accent-foreground shadow-lg">
            <div className="text-2xl font-black text-primary">99%</div>
            <div className="text-xs opacity-80">Satisfaction</div>
          </div>
          <div className="rounded-xl bg-secondary p-4 text-secondary-foreground shadow-lg">
            <div className="text-2xl font-black">5+</div>
            <div className="text-xs opacity-80">Years</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-lg">
            <div className="text-2xl font-black text-accent">30+</div>
            <div className="text-xs text-muted-foreground">Clients</div>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a
          href="#how-it-works"
          className="flex flex-col items-center gap-2 text-primary-foreground/60 transition-colors hover:text-primary-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4 rotate-90" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
