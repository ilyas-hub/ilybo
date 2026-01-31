import { User } from '../modules/users/index.js'
import { hashPassword, logger } from '../utils/index.js'
import { getAdminData } from './data/admin.data.js'

// Additional admin users to seed
const additionalAdmins = [
  {
    email: 'shaikhilyas387@gmail.com',
    password: 'ilyas@123',
    name: 'Ilyas Shaikh',
    role: 'admin' as const,
  },
]

export async function seedAdmin(): Promise<void> {
  logger.info('Seeding admin users...')

  // Seed from env config
  const adminData = getAdminData()
  if (adminData) {
    await createAdminIfNotExists(adminData)
  } else {
    logger.info('Env admin skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set')
  }

  // Seed additional admins
  for (const admin of additionalAdmins) {
    await createAdminIfNotExists(admin)
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
