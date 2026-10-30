import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import LuxPageHero from '../components/public/lux/LuxPageHero.jsx'
import { WorkVisual } from '../components/public/lux/HeroVisuals.jsx'
import Reveal from '../components/public/lux/Reveal.jsx'

export const projects = [
  {
    title: 'IVP ASBL',
    category: 'Web development',
    image: '/ivp.webp',
    description:
      'A French-language website for a non-profit caring for people in need, alongside its MF Médical beauty services, with appointment and donation buttons.',
    tags: ['Responsive', 'Donations', 'Case study'],
    className: 'portfolio-purple',
    link: 'https://ivp-asbl.netlify.app/',
    caseStudy: 'ivp-asbl',
  },
  {
    title: 'Vanta Detail Studio',
    category: 'Web Design',
    image: '/vanta.webp',
    description:
      'A bold, cinematic website for a car detailing studio, with craft, results, packages and a gallery, and a clear Book now button.',
    tags: ['Responsive', 'Cinematic', 'Case study'],
    className: 'portfolio-blue',
    link: 'https://ourcardetailing.netlify.app/',
    caseStudy: 'vanta-detail-studio',
  },
  {
    title: 'YVNG Saints',
    category: 'Web development',
    image: 'work-yvng',
    description:
      'YVNG Saints brings faith and contemporary streetwear together in pieces made to be seen, felt and lived in.',
    tags: ['React', 'Responsive', 'SEO'],
    className: 'portfolio-large',
    link: 'https://youngsaints.netlify.app/',
  },
  // {
  //   title: 'CRM Platform',
  //   category: 'Web Application',
  //   description:
  //     'A custom CRM platform for managing leads, sales teams and business operations.',
  //   tags: ['React', 'Node.js', 'MongoDB'],
  //   className: 'portfolio-blue',
  // },
  {
    title: 'Eclat Cleaning Services',
    category: 'Brand & Web',
    image: 'work-eclat',
    description:
      'Professional residential and commercial cleaning services designed to keep your space fresh, healthy, and spotless.',
    tags: ['Branding', 'Design', 'SEO'],
    className: 'portfolio-purple',
    link: 'https://eclatservices.netlify.app/',
  },  {
    title: 'Royal Memoria',
    category: 'Web development',
    image: 'work-royal',
    description:
      'Royal Memoria is a multinational corporation with a diverse portfolio of subsidiaries operating in multiple countries..',
    tags: ['React', 'Responsive', 'SEO'],
    className: 'portfolio-dark',
    link: 'https://royalmemoria.netlify.app/',
  },
  {
    title: 'Maison Amara',
    category: 'Web Design',
    image: '/maisonamara.webp',
    description:
      'A cinematic website for a luxury makeup atelier, pairing elegant typography with full-screen film and a simple booking flow.',
    tags: ['Responsive', 'Booking', 'SEO'],
    className: 'portfolio-purple',
    link: 'https://ourbeautystudio.netlify.app/',
  },
  {
    title: 'VitaGrace Cleaning Services',
    category: 'Web Design',
    image: '/vitagrace.webp',
    description:
      'A fresh, trustworthy website for a cleaning company, with a before-and-after story, service details and quick quote requests.',
    tags: ['Responsive', 'Lead Generation', 'SEO'],
    className: 'portfolio-blue',
    link: 'https://ourcleaningdemo.netlify.app/',
  },
  {
    title: 'Crown Atelier',
    category: 'Web Design',
    image: '/crownatelier.webp',
    description:
      'A warm, editorial website for a hair studio, showcasing services, client transformations and an easy path to booking.',
    tags: ['Responsive', 'Booking', 'SEO'],
    className: 'portfolio-dark',
    link: 'https://ourhairstudio.netlify.app/',
  },
  // {
  //   title: 'Growth Platform',
  //   category: 'Web Application',
  //   description:
  //     'A scalable platform designed around the workflow of a growing company.',
  //   tags: ['React', 'API', 'Dashboard'],
  //   className: 'portfolio-dark',
  // },
]

// Entries either name an optimised set ('work-eclat' -> -640/-1200 JPEGs)
// or point straight at an image file ('/vanta.webp').
export const imageProps = (image = '') =>
  /\.(webp|png|jpe?g|avif)$/i.test(image)
    ? { src: image }
    : {
        src: `/${image}-1200.jpg`,
        srcSet: `/${image}-640.jpg 640w, /${image}-1200.jpg 1200w`,
      }

export default function Work() {
  const [filter, setFilter] = useState('All')

  // Only offer filters that actually have projects behind them.
  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ]

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <main className="lux-page">
      <LuxPageHero
        visual={<WorkVisual />}
        eyebrow="Our portfolio"
        title={
          <>
            Stand out.
            <br />
            Built to <em>grow.</em>
          </>
        }
        lead="Explore the websites and digital experiences we've built for businesses looking to stand out, connect with their audience and grow online. Every project combines modern design, thoughtful functionality and a clear focus on business goals."
      >
        <Link to="/contact" className="lux-btn lux-btn-solid">
          Start a project
        </Link>
        <Link to="/services" className="lux-btn lux-btn-ghost">
          Explore services
        </Link>
      </LuxPageHero>

      <section className="lux-section lux-section--alt">
        <div className="lux-wrap">
          <div className="lux-filter" role="tablist" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                className={filter === category ? 'is-active' : ''}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="lux-work-grid">
            {filteredProjects.map((project, index) => {
              const card = project.caseStudy
                ? { as: Link, to: `/work/${project.caseStudy}` }
                : {
                    as: 'a',
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }

              return (
              <Reveal
                key={project.title}
                delay={(index % 2) * 120}
                {...card}
                className="lux-work-card"
              >
                <div className="lux-card-media">
                  <img
                    {...imageProps(project.image)}
                    sizes="(min-width: 1000px) 50vw, 100vw"
                    alt={`${project.title} homepage preview`}
                    loading="lazy"
                    decoding="async"
                  />
                  {project.caseStudy && (
                    <span className="lux-case-badge">Case study</span>
                  )}
                </div>

                <div className="lux-work-body">
                  <div className="lux-work-meta">
                    <span>{project.category}</span>
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <ul className="lux-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="lux-closing">
        <Reveal>
          <p className="lux-eyebrow">
            <span /> Your project could be next <span />
          </p>
          <h2>
            Have something in <em>mind?</em>
          </h2>
          <div className="lux-cta">
            <Link to="/contact" className="lux-btn lux-btn-solid">
              Start your project
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
