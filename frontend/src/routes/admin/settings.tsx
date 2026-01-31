import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Building, Mail, Globe, Settings as SettingsIcon } from 'lucide-react'
import { AdminHeader } from '@/features/admin'
import {
  CompanyInfoForm,
  ContactInfoForm,
  SeoSettingsForm,
} from '@/features/admin/components/settings-forms'
import { SocialLinksEditor } from '@/features/admin/components/social-links-editor'
import { useSettings } from '@/features/admin/hooks/use-settings'
import { Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/ui'

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { data, isLoading, isError } = useSettings()
  const settings = data?.data

  return (
    <>
      <AdminHeader
        title="Settings"
        description="Manage your site settings"
      />
      <div className="p-4 md:p-6">
        {isLoading && (
          <div className="space-y-6">
            <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-muted" />
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          </div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <SettingsIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Unable to load settings</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  There was an error loading the settings. Please try again later.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {settings && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Tabs defaultValue="company" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="company" className="gap-2">
                  <Building className="h-4 w-4 hidden sm:block" />
                  Company
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-2">
                  <Mail className="h-4 w-4 hidden sm:block" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="social" className="gap-2">
                  <Globe className="h-4 w-4 hidden sm:block" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="seo" className="gap-2">
                  <SettingsIcon className="h-4 w-4 hidden sm:block" />
                  SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="company">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CompanyInfoForm settings={settings} />
                </motion.div>
              </TabsContent>

              <TabsContent value="contact">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ContactInfoForm settings={settings} />
                </motion.div>
              </TabsContent>

              <TabsContent value="social">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SocialLinksEditor settings={settings} />
                </motion.div>
              </TabsContent>

              <TabsContent value="seo">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SeoSettingsForm settings={settings} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </div>
    </>
  )
}
