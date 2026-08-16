import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WhyUs from '../components/public/WhyUs'

const projects = [
  {
    title: 'Business Website',
    category: 'Web Design',
    description:
      'A modern conversion-focused website designed to establish a strong online presence.',
    tags: ['React', 'Responsive', 'SEO'],
    className: 'portfolio-large',
  },
  {
    title: 'CRM Platform',
    category: 'Web Application',
    description:
      'A custom CRM platform for managing leads, sales teams and business operations.',
    tags: ['React', 'Node.js', 'MongoDB'],
    className: 'portfolio-blue',
  },
  {
    title: 'Startup Launch',
    category: 'Brand & Web',
    description:
      'A digital presence designed to help a new business launch with confidence.',
    tags: ['Branding', 'Design', 'SEO'],
    className: 'portfolio-purple',
  },
  {
    title: 'Growth Platform',
    category: 'Web Application',
    description:
      'A scalable platform designed around the workflow of a growing company.',
    tags: ['React', 'API', 'Dashboard'],
    className: 'portfolio-dark',
  },
]

export default function Work() {
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Web Design', 'Web Application', 'Brand & Web']

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <main className="business-page">
      {/* HERO */}

      <section className="business-hero portfolio-hero">
        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="business-container">
          <div className="business-hero-content">
            <div className="hero-badge">
              <span></span>
              Selected Work
            </div>

            <p className="eyebrow">OUR PORTFOLIO</p>

            <h1>
              Digital experiences
              <span> made to perform.</span>
            </h1>

            <p className="hero-description">
              Explore examples of the websites, applications and digital
              experiences we create for growing businesses.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}

      <section className="business-section portfolio-section">
        <div className="business-container">
          <div className="portfolio-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  filter === category ? 'filter-button active' : 'filter-button'
                }
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PROJECTS */}

          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <article
                className={`portfolio-card ${project.className}`}
                key={project.title}
              >
                <div className="portfolio-preview">
                  <div className="browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="preview-content">
                    <div className="preview-line"></div>

                    <div className="preview-title">{project.title}</div>

                    <div className="preview-blocks">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>

                <div className="portfolio-info">
                  <div>
                    <span className="portfolio-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>
                  </div>

                  <div className="portfolio-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}

      {/* CTA */}

      <section className="business-cta">
        <div className="business-container">
          <div className="cta-box">
            <p className="eyebrow">YOUR PROJECT COULD BE NEXT</p>

            <h2>
              Have something in
              <span> mind?</span>
            </h2>

            <Link to="/contact" className="primary-button">
              Start Your Project →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
