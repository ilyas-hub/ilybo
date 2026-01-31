import { userService } from '../users/index.js'
import {
  UnauthorizedError,
  BadRequestError,
  comparePassword,
  generateTokens,
  verifyToken,
  generateOTP,
  hashOTP,
  verifyOTPHash,
  getOTPExpiry,
  logger,
} from '../../utils/index.js'
import { OTP_CONFIG, env } from '../../config/index.js'
import { OTPToken } from './otp-token.model.js'
import { emailService } from '../../services/email/index.js'
import type {
  RegisterInput,
  LoginInput,
  RequestPasswordResetInput,
  VerifyOTPInput,
  ResetPasswordInput,
} from './auth.validation.js'

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

export async function requestPasswordReset(data: RequestPasswordResetInput) {
  // Always return success message to prevent email enumeration
  const successMessage = 'If an account exists with this email, you will receive a password reset code'

  const user = await userService.findUserByEmail(data.email)
  if (!user) {
    // Don't reveal that user doesn't exist
    logger.info(`Password reset requested for non-existent email: ${data.email}`)
    // In development, still return consistent response
    return { message: successMessage }
  }

  // Delete any existing OTP tokens for this user
  await OTPToken.deleteMany({ userId: user._id, type: 'password_reset' })

  // Generate and hash OTP
  const otp = generateOTP()
  const otpHash = hashOTP(otp)
  const expiresAt = getOTPExpiry()

  // Store OTP token
  await OTPToken.create({
    userId: user._id,
    email: user.email,
    otpHash,
    type: 'password_reset',
    expiresAt,
  })

  // Send email (in dev mode, this logs instead of sending)
  await emailService.sendPasswordResetOTP(user.email, otp, OTP_CONFIG.expiryMinutes)

  // In development mode, return OTP in response for testing
  if (env.NODE_ENV === 'development') {
    logger.info(`[DEV] OTP for ${user.email}: ${otp}`)
    return {
      message: successMessage,
      // Only included in development for testing
      _dev: {
        otp,
        expiresIn: `${OTP_CONFIG.expiryMinutes} minutes`,
      },
    }
  }

  return { message: successMessage }
}

export async function verifyOTP(data: VerifyOTPInput) {
  const token = await OTPToken.findOne({
    email: data.email.toLowerCase(),
    type: 'password_reset',
  })

  if (!token) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  // Check if expired
  if (token.expiresAt < new Date()) {
    await OTPToken.deleteOne({ _id: token._id })
    throw new BadRequestError('OTP has expired')
  }

  // Check max attempts
  if (token.attempts >= OTP_CONFIG.maxAttempts) {
    await OTPToken.deleteOne({ _id: token._id })
    throw new BadRequestError('Too many failed attempts. Please request a new OTP')
  }

  // Verify OTP
  const isValid = verifyOTPHash(data.otp, token.otpHash)
  if (!isValid) {
    token.attempts += 1
    await token.save()
    throw new BadRequestError('Invalid OTP')
  }

  return { valid: true, message: 'OTP verified successfully' }
}

export async function resetPassword(data: ResetPasswordInput) {
  const token = await OTPToken.findOne({
    email: data.email.toLowerCase(),
    type: 'password_reset',
  })

  if (!token) {
    throw new BadRequestError('Invalid or expired OTP')
  }

  // Check if expired
  if (token.expiresAt < new Date()) {
    await OTPToken.deleteOne({ _id: token._id })
    throw new BadRequestError('OTP has expired')
  }

  // Check max attempts
  if (token.attempts >= OTP_CONFIG.maxAttempts) {
    await OTPToken.deleteOne({ _id: token._id })
    throw new BadRequestError('Too many failed attempts. Please request a new OTP')
  }

  // Verify OTP
  const isValid = verifyOTPHash(data.otp, token.otpHash)
  if (!isValid) {
    token.attempts += 1
    await token.save()
    throw new BadRequestError('Invalid OTP')
  }

  // Update password
  await userService.updatePassword(token.userId.toString(), data.newPassword)

  // Delete the OTP token
  await OTPToken.deleteOne({ _id: token._id })

  return { message: 'Password reset successful' }
}
