import { z } from 'zod'

export const updateSettingsSchema = z.object({
  contact: z
    .object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z
        .object({
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          country: z.string().optional(),
          postalCode: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
        isActive: z.boolean().default(true),
      })
    )
    .optional(),
  businessHours: z
    .array(
      z.object({
        day: z.string(),
        open: z.string().optional(),
        close: z.string().optional(),
        isClosed: z.boolean().default(false),
      })
    )
    .optional(),
  company: z
    .object({
      name: z.string().optional(),
      tagline: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  seo: z
    .object({
      defaultTitle: z.string().optional(),
      defaultDescription: z.string().optional(),
    })
    .optional(),
})

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
