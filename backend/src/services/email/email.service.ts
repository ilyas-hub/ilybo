import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { env } from '../../config/index.js'
import { logger } from '../../utils/index.js'
import {
  passwordResetTemplate,
  passwordResetTextTemplate,
  leadConfirmationTemplate,
  leadConfirmationTextTemplate,
  adminLeadNotificationTemplate,
  adminLeadNotificationTextTemplate,
} from './email.templates.js'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

class EmailService {
  private transporter: Transporter | null = null

  private getTransporter(): Transporter {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth:
          env.SMTP_USER && env.SMTP_PASS
            ? {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
              }
            : undefined,
      })
    }
    return this.transporter
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = this.getTransporter()
      await transporter.sendMail({
        from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      })
      logger.info(`Email sent successfully to ${options.to}`)
      return true
    } catch (error) {
      logger.error('Failed to send email:', error)
      // In development, log the email content instead of failing
      if (env.NODE_ENV === 'development') {
        logger.info('Development mode - Email would have been sent:', {
          to: options.to,
          subject: options.subject,
        })
        return true
      }
      return false
    }
  }

  async sendPasswordResetOTP(email: string, otp: string, expiryMinutes: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Password Reset - IlyBo',
      html: passwordResetTemplate(otp, expiryMinutes),
      text: passwordResetTextTemplate(otp, expiryMinutes),
    })
  }

  async sendLeadConfirmation(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Thank you for contacting us - IlyBo',
      html: leadConfirmationTemplate({ name }),
      text: leadConfirmationTextTemplate({ name }),
    })
  }

  async sendAdminLeadNotification(
    adminEmail: string,
    data: { name: string; email: string; phone?: string; company?: string; message: string }
  ): Promise<boolean> {
    return this.sendEmail({
      to: adminEmail,
      subject: `New Lead: ${data.name} - IlyBo`,
      html: adminLeadNotificationTemplate(data),
      text: adminLeadNotificationTextTemplate(data),
    })
  }
}

export const emailService = new EmailService()
