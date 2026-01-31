import { User, type IUser } from './user.model.js'
import { NotFoundError, ConflictError, hashPassword } from '../../utils/index.js'

export async function findAllUsers(
  page = 1,
  limit = 10
): Promise<{ users: IUser[]; total: number }> {
  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ])

  return { users, total }
}

export async function findUserById(id: string): Promise<IUser> {
  const user = await User.findById(id)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  return user
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email })
}

export async function findUserByEmailWithPassword(
  email: string
): Promise<IUser | null> {
  return User.findOne({ email }).select('+password')
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: 'user' | 'admin'
}): Promise<IUser> {
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    throw new ConflictError('Email already in use')
  }

  const hashedPassword = await hashPassword(data.password)
  const user = await User.create({
    ...data,
    password: hashedPassword,
  })

  return user
}

export async function updateUser(
  id: string,
  data: Partial<{ email: string; name: string; role: 'user' | 'admin' }>
): Promise<IUser> {
  const user = await User.findByIdAndUpdate(id, data, { new: true })
  if (!user) {
    throw new NotFoundError('User not found')
  }
  return user
}

export async function updateRefreshToken(
  id: string,
  refreshToken: string | null
): Promise<void> {
  await User.findByIdAndUpdate(id, { refreshToken })
}

export async function deleteUser(id: string): Promise<void> {
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    throw new NotFoundError('User not found')
  }
}

export async function updatePassword(id: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword)
  const user = await User.findByIdAndUpdate(id, {
    password: hashedPassword,
    refreshToken: null, // Invalidate all sessions
  })
  if (!user) {
    throw new NotFoundError('User not found')
  }
}
