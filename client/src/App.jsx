import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalytics, trackPageView } from './lib/analytics.js'
import { initClarity } from './lib/clarity.js'

import { loadMe, initialized } from './features/auth/authSlice.js'

// Public website (small, shipped in the main bundle for a fast first paint)
import PublicLayout from './layouts/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Work from './pages/Work.jsx'
import ProjectFormModal from './components/ProjectFormModel.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import PageLoader from './components/PageLoader.jsx'
import { UiProvider } from './components/ui/UiProvider.jsx'

// CRM shell (code-split with the CRM pages)
const Layout = lazy(() => import('./components/Layout.jsx'))
import ProtectedRoute from './components/ProtectedRoute.jsx'

// CRM pages are code-split so public visitors never download them
// (this keeps recharts and the CRM page code off the marketing site).
const Login = lazy(() => import('./pages/Login.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Leads = lazy(() => import('./pages/Leads.jsx'))
const NewLead = lazy(() => import('./pages/NewLead.jsx'))
const LeadDetails = lazy(() => import('./pages/LeadDetails.jsx'))
const SalesPipeline = lazy(() => import('./pages/SalesPipeline.jsx'))
const LeadGuide = lazy(() => import('./pages/LeadGuide.jsx'))
const SalesCallGuide = lazy(() => import('./pages/SalesCallGuide.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Users = lazy(() => import('./pages/Users.jsx'))
const PayrollManagement = lazy(() => import('./pages/PayrollManagement.jsx'))
const FinanceDashboard = lazy(
  () => import('./pages/finance/FinanceDashboard.jsx'),
)
const IncomePage = lazy(() => import('./pages/finance/IncomePage.jsx'))
const ExpensesPage = lazy(() => import('./pages/finance/ExpensesPage.jsx'))
const SubscriptionsPage = lazy(
  () => import('./pages/finance/SubscriptionsPage.jsx'),
)
const ProfitLossPage = lazy(() => import('./pages/finance/ProfitLossPage.jsx'))
const CashFlowPage = lazy(() => import('./pages/finance/CashFlowPage.jsx'))
const ReportsPage = lazy(() => import('./pages/finance/ReportsPage.jsx'))

const FINANCE_ROUTES = [
  ['/finance', FinanceDashboard],
  ['/finance/income', IncomePage],
  ['/finance/expenses', ExpensesPage],
  ['/finance/subscriptions', SubscriptionsPage],
  ['/finance/profit-loss', ProfitLossPage],
  ['/finance/cash-flow', CashFlowPage],
  ['/finance/reports', ReportsPage],
]

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const { user, initialized: authInitialized } = useSelector(
    (state) => state.auth,
  )

  const canAccessFinance =
    ['admin', 'manager', 'finance'].includes(user?.role) ||
    user?.permissions?.includes('finance:read')

  useEffect(() => {
    initAnalytics()
    initClarity()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  // Restore an existing CRM session (only waits when a token exists)
  useEffect(() => {
    const token = localStorage.getItem('crm_token')

    if (token) {
      dispatch(loadMe())
    } else {
      dispatch(initialized())
    }
  }, [dispatch])

  if (!authInitialized) {
    return <PageLoader />
  }

  return (
    <UiProvider>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* CRM login */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Protected CRM */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/leads" element={<Leads />} />
              <Route path="/leads/new" element={<NewLead />} />
              <Route path="/leads/:id" element={<LeadDetails />} />

              <Route path="/lead-guide" element={<LeadGuide />} />
              <Route path="/sales/call-guide" element={<SalesCallGuide />} />
              <Route path="/sales/pipeline" element={<SalesPipeline />} />
              <Route path="/profile" element={<Profile />} />

              {FINANCE_ROUTES.map(([path, Page]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    canAccessFinance ? (
                      <Page />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  }
                />
              ))}

              <Route path="/payroll" element={<PayrollManagement />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ProjectFormModal />
    </UiProvider>
  )
}
