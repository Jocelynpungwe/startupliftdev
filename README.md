# Sales CRM — React + Vite + Express + MongoDB

A full-stack CRM starter application with:

- JWT authentication
- User profiles
- Role/permission based lead editing and deletion
- Dashboard KPIs
- Leads by salesperson pie chart
- Yearly revenue analysis
- Deal statistics
- Personal lead performance
- Top closed deals
- All Leads table with search, status filtering and sorting
- Add Lead form
- MongoDB + Mongoose backend
- Redux Toolkit + Axios frontend

## Stack

Frontend:
- React
- Vite
- React Router
- Redux Toolkit
- Axios
- Recharts

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Requirements

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas connection string

## 1. Start the backend

```bash
cd server
npm install
copy .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_db
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Then:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

Create an admin account:

```bash
npm run seed:admin
```

Default seed credentials:

```text
Email: admin@crm.local
Password: Admin123!
```

Change the password after first login.

## 2. Start the frontend

Open another terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Open the URL shown by Vite, normally:

`http://localhost:5173`

## API routes

Auth:
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/auth/me`

Leads:
- GET `/api/v1/leads`
- GET `/api/v1/leads/:id`
- POST `/api/v1/leads`
- PUT `/api/v1/leads/:id`
- DELETE `/api/v1/leads/:id`

Dashboard:
- GET `/api/v1/dashboard`

Users:
- GET `/api/v1/users`

## Lead statuses

- new
- approved
- rejected
- pending

## Permissions

A user has a `role` and `permissions`.

The included roles are:
- admin
- manager
- salesperson

The backend enforces permissions; hiding buttons in the frontend is only for user experience.

Admin/manager can be given:
- `lead:create`
- `lead:read`
- `lead:update`
- `lead:delete`
- `dashboard:read`

Salespeople can create/read leads by default.

## Important production upgrades

Before production, add:
- HTTP-only secure refresh-token cookies
- rate limiting
- request validation with Zod/Joi
- audit logs
- pagination
- cloud image storage for profile photos
- email verification/password reset
- MongoDB indexes
- centralized logging
- CSRF protection if cookie authentication is introduced
- stricter CORS configuration

## Deploying: website on Netlify, API on Render

The two halves deploy separately. Deploy the API first, because the website
needs its address.

### 1. API on Render

1. In Render choose **New > Blueprint** and pick this repository. Render reads
   `render.yaml` and creates the `startupliftdev-api` web service (root
   directory `server`, health check `/api/v1/health`).
2. Fill in the environment variables it asks for:
   - `MONGO_URI`: your MongoDB Atlas connection string. In Atlas, under
     Network Access, allow `0.0.0.0/0`, since Render's addresses change.
   - `CLIENT_URL`: the address of your Netlify site, for example
     `https://yoursite.netlify.app`. Add your custom domain too, separated by
     a comma, once you have one: `https://yoursite.netlify.app,https://www.yourdomain.com`.
   - `RESEND_API_KEY` and `CONTACT_EMAIL`: for the contact form emails.
   - `JWT_SECRET` is generated for you.
3. When it is live, open `https://<your-service>.onrender.com/api/v1/health`.
   It should answer `CRM API is healthy`.
4. Create the first admin once, from the service's **Shell** tab:
   `npm run seed:admin`, then change that password after logging in.

The free Render plan sleeps after about 15 minutes without traffic, so the
first request after a quiet spell (a contact form submit or a CRM login) can
take around a minute. A paid plan removes that.

### 2. Website on Netlify

The site builds from `client/` (see `netlify.toml`). In Netlify, under
**Site configuration > Environment variables**, add:

```text
VITE_API_URL=https://<your-service>.onrender.com/api/v1
```

Then trigger a new deploy: the variable is baked in at build time, so changing
it needs a rebuild. If it is missing, the site tries `localhost:5000`.
