import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Layers3,
  Rocket,
  Target,
  TrendingUp,
} from 'lucide-react'

import LuxPageHero from '../components/public/lux/LuxPageHero.jsx'
import { AboutVisual } from '../components/public/lux/HeroVisuals.jsx'
import Reveal from '../components/public/lux/Reveal.jsx'
import {
  ClientTestimonials,
  InMyWords,
} from '../components/public/lux/Testimonials.jsx'

const principles = [
  {
    number: '01',
    label: 'Build',
    title: 'Build the digital foundation.',
    text: 'Turn your idea into a professional digital presence designed around your business and your customers.',
    tags: ['Website', 'E-commerce', 'Web applications', 'Landing pages'],
  },
  {
    number: '02',
    label: 'Grow',
    title: 'Get discovered and attract customers.',
    text: 'Build visibility, bring the right people to your business and turn attention into real opportunities.',
    tags: ['SEO', 'Traffic', 'Content', 'Analytics', 'Conversion'],
    featured: true,
  },
  {
    number: '03',
    label: 'Own',
    title: 'Build something that belongs to you.',
    text: 'Create a business, brand and digital ecosystem that you control and can continue building for years to come.',
    tags: ['Your business', 'Your brand', 'Your customers', 'Your future'],
  },
]

const journey = [
  {
    number: '01',
    title: 'Start with an idea',
    text: 'Every business begins somewhere. I help turn your idea into something real.',
  },
  {
    number: '02',
    title: 'Build the foundation',
    text: 'I create the technology, brand and digital presence your business needs to move forward.',
  },
  {
    number: '03',
    title: 'Create something you own',
    text: 'Your business, your brand, your customers and your digital assets become something you can build on for years.',
  },
]

const reasons = [
  {
    icon: Target,
    title: 'Built around your business',
    text: "I don't believe in one-size-fits-all solutions. Your website and digital tools are built around your goals, customers and business.",
  },
  {
    icon: TrendingUp,
    title: 'Designed for growth',
    text: 'I think beyond launch day. Your digital presence is built with SEO, scalability, performance and future growth in mind.',
  },
  {
    icon: Layers3,
    title: 'Technology + strategy',
    text: 'A great website is only part of the equation. I combine development, design, SEO and strategy to turn your digital presence into a business asset.',
  },
  {
    icon: Rocket,
    title: 'Your success matters',
    text: "My goal isn't simply to deliver a website and walk away. I want to help you build something that creates real opportunities.",
  },
]

export default function About() {
  return (
    <main className="lux-page">
      <LuxPageHero
        visual={<AboutVisual />}
        eyebrow="About me"
        title={
          <>
            Hi, I'm <em>Jocelyn.</em>
          </>
        }
        lead="I'm a web developer who helps entrepreneurs and businesses turn ideas into real digital businesses: websites, web applications and dashboards, built to grow with you."
      >
        <Link to="/contact" className="lux-btn lux-btn-solid">
          Start a project
        </Link>
        <Link to="/work" className="lux-btn lux-btn-ghost">
          See my work
        </Link>
      </LuxPageHero>

      {/* ===== STORY ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap lux-manifesto">
          <Reveal>
            <p className="lux-eyebrow lux-eyebrow--left">
              <span /> My story
            </p>
            <blockquote>
              Build something you believe in. Grow it with purpose.{' '}
              <em>Own your future.</em>
            </blockquote>
          </Reveal>

          <Reveal delay={120} className="lux-prose">
            <p className="lux-prose-lead">
              I'm Jocelyn, a web developer. Through StartupLift Dev I design,
              build and look after websites, web applications and dashboards,
              from the first sketch to launch day and the support after.
            </p>
            <p>
              Starting a business can feel overwhelming. You need a brand, a
              website, customers, technology and a way to grow — often before
              you've even made your first sale.
            </p>
            <p>
              That's where I come in. I help entrepreneurs and businesses turn
              ideas into real digital foundations that they can build on, grow
              with and ultimately own.
            </p>
            <p>
              I don't believe your website should simply sit online. It should
              become an asset that works for your business, helps people
              discover you and gives you the foundation to create something
              bigger.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== IN MY WORDS ===== */}
      <InMyWords
        eyebrow="In my words"
        title={
          <>
            What I <em>believe.</em>
          </>
        }
      />

      {/* real client quotes, shown only once some are added in src/data/testimonials.js */}
      <ClientTestimonials />

      {/* ===== BUILD / GROW / OWN ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> My mission <span />
            </p>
            <h2>
              Build. Grow. <em>Own.</em>
            </h2>
          </Reveal>

          <div className="lux-principles">
            {principles.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 120}
                as="article"
                className={`lux-principle${item.featured ? ' is-featured' : ''}`}
              >
                <span className="lux-principle-number">{item.number}</span>
                <p className="lux-principle-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY ===== */}
      <section className="lux-section">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> How I think <span />
            </p>
            <h2>
              I'm building more than <em>websites.</em>
            </h2>
          </Reveal>

          <div className="lux-journey">
            {journey.map((step, index) => (
              <Reveal key={step.number} delay={index * 120} className="lux-step">
                <span className="lux-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY ME ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> Why work with me <span />
            </p>
            <h2>
              You're not just building <em>a website.</em>
            </h2>
            <p className="lux-lead">
              You're building something that can grow with you. That's why I
              combine technology, design and strategy to create digital
              foundations built for the long term.
            </p>
          </Reveal>

          <div className="lux-why">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <Reveal
                  key={reason.title}
                  as="article"
                  delay={(index % 2) * 120}
                  className="lux-why-card"
                >
                  <span className="lux-why-icon">
                    <Icon size={24} strokeWidth={1.4} />
                  </span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="lux-closing">
        <Reveal>
          <p className="lux-statement">
            Build something.
            <br />
            Grow something.
            <br />
            <em>Own something.</em>
          </p>

          <div className="lux-cta">
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Let's build together <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
