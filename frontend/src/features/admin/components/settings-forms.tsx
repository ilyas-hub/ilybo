import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Save, CheckCircle2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Textarea,
  Label,
} from '@/lib/ui'
import type { SiteSettings } from '../types'
import { useUpdateSettings } from '../hooks/use-settings'

interface SettingsFormProps {
  settings: SiteSettings
}

export function CompanyInfoForm({ settings }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    name: settings.company.name || '',
    tagline: settings.company.tagline || '',
    description: settings.company.description || '',
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateSettings = useUpdateSettings()

  useEffect(() => {
    setFormData({
      name: settings.company.name || '',
      tagline: settings.company.tagline || '',
      description: settings.company.description || '',
    })
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings.mutateAsync({ company: formData })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>
          Update your company name, tagline, and description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your Company Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="Your company tagline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your company"
              rows={4}
            />
          </div>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button type="submit" disabled={updateSettings.isPending}>
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : updateSettings.isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

export function ContactInfoForm({ settings }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    email: settings.contact.email || '',
    phone: settings.contact.phone || '',
    street: settings.contact.address?.street || '',
    city: settings.contact.address?.city || '',
    state: settings.contact.address?.state || '',
    country: settings.contact.address?.country || '',
    postalCode: settings.contact.address?.postalCode || '',
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateSettings = useUpdateSettings()

  useEffect(() => {
    setFormData({
      email: settings.contact.email || '',
      phone: settings.contact.phone || '',
      street: settings.contact.address?.street || '',
      city: settings.contact.address?.city || '',
      state: settings.contact.address?.state || '',
      country: settings.contact.address?.country || '',
      postalCode: settings.contact.address?.postalCode || '',
    })
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings.mutateAsync({
      contact: {
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
        },
      },
    })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Manage contact details displayed on your site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contact@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
              placeholder="123 Main St"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="New York"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="NY"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="United States"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                placeholder="10001"
              />
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button type="submit" disabled={updateSettings.isPending}>
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : updateSettings.isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

export function SeoSettingsForm({ settings }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    defaultTitle: settings.seo.defaultTitle || '',
    defaultDescription: settings.seo.defaultDescription || '',
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateSettings = useUpdateSettings()

  useEffect(() => {
    setFormData({
      defaultTitle: settings.seo.defaultTitle || '',
      defaultDescription: settings.seo.defaultDescription || '',
    })
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings.mutateAsync({ seo: formData })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>
          Configure default meta tags for your site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultTitle">Default Page Title</Label>
            <Input
              id="defaultTitle"
              value={formData.defaultTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, defaultTitle: e.target.value }))}
              placeholder="Your Site Name | Tagline"
            />
            <p className="text-xs text-muted-foreground">
              Used as the default title when pages don't have a custom title
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultDescription">Default Meta Description</Label>
            <Textarea
              id="defaultDescription"
              value={formData.defaultDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, defaultDescription: e.target.value }))}
              placeholder="Brief description of your site for search engines"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Recommended length: 150-160 characters
            </p>
          </div>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button type="submit" disabled={updateSettings.isPending}>
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : updateSettings.isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
