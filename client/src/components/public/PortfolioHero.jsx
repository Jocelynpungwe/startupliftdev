import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { projects } from '../../pages/Work.jsx'

// The hero video is scrubbed by scroll position (see ScrollVideoHero below).
// Put the encoded files in client/public (scripts/encode-hero.sh makes them):
//   hero.mp4         wide 16:9, used on tablets and desktops
//   hero-mobile.mp4  tall 9:16, used on phones (falls back to hero.mp4)
// Until a file exists the static centre-stage hero shows.
const HERO_VIDEO = '/hero.mp4'
const HERO_VIDEO_MOBILE = '/hero-mobile.mp4'
const MOBILE_QUERY = '(max-width: 700px)'
const HERO_POSTER = '/hero-portrait.webp'

const PANELS = [
  { id: 'vanta', src: '/vanta.webp', label: 'Vanta Detail Studio' },
  { id: 'maison', src: '/maisonamara.webp', label: 'Maison Amara' },
  { id: 'ivp', src: '/ivp.webp', label: 'IVP ASBL' },
  { id: 'crown', src: '/crownatelier.webp', label: 'Crown Atelier' },
  { id: 'vita', src: '/vitagrace.webp', label: 'VitaGrace Cleaning' },
]

const NUMBER_WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
]
const projectCount = NUMBER_WORDS[projects.length] ?? String(projects.length)

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

/* =========================================================
   CHAPTERS
   The text that appears, one block at a time, as the visitor scrolls.
   `range` is the slice of scroll progress (0..1) where it is fully visible.
========================================================= */

const CHAPTERS = [
  {
    id: 'intro',
    range: [0, 0.2],
    eyebrow: 'Full-stack web developer',
    title: (
      <>
        Websites crafted
        <br />
        with <em>uncommon</em> precision.
      </>
    ),
    text: 'I design and build websites, web applications and dashboards for brands that expect more than a template.',
  },
  {
    id: 'work',
    range: [0.27, 0.48],
    eyebrow: 'The portfolio',
    title: (
      <>
        {projectCount} brands.
        <br />
        Every one with its <em>own voice.</em>
      </>
    ),
    text: 'Streetwear, cleaning, heritage, beauty, hair, a healthcare charity and car detailing — each site is shaped around the business behind it, its customers and the way it wants to be seen.',
    chips: projects.map((project) => project.title),
  },
  {
    id: 'craft',
    range: [0.55, 0.76],
    eyebrow: 'Front to back',
    title: (
      <>
        Design, code and <em>growth,</em>
        <br />
        under one roof.
      </>
    ),
    text: 'Responsive layouts, SEO foundations, booking and contact flows, dashboards and web applications — designed, built, launched and looked after by the same person.',
    chips: ['React', 'Responsive design', 'SEO', 'Web apps & dashboards', 'Ongoing care'],
  },
  {
    id: 'next',
    range: [0.84, 1],
    eyebrow: 'Your project',
    title: (
      <>
        Your brand could
        <br />
        be <em>next.</em>
      </>
    ),
    text: 'Packages start from $250, with ongoing support after launch. Tell me what you are building and I usually reply within 24 hours.',
    actions: true,
  },
]

const FADE = 0.05

// 0..1 opacity of a chapter at scroll progress p, and which way it is travelling
function chapterState(range, p) {
  const [start, end] = range
  if (p < start - FADE || p > end + FADE) return { opacity: 0, shift: 0 }
  if (p < start) {
    const opacity = (p - (start - FADE)) / FADE
    return { opacity, shift: (1 - opacity) * 28 }
  }
  if (p > end) {
    const opacity = 1 - (p - end) / FADE
    return { opacity, shift: -(1 - opacity) * 28 }
  }
  return { opacity: 1, shift: 0 }
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

function Chips({ items }) {
  return (
    <ul className="lux-chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/* =========================================================
   SCROLL-DRIVEN VIDEO HERO
   The section is several screens tall; its sticky child stays pinned while
   the video's currentTime and the chapter text follow the scroll progress.
========================================================= */

function ScrollVideoHero({ src, onFail }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const chapterRefs = useRef([])
  const counterRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return undefined

    let frame = 0
    let target = 0 // 0..1 scroll progress
    let current = 0 // eased progress that drives the video
    let pendingTime = null // latest wanted time while a seek is still running
    let unlocking = false

    const readProgress = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      target = scrollable > 0 ? clamp(-rect.top / scrollable) : 0
    }

    const paintChapters = () => {
      let strongest = 0
      let strongestOpacity = -1

      CHAPTERS.forEach((chapter, index) => {
        const node = chapterRefs.current[index]
        if (!node) return
        const { opacity, shift } = chapterState(chapter.range, current)

        node.style.opacity = opacity.toFixed(3)
        node.style.transform = `translateY(${shift.toFixed(1)}px)`
        node.style.visibility = opacity > 0.01 ? 'visible' : 'hidden'
        node.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'

        if (opacity > strongestOpacity) {
          strongestOpacity = opacity
          strongest = index
        }
      })

      if (counterRef.current) {
        counterRef.current.textContent = `0${strongest + 1} / 0${CHAPTERS.length}`
      }
    }

    // Browsers drop or stall seeks that are issued while another one is still
    // running. Keep only the newest wanted time and apply it when the current
    // seek finishes, so the video always lands on the latest scroll position.
    const seekTo = (time) => {
      if (video.seeking) {
        pendingTime = time
        return
      }
      if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time
    }

    const onSeeked = () => {
      if (pendingTime === null) return
      const time = pendingTime
      pendingTime = null
      if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time
    }

    // Ease towards the scroll position by elapsed time (not per frame), so the
    // video catches up in about half a second even on a slow device.
    let lastFrame = 0
    const render = (now = performance.now()) => {
      frame = 0
      const elapsed = lastFrame ? Math.min(100, now - lastFrame) : 16
      lastFrame = now
      current += (target - current) * (1 - Math.exp(-elapsed / 90))
      if (Math.abs(target - current) < 0.0004) current = target

      section.style.setProperty('--p', current.toFixed(4))
      paintChapters()

      if (video.duration) seekTo(current * (video.duration - 0.05))

      if (current !== target) frame = requestAnimationFrame(render)
      else lastFrame = 0
    }

    const onScroll = () => {
      readProgress()
      if (!frame) {
        lastFrame = 0
        frame = requestAnimationFrame(render)
      }
    }

    // Coming back to the tab, or to the page from the back button, can leave the
    // video on a stale frame: jump straight to where the scroll position is.
    const resync = () => {
      readProgress()
      current = target
      pendingTime = null
      if (frame) cancelAnimationFrame(frame)
      render()
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') resync()
    }

    // Some mobile browsers only allow seeking after the video has been played
    // once. The video must never keep playing on its own, though.
    const unlock = () => {
      unlocking = true
      const finish = () => {
        unlocking = false
        video.pause()
        resync()
      }
      const attempt = video.play()
      if (attempt && attempt.then) attempt.then(finish).catch(finish)
      else finish()
    }

    const onPlay = () => {
      if (!unlocking) video.pause()
    }

    const onError = () => onFail?.()

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('play', onPlay)
    video.addEventListener('error', onError)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pageshow', resync)
    document.addEventListener('visibilitychange', onVisible)

    // The metadata may already be here (cached file) before this effect runs
    if (video.readyState >= 1) unlock()
    else video.addEventListener('loadedmetadata', unlock, { once: true })

    paintChapters()
    onScroll()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('error', onError)
      video.removeEventListener('loadedmetadata', unlock)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pageshow', resync)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [onFail])

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
          src={src}
          poster={HERO_POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="lux-scrub-shade" aria-hidden="true" />

        <div className="lux-chapters">
          {CHAPTERS.map((chapter, index) => {
            const Title = index === 0 ? 'h1' : 'h2'
            return (
              <article
                key={chapter.id}
                ref={(node) => {
                  chapterRefs.current[index] = node
                }}
                className="lux-chapter"
              >
                <p className="lux-eyebrow">
                  <span /> {chapter.eyebrow} <span />
                </p>

                <Title
                  className="lux-chapter-title"
                  id={index === 0 ? 'lux-hero-title' : undefined}
                >
                  {chapter.title}
                </Title>

                <p className="lux-lead">{chapter.text}</p>

                {chapter.chips && <Chips items={chapter.chips} />}
                {chapter.actions && <HeroActions />}
              </article>
            )
          })}
        </div>

        <div className="lux-scrub-progress" aria-hidden="true">
          <i />
        </div>

        <p ref={counterRef} className="lux-scrub-counter" aria-hidden="true">
          01 / 0{CHAPTERS.length}
        </p>

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
  const [intro] = CHAPTERS

  return (
    <section className="lux-hero" aria-labelledby="lux-hero-title">
      <div className="lux-hero-glow" aria-hidden="true" />

      <div className="lux-hero-copy">
        <p className="lux-eyebrow">
          <span /> {intro.eyebrow} <span />
        </p>

        <h1 id="lux-hero-title">{intro.title}</h1>

        <p className="lux-lead">{intro.text}</p>
      </div>

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

// Resolves to the first source that is a playable video, or null.
// A missing file is served as HTML by the SPA redirect, which makes the probe
// fire `error`, so a 404 and a corrupt file both fall through.
function probeVideo(src) {
  return new Promise((resolve) => {
    const probe = document.createElement('video')
    probe.preload = 'metadata'
    probe.muted = true
    probe.onloadedmetadata = () => resolve(src)
    probe.onerror = () => resolve(null)
    probe.src = src
  })
}

export default function PortfolioHero() {
  const [source, setSource] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const query = window.matchMedia(MOBILE_QUERY)
    let cancelled = false

    const resolveSource = async () => {
      const candidates = query.matches
        ? [HERO_VIDEO_MOBILE, HERO_VIDEO]
        : [HERO_VIDEO]

      let found = null
      for (const candidate of candidates) {
        found = await probeVideo(candidate)
        if (found) break
      }
      if (!cancelled) setSource(found)
    }

    resolveSource()
    query.addEventListener('change', resolveSource)

    return () => {
      cancelled = true
      query.removeEventListener('change', resolveSource)
    }
  }, [])

  // key restarts the scrub effect when the phone/desktop source changes
  const handleFail = useCallback(() => setSource(null), [])

  return source ? (
    <ScrollVideoHero key={source} src={source} onFail={handleFail} />
  ) : (
    <StaticHero />
  )
}
