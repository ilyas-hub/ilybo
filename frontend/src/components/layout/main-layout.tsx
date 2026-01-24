import type { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { BackToTop } from './back-to-top'

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
    </div>
  )
}
