import React from 'react'
import './style/mission.css'
import SectionTitle from '../public/usable/SectionTitle'
export default function Mission() {
  return (
    <section className="mission-section">
      <div className="business-container">
        <SectionTitle
          section="OUR MISSION"
          h2_start=""
          h2_glow=""
          h2_end=""
          par=""
        />

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
