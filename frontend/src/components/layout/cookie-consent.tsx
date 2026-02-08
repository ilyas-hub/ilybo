import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/lib/ui'

const CONSENT_KEY = 'ilybo-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const manage = () => {
    // For now, treating "Manage Preferences" the same as accept
    // Can be expanded with a preferences modal later
    localStorage.setItem(CONSENT_KEY, 'managed')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="mx-auto max-w-2xl rounded-2xl bg-black/90 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden rounded-xl bg-white/10 p-2.5 sm:block">
                <Cookie className="h-5 w-5 text-white/70" />
              </div>

              <div className="flex-1">
                <p className="text-sm leading-relaxed text-white/80">
                  We use cookies to keep things running smoothly and understand how
                  you interact with our site. Your data stays safe — no surprises.
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button
                    size="sm"
                    className="rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-white/90"
                    onClick={accept}
                  >
                    Accept All
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full px-5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
                    onClick={manage}
                  >
                    Manage Preferences
                  </Button>
                </div>
              </div>

              <button
                onClick={accept}
                className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
                aria-label="Dismiss cookie banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
