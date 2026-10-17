import React from 'react'
import { Instagram, Facebook, Mail, Clock, Globe } from 'lucide-react'
import HeroContactVisual from '../components/public/usable/HeroContactVisual.jsx'
import HeroReuse from '../components/public/usable/HeroReuse.jsx'
import Form from '../components/Form.jsx'

export default function Contact() {
  return (
    <main className="business-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero-section">
        <HeroReuse
          eyebrow="CONTACT STARTUPLIFT DEV"
          h1_Start="Let's build something"
          h1_span="made to perform"
          h1_end=""
          par="Have a business idea, need a new website or want to improve your
              current online presence? Tell us what you're working on."
          first_btn="Start a Project"
          second_btn="Explore Services"
          more_one="Built for ambitious businesses"
          more_two="Web • SEO • Growth"
          link_1="/contact"
          link_2="/services"
          page="home"
        />

        <HeroContactVisual />
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="business-section contact-section">
        <div className="business-container">
          <div className="contact-grid">
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="contact-info">
              <p className="eyebrow">GET IN TOUCH</p>

              <h2>
                Tell us about
                <span> your project.</span>
              </h2>

              <p className="contact-description">
                We would love to hear about your business, your goals and what
                you're looking to build.
              </p>

              {/* CONTACT DETAILS */}

              <div className="contact-details">
                {/* EMAIL */}

                <div className="contact-detail">
                  <div className="contact-icon">
                    <Mail size={22} />
                  </div>

                  <div>
                    <span>Email</span>

                    <strong>contact@startupliftdev.com</strong>
                  </div>
                </div>

                {/* RESPONSE TIME */}

                <div className="contact-detail">
                  <div className="contact-icon">
                    <Clock size={22} />
                  </div>

                  <div>
                    <span>Response Time</span>

                    <strong>Usually within 24 hours</strong>
                  </div>
                </div>

                {/* SERVICES */}

                <div className="contact-detail">
                  <div className="contact-icon">
                    <Globe size={22} />
                  </div>

                  <div>
                    <span>Services</span>

                    <strong>Web • SEO • Digital Growth</strong>
                  </div>
                </div>

                {/* INSTAGRAM */}

                <div className="contact-detail">
                  <div className="contact-icon">
                    <a
                      href="https://www.instagram.com/startupliftdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="StartupLift Instagram"
                      className="social-link"
                    >
                      <Instagram size={22} />
                    </a>
                  </div>

                  <div>
                    <span>Instagram</span>

                    <strong>Follow Us</strong>
                  </div>
                </div>

                {/* FACEBOOK */}

                <div className="contact-detail">
                  <div className="contact-icon">
                    <a
                      href="https://www.facebook.com/startupliftdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="StartupLift Facebook"
                      className="social-link"
                    >
                      <Facebook size={22} />
                    </a>
                  </div>

                  <div>
                    <span>Facebook</span>

                    <strong>Follow Us</strong>
                  </div>
                </div>
              </div>

              {/* STARTUPLIFT ORB */}
              {/* 
              <div className="contact-orb">
                <div>
                  <span>STARTUP</span>
                  <strong>LIFT</strong>
                  <small>DEV</small>
                </div>
              </div> */}
            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <Form />
          </div>
        </div>
      </section>
    </main>
  )
}
