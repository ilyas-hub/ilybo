import { useState } from 'react'
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react'
import {
  Button,
  Input,
  Textarea,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
    <section id="contact" className="relative overflow-hidden bg-accent py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Get In Touch
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-accent-foreground sm:text-4xl md:text-5xl">
            Let's Build
            <span className="text-primary"> Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-accent-foreground/70">
            Ready to start your project? Contact us today for a free
            consultation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact info cards */}
          <div className="space-y-4">
            <Card className="border-0 bg-accent-foreground/5 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-accent-foreground">
                      Email
                    </CardTitle>
                    <CardDescription className="text-accent-foreground/70">
                      hello@ilybo.com
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-accent-foreground/5 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-accent-foreground">
                      Phone
                    </CardTitle>
                    <CardDescription className="text-accent-foreground/70">
                      +1 (555) 123-4567
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-accent-foreground/5 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-accent-foreground">
                      Location
                    </CardTitle>
                    <CardDescription className="text-accent-foreground/70">
                      San Francisco, CA
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick CTA */}
            <div className="rounded-2xl bg-primary p-6">
              <h3 className="text-lg font-bold text-primary-foreground">
                Prefer a quick call?
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Schedule a 15-minute discovery call with our team.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
              >
                Book a call <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <Card className="border-0 bg-background shadow-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl border-2 focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">
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
                      className="h-12 rounded-xl border-2 focus:border-secondary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-semibold">
                    Company (Optional)
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-2 focus:border-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold">
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
                    className="rounded-xl border-2 focus:border-secondary"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl bg-secondary py-6 text-lg font-semibold text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 hover:shadow-xl"
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
