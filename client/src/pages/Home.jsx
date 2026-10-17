import React from 'react'

import Hero from '../components/public/Hero.jsx'
import HowItWorks from '../components/public/HowItWorks.jsx'
import WhoWeHelp from '../components/public/WhoWeHelp.jsx'
import Testimonial from '../components/public/Testimonial.jsx'
import Work from './Work.jsx'

export default function Home() {
  return (
    <div className="home-page">
      {/* ================= HERO ================= */}
      <Hero />
      {/* ================= INTRO ================= */}
      <WhoWeHelp />
      {/* ================= PROCESS ================= */}

      <HowItWorks />

      {/* ================= SERVICES ================= */}
      {/* <Services /> */}

      <Work />
      {/* ================= TESTIMONIAL ================= */}
      <Testimonial />

      {/* ================= CTA ================= */}
    </div>
  )
}

/* ================= COMPONENTS ================= */
