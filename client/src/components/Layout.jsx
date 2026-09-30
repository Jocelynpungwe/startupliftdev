import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCircle,
  LogOut,
  WalletCards,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BookOpen,
  Menu,
  X,
  BarChart3,
  BriefcaseBusiness,
  ShieldCheck,
  PhoneCall,
  Lightbulb,
  FileText,
  RefreshCw,
  Workflow,
  DollarSign,
} from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'

export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((s) => s.auth.user)

  const [darkMode, setDarkMode] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const canManageUsers =
    user?.role === 'admin' || user?.permissions?.includes('user:create')

  const canManagePayroll = user?.role === 'admin' || user?.role === 'manager'

  const canAccessFinance =
    ['admin', 'manager', 'finance'].includes(user?.role) ||
    user?.permissions?.includes('finance:read')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`

  return (
    <div className={`crm-shell ${darkMode ? 'dark' : 'light'}`}>
      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu} />
      )}

      {/* SIDEBAR */}

      <aside className={`crm-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* BRAND */}

        <div className="sidebar-brand">
          <div className="brand-logo">SL</div>

          <div className="brand-text">
            <strong>
              Startup<span>Lift</span>
            </strong>

            <small>DEV CRM</small>
          </div>

          <button className="mobile-close" onClick={closeMobileMenu}>
            <X size={20} />
          </button>
        </div>

        {/* SEARCH */}

        <button className="sidebar-search">
          <Search size={17} />

          <span>Search</span>

          <kbd>⌘ K</kbd>
        </button>

        {/* NAVIGATION */}

        <nav className="crm-navigation">
          {/* ANALYTICS */}

          <div className="nav-section">
            <div className="nav-section-title">Analytics</div>

            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              end
              onClick={closeMobileMenu}
            />

            {/* <NavItem
              to="/leads"
              icon={<BarChart3 size={18} />}
              label="Sales Pipeline"
              onClick={closeMobileMenu}
            /> */}
          </div>

          {/* SALES */}

          <div className="nav-section">
            <div className="nav-section-title">Sales</div>

            <NavItem
              to="/leads"
              icon={<Users size={18} />}
              label="All Leads"
              onClick={closeMobileMenu}
            />

            <NavItem
              to="/leads/new"
              icon={<UserPlus size={18} />}
              label="Add New Lead"
              onClick={closeMobileMenu}
            />
            <NavItem
              to="/sales/pipeline"
              icon={<Workflow size={18} />}
              label="Sales Pipeline"
              onClick={closeMobileMenu}
            />
          </div>

          {/* Guides */}

          <div className="nav-section">
            <div className="nav-section-title">Guides</div>

            <NavItem
              to="/lead-guide"
              icon={<BookOpen size={18} />}
              label="Lead Guide"
              onClick={closeMobileMenu}
            />
            <NavItem
              to="/sales/call-guide"
              icon={<PhoneCall size={18} />}
              label="Call Guide"
              onClick={closeMobileMenu}
            />
          </div>

          {/* FINANCE */}
          {canAccessFinance && (
            <div className="nav-section">
              <div className="nav-section-title">Finance</div>
              <NavItem
                to="/finance"
                icon={<BarChart3 size={18} />}
                label="Financial Overview"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/income"
                icon={<DollarSign size={18} />}
                label="Income"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/expenses"
                icon={<WalletCards size={18} />}
                label="Expenses"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/subscriptions"
                icon={<RefreshCw size={18} />}
                label="Subscriptions"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/profit-loss"
                icon={<FileText size={18} />}
                label="Profit & Loss"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/cash-flow"
                icon={<Workflow size={18} />}
                label="Cash Flow"
                onClick={closeMobileMenu}
              />
              <NavItem
                to="/finance/reports"
                icon={<FileText size={18} />}
                label="Financial Reports"
                onClick={closeMobileMenu}
              />
            </div>
          )}

          {/* MANAGEMENT */}

          {(canManageUsers || canManagePayroll) && (
            <div className="nav-section">
              <div className="nav-section-title">Management</div>

              {canManageUsers && (
                <NavItem
                  to="/users"
                  icon={<ShieldCheck size={18} />}
                  label="User Management"
                  onClick={closeMobileMenu}
                />
              )}

              {canManagePayroll && (
                <NavItem
                  to="/payroll"
                  icon={<WalletCards size={18} />}
                  label="Payroll"
                  onClick={closeMobileMenu}
                />
              )}
            </div>
          )}

          {/* ACCOUNT */}

          <div className="nav-section">
            <div className="nav-section-title">Account</div>

            <NavItem
              to="/profile"
              icon={<UserCircle size={18} />}
              label="My Profile"
              onClick={closeMobileMenu}
            />
          </div>
          <div className="nav-section">
            <button
              className="logout-button"
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut size={17} />

              <span>Sign out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}

      <main className="crm-main">
        {/* TOP BAR */}

        <header className="crm-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>

          <div className="topbar-right">
            {/* SEARCH */}

            <button className="topbar-icon">
              <Search size={18} />
            </button>

            {/* NOTIFICATIONS */}

            <button className="topbar-icon notification-button">
              <Bell size={18} />

              <span className="notification-dot" />
            </button>

            {/* USER */}

            <button
              className="topbar-user"
              onClick={() => navigate('/profile')}
            >
              <div className="topbar-avatar">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="" />
                ) : (
                  initials
                )}
              </div>

              <div className="topbar-user-info">
                <strong>
                  {user?.firstName} {user?.lastName}
                </strong>

                <span>{formatRole(user?.role)}</span>
              </div>

              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* PAGE */}

        <section className="crm-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

/* -------------------------------- */
/* NAV ITEM                         */
/* -------------------------------- */

function NavItem({ to, icon, label, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `crm-nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon}</span>

      <span className="nav-label">{label}</span>
    </NavLink>
  )
}

/* -------------------------------- */
/* ROLE FORMATTER                   */
/* -------------------------------- */

function formatRole(role) {
  if (!role) return ''

  const roles = {
    admin: 'Administrator',
    manager: 'Manager',
    sales: 'Sales Representative',
    salesperson: 'Sales Representative',
    finance: 'Finance',
  }

  return roles[role] || role.charAt(0).toUpperCase() + role.slice(1)
}
