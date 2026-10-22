import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroPortVisual from '../components/public/usable/HeroPortVisual'
import HeroReuse from '../components/public/usable/HeroReuse'

const projects = [
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
  {
    title: 'IVP ASBL',
    category: 'Web development',
    image: '/ivp.webp',
    description:
      'A bilingual website for a non-profit caring for the most vulnerable, alongside its MF Médical beauty services, with appointment booking and donations.',
    tags: ['Responsive', 'Donations', 'SEO'],
    className: 'portfolio-purple',
    link: 'https://ivp-asbl.netlify.app/',
  },
  {
    title: 'Vanta Detail Studio',
    category: 'Web Design',
    image: '/vanta.webp',
    description:
      'A bold, cinematic website for a car detailing studio, featuring packages, results, a gallery and online booking.',
    tags: ['Responsive', 'Booking', 'SEO'],
    className: 'portfolio-blue',
    link: 'https://ourcardetailing.netlify.app/',
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
const imageProps = (image = '') =>
  /\.(webp|png|jpe?g|avif)$/i.test(image)
    ? { src: image }
    : {
        src: `/${image}-1200.jpg`,
        srcSet: `/${image}-640.jpg 640w, /${image}-1200.jpg 1200w`,
      }

export default function Work() {
  const [filter, setFilter] = useState('All')

  const categories = [
    'All',
    'Web Design',
    'Web Application',
    'Brand & Web',
    'Web development',
  ]

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <main className="business-page">
      {/* HERO */}

      <section className=" hero-section">
        <HeroReuse
          eyebrow="OUR PORTFOLIO"
          h1_Start="Stand Out."
          h1_span="Built to Grow."
          h1_end=""
          par="Explore the websites and digital experiences we've built for businesses looking to stand out, connect with their audience, and grow online. Every project combines modern design, thoughtful functionality, and a clear focus on business goals—from powerful websites to complete digital solutions."
          first_btn="Start a Project"
          second_btn="Explore Services"
          more_one="Built with purpose"
          more_two="Designed to perform."
          link_1="/contact"
          link_2="/services"
        />
        
        <HeroPortVisual />
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

          <div className="portfolio-grid_one">
            {filteredProjects.map((project, index) => (
              <Link
                to={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
              >
                <article className={`portfolio-card ${project.className}`}>
                  <div className="portfolio-preview">
                    <img
                      className="portfolio-shot"
                      {...imageProps(project.image)}
                      sizes="(min-width: 900px) 50vw, 100vw"
                      alt={`${project.title} homepage preview`}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* <div className="browser-bar">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div> */}

                    <div className="preview-content">
                      <div className="preview-line"></div>

                      {/* <div className="preview-title">{project.title}</div> */}
                      {/* 
                      <div className="preview-blocks">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div> */}
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
              </Link>
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
              Start Your Project <span style={{ marginLeft: '16px' }}> →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
