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
            src="/logo-mark.png"
            alt="StartupLift Dev"
            width="40"
            height="33"
            loading="lazy"
            style={{ width: '100%', height: 'auto', marginTop: '-5px' }}
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
