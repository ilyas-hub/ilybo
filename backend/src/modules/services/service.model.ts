import mongoose, { Schema, Document } from 'mongoose'

export interface IService extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },
    icon: {
      type: String,
      required: true,
    },
    features: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v
        return ret
      },
    },
  }
)

serviceSchema.index({ slug: 1 })
serviceSchema.index({ isActive: 1, order: 1 })

export const Service = mongoose.model<IService>('Service', serviceSchema)
