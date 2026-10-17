import React from 'react'
import { Link } from 'react-router-dom'
import Work from '../components/public/Services'
import HeroReuse from '../components/public/usable/HeroReuse'
import HeroServiceVisual from '../components/public/usable/HeroServiceVisual'

export default function Services() {
  return (
    <main className="business-page">
      {/* HERO */}
      <section className="hero-section">
        <HeroReuse
          eyebrow="OUR SERVICES"
          h1_Start="Build"
          h1_span="Grow"
          h1_end="Succeed."
          par="From your first website to a complete digital platform, we provide the technology and strategy your business needs to move forward. We build modern digital experiences that strengthen your brand, attract the right audience, and turn online visitors into real opportunities for growth."
          first_btn="Start a Project"
          second_btn="Explore Portfolio"
          more_one=""
          more_two="Build • Grow • Succeed"
          link_1="/contact"
          link_2="/work"
          page="service"
        />
        <HeroServiceVisual />
      </section>
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
