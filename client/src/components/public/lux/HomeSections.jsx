import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Clock,
  Code2,
  Globe,
  Layers,
  LifeBuoy,
  Search,
  ShoppingBag,
  Tag,
} from 'lucide-react'

import { projects } from '../../../pages/Work.jsx'
import { packages, process } from './servicesData.js'
import Reveal from './Reveal.jsx'

/* =========================================================
   INTRO — who is behind the work
========================================================= */

export function Intro() {
  return (
    <section className="lux-section">
      <div className="lux-wrap lux-intro">
        <Reveal>
          <p className="lux-eyebrow lux-eyebrow--left">
            <span /> About the work
          </p>
          <h2>
            Design that earns <em>trust.</em>
            <br />
            Code that holds up.
          </h2>
        </Reveal>

        <Reveal delay={120} className="lux-intro-copy">
          <p className="lux-prose-lead">
            StartupLift Dev exists to help entrepreneurs and businesses turn
            ideas into real digital businesses.
          </p>
          <p>
            Every site starts with the business behind it: its customers, its
            tone and what it needs the website to do. From there it is
            designed, built, launched and looked after — so it keeps working
            long after launch day.
          </p>
          <Link to="/about" className="lux-link">
            More about the studio <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   CAPABILITIES — what can be built
========================================================= */

const capabilities = [
  {
    icon: Code2,
    title: 'Websites & landing pages',
    text: 'Responsive, fast and built around your brand, from a first three-page site to a full business website.',
  },
  {
    icon: ShoppingBag,
    title: 'Stores & web applications',
    text: 'Online stores, booking and contact flows, dashboards and custom web applications.',
  },
  {
    icon: Search,
    title: 'SEO & growth',
    text: 'Search foundations, content, analytics and conversion work so the right people find you.',
  },
  {
    icon: LifeBuoy,
    title: 'Care & support',
    text: 'Updates, backups, security and performance monitoring once your site is live.',
  },
]

export function Capabilities() {
  return (
    <section className="lux-section lux-section--alt">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> What I build <span />
          </p>
          <h2>
            Everything a brand needs <em>online.</em>
          </h2>
        </Reveal>

        <div className="lux-capabilities">
          {capabilities.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              key={title}
              as="article"
              delay={(index % 2) * 120}
              className="lux-capability"
            >
              <span className="lux-why-icon">
                <Icon size={24} strokeWidth={1.4} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="lux-section-cta">
          <Link to="/services" className="lux-btn lux-btn-ghost">
            Explore services &amp; pricing
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   NUMBERS — each card counts up the first time it scrolls into view
========================================================= */

// "$250" -> prefix "$", 250, suffix ""   "30+" -> "", 30, "+"   "24h" -> "", 24, "h"
function parseStat(value) {
  const match = String(value).match(/^(\D*)(\d+)(.*)$/)
  return match
    ? { prefix: match[1], end: Number(match[2]), suffix: match[3] }
    : { prefix: '', end: 0, suffix: String(value) }
}

function StatCard({ stat, delay }) {
  const { prefix, end, suffix } = parseStat(stat.value)
  const Icon = stat.icon
  const cardRef = useRef(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(end)
      card.style.setProperty('--c', '1')
      return undefined
    }

    const duration = 2000
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const startedAt = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startedAt) / duration)
          const eased = 1 - (1 - t) ** 3 // ease-out
          setShown(Math.round(end * eased))
          card.style.setProperty('--c', eased.toFixed(3))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(card)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [end])

  return (
    <Reveal as="article" delay={delay} className="lux-stat">
      <div ref={cardRef} className="lux-stat-inner">
        <span className="lux-stat-icon">
          <Icon size={22} strokeWidth={1.4} />
        </span>

        <strong aria-label={stat.value}>
          <span aria-hidden="true">
            {prefix}
            {shown}
            {suffix}
          </span>
        </strong>

        <span className="lux-stat-label">{stat.label}</span>

        <i className="lux-stat-bar" aria-hidden="true">
          <b />
        </i>
      </div>
    </Reveal>
  )
}

export function Numbers() {
  const cheapest = packages[0].price.split('–')[0].trim()

  const stats = [
    { value: String(projects.length), label: 'Websites in the portfolio', icon: Layers },
    { value: '30+', label: 'Industries served', icon: Globe },
    { value: cheapest, label: 'Where packages start', icon: Tag },
    { value: '24h', label: 'Usual reply time', icon: Clock },
  ]

  return (
    <section className="lux-section lux-numbers-section">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> At a glance <span />
          </p>
          <h2>
            The work, <em>by the numbers.</em>
          </h2>
        </Reveal>

        <div className="lux-numbers">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} delay={index * 110} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   PROCESS — how a project runs
========================================================= */

export function ProcessSteps() {
  return (
    <section className="lux-section lux-section--alt">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> How we work <span />
          </p>
          <h2>
            A clear path from idea to <em>launch.</em>
          </h2>
        </Reveal>

        <div className="lux-process">
          {process.map((step, index) => (
            <Reveal key={step.number} delay={index * 100} className="lux-step">
              <span className="lux-step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   BELIEF — one big statement
========================================================= */

export function Belief() {
  return (
    <section className="lux-section lux-belief">
      <Reveal className="lux-wrap">
        <p className="lux-eyebrow">
          <span /> Our belief <span />
        </p>
        <blockquote>
          Build something you believe in. Grow it with purpose.{' '}
          <em>Own your future.</em>
        </blockquote>
      </Reveal>
    </section>
  )
}

/* =========================================================
   FAQ — answers that come straight from the packages
========================================================= */

const faqs = [
  {
    q: 'How much does a website cost?',
    a: `Essential websites run ${packages[0].price}, Growth is ${packages[1].price}, and Premium is custom priced. The right one depends on your pages, features and goals — send the details and you will get a clear recommendation.`,
  },
  {
    q: 'What is included in a package?',
    a: 'Every package includes a responsive, mobile-friendly website with a basic SEO setup. Growth adds conversion-focused design and an SEO foundation, and Premium adds advanced functionality, custom integrations and priority support.',
  },
  {
    q: 'Do you help after the site is live?',
    a: 'Yes. The Care plan (from $15 a month) covers updates, backups, security and performance monitoring, minor content changes and technical support. SEO and Growth plans are available if you want help getting found.',
  },
  {
    q: 'How do we get started?',
    a: 'Tell me about your business and what you want to build using the contact form. I usually reply within 24 hours.',
  },
]

export function Faq() {
  return (
    <section className="lux-section lux-section--alt">
      <div className="lux-wrap lux-faq-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> Good to know <span />
          </p>
          <h2>
            Questions, <em>answered.</em>
          </h2>
        </Reveal>

        <Reveal className="lux-faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
