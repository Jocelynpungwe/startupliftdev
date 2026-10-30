import React from 'react'

import { imageProps, projects } from '../../pages/Work.jsx'

export default function PortfolioShowcase() {
  const featured = projects.filter((project) => project.image)

  return (
    <section className="lux-showcase" aria-labelledby="lux-showcase-title">
      <header className="lux-section-head">
        <p className="lux-eyebrow">
          <span /> Selected work <span />
        </p>
        <h2 id="lux-showcase-title">
          Built for brands that <em>stand apart.</em>
        </h2>
      </header>

      <div className="lux-showcase-grid">
        {featured.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-card"
          >
            <div className="lux-card-media">
              <img
                {...imageProps(project.image)}
                sizes="(min-width: 1000px) 33vw, (min-width: 600px) 50vw, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="lux-card-body">
              <span className="lux-card-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <span className="lux-card-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
