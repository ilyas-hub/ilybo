import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import { useCreateProject, useUpdateProject } from '../hooks'
import type { Project, ProjectStatus } from '../types'

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email'),
  clientCompany: z.string().optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  status: z.enum(['planning', 'in_progress', 'on_hold', 'completed', 'cancelled']),
  budgetAmount: z.coerce.number().optional(),
  budgetCurrency: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

type ProjectFormData = z.infer<typeof projectSchema>

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const serviceOptions = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud & DevOps',
  'Consulting',
  'Maintenance',
  'General',
]

interface ProjectFormProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectForm({ project, open, onClose }: ProjectFormProps) {
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'planning',
      budgetCurrency: 'USD',
    },
  })

  const status = watch('status')
  const serviceType = watch('serviceType')

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
        clientName: project.clientName,
        clientEmail: project.clientEmail,
        clientCompany: project.clientCompany || '',
        serviceType: project.serviceType,
        status: project.status,
        budgetAmount: project.budget?.amount,
        budgetCurrency: project.budget?.currency || 'USD',
        startDate: project.startDate?.split('T')[0] || '',
        endDate: project.endDate?.split('T')[0] || '',
      })
    } else {
      reset({
        name: '',
        description: '',
        clientName: '',
        clientEmail: '',
        clientCompany: '',
        serviceType: '',
        status: 'planning',
        budgetAmount: undefined,
        budgetCurrency: 'USD',
        startDate: '',
        endDate: '',
      })
    }
  }, [project, reset])

  const onSubmit = async (data: ProjectFormData) => {
    const payload = {
      name: data.name,
      description: data.description,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientCompany: data.clientCompany || undefined,
      serviceType: data.serviceType,
      status: data.status,
      budget: data.budgetAmount
        ? { amount: data.budgetAmount, currency: data.budgetCurrency }
        : undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
    }

    if (project) {
      await updateProject.mutateAsync({ id: project._id, data: payload })
    } else {
      await createProject.mutateAsync(payload as Parameters<typeof createProject.mutateAsync>[0])
    }
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'New Project'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" {...register('clientName')} />
              {errors.clientName && (
                <p className="text-xs text-destructive">{errors.clientName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input id="clientEmail" type="email" {...register('clientEmail')} />
              {errors.clientEmail && (
                <p className="text-xs text-destructive">{errors.clientEmail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientCompany">Company (Optional)</Label>
              <Input id="clientCompany" {...register('clientCompany')} />
            </div>

            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={serviceType} onValueChange={(v) => setValue('serviceType', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-xs text-destructive">{errors.serviceType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setValue('status', v as ProjectStatus)}>
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
              <Label htmlFor="budgetAmount">Budget (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="budgetAmount"
                  type="number"
                  placeholder="Amount"
                  {...register('budgetAmount')}
                />
                <Select
                  value={watch('budgetCurrency')}
                  onValueChange={(v) => setValue('budgetCurrency', v)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date (Optional)</Label>
              <Input id="startDate" type="date" {...register('startDate')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input id="endDate" type="date" {...register('endDate')} />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} {...register('description')} />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createProject.isPending || updateProject.isPending}
            >
              {project ? 'Save Changes' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
