import React from 'react'

export default function LuxPageHero({ eyebrow, title, lead, children, visual }) {
  return (
    <section className="lux-page-hero">
      <div className="lux-page-hero-glow" aria-hidden="true" />

      <p className="lux-eyebrow">
        <span /> {eyebrow} <span />
      </p>

      <h1>{title}</h1>

      {lead && <p className="lux-lead">{lead}</p>}

      {children && <div className="lux-cta">{children}</div>}

      {visual}
    </section>
  )
}
