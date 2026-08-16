import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => {
    setMobileOpen(false)
  }

  return (
    <header className="public-navbar">
      <div className="nav-container">
        {/* LOGO */}

        <Link to="/" className="brand" onClick={closeMobile}>
          <div className="brand-mark">S</div>

          <div className="brand-text">
            <strong>StartupLift</strong>

            <span>DEV</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <nav className="desktop-nav">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/services">Services</Link>

          <Link to="/work">Our Work</Link>

          <Link to="/contact">Contact</Link>
        </nav>

        {/* ACTIONS */}

        <div className="nav-actions">
          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/login" className="nav-login">
            CRM Login
          </Link>

          <Link to="/contact" className="nav-cta">
            Start a Project
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* MOBILE */}

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={closeMobile}>
            Home
          </Link>

          <Link to="/about" onClick={closeMobile}>
            About
          </Link>

          <Link to="/services" onClick={closeMobile}>
            Services
          </Link>

          <Link to="/work" onClick={closeMobile}>
            Our Work
          </Link>

          <Link to="/contact" onClick={closeMobile}>
            Contact
          </Link>

          <Link to="/login" className="mobile-login" onClick={closeMobile}>
            CRM Login
          </Link>
        </div>
      )}
    </header>
  )
}
