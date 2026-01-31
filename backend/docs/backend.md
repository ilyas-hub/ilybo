# IlyBo Backend Documentation

## Project Overview

IlyBo Backend is an admin-only service website API built with modern technologies for managing a portfolio/service business.

### Tech Stack
- **Framework**: Express 5.x
- **Database**: MongoDB with Mongoose 8.x
- **Language**: TypeScript
- **Authentication**: JWT (access + refresh tokens)
- **Validation**: Zod
- **Email**: NodeMailer

### Key Features
- JWT authentication with role-based access control
- Password reset with OTP verification
- Lead management and conversion to projects
- CMS with page versioning
- Site-wide settings management
- Email notifications

---

## Architecture

```
backend/src/
├── app.ts                    # Express app configuration
├── server.ts                 # Entry point with auto-seeding
├── config/
│   ├── constants.ts          # Application constants
│   ├── env.ts                # Environment validation (Zod)
│   └── index.ts              # Config exports
├── middlewares/
│   ├── auth.middleware.ts    # JWT authentication
│   ├── error.middleware.ts   # Global error handler
│   ├── rate-limit.middleware.ts # Rate limiting
│   ├── sanitize.middleware.ts   # MongoDB injection prevention
│   └── validation.middleware.ts # Zod validation wrapper
├── modules/
│   ├── auth/                 # Authentication + password reset
│   ├── users/                # User management (admin only)
│   ├── services/             # Portfolio services (CMS)
│   ├── leads/                # Contact form submissions
│   ├── projects/             # Project management
│   ├── pages/                # CMS pages with versioning
│   └── settings/             # Site-wide settings
├── services/
│   └── email/                # NodeMailer email service
├── utils/
│   ├── errors.ts             # Custom error classes
│   ├── jwt.ts                # Token generation/verification
│   ├── password.ts           # Bcrypt hashing
│   ├── otp.ts                # OTP generation/verification
│   └── logger.ts             # Winston logger
└── seeds/
    ├── admin.seed.ts         # Admin user seeding
    ├── pages.seed.ts         # Default pages
    └── data/                 # Seed data files
```

---

## API Documentation

### Base URL
```
/api/v1
```

### Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

### Health Check Endpoints

#### GET /health
Check API status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2025-01-25T12:00:00.000Z"
  }
}
```

#### GET /health/db
Check database connection.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "connected",
    "database": "ilybo"
  }
}
```

---

### Authentication Endpoints

#### POST /api/v1/auth/register
Register a new user (rate limited: 10/hour).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /api/v1/auth/login
Authenticate user (rate limited: 10/hour).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /api/v1/auth/refresh
Refresh access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /api/v1/auth/logout
Logout user (requires auth).

**Response (204):** No content

#### GET /api/v1/auth/me
Get current user (requires auth).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin"
    }
  }
}
```

---

### Password Reset Endpoints

#### POST /api/v1/auth/password-reset/request
Request password reset OTP (rate limited: 5/hour).

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "If an account exists with this email, a reset code has been sent.",
  "_dev": {
    "otp": "123456",
    "expiresIn": "10 minutes"
  }
}
```
> Note: `_dev` field only appears in development mode.

#### POST /api/v1/auth/password-reset/verify
Verify OTP (rate limited: 10/15min).

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "message": "OTP verified successfully"
  }
}
```

#### POST /api/v1/auth/password-reset/reset
Reset password with verified OTP (rate limited: 10/15min).

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### Users Endpoints (Admin Only)

All endpoints require `authMiddleware` + `adminMiddleware`.

#### GET /api/v1/users
List all users with pagination.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "admin@ilybo.com",
      "name": "Admin User",
      "role": "admin",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### GET /api/v1/users/:id
Get user by ID.

#### PATCH /api/v1/users/:id
Update user.

**Request:**
```json
{
  "name": "Updated Name",
  "role": "admin"
}
```

#### DELETE /api/v1/users/:id
Delete user.

**Response (204):** No content

---

### Leads Endpoints

#### POST /api/v1/leads (Public)
Submit contact form.

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "Tech Corp",
  "message": "Interested in your web development services for our upcoming project."
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@company.com",
    "company": "Tech Corp",
    "message": "Interested in your web development services...",
    "status": "new",
    "createdAt": "2025-01-25T12:00:00.000Z"
  }
}
```

#### GET /api/v1/leads (Admin Only)
List leads with filtering.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (new | contacted | qualified | converted | lost)

#### GET /api/v1/leads/stats (Admin Only)
Get lead statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "byStatus": {
      "new": 15,
      "contacted": 12,
      "qualified": 8,
      "converted": 10,
      "lost": 5
    }
  }
}
```

#### GET /api/v1/leads/:id (Admin Only)
Get lead details.

#### PATCH /api/v1/leads/:id (Admin Only)
Update lead status/notes.

**Request:**
```json
{
  "status": "contacted",
  "notes": "Scheduled call for next week"
}
```

#### DELETE /api/v1/leads/:id (Admin Only)
Delete lead.

---

### Projects Endpoints (Admin Only)

All endpoints require `authMiddleware` + `adminMiddleware`.

#### GET /api/v1/projects
List projects with filtering.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (planning | in_progress | on_hold | completed | cancelled)

#### GET /api/v1/projects/stats
Get project statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "byStatus": {
      "planning": 5,
      "in_progress": 8,
      "on_hold": 2,
      "completed": 9,
      "cancelled": 1
    }
  }
}
```

#### POST /api/v1/projects
Create new project.

**Request:**
```json
{
  "name": "E-commerce Platform",
  "description": "Full-stack e-commerce solution",
  "clientName": "Jane Smith",
  "clientEmail": "jane@company.com",
  "clientCompany": "Tech Corp",
  "serviceType": "Web Development",
  "budget": {
    "amount": 15000,
    "currency": "USD"
  },
  "startDate": "2025-02-01",
  "endDate": "2025-05-01"
}
```

#### POST /api/v1/projects/from-lead/:leadId
Convert lead to project.

**Request:**
```json
{
  "name": "E-commerce Platform",
  "serviceType": "Web Development",
  "budget": {
    "amount": 15000,
    "currency": "USD"
  }
}
```

> Automatically links project to lead and sets lead status to "converted".

#### GET /api/v1/projects/:id
Get project details.

#### PATCH /api/v1/projects/:id
Update project.

#### DELETE /api/v1/projects/:id
Delete project.

---

### Services Endpoints

#### GET /api/v1/services (Public)
List active services.

**Query Parameters:**
- `all` (true to include inactive services)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Web Development",
      "slug": "web-development",
      "description": "Full-stack web development services...",
      "shortDescription": "Custom websites and web applications",
      "icon": "Globe",
      "features": ["React", "Node.js", "MongoDB"],
      "isActive": true,
      "order": 1
    }
  ]
}
```

#### GET /api/v1/services/:slug (Public)
Get service by slug.

#### POST /api/v1/services (Admin Only)
Create service.

#### PATCH /api/v1/services/:id (Admin Only)
Update service.

#### DELETE /api/v1/services/:id (Admin Only)
Delete service.

---

### Pages Endpoints (CMS)

#### GET /api/v1/pages/public/:slug (Public)
Get published page by slug.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "content": "# Privacy Policy\n\nYour privacy is important...",
    "contentFormat": "markdown",
    "type": "legal",
    "status": "published",
    "metaTitle": "Privacy Policy - IlyBo",
    "metaDescription": "Learn about our privacy practices"
  }
}
```

#### GET /api/v1/pages (Admin Only)
List all pages.

**Query Parameters:**
- `status` (draft | published | archived)

#### POST /api/v1/pages (Admin Only)
Create page.

**Request:**
```json
{
  "slug": "terms-of-service",
  "title": "Terms of Service",
  "content": "# Terms of Service\n\n...",
  "contentFormat": "markdown",
  "type": "legal",
  "metaTitle": "Terms of Service - IlyBo",
  "metaDescription": "Our terms and conditions"
}
```

#### PATCH /api/v1/pages/:id (Admin Only)
Update page (auto-creates version).

#### POST /api/v1/pages/:id/publish (Admin Only)
Publish page.

#### GET /api/v1/pages/:id/versions (Admin Only)
Get version history.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "version": 3,
      "title": "Privacy Policy",
      "content": "...",
      "createdAt": "2025-01-25T12:00:00.000Z",
      "createdBy": "507f1f77bcf86cd799439011"
    }
  ]
}
```

#### POST /api/v1/pages/:id/revert/:version (Admin Only)
Revert to specific version.

#### DELETE /api/v1/pages/:id (Admin Only)
Delete page.

---

### Settings Endpoints

#### GET /api/v1/settings (Public)
Get site settings.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contact": {
      "email": "contact@ilybo.com",
      "phone": "+1 234 567 8900",
      "address": {
        "city": "San Francisco",
        "country": "USA"
      }
    },
    "socialLinks": [
      {
        "platform": "LinkedIn",
        "url": "https://linkedin.com/company/ilybo",
        "isActive": true
      }
    ],
    "businessHours": [
      {
        "day": "Monday",
        "open": "09:00",
        "close": "18:00",
        "isClosed": false
      }
    ],
    "company": {
      "name": "IlyBo",
      "tagline": "Building innovative software solutions"
    },
    "seo": {
      "defaultTitle": "IlyBo - Software Development",
      "defaultDescription": "Professional software development services"
    }
  }
}
```

#### PATCH /api/v1/settings (Admin Only)
Update settings.

---

## Data Models

### User
```typescript
{
  _id: ObjectId
  email: string          // unique, lowercase
  password: string       // bcrypt hash (12 rounds)
  name: string
  role: 'user' | 'admin'
  refreshToken?: string  // current refresh token
  createdAt: Date
  updatedAt: Date
}
```

### OTPToken
```typescript
{
  _id: ObjectId
  userId: ObjectId       // ref: User
  email: string
  otpHash: string        // SHA256 hash
  type: 'password_reset'
  attempts: number       // max: 3
  expiresAt: Date        // TTL index (10 min)
  createdAt: Date
}
```

### Lead
```typescript
{
  _id: ObjectId
  name: string
  email: string
  company?: string
  message: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

### Project
```typescript
{
  _id: ObjectId
  name: string
  description: string
  leadId?: ObjectId      // ref: Lead
  clientName: string
  clientEmail: string
  clientCompany?: string
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
  serviceType: string
  budget?: {
    amount: number
    currency: string     // default: USD
  }
  startDate?: Date
  endDate?: Date
  notes: string[]
  createdBy: ObjectId    // ref: User
  createdAt: Date
  updatedAt: Date
}
```

### Service
```typescript
{
  _id: ObjectId
  name: string
  slug: string           // unique, lowercase
  description: string
  shortDescription: string  // max 200 chars
  icon: string
  features: string[]
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### Page
```typescript
{
  _id: ObjectId
  slug: string           // unique, lowercase
  title: string
  content: string
  contentFormat: 'markdown' | 'html'
  type: 'legal' | 'content' | 'landing' | 'custom'
  status: 'draft' | 'published' | 'archived'
  metaTitle?: string
  metaDescription?: string
  currentVersion: number
  versions: [{
    version: number
    title: string
    content: string
    createdAt: Date
    createdBy: ObjectId
  }]                     // max 10 versions
  showInNavigation: boolean
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}
```

### SiteSettings
```typescript
{
  _id: ObjectId
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
  socialLinks: [{
    platform: string
    url: string
    isActive: boolean
  }]
  businessHours: [{
    day: string
    open?: string
    close?: string
    isClosed: boolean
  }]
  company: {
    name: string
    tagline?: string
    description?: string
  }
  seo: {
    defaultTitle?: string
    defaultDescription?: string
  }
  updatedBy?: ObjectId
  createdAt: Date
  updatedAt: Date
}
```

---

## Security

### JWT Authentication
- **Access Token**: 15-minute expiry (configurable)
- **Refresh Token**: 7-day expiry (configurable)
- **Algorithm**: HS256
- **Secret**: Minimum 32 characters required
- **Storage**: Refresh token stored in database for invalidation

### Password Security
- **Algorithm**: bcrypt with 12 salt rounds
- **Validation**: Minimum 8 characters required
- **Storage**: Never stored in plaintext

### OTP Security
- **Generation**: Cryptographically secure 6-digit code
- **Hashing**: SHA256 (constant-time comparison)
- **Expiry**: 10 minutes
- **Max Attempts**: 3 failed verifications
- **Cleanup**: TTL index auto-deletes expired tokens

### Rate Limiting

| Endpoint Type | Window | Max Requests |
|--------------|--------|--------------|
| General API | 15 min | 100 |
| Auth (login/register) | 1 hour | 10 |
| Password Reset Request | 1 hour | 5 |
| OTP Verification | 15 min | 10 |

### MongoDB Injection Prevention
Custom sanitization middleware removes malicious keys:
- Keys starting with `$`
- Keys containing `.`

> Note: Custom implementation for Express 5.x compatibility.

### Security Headers (Helmet)
- XSS protection
- Clickjacking prevention
- MIME type sniffing prevention
- Content Security Policy

### CORS Configuration
- Configurable allowed origins via `CORS_ORIGINS` env
- Credentials enabled for cookie support

---

## Email Service

### Configuration
The email service uses NodeMailer with SMTP.

```typescript
// backend/src/services/email/email.service.ts
class EmailService {
  sendEmail(options: EmailOptions): Promise<boolean>
  sendPasswordResetOTP(email: string, otp: string, expiryMinutes: number): Promise<boolean>
}
```

### Password Reset Email Template
Professional HTML template with:
- Gradient header design
- Large, readable OTP display
- Expiry information
- Safe-to-ignore notice
- Fallback plain text version

### Development Mode
In development, if SMTP is not configured:
- Email content logged to console
- OTP returned in API response (`_dev` field)

---

## Environment Configuration

### Required Variables

```env
# Server
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/ilybo

# JWT (REQUIRED: min 32 characters)
JWT_SECRET=your-super-secret-key-at-least-32-chars

# CORS
CORS_ORIGINS=http://localhost:5173

# Admin Seeding (optional)
ADMIN_EMAIL=admin@ilybo.com
ADMIN_PASSWORD=AdminPassword123!
```

### Optional Variables

```env
# JWT Expiry
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Force re-seeding
FORCE_SEED=false

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=IlyBo
SMTP_FROM_EMAIL=noreply@ilybo.com
```

### Environment Validation
All environment variables are validated at startup using Zod schemas. Invalid configuration will prevent the server from starting.

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "status": "fail",
    "statusCode": 400,
    "errors": {
      "email": ["Invalid email format"],
      "password": ["Must be at least 8 characters"]
    }
  }
}
```

### HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Successful GET/PATCH |
| 201 | Successful POST (created) |
| 204 | Successful DELETE |
| 400 | Bad Request (validation) |
| 401 | Unauthorized |
| 403 | Forbidden (admin required) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 422 | Unprocessable Entity |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

### Custom Error Classes

```typescript
// backend/src/utils/errors.ts
AppError           // Base error class
BadRequestError    // 400
UnauthorizedError  // 401
ForbiddenError     // 403
NotFoundError      // 404
ConflictError      // 409
ValidationError    // 422
```

---

## Logging

Winston logger with colored console output:

```typescript
// Levels: error, warn, info, http, debug
logger.info('Server started on port 3000')
logger.error('Database connection failed', { error })
```

- **Development**: Debug level
- **Production**: Warn level
- **Format**: `YYYY-MM-DD HH:mm:ss:ms [LEVEL] message`

---

## Server Startup

### Startup Sequence
1. Load environment variables
2. Validate configuration
3. Connect to MongoDB
4. Run database seeds (development)
5. Start Express server
6. Log server info

### Auto-Seeding (Development)
- Creates admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Skips if user already exists
- Force with `FORCE_SEED=true`

### Graceful Shutdown
- Handles SIGTERM and SIGINT
- Closes active connections
- 10-second timeout before forced exit
- Logs uncaught exceptions

---

## Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "compression": "^1.7.4",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.0.1",
  "express-rate-limit": "^7.5.0",
  "helmet": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.9.5",
  "nodemailer": "^7.0.12",
  "winston": "^3.17.0",
  "zod": "^3.24.2"
}
```

---

## Development

### Running Locally
```bash
cd backend
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Scripts
- `dev` - Development with hot reload
- `build` - Compile TypeScript
- `start` - Run production build
- `seed` - Run database seeds manually
