import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/lib/ui'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/ui'
import { useTheme } from '@/lib/design-system/theme/theme-provider'
import { NAV_LINKS } from '@/shared/constants/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-semibold uppercase tracking-wide transition-colors',
                isScrolled
                  ? 'text-foreground hover:text-secondary'
                  : 'text-primary-foreground hover:text-secondary'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Logo - Center */}
        <a href="/" className="flex items-center">
          <span
            className={cn(
              'text-2xl font-black tracking-tight transition-colors',
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            )}
          >
            ilybo
          </span>
        </a>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              isScrolled
                ? 'text-foreground hover:bg-muted'
                : 'text-primary-foreground hover:bg-primary-foreground/10'
            )}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="outline"
            className={cn(
              'rounded-full border-2 px-6 font-semibold transition-all',
              isScrolled
                ? 'border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground'
                : 'border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground'
            )}
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>

          <Button
            className="rounded-full bg-secondary px-6 font-semibold text-secondary-foreground shadow-md transition-all hover:bg-secondary/90 hover:shadow-lg"
            asChild
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              isScrolled
                ? 'text-foreground'
                : 'text-primary-foreground hover:bg-primary-foreground/10'
            )}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isScrolled
                    ? 'text-foreground'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary">
              <div className="flex flex-col space-y-6 pt-12">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold uppercase text-primary-foreground transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-primary-foreground/20" />
                <Button
                  variant="outline"
                  className="w-full rounded-full border-2 border-secondary font-semibold text-secondary"
                  asChild
                >
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  className="w-full rounded-full bg-secondary font-semibold text-secondary-foreground"
                  asChild
                >
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
