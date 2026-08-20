import React from 'react'
import './css/visualSecond.css'

export default function HeroSecondVisual() {
  return (
    <div className="sl-hero-visual">
      <div className="sl-hero-orbit sl-orbit-one"></div>
      <div className="sl-hero-orbit sl-orbit-two"></div>
      <div className="sl-hero-orbit sl-orbit-three"></div>

      <div className="sl-hero-glow"></div>

      {/* Main Dashboard */}
      <div className="sl-growth-dashboard">
        {/* Top bar */}
        <div className="sl-dashboard-top">
          <div className="sl-dashboard-brand">
            <div className="sl-brand-mark">SL</div>

            <div>
              <strong>STARTUPLIFT</strong>
              <span>GROWTH SYSTEM</span>
            </div>
          </div>

          <div className="sl-dashboard-status">
            <span className="sl-status-dot"></span>
            LIVE
          </div>
        </div>

        {/* Main content */}
        <div className="sl-dashboard-content">
          <div className="sl-dashboard-intro">
            <span>YOUR DIGITAL PRESENCE</span>

            <h3>
              Build.
              <br />
              <em>Grow.</em>
              <br />
              Own.
            </h3>
          </div>

          {/* Growth graph */}
          <div className="sl-growth-card">
            <div className="sl-growth-card-header">
              <div>
                <span>ONLINE GROWTH</span>
                <strong>+84.6%</strong>
              </div>

              <div className="sl-growth-period">12 MONTHS</div>
            </div>

            <div className="sl-growth-chart">
              <div className="sl-chart-grid sl-grid-one"></div>
              <div className="sl-chart-grid sl-grid-two"></div>
              <div className="sl-chart-grid sl-grid-three"></div>

              <svg viewBox="0 0 500 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient
                    id="slGrowthGradient"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="0"
                  >
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>

                  <linearGradient
                    id="slAreaGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopOpacity="0.25" />
                    <stop offset="100%" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  className="sl-chart-area"
                  d="
                M0 150
                C45 145 55 130 90 135
                C125 140 135 110 170 115
                C205 120 215 95 245 100
                C280 105 285 72 320 80
                C355 88 370 50 400 58
                C430 65 450 28 500 20
                L500 180
                L0 180
                Z
              "
                />

                <path
                  className="sl-chart-path"
                  d="
                M0 150
                C45 145 55 130 90 135
                C125 140 135 110 170 115
                C205 120 215 95 245 100
                C280 105 285 72 320 80
                C355 88 370 50 400 58
                C430 65 450 28 500 20
              "
                />

                <circle className="sl-chart-point" cx="500" cy="20" r="6" />
              </svg>
            </div>

            <div className="sl-chart-bottom">
              <span>JAN</span>
              <span>MAR</span>
              <span>JUN</span>
              <span>SEP</span>
              <span>DEC</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="sl-dashboard-metrics">
          <div className="sl-metric">
            <div className="sl-metric-icon">↗</div>

            <div>
              <strong>+84%</strong>
              <span>Traffic</span>
            </div>
          </div>

          <div className="sl-metric">
            <div className="sl-metric-icon">◇</div>

            <div>
              <strong>+42%</strong>
              <span>Leads</span>
            </div>
          </div>

          <div className="sl-metric">
            <div className="sl-metric-icon">$</div>

            <div>
              <strong>+61%</strong>
              <span>Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Build card */}
      <div className="sl-floating-growth-card sl-build-card">
        <div className="sl-floating-icon">✦</div>

        <div>
          <span>01</span>
          <strong>BUILD</strong>
        </div>
      </div>

      {/* Floating Grow card */}
      <div className="sl-floating-growth-card sl-grow-card">
        <div className="sl-floating-icon">↗</div>

        <div>
          <span>02</span>
          <strong>GROW</strong>
        </div>
      </div>

      {/* Floating Own card */}
      <div className="sl-floating-growth-card sl-own-card">
        <div className="sl-floating-icon">◈</div>

        <div>
          <span>03</span>
          <strong>OWN</strong>
        </div>
      </div>

      {/* Decorative particles */}
      <span className="sl-hero-particle sl-particle-one"></span>
      <span className="sl-hero-particle sl-particle-two"></span>
      <span className="sl-hero-particle sl-particle-three"></span>
      <span className="sl-hero-particle sl-particle-four"></span>
    </div>
  )
}
