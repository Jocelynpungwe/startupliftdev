import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function AboutSection() {
  const benefits = [
    'Simple and scalable solutions',
    'Data-driven decision making',
    'Better sales visibility',
    'Designed around your business',
  ]

  return (
    <section id="about" className="public-section about-section">
      <div className="about-grid">
        <div className="about-visual">
          <div className="about-orb" />

          <div className="about-card">
            <span>BUSINESS</span>

            <strong>Growth</strong>

            <div className="growth-line">
              <span />
            </div>

            <small>+42.8% this year</small>
          </div>
        </div>

        <div className="about-content">
          <span className="eyebrow">ABOUT US</span>

          <h2>We turn complex business processes into simple systems.</h2>

          <p>
            Our goal is simple: help businesses spend less time managing
            processes and more time growing.
          </p>

          <p>
            We combine technology, sales strategy and business insight to create
            solutions that make a measurable difference.
          </p>

          <div className="benefits">
            {benefits.map((benefit) => (
              <div className="benefit" key={benefit}>
                <CheckCircle2 size={18} />

                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
