import React from 'react'

import { Rocket, TrendingUp, Crown } from 'lucide-react'
import SectionTitle from './usable/SectionTitle'

const stages = [
  {
    number: '01',
    title: 'BUILD',
    icon: Rocket,
    description: 'Build the digital foundation.',
    items: ['Website', 'E-commerce', 'Web applications', 'Landing pages'],
  },
  {
    number: '02',
    title: 'GROW',
    icon: TrendingUp,
    description: 'Get discovered and attract customers.',
    items: [
      'SEO',
      'Traffic generation',
      'Content',
      'Analytics',
      'Conversion optimization',
    ],
  },
  {
    number: '03',
    title: 'OWN',
    icon: Crown,
    description: 'Build something that belongs to you.',
    items: [
      'Your business',
      'Your brand',
      'Your customers',
      'Your digital assets',
      'Your future',
    ],
  },
]
export default function WhoWeHelp() {
  return (
    <section className="build-grow-own">
      <div className="build-grow-own-container">
        <SectionTitle
          section="THE STARTUPLIFT JOURNEY"
          h2_start="Build."
          h2_glow="Grow."
          h2_end="Own."
          par="Build the foundation. Grow your business. Own what you create."
        />

        <div className="build-grow-own-grid">
          {stages.map((stage) => {
            const Icon = stage.icon

            return (
              <article className="build-grow-own-card" key={stage.title}>
                <div className="build-grow-own-top">
                  <span className="build-grow-own-number">{stage.number}</span>

                  <div className="build-grow-own-icon">
                    <Icon size={20} />
                  </div>
                </div>

                <h3>{stage.title}</h3>

                <p className="build-grow-own-description">
                  {stage.description}
                </p>

                <div className="build-grow-own-divider" />

                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>
                      <span>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
