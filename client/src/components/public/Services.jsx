import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/newPackage.css'
import SectionTitle from './usable/SectionTitle'

const packages = [
  {
    id: 'Essential',
    number: '01',
    icon: '🚀',
    name: 'Essential',
    title: 'Get Your Business Online',
    description: 'For entrepreneurs and small businesses starting from zero.',
    price: '$250 – $550',
    features: [
      'Responsive website',
      'Page 1-3',
      'Mobile-friendly design',
      'Core project requirements',
      'Basic SEO setup',
    ],
    button: 'Get Started',
  },
  {
    id: 'Growth',
    number: '02',
    icon: '🌱',
    name: 'Growth',
    title: 'Build a Stronger Online Presence',
    description:
      'For established businesses that need a stronger website and better online visibility.',
    price: '$500 – $750',
    featured: true,
    features: [
      'Everything in Essential',
      'Additional feature',
      'Conversion-focused design',
      'SEO foundation',
      'Growth-focused improvements',
    ],
    button: 'Grow My Business',
  },
  {
    id: 'Premium',
    number: '03',
    icon: '📈',
    name: 'Premium',
    title: 'Website + SEO + Traffic',
    description: 'For businesses that need a more complete digital solution.',
    price: 'Custom Pricing',
    features: [
      'Everything in Growth',
      'Advanced functionality',
      'Custom integrations',
      'Advanced optimization',
      'Priority support',
    ],
    button: 'Start Growing',
  },
]

const recurringServices = [
  {
    icon: '🛡️',
    name: 'Care',
    number: '01',
    description: 'Website maintenance & support',
    price: '$15 – $25',
    period: '/month',
    features: [
      'Website updates',
      'Backups',
      'Security monitoring',
      'Performance monitoring',
      'Minor content changes',
      'Technical support',
    ],
  },
  {
    icon: '🔎',
    name: 'SEO',
    number: '02',
    description: 'Ongoing search optimization',
    price: 'Custom',
    period: ' pricing',
    features: [
      'Keyword monitoring',
      'SEO improvements',
      'Content updates',
      'Search performance monitoring',
      'Technical SEO',
      'Monthly reporting',
    ],
  },
  {
    icon: '📊',
    name: 'Growth',
    number: '03',
    description: 'SEO + traffic + optimization',
    price: 'Custom',
    period: ' pricing',
    features: [
      'SEO',
      'Traffic strategy',
      'Analytics',
      'Content strategy',
      'Conversion optimization',
      'Monthly reporting',
    ],
  },
]

function Packages() {
  return (
    <section className="sl-pricing-section" id="packages">
      <div className="sl-pricing-container">
        {/* HEADER */}
        <div className="sl-pricing-intro">
          <SectionTitle
            section="OUR PACKAGES"
            h2_start=" Build it."
            h2_glow="Grow it."
            h2_end="Own it."
            par="Choose the package that fits where your business is today. Whether you're starting from scratch or ready to grow, StartupLift can help you take the next step."
          />
        </div>

        {/* MAIN PACKAGES */}
        <div className="sl-package-grid">
          {packages.map((pkg) => (
            <article
              className={`sl-package-card ${
                pkg.featured ? 'sl-package-card-featured' : ''
              }`}
              key={pkg.id}
            >
              {pkg.featured && (
                <div className="sl-package-popular">
                  <span></span>
                  MOST POPULAR
                </div>
              )}

              <div className="sl-package-top">
                <span className="sl-package-number">{pkg.number}</span>

                <div className="sl-package-icon">{pkg.icon}</div>
              </div>

              <div className="sl-package-heading">
                <span className="sl-package-name">{pkg.name}</span>

                <h3>{pkg.title}</h3>

                <p>{pkg.description}</p>
              </div>

              <div className="sl-package-price">
                <span>{pkg.price}</span>
              </div>

              <div className="sl-package-line"></div>

              <ul className="sl-package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>
                    <span className="sl-check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="sl-package-button"
                style={{ marginTop: '16px' }}
              >
                {pkg.button}
                <span>→</span>
              </Link>
            </article>
          ))}
        </div>

        {/* RECURRING SERVICES */}
        <div className="sl-recurring-section">
          <div className="sl-recurring-header">
            <div className="sl-recurring-label">ONGOING SUPPORT</div>

            <h2>
              Don't just <span>launch.</span>
              <br />
              Keep growing.
            </h2>

            <p>
              Your website is the beginning, not the end. Keep your digital
              presence secure, visible, and growing with ongoing StartupLift
              support.
            </p>
          </div>

          <div className="sl-recurring-grid">
            {recurringServices.map((service) => (
              <article className="sl-recurring-card" key={service.name}>
                <div className="sl-recurring-top">
                  <span>{service.number}</span>

                  <div className="sl-recurring-icon">{service.icon}</div>
                </div>

                <div className="sl-recurring-heading">
                  <h3>{service.name}</h3>

                  <p>{service.description}</p>
                </div>

                <div className="sl-recurring-price">
                  <strong>{service.price}</strong>
                  <span>{service.period}</span>
                </div>

                <div className="sl-recurring-divider"></div>

                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="sl-recurring-button">
                  Learn More
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sl-pricing-cta">
          <div className="sl-cta-content">
            <span>NOT SURE WHERE TO START?</span>

            <h3>
              Let's figure out
              <strong> your next step.</strong>
            </h3>

            <p>
              Tell us about your business, your goals, and where you want to go.
              We'll help you determine the right solution.
            </p>
          </div>

          <Link to="/contact" className="sl-cta-button">
            Get a Free Consultation
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Packages
