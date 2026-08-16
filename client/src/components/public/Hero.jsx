import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="eyebrow">
          <span className="eyebrow-dot"></span>
          DIGITAL DEVELOPMENT STUDIO
        </div>

        <h1>
          Digital experiences
          <br />
          <span>made to grow</span>
          <br />
          your business.
        </h1>

        <p className="hero-description">
          We help entrepreneurs and small businesses build professional
          websites, increase their online visibility, and turn digital traffic
          into real opportunities.
        </p>

        <div className="hero-buttons">
          <Link to="/contact" className="primary-button">
            Start a Project
            <span>↗</span>
          </Link>

          <Link to="/services" className="secondary-button">
            Explore Services
          </Link>
        </div>

        <div className="hero-trust">
          <span>Built for ambitious businesses</span>

          <div className="trust-line"></div>

          <span>Web • SEO • Growth</span>
        </div>
      </div>

      {/* HERO VISUAL */}

      <div className="hero-visual">
        <div className="hero-glow"></div>

        <div className="floating-orb orb-one"></div>
        <div className="floating-orb orb-two"></div>

        <div className="website-window">
          <div className="window-top">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="window-url">startup-business.com</div>
          </div>

          <div className="website-preview">
            <div className="preview-nav">
              <strong>BUSINESS</strong>

              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="preview-heading">
              Build something
              <br />
              <em>people remember.</em>
            </div>

            <div className="preview-button">Get Started →</div>

            <div className="preview-chart">
              <div className="chart-label">Website Performance</div>

              <div className="chart-line">
                <span></span>
              </div>

              <div className="chart-stats">
                <strong>+84.6%</strong>
                <small>Growth</small>
              </div>
            </div>
          </div>
        </div>

        <div className="floating-stat stat-one">
          <strong>+84%</strong>
          <span>Traffic</span>
        </div>

        <div className="floating-stat stat-two">
          <strong>+42%</strong>
          <span>Leads</span>
        </div>
      </div>
    </section>
  )
}
