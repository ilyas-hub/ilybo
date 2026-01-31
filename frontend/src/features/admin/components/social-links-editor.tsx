import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  GripVertical,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Globe,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import type { SocialLink, SiteSettings } from '../types'
import { useUpdateSettings } from '../hooks/use-settings'

interface SocialLinksEditorProps {
  settings: SiteSettings
}

const platformOptions = [
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'twitter', label: 'Twitter/X', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'website', label: 'Website', icon: Globe },
]

const getPlatformIcon = (platform: string) => {
  const option = platformOptions.find(p => p.value === platform)
  return option?.icon || Globe
}

export function SocialLinksEditor({ settings }: SocialLinksEditorProps) {
  const [links, setLinks] = useState<SocialLink[]>(settings.socialLinks || [])
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateSettings = useUpdateSettings()

  useEffect(() => {
    setLinks(settings.socialLinks || [])
  }, [settings])

  const handleAddLink = () => {
    setLinks(prev => [
      ...prev,
      { platform: 'website', url: '', isActive: true },
    ])
  }

  const handleRemoveLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpdateLink = (index: number, field: keyof SocialLink, value: string | boolean) => {
    setLinks(prev =>
      prev.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings.mutateAsync({ socialLinks: links })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>
          Add and manage your social media profiles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {links.map((link, index) => {
              const Icon = getPlatformIcon(link.platform)
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="cursor-move text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                  </div>

                  <Select
                    value={link.platform}
                    onValueChange={(value) => handleUpdateLink(index, 'platform', value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {platformOptions.find(p => p.value === link.platform)?.label}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={link.url}
                    onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                  />

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={link.isActive}
                      onCheckedChange={(checked) => handleUpdateLink(index, 'isActive', checked)}
                    />
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {links.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <Globe className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No social links added yet
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button type="button" variant="outline" onClick={handleAddLink}>
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </Button>

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
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
