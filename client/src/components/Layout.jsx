// import React from 'react'
// import { NavLink, Outlet } from 'react-router-dom'
// import {
//   LayoutDashboard,
//   Users,
//   UserPlus,
//   UserCircle,
//   LogOut,
// } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../features/auth/authSlice.js'

// export default function Layout() {
//   const dispatch = useDispatch()
//   const user = useSelector((s) => s.auth.user)

//   const canManageUsers =
//     user?.role === 'admin' || user?.permissions?.includes('user:create')
//   const canManagePayroll = user?.role === 'admin' || user?.role === 'manager'

//   return (
//     <div className="app-shell">
//       <aside className="sidebar">
//         <div className="brand">
//           Sales<span>CRM</span>
//         </div>

//         <nav>
//           <NavLink to="/" end>
//             <LayoutDashboard size={18} /> Dashboard
//           </NavLink>
//           <NavLink to="/leads">
//             <Users size={18} /> All Leads
//           </NavLink>
//           <NavLink to="/leads/new">
//             <UserPlus size={18} /> Add Lead
//           </NavLink>
//           {canManageUsers && <NavLink to="/users">User Management</NavLink>}
//           {canManagePayroll && <NavLink to="/payroll">Payroll</NavLink>}
//           <NavLink to="/profile">
//             <UserCircle size={18} /> Profile
//           </NavLink>
//         </nav>

//         <button className="logout-btn" onClick={() => dispatch(logout())}>
//           <LogOut size={18} /> Sign out
//         </button>
//       </aside>

//       <main className="main">
//         <header className="topbar">
//           <div>
//             <h1>Sales CRM</h1>
//             <p>Manage your sales pipeline</p>
//           </div>
//           <div className="user-mini">
//             <div className="avatar">
//               {user?.profilePicture ? (
//                 <img src={user.profilePicture} alt="" />
//               ) : (
//                 `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
//               )}
//             </div>
//             <div>
//               <strong>
//                 {user?.firstName} {user?.lastName}
//               </strong>
//               <small>{user?.role}</small>
//             </div>
//           </div>
//         </header>

//         <section className="content">
//           <Outlet />
//         </section>
//       </main>
//     </div>
//   )
// }

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
  Sun,
  Moon,
  Menu,
  X,
  BarChart3,
  BriefcaseBusiness,
  ShieldCheck,
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

            <NavItem
              to="/leads"
              icon={<BarChart3 size={18} />}
              label="Sales Pipeline"
              onClick={closeMobileMenu}
            />
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
          </div>

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

            <button
              className="crm-nav-item"
              onClick={() => {
                // Add settings page later
              }}
            >
              <Settings size={18} />

              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">
          {/* USER CARD */}

          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="" />
              ) : (
                initials
              )}
            </div>

            <div className="sidebar-user-info">
              <strong>
                {user?.firstName} {user?.lastName}
              </strong>

              <span>{formatRole(user?.role)}</span>
            </div>

            <ChevronDown size={16} />
          </div>

          {/* THEME */}

          <div className="sidebar-actions">
            {/* <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
              title="Change theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}

              <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
            </button> */}

            <button
              className="logout-button"
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut size={17} />

              <span>Sign out</span>
            </button>
          </div>
        </div>
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

            <div className="topbar-title">
              <span>Workspace</span>

              <h1>Sales Dashboard</h1>
            </div>
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
  }

  return roles[role] || role.charAt(0).toUpperCase() + role.slice(1)
}
