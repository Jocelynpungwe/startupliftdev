import React from 'react'
import { Link } from 'react-router-dom'
import Work from '../components/public/Services'
import AllHero from '../components/AllHero'

export default function Services() {
  return (
    <main className="business-page">
      {/* HERO */}

      <AllHero
        glow="What We Do"
        info="OUR SERVICES"
        h1Start="Digital tools built for"
        h1end="business growth"
        par=" From your first website to a complete digital platform, we provide
              the technology and strategy your business needs to move forward."
      />

      <Work />

      {/* CTA */}
      <section className="business-cta">
        <div className="business-container">
          <div className="cta-box">
            <p className="eyebrow">HAVE AN IDEA?</p>

            <h2>
              Let's turn your idea into
              <span> reality.</span>
            </h2>

            <Link to="/contact" className="primary-button">
              Start a Project →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
