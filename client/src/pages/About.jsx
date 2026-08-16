import React from 'react'
import { Link } from 'react-router-dom'
import Mission from '../components/about/Mission'
import OurStory from '../components/about/OurStory'
import WhyUs from '../components/about/WhyUs'
export default function AboutSection() {
  return (
    <main className="business-page">
      {/* HERO */}
      <section className="business-hero about-hero">
        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="business-container">
          <div className="hero-badge">
            <span></span>
            About StartupLift Dev
          </div>

          <div className="about-hero-grid">
            <div className="business-hero-content">
              <p className="eyebrow">BUILD • GROW • OWN</p>

              <h1>
                We build digital
                <span> experiences </span>
                that move businesses forward.
              </h1>

              <p className="hero-description">
                StartupLift Dev exists to help entrepreneurs and businesses turn
                ideas into real digital businesses. From websites and web
                applications to SEO and growth strategies, we combine technology
                and strategy to help you build something that can grow with you.
              </p>

              <div className="hero-buttons">
                <Link to="/contact" className="primary-button">
                  Start a Project →
                </Link>

                <Link to="/services" className="secondary-button">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="about-visual">
              <div className="floating-card card-one">
                <strong>01</strong>
                <span>Strategy</span>
              </div>

              <div className="about-orb">
                <div className="orb-inner">SL</div>
              </div>

              <div className="floating-card card-two">
                <strong>02</strong>
                <span>Development</span>
              </div>

              <div className="floating-card card-three">
                <strong>03</strong>
                <span>Growth</span>
              </div>
            </div>
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
