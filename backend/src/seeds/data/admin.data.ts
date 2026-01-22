import { env } from '../../config/env.js'

export function getAdminData() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    return null
  }

  return {
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    name: 'Admin',
    role: 'admin' as const,
  }
}
