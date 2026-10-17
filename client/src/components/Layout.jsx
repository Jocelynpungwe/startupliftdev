import '../crm/styles.js'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  BarChart3,
  ChevronDown,
  ChevronRight,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PhoneCall,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCircle,
  UserPlus,
  Users,
  WalletCards,
  Workflow,
  X,
} from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import CommandPalette from './CommandPalette.jsx'

const ROLE_LABELS = {
  admin: 'Administrator',
  manager: 'Manager',
  sales: 'Sales Representative',
  salesperson: 'Sales Representative',
  finance: 'Finance',
}

const formatRole = (role) =>
  !role
    ? ''
    : ROLE_LABELS[role] || role.charAt(0).toUpperCase() + role.slice(1)

/** Small localStorage-backed state (safe when storage is unavailable). */
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable: preference just won't persist */
    }
  }, [key, value])

  return [value, setValue]
}

/** Single source for the sidebar, breadcrumb and command palette. */
function buildNav({ canFinance, canUsers, canPayroll }) {
  return [
    {
      title: 'Analytics',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
      ],
    },
    {
      title: 'Sales',
      items: [
        { to: '/leads', label: 'All Leads', icon: Users, end: true },
        { to: '/leads/new', label: 'Add New Lead', icon: UserPlus },
        { to: '/sales/pipeline', label: 'Sales Pipeline', icon: Workflow },
      ],
    },
    {
      title: 'Guides',
      items: [
        { to: '/lead-guide', label: 'Lead Guide', icon: BookOpen },
        { to: '/sales/call-guide', label: 'Call Guide', icon: PhoneCall },
      ],
    },
    canFinance && {
      title: 'Finance',
      items: [
        { to: '/finance', label: 'Financial Overview', icon: BarChart3, end: true },
        { to: '/finance/income', label: 'Income', icon: DollarSign },
        { to: '/finance/expenses', label: 'Expenses', icon: WalletCards },
        { to: '/finance/subscriptions', label: 'Subscriptions', icon: RefreshCw },
        { to: '/finance/profit-loss', label: 'Profit & Loss', icon: FileText },
        { to: '/finance/cash-flow', label: 'Cash Flow', icon: Workflow },
        { to: '/finance/reports', label: 'Financial Reports', icon: FileText },
      ],
    },
    (canUsers || canPayroll) && {
      title: 'Management',
      items: [
        canUsers && { to: '/users', label: 'User Management', icon: ShieldCheck },
        canPayroll && { to: '/payroll', label: 'Payroll', icon: WalletCards },
      ].filter(Boolean),
    },
  ].filter(Boolean)
}

export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const user = useSelector((s) => s.auth.user)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = usePersistentState('crm_sidebar_compact', false)
  const [closedGroups, setClosedGroups] = usePersistentState('crm_nav_closed', [])
  const menuRef = useRef(null)

  const canUsers =
    user?.role === 'admin' || user?.permissions?.includes('user:create')
  const canPayroll = user?.role === 'admin' || user?.role === 'manager'
  const canFinance =
    ['admin', 'manager', 'finance'].includes(user?.role) ||
    user?.permissions?.includes('finance:read')

  const sections = useMemo(
    () => buildNav({ canFinance, canUsers, canPayroll }),
    [canFinance, canUsers, canPayroll],
  )

  // The command palette also offers My Profile, which has no sidebar entry.
  const paletteSections = useMemo(
    () => [
      ...sections,
      {
        title: 'Account',
        items: [{ to: '/profile', label: 'My Profile', icon: UserCircle }],
      },
    ],
    [sections],
  )

  // Breadcrumb: longest matching nav item for the current path
  const crumb = useMemo(() => {
    let best = null
    for (const s of paletteSections) {
      for (const it of s.items) {
        const match =
          pathname === it.to || (!it.end && pathname.startsWith(`${it.to}/`))
        if (match && (!best || it.to.length > best.item.to.length)) {
          best = { section: s.title, item: it }
        }
      }
    }
    if (!best && pathname.startsWith('/leads/')) {
      return { section: 'Sales', label: 'Lead details' }
    }
    return best ? { section: best.section, label: best.item.label } : null
  }, [paletteSections, pathname])

  // close transient UI on navigation
  useEffect(() => {
    setMobileOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // profile menu: outside click + Escape
  useEffect(() => {
    if (!menuOpen) return undefined
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const toggleGroup = (title) =>
    setClosedGroups((list) =>
      list.includes(title) ? list.filter((t) => t !== title) : [...list, title],
    )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
  const railed = compact && !mobileOpen

  return (
    <div className={`crm-shell dark ${railed ? 'is-compact' : ''}`}>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`crm-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <img
            className="brand-logo"
            src="/logo-mark.png"
            alt=""
            width="40"
            height="33"
          />

          <div className="brand-text">
            <strong>
              Startup<span>Lift</span>
            </strong>
            <small>DEV CRM</small>
          </div>

          <button
            type="button"
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <button
          type="button"
          className="sidebar-search"
          onClick={() => setPaletteOpen(true)}
          title="Quick search (Ctrl K)"
          aria-label="Quick search"
        >
          <Search size={16} />
          <span>Quick search</span>
          <kbd>Ctrl K</kbd>
        </button>

        <nav className="crm-navigation">
          {sections.map((section) => {
            const closed = !railed && closedGroups.includes(section.title)
            const listId = `nav-group-${section.title}`
            return (
              <div className="nav-section" key={section.title}>
                <button
                  type="button"
                  className="nav-section-title"
                  onClick={() => toggleGroup(section.title)}
                  aria-expanded={!closed}
                  aria-controls={listId}
                  tabIndex={railed ? -1 : 0}
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    size={13}
                    className={closed ? 'is-closed' : ''}
                    aria-hidden="true"
                  />
                </button>

                <div id={listId} className="nav-group" hidden={closed}>
                  {section.items.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      title={railed ? label : undefined}
                      aria-label={railed ? label : undefined}
                      className={({ isActive }) =>
                        `crm-nav-item ${isActive ? 'active' : ''}`
                      }
                    >
                      <span className="nav-icon">
                        <Icon size={17} />
                      </span>
                      <span className="nav-label">{label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="sidebar-foot">
          <button
            type="button"
            className="collapse-button"
            onClick={() => setCompact((c) => !c)}
            aria-pressed={compact}
            title={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {compact ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            <span>Collapse</span>
          </button>
        </div>
      </aside>

      <main className="crm-main">
        <header className="crm-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {crumb && (
              <nav className="crumb" aria-label="Breadcrumb">
                <span>{crumb.section}</span>
                <ChevronRight size={14} aria-hidden="true" />
                <strong>{crumb.label}</strong>
              </nav>
            )}
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="topbar-search"
              onClick={() => setPaletteOpen(true)}
              aria-label="Quick search"
            >
              <Search size={15} />
              <span>Jump to…</span>
              <kbd>Ctrl K</kbd>
            </button>

            <div className="profile-menu" ref={menuRef}>
              <button
                type="button"
                className="profile-trigger"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="topbar-avatar">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="" />
                  ) : (
                    initials
                  )}
                </span>
                <span className="profile-trigger__text">
                  <strong>
                    {user?.firstName} {user?.lastName}
                  </strong>
                  <span>{formatRole(user?.role)}</span>
                </span>
                <ChevronDown size={15} aria-hidden="true" />
              </button>

              {menuOpen && (
                <div className="ui-menu" role="menu">
                  <div className="ui-menu__head">
                    <strong>
                      {user?.firstName} {user?.lastName}
                    </strong>
                    <span>{user?.email}</span>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => navigate('/profile')}
                  >
                    <UserCircle size={16} /> My profile
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="is-danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="crm-content">
          <Outlet />
        </section>
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        sections={paletteSections}
      />
    </div>
  )
}
