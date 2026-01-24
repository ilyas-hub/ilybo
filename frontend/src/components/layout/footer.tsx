import { FOOTER_LINKS } from '@/shared/constants/navigation'
import { Github, Twitter, Linkedin, Send, MapPin, Phone, Mail } from 'lucide-react'
import { Logo, LogoText } from '@/components/brand'
import { useState } from 'react'

const SOCIAL_ICONS: Record<string, typeof Twitter> = {
  Twitter: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <a href="/" className="inline-flex items-center gap-2">
              <Logo size="sm" animated={false} />
              <LogoText className="text-2xl" />
            </a>
            <p className="text-sm leading-relaxed text-black/70">
              Building innovative software solutions that drive business growth
              and digital transformation.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="mailto:hello@ilybo.com"
                className="flex items-center gap-2 text-sm text-black/70 transition-colors hover:text-secondary"
              >
                <Mail className="h-4 w-4" />
                hello@ilybo.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-black/70 transition-colors hover:text-secondary"
              >
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-2 text-sm text-black/70">
                <MapPin className="h-4 w-4" />
                Mumbai, India
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {FOOTER_LINKS.social.map((link) => {
                const Icon = SOCIAL_ICONS[link.label] || Twitter
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-secondary hover:text-white"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              Services
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              Stay Updated
            </h4>
            <p className="text-sm text-black/70">
              Get the latest insights on software development.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-10 w-full rounded-lg border-2 border-black/10 bg-white pl-3 pr-10 text-sm transition-colors focus:border-secondary focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-secondary text-white transition-colors hover:bg-secondary/90"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-sm text-green-600">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 md:flex-row">
          <p className="text-sm text-black/60">
            &copy; {currentYear} IlyBo. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-sm text-black/60 transition-colors hover:text-black">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-black/60 transition-colors hover:text-black">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
