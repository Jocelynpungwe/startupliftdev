import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAnalytics, trackPageView } from './lib/analytics.js'

import { loadMe, initialized } from './features/auth/authSlice.js'

// Public website
import PublicLayout from './layouts/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Work from './pages/Work.jsx'

// CRM
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import NewLead from './pages/NewLead.jsx'
import EditLead from './pages/EditLead.jsx'
import Profile from './pages/Profile.jsx'
import Users from './pages/Users.jsx'
import PayrollManagement from './pages/PayrollManagement.jsx'
import LeadGuide from './pages/LeadGuide.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// Your StartupLift loader
import PageLoader from './components/PageLoader.jsx'
import { initClarity } from './lib/clarity.js'

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const { user, initialized: authInitialized } = useSelector(
    (state) => state.auth,
  )

  /*
  =========================================================
  INITIAL PAGE LOAD
  =========================================================

  This is separate from route navigation.

  It runs when React first loads after:
  - browser refresh
  - opening the website
  - entering the URL directly
  */

  const [initialPageLoading, setInitialPageLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialPageLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  useEffect(() => {
    initClarity()
  }, [])
  /*
  =========================================================
  CHECK EXISTING CRM LOGIN
  =========================================================
  */

  useEffect(() => {
    const token = localStorage.getItem('crm_token')

    if (token) {
      dispatch(loadMe())
    } else {
      dispatch(initialized())
    }
  }, [dispatch])

  /*
  =========================================================
  SHOW LOADER ON INITIAL PAGE LOAD
  =========================================================

  This happens ONLY when App.jsx first mounts.

  Clicking:
  Home → About
  About → Services
  Services → Contact

  will NOT trigger this again.
  */

  if (initialPageLoading) {
    return <PageLoader />
  }

  /*
  =========================================================
  WAIT FOR CRM AUTHENTICATION
  =========================================================

  Only relevant when checking an existing CRM session.
  */

  if (!authInitialized) {
    return <PageLoader />
  }

  /*
  =========================================================
  APPLICATION ROUTES
  =========================================================
  */

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route path="/work" element={<Work />} />

          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* =================================================
          CRM LOGIN
      ================================================= */}

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* =================================================
          PROTECTED CRM
      ================================================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/leads" element={<Leads />} />

            <Route path="/leads/new" element={<NewLead />} />
            <Route path="/lead-guide" element={<LeadGuide />} />
            <Route path="/leads/:id" element={<EditLead />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/payroll" element={<PayrollManagement />} />

            <Route path="/users" element={<Users />} />
          </Route>
        </Route>

        {/* =================================================
          FALLBACK
      ================================================= */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
