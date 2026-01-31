import { useState, useRef } from 'react'
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import {
  Button,
  Input,
  Textarea,
  Label,
} from '@/lib/ui'
import { useContactInfo } from '@/features/cms'

export function ContactSection() {
  const { contact, isLoading } = useContactInfo()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        setFormData({ name: '', email: '', company: '', message: '' })
        alert('Thank you for your message! We will get back to you soon.')
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-primary py-20 lg:py-32">
      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white">
            Get In Touch
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Let's Build <span className="text-secondary">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
            Ready to start your project? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-4">
            <motion.div
              className="rounded-2xl bg-white p-6 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Mail className="h-6 w-6" />
                </motion.div>
                <div>
                  <p className="font-bold text-black">Email</p>
                  <p className="text-sm text-black/60">
                    {isLoading ? '...' : contact?.email || 'hello@ilybo.com'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl bg-white p-6 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Phone className="h-6 w-6" />
                </motion.div>
                <div>
                  <p className="font-bold text-black">Phone</p>
                  <p className="text-sm text-black/60">
                    {isLoading ? '...' : contact?.phone || '+91 98765 43210'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl bg-white p-6 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <MapPin className="h-6 w-6" />
                </motion.div>
                <div>
                  <p className="font-bold text-black">Location</p>
                  <p className="text-sm text-black/60">
                    {isLoading ? '...' : contact?.address
                      ? `${contact.address.city}, ${contact.address.country}`
                      : 'Mumbai, India'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              className="rounded-2xl bg-secondary p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-bold text-white">Prefer a quick call?</h3>
              <p className="mt-2 text-sm text-white/70">
                Schedule a 15-minute discovery call with our team.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Book a call
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </a>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            className="rounded-3xl bg-white p-8 shadow-xl lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-2 text-2xl font-bold text-black">Send us a Message</h3>
            <p className="mb-6 text-black/60">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold text-black">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-2 border-black/10 bg-primary/20 focus:border-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-2 border-black/10 bg-primary/20 focus:border-secondary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="font-bold text-black">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-black/10 bg-primary/20 focus:border-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold text-black">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-2 border-black/10 bg-primary/20 focus:border-secondary"
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl bg-secondary py-6 text-lg font-bold text-white shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="h-5 w-5" />
                      </motion.span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
