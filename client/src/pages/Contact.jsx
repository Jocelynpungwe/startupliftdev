import React, { useState } from 'react'
import { Instagram, Facebook, Mail, Clock, Globe } from 'lucide-react'
import api from '../lib/api.js'
import AllHero from '../components/AllHero.jsx'
import { trackLead } from '../lib/analytics.js'
import HeroContactVisual from '../components/public/usable/HeroContactVisual.jsx'
import HeroReuse from '../components/public/usable/HeroReuse.jsx'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      await api.post('/contact', formData)
      trackLead(formData.service)
      setSubmitted(true)

      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)

      setError(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

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

            <div className="contact-form-wrapper">
              {submitted ? (
                /* =================================================
                   SUCCESS MESSAGE
                ================================================= */

                <div className="success-message">
                  <div className="success-icon">✓</div>

                  <h2>Message received.</h2>

                  <p>
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* =================================================
                   CONTACT FORM
                ================================================= */

                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* NAME + EMAIL */}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* COMPANY + SERVICE */}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>

                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">What do you need?</label>

                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a service</option>

                        <option value="website">Website Development</option>

                        <option value="ecommerce">E-commerce</option>

                        <option value="webapp">Web Application</option>

                        <option value="landing-page">Landing Page</option>

                        <option value="seo">SEO</option>

                        <option value="traffic">Traffic Generation</option>

                        <option value="content">Content</option>

                        <option value="analytics">Analytics</option>

                        <option value="conversion">
                          Conversion Optimization
                        </option>

                        <option value="other">Something Else</option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div className="form-group">
                    <label htmlFor="message">Tell us about your project</label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business, goals and what you'd like to build..."
                      rows="7"
                      required
                    />
                  </div>

                  {/* ERROR */}

                  {error && <div className="form-error">{error}</div>}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="primary-button form-submit"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
