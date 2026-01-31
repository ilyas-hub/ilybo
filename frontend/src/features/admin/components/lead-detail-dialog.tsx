import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import { useUpdateLead, useCreateProjectFromLead } from '../hooks'
import type { Lead, LeadStatus } from '../types'

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
]

interface LeadDetailDialogProps {
  lead: Lead | null
  onClose: () => void
}

export function LeadDetailDialog({ lead, onClose }: LeadDetailDialogProps) {
  const [status, setStatus] = useState<LeadStatus>(lead?.status || 'new')
  const [notes, setNotes] = useState(lead?.notes || '')

  const updateLead = useUpdateLead()
  const createProject = useCreateProjectFromLead()

  const handleSave = async () => {
    if (!lead) return
    await updateLead.mutateAsync({
      id: lead._id,
      data: { status, notes },
    })
    onClose()
  }

  const handleConvertToProject = async () => {
    if (!lead) return
    await createProject.mutateAsync({
      leadId: lead._id,
      data: {
        name: `Project for ${lead.name}`,
        description: lead.message,
        clientName: lead.name,
        clientEmail: lead.email,
        clientCompany: lead.company,
        serviceType: 'General',
      },
    })
    onClose()
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

  // Update local state when lead changes
  if (lead && status !== lead.status && notes !== (lead.notes || '')) {
    setStatus(lead.status)
    setNotes(lead.notes || '')
  }

  return (
    <Dialog open={!!lead} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>

        {lead && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">{lead.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Company</Label>
                <p className="font-medium">{lead.company || '-'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Submitted</Label>
                <p className="font-medium">{formatDate(lead.createdAt)}</p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Message</Label>
              <p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm">
                {lead.message}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes..."
                rows={3}
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          {lead?.status !== 'converted' && (
            <Button
              variant="secondary"
              onClick={handleConvertToProject}
              disabled={createProject.isPending}
            >
              Convert to Project
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateLead.isPending}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
