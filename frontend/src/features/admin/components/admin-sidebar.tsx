import { Link, useLocation } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronRight,
  HelpCircle,
  Quote,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/features/auth'
import { Button } from '@/lib/ui'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">IlyBo</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
            Admin
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo - Hidden on mobile (shown in header) */}
          <div className="hidden h-16 items-center border-b border-border px-6 lg:flex">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">IlyBo</span>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Admin
              </span>
            </Link>
          </div>

          {/* Close button for mobile */}
          <div className="flex h-14 items-center justify-between border-b border-border px-4 lg:hidden">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-border p-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => logout()}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  )
}

// Mobile Bottom Navigation (alternative navigation for quick access)
export function MobileBottomNav() {
  const location = useLocation()

  const bottomNavItems = navItems.slice(0, 4) // Only show first 4 items

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card lg:hidden">
      <div className="flex items-center justify-around">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
