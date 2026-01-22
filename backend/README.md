# Ilybo Backend

Express.js API for the Ilybo platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your `.env` file with appropriate values.

4. Start MongoDB.

5. Seed the database:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed the database

## Project Structure

```
src/
├── config/           # Configuration files
├── middlewares/      # Express middlewares
├── modules/          # Feature modules
│   ├── auth/         # Authentication
│   ├── users/        # User management
│   ├── services/     # Service catalog
│   └── leads/        # Contact leads
├── seeds/            # Database seeders
├── types/            # TypeScript declarations
├── utils/            # Utility functions
├── app.ts            # Express app setup
└── server.ts         # Entry point
```

## API Documentation

### Health Check
- `GET /health` - Server health
- `GET /health/db` - Database health

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh tokens
- `GET /api/v1/auth/me` - Get current user (auth required)

### Services
- `GET /api/v1/services` - List all services
- `GET /api/v1/services/:slug` - Get service by slug
- `POST /api/v1/services` - Create service (admin)
- `PATCH /api/v1/services/:id` - Update service (admin)
- `DELETE /api/v1/services/:id` - Delete service (admin)

### Leads
- `POST /api/v1/leads` - Submit contact form
- `GET /api/v1/leads` - List leads (admin)
- `GET /api/v1/leads/stats` - Get lead statistics (admin)
- `PATCH /api/v1/leads/:id` - Update lead (admin)
- `DELETE /api/v1/leads/:id` - Delete lead (admin)

### Users
- `GET /api/v1/users` - List users (admin)
- `GET /api/v1/users/:id` - Get user (admin)
- `PATCH /api/v1/users/:id` - Update user (admin)
- `DELETE /api/v1/users/:id` - Delete user (admin)
