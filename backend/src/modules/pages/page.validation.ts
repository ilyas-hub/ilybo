import { z } from 'zod'

export const createPageSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  contentFormat: z.enum(['markdown', 'html']).default('markdown'),
  type: z.enum(['legal', 'content', 'landing', 'custom']).default('content'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  showInNavigation: z.boolean().default(false),
})

export const updatePageSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .optional(),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  contentFormat: z.enum(['markdown', 'html']).optional(),
  type: z.enum(['legal', 'content', 'landing', 'custom']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  showInNavigation: z.boolean().optional(),
})

export type CreatePageInput = z.infer<typeof createPageSchema>
export type UpdatePageInput = z.infer<typeof updatePageSchema>
