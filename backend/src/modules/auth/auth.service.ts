import { userService } from '../users/index.js'
import {
  UnauthorizedError,
  comparePassword,
  generateTokens,
  verifyToken,
} from '../../utils/index.js'
import type { RegisterInput, LoginInput } from './auth.validation.js'

export async function register(data: RegisterInput) {
  const user = await userService.createUser(data)
  const tokens = generateTokens({
    userId: user._id.toString(),
    role: user.role,
  })

  await userService.updateRefreshToken(user._id.toString(), tokens.refreshToken)

  return {
    user,
    ...tokens,
  }
}

export async function login(data: LoginInput) {
  const user = await userService.findUserByEmailWithPassword(data.email)
  if (!user) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const isValidPassword = await comparePassword(data.password, user.password)
  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const tokens = generateTokens({
    userId: user._id.toString(),
    role: user.role,
  })

  await userService.updateRefreshToken(user._id.toString(), tokens.refreshToken)

  return {
    user,
    ...tokens,
  }
}

export async function refresh(refreshToken: string) {
  try {
    const decoded = verifyToken(refreshToken)
    const user = await userService.findUserById(decoded.userId)

    const tokens = generateTokens({
      userId: user._id.toString(),
      role: user.role,
    })

    await userService.updateRefreshToken(user._id.toString(), tokens.refreshToken)

    return tokens
  } catch {
    throw new UnauthorizedError('Invalid refresh token')
  }
}

export async function logout(userId: string) {
  await userService.updateRefreshToken(userId, null)
}

export async function getCurrentUser(userId: string) {
  return userService.findUserById(userId)
}
