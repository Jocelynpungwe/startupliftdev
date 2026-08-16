import React from 'react'
import './style/mission.css'
export default function Mission() {
  return (
    <section className="mission-section">
      <div className="business-container">
        <div className="mission-header">
          <p className="eyebrow">OUR MISSION</p>

          <h2>
            build something of Your
            <span>own.</span>
          </h2>

          <p className="mission-intro">
            StartupLift Dev exists to help entrepreneurs and businesses turn
            ideas into real digital businesses. We provide the technology,
            strategy and support needed to build a strong foundation and create
            something that can grow with you.
          </p>
        </div>

        <div className="mission-flow">
          {/* BUILD */}
          <div className="mission-card">
            <div className="mission-number">01</div>

            <div className="mission-card-content">
              <p className="mission-label">BUILD</p>

              <h3>Build the digital foundation.</h3>

              <p>
                Turn your idea into a professional digital presence designed
                around your business and your customers.
              </p>

              <div className="mission-list">
                <span>Website</span>
                <span>E-commerce</span>
                <span>Web Applications</span>
                <span>Landing Pages</span>
              </div>
            </div>
          </div>

          {/* GROW */}
          <div className="mission-card mission-featured">
            <div className="mission-number">02</div>

            <div className="mission-card-content">
              <p className="mission-label">GROW</p>

              <h3>Get discovered and attract customers.</h3>

              <p>
                Build visibility, bring the right people to your business and
                turn attention into real opportunities.
              </p>

              <div className="mission-list">
                <span>SEO</span>
                <span>Traffic Generation</span>
                <span>Content</span>
                <span>Analytics</span>
                <span>Conversion Optimization</span>
              </div>
            </div>
          </div>

          {/* OWN */}
          <div className="mission-card">
            <div className="mission-number">03</div>

            <div className="mission-card-content">
              <p className="mission-label">OWN</p>

              <h3>Build something that belongs to you.</h3>

              <p>
                Create a business, brand and digital ecosystem that you control
                and can continue building for years to come.
              </p>

              <div className="mission-list">
                <span>Your Business</span>
                <span>Your Brand</span>
                <span>Your Customers</span>
                <span>Your Digital Assets</span>
                <span>Your Future</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-bottom">
          <span>BUILD</span>
          <span>→</span>
          <span>GROW</span>
          <span>→</span>
          <span>OWN</span>
        </div>
      </div>
    </section>
  )
}
