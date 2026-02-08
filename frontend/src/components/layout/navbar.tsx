import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/lib/ui'
import { NAV_LINKS } from '@/shared/constants/navigation'
import { cn } from '@/lib/utils'
import { LogoText } from '@/components/brand'
import { openProjectWizard } from '@/components/sections/project-wizard-section'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-700 ease-in-out',
          isScrolled ? 'px-6 pt-4' : 'px-0 pt-0'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav
          className={cn(
            'mx-auto flex items-center justify-between transition-all duration-700 ease-in-out',
            isScrolled
              ? 'h-14 max-w-6xl rounded-full bg-black/85 px-8 shadow-2xl backdrop-blur-md'
              : 'h-20 bg-primary px-4'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex items-center">
            <LogoText className="text-3xl" variant={isScrolled ? 'dark' : 'light'} />
          </a>

          {/* Center nav links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative text-sm font-bold uppercase tracking-wide transition-colors',
                  isScrolled
                    ? 'text-primary hover:text-secondary'
                    : 'text-black hover:text-secondary'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side - CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              onClick={openProjectWizard}
              className={cn(
                'rounded-full px-6 font-bold shadow-md transition-all hover:shadow-lg',
                isScrolled
                  ? 'bg-secondary text-white hover:bg-secondary/90'
                  : 'bg-black text-white hover:bg-black/90'
              )}
            >
              Get Started
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className={cn(
                'rounded-full',
                isScrolled
                  ? 'text-primary hover:bg-white/10'
                  : 'text-black hover:bg-black/10'
              )}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 z-50 h-screen w-[300px] bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                <div className="flex items-center">
                  <LogoText className="text-2xl" />
                </div>
                <button
                  className="rounded-full p-2 text-black hover:bg-black/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex h-full flex-col px-6 pt-6">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-bold uppercase text-black transition-colors hover:bg-primary"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </motion.a>
                  ))}
                </div>

                <hr className="my-6 border-black/10" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    className="w-full rounded-full bg-secondary py-5 text-base font-bold text-white hover:bg-secondary/90"
                    onClick={() => {
                      setIsOpen(false)
                      openProjectWizard()
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
