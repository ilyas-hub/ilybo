import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

interface TokenPayload {
  userId: string
  role: string
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
  } as jwt.SignOptions)
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY,
  } as jwt.SignOptions)
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload
}

export function generateTokens(payload: TokenPayload): {
  accessToken: string
  refreshToken: string
} {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  }
}
