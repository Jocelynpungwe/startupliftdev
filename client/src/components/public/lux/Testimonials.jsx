import React from 'react'

import { clientTestimonials, inMyWords } from '../../../data/testimonials.js'
import Reveal from './Reveal.jsx'

const AVATAR = '/hero-portrait.webp'

/* Short statements in Jocelyn's own voice (taken from the site's copy).
   They are attributed to Jocelyn, not to a client. */
export function InMyWords({ eyebrow = 'In my words', title }) {
  return (
    <section className="lux-section">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> {eyebrow} <span />
          </p>
          <h2>{title}</h2>
        </Reveal>

        <div className="lux-quotes">
          {inMyWords.map((item, index) => (
            <Reveal
              key={item.quote}
              as="figure"
              delay={index * 120}
              className="lux-quote"
            >
              <span className="lux-quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <img src={AVATAR} alt="" loading="lazy" />
                <span>
                  <strong>Jocelyn</strong>
                  <small>{item.context}</small>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Real client quotes. Renders nothing until some are added to
   src/data/testimonials.js, so there is never an empty or made-up section. */
export function ClientTestimonials() {
  if (clientTestimonials.length === 0) return null

  return (
    <section className="lux-section lux-section--alt">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> What clients say <span />
          </p>
          <h2>
            Kind words from <em>clients.</em>
          </h2>
        </Reveal>

        <div className="lux-quotes">
          {clientTestimonials.map((item, index) => (
            <Reveal
              key={`${item.name}-${index}`}
              as="figure"
              delay={index * 120}
              className="lux-quote"
            >
              <span className="lux-quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className="lux-quote-initial" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>
                    {item.role}
                    {item.project ? ` · ${item.project}` : ''}
                  </small>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
