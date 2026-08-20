import React from 'react'
import './css/visual.css'

export default function HeroPortVisual() {
  return (
    <div className="portfolio-visual">
      <div className="portfolio-visual-glow"></div>

      {/* Background grid */}
      <div className="portfolio-grid"></div>

      {/* Back project - left */}
      <div className="portfolio-project project-left">
        <div className="project-browser">
          <div className="project-browser-top">
            <div className="project-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="project-url">project-one.com</div>
          </div>

          <div className="project-preview project-preview-one">
            <div className="preview-nav-line"></div>

            <div className="preview-title-line large"></div>
            <div className="preview-title-line"></div>

            <div className="preview-button-small"></div>

            <div className="preview-image-block"></div>
          </div>
        </div>

        <div className="project-label">
          <span>01</span>
          <strong>BUSINESS WEBSITE</strong>
        </div>
      </div>

      {/* Back project - right */}
      <div className="portfolio-project project-right">
        <div className="project-browser">
          <div className="project-browser-top">
            <div className="project-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="project-url">ecommerce-brand.com</div>
          </div>

          <div className="project-preview project-preview-two">
            <div className="preview-nav-line"></div>

            <div className="product-row">
              <div className="product-box"></div>
              <div className="product-box"></div>
              <div className="product-box"></div>
            </div>

            <div className="preview-product-line"></div>
          </div>
        </div>

        <div className="project-label">
          <span>02</span>
          <strong>E-COMMERCE</strong>
        </div>
      </div>

      {/* Main featured project */}
      <div className="portfolio-featured">
        <div className="featured-browser">
          <div className="featured-browser-top">
            <div className="featured-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="featured-url">startupliftdev.com</div>

            <div className="featured-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="featured-screen">
            <div className="featured-nav">
              <div className="featured-logo">SL</div>

              <div className="featured-nav-links">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="featured-content">
              <div className="featured-tag">DIGITAL EXPERIENCE</div>

              <h3>
                Build.
                <br />
                <em>Grow.</em>
                <br />
                Stand out.
              </h3>

              <div className="featured-cta">VIEW PROJECT →</div>
            </div>

            {/* Featured graphic */}
            <div className="featured-graphic">
              <div className="graphic-ring ring-a"></div>
              <div className="graphic-ring ring-b"></div>

              <div className="graphic-core">SL</div>

              <div className="graphic-dot dot-a"></div>
              <div className="graphic-dot dot-b"></div>
              <div className="graphic-dot dot-c"></div>
            </div>

            <div className="featured-bottom">
              <div>
                <span>DESIGN</span>
                <strong>MODERN</strong>
              </div>

              <div>
                <span>PERFORMANCE</span>
                <strong>FAST</strong>
              </div>

              <div>
                <span>EXPERIENCE</span>
                <strong>RESPONSIVE</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="featured-project-info">
          <div>
            <span>FEATURED PROJECT</span>
            <strong>StartupLift Digital Experience</strong>
          </div>

          <div className="featured-arrow">→</div>
        </div>
      </div>

      {/* Small floating project */}
      <div className="portfolio-mini-card">
        <div className="mini-card-icon">↗</div>

        <div>
          <span>PROJECTS</span>
          <strong>Built for growth</strong>
        </div>
      </div>

      {/* Floating particles */}
      <span className="portfolio-particle particle-a"></span>
      <span className="portfolio-particle particle-b"></span>
      <span className="portfolio-particle particle-c"></span>
    </div>
  )
}
