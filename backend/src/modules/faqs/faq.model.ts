import mongoose, { Schema, Document } from 'mongoose'

export interface IFAQ extends Document {
  _id: mongoose.Types.ObjectId
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const faqSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
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

faqSchema.index({ isActive: 1, order: 1 })

export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema)
