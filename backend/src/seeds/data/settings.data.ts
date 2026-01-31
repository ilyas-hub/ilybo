export const defaultSettings = {
  contact: {
    email: 'hello@ilybo.com',
    phone: '+91 98765 43210',
    address: {
      city: 'Mumbai',
      country: 'India',
    },
  },
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/ilybo', isActive: true },
    { platform: 'linkedin', url: 'https://linkedin.com/company/ilybo', isActive: true },
    { platform: 'github', url: 'https://github.com/ilybo', isActive: true },
  ],
  businessHours: [
    { day: 'Monday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Tuesday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Wednesday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Thursday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Friday', open: '09:00', close: '18:00', isClosed: false },
    { day: 'Saturday', open: '10:00', close: '14:00', isClosed: false },
    { day: 'Sunday', open: '', close: '', isClosed: true },
  ],
  company: {
    name: 'IlyBo',
    tagline: 'Building innovative software solutions',
    description:
      'We are a software development company focused on building cutting-edge digital solutions for businesses of all sizes.',
  },
  seo: {
    defaultTitle: 'IlyBo - Software Development',
    defaultDescription:
      'IlyBo offers professional software development services including web development, mobile apps, and cloud solutions.',
  },
}
