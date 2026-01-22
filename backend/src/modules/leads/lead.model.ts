import mongoose, { Schema, Document } from 'mongoose'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface ILead extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  company?: string
  message: string
  status: LeadStatus
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
      default: 'new',
    },
    notes: {
      type: String,
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

leadSchema.index({ email: 1 })
leadSchema.index({ status: 1 })
leadSchema.index({ createdAt: -1 })

export const Lead = mongoose.model<ILead>('Lead', leadSchema)
