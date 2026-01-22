import { FOOTER_LINKS } from '@/shared/constants/navigation'
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

const SOCIAL_ICONS: Record<string, typeof Twitter> = {
  Twitter: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <a href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tight">ilybo</span>
            </a>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Building innovative software solutions that drive business growth
              and digital transformation.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {FOOTER_LINKS.social.map((link) => {
                const Icon = SOCIAL_ICONS[link.label] || Twitter
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground">
              Get the latest insights on software development and digital
              transformation.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-lg border-2 bg-transparent px-4 text-sm transition-colors focus:border-secondary focus:outline-none sm:flex-1"
              />
              <button
                type="submit"
                className="h-11 shrink-0 whitespace-nowrap rounded-lg bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Ilybo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
