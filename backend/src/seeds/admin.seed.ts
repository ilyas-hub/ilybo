import { User } from '../modules/users/index.js'
import { hashPassword, logger } from '../utils/index.js'
import { getAdminData } from './data/admin.data.js'
import { env } from '../config/env.js'

export async function seedAdmin(): Promise<void> {
  logger.info('Seeding admin users...')

  // Seed from env config
  const adminData = getAdminData()
  if (adminData) {
    await createAdminIfNotExists(adminData)
  } else {
    logger.info('Env admin skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set')
  }

  // Seed additional admins from env vars
  if (env.SEED_ADMIN_EMAIL && env.SEED_ADMIN_PASSWORD) {
    await createAdminIfNotExists({
      email: env.SEED_ADMIN_EMAIL,
      password: env.SEED_ADMIN_PASSWORD,
      name: env.SEED_ADMIN_NAME || 'Admin',
      role: 'admin' as const,
    })
  }
}

async function createAdminIfNotExists(adminData: {
  email: string
  password: string
  name: string
  role: 'admin'
}): Promise<void> {
  const existingAdmin = await User.findOne({ email: adminData.email })

  if (existingAdmin) {
    logger.info(`Admin user already exists: ${adminData.email}`)
    return
  }

  const hashedPassword = await hashPassword(adminData.password)

  await User.create({
    ...adminData,
    password: hashedPassword,
  })

  logger.info(`Created admin user: ${adminData.email}`)
}
