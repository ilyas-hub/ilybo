import { useState, type ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { AdminSidebar, MobileBottomNav } from './admin-sidebar'
import { pageVariants, pageTransition } from '@/lib/animations'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <main className="min-h-screen pt-14 pb-16 lg:ml-64 lg:pb-0 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  )
}
