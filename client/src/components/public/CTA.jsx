import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow"></div>

      <p className="section-label">READY TO GET STARTED?</p>

      <h2>
        Let's build something
        <br />
        <span>worth remembering.</span>
      </h2>

      <p>
        Tell us about your business and let's discuss how we can take your
        digital presence to the next level.
      </p>

      <Link to="/contact" className="primary-button large">
        Start Your Project
        <span>↗</span>
      </Link>
    </section>
  )
}
