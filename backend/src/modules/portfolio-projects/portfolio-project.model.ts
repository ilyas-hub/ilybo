import mongoose, { Schema, Document } from 'mongoose'

export type ProjectCategory = 'web_app' | 'mobile_app' | 'ecommerce' | 'enterprise' | 'saas' | 'custom'

export interface IResult {
  metric: string
  value: string
  description: string
}

export interface ITestimonial {
  quote: string
  author: string
  position: string
}

export interface IPortfolioProject extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  tagline: string
  description: string
  client: {
    name: string
    industry: string
  }
  thumbnail: string
  images: string[]
  category: ProjectCategory
  tags: string[]
  challenge: string
  solution: string
  results: IResult[]
  duration: string
  teamSize: number
  projectUrl?: string
  testimonial?: ITestimonial
  featured: boolean
  displayOrder: number
  isPublished: boolean
  createdBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const portfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: {
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
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      name: { type: String, required: true, trim: true },
      industry: { type: String, required: true, trim: true },
    },
    thumbnail: {
      type: String,
      default: '',
    },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ['web_app', 'mobile_app', 'ecommerce', 'enterprise', 'saas', 'custom'],
    },
    tags: [{ type: String }],
    challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    results: [
      {
        metric: { type: String, required: true },
        value: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    teamSize: {
      type: Number,
      required: true,
    },
    projectUrl: {
      type: String,
    },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      position: { type: String },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

portfolioProjectSchema.index({ isPublished: 1, displayOrder: 1 })
portfolioProjectSchema.index({ category: 1 })

export const PortfolioProject = mongoose.model<IPortfolioProject>('PortfolioProject', portfolioProjectSchema)
