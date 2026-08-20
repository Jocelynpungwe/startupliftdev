import React from 'react'
import './css/visual.css'

export default function HeroTheeVisual() {
  return (
    <div className="services-visual">
      {/* Background glow */}
      <div className="services-glow"></div>

      {/* Main connection line */}
      <div className="service-connection">
        <span className="connection-dot dot-1"></span>
        <span className="connection-dot dot-2"></span>
        <span className="connection-dot dot-3"></span>
      </div>

      {/* Website service */}
      <div className="service-node website-node">
        <div className="node-icon">
          <span>&lt;/&gt;</span>
        </div>

        <div className="node-content">
          <span className="node-number">01</span>
          <strong>WEBSITE</strong>
          <small>Build your foundation</small>
        </div>

        <div className="node-status">
          <span></span>
          BUILDING
        </div>
      </div>

      {/* SEO service */}
      <div className="service-node seo-node">
        <div className="node-icon">
          <span>⌕</span>
        </div>

        <div className="node-content">
          <span className="node-number">02</span>
          <strong>SEO</strong>
          <small>Get discovered online</small>
        </div>

        <div className="node-status">
          <span></span>
          OPTIMIZING
        </div>
      </div>

      {/* Traffic service */}
      <div className="service-node traffic-node">
        <div className="node-icon">
          <span>↗</span>
        </div>

        <div className="node-content">
          <span className="node-number">03</span>
          <strong>TRAFFIC</strong>
          <small>Bring customers to you</small>
        </div>

        <div className="node-status">
          <span></span>
          GROWING
        </div>
      </div>

      {/* Center result */}
      <div className="service-result">
        <div className="result-ring">
          <div className="result-inner">
            <span>YOUR</span>
            <strong>GROWTH</strong>
          </div>
        </div>

        <div className="result-label">
          <span>THE GOAL</span>
          <strong>MORE CUSTOMERS</strong>
        </div>
      </div>

      {/* Floating metric */}
      <div className="service-metric metric-top">
        <div className="metric-symbol">↗</div>

        <div>
          <small>ONLINE VISIBILITY</small>
          <strong>↑ Growing</strong>
        </div>
      </div>

      {/* Floating metric */}
      <div className="service-metric metric-bottom">
        <div className="metric-symbol">$</div>

        <div>
          <small>BUSINESS GROWTH</small>
          <strong>Built to Scale</strong>
        </div>
      </div>

      {/* Particles */}
      <span className="service-particle particle-1"></span>
      <span className="service-particle particle-2"></span>
      <span className="service-particle particle-3"></span>
    </div>
  )
}
