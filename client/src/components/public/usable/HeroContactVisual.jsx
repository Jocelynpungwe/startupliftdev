import React from 'react'
import './css/visual.css'

export default function HeroContactVisual() {
  return (
    <div className="contact-visual">
      <div className="contact-visual-glow"></div>

      {/* Connection rings */}
      <div className="contact-ring contact-ring-one"></div>
      <div className="contact-ring contact-ring-two"></div>

      {/* Main connection */}
      <div className="contact-core">
        <div className="contact-core-ring"></div>

        <div className="contact-core-icon">SL</div>

        <span>STARTUPLIFT</span>

        <strong>LET'S BUILD</strong>
      </div>

      {/* Client node */}
      <div className="contact-node client-node">
        <div className="contact-node-icon">+</div>

        <div className="contact-node-content">
          <span>YOUR BUSINESS</span>
          <strong>YOUR IDEA</strong>
        </div>
      </div>

      {/* Response indicator */}
      <div className="response-indicator">
        <div className="response-dot"></div>

        <div>
          <span>STATUS</span>
          <strong>Ready to connect</strong>
        </div>
      </div>

      {/* Message card */}
      <div className="contact-message-card">
        <div className="message-icon">
          <span></span>
        </div>

        <div className="message-content">
          <small>NEW PROJECT</small>
          <strong>Let's talk about it.</strong>
        </div>

        <div className="message-arrow">→</div>
      </div>

      {/* Connection lines */}
      <div className="contact-connection connection-client"></div>
      <div className="contact-connection connection-website"></div>
      <div className="contact-connection connection-growth"></div>

      {/* Growth node */}
      <div className="contact-node growth-node">
        <div className="contact-node-icon">↗</div>

        <div className="contact-node-content">
          <span>YOUR FUTURE</span>
          <strong>YOUR GROWTH</strong>
        </div>
      </div>

      {/* Website node */}
      <div className="contact-node website-node">
        <div className="contact-node-icon">&lt;/&gt;</div>

        <div className="contact-node-content">
          <span>YOUR WEBSITE</span>
          <strong>YOUR PRESENCE</strong>
        </div>
      </div>

      {/* Decorative particles */}
      <span className="contact-particle particle-one"></span>
      <span className="contact-particle particle-two"></span>
      <span className="contact-particle particle-three"></span>
      <span className="contact-particle particle-four"></span>
    </div>
  )
}
