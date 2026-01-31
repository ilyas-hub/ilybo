import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useProjects, useDeleteProject } from '../hooks'
import { ProjectForm } from './project-form'
import type { Project, ProjectStatus } from '../types'

const statusVariants: Record<ProjectStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info'> = {
  planning: 'info',
  in_progress: 'warning',
  on_hold: 'secondary',
  completed: 'success',
  cancelled: 'destructive',
}

const statusOptions: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function ProjectsTable() {
  const [status, setStatus] = useState<ProjectStatus | undefined>()
  const [page, setPage] = useState(1)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { data, isLoading } = useProjects({ page, limit: 10, status })
  const deleteProject = useDeleteProject()

  const projects = data?.data || []
  const pagination = data?.pagination

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject.mutateAsync(id)
    }
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatBudget = (budget: Project['budget']) => {
    if (!budget) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
    }).format(budget.amount)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="rounded-lg border">
          <div className="h-64 animate-pulse bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select
          value={status || 'all'}
          onValueChange={(value) =>
            setStatus(value === 'all' ? undefined : (value as ProjectStatus))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div>
                      <p>{project.clientName}</p>
                      <p className="text-xs text-muted-foreground">{project.clientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{project.serviceType}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[project.status]}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatBudget(project.budget)}</TableCell>
                  <TableCell>{formatDate(project.startDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditProject(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {projects.length} of {pagination.total} projects
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <ProjectForm
        project={editProject}
        open={showForm || !!editProject}
        onClose={() => {
          setShowForm(false)
          setEditProject(null)
        }}
      />
    </div>
  )
}
