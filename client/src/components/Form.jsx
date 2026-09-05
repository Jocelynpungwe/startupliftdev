import React, { useState } from 'react'
import { trackLead } from '../lib/analytics.js'
import api from '../lib/api.js'

export default function Form() {
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

                <option value="conversion">Conversion Optimization</option>

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
  )
}
