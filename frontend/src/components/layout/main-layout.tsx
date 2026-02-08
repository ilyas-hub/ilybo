import type { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { BackToTop } from './back-to-top'
import { FloatingContact } from '@/components/floating-contact'
import { CookieConsent } from './cookie-consent'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <FloatingContact />
      <CookieConsent />
    </div>
  )
}
