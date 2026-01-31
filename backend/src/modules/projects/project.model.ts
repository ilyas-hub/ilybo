import mongoose, { Schema, Document } from 'mongoose'

export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  description: string
  leadId?: mongoose.Types.ObjectId
  clientName: string
  clientEmail: string
  clientCompany?: string
  status: ProjectStatus
  serviceType: string
  budget?: {
    amount: number
    currency: string
  }
  startDate?: Date
  endDate?: Date
  notes: string[]
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    clientCompany: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'],
      default: 'planning',
    },
    serviceType: {
      type: String,
      required: true,
    },
    budget: {
      amount: { type: Number },
      currency: { type: String, default: 'USD' },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    notes: [{
      type: String,
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret.__v
        return ret
      },
    },
  }
)

projectSchema.index({ status: 1 })
projectSchema.index({ clientEmail: 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ leadId: 1 })

export const Project = mongoose.model<IProject>('Project', projectSchema)
