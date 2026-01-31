import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email'),
  clientCompany: z.string().optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  budget: z.object({
    amount: z.number().positive(),
    currency: z.string().default('USD'),
  }).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  clientName: z.string().min(1).optional(),
  clientEmail: z.string().email().optional(),
  clientCompany: z.string().optional(),
  status: z.enum(['planning', 'in_progress', 'on_hold', 'completed', 'cancelled']).optional(),
  serviceType: z.string().min(1).optional(),
  budget: z.object({
    amount: z.number().positive(),
    currency: z.string(),
  }).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  notes: z.array(z.string()).optional(),
})

export const createFromLeadSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  serviceType: z.string().optional(),
  budget: z.object({
    amount: z.number().positive(),
    currency: z.string().default('USD'),
  }).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type CreateFromLeadInput = z.infer<typeof createFromLeadSchema>
