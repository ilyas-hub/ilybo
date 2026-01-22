# Ilybo

Professional Software Development Agency Website

## Project Structure

```
Ilybo/
├── frontend/          # React + TypeScript frontend
└── backend/           # Express + MongoDB backend
```

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- TanStack Router (file-based routing)
- TanStack Query
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Zustand (state management)
- Lucide React (icons)

### Backend
- Express 5
- MongoDB + Mongoose
- TypeScript
- JWT Authentication
- Zod (validation)

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed    # Seed database
npm run dev     # Start development server
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev     # Start development server
```

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/health` | Public | Health check |
| GET | `/health/db` | Public | DB connection check |
| POST | `/api/v1/auth/register` | Public | Register |
| POST | `/api/v1/auth/login` | Public | Login |
| POST | `/api/v1/auth/refresh` | Public | Refresh token |
| GET | `/api/v1/auth/me` | Auth | Current user |
| GET | `/api/v1/services` | Public | List services |
| GET | `/api/v1/services/:slug` | Public | Service details |
| POST | `/api/v1/services` | Admin | Create service |
| PATCH | `/api/v1/services/:id` | Admin | Update service |
| DELETE | `/api/v1/services/:id` | Admin | Delete service |
| POST | `/api/v1/leads` | Public | Submit contact |
| GET | `/api/v1/leads` | Admin | List leads |
| GET | `/api/v1/users` | Admin | List users |

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ilybo
JWT_SECRET=your-32-char-secret-key-here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGINS=http://localhost:5173
ADMIN_EMAIL=admin@ilybo.com
ADMIN_PASSWORD=AdminPassword123!
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## License

Private
# ilybo
