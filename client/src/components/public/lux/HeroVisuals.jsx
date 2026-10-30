import React from 'react'
import { Clock, Globe, MessageSquare } from 'lucide-react'

import { packages } from './servicesData.js'

/* Visuals that sit under the headline of each inner page's hero.
   They only use things the site already has: screenshots, the portrait,
   package prices and contact details. */

const shot = (src, label) => ({ src, label })

/* ---------- About: portrait in an arch, flanked by two sites ---------- */

export function AboutVisual() {
  return (
    <div className="lux-visual lux-visual--about" aria-hidden="true">
      <figure className="lux-mini lux-mini-left">
        <img src="/vanta.webp" alt="" loading="lazy" />
      </figure>

      <figure className="lux-arch">
        <img src="/hero-portrait.webp" alt="" />
      </figure>

      <figure className="lux-mini lux-mini-right">
        <img src="/maisonamara.webp" alt="" loading="lazy" />
      </figure>
    </div>
  )
}

/* ---------- Services: the three packages as fanned price cards ---------- */

export function ServicesVisual() {
  return (
    <div className="lux-visual lux-visual--services">
      {packages.map((pkg) => (
        <a
          key={pkg.id}
          href="#packages"
          className={`lux-pricecard${pkg.featured ? ' is-featured' : ''}`}
        >
          {pkg.featured && <em>Most popular</em>}
          <small>{pkg.name}</small>
          <strong>{pkg.price}</strong>
          <span>{pkg.title}</span>
        </a>
      ))}
    </div>
  )
}

/* ---------- Our Work: a fan of site screenshots ---------- */

const FAN = [
  shot('/crownatelier.webp', 'Crown Atelier'),
  shot('/maisonamara.webp', 'Maison Amara'),
  shot('/vanta.webp', 'Vanta Detail Studio'),
  shot('/ivp.webp', 'IVP ASBL'),
  shot('/vitagrace.webp', 'VitaGrace Cleaning'),
]

export function WorkVisual() {
  return (
    <div className="lux-visual lux-visual--work" aria-hidden="true">
      {FAN.map((item) => (
        <figure key={item.label} className="lux-fan-item">
          <div className="lux-panel-bar">
            <i />
            <i />
            <i />
          </div>
          <img src={item.src} alt="" loading="lazy" />
        </figure>
      ))}
    </div>
  )
}

/* ---------- Contact: the ways to reach you, at a glance ---------- */

const quick = [
  { icon: Clock, label: 'Response time', value: 'Usually within 24 hours' },
  { icon: Globe, label: 'Services', value: 'Web • SEO • Digital growth' },
  { icon: MessageSquare, label: 'First step', value: 'A free consultation' },
]

export function ContactVisual() {
  return (
    <div className="lux-visual lux-visual--contact">
      {quick.map(({ icon: Icon, label, value }) => (
        <div key={label} className="lux-quick">
          <span className="lux-details-icon">
            <Icon size={20} strokeWidth={1.5} />
          </span>
          <span>
            <small>{label}</small>
            <strong>{value}</strong>
          </span>
        </div>
      ))}
    </div>
  )
}
