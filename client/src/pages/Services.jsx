import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'

import LuxPageHero from '../components/public/lux/LuxPageHero.jsx'
import { ServicesVisual } from '../components/public/lux/HeroVisuals.jsx'
import Reveal from '../components/public/lux/Reveal.jsx'
import {
  packages,
  process,
  recurring,
} from '../components/public/lux/servicesData.js'

export default function Services() {
  return (
    <main className="lux-page">
      <LuxPageHero
        visual={<ServicesVisual />}
        eyebrow="Our services"
        title={
          <>
            Build. Grow.
            <br />
            <em>Succeed.</em>
          </>
        }
        lead="From your first website to a complete digital platform, we provide the technology and strategy your business needs to move forward. We build modern digital experiences that strengthen your brand, attract the right audience and turn online visitors into real opportunities."
      >
        <a href="#packages" className="lux-btn lux-btn-solid">
          View packages
        </a>
        <Link to="/work" className="lux-btn lux-btn-ghost">
          Explore our work
        </Link>
      </LuxPageHero>

      {/* ===== PACKAGES ===== */}
      <section className="lux-section lux-section--alt" id="packages">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> Our packages <span />
            </p>
            <h2>
              Build it. Grow it. <em>Own it.</em>
            </h2>
            <p className="lux-lead">
              Choose the package that fits where your business is today.
              Whether you're starting from scratch or ready to grow, we can
              help you take the next step.
            </p>
          </Reveal>

          <div className="lux-packages">
            {packages.map((pkg, index) => (
              <Reveal
                key={pkg.id}
                as="article"
                delay={index * 120}
                className={`lux-package${pkg.featured ? ' is-featured' : ''}`}
              >
                {pkg.featured && (
                  <span className="lux-package-badge">Most popular</span>
                )}

                <div className="lux-package-top">
                  <span className="lux-package-name">{pkg.name}</span>
                  <span className="lux-package-number">{pkg.number}</span>
                </div>

                <h3>{pkg.title}</h3>
                <p className="lux-package-desc">{pkg.description}</p>

                <p className="lux-package-price">{pkg.price}</p>

                <ul className="lux-checks">
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`lux-btn ${
                    pkg.featured ? 'lux-btn-solid' : 'lux-btn-ghost'
                  }`}
                >
                  {pkg.button}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="lux-section">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> How we work <span />
            </p>
            <h2>
              A clear path from idea to <em>launch.</em>
            </h2>
          </Reveal>

          <div className="lux-process">
            {process.map((step, index) => (
              <Reveal key={step.number} delay={index * 100} className="lux-step">
                <span className="lux-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ONGOING SUPPORT ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> Ongoing support <span />
            </p>
            <h2>
              Don't just launch. <em>Keep growing.</em>
            </h2>
            <p className="lux-lead">
              Your website is the beginning, not the end. Keep your digital
              presence secure, visible and growing with ongoing StartupLift
              support.
            </p>
          </Reveal>

          <div className="lux-recurring">
            {recurring.map((plan, index) => (
              <Reveal
                key={plan.name}
                as="article"
                delay={index * 120}
                className="lux-recurring-card"
              >
                <span className="lux-package-number">{plan.number}</span>
                <h3>{plan.name}</h3>
                <p className="lux-package-desc">{plan.description}</p>

                <p className="lux-recurring-price">
                  <strong>{plan.price}</strong> <span>{plan.period}</span>
                </p>

                <ul className="lux-checks">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="lux-link">
                  Learn more <ArrowUpRight size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="lux-closing">
        <Reveal>
          <p className="lux-eyebrow">
            <span /> Not sure where to start? <span />
          </p>
          <h2>
            Let's figure out <em>your next step.</em>
          </h2>
          <p className="lux-lead">
            Tell us about your business, your goals and where you want to go.
            We'll help you determine the right solution.
          </p>
          <div className="lux-cta">
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Get a free consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
