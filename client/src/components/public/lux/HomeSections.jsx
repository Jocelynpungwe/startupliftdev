import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Code2,
  LifeBuoy,
  Search,
  ShoppingBag,
} from 'lucide-react'

import { projects } from '../../../pages/Work.jsx'
import { packages, process } from './servicesData.js'
import Reveal from './Reveal.jsx'

/* =========================================================
   TICKER — the brands in the portfolio, slowly scrolling
========================================================= */

export function Ticker() {
  const names = projects.map((project) => project.title)
  // the list is rendered twice so the loop can restart seamlessly
  const loop = [...names, ...names]

  return (
    <section className="lux-ticker" aria-label="Brands in the portfolio">
      <div className="lux-ticker-track">
        {loop.map((name, index) => (
          <span key={`${name}-${index}`} aria-hidden={index >= names.length}>
            {name}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </section>
  )
}

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
   NUMBERS — facts taken straight from the site's own content
========================================================= */

export function Numbers() {
  const cheapest = packages[0].price.split('–')[0].trim()

  const stats = [
    { value: String(projects.length), label: 'Websites in the portfolio' },
    { value: '7', label: 'Industries, one standard' },
    { value: cheapest, label: 'Where packages start' },
    { value: '24h', label: 'Usual reply time' },
  ]

  return (
    <section className="lux-section lux-numbers-section">
      <div className="lux-wrap">
        <div className="lux-numbers">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100} className="lux-number">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
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
