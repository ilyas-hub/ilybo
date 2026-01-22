export const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export const FOOTER_LINKS = {
  company: [
    { href: '#about', label: 'About Us' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ],
  services: [
    { href: '#', label: 'Web Development' },
    { href: '#', label: 'Mobile Apps' },
    { href: '#', label: 'UI/UX Design' },
    { href: '#', label: 'Cloud Solutions' },
  ],
  social: [
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://linkedin.com', label: 'LinkedIn' },
    { href: 'https://github.com', label: 'GitHub' },
  ],
} as const
