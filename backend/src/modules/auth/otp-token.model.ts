import mongoose, { Schema, type Document } from 'mongoose'

export type OTPType = 'password_reset'

export interface IOTPToken extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  email: string
  otpHash: string
  type: OTPType
  attempts: number
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const otpTokenSchema = new Schema<IOTPToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['password_reset'],
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// TTL index - automatically delete expired tokens
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// Index for querying by email and type
otpTokenSchema.index({ email: 1, type: 1 })

export const OTPToken = mongoose.model<IOTPToken>('OTPToken', otpTokenSchema)
