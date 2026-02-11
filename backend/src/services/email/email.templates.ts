export function passwordResetTemplate(otp: string, expiryMinutes: number): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      padding: 40px;
    }
    .content {
      background: white;
      border-radius: 12px;
      padding: 40px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 20px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #666;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .otp-code {
      background: #f7f7f7;
      border: 2px dashed #667eea;
      border-radius: 8px;
      padding: 20px;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #667eea;
      margin: 24px 0;
    }
    .expiry {
      font-size: 14px;
      color: #999;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="logo">IlyBo</div>
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Use the code below to complete the process.</p>
      <div class="otp-code">${otp}</div>
      <p class="expiry">This code will expire in ${expiryMinutes} minutes.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} IlyBo. All rights reserved.</p>
        <p>This is an automated message, please do not reply.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function passwordResetTextTemplate(otp: string, expiryMinutes: number): string {
  return `
Password Reset Request

You requested to reset your password. Use the code below to complete the process:

Your OTP Code: ${otp}

This code will expire in ${expiryMinutes} minutes.

If you didn't request this, you can safely ignore this email.

--
IlyBo
This is an automated message, please do not reply.
  `.trim()
}

interface LeadConfirmationData {
  name: string
}

export function leadConfirmationTemplate(data: LeadConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      padding: 40px;
    }
    .content {
      background: white;
      border-radius: 12px;
      padding: 40px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 20px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #666;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .highlight {
      background: #f7f7f7;
      border-left: 4px solid #667eea;
      border-radius: 4px;
      padding: 16px 20px;
      text-align: left;
      margin: 24px 0;
      color: #444;
      font-size: 15px;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="logo">IlyBo</div>
      <h1>Thank You, ${data.name}!</h1>
      <p>We have received your message and appreciate you reaching out to us.</p>
      <div class="highlight">
        Our team will review your inquiry and get back to you within 24 hours.
      </div>
      <p>If you have any urgent questions in the meantime, feel free to reply to this email.</p>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} IlyBo. All rights reserved.</p>
        <p>This is an automated message.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function leadConfirmationTextTemplate(data: LeadConfirmationData): string {
  return `
Thank You, ${data.name}!

We have received your message and appreciate you reaching out to us.

Our team will review your inquiry and get back to you within 24 hours.

If you have any urgent questions in the meantime, feel free to reply to this email.

--
IlyBo
  `.trim()
}

interface AdminLeadNotificationData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export function adminLeadNotificationTemplate(data: AdminLeadNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Received</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      padding: 40px;
    }
    .content {
      background: white;
      border-radius: 12px;
      padding: 40px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 20px;
      text-align: center;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
    }
    .details {
      background: #f7f7f7;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .details table {
      width: 100%;
      border-collapse: collapse;
    }
    .details td {
      padding: 8px 0;
      vertical-align: top;
    }
    .details td:first-child {
      font-weight: bold;
      color: #444;
      width: 100px;
    }
    .details td:last-child {
      color: #666;
    }
    .message-box {
      background: #f7f7f7;
      border-left: 4px solid #667eea;
      border-radius: 4px;
      padding: 16px 20px;
      margin: 16px 0;
      color: #444;
      font-size: 15px;
      white-space: pre-wrap;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="logo">IlyBo</div>
      <h1>New Lead Received</h1>
      <div class="details">
        <table>
          <tr>
            <td>Name</td>
            <td>${data.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td>Phone</td><td>${data.phone}</td></tr>` : ''}
          ${data.company ? `<tr><td>Company</td><td>${data.company}</td></tr>` : ''}
        </table>
      </div>
      <p style="font-weight: bold; color: #444;">Message:</p>
      <div class="message-box">${data.message}</div>
      <div class="footer">
        <p>This notification was sent automatically by IlyBo.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function adminLeadNotificationTextTemplate(data: AdminLeadNotificationData): string {
  return `
New Lead Received

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ''}${data.company ? `Company: ${data.company}\n` : ''}
Message:
${data.message}

--
This notification was sent automatically by IlyBo.
  `.trim()
}
