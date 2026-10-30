import React from 'react'
import { Link } from 'react-router-dom'

// Drop a file at client/public/hero.mp4 and it plays inside the centre frame.
// Until then the portrait below is shown as the poster.
const HERO_VIDEO = '/hero.mp4'
const HERO_POSTER = '/hero-portrait.webp'

const PANELS = [
  { id: 'vanta', src: '/vanta.webp', label: 'Vanta Detail Studio' },
  { id: 'maison', src: '/maisonamara.webp', label: 'Maison Amara' },
  { id: 'ivp', src: '/ivp.webp', label: 'IVP ASBL' },
  { id: 'crown', src: '/crownatelier.webp', label: 'Crown Atelier' },
  { id: 'vita', src: '/vitagrace.webp', label: 'VitaGrace Cleaning' },
]

export default function PortfolioHero() {
  return (
    <section className="lux-hero" aria-labelledby="lux-hero-title">
      <div className="lux-hero-glow" aria-hidden="true" />

      <div className="lux-hero-copy">
        <p className="lux-eyebrow">
          <span /> Full-stack web developer <span />
        </p>

        <h1 id="lux-hero-title">
          Websites crafted
          <br />
          with <em>uncommon</em> precision.
        </h1>

        <p className="lux-lead">
          I design and build websites, web applications and dashboards for
          brands that expect more than a template.
        </p>
      </div>

      {/* CENTRE STAGE */}
      <div className="lux-stage">
        <div className="lux-spotlight" aria-hidden="true" />

        <div className="lux-panels">
          {PANELS.map((panel) => (
            <figure key={panel.id} className={`lux-panel lux-panel-${panel.id}`}>
              <div className="lux-panel-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <img src={panel.src} alt={`${panel.label} website`} loading="lazy" />
              <figcaption>{panel.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="lux-portrait">
          <video
            className="lux-portrait-video"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="lux-cta">
        <Link to="/contact" className="lux-btn lux-btn-solid">
          Start a project
        </Link>
        <Link to="/work" className="lux-btn lux-btn-ghost">
          View selected work
        </Link>
      </div>

      <div className="lux-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
