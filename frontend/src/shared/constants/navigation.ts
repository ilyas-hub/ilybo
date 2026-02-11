export const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
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
    { href: '#services', label: 'Web Development' },
    { href: '#services', label: 'Mobile Apps' },
    { href: '#services', label: 'UI/UX Design' },
    { href: '#services', label: 'Cloud Solutions' },
  ],
  social: [
    { href: 'https://www.linkedin.com/in/ilybo-dev-8309763ab/', label: 'LinkedIn' },
    { href: 'https://www.instagram.com/ilybo_dev', label: 'Instagram' },
    { href: 'https://www.facebook.com/share/1GFmg8AE9z/', label: 'Facebook' },
    { href: 'https://x.com/IlyBo37352', label: 'Twitter' },
  ],
} as const
