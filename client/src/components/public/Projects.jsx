import React from 'react'
import { Link } from 'react-router-dom'

export default function Projects() {
  return (
    <section className="projects-section">
      <div className="section-heading">
        <div>
          <p className="section-label">SELECTED WORK</p>

          <h2>
            Digital products
            <br />
            built with <span>purpose.</span>
          </h2>
        </div>

        <Link to="/contact" className="text-link">
          Start a project →
        </Link>
      </div>

      <div className="projects-grid">
        <ProjectCard
          number="01"
          title="Business Website"
          category="Web Development"
          className="project-purple"
        />

        <ProjectCard
          number="02"
          title="Business Dashboard"
          category="Web Application"
          className="project-blue"
        />

        <ProjectCard
          number="03"
          title="Growth Platform"
          category="Digital Strategy"
          className="project-dark"
        />
      </div>
    </section>
  )
}

function ProjectCard({ number, title, category, className }) {
  return (
    <div className={`project-card ${className}`}>
      <div className="project-number">{number}</div>

      <div className="project-mockup">
        <div className="mockup-header">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="mockup-content">
          <div className="mockup-line"></div>
          <div className="mockup-line short"></div>

          <div className="mockup-boxes">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="project-info">
        <span>{category}</span>

        <h3>{title}</h3>
      </div>
    </div>
  )
}
