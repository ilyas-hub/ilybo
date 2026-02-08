import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Save, CheckCircle2, Plus, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Label,
} from '@/lib/ui'
import type { SiteSettings } from '../types'
import { useUpdateSettings } from '../hooks/use-settings'

interface AboutSettingsFormProps {
  settings: SiteSettings
}

export function AboutSettingsForm({ settings }: AboutSettingsFormProps) {
  const [stats, setStats] = useState<{ icon: string; value: string; label: string }[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateSettings = useUpdateSettings()

  useEffect(() => {
    setStats(
      settings.about?.stats?.map((s) => ({ icon: s.icon, value: s.value, label: s.label })) || [
        { icon: 'Award', value: '5+', label: 'Years of Excellence' },
        { icon: 'Users', value: '30+', label: 'Happy Clients' },
        { icon: 'Zap', value: '50+', label: 'Projects Delivered' },
      ]
    )
    setFeatures(
      settings.about?.features || [
        'Agile Development Methodology',
        'Dedicated Project Managers',
        'Transparent Communication',
        'Quality Assurance at Every Step',
        'Post-Launch Support',
        'Scalable Solutions',
      ]
    )
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateSettings.mutateAsync({ about: { stats, features } })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const addStat = () => {
    setStats([...stats, { icon: '', value: '', label: '' }])
  }

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  const updateStat = (index: number, field: string, value: string) => {
    setStats(stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  const addFeature = () => {
    setFeatures([...features, ''])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    setFeatures(features.map((f, i) => (i === index ? value : f)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section Content</CardTitle>
        <CardDescription>
          Edit the stats and features displayed in the About section
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Stats</Label>
              <Button type="button" variant="outline" size="sm" onClick={addStat}>
                <Plus className="mr-1 h-3 w-3" />
                Add Stat
              </Button>
            </div>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="space-y-1 flex-1">
                  <Label className="text-xs">Icon Name</Label>
                  <Input
                    value={stat.icon}
                    onChange={(e) => updateStat(index, 'icon', e.target.value)}
                    placeholder="Award, Users, Zap..."
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label className="text-xs">Value</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    placeholder="5+"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="Years of Excellence"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:bg-destructive/10"
                  onClick={() => removeStat(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Features</Label>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="mr-1 h-3 w-3" />
                Add Feature
              </Button>
            </div>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Feature name"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:bg-destructive/10"
                  onClick={() => removeFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
