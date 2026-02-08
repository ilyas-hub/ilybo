import { z } from 'zod'

const resultSchema = z.object({
  metric: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
})

const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  position: z.string().min(1),
})

export const createPortfolioProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  tagline: z.string().min(1).max(300),
  description: z.string().min(1),
  client: z.object({
    name: z.string().min(1),
    industry: z.string().min(1),
  }),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.enum(['web_app', 'mobile_app', 'ecommerce', 'enterprise', 'saas', 'custom']),
  tags: z.array(z.string()).optional(),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  results: z.array(resultSchema).optional(),
  duration: z.string().min(1),
  teamSize: z.number().int().positive(),
  projectUrl: z.string().url().optional(),
  testimonial: testimonialSchema.optional(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  isPublished: z.boolean().optional(),
})

export const updatePortfolioProjectSchema = createPortfolioProjectSchema.partial()

export type CreatePortfolioProjectInput = z.infer<typeof createPortfolioProjectSchema>
export type UpdatePortfolioProjectInput = z.infer<typeof updatePortfolioProjectSchema>
