import React from 'react'

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div className="quote-mark">“</div>

      <blockquote>
        Your business has a story worth telling. We build the digital experience
        that helps people discover it.
      </blockquote>

      <div className="testimonial-author">
        <div className="author-avatar">
          <img
            src="/onlyLogo.png"
            alt="StartupLift Dev"
            style={{ width: '100%', height: '100%', marginTop: '-5px' }}
          />
        </div>

        <div>
          <strong>StartupLift Dev</strong>
          <span>Digital Development Studio</span>
        </div>
      </div>
    </section>
  )
}
