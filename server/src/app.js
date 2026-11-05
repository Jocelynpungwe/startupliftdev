import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/authRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import userRoutes from './routes/userRoutes.js'
import payrollRoutes from './routes/payrollRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import leadActivityRoutes from './routes/leadActivityRoutes.js'
import financeRoutes from './routes/financeRoutes.js'

import { notFound, errorHandler } from './middleware/error.js'

const app = express()

app.disable('etag')

// CLIENT_URL is the address(es) the site is served from (Netlify, a custom
// domain, localhost). Separate several with commas; trailing slashes are ignored.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean)

app.use(
  cors({
    // requests with no Origin (health checks, curl) are not browser cross-site calls
    origin: (origin, callback) =>
      callback(null, !origin || allowedOrigins.includes(origin)),
  }),
)

app.use(express.json())
app.use(morgan('dev'))

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'CRM API is healthy' })
})

app.use(
  '/api/v1/auth',
  (req, res, next) => {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    )
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    next()
  },
  authRoutes,
)
app.use('/api/v1/leads', leadRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/payroll', payrollRoutes)
app.use('/api/v1/contact', contactRoutes)
app.use('/api/v1/finance', financeRoutes)
app.use('/api/v1', leadActivityRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
