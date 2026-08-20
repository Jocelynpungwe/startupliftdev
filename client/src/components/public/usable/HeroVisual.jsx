import React from 'react'
import './css/visualOne.css'

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="sl-visual-glow"></div>

      {/* Main Growth System */}
      <div className="sl-growth-system">
        {/* Header */}
        <div className="sl-system-header">
          <div className="sl-system-brand">
            <div className="sl-brand-icon">SL</div>

            <div>
              <strong>STARTUPLIFT</strong>
              <span>DIGITAL GROWTH</span>
            </div>
          </div>

          <div className="sl-live-status">
            <span></span>
            LIVE
          </div>
        </div>

        {/* Growth flow */}
        <div className="sl-growth-flow">
          <div className="sl-flow-line"></div>

          {/* Build */}
          <div className="sl-growth-step">
            <div className="sl-step-icon">✦</div>

            <div className="sl-step-number">01</div>

            <strong>BUILD</strong>

            <span>Websites & Apps</span>
          </div>

          {/* Grow */}
          <div className="sl-growth-step sl-step-active">
            <div className="sl-step-icon">↗</div>

            <div className="sl-step-number">02</div>

            <strong>GROW</strong>

            <span>SEO & Traffic</span>
          </div>

          {/* Convert */}
          <div className="sl-growth-step">
            <div className="sl-step-icon">◇</div>

            <div className="sl-step-number">03</div>

            <strong>CONVERT</strong>

            <span>Leads & Sales</span>
          </div>
        </div>

        {/* Analytics */}
        <div className="sl-analytics-card">
          <div className="sl-analytics-header">
            <div>
              <span>BUSINESS GROWTH</span>
              <strong>+84.6%</strong>
            </div>

            <small>12 MONTHS</small>
          </div>

          <div className="sl-chart">
            <div className="sl-chart-grid"></div>
            <div className="sl-chart-grid sl-chart-grid-two"></div>
            <div className="sl-chart-grid sl-chart-grid-three"></div>

            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="slGrowthLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" />
                  <stop offset="100%" />
                </linearGradient>

                <linearGradient id="slGrowthArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopOpacity="0.25" />
                  <stop offset="100%" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                className="sl-chart-area"
                d="
              M0 130
              C45 125 65 115 100 118
              C135 121 150 95 180 100
              C215 105 230 90 260 94
              C295 98 310 65 340 72
              C375 80 390 55 420 60
              C450 65 470 30 500 18
              L500 150
              L0 150
              Z
            "
              />

              <path
                className="sl-chart-line"
                d="
              M0 130
              C45 125 65 115 100 118
              C135 121 150 95 180 100
              C215 105 230 90 260 94
              C295 98 310 65 340 72
              C375 80 390 55 420 60
              C450 65 470 30 500 18
            "
              />

              <circle className="sl-chart-point" cx="500" cy="18" r="5" />
            </svg>
          </div>

          <div className="sl-chart-labels">
            <span>JAN</span>
            <span>APR</span>
            <span>JUL</span>
            <span>OCT</span>
            <span>DEC</span>
          </div>
        </div>

        {/* Bottom metrics */}
        <div className="sl-growth-metrics">
          <div>
            <span>TRAFFIC</span>
            <strong>+84%</strong>
          </div>

          <div>
            <span>LEADS</span>
            <strong>+42%</strong>
          </div>

          <div>
            <span>CONVERSIONS</span>
            <strong>+61%</strong>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="sl-floating-card sl-floating-one">
        <span>01</span>
        <strong>BUILD</strong>
        <small>Digital Presence</small>
      </div>

      <div className="sl-floating-card sl-floating-two">
        <span>02</span>
        <strong>GROW</strong>
        <small>More Visibility</small>
      </div>

      <div className="sl-floating-card sl-floating-three">
        <span>03</span>
        <strong>CONVERT</strong>
        <small>More Customers</small>
      </div>

      {/* Decorative particles */}
      <span className="sl-particle sl-particle-one"></span>
      <span className="sl-particle sl-particle-two"></span>
      <span className="sl-particle sl-particle-three"></span>
    </div>
  )
}
