import React from 'react'
import {
  BookOpen,
  Search,
  Map,
  Megaphone,
  Facebook,
  Linkedin,
  Instagram,
  Users,
  CalendarDays,
  Building2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

import './css/leadGuide.css'

const leadSources = [
  {
    name: 'Google Maps',
    priority: 'High',
    level: 'high',
    icon: Map,
    description: 'Find local businesses and check their websites.',
  },
  {
    name: 'Google Search',
    priority: 'High',
    level: 'high',
    icon: Search,
    description: 'Search businesses in specific cities and industries.',
  },
  {
    name: 'Google Ads',
    priority: 'High',
    level: 'high',
    icon: Megaphone,
    description: 'Find businesses already spending money to get customers.',
  },
  {
    name: 'Meta Ad Library',
    priority: 'High',
    level: 'high',
    icon: Facebook,
    description: 'Find businesses currently running Facebook or Instagram ads.',
  },
  {
    name: 'Facebook Groups',
    priority: 'Medium',
    level: 'medium',
    icon: Users,
    description: 'Look for business owners asking for help or recommendations.',
  },
  {
    name: 'Instagram',
    priority: 'Medium',
    level: 'medium',
    icon: Instagram,
    description:
      'Find active businesses with strong social media but weak websites.',
  },
  {
    name: 'LinkedIn',
    priority: 'Medium',
    level: 'medium',
    icon: Linkedin,
    description: 'Find business owners, founders and growing companies.',
  },
  {
    name: 'Referrals',
    priority: 'High',
    level: 'high',
    icon: Users,
    description: 'Ask existing contacts and clients for introductions.',
  },
  {
    name: 'Networking Events',
    priority: 'High',
    level: 'high',
    icon: CalendarDays,
    description: 'Meet business owners and build relationships directly.',
  },
  {
    name: 'New Businesses',
    priority: 'High',
    level: 'high',
    icon: Building2,
    description: 'Look for newly opened businesses that may need a website.',
  },
  {
    name: 'Growing Businesses',
    priority: 'High',
    level: 'high',
    icon: Building2,
    description: 'Look for businesses expanding locations, services or teams.',
  },
]

const leadProblems = [
  {
    title: 'No website',
    score: 5,
    priority: 'Critical',
    level: 'critical',
  },
  {
    title: 'Website completely broken',
    score: 5,
    priority: 'Critical',
    level: 'critical',
  },
  {
    title: 'E-commerce, booking or payment system broken',
    score: 5,
    priority: 'Critical',
    level: 'critical',
  },
  {
    title: 'Running ads to a terrible or broken landing page',
    score: 5,
    priority: 'Critical',
    level: 'critical',
  },
  {
    title: 'Outdated website',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
  {
    title: 'Poor mobile experience',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
  {
    title: 'Poor SEO',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
  {
    title: 'No booking or quote system',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
  {
    title: 'Strong social media but weak website',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
  {
    title: 'Business is expanding',
    score: 3,
    priority: 'Strong',
    level: 'strong',
  },
]

export default function LeadGuide() {
  return (
    <div className="lead-guide-page">
      {/* HEADER */}

      <div className="lead-guide-header">
        <div className="lead-guide-heading">
          <div className="lead-guide-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <h2>Lead Guide</h2>
            <p>Find businesses that may need our services.</p>
          </div>
        </div>
      </div>

      {/* QUICK RULE */}

      <div className="lead-guide-rule">
        <div className="lead-guide-rule-icon">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <strong>What makes a good lead?</strong>
          <p>
            Look for businesses with a clear problem that we can solve. Focus on
            higher-priority problems first.
          </p>
        </div>
      </div>

      {/* LEAD SOURCES */}

      <section className="lead-guide-section">
        <div className="lead-guide-section-header">
          <div>
            <span>01</span>
            <h3>Where to find leads</h3>
          </div>

          <p>Places where the sales team can find potential clients.</p>
        </div>

        <div className="lead-source-grid">
          {leadSources.map((source) => {
            const Icon = source.icon

            return (
              <div className="lead-source-card" key={source.name}>
                <div className="lead-source-top">
                  <div className="lead-source-icon">
                    <Icon size={18} />
                  </div>

                  <span className={`lead-priority-badge ${source.level}`}>
                    {source.priority}
                  </span>
                </div>

                <h4>{source.name}</h4>

                <p>{source.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* PROBLEMS */}

      <section className="lead-guide-section">
        <div className="lead-guide-section-header">
          <div>
            <span>02</span>
            <h3>Problems to look for</h3>
          </div>

          <p>The bigger the problem, the higher the priority of the lead.</p>
        </div>

        <div className="lead-problem-list">
          {leadProblems.map((problem) => (
            <div className="lead-problem-card" key={problem.title}>
              <div className="lead-problem-left">
                <div className={`lead-problem-icon ${problem.level}`}>
                  <AlertTriangle size={17} />
                </div>

                <div>
                  <h4>{problem.title}</h4>
                  <span>{problem.priority} priority</span>
                </div>
              </div>

              <div className={`lead-score ${problem.level}`}>
                <strong>{problem.score}</strong>
                <small>PTS</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRIORITY SYSTEM */}

      <section className="lead-guide-section">
        <div className="lead-guide-section-header">
          <div>
            <span>03</span>
            <h3>Lead priority</h3>
          </div>

          <p>Use the problem score to decide which leads to contact first.</p>
        </div>

        <div className="lead-priority-grid">
          <div className="lead-priority-box critical">
            <strong>5 Points</strong>
            <h4>Critical</h4>
            <p>
              Contact these businesses first. They have an obvious problem that
              our services can solve.
            </p>
          </div>

          <div className="lead-priority-box strong">
            <strong>3 Points</strong>
            <h4>Strong</h4>
            <p>
              Good opportunities. Research the business and contact them after
              critical leads.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM TIP */}

      <div className="lead-guide-tip">
        <strong>Sales tip:</strong>
        <span>
          Don't just look for businesses. Look for problems. A business with a
          problem is an opportunity.
        </span>
      </div>
    </div>
  )
}
