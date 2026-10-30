import React from 'react'

import { clientTestimonials } from '../../../data/testimonials.js'
import Reveal from './Reveal.jsx'

/* Real client quotes. Renders nothing until some are added to
   src/data/testimonials.js, so there is never an empty or made-up section.
   Pass `study` to show only the quotes for that case study. */
export function ClientTestimonials({ study }) {
  const items = study
    ? clientTestimonials.filter(
        (item) => item.project === study.title || item.project === study.short,
      )
    : clientTestimonials

  if (items.length === 0) return null

  return (
    <section className="lux-section lux-section--alt">
      <div className="lux-wrap">
        <Reveal className="lux-section-head">
          <p className="lux-eyebrow">
            <span /> {study ? 'In their words' : 'What clients say'} <span />
          </p>
          <h2>
            Kind words from <em>clients.</em>
          </h2>
        </Reveal>

        <div className="lux-quotes">
          {items.map((item, index) => (
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
                    {item.project && !study ? ` · ${item.project}` : ''}
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
