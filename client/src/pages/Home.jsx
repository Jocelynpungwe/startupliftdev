import React from 'react'
import { Link } from 'react-router-dom'

import PortfolioHero from '../components/public/PortfolioHero.jsx'
import PortfolioShowcase from '../components/public/PortfolioShowcase.jsx'
import {
  Belief,
  Capabilities,
  Faq,
  Intro,
  Numbers,
  ProcessSteps,
  Ticker,
} from '../components/public/lux/HomeSections.jsx'

export default function Home() {
  return (
    <div className="home-page">
      {/* ================= SCROLL-STORY HERO ================= */}
      <PortfolioHero />

      {/* ================= BRANDS TICKER ================= */}
      <Ticker />

      {/* ================= INTRO ================= */}
      <Intro />

      {/* ================= WHAT I BUILD ================= */}
      <Capabilities />

      {/* ================= SELECTED WORK ================= */}
      <PortfolioShowcase />

      {/* ================= NUMBERS ================= */}
      <Numbers />

      {/* ================= PROCESS ================= */}
      <ProcessSteps />

      {/* ================= BELIEF ================= */}
      <Belief />

      {/* ================= FAQ ================= */}
      <Faq />

      {/* ================= CLOSING CTA ================= */}
      <section className="lux-closing">
        <p className="lux-eyebrow">
          <span /> Let's work together <span />
        </p>

        <h2>
          Have a project that deserves
          <br />
          to look <em>exceptional?</em>
        </h2>

        <div className="lux-cta">
          <Link to="/contact" className="lux-btn lux-btn-solid">
            Start a project
          </Link>
        </div>
      </section>
    </div>
  )
}
