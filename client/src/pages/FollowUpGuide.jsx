import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Handshake,
  ArrowRight,
  CalendarDays,
  Target,
  RefreshCw,
  UserCheck,
  FileCheck2,
  Send,
  PhoneCall,
  ClipboardList,
  ShieldCheck,
  Ban,
  CircleDollarSign,
  UserX,
} from 'lucide-react'

import './css/followUpGuide.css'

const followUpStages = [
  {
    day: 'DAY 0',
    title: 'Proposal Sent',
    icon: Send,
    channel: 'Email',
    description:
      'Confirm the proposal was received and explain what the client should review.',
  },
  {
    day: 'DAY 1–2',
    title: 'First Check-In',
    icon: Mail,
    channel: 'Email',
    description:
      'Ask whether they had a chance to review the proposal and whether anything is unclear.',
  },
  {
    day: 'DAY 4–5',
    title: 'Personal Follow-Up',
    icon: PhoneCall,
    channel: 'Call',
    description:
      'Use a call when the opportunity is important or the client has not responded.',
  },
  {
    day: 'DAY 7',
    title: 'Decision Follow-Up',
    icon: MessageSquare,
    channel: 'Email / Text',
    description:
      'Ask whether they have questions, concerns, or are ready to discuss the next step.',
  },
  {
    day: 'DAY 10–14',
    title: 'Final Check-In',
    icon: CalendarDays,
    channel: 'Email',
    description:
      'Give the client space while making it easy for them to restart the conversation.',
  },
]

const channelRules = [
  {
    title: 'Call',
    icon: Phone,
    color: 'blue',
    useWhen: [
      'The opportunity has high value',
      'The client has an important objection',
      'You need clarification quickly',
      'The client has shown strong buying interest',
      'You need to discuss the final decision',
    ],
  },
  {
    title: 'Email',
    icon: Mail,
    color: 'purple',
    useWhen: [
      'Sending the proposal',
      'Providing detailed information',
      'Following up after a meeting',
      'Documenting important information',
      'The client prefers email',
    ],
  },
  {
    title: 'Text',
    icon: MessageSquare,
    color: 'green',
    useWhen: [
      'The client already communicates by text',
      'A quick reminder is appropriate',
      'You need to confirm a meeting',
      'You need a short response',
      'The client has given permission to text',
    ],
  },
]

const objections = [
  {
    title: '“I need to think about it.”',
    icon: Clock,
    dontSay: 'Okay, no problem. Just let me know whenever you decide.',
    insteadSay:
      'Absolutely. Is there anything specific you are still considering, such as the investment, scope, or timing?',
    goal: 'Find out what is actually preventing the client from making a decision.',
  },
  {
    title: '“The price is too high.”',
    icon: CircleDollarSign,
    dontSay: 'We can give you a discount.',
    insteadSay:
      'I understand. Which part of the investment feels outside what you were expecting?',
    goal: 'Understand whether the issue is budget, scope, value, or comparison.',
  },
  {
    title: '“We are not ready yet.”',
    icon: CalendarDays,
    dontSay: 'Okay, call us when you are ready.',
    insteadSay:
      'That makes sense. What would need to happen before this becomes a priority for you?',
    goal: 'Discover the actual timing and create a future follow-up opportunity.',
  },
  {
    title: '“We are talking to other companies.”',
    icon: UserCheck,
    dontSay: 'We are better than them.',
    insteadSay:
      'That makes sense. When you compare the options, what are the most important things you are looking for?',
    goal: "Understand the client's decision criteria without attacking competitors.",
  },
]

const closingMethods = [
  {
    title: 'Direct Close',
    icon: Handshake,
    text: 'Use when the client has clearly expressed interest and the remaining questions have been answered.',
    script:
      '“It sounds like the solution meets what you are looking for. Would you like us to move forward with the project?”',
  },
  {
    title: 'Next-Step Close',
    icon: ArrowRight,
    text: 'Use when the client is interested but needs a clear action to move forward.',
    script:
      '“The next step would be to finalize the agreement and schedule the project kickoff. Would you like us to prepare that for you?”',
  },
  {
    title: 'Choice Close',
    icon: Target,
    text: 'Use when the client has agreed to move forward but needs to choose between options.',
    script:
      '“Would you prefer to start with the Growth package or the Premium package?”',
  },
  {
    title: 'Timeline Close',
    icon: CalendarDays,
    text: 'Use when timing is an important part of the decision.',
    script:
      '“If you would like the project completed by that date, we would recommend getting started around [date]. Would that work for you?”',
  },
]

const ghostingSteps = [
  {
    number: '01',
    title: 'First Reminder',
    timing: 'Day 1–2',
    icon: Mail,
    text: 'Keep it simple. Confirm they received the proposal and offer to answer questions.',
  },
  {
    number: '02',
    title: 'Personal Contact',
    timing: 'Day 4–5',
    icon: PhoneCall,
    text: 'Call if appropriate. Your goal is to understand whether there is a concern or simply a delay.',
  },
  {
    number: '03',
    title: 'Value Follow-Up',
    timing: 'Day 7',
    icon: MessageSquare,
    text: 'Connect the follow-up back to the business problem you discussed.',
  },
  {
    number: '04',
    title: 'Final Check-In',
    timing: 'Day 10–14',
    icon: RefreshCw,
    text: 'Give the client an easy way to tell you whether the project is still a priority.',
  },
  {
    number: '05',
    title: 'Nurture',
    timing: 'After',
    icon: CalendarDays,
    text: 'If the timing is not right, set a future follow-up instead of repeatedly contacting them.',
  },
]

const crmStatuses = [
  {
    title: 'Follow-Up Required',
    icon: Clock,
  },
  {
    title: 'Waiting for Client',
    icon: UserX,
  },
  {
    title: 'Negotiation',
    icon: MessageSquare,
  },
  {
    title: 'Verbal Agreement',
    icon: Handshake,
  },
  {
    title: 'Contract Sent',
    icon: FileCheck2,
  },
  {
    title: 'Won',
    icon: CheckCircle2,
  },
  {
    title: 'Lost',
    icon: XCircle,
  },
  {
    title: 'Nurture',
    icon: RefreshCw,
  },
]

function FollowUpGuide() {
  const [activeSection, setActiveSection] = useState('process')

  const scrollToSection = (id) => {
    setActiveSection(id)

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="followup-guide">
      {/* HERO */}
      <section className="followup-hero">
        <div className="followup-glow followup-glow-one" />
        <div className="followup-glow followup-glow-two" />

        <div className="followup-hero-content">
          <span className="followup-badge">SALES DEPARTMENT • STEP 7</span>

          <div className="followup-hero-icon">
            <RefreshCw size={29} />
          </div>

          <h1>
            Follow-Up <span>& Closing</span>
          </h1>

          <p>
            Learn how to follow up professionally, choose the right
            communication channel, handle objections, prevent leads from going
            cold, and confidently move qualified prospects toward a decision.
          </p>

          <div className="followup-flow">
            <span>Proposal</span>
            <ArrowRight size={15} />
            <span>Follow-Up</span>
            <ArrowRight size={15} />
            <span>Objection</span>
            <ArrowRight size={15} />
            <span>Decision</span>
            <ArrowRight size={15} />
            <span>Close</span>
          </div>
        </div>
      </section>

      {/* NAV */}
      <div className="followup-nav">
        <button
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => scrollToSection('process')}
        >
          Process
        </button>

        <button
          className={activeSection === 'channels' ? 'active' : ''}
          onClick={() => scrollToSection('channels')}
        >
          Channels
        </button>

        <button
          className={activeSection === 'scripts' ? 'active' : ''}
          onClick={() => scrollToSection('scripts')}
        >
          Scripts
        </button>

        <button
          className={activeSection === 'objections' ? 'active' : ''}
          onClick={() => scrollToSection('objections')}
        >
          Objections
        </button>

        <button
          className={activeSection === 'ghosting' ? 'active' : ''}
          onClick={() => scrollToSection('ghosting')}
        >
          No Response
        </button>

        <button
          className={activeSection === 'closing' ? 'active' : ''}
          onClick={() => scrollToSection('closing')}
        >
          Closing
        </button>

        <button
          className={activeSection === 'crm' ? 'active' : ''}
          onClick={() => scrollToSection('crm')}
        >
          CRM
        </button>
      </div>

      <main className="followup-content">
        {/* PROCESS */}
        <section id="process" className="followup-section">
          <div className="followup-heading">
            <span>01</span>

            <div>
              <h2>Follow-Up Process</h2>

              <p>
                Following up is not about repeatedly asking whether the client
                has decided. Every contact should have a reason.
              </p>
            </div>
          </div>

          <div className="followup-timeline">
            {followUpStages.map((stage, index) => {
              const Icon = stage.icon

              return (
                <article className="followup-timeline-card" key={stage.day}>
                  <div className="timeline-number">0{index + 1}</div>

                  <div className="timeline-icon">
                    <Icon size={18} />
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-meta">
                      <span>{stage.day}</span>
                      <b>{stage.channel}</b>
                    </div>

                    <h3>{stage.title}</h3>

                    <p>{stage.description}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="followup-important">
            <div className="followup-important-icon">
              <Target size={22} />
            </div>

            <div>
              <span>CORE RULE</span>

              <h3>Every follow-up should move the conversation forward.</h3>

              <p>
                Don't contact a client simply because a certain number of days
                has passed. Have a reason for contacting them: answer a
                question, clarify something, confirm timing, address an
                objection, or establish the next step.
              </p>
            </div>
          </div>
        </section>

        {/* CHANNELS */}
        <section id="channels" className="followup-section">
          <div className="followup-heading">
            <span>02</span>

            <div>
              <h2>Which Channel Should You Use?</h2>

              <p>
                The best channel depends on the situation, urgency,
                relationship, and client's communication preference.
              </p>
            </div>
          </div>

          <div className="channel-grid">
            {channelRules.map((channel) => {
              const Icon = channel.icon

              return (
                <article
                  className={`channel-card channel-${channel.color}`}
                  key={channel.title}
                >
                  <div className="channel-card-top">
                    <div className="channel-icon">
                      <Icon size={21} />
                    </div>

                    <h3>{channel.title}</h3>
                  </div>

                  <span className="channel-label">USE WHEN</span>

                  <ul>
                    {channel.useWhen.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>

          <div className="channel-rule">
            <PhoneCall size={21} />

            <div>
              <strong>For high-value opportunities:</strong>

              <p>
                Don't hide behind email. When appropriate, use a phone call to
                have a real conversation about the client's concerns and
                decision.
              </p>
            </div>
          </div>
        </section>

        {/* SCRIPTS */}
        <section id="scripts" className="followup-section">
          <div className="followup-heading">
            <span>03</span>

            <div>
              <h2>Follow-Up Scripts</h2>

              <p>
                Scripts are frameworks. Salespeople should sound natural rather
                than reading every word mechanically.
              </p>
            </div>
          </div>

          <div className="script-grid">
            <article className="script-card">
              <div className="script-card-header">
                <Mail size={19} />

                <div>
                  <span>EMAIL</span>
                  <h3>After Sending the Proposal</h3>
                </div>
              </div>

              <div className="script-example">
                <p>Hi [Name],</p>

                <p>
                  I wanted to make sure you received the proposal we discussed
                  regarding [project/problem].
                </p>

                <p>
                  It outlines the recommended solution, scope, timeline, and
                  investment. If you have any questions while reviewing it, I'd
                  be happy to walk through anything with you.
                </p>

                <p>
                  Best,
                  <br />
                  [Salesperson]
                </p>
              </div>
            </article>

            <article className="script-card">
              <div className="script-card-header">
                <Phone size={19} />

                <div>
                  <span>CALL</span>
                  <h3>Proposal Follow-Up</h3>
                </div>
              </div>

              <div className="script-example">
                <p>
                  "Hi [Name], it's [Name] from StartupLift Dev. I wanted to
                  follow up on the proposal we discussed."
                </p>

                <p>
                  "I was wondering if you had a chance to review everything and
                  whether there was anything you'd like me to clarify."
                </p>

                <p>
                  "Is there anything that is currently holding you back from
                  moving forward?"
                </p>
              </div>
            </article>

            <article className="script-card">
              <div className="script-card-header">
                <MessageSquare size={19} />

                <div>
                  <span>TEXT</span>
                  <h3>Short Check-In</h3>
                </div>
              </div>

              <div className="script-example">
                <p>
                  "Hi [Name], it's [Name] from StartupLift Dev. Just checking in
                  regarding the proposal we sent."
                </p>

                <p>
                  "Let me know if you have any questions or if there's anything
                  you'd like us to go over."
                </p>
              </div>
            </article>
          </div>

          <div className="script-warning">
            <AlertTriangle size={20} />

            <div>
              <span>AVOID THIS</span>

              <h3>"Just following up..."</h3>

              <p>
                This gives the client no reason to respond. Instead, connect the
                message to their problem, proposal, question, timeline, or next
                step.
              </p>
            </div>
          </div>
        </section>

        {/* OBJECTIONS */}
        <section id="objections" className="followup-section">
          <div className="followup-heading">
            <span>04</span>

            <div>
              <h2>Handling Objections</h2>

              <p>
                An objection is not automatically a rejection. Find out what is
                actually preventing the decision.
              </p>
            </div>
          </div>

          <div className="objection-grid">
            {objections.map((objection) => {
              const Icon = objection.icon

              return (
                <article className="objection-card" key={objection.title}>
                  <div className="objection-title">
                    <Icon size={18} />

                    <h3>{objection.title}</h3>
                  </div>

                  <div className="objection-block objection-dont">
                    <span>DON'T SAY</span>
                    <p>{objection.dontSay}</p>
                  </div>

                  <div className="objection-block objection-instead">
                    <span>INSTEAD SAY</span>
                    <p>{objection.insteadSay}</p>
                  </div>

                  <div className="objection-goal">
                    <strong>GOAL</strong>
                    <p>{objection.goal}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="objection-rule">
            <ShieldCheck size={22} />

            <div>
              <span>SALES RULE</span>

              <h3>Don't argue with an objection. Investigate it.</h3>

              <p>
                Ask questions before offering solutions. A salesperson cannot
                properly solve an objection they don't understand.
              </p>
            </div>
          </div>
        </section>

        {/* GHOSTING */}
        <section id="ghosting" className="followup-section">
          <div className="followup-heading">
            <span>05</span>

            <div>
              <h2>When the Client Stops Responding</h2>

              <p>
                Don't chase the client endlessly. Use a structured follow-up
                sequence and then move the opportunity into nurture.
              </p>
            </div>
          </div>

          <div className="ghosting-grid">
            {ghostingSteps.map((step) => {
              const Icon = step.icon

              return (
                <article className="ghosting-card" key={step.number}>
                  <div className="ghosting-top">
                    <span>{step.number}</span>

                    <Icon size={18} />
                  </div>

                  <small>{step.timing}</small>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>

          <div className="final-email">
            <div className="final-email-icon">
              <Mail size={21} />
            </div>

            <div>
              <span>FINAL CHECK-IN EXAMPLE</span>

              <p>
                "Hi [Name], I haven't heard back, so I don't want to keep
                filling your inbox. I'll close this opportunity for now. If
                improving [specific business problem] becomes a priority again,
                feel free to reach out and we can pick things back up."
              </p>
            </div>
          </div>

          <div className="ghosting-rule">
            <Ban size={20} />

            <div>
              <strong>Don't chase indefinitely.</strong>

              <p>
                A professional sales process respects the prospect's time. If
                the project is not currently a priority, move the lead into
                nurture and create a future follow-up date.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section id="closing" className="followup-section">
          <div className="followup-heading">
            <span>06</span>

            <div>
              <h2>Closing the Deal</h2>

              <p>
                Closing should feel like the natural next step after the client
                understands the problem, solution, value, and investment.
              </p>
            </div>
          </div>

          <div className="closing-grid">
            {closingMethods.map((method) => {
              const Icon = method.icon

              return (
                <article className="closing-card" key={method.title}>
                  <div className="closing-icon">
                    <Icon size={20} />
                  </div>

                  <h3>{method.title}</h3>

                  <p>{method.text}</p>

                  <div className="closing-script">
                    <span>SCRIPT</span>
                    <p>{method.script}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="closing-flow">
            <div>
              <span>01</span>
              <p>Client agrees</p>
            </div>

            <ArrowRight />

            <div>
              <span>02</span>
              <p>Contract</p>
            </div>

            <ArrowRight />

            <div>
              <span>03</span>
              <p>Initial payment</p>
            </div>

            <ArrowRight />

            <div>
              <span>04</span>
              <p>Project kickoff</p>
            </div>
          </div>

          <div className="not-ready-box">
            <Clock size={21} />

            <div>
              <span>CLIENT IS NOT READY?</span>

              <h3>Don't force the close. Find out why.</h3>

              <p>
                If timing, budget, internal approval, or another reason is
                preventing the decision, record the reason and create an
                appropriate future follow-up.
              </p>
            </div>
          </div>
        </section>

        {/* CRM */}
        <section id="crm" className="followup-section">
          <div className="followup-heading">
            <span>07</span>

            <div>
              <h2>Update the CRM</h2>

              <p>
                Every follow-up must end with an updated CRM record. The next
                salesperson should be able to understand exactly what happened.
              </p>
            </div>
          </div>

          <div className="crm-status-grid">
            {crmStatuses.map((status) => {
              const Icon = status.icon

              return (
                <article
                  className={`crm-status-card ${
                    status.title === 'Won'
                      ? 'crm-won'
                      : status.title === 'Lost'
                        ? 'crm-lost'
                        : ''
                  }`}
                  key={status.title}
                >
                  <Icon size={18} />

                  <span>{status.title}</span>
                </article>
              )
            })}
          </div>

          <div className="crm-update-box">
            <div className="crm-update-icon">
              <ClipboardList size={23} />
            </div>

            <div className="crm-update-content">
              <span>REQUIRED CRM UPDATE</span>

              <h3>After every follow-up, record the following:</h3>

              <div className="crm-update-grid">
                <div>
                  <CheckCircle2 size={14} />
                  <span>Contact date</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Contact method</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Client response</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Current objection</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Next action</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Next follow-up date</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Deal value</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Probability</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Expected close date</span>
                </div>

                <div>
                  <CheckCircle2 size={14} />
                  <span>Detailed notes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="crm-next-step">
            <div className="crm-next-icon">
              <ArrowRight size={22} />
            </div>

            <div>
              <span>NEXT SALES STAGE</span>

              <h3>The CRM should always show what happens next.</h3>

              <p>
                Never leave a lead sitting in the CRM without a next action or a
                clear final status. If the client is not ready, schedule a
                future follow-up and move the opportunity into nurture.
              </p>
            </div>
          </div>

          <div className="proposal-reminder">
            <FileCheck2 size={21} />

            <div>
              <span>CRM PIPELINE NOTE</span>

              <h3>
                Proposal-stage tracking will be added to the CRM pipeline.
              </h3>

              <p>
                The proposal stage should eventually track when a proposal is
                drafted, reviewed, sent, viewed, negotiated, accepted, or
                rejected. We'll add the actual CRM implementation after the
                sales-training steps are complete.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FollowUpGuide
