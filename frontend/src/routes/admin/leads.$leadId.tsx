import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  User,
  Mail,
  Building2,
  Calendar,
  MessageSquare,
  Briefcase,
  Users,
  Palette,
  Clock,
  DollarSign,
  Globe,
  Phone,
  Zap,
  Save,
  Rocket,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import { AdminHeader } from '@/features/admin/components/admin-header'
import { useLead, useUpdateLead, useCreateProjectFromLead } from '@/features/admin/hooks'
import type { LeadStatus } from '@/features/admin/types'

export const Route = createFileRoute('/admin/leads/$leadId')({
  component: LeadDetailPage,
})

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-gray-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-yellow-500' },
  { value: 'converted', label: 'Converted', color: 'bg-green-500' },
  { value: 'lost', label: 'Lost', color: 'bg-red-500' },
]

const statusVariants: Record<LeadStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info'> = {
  new: 'info',
  contacted: 'secondary',
  qualified: 'warning',
  converted: 'success',
  lost: 'destructive',
}

// Parse the structured message from project wizard
function parseProjectMessage(message: string) {
  const lines = message.split('\n').filter(line => line.trim())
  const data: Record<string, string> = {}

  lines.forEach(line => {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (match) {
      const key = match[1].trim().toLowerCase().replace(/\s+/g, '_')
      data[key] = match[2].trim()
    }
  })

  return data
}

// Get icon for project field
function getFieldIcon(key: string) {
  const icons: Record<string, React.ReactNode> = {
    project: <MessageSquare className="h-4 w-4" />,
    industry: <Briefcase className="h-4 w-4" />,
    target_audience: <Users className="h-4 w-4" />,
    service: <Zap className="h-4 w-4" />,
    features: <CheckCircle2 className="h-4 w-4" />,
    design_style: <Palette className="h-4 w-4" />,
    timeline: <Clock className="h-4 w-4" />,
    budget: <DollarSign className="h-4 w-4" />,
    inspiration: <Globe className="h-4 w-4" />,
    website: <Globe className="h-4 w-4" />,
    phone: <Phone className="h-4 w-4" />,
  }
  return icons[key] || <MessageSquare className="h-4 w-4" />
}

// Get label for project field
function getFieldLabel(key: string) {
  const labels: Record<string, string> = {
    project: 'Project Description',
    industry: 'Industry',
    target_audience: 'Target Audience',
    service: 'Service Type',
    features: 'Required Features',
    design_style: 'Design Style',
    timeline: 'Timeline',
    budget: 'Budget Range',
    inspiration: 'Inspiration URLs',
    website: 'Current Website',
    phone: 'Phone Number',
  }
  return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function LeadDetailPage() {
  const navigate = useNavigate()
  const { leadId } = Route.useParams()

  const { data, isLoading, isError } = useLead(leadId)
  const lead = data?.data

  const [status, setStatus] = useState<LeadStatus>('new')
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const updateLead = useUpdateLead()
  const createProject = useCreateProjectFromLead()

  // Update local state when lead data loads
  useEffect(() => {
    if (lead) {
      setStatus(lead.status)
      setNotes(lead.notes || '')
    }
  }, [lead])

  const handleSave = async () => {
    if (!lead) return
    setIsSaving(true)
    try {
      await updateLead.mutateAsync({
        id: lead._id,
        data: { status, notes },
      })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleConvertToProject = async () => {
    if (!lead) return
    const parsedData = parseProjectMessage(lead.message)
    await createProject.mutateAsync({
      leadId: lead._id,
      data: {
        name: parsedData.project || `Project for ${lead.name}`,
        description: lead.message,
        clientName: lead.name,
        clientEmail: lead.email,
        clientCompany: lead.company,
        serviceType: parsedData.service || 'General',
      },
    })
    navigate({ to: '/admin/projects' })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <>
        <AdminHeader title="Lead Details" description="Loading..." />
        <div className="p-4 md:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-32 rounded bg-muted" />
            <div className="h-48 rounded-xl bg-muted" />
            <div className="h-64 rounded-xl bg-muted" />
          </div>
        </div>
      </>
    )
  }

  if (isError || !lead) {
    return (
      <>
        <AdminHeader title="Lead Details" description="Error loading lead" />
        <div className="p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center"
          >
            <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Lead not found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The lead you're looking for doesn't exist or has been deleted.
            </p>
            <Button
              className="mt-4"
              onClick={() => navigate({ to: '/admin/leads' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Button>
          </motion.div>
        </div>
      </>
    )
  }

  // Parse the message to get structured project data
  const projectData = parseProjectMessage(lead.message)
  const isProjectWizardSubmission = Object.keys(projectData).length > 3

  return (
    <>
      <AdminHeader
        title="Lead Details"
        description={`Submitted on ${formatDate(lead.createdAt)}`}
      />

      <div className="p-4 md:p-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/admin/leads' })}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Leads
          </Button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content - Left Side */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      Contact Information
                    </CardTitle>
                    <Badge variant={statusVariants[lead.status]} className="w-fit">
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Name</p>
                        <p className="font-semibold">{lead.name}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Email</p>
                        <a href={`mailto:${lead.email}`} className="font-semibold text-primary hover:underline">
                          {lead.email}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <Building2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Company</p>
                        <p className="font-semibold">{lead.company || 'Not provided'}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Submitted</p>
                        <p className="font-semibold">{formatDate(lead.createdAt)}</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Details Card - Only for wizard submissions */}
            {isProjectWizardSubmission ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                        <Briefcase className="h-5 w-5 text-secondary" />
                      </div>
                      Project Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(projectData).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className={`rounded-lg border bg-card p-4 ${
                            key === 'project' ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                            {getFieldIcon(key)}
                            <span className="text-xs font-medium uppercase tracking-wide">
                              {getFieldLabel(key)}
                            </span>
                          </div>
                          <p className={`font-medium ${key === 'project' ? 'text-sm' : ''}`}>
                            {value === 'N/A' ? (
                              <span className="text-muted-foreground">Not provided</span>
                            ) : (
                              value
                            )}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Simple Message Card - For contact form submissions */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                      </div>
                      Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {lead.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Status & Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manage Lead</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${option.color}`} />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Internal Notes</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this lead..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <motion.div
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full gap-2"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {saveSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Saved!
                        </>
                      ) : isSaving ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Convert to Project Card */}
            {lead.status !== 'converted' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-dashed border-primary/50 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Rocket className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Ready to start?</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Convert this lead into a project to begin tracking progress.
                      </p>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="mt-4"
                      >
                        <Button
                          variant="default"
                          className="w-full gap-2"
                          onClick={handleConvertToProject}
                          disabled={createProject.isPending}
                        >
                          {createProject.isPending ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Converting...
                            </>
                          ) : (
                            <>
                              <Rocket className="h-4 w-4" />
                              Convert to Project
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Converted Badge */}
            {lead.status === 'converted' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Converted to Project</p>
                        <p className="text-sm opacity-80">
                          This lead has been converted into an active project.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
