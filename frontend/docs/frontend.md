# IlyBo Frontend Documentation

## Project Overview

IlyBo Frontend is a mobile-first, trust-focused service website for a software development portfolio. It includes a marketing landing page and an admin dashboard for managing leads, projects, and content.

### Tech Stack
- **Framework**: React 19
- **Routing**: TanStack Router (file-based)
- **State**: Zustand + TanStack Query
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui (Radix primitives)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

### Key Features
- Animated landing page with 10 sections
- Admin dashboard with lead/project management
- CMS for dynamic pages with versioning
- JWT authentication with refresh tokens
- Mobile-first responsive design
- Dark/light mode support

---

## Architecture

```
frontend/src/
├── app/                          # App configuration
│   ├── providers.tsx             # React Query, Router providers
│   └── router.tsx                # TanStack Router setup
├── components/
│   ├── brand/
│   │   └── logo.tsx              # IlyBo logo component
│   ├── layout/
│   │   ├── main-layout.tsx       # Public page layout
│   │   ├── navbar.tsx            # Responsive navigation
│   │   └── footer.tsx            # Site footer
│   └── sections/                 # Landing page sections
│       ├── hero-section.tsx
│       ├── stats-section.tsx
│       ├── services-section.tsx
│       ├── tech-stack-section.tsx
│       ├── journey-section.tsx
│       ├── reviews-section.tsx
│       ├── faq-section.tsx
│       ├── about-section.tsx
│       ├── project-wizard-section.tsx
│       └── contact-section.tsx
├── features/
│   ├── admin/                    # Admin dashboard
│   │   ├── api/                  # Leads, projects API
│   │   ├── components/           # Tables, forms, dialogs
│   │   ├── hooks/                # React Query hooks
│   │   └── types/                # TypeScript types
│   ├── auth/                     # Authentication
│   │   ├── api/                  # Auth API
│   │   └── store/                # Zustand store
│   ├── cms/                      # Content management
│   │   ├── api/                  # Pages, settings API
│   │   └── hooks/                # CMS hooks
│   └── contact/                  # Contact form
├── hooks/                        # Shared hooks
├── lib/
│   ├── ui/                       # shadcn components
│   ├── design-system/            # Theme provider
│   ├── api-client.ts             # API wrapper
│   └── utils.ts                  # Utility functions
├── routes/                       # TanStack Router pages
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Homepage (/)
│   ├── pages.$slug.tsx           # Dynamic pages
│   └── admin/                    # Admin routes
│       ├── login.tsx
│       ├── dashboard.tsx
│       ├── leads.tsx
│       ├── projects.tsx
│       ├── pages.tsx
│       └── settings.tsx
└── shared/                       # Constants, utilities
```

---

## UI/UX Guidelines

### Design Principles
- **Mobile-First**: All components designed for mobile, enhanced for desktop
- **Trust-Focused**: Professional aesthetic for B2B service business
- **Consistent**: Unified component library with shadcn/ui
- **Accessible**: Radix primitives with proper ARIA attributes

### Color System
HSL-based color tokens with light/dark mode:

```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--secondary: 210 40% 96.1%;
--muted: 210 40% 96.1%;
--accent: 210 40% 96.1%;
--destructive: 0 84.2% 60.2%;

/* Dark mode */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
```

### Typography
- **Font**: System font stack (Inter recommended)
- **Scale**: Tailwind default (sm, base, lg, xl, 2xl, etc.)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
Tailwind spacing scale (4px base unit):
- Sections: `py-16` to `py-24`
- Components: `p-4` to `p-8`
- Gaps: `gap-4` to `gap-8`

### Icons
Lucide React for consistent iconography:

```tsx
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react'
```

### Animations
Motion library for smooth animations:

```tsx
import { motion } from 'motion/react'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## Landing Page Sections

### 1. HeroSection
**Purpose**: Primary value proposition and CTAs.

**Features**:
- Animated code editor with typing effect
- Build progress simulation
- Deployment animation
- "Get Started" and "View Services" CTAs
- Background gradient

**Location**: `src/components/sections/hero-section.tsx`

### 2. StatsSection
**Purpose**: Display key business metrics.

**Metrics**:
- 5+ Years of Experience
- 50+ Projects Delivered
- 30+ Happy Clients
- 99% Client Satisfaction

**Features**:
- Animated counters on scroll
- Icon for each stat
- Responsive grid (2x2 on mobile, 4 columns on desktop)

**Location**: `src/components/sections/stats-section.tsx`

### 3. ServicesSection
**Purpose**: Showcase service offerings.

**Services** (8 total):
1. Web Development
2. Mobile Apps
3. UI/UX Design
4. Cloud Solutions
5. DevOps
6. Custom Software
7. API Integration
8. Technical Consulting

**Features**:
- Expandable cards with click-to-expand
- Features list per service
- Tech stack tags
- Lucide icons

**Location**: `src/components/sections/services-section.tsx`

### 4. TechStackSection
**Purpose**: Demonstrate technical expertise.

**Technologies** (14 main + extras):
React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and more.

**Features**:
- Static grid of primary technologies
- Two marquee rows with continuous scroll animation
- Technology logos with React Icons

**Location**: `src/components/sections/tech-stack-section.tsx`

### 5. JourneySection
**Purpose**: Explain the project process.

**Steps** (7 phases):
1. Discovery - Requirements gathering
2. Planning - Architecture and timeline
3. MVP - Core features development
4. Development - Full implementation
5. Deployment - Launch and optimization
6. Handover - Training and documentation
7. Growth - Ongoing support

**Features**:
- Interactive carousel
- Left/right navigation
- Step indicators
- Slide animations

**Location**: `src/components/sections/journey-section.tsx`

### 6. ReviewsSection
**Purpose**: Client testimonials for social proof.

**Features**:
- Client avatar and name
- Company and role
- Testimonial text
- Star ratings

**Location**: `src/components/sections/reviews-section.tsx`

### 7. FAQSection
**Purpose**: Address common questions.

**Questions** (8 total):
- What services do you offer?
- How do you handle project pricing?
- What is your development process?
- Do you provide ongoing support?
- And more...

**Features**:
- Accordion expand/collapse
- Two-column layout on desktop
- Smooth animations

**Location**: `src/components/sections/faq-section.tsx`

### 8. AboutSection
**Purpose**: Company story and values.

**Features**:
- Company description
- Mission statement
- Features list with checkmarks
- Stats highlight card
- Call-to-action

**Location**: `src/components/sections/about-section.tsx`

### 9. ProjectWizardSection
**Purpose**: Multi-step project inquiry form.

**Steps** (13 total):
1. Service type selection
2. Budget range
3. Timeline
4. Project description
5. Contact information
6. And more...

**Features**:
- Modal dialog interface
- Progress indicator
- Form validation
- Submit to leads API

**Location**: `src/components/sections/project-wizard-section.tsx`

### 10. ContactSection
**Purpose**: Direct contact form and info.

**Features**:
- Contact form (name, email, message)
- Email, phone, location cards
- Form validation
- Success/error states

**Location**: `src/components/sections/contact-section.tsx`

---

## Admin Dashboard

### Authentication
**Login Page** (`/admin/login`):
- Email/password form
- Forgot password with OTP flow
- Development mode OTP display
- Redirect to dashboard on success

### Dashboard (`/admin/dashboard`)
**Stats Cards**:
- Total Leads (with new count badge)
- Conversion Rate (percentage)
- Active Projects (in_progress + planning)
- Completed Projects

**Recent Leads**:
- Table preview of latest leads
- Link to full leads management

### Leads Management (`/admin/leads`)
**Features**:
- Paginated table (10 per page)
- Status filter (new, contacted, qualified, converted, lost)
- View lead details dialog
- Delete with confirmation
- Status badges with colors

**Table Columns**:
- Name
- Email
- Company
- Status
- Date
- Actions

### Projects Management (`/admin/projects`)
**Features**:
- Paginated table (10 per page)
- Status filter (planning, in_progress, on_hold, completed, cancelled)
- Create new project modal
- Edit existing projects
- Delete with confirmation
- Budget display with currency

**Table Columns**:
- Name
- Client
- Service Type
- Status
- Budget
- Start Date
- Actions

**Project Form Fields**:
- Name
- Description
- Client Name
- Client Email
- Client Company
- Service Type
- Budget (amount + currency)
- Start/End Dates
- Status

### Pages Management (`/admin/pages`)
**Status**: Coming soon

**Planned Features**:
- Page list with status filter
- Create/edit pages with markdown editor
- Version history
- Publish/unpublish controls
- SEO metadata editing

### Settings (`/admin/settings`)
**Status**: Coming soon

**Planned Sections**:
- Company Info (name, tagline, description)
- Contact Info (email, phone, address)
- Social Links (platform, URL, active status)
- SEO Settings (default title, description)

---

## State Management

### Auth Store (Zustand)
**Location**: `src/features/auth/store/auth-store.ts`

```typescript
interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

interface AuthActions {
  login(email: string, password: string): Promise<void>
  register(name: string, email: string, password: string): Promise<void>
  logout(): Promise<void>
  checkAuth(): Promise<void>
  clearError(): void
}
```

**Features**:
- Persisted to localStorage
- Automatic token refresh
- Role-based access checking

### Server State (TanStack Query)
React Query for API data with caching:

```typescript
// Leads
const { data: leads } = useLeads({ page: 1, status: 'new' })
const { mutate: updateLead } = useUpdateLead()
const { mutate: deleteLead } = useDeleteLead()

// Projects
const { data: projects } = useProjects({ page: 1, status: 'in_progress' })
const { mutate: createProject } = useCreateProject()
const { mutate: updateProject } = useUpdateProject()
const { mutate: deleteProject } = useDeleteProject()

// Dashboard
const { data: stats } = useDashboardStats()
```

### Theme (React Context)
Theme provider for dark/light mode switching.

---

## API Client

### Configuration
**Location**: `src/lib/api-client.ts`

```typescript
const apiClient = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',

  async get<T>(path: string, params?: Record<string, any>): Promise<T>
  async post<T>(path: string, body?: any): Promise<T>
  async patch<T>(path: string, body?: any): Promise<T>
  async delete<T>(path: string): Promise<T>
}
```

**Features**:
- Automatic Bearer token injection
- Query parameter serialization
- JSON error handling
- Type-safe responses

### Feature APIs

#### Auth API
```typescript
// src/features/auth/api/auth-api.ts
authApi.login(email, password)
authApi.register(name, email, password)
authApi.logout()
authApi.me()
authApi.refresh(refreshToken)
```

#### Leads API
```typescript
// src/features/admin/api/leads-api.ts
leadsApi.getLeads({ page, limit, status })
leadsApi.getLead(id)
leadsApi.updateLead(id, { status, notes })
leadsApi.deleteLead(id)
leadsApi.getStats()
```

#### Projects API
```typescript
// src/features/admin/api/projects-api.ts
projectsApi.getProjects({ page, limit, status })
projectsApi.getProject(id)
projectsApi.createProject(data)
projectsApi.createFromLead(leadId, data)
projectsApi.updateProject(id, data)
projectsApi.deleteProject(id)
projectsApi.getStats()
```

#### Pages API
```typescript
// src/features/cms/api/pages-api.ts
pagesApi.getPageBySlug(slug)
pagesApi.getPages(status)
pagesApi.getPage(id)
pagesApi.createPage(data)
pagesApi.updatePage(id, data)
pagesApi.deletePage(id)
pagesApi.publishPage(id)
pagesApi.getVersionHistory(id)
pagesApi.revertToVersion(id, version)
```

#### Settings API
```typescript
// src/features/cms/api/settings-api.ts
settingsApi.getSettings()
settingsApi.updateSettings(data)
```

---

## Forms & Validation

### Form Library
React Hook Form for form state management.

### Validation
Zod schemas with @hookform/resolvers:

```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters')
})

const form = useForm({
  resolver: zodResolver(loginSchema)
})
```

### Contact Form
```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short')
})
```

### Project Form
```typescript
const projectSchema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().min(10, 'Description required'),
  clientName: z.string().min(2, 'Client name required'),
  clientEmail: z.string().email('Invalid email'),
  clientCompany: z.string().optional(),
  serviceType: z.string().min(1, 'Service required'),
  budget: z.object({
    amount: z.number().optional(),
    currency: z.string().default('USD')
  }).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'])
})
```

---

## Animations & Effects

### Motion Library
Animation library (Framer Motion compatible):

```tsx
import { motion, useInView, AnimatePresence } from 'motion/react'
```

### Common Patterns

#### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

#### Staggered Children
```tsx
<motion.ul
  variants={{
    show: { transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

#### Accordion
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      Expandable content
    </motion.div>
  )}
</AnimatePresence>
```

### Marquee Animation
CSS-based continuous scroll:

```tsx
<div className="flex animate-marquee">
  {[...items, ...items].map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</div>
```

### Counter Animation
Animated number counting:

```tsx
const { count } = useSpring({
  from: { count: 0 },
  to: { count: targetValue },
  config: { duration: 2000 }
})
```

---

## Component Library (shadcn/ui)

### Available Components

| Component | Usage |
|-----------|-------|
| `Button` | Primary actions, links |
| `Input` | Text input fields |
| `Textarea` | Multi-line input |
| `Label` | Form labels |
| `Card` | Content containers |
| `Dialog` | Modal dialogs |
| `Sheet` | Slide-out drawers |
| `Table` | Data tables |
| `Badge` | Status indicators |
| `Select` | Dropdown selectors |

### Button Variants
```tsx
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card Usage
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog Usage
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    Content here
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Routing

### Route Structure
```
/                     # Landing page (public)
/pages/:slug          # Dynamic CMS pages (public)
/admin/login          # Admin authentication
/admin/dashboard      # Dashboard (protected)
/admin/leads          # Lead management (protected)
/admin/projects       # Project management (protected)
/admin/pages          # Page management (protected)
/admin/settings       # Settings (protected)
```

### Route Guards
Admin routes check authentication:

```tsx
// src/routes/__root.tsx
const isAdminRoute = location.pathname.startsWith('/admin')
const isLoginRoute = location.pathname === '/admin/login'

if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
  return <Navigate to="/admin/login" />
}
```

### File-Based Routing
TanStack Router with file conventions:

```
routes/
├── __root.tsx        # Root layout
├── index.tsx         # / (homepage)
├── pages.$slug.tsx   # /pages/:slug
└── admin/
    ├── login.tsx     # /admin/login
    ├── dashboard.tsx # /admin/dashboard
    └── ...
```

---

## Data Types

### User
```typescript
interface User {
  _id: string
  email: string
  name: string
  role: 'user' | 'admin'
}
```

### Lead
```typescript
interface Lead {
  _id: string
  name: string
  email: string
  company?: string
  message: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  notes?: string
  createdAt: string
  updatedAt: string
}
```

### Project
```typescript
interface Project {
  _id: string
  name: string
  description: string
  leadId?: string
  clientName: string
  clientEmail: string
  clientCompany?: string
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
  serviceType: string
  budget?: {
    amount: number
    currency: string
  }
  startDate?: string
  endDate?: string
  notes: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}
```

### Page
```typescript
interface Page {
  _id: string
  slug: string
  title: string
  content: string
  contentFormat: 'markdown' | 'html'
  type: 'legal' | 'content' | 'landing' | 'custom'
  status: 'draft' | 'published' | 'archived'
  metaTitle?: string
  metaDescription?: string
  currentVersion: number
}
```

---

## Environment Configuration

### Required Variables
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Optional Variables
```env
VITE_APP_NAME=IlyBo
```

---

## Performance

### Optimizations
- **React Query Caching**: Stale time and cache time configured per query
- **Lazy Loading**: Routes loaded on demand via TanStack Router
- **Image Optimization**: Responsive images with appropriate sizes
- **Pagination**: Tables limit to 10 items per page
- **Conditional Rendering**: Components render only when needed

### Bundle Size
- Tree-shaking enabled via Vite
- Dynamic imports for admin routes
- Icons imported individually from Lucide

---

## Dependencies

### Core
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "~5.9.3",
  "vite": "^7.1.0"
}
```

### Routing & State
```json
{
  "@tanstack/react-router": "^1.120.3",
  "@tanstack/react-query": "^5.90.0",
  "zustand": "^5.0.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^4.1.0",
  "motion": "^12.0.0",
  "lucide-react": "^0.511.0",
  "react-icons": "^5.5.0",
  "class-variance-authority": "^0.7.1"
}
```

### Forms
```json
{
  "react-hook-form": "^7.x.x",
  "@hookform/resolvers": "^5.2.2",
  "zod": "^3.24.2"
}
```

### Radix UI Primitives
```json
{
  "@radix-ui/react-dialog": "^1.x.x",
  "@radix-ui/react-label": "^2.x.x",
  "@radix-ui/react-select": "^2.x.x",
  "@radix-ui/react-dropdown-menu": "^2.x.x",
  "@radix-ui/react-slot": "^1.x.x"
}
```

---

## Development

### Running Locally
```bash
cd frontend
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### Scripts
- `dev` - Development server with hot reload
- `build` - Production build
- `preview` - Preview production build
- `lint` - ESLint check
- `typecheck` - TypeScript check
