import mongoose, { Schema, Document } from 'mongoose'

export type PageType = 'legal' | 'content' | 'landing' | 'custom'
export type PageStatus = 'draft' | 'published' | 'archived'
export type ContentFormat = 'markdown' | 'html'

export interface IPageVersion {
  version: number
  title: string
  content: string
  createdAt: Date
  createdBy: mongoose.Types.ObjectId
}

export interface IPage extends Document {
  _id: mongoose.Types.ObjectId
  slug: string
  title: string
  content: string
  contentFormat: ContentFormat
  type: PageType
  status: PageStatus
  metaTitle?: string
  metaDescription?: string
  currentVersion: number
  versions: IPageVersion[]
  showInNavigation: boolean
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const pageVersionSchema = new Schema<IPageVersion>(
  {
    version: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { _id: false }
)

const pageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentFormat: {
      type: String,
      enum: ['markdown', 'html'],
      default: 'markdown',
    },
    type: {
      type: String,
      enum: ['legal', 'content', 'landing', 'custom'],
      default: 'content',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    currentVersion: {
      type: Number,
      default: 1,
    },
    versions: [pageVersionSchema],
    showInNavigation: {
      type: Boolean,
      default: false,
    },
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

// Note: slug index already created by unique: true
pageSchema.index({ status: 1, type: 1 })

export const Page = mongoose.model<IPage>('Page', pageSchema)
