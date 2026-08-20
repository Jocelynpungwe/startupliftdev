import React from 'react'
import { Link } from 'react-router-dom'

import HeroReuse from './usable/HeroReuse'
import HeroVisual from './usable/HeroVisual'
import HeroSecondVisual from './usable/HeroSecondVisual'
import HeroTheeVisual from './usable/HeroTheeVisual'
import HeroServiceVisual from './usable/HeroServiceVisual'

export default function Hero() {
  return (
    <section className="hero-section">
      <HeroReuse
        eyebrow="DIGITAL DEVELOPMENT STUDIO"
        h1_Start="Digital experiences"
        h1_span="made to grow"
        h1_end="your business."
        par="We help entrepreneurs and small businesses build professional
          websites, increase their online visibility, and turn digital traffic
          into real opportunities."
        first_btn="Start a Project"
        second_btn="Explore Services"
        more_one="Built for ambitious businesses"
        more_two="Web • SEO • Growth"
        link_1="/contact"
        link_2="/services"
      />

      {/* HERO VISUAL */}
      {/* <HeroVisual /> */}
      <HeroSecondVisual />
      {/* <HeroTheeVisual /> */}
      {/* <HeroServiceVisual /> */}
    </section>
  )
}
