import React from 'react'

import Hero from '../components/public/Hero.jsx'
import Services from '../components/public/Services.jsx'
import AboutSection from '../components/public/AboutSection.jsx'
import HowItWorks from '../components/public/HowItWorks.jsx'
import WhoWeHelp from '../components/public/WhoWeHelp.jsx'
import WhyUs from '../components/public/WhyUs.jsx'
import Testimonial from '../components/public/Testimonial.jsx'
import CTA from '../components/public/CTA.jsx'
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
      <Services />

      {/* ================= STATS ================= */}

      {/* <WhyUs /> */}

      {/* ================= PROJECTS ================= */}

      <Work />
      {/* ================= TESTIMONIAL ================= */}
      <Testimonial />

      {/* ================= CTA ================= */}
    </div>
  )
}

/* ================= COMPONENTS ================= */
