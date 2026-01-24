import { useState } from 'react'
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react'
import {
  Button,
  Input,
  Textarea,
  Label,
} from '@/lib/ui'

export function ContactSection() {
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
    <section id="contact" className="relative overflow-hidden bg-primary py-20 lg:py-32">
      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white">
            Get In Touch
          </span>
          <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            Let's Build <span className="text-secondary">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
            Ready to start your project? Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-black">Email</p>
                  <p className="text-sm text-black/60">hello@ilybo.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-black">Phone</p>
                  <p className="text-sm text-black/60">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-black">Location</p>
                  <p className="text-sm text-black/60">Mumbai, India</p>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="rounded-2xl bg-secondary p-6">
              <h3 className="text-lg font-bold text-white">Prefer a quick call?</h3>
              <p className="mt-2 text-sm text-white/70">
                Schedule a 15-minute discovery call with our team.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Book a call <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl lg:col-span-2">
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
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
