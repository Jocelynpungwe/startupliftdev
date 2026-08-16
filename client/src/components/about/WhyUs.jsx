import React from 'react'
import { Link } from 'react-router-dom'
import { Target, TrendingUp, Layers3, Rocket, ArrowUpRight } from 'lucide-react'
import './style/whyUs.css'
const reasons = [
  {
    icon: Target,
    title: 'Built Around Your Business',
    text: `We don't believe in one-size-fits-all solutions. Your website
    and digital tools are built around your goals, customers, and business.`,
  },
  {
    icon: TrendingUp,
    title: 'Designed for Growth',
    text: `We think beyond launch day. Your digital presence is built
    with SEO, scalability, performance, and future growth in mind.`,
  },
  {
    icon: Layers3,
    title: 'Technology + Strategy',
    text: `A great website is only part of the equation. We combine
    development, design, SEO, and strategy to help turn your digital
    presence into a business asset.`,
  },
  {
    icon: Rocket,
    title: 'Your Success Matters',
    text: `Our goal isn't simply to deliver a website and walk away.
    We want to help you build something that creates real opportunities
    for your business.`,
  },
]

export default function WhyUs() {
  return (
    <section className="why-us-section">
      <div className="business-container">
        {/* HEADER */}
        <div className="why-us-header">
          <div className="why-us-heading">
            <p className="eyebrow">WHY STARTUPLIFT</p>

            <h2>
              You're not just building
              <span style={{ color: '#3b82f6' }}>a website.</span>
            </h2>
          </div>

          <div className="why-us-intro">
            <p>
              You're building something that can grow with you. That's why we
              combine technology, design, and strategy to create digital
              foundations built for the long term.
            </p>
          </div>
        </div>

        {/* REASONS */}
        <div className="why-us-grid">
          {reasons.map((reason) => {
            const Icon = reason.icon

            return (
              <article className="why-us-card" key={reason.title}>
                <div className="why-us-card-top">
                  <div
                    className="why-us-icon-wrapper"
                    style={{ color: '#3b82f6' }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </div>

                  <ArrowUpRight
                    className="why-us-arrow"
                    size={22}
                    strokeWidth={1.5}
                    style={{ color: '#3b82f6' }}
                  />
                </div>

                <div className="why-us-card-content">
                  <h3>{reason.title}</h3>

                  <p>{reason.text}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* FINAL STATEMENT */}
        <div className="why-us-bottom">
          <div className="why-us-statement">
            <p>BUILD SOMETHING.</p>

            <p>GROW SOMETHING.</p>

            <p>
              <span style={{ color: '#3b82f6' }}>OWN SOMETHING.</span>
            </p>
          </div>

          <Link to="/contact" className="why-us-button">
            <span>Let's Build Together</span>

            <ArrowUpRight size={20} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  )
}
