import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/ilybo'),
  JWT_SECRET: z.string().min(32).default('your-32-char-secret-key-here-min'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_NAME: z.string().optional(),
  FORCE_SEED: z.coerce.boolean().default(false),
  // SMTP Configuration
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM_NAME: z.string().default('IlyBo'),
  SMTP_FROM_EMAIL: z.string().email().default('noreply@ilybo.com'),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
