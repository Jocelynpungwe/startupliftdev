import React from 'react'
import { Clock, Facebook, Globe, Instagram, Mail } from 'lucide-react'

import Form from '../components/Form.jsx'
import LuxPageHero from '../components/public/lux/LuxPageHero.jsx'
import Reveal from '../components/public/lux/Reveal.jsx'

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@startupliftdev.com',
    href: 'mailto:contact@startupliftdev.com',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Usually within 24 hours',
  },
  {
    icon: Globe,
    label: 'Services',
    value: 'Web • SEO • Digital growth',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@startupliftdev',
    href: 'https://www.instagram.com/startupliftdev',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'startupliftdev',
    href: 'https://www.facebook.com/startupliftdev',
  },
]

export default function Contact() {
  return (
    <main className="lux-page lux-contact">
      <LuxPageHero
        eyebrow="Contact"
        title={
          <>
            Let's build something
            <br />
            made to <em>perform.</em>
          </>
        }
        lead="Have a business idea, need a new website or want to improve your current online presence? Tell us what you're working on."
      />

      <section className="lux-section lux-section--alt">
        <div className="lux-wrap lux-contact-grid">
          <Reveal className="lux-contact-info">
            <p className="lux-eyebrow lux-eyebrow--left">
              <span /> Get in touch
            </p>

            <h2>
              Tell us about <em>your project.</em>
            </h2>

            <p className="lux-contact-lead">
              We would love to hear about your business, your goals and what
              you're looking to build.
            </p>

            <ul className="lux-details">
              {details.map(({ icon: Icon, label, value, href }) => {
                const external = href && href.startsWith('http')
                const content = (
                  <>
                    <span className="lux-details-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </>
                )

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lux-form-panel">
            <Form />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
