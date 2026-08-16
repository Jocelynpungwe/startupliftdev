import React from 'react'

export default function AllHero({ glow, info, h1Start, h1end, par }) {
  return (
    <section className="business-hero contact-hero">
      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      <div className="business-container">
        <div className="business-hero-content">
          <div className="hero-badge">
            <span></span>
            {glow}
          </div>

          <p className="eyebrow">{info}</p>

          <h1>
            {h1Start}
            <span> {h1end}.</span>
          </h1>

          <p className="hero-description">{par}</p>
        </div>
      </div>
    </section>
  )
}
