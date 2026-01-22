import mongoose, { Schema, Document } from 'mongoose'
import type { UserRole } from '../../config/constants.js'
import { USER_ROLES } from '../../config/constants.js'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  name: string
  role: UserRole
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password
        delete ret.refreshToken
        delete ret.__v
        return ret
      },
    },
  }
)

userSchema.index({ email: 1 })

export const User = mongoose.model<IUser>('User', userSchema)
