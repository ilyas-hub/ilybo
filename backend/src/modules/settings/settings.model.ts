import mongoose, { Schema, Document } from 'mongoose'

export interface ISocialLink {
  platform: string
  url: string
  isActive: boolean
}

export interface IBusinessHours {
  day: string
  open: string
  close: string
  isClosed: boolean
}

export interface ISiteSettings extends Document {
  _id: mongoose.Types.ObjectId
  contact: {
    email: string
    phone: string
    address: {
      street?: string
      city: string
      state?: string
      country: string
      postalCode?: string
    }
  }
  socialLinks: ISocialLink[]
  businessHours: IBusinessHours[]
  company: {
    name: string
    tagline: string
    description: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
  }
  updatedBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String },
        country: { type: String, required: true },
        postalCode: { type: String },
      },
    },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        isActive: { type: Boolean, default: true },
      },
    ],
    businessHours: [
      {
        day: { type: String, required: true },
        open: { type: String },
        close: { type: String },
        isClosed: { type: Boolean, default: false },
      },
    ],
    company: {
      name: { type: String, required: true },
      tagline: { type: String },
      description: { type: String },
    },
    seo: {
      defaultTitle: { type: String },
      defaultDescription: { type: String },
    },
    updatedBy: {
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

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema)
