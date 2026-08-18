import React from 'react'
import '../../styles/Packages.css'

const packages = [
  {
    id: 'starter',
    number: '01',
    icon: '🌱',
    name: 'Starter',
    title: 'Get Your Business Online',
    description: 'For entrepreneurs and small businesses starting from zero.',
    price: '$250 – $550',
    features: [
      'Professional responsive website',
      'Custom design',
      'Mobile-friendly design',
      'Core business pages',
      'Contact form',
      'Social media integration',
      'Basic SEO setup',
      'Google Analytics setup',
      'Google Search Console setup',
      'Website deployment',
    ],
    button: 'Get Started',
  },
  {
    id: 'business',
    number: '02',
    icon: '🚀',
    name: 'Business',
    title: 'Build a Stronger Online Presence',
    description:
      'For established businesses that need a stronger website and better online visibility.',
    price: '$500 – $750',
    featured: true,
    features: [
      'Everything in Starter',
      'More customized pages',
      'Advanced on-page SEO',
      'Keyword research',
      'Local SEO foundation',
      'Google Business Profile guidance',
      'Conversion-focused design',
      'Advanced analytics setup',
      'Lead-generation forms',
      'Performance optimization',
      'Traffic-growth strategy',
    ],
    button: 'Grow My Business',
  },
  {
    id: 'growth',
    number: '03',
    icon: '📈',
    name: 'Growth',
    title: 'Website + SEO + Traffic',
    description:
      'For businesses that want more than a website and are ready to actively grow online.',
    price: 'Custom Pricing',
    features: [
      'Website development',
      'SEO strategy',
      'Keyword research',
      'On-page SEO',
      'Technical SEO',
      'Local SEO',
      'Traffic-growth strategy',
      'Analytics',
      'Conversion optimization',
      'Search performance monitoring',
      'Monthly reporting',
    ],
    button: 'Start Growing',
  },
  {
    id: 'ecommerce',
    number: '04',
    icon: '🛒',
    name: 'E-Commerce',
    title: 'Start Selling Online',
    description:
      'For businesses that want to sell products and services online.',
    price: '$650 – $850',
    features: [
      'Custom e-commerce website',
      'Product management',
      'Product pages',
      'Shopping cart',
      'Checkout',
      'Payment gateway integration',
      'Customer experience optimization',
      'Mobile responsive design',
      'Basic SEO',
      'Analytics',
      'Website deployment',
    ],
    button: 'Build My Store',
  },
  {
    id: 'custom',
    number: '05',
    icon: '⚙️',
    name: 'Custom',
    title: 'Build Something Unique',
    description:
      'For businesses that need a custom digital system beyond a traditional website.',
    price: 'Starting at $800+',
    features: [
      'Custom web applications',
      'Customer portals',
      'Dashboards',
      'API integrations',
      'Business automation',
      'Custom databases',
      'Authentication systems',
      'Advanced functionality',
      'Custom business systems',
      'Advanced analytics',
    ],
    button: 'Discuss My Project',
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
    <section className="packages-section" id="packages">
      <div className="packages-container">
        {/* Section Header */}
        <div className="packages-header">
          <span className="packages-eyebrow">OUR PACKAGES</span>

          <h2>
            Build it.
            <span> Grow it.</span>
            <br />
            Own it.
          </h2>

          <p>
            Choose the package that fits where your business is today. Whether
            you're starting from scratch or ready to grow, StartupLift can help
            you take the next step.
          </p>
        </div>

        {/* Main Packages */}
        <div className="packages-grid">
          {packages.map((pkg) => (
            <article
              className={`package-card ${
                pkg.featured ? 'package-card-featured' : ''
              }`}
              key={pkg.id}
            >
              {pkg.featured && (
                <div className="package-badge">MOST POPULAR</div>
              )}

              <div className="package-top">
                <div className="package-number">{pkg.number}</div>

                <div className="package-icon">{pkg.icon}</div>
              </div>

              <div className="package-heading">
                <span className="package-name">{pkg.name}</span>

                <h3>{pkg.title}</h3>

                <p>{pkg.description}</p>
              </div>

              <div className="package-price">
                <span>{pkg.price}</span>
              </div>

              <div className="package-divider" />

              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="secondary-button"
                style={{ marginTop: '16px' }}
              >
                {pkg.button}
                <span style={{ marginLeft: '16px' }}>→</span>
              </button>
            </article>
          ))}
        </div>

        {/* Recurring Services */}
        <div className="recurring-section">
          <div className="recurring-header">
            <span className="packages-eyebrow">ONGOING SUPPORT</span>

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

          <div className="recurring-grid">
            {recurringServices.map((service) => (
              <article className="recurring-card" key={service.name}>
                <div className="package-top">
                  <div className="package-number">{service.number}</div>

                  <div className="package-icon">{service.icon}</div>
                </div>

                <h3>{service.name}</h3>

                <p className="recurring-description">{service.description}</p>

                <div className="recurring-price">
                  <strong>{service.price}</strong>
                  <span>{service.period}</span>
                </div>

                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="secondary-button"
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  Learn More <span style={{ marginLeft: '16px' }}>→</span>
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="packages-cta">
          <div>
            <span>NOT SURE WHERE TO START?</span>

            <h3>Let's figure out your next step.</h3>

            <p>
              Tell us about your business, your goals, and where you want to go.
              We'll help you determine the right solution.
            </p>
          </div>

          <button className="cta-button">
            Get a Free Consultation
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Packages
