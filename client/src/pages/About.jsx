import React from 'react'
import { Link } from 'react-router-dom'
import Mission from '../components/about/Mission'
import OurStory from '../components/about/OurStory'
import WhyUs from '../components/about/WhyUs'
import HeroReuse from '../components/public/usable/HeroReuse'

import HeroVisual from '../components/public/usable/HeroVisual'

export default function AboutSection() {
  return (
    <main className="business-page">
      {/* HERO */}
      <section className="business-hero about-hero">
        <div className="business-container">
          <div className="about-hero-grid">
            <div className="business-hero-content">
              <HeroReuse
                eyebrow="ABOUT US"
                h1_Start="Your"
                h1_span="Growth"
                h1_end="Starts Here."
                par="StartupLift Dev exists to help entrepreneurs and businesses turn
                ideas into real digital businesses. From websites and web
                applications to SEO and growth strategies, we combine technology
                and strategy to help you build something that can grow with you."
                first_btn="Start a Project"
                second_btn="Explore Services"
                more_one="Build smarter"
                more_two="Grow faster."
                link_1="/contact"
                link_2="/services"
                page="about"
              />
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      <Mission />

      {/* STORY */}
      <OurStory />

      <WhyUs />

      {/* CTA */}
      <section className="business-cta">
        <div className="business-container">
          <div className="cta-box">
            <p className="eyebrow">READY TO GROW?</p>

            <h2>
              Let's build something
              <span> remarkable.</span>
            </h2>

            <p>
              Tell us about your business and let's discuss how StartupLift Dev
              can help you grow online.
            </p>

            <Link to="/contact" className="primary-button">
              Let's Talk →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
