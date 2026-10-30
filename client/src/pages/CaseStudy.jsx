import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import LuxPageHero from '../components/public/lux/LuxPageHero.jsx'
import Reveal from '../components/public/lux/Reveal.jsx'
import { InMyWords } from '../components/public/lux/Testimonials.jsx'
import { caseStudies, findCaseStudy } from '../data/caseStudies.js'

function BrowserShot({ study }) {
  const host = study.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <figure className="lux-visual lux-case-shot">
      <div className="lux-case-shot-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{host}</span>
      </div>
      <img src={study.image} alt={`${study.title} homepage`} />
    </figure>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const study = findCaseStudy(slug)

  useEffect(() => {
    if (!study) return undefined
    const previous = document.title
    document.title = `${study.title} · Case study | StartupLift Dev`
    return () => {
      document.title = previous
    }
  }, [study])

  if (!study) return <Navigate to="/work" replace />

  const next = caseStudies.find((item) => item.slug !== study.slug)

  return (
    <main className="lux-page lux-case">
      <LuxPageHero
        visual={<BrowserShot study={study} />}
        eyebrow={`Case study · ${study.category}`}
        title={study.title}
        lead={study.summary}
      >
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="lux-btn lux-btn-solid"
        >
          Visit the live site <ArrowUpRight size={16} />
        </a>
        <Link to="/work" className="lux-btn lux-btn-ghost">
          All work
        </Link>
      </LuxPageHero>

      {/* ===== AT A GLANCE ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <dl className="lux-facts">
            {study.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 90} className="lux-fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== THE BRIEF ===== */}
      <section className="lux-section">
        <div className="lux-wrap lux-manifesto">
          <Reveal>
            <p className="lux-eyebrow lux-eyebrow--left">
              <span /> The brief
            </p>
            <blockquote>{study.tagline}</blockquote>
            <p className="lux-case-note">{study.taglineNote}</p>
          </Reveal>

          <Reveal delay={120} className="lux-prose">
            {study.brief.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'lux-prose-lead' : ''}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> How I approached it <span />
            </p>
            <h2>
              Design decisions that <em>do the work.</em>
            </h2>
          </Reveal>

          <div className="lux-approach">
            {study.approach.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 2) * 120}
                className="lux-step"
              >
                <span className="lux-step-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT IS ON THE SITE ===== */}
      <section className="lux-section">
        <div className="lux-wrap">
          <Reveal className="lux-section-head">
            <p className="lux-eyebrow">
              <span /> On the site <span />
            </p>
            <h2>
              What visitors <em>find.</em>
            </h2>
          </Reveal>

          <Reveal className="lux-case-included">
            <ul className="lux-tags">
              {study.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== IN MY WORDS ===== */}
      <InMyWords
        eyebrow="In my words"
        title={
          <>
            How I think about <em>every project.</em>
          </>
        }
      />

      {/* ===== NEXT ===== */}
      {next && (
        <section className="lux-section lux-section--alt">
          <div className="lux-wrap">
            <Reveal className="lux-next-wrap">
              <p className="lux-eyebrow">
                <span /> Next case study <span />
              </p>
              <Link to={`/work/${next.slug}`} className="lux-next">
                <span>{next.title}</span>
                <ArrowUpRight size={28} strokeWidth={1.3} />
              </Link>
              <p className="lux-case-note">{next.summary}</p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="lux-closing">
        <Reveal>
          <p className="lux-eyebrow">
            <span /> Your project could be next <span />
          </p>
          <h2>
            Let's build something <em>exceptional.</em>
          </h2>
          <div className="lux-cta">
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Start a project
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
