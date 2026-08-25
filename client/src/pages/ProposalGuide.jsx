import React, { useState } from 'react'
import {
  FileText,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Send,
  Eye,
  MessageSquare,
  Handshake,
  XCircle,
  Target,
  ShieldCheck,
  ClipboardList,
  CreditCard,
  Layers,
  TrendingUp,
} from 'lucide-react'

import './css/proposalGuide.css'

const proposalSteps = [
  {
    number: '01',
    title: 'Confirm the Need',
    icon: Target,
    text: 'Make sure the client problem and desired outcome are clearly understood.',
  },
  {
    number: '02',
    title: 'Define the Scope',
    icon: ClipboardList,
    text: 'Determine exactly what needs to be delivered and what is outside the project.',
  },
  {
    number: '03',
    title: 'Build the Solution',
    icon: Layers,
    text: 'Choose the services, features, and deliverables that solve the client problem.',
  },
  {
    number: '04',
    title: 'Calculate the Investment',
    icon: DollarSign,
    text: 'Price the project based on scope, complexity, time, resources, and business value.',
  },
  {
    number: '05',
    title: 'Create the Proposal',
    icon: FileText,
    text: 'Present the problem, solution, scope, timeline, investment, and next steps.',
  },
  {
    number: '06',
    title: 'Review Internally',
    icon: ShieldCheck,
    text: 'Check the proposal for pricing, scope, timeline, grammar, and accuracy before sending.',
  },
  {
    number: '07',
    title: 'Present the Proposal',
    icon: Send,
    text: 'Whenever possible, present the proposal instead of simply emailing a PDF.',
  },
  {
    number: '08',
    title: 'Follow Up',
    icon: MessageSquare,
    text: 'Confirm receipt, answer questions, handle concerns, and move toward a decision.',
  },
]

const proposalSections = [
  {
    title: 'Client Information',
    description: 'Make the proposal specific to the prospect.',
    items: [
      'Business name',
      'Contact person',
      'Email and phone',
      'Proposal date',
      'Proposal expiration date',
    ],
  },
  {
    title: 'Problem',
    description: 'Show that you understand why they contacted you.',
    items: [
      'Current challenge',
      'Business impact',
      'Customer impact',
      'Opportunity being missed',
    ],
  },
  {
    title: 'Recommended Solution',
    description: 'Explain what StartupLift Dev recommends.',
    items: [
      'Recommended service',
      'Approach',
      'Key features',
      'Important integrations',
      'Expected outcome',
    ],
  },
  {
    title: 'Scope of Work',
    description: 'Clearly define what the client is paying for.',
    items: [
      'Pages',
      'Features',
      'Design work',
      'Development',
      'SEO',
      'Testing',
      'Deployment',
    ],
  },
  {
    title: 'Timeline',
    description: 'Set realistic expectations.',
    items: [
      'Project start',
      'Major milestones',
      'Client approval points',
      'Estimated completion',
      'Dependencies',
    ],
  },
  {
    title: 'Investment',
    description: 'Make the pricing easy to understand.',
    items: [
      'Total project price',
      'Payment schedule',
      'Optional services',
      'Recurring services',
      'Taxes if applicable',
    ],
  },
]

const packages = [
  {
    name: 'Essential',
    label: 'START',
    description:
      'For businesses that need the core solution without unnecessary complexity.',
    features: [
      'Core project requirements',
      'Professional implementation',
      'Responsive design',
      'Essential setup',
      'Basic support',
    ],
  },
  {
    name: 'Growth',
    label: 'POPULAR',
    description:
      'For businesses that want a stronger solution designed for growth.',
    features: [
      'Everything in Essential',
      'Additional features',
      'Conversion-focused design',
      'SEO foundation',
      'Enhanced support',
      'Growth-focused improvements',
    ],
  },
  {
    name: 'Premium',
    label: 'ADVANCED',
    description: 'For businesses that need a more complete digital solution.',
    features: [
      'Everything in Growth',
      'Advanced functionality',
      'Custom integrations',
      'Advanced optimization',
      'Priority support',
      'Long-term strategy',
    ],
  },
]

const objections = [
  {
    title: '"That is too expensive."',
    bad: 'Immediately offer a discount.',
    good: 'I understand. Before we change the price, can we look at which part of the proposal feels outside your expectations?',
  },
  {
    title: '"Can you lower the price?"',
    bad: 'Sure, we can take $500 off.',
    good: 'We may be able to adjust the scope. Which part of the proposal would you like us to reconsider?',
  },
  {
    title: '"Someone else is cheaper."',
    bad: 'We can match their price.',
    good: 'I understand. Are you comparing the total price, or are there differences in what each provider is including?',
  },
  {
    title: '"I need to think about it."',
    bad: 'Okay, call me whenever you decide.',
    good: 'Of course. Is there anything specific about the solution, investment, or timing that you would like to discuss before you decide?',
  },
  {
    title: '"Can we pay after the project?"',
    bad: 'Yes, no problem.',
    good: 'We normally structure projects around milestone payments. I can walk you through the payment schedule and what each milestone covers.',
  },
]

const followUpSteps = [
  {
    day: 'DAY 0',
    title: 'Proposal Sent',
    icon: Send,
    text: 'Confirm that the client received the proposal and knows what to expect.',
  },
  {
    day: 'DAY 1–2',
    title: 'Check In',
    icon: Eye,
    text: 'Make sure they had an opportunity to review it and ask whether anything is unclear.',
  },
  {
    day: 'DAY 4–5',
    title: 'Discuss',
    icon: MessageSquare,
    text: 'Ask about questions, concerns, scope, timing, and decision-making.',
  },
  {
    day: 'DAY 7+',
    title: 'Decision Follow-Up',
    icon: Handshake,
    text: 'Ask whether they want to move forward, adjust the proposal, or revisit the project later.',
  },
]

const proposalStatuses = [
  {
    title: 'Proposal Not Started',
    icon: FileText,
  },
  {
    title: 'Drafting',
    icon: ClipboardList,
  },
  {
    title: 'Internal Review',
    icon: ShieldCheck,
  },
  {
    title: 'Sent',
    icon: Send,
  },
  {
    title: 'Viewed',
    icon: Eye,
  },
  {
    title: 'Negotiation',
    icon: MessageSquare,
  },
  {
    title: 'Accepted',
    icon: CheckCircle2,
  },
  {
    title: 'Rejected',
    icon: XCircle,
  },
]

function ProposalGuide() {
  const [activeSection, setActiveSection] = useState('process')

  const scrollToSection = (id) => {
    setActiveSection(id)

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="proposal-guide">
      {/* HERO */}
      <section className="proposal-hero">
        <div className="proposal-glow proposal-glow-one" />
        <div className="proposal-glow proposal-glow-two" />

        <div className="proposal-hero-content">
          <span className="proposal-badge">SALES DEPARTMENT • STEP 6</span>

          <div className="proposal-hero-icon">
            <FileText size={29} />
          </div>

          <h1>
            Proposal <span>& Pricing</span>
          </h1>

          <p>
            Turn a qualified sales conversation into a clear proposal,
            communicate the value of the solution, present pricing
            professionally, and move the prospect toward a decision.
          </p>

          <div className="proposal-flow">
            <span>Need</span>
            <ArrowRight size={15} />
            <span>Scope</span>
            <ArrowRight size={15} />
            <span>Solution</span>
            <ArrowRight size={15} />
            <span>Price</span>
            <ArrowRight size={15} />
            <span>Proposal</span>
            <ArrowRight size={15} />
            <span>Decision</span>
          </div>
        </div>
      </section>

      {/* NAV */}
      <div className="proposal-nav">
        <button
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => scrollToSection('process')}
        >
          Process
        </button>

        <button
          className={activeSection === 'proposal' ? 'active' : ''}
          onClick={() => scrollToSection('proposal')}
        >
          Proposal
        </button>

        <button
          className={activeSection === 'pricing' ? 'active' : ''}
          onClick={() => scrollToSection('pricing')}
        >
          Pricing
        </button>

        <button
          className={activeSection === 'payment' ? 'active' : ''}
          onClick={() => scrollToSection('payment')}
        >
          Payment
        </button>

        <button
          className={activeSection === 'objections' ? 'active' : ''}
          onClick={() => scrollToSection('objections')}
        >
          Objections
        </button>

        <button
          className={activeSection === 'followup' ? 'active' : ''}
          onClick={() => scrollToSection('followup')}
        >
          Follow-Up
        </button>

        <button
          className={activeSection === 'crm' ? 'active' : ''}
          onClick={() => scrollToSection('crm')}
        >
          CRM
        </button>
      </div>

      <main className="proposal-content">
        {/* PROCESS */}
        <section id="process" className="proposal-section">
          <div className="proposal-heading">
            <span>01</span>

            <div>
              <h2>Proposal Process</h2>
              <p>
                The proposal should be the natural next step after discovery and
                solution presentation.
              </p>
            </div>
          </div>

          <div className="proposal-process-grid">
            {proposalSteps.map((step) => {
              const Icon = step.icon

              return (
                <article className="proposal-process-card" key={step.number}>
                  <div className="proposal-process-top">
                    <span>{step.number}</span>
                    <Icon size={19} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>

          <div className="proposal-rule">
            <div className="proposal-rule-icon">
              <Target size={22} />
            </div>

            <div>
              <span>IMPORTANT</span>

              <h3>
                Don't create a proposal before you understand the project.
              </h3>

              <p>
                A proposal is not a substitute for discovery. If important
                information is missing, go back and ask questions before pricing
                the project.
              </p>
            </div>
          </div>
        </section>

        {/* PROPOSAL */}
        <section id="proposal" className="proposal-section">
          <div className="proposal-heading">
            <span>02</span>

            <div>
              <h2>What Goes Inside the Proposal?</h2>
              <p>
                Every proposal should clearly explain what the client is getting
                and why it matters.
              </p>
            </div>
          </div>

          <div className="proposal-sections-grid">
            {proposalSections.map((section, index) => (
              <article className="proposal-section-card" key={section.title}>
                <div className="proposal-section-number">0{index + 1}</div>

                <h3>{section.title}</h3>

                <p>{section.description}</p>

                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="proposal-writing-box">
            <FileText size={22} />

            <div>
              <span>WRITING RULE</span>

              <h3>
                Write the proposal around the client's business, not around your
                company.
              </h3>

              <p>
                The client should be able to quickly understand their problem,
                your recommendation, what they will receive, how long it will
                take, and what it will cost.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="proposal-section">
          <div className="proposal-heading">
            <span>03</span>

            <div>
              <h2>Pricing Structure</h2>
              <p>
                Use pricing to match different levels of client needs rather
                than creating random discounts.
              </p>
            </div>
          </div>

          <div className="pricing-grid">
            {packages.map((pkg, index) => (
              <article
                className={`pricing-card ${
                  index === 1 ? 'pricing-popular' : ''
                }`}
                key={pkg.name}
              >
                {index === 1 && (
                  <div className="popular-badge">RECOMMENDED</div>
                )}

                <div className="pricing-top">
                  <span>{pkg.label}</span>

                  <DollarSign size={20} />
                </div>

                <h3>{pkg.name}</h3>

                <p>{pkg.description}</p>

                <div className="pricing-divider" />

                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pricing-note">
                  Price based on actual project scope.
                </div>
              </article>
            ))}
          </div>

          <div className="pricing-rule">
            <TrendingUp size={22} />

            <div>
              <strong>Don't sell features just to increase the price.</strong>

              <p>
                The higher package should exist because it solves additional
                business needs or provides additional value—not simply because
                it has a higher price.
              </p>
            </div>
          </div>
        </section>

        {/* PAYMENT */}
        <section id="payment" className="proposal-section">
          <div className="proposal-heading">
            <span>04</span>

            <div>
              <h2>Payment Structure</h2>
              <p>Keep payment terms clear before the project begins.</p>
            </div>
          </div>

          <div className="payment-layout">
            <div className="payment-example">
              <div className="payment-example-header">
                <div>
                  <span>EXAMPLE PROJECT</span>
                  <h3>$3,000 Project</h3>
                </div>

                <CreditCard size={22} />
              </div>

              <div className="payment-step">
                <div>
                  <strong>50%</strong>
                  <span>Project Start</span>
                </div>

                <b>$1,500</b>
              </div>

              <div className="payment-step">
                <div>
                  <strong>25%</strong>
                  <span>Development Milestone</span>
                </div>

                <b>$750</b>
              </div>

              <div className="payment-step">
                <div>
                  <strong>25%</strong>
                  <span>Final Delivery</span>
                </div>

                <b>$750</b>
              </div>

              <div className="payment-total">
                <span>Total</span>
                <strong>$3,000</strong>
              </div>
            </div>

            <div className="payment-info">
              <article>
                <Clock size={20} />

                <div>
                  <h3>Define the Timeline</h3>
                  <p>
                    Clearly explain when work starts, important milestones,
                    client approvals, and expected completion.
                  </p>
                </div>
              </article>

              <article>
                <ShieldCheck size={20} />

                <div>
                  <h3>Protect the Scope</h3>
                  <p>
                    Explain what is included and how additional requests outside
                    the agreed scope will be handled.
                  </p>
                </div>
              </article>

              <article>
                <Handshake size={20} />

                <div>
                  <h3>Set Expectations</h3>
                  <p>
                    Make sure both sides understand responsibilities, payments,
                    communication, revisions, and delivery.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* OBJECTIONS */}
        <section id="objections" className="proposal-section">
          <div className="proposal-heading">
            <span>05</span>

            <div>
              <h2>Price Objections</h2>
              <p>Never panic when a client questions the investment.</p>
            </div>
          </div>

          <div className="pricing-objections">
            {objections.map((item) => (
              <article className="pricing-objection-card" key={item.title}>
                <div className="pricing-objection-title">
                  <AlertTriangle size={17} />
                  <h3>{item.title}</h3>
                </div>

                <div className="dont-say">
                  <span>DON'T SAY</span>
                  <p>{item.bad}</p>
                </div>

                <div className="instead-say">
                  <span>INSTEAD</span>
                  <p>{item.good}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="discount-rule">
            <DollarSign size={23} />

            <div>
              <span>DISCOUNT RULE</span>

              <h3>Never discount before understanding the objection.</h3>

              <p>
                If the client says the price is too high, find out whether they
                mean the total budget, the scope, the timing, or the value they
                perceive.
              </p>
            </div>
          </div>
        </section>

        {/* FOLLOW UP */}
        <section id="followup" className="proposal-section">
          <div className="proposal-heading">
            <span>06</span>

            <div>
              <h2>Proposal Follow-Up</h2>
              <p>Sending the proposal is not the end of the sales process.</p>
            </div>
          </div>

          <div className="followup-grid">
            {followUpSteps.map((step) => {
              const Icon = step.icon

              return (
                <article className="followup-card" key={step.day}>
                  <div className="followup-day">{step.day}</div>

                  <div className="followup-icon">
                    <Icon size={19} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>

          <div className="followup-script">
            <MessageSquare size={21} />

            <div>
              <span>SIMPLE FOLLOW-UP</span>

              <p>
                "Hi [Name], I wanted to follow up on the proposal we sent over.
                I wanted to see if you had any questions or if there is anything
                you'd like us to clarify."
              </p>
            </div>
          </div>
        </section>

        {/* CRM */}
        <section id="crm" className="proposal-section">
          <div className="proposal-heading">
            <span>07</span>

            <div>
              <h2>Update the CRM</h2>
              <p>Every proposal should have a clear status inside the CRM.</p>
            </div>
          </div>

          <div className="status-grid">
            {proposalStatuses.map((status) => {
              const Icon = status.icon

              return (
                <article
                  className={`status-card ${
                    status.title === 'Accepted'
                      ? 'status-success'
                      : status.title === 'Rejected'
                        ? 'status-danger'
                        : ''
                  }`}
                  key={status.title}
                >
                  <Icon size={19} />

                  <span>{status.title}</span>
                </article>
              )
            })}
          </div>

          <div className="crm-checklist">
            <div className="crm-checklist-icon">
              <ClipboardList size={23} />
            </div>

            <div>
              <span>CRM CHECKLIST</span>

              <h3>Before moving the opportunity forward, record:</h3>

              <div className="crm-check-grid">
                <div>
                  <CheckCircle2 size={14} />
                  <span>Proposal amount</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Scope</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Timeline</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Payment terms</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Decision maker</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Next follow-up</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Client objections</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Probability of closing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="closing-rule">
            <div className="closing-rule-icon">
              <Handshake size={24} />
            </div>

            <div>
              <span>THE GOAL</span>

              <h3>
                Don't focus on getting the proposal accepted. Focus on helping
                the client make a confident decision.
              </h3>

              <p>
                If the client understands the problem, understands the solution,
                understands the investment, and knows the next step, the sales
                process becomes much easier.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProposalGuide
