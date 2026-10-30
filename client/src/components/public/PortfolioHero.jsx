import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// The hero video is scrubbed by scroll position (see ScrollVideoHero below).
// Put the encoded files in client/public (scripts/encode-hero.sh makes them):
//   hero.mp4         wide 16:9, used on tablets and desktops
//   hero-mobile.mp4  tall 9:16, used on phones (falls back to hero.mp4)
// Until a file exists the static centre-stage hero shows.
// bump VIDEO_VERSION when you replace the files, so phones fetch the new ones
const VIDEO_VERSION = '3'
const HERO_VIDEO = `/hero.mp4?v=${VIDEO_VERSION}`
const HERO_VIDEO_MOBILE = `/hero-mobile.mp4?v=${VIDEO_VERSION}`
const MOBILE_QUERY = '(max-width: 700px)'
const HERO_POSTER = '/hero-portrait.webp'

const PANELS = [
  { id: 'vanta', src: '/vanta.webp', label: 'Vanta Detail Studio' },
  { id: 'maison', src: '/maisonamara.webp', label: 'Maison Amara' },
  { id: 'ivp', src: '/ivp.webp', label: 'IVP ASBL' },
  { id: 'crown', src: '/crownatelier.webp', label: 'Crown Atelier' },
  { id: 'vita', src: '/vitagrace.webp', label: 'VitaGrace Cleaning' },
]

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

/* =========================================================
   CHAPTERS
   The text that appears, one block at a time, as the visitor scrolls.
   `range` is the slice of scroll progress (0..1) where it is fully visible.
========================================================= */

const CHAPTERS = [
  {
    id: 'intro',
    range: [0, 0.27],
    eyebrow: 'Web developer',
    title: (
      <>
        Hi, I'm <em>Jocelyn,</em>
        <br />
        a web developer.
      </>
    ),
    text: 'I design, build and look after websites, web applications and dashboards for entrepreneurs and growing businesses, crafted with uncommon precision, from the first sketch to launch day and the support after.',
    chips: ['Websites', 'Web apps', 'Dashboards', 'SEO', 'Ongoing care'],
  },
  {
    id: 'craft',
    range: [0.37, 0.63],
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
    range: [0.73, 1],
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

    // iPhones (and phones in data-saver / low-power mode) can hold back a video
    // until it is played, and never announce 'loadedmetadata' on their own.
    // So playback is attempted straight away, and again on the first touch (a
    // user gesture always allows it). Once data arrives, jump to the scroll spot.
    const onReady = () => resync()

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('play', onPlay)
    video.addEventListener('error', onError)
    video.addEventListener('loadedmetadata', onReady)
    video.addEventListener('loadeddata', onReady)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('pageshow', resync)
    window.addEventListener('pointerdown', unlock, { once: true, passive: true })
    document.addEventListener('visibilitychange', onVisible)

    unlock()

    paintChapters()
    onScroll()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('error', onError)
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('loadeddata', onReady)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pageshow', resync)
      window.removeEventListener('pointerdown', unlock)
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

        {intro.chips && <Chips items={intro.chips} />}
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

// Files to try, best first: phones get the tall video, then the wide one.
// If a file is missing (the SPA serves HTML for it) or cannot be played, the
// video's own `error` event moves on to the next, and finally to the still hero.
function pickSources() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return []
  return window.matchMedia(MOBILE_QUERY).matches
    ? [HERO_VIDEO_MOBILE, HERO_VIDEO]
    : [HERO_VIDEO]
}

export default function PortfolioHero() {
  const [sources, setSources] = useState(pickSources)
  const [index, setIndex] = useState(0)

  // switching between a phone-sized and a larger window picks the matching file
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const onChange = () => {
      setSources(pickSources())
      setIndex(0)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const handleFail = useCallback(() => setIndex((i) => i + 1), [])

  const src = sources[index]

  // key restarts the scrub effect whenever the file changes
  return src ? (
    <ScrollVideoHero key={src} src={src} onFail={handleFail} />
  ) : (
    <StaticHero />
  )
}
