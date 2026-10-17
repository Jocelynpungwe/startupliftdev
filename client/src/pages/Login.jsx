import '../crm/styles.js'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice.js'
import { Navigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useToast } from '../components/ui/UiProvider.jsx'

export default function Login() {
  const dispatch = useDispatch()
  const toast = useToast()

  const { user, loading, error } = useSelector((s) => s.auth)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  if (user) {
    return <Navigate to="/" replace />
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(login(form))
  }

  return (
    <div className="crm-login-page">
      {/* BACKGROUND EFFECTS */}
      <div className="login-grid"></div>
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      {/* TOP LOGO */}
      <header className="login-topbar">
        <Link to="/" className="back-home">
          <ArrowLeft size={16} />
          Back to website
        </Link>
      </header>

      <main className="login-container">
        {/* LEFT SIDE */}
        <section className="login-showcase">
          <div className="showcase-badge">
            <Sparkles size={15} />
            Sales Intelligence Platform
          </div>

          <h1>
            Manage your sales.
            <br />
            <span>Grow your business.</span>
          </h1>
          <p style={{ textAlign: 'left' }} className="new_text">
            Welcome to the StartupLift Dev CRM. Manage leads, track performance,
            monitor revenue and keep your entire sales team organized in one
            powerful workspace.
          </p>

          {/* FEATURE LIST */}
          <div className="login-features">
            <div className="login-feature">
              <div className="feature-icon">
                <BarChart3 size={18} />
              </div>

              <div>
                <strong>Sales Analytics</strong>
                <p>Track leads, revenue and deals in real time.</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Lead Management</strong>
                <p>Manage your entire sales pipeline from one place.</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Role Based Access</strong>
                <p>Give every team member the right permissions.</p>
              </div>
            </div>
          </div>

          {/* FLOATING ANALYTICS CARD */}
          <div className="floating-stat-card floating-card-one">
            <div className="floating-card-icon">
              <BarChart3 size={17} />
            </div>

            <div>
              <small>Revenue</small>
              <strong>$248,420</strong>
            </div>

            <span className="growth">+18.4%</span>
          </div>

          <div className="floating-stat-card floating-card-two">
            <div className="mini-avatar">SL</div>

            <div>
              <small>Approved Deals</small>
              <strong>128</strong>
            </div>

            <CheckCircle2 size={18} className="success-icon" />
          </div>
        </section>

        {/* RIGHT SIDE LOGIN */}
        <section className="login-form-wrapper">
          <div className="login-form-card">
            {/* FORM HEADER */}
            <div className="form-header">
              <div className="mobile-logo">
                <div className="logo-icon">
                  <BarChart3 size={18} />
                </div>

                <strong>
                  StartupLift <span>DEV</span>
                </strong>
              </div>

              <div className="login-icon">
                <LockKeyhole size={22} />
              </div>

              <h2>Welcome back</h2>

              <p>Sign in to access your CRM workspace.</p>
            </div>

            {/* ERROR */}
            {error && <div className="login-error">{error}</div>}

            {/* FORM */}
            <form onSubmit={submit}>
              <div className="form-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <div className="password-label">
                  <label htmlFor="password">Password</label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      toast.info('Please contact your administrator to reset your password.')
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="login-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to CRM
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* SECURITY MESSAGE */}
            <div className="secure-login">
              <ShieldCheck size={16} />

              <span>Your connection is secure and protected.</span>
            </div>
            {/* FOOTER */}
            <div className="login-footer">
              <span>Need help?</span>

              <Link to="/contact">Contact StartupLift Dev</Link>
            </div>
          </div>
        </section>
      </main>

      {/* BOTTOM */}
      <footer className="login-page-footer">
        © {new Date().getFullYear()} StartupLift Dev. All rights reserved.
      </footer>
    </div>
  )
}
