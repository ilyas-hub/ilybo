# Render.com Deployment Guide (Single Service Monorepo)

The frontend is served directly from the Express backend — **one deploy, one URL, no CORS issues**.

All code changes are already done. Follow the steps below to deploy.

---

## Local Testing Verified

All endpoints tested locally and passed:

| Endpoint | Expected | Result |
|---|---|---|
| `/` | 200 HTML | Pass |
| `/start-project` | 200 HTML (SPA) | Pass |
| `/admin` | 200 HTML (SPA) | Pass |
| `/health` | 200 JSON healthy | Pass |
| `/api/v1/nonexistent` | 404 JSON error | Pass |

---

## Step 1: Push Code to GitHub

Make sure all changes are committed and pushed to your remote repository.

```bash
git add backend/package.json backend/src/app.ts frontend/src/lib/api-client.ts DEPLOYMENT-PLAN.md
git commit -m "feat: serve frontend from backend for single-service deployment"
git push origin Dev
```

---

## Step 2: Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect your GitHub repo (`ilybo`)
3. Configure the service:

| Setting | Value |
|---|---|
| **Name** | `ilybo` |
| **Region** | Choose closest to your users |
| **Branch** | `Dev` (or `main`) |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free (or paid for no cold starts) |

---

## Step 3: Add Environment Variables

In the Render service settings → **Environment** → add these:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `MONGODB_URI` | `mongodb+srv://...your MongoDB Atlas connection string...` |
| `JWT_SECRET` | *(generate a strong 64-char random string)* |
| `JWT_ACCESS_EXPIRY` | `15m` |
| `JWT_REFRESH_EXPIRY` | `7d` |
| `CORS_ORIGINS` | `https://ilybo.onrender.com` *(your Render URL)* |
| `SEED_ADMIN_EMAIL` | `admin@ilybo.com` |
| `SEED_ADMIN_PASSWORD` | *(your secure admin password, min 8 chars)* |
| `SEED_ADMIN_NAME` | `Admin` |
| `FORCE_SEED` | `true` *(set to `false` after first successful deploy)* |

**Optional (for email notifications):**

| Key | Value |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | *(your Gmail address)* |
| `SMTP_PASS` | *(your Gmail app password)* |
| `ADMIN_EMAIL` | *(email address for lead notifications, defaults to `SEED_ADMIN_EMAIL`)* |

> **Note:** `VITE_API_URL` is **NOT needed** — the frontend uses relative `/api/v1` since it's served from the same origin.

---

## Step 4: Whitelist IPs on MongoDB Atlas

1. Go to **MongoDB Atlas** → **Network Access**
2. Add `0.0.0.0/0` (allow from anywhere) — required because Render uses dynamic IPs
3. Alternatively, add Render's [static outbound IPs](https://docs.render.com/outbound-ips) if on a paid plan

---

## Step 5: Deploy

Click **Deploy Web Service**. Render will:
1. Run `npm install` in `backend/`
2. Run `npm run build` which:
   - `cd ../frontend && npm install && npm run build` → builds frontend into `frontend/dist/`
   - `cd ../backend && tsc` → compiles backend into `backend/dist/`
3. Run `npm start` → `node dist/server.js`

The Express server serves both the API (`/api/v1/*`) and the frontend (everything else).

---

## Step 6: Verify Deployment

1. Visit `https://ilybo.onrender.com` → frontend should load
2. Visit `https://ilybo.onrender.com/health` → should return JSON `{ "status": "healthy" }`
3. Navigate to `/start-project`, `/admin` → SPA routing should work (no 404)
4. Test admin login
5. After first successful deploy, set `FORCE_SEED=false` in environment variables

---

## How It Works

```
Request → Express Server (port 3000)
  ├── Static files (JS, CSS, images) → served from frontend/dist/
  ├── /api/v1/*                      → API routes (JSON responses)
  ├── /api/v1/unknown-route          → JSON 404 error
  └── /anything-else                 → frontend/dist/index.html (SPA routing)
```

---

## Files Changed for This Setup

1. **`backend/src/app.ts`** — Added `express.static()` for frontend dist + SPA catch-all route
2. **`backend/package.json`** — Build script now builds both frontend and backend
3. **`frontend/src/lib/api-client.ts`** — API URL fallback changed to relative `/api/v1`

---

## Local Development

For local development, the frontend dev server (Vite) still works independently:

```bash
# Terminal 1: Backend
cd backend && npm run dev        # runs on http://localhost:3000

# Terminal 2: Frontend
cd frontend && npm run dev       # runs on http://localhost:5173
```

Add a `.env` file in `frontend/` if needed:
```
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Optional: Custom Domain

1. In Render service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `ilybo.com`)
3. Update DNS records as instructed by Render
4. Update `CORS_ORIGINS` env var to match your custom domain

---

## Important Notes

- **Free tier cold starts**: The backend spins down after 15 min of inactivity. First request takes ~30-50s.
- **Paid plan ($7/mo)**: Eliminates cold starts, adds more RAM/CPU.
- **MongoDB Atlas**: Make sure your cluster is in the same region as your Render service for lowest latency.
