import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import WhyUs from '../components/public/WhyUs'
import HeroPortVisual from '../components/public/usable/HeroPortVisual'
import HeroReuse from '../components/public/usable/HeroReuse'

const projects = [
  {
    title: 'YVNG Saints',
    category: 'Web development',
    image: '/youngimg.png',
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
    image: '/eclatimage.png',
    description:
      'Professional residential and commercial cleaning services designed to keep your space fresh, healthy, and spotless.',
    tags: ['Branding', 'Design', 'SEO'],
    className: 'portfolio-purple',
    link: 'https://eclatservices.netlify.app/',
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
                  <div
                    className="portfolio-preview"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
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
