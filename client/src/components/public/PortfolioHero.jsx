import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// The hero video is scrubbed by scroll position (see ScrollVideoHero below).
// Put the encoded file at client/public/hero.mp4 (scripts/encode-hero.sh makes
// a scroll-friendly one). Until it exists the static centre-stage hero shows.
const HERO_VIDEO = '/hero.mp4'
const HERO_POSTER = '/hero-portrait.webp'

const PANELS = [
  { id: 'vanta', src: '/vanta.webp', label: 'Vanta Detail Studio' },
  { id: 'maison', src: '/maisonamara.webp', label: 'Maison Amara' },
  { id: 'ivp', src: '/ivp.webp', label: 'IVP ASBL' },
  { id: 'crown', src: '/crownatelier.webp', label: 'Crown Atelier' },
  { id: 'vita', src: '/vitagrace.webp', label: 'VitaGrace Cleaning' },
]

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function HeroCopy() {
  return (
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
        I design and build websites, web applications and dashboards for brands
        that expect more than a template.
      </p>
    </div>
  )
}

function HeroActions() {
  return (
    <div className="lux-cta">
      <Link to="/contact" className="lux-btn lux-btn-solid">
        Start a project
      </Link>
      <Link to="/work" className="lux-btn lux-btn-ghost">
        View selected work
      </Link>
    </div>
  )
}

/* =========================================================
   SCROLL-DRIVEN VIDEO HERO
   The section is several screens tall; its sticky child stays pinned while
   the video's currentTime follows the scroll progress through the section.
========================================================= */

function ScrollVideoHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return undefined

    let frame = 0
    let target = 0 // 0..1 scroll progress
    let current = 0 // eased progress that drives the video

    const readProgress = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      target = scrollable > 0 ? clamp(-rect.top / scrollable) : 0
    }

    const render = () => {
      frame = 0
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0004) current = target

      section.style.setProperty('--p', current.toFixed(4))

      if (video.duration) {
        const time = current * (video.duration - 0.05)
        if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time
      }

      if (current !== target) frame = requestAnimationFrame(render)
    }

    const onScroll = () => {
      readProgress()
      if (!frame) frame = requestAnimationFrame(render)
    }

    // Some mobile browsers only allow seeking after the video has been played once.
    const unlock = () => {
      const attempt = video.play()
      if (attempt && attempt.then) attempt.then(() => video.pause()).catch(() => {})
      else video.pause()
    }

    video.addEventListener('loadedmetadata', unlock, { once: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', unlock)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="lux-hero lux-hero--scrub"
      style={{ '--p': 0 }}
      aria-labelledby="lux-hero-title"
    >
      <div className="lux-sticky">
        <video
          ref={videoRef}
          className="lux-scrub-video"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="lux-scrub-shade" aria-hidden="true" />

        <div className="lux-scrub-copy">
          <HeroCopy />
        </div>

        <div className="lux-scrub-end">
          <HeroActions />
        </div>

        <div className="lux-scrub-progress" aria-hidden="true">
          <i />
        </div>

        <div className="lux-scroll lux-scrub-hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   STATIC CENTRE-STAGE HERO (fallback: no video, or reduced motion)
========================================================= */

function StaticHero() {
  return (
    <section className="lux-hero" aria-labelledby="lux-hero-title">
      <div className="lux-hero-glow" aria-hidden="true" />

      <HeroCopy />

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

        <div className="lux-portrait" />
      </div>

      <HeroActions />

      <div className="lux-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

export default function PortfolioHero() {
  // 'checking' renders the static hero; we only switch once the file is
  // confirmed to be a playable video (a missing file is served as HTML by the
  // SPA redirect, which makes the probe fire `error`).
  const [mode, setMode] = useState('static')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const probe = document.createElement('video')
    probe.preload = 'metadata'
    probe.muted = true
    probe.onloadedmetadata = () => setMode('scrub')
    probe.onerror = () => setMode('static')
    probe.src = HERO_VIDEO

    return () => {
      probe.onloadedmetadata = null
      probe.onerror = null
      probe.removeAttribute('src')
    }
  }, [])

  return mode === 'scrub' ? <ScrollVideoHero /> : <StaticHero />
}
