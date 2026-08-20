import React from 'react'
import './css/visual.css'

export default function HeroServiceVisual() {
  return (
    <div className="services-visual">
      <div className="services-visual-bg"></div>

      {/* Desktop connection lines */}
      <div className="connection-line line-web"></div>
      <div className="connection-line line-seo"></div>
      <div className="connection-line line-growth"></div>

      {/* WEB DEVELOPMENT */}
      <article className="service-node service-node-web">
        <div className="service-node-icon">
          <span>&lt;/&gt;</span>
        </div>

        <div className="service-node-info">
          <span className="service-node-number">01</span>

          <h3>Web Development</h3>

          <p>A professional website built around your business.</p>
        </div>

        <div className="service-node-status">
          <i></i>
          BUILDING
        </div>
      </article>

      {/* CENTER */}
      <div className="growth-center">
        <div className="growth-center-ring ring-1"></div>
        <div className="growth-center-ring ring-2"></div>

        <div className="growth-center-core">
          <div className="growth-logo">SL</div>

          <span>STARTUPLIFT</span>

          <strong>GROWTH</strong>
        </div>
      </div>

      {/* SEO */}
      <article className="service-node service-node-seo">
        <div className="service-node-icon">
          <span>⌕</span>
        </div>

        <div className="service-node-info">
          <span className="service-node-number">02</span>

          <h3>SEO</h3>

          <p>Improve your visibility and get discovered online.</p>
        </div>

        <div className="service-node-status">
          <i></i>
          OPTIMIZING
        </div>
      </article>

      {/* TRAFFIC */}
      <article className="service-node service-node-traffic">
        <div className="service-node-icon">
          <span>↗</span>
        </div>

        <div className="service-node-info">
          <span className="service-node-number">03</span>

          <h3>Traffic Growth</h3>

          <p>Bring more qualified visitors to your business.</p>
        </div>

        <div className="service-node-status">
          <i></i>
          GROWING
        </div>
      </article>

      {/* Small floating metric */}
      <div className="visual-metric metric-visibility">
        <span className="metric-icon">↗</span>

        <div>
          <small>VISIBILITY</small>
          <strong>Growing</strong>
        </div>
      </div>

      <div className="visual-metric metric-customers">
        <span className="metric-icon">+</span>

        <div>
          <small>NEW CUSTOMERS</small>
          <strong>Potential ↑</strong>
        </div>
      </div>
    </div>
  )
}
