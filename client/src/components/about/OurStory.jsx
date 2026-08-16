import React from 'react'
import './style/ourStory.css'

export default function OurStory() {
  return (
    <section className="about-story-section">
      <div className="business-container">
        <div className="story-header">
          <div>
            <p className="eyebrow">OUR STORY</p>

            <h2>
              We're building more than
              <span style={{ color: ' #3b82f6' }}> websites.</span>
            </h2>
          </div>

          <p className="story-intro">
            StartupLift was created with a simple belief: people should have the
            tools and opportunity to build something of their own.
          </p>
        </div>

        <div className="story-content">
          <div className="story-main">
            <p className="story-large-text">
              Starting a business can feel overwhelming. You need a brand, a
              website, customers, technology and a way to grow — often before
              you've even made your first sale.
            </p>

            <p>
              That's where StartupLift comes in. We help entrepreneurs and
              businesses turn ideas into real digital foundations that they can
              build on, grow with and ultimately own.
            </p>

            <p>
              We don't believe your website should simply sit online. It should
              become an asset that works for your business, helps people
              discover you and gives you the foundation to create something
              bigger.
            </p>
          </div>

          <div className="story-side">
            <div className="story-step">
              <span style={{ color: '#3b82f6' }}>01</span>

              <div>
                <h3>Start with an idea</h3>
                <p>
                  Every business begins somewhere. We help turn your idea into
                  something real.
                </p>
              </div>
            </div>

            <div className="story-step">
              <span style={{ color: '#3b82f6' }}>02</span>

              <div>
                <h3>Build the foundation</h3>
                <p>
                  We create the technology, brand and digital presence your
                  business needs to move forward.
                </p>
              </div>
            </div>

            <div className="story-step">
              <span style={{ color: '#3b82f6' }}>03</span>

              <div>
                <h3>Create something you own</h3>
                <p>
                  Your business, your brand, your customers and your digital
                  assets should become something you can build on for years.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="story-bottom">
          <span>OUR BELIEF</span>

          <h3>
            Build something you believe in. Grow it with purpose.
            <span style={{ color: '#3b82f6' }}> Own your future.</span>
          </h3>
        </div>
      </div>
    </section>
  )
}
