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
