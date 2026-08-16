import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="public-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-mark">S</div>

            <span>StartupLift</span>
          </div>

          <p>Helping businesses turn opportunities into growth.</p>
        </div>

        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/about">About</Link>

          <Link to="/services">Services</Link>

          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>

          <Link to="/login">CRM Login</Link>

          <a href="#services">Features</a>

          <a href="#about">Why Us</a>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>

          <span>hello@yourbusiness.com</span>

          <span>+1 (000) 000-0000</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 StartupLift. All rights reserved.</span>
      </div>
    </footer>
  )
}
