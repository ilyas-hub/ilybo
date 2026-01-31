import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  Card,
  CardContent,
  Badge,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/ui'
import {
  Eye,
  Trash2,
  Mail,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquare,
} from 'lucide-react'
import { useLeads, useDeleteLead } from '../hooks'
import { LeadFilters } from './lead-filters'
import type { Lead, LeadStatus } from '../types'

const statusVariants: Record<LeadStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info'> = {
  new: 'info',
  contacted: 'secondary',
  qualified: 'warning',
  converted: 'success',
  lost: 'destructive',
}

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-gray-500',
  qualified: 'bg-yellow-500',
  converted: 'bg-green-500',
  lost: 'bg-red-500',
}

export function LeadsTable() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<LeadStatus | undefined>()
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useLeads({ page, limit: 10, status })
  const deleteLead = useDeleteLead()

  const leads = data?.data || []
  const pagination = data?.pagination

  const handleDelete = async () => {
    if (deleteId) {
      await deleteLead.mutateAsync(deleteId)
      setDeleteId(null)
    }
  }

  const openDeleteDialog = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setDeleteId(id)
  }

  const handleViewLead = (lead: Lead) => {
    navigate({ to: '/admin/leads/$leadId', params: { leadId: lead._id } })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getMessagePreview = (message: string) => {
    // Check if it's a project wizard submission
    if (message.includes('Project:')) {
      const projectMatch = message.match(/Project:\s*(.+)/)
      return projectMatch ? projectMatch[1].slice(0, 60) + '...' : message.slice(0, 60) + '...'
    }
    return message.slice(0, 60) + (message.length > 60 ? '...' : '')
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <LeadFilters status={status} onStatusChange={setStatus} />

      {/* Mobile Card View */}
      <div className="space-y-3">
        {leads.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center"
          >
            <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">No leads found</p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {status ? 'Try changing the filter' : 'Leads will appear here when submitted'}
            </p>
          </motion.div>
        ) : (
          leads.map((lead, index) => (
            <motion.div
              key={lead._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="cursor-pointer transition-all hover:shadow-md active:scale-[0.99]"
                onClick={() => handleViewLead(lead)}
              >
                <CardContent className="p-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">{lead.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={statusVariants[lead.status]} className="shrink-0">
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusColors[lead.status]}`} />
                      {lead.status}
                    </Badge>
                  </div>

                  {/* Details Row */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {lead.company && (
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span className="truncate">{lead.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {getMessagePreview(lead.message)}
                  </p>

                  {/* Actions Row */}
                  <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewLead(lead)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View Details</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={(e) => openDeleteDialog(e, lead._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{leads.length}</span> of{' '}
            <span className="font-medium">{pagination.total}</span> leads
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="flex items-center gap-1 px-2 text-sm">
              <span className="font-medium">{page}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{pagination.totalPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="gap-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
