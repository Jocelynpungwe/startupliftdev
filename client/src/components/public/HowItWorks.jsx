import React from 'react'

export default function HowItWorks() {
  return (
    <section className="process-section">
      <div className="process-intro">
        <p className="section-label">THE PROBLEM</p>

        <h2>
          Your Business <span>Deserves More</span> Than Just a Website.
        </h2>
      </div>

      <div className="process-list">
        <ProcessItem
          number="01 — No Website"
          title="I have a business, but I don't have a website?"
          text="Your customers are searching online. Give them somewhere professional to find you."
          textTwo="StartupLift solution → Website Development."
        />

        <ProcessItem
          number="02 — Outdated Website"
          title="My website doesn't represent my business?"
          text="An outdated, confusing, or poorly designed website can make it harder for visitors to trust your business."
          textTwo="StartupLift solution → Website Redesign."
        />

        <ProcessItem
          number="03 — No Traffic"
          title="I have a website, but nobody is finding it?"
          text="Having a website is only the beginning. You need visibility, search optimization, and a strategy for attracting the right people."
          textTwo="StartupLift solution → SEO + Traffic Growth."
        />

        <ProcessItem
          number="04 — Business Idea"
          title="I have an idea, but I don't know where to start?"
          text="You shouldn't need to figure out the entire digital side of your business alone.
We can help turn the idea into a digital foundation you can build on."
          textTwo="StartupLift solution → Strategy + Website + Digital Growth."
        />
      </div>
    </section>
  )
}

function ProcessItem({ number, title, text, textTwo }) {
  return (
    <div className="process-item">
      <div className="process-number">{number}</div>

      <div className="process-content">
        <h3>{title}</h3>

        <p>{text}</p>
      </div>

      <span className="process-arrow">↗</span>
    </div>
  )
}
