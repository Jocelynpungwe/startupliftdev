import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'

export default function PublicNavbar({ lightMode, setLightMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Prevent the page from scrolling while the mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <nav className="public-navbar">
        {/* BRAND */}
        <Link to="/" className="brand" onClick={closeSidebar}>
          <span
            className="brand-text"
            style={{ marginTop: '50px', marginLeft: '-50px' }}
          >
            <img
              src="/logo.png"
              alt="StartupLift Dev Logo"
              style={{ width: '150px', height: '100%' }}
            />
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="public-nav">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/services">Services</Link>

          <Link to="/work">Our Work</Link>

          <Link to="/contact">Contact</Link>
        </div>

        {/* NAV ACTIONS */}
        <div className="nav-actions">
          {/* LOGIN */}
          <Link to="/login" className="nav-login" id="login_nav">
            Login
          </Link>

          {/* MOBILE / TABLET HAMBURGER */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={toggleSidebar}
            aria-label={
              sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* =========================================================
          MOBILE / TABLET OVERLAY
      ========================================================= */}

      <div
        className={`mobile-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />

      {/* =========================================================
          MOBILE / TABLET SIDEBAR
      ========================================================= */}

      <aside className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* SIDEBAR HEADER */}
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-brand">
            <div>
              <img
                src="/favcon.png"
                alt="StartupLift Dev"
                style={{ width: '30%', height: '100%' }}
              />
            </div>

            <span>
              StartupLift <strong>Dev</strong>
            </span>
          </div>

          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* SIDEBAR LINKS */}
        <nav className="mobile-sidebar-nav">
          <Link to="/" onClick={closeSidebar}>
            <span>01</span>
            Home
          </Link>

          <Link to="/about" onClick={closeSidebar}>
            <span>02</span>
            About
          </Link>
          <Link to="/services" onClick={closeSidebar}>
            <span>03</span>
            Services
          </Link>
          <Link to="/work" onClick={closeSidebar}>
            <span>04</span>
            Our Work
          </Link>
          <Link to="/contact" onClick={closeSidebar}>
            <span>05</span>
            Contact
          </Link>
          <div className="mobile-sidebar-bottom">
            <p>Build something that moves your business forward.</p>

            <Link
              to="/login"
              className="mobile-sidebar-login"
              onClick={closeSidebar}
            >
              Login
            </Link>
          </div>
        </nav>

        {/* SIDEBAR BOTTOM */}
      </aside>
    </>
  )
}
