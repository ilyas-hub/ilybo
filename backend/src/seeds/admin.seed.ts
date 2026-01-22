import { User } from '../modules/users/index.js'
import { hashPassword, logger } from '../utils/index.js'
import { getAdminData } from './data/admin.data.js'

export async function seedAdmin(): Promise<void> {
  const adminData = getAdminData()

  if (!adminData) {
    logger.info('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set')
    return
  }

  logger.info('Seeding admin user...')

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
