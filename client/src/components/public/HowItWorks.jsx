import React from 'react'
import SectionTitle from './usable/SectionTitle'

export default function HowItWorks() {
  return (
    <section className="process-section">
      <div style={{ paddingRight: '16px' }}>
        <SectionTitle
          section="THE PROBLEM"
          h2_start="Your Business Needs More"
          h2_glow="Visibility."
          h2_end=""
          par=""
        />
      </div>

      <div className="process-list">
        <ProcessItem
          number="01 — No Website"
          text="Your customers are searching online. Give them somewhere professional to find you."
          textTwo="StartupLift solution → Website Development."
        />

        <ProcessItem
          number="02 — Outdated Website"
          text="An outdated, confusing, or poorly designed website can make it harder for visitors to trust your business."
          textTwo="StartupLift solution → Website Redesign."
        />

        <ProcessItem
          number="03 — No Traffic"
          text="Having a website is only the beginning. You need visibility, search optimization, and a strategy for attracting the right people."
          textTwo="StartupLift solution → SEO + Traffic Growth."
        />

        <ProcessItem
          number="04 — Business Idea"
          text="You shouldn't need to figure out the entire digital side of your business alone.
We can help turn the idea into a digital foundation you can build on."
          textTwo="StartupLift solution → Strategy + Website + Digital Growth."
        />
      </div>
    </section>
  )
}

function ProcessItem({ number, text, textTwo }) {
  return (
    <div className="process-item">
      <div className="process-number">{number}</div>

      <div
        className="process-content"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <p>{text}</p>
      </div>

      {/* <span className="process-arrow">↗</span> */}
    </div>
  )
}
