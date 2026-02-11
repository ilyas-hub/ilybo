import { FOOTER_LINKS } from '@/shared/constants/navigation'
import { Github, Twitter, Linkedin, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Globe } from 'lucide-react'
import { LogoText } from '@/components/brand'
import { useContactInfo, useSocialLinks } from '@/features/cms'

const SOCIAL_ICONS: Record<string, typeof Twitter> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  // Legacy mappings for static links
  Twitter: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { contact, company } = useContactInfo()
  const { socialLinks } = useSocialLinks()

  return (
    <footer className="bg-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <a href="/" className="inline-flex items-center">
              <LogoText className="text-2xl" />
            </a>
            <p className="text-sm leading-relaxed text-black/90">
              {company?.description || 'Building innovative software solutions that drive business growth and digital transformation.'}
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href={`mailto:${contact?.email || 'hello@ilybo.com'}`}
                className="flex items-center gap-2 text-sm text-black/90 transition-colors hover:text-secondary"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contact?.email || 'hello@ilybo.com'}
              </a>
              <a
                href={`tel:${contact?.phone?.replace(/\s/g, '') || '+919876543210'}`}
                className="flex items-center gap-2 text-sm text-black/90 transition-colors hover:text-secondary"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact?.phone || '+91 98765 43210'}
              </a>
              <div className="flex items-center gap-2 text-sm text-black/90">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {contact?.address
                  ? `${contact.address.city}, ${contact.address.country}`
                  : 'Mumbai, India'}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {(socialLinks.length > 0 ? socialLinks : FOOTER_LINKS.social).map((link, index) => {
                // Handle both dynamic (platform) and static (label) formats
                const platform = 'platform' in link ? link.platform : link.label
                const url = 'url' in link ? link.url : link.href
                const Icon = SOCIAL_ICONS[platform] || Globe
                return (
                  <a
                    key={`${platform}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-secondary hover:text-white"
                    aria-label={platform}
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
                    className="text-sm text-black/90 transition-colors hover:text-secondary"
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
                    className="text-sm text-black/90 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              Follow Us
            </h4>
            <p className="text-sm text-black/90">
              Stay connected with us on social media for the latest updates and insights.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-secondary/90"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 md:flex-row">
          <p className="text-sm text-black/60">
            &copy; {currentYear} IlyBo. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/pages/privacy-policy" className="text-sm text-black/90 transition-colors hover:text-black">
              Privacy Policy
            </a>
            <a href="/pages/terms-of-service" className="text-sm text-black/90 transition-colors hover:text-black">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
