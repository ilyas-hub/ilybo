import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  company: string
  initials: string
  review: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    initials: { type: String, required: true },
    review: { type: String, required: true },
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

testimonialSchema.index({ isActive: 1, order: 1 })

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema)
