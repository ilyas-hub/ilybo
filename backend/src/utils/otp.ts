import crypto from 'crypto'
import { OTP_CONFIG } from '../config/index.js'

export function generateOTP(length: number = OTP_CONFIG.length): string {
  // Generate a numeric OTP
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString()
  }
  return otp
}

export function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex')
}

export function verifyOTPHash(otp: string, hash: string): boolean {
  const inputHash = hashOTP(otp)
  return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(hash))
}

export function getOTPExpiry(minutes: number = OTP_CONFIG.expiryMinutes): Date {
  return new Date(Date.now() + minutes * 60 * 1000)
}
