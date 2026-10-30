import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar.jsx'

export default function PublicLayout() {
  return (
    <div className="public-site lux-theme">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <PublicNavbar />

      <main>
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-main">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">S</span>
              StartupLift <strong>Dev</strong>
            </div>

            <p>
              Building digital experiences that help businesses establish, grow
              and scale their online presence.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/services">Services</a>
              <a href="/work">Our Work</a>
              <a href="/contact">Contact</a>
            </div>

            <div>
              <h4>Services</h4>
              <span>Web Development</span>
              <span>Web Applications</span>
              <span>SEO</span>
              <span>Digital Marketing</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} StartupLift Dev</span>

          <span>Built for businesses ready to grow.</span>
        </div>
      </footer>
    </div>
  )
}
