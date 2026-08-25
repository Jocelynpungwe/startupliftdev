import React, { useState } from 'react'
import {
  Search,
  MessageCircleQuestion,
  Target,
  CircleDollarSign,
  Clock3,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react'

import './css/discoveryGuide.css'

const discoverySteps = [
  {
    number: '01',
    title: 'Transition',
    icon: MessageCircleQuestion,
    text: 'Move naturally from the initial outreach into a deeper conversation.',
  },
  {
    number: '02',
    title: 'Understand',
    icon: Search,
    text: 'Understand how the business currently handles the problem.',
  },
  {
    number: '03',
    title: 'Identify Pain',
    icon: AlertTriangle,
    text: 'Find out what is not working and why it matters.',
  },
  {
    number: '04',
    title: 'Discover Goals',
    icon: Target,
    text: 'Understand what the prospect wants to accomplish.',
  },
  {
    number: '05',
    title: 'Qualify',
    icon: ClipboardCheck,
    text: 'Determine whether the opportunity is a good fit.',
  },
  {
    number: '06',
    title: 'Determine Timeline',
    icon: Clock3,
    text: 'Understand when they want the problem solved.',
  },
  {
    number: '07',
    title: 'Understand Decision',
    icon: Users,
    text: 'Find out who is involved in making the decision.',
  },
  {
    number: '08',
    title: 'Agree on Next Step',
    icon: ArrowRight,
    text: 'End the conversation with a clear action.',
  },
]

const questionGroups = [
  {
    title: 'Current Situation',
    icon: Search,
    color: 'blue',
    questions: [
      'How are you currently handling this?',
      'What are you currently using?',
      'How are customers currently finding or contacting you?',
      'How long have you been using your current system?',
      'What is working well with your current setup?',
    ],
  },
  {
    title: 'Problem & Pain',
    icon: AlertTriangle,
    color: 'red',
    questions: [
      'What is the biggest problem with the current setup?',
      'What would you like to improve?',
      'How often does this problem happen?',
      'How is this affecting the business?',
      'What happens if nothing changes?',
    ],
  },
  {
    title: 'Goals',
    icon: Target,
    color: 'green',
    questions: [
      'What would you like to accomplish?',
      'What would a successful solution look like?',
      'What would you want customers to be able to do?',
      'What would you like to see improve?',
      'How would you measure success?',
    ],
  },
  {
    title: 'Timeline',
    icon: Clock3,
    color: 'purple',
    questions: [
      'When would you ideally like this completed?',
      'Is there a specific event or deadline driving the project?',
      'How important is it to solve this right now?',
      'Are you currently considering other options?',
    ],
  },
  {
    title: 'Budget',
    icon: CircleDollarSign,
    color: 'yellow',
    questions: [
      'Have you set aside a budget for this project?',
      'Have you worked with a company on something similar before?',
      'Do you have a budget range you are comfortable working within?',
    ],
  },
  {
    title: 'Decision Process',
    icon: Users,
    color: 'cyan',
    questions: [
      'Who else would be involved in the decision?',
      'Would anyone else need to approve the project?',
      'What is your usual process for selecting a service provider?',
      'What would you need to see before making a decision?',
    ],
  },
]

const qualificationCards = [
  {
    title: 'Problem',
    good: 'They have a real problem that your services can solve.',
    bad: 'They are only curious and have no actual need.',
  },
  {
    title: 'Urgency',
    good: 'They have a reason to solve the problem within a reasonable timeframe.',
    bad: 'There is no timeline or reason to act.',
  },
  {
    title: 'Budget',
    good: 'They have or can realistically allocate money for the solution.',
    bad: 'They have no budget and are only looking for free work.',
  },
  {
    title: 'Fit',
    good: 'The project matches StartupLift Dev capabilities.',
    bad: 'The requested work is outside your services or capacity.',
  },
  {
    title: 'Decision Maker',
    good: 'You are speaking with the person who can approve the project or can introduce you to them.',
    bad: 'The contact cannot influence the decision and there is no path to the decision maker.',
  },
]

const discoveryScript = [
  {
    number: '01',
    title: 'Transition',
    text: `"That's helpful. I'd like to understand a little more about how you're currently handling this."`,
  },
  {
    number: '02',
    title: 'Current Situation',
    text: `"Can you walk me through how you currently handle [problem]?"`,
  },
  {
    number: '03',
    title: 'Identify the Problem',
    text: `"What's the biggest challenge you're experiencing with that right now?"`,
  },
  {
    number: '04',
    title: 'Explore Impact',
    text: `"How is that affecting the business or your customers?"`,
  },
  {
    number: '05',
    title: 'Understand the Goal',
    text: `"If we were to solve this successfully, what would you want the result to look like?"`,
  },
  {
    number: '06',
    title: 'Timeline',
    text: `"When would you ideally like to have this solved?"`,
  },
  {
    number: '07',
    title: 'Decision Process',
    text: `"Besides yourself, is there anyone else who would be involved in deciding on this?"`,
  },
  {
    number: '08',
    title: 'Budget',
    text: `"Have you already set aside a budget for this, or are you still figuring out what the investment would look like?"`,
  },
  {
    number: '09',
    title: 'Summarize',
    text: `"So, if I understand correctly, you're currently [situation], the main issue is [problem], and you'd like to achieve [goal]. Is that right?"`,
  },
  {
    number: '10',
    title: 'Next Step',
    text: `"Based on what you've told me, I think the next step would be for us to put together some options around [solution]. Would that make sense?"`,
  },
]

function DiscoveryGuide() {
  const [activeSection, setActiveSection] = useState('process')

  const scrollToSection = (id) => {
    setActiveSection(id)

    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="discovery-guide">
      {/* HERO */}
      <section className="discovery-hero">
        <div className="discovery-glow glow-one"></div>
        <div className="discovery-glow glow-two"></div>

        <div className="discovery-hero-content">
          <span className="discovery-badge">SALES DEPARTMENT • STEP 4</span>

          <div className="hero-icon">
            <Search size={28} />
          </div>

          <h1>
            Discovery & <span>Need Analysis</span>
          </h1>

          <p>
            Learn how to understand the prospect before recommending a solution.
            Ask better questions, identify the real problem, qualify the
            opportunity, and determine the right next step.
          </p>

          <div className="discovery-flow">
            <span>Ask</span>
            <ArrowRight size={15} />
            <span>Listen</span>
            <ArrowRight size={15} />
            <span>Understand</span>
            <ArrowRight size={15} />
            <span>Qualify</span>
            <ArrowRight size={15} />
            <span>Recommend</span>
          </div>
        </div>
      </section>

      {/* NAV */}
      <div className="discovery-nav">
        <button
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => scrollToSection('process')}
        >
          Process
        </button>

        <button
          className={activeSection === 'questions' ? 'active' : ''}
          onClick={() => scrollToSection('questions')}
        >
          Questions
        </button>

        <button
          className={activeSection === 'real-problem' ? 'active' : ''}
          onClick={() => scrollToSection('real-problem')}
        >
          Find the Real Problem
        </button>

        <button
          className={activeSection === 'qualify' ? 'active' : ''}
          onClick={() => scrollToSection('qualify')}
        >
          Qualify
        </button>

        <button
          className={activeSection === 'script' ? 'active' : ''}
          onClick={() => scrollToSection('script')}
        >
          Script
        </button>

        <button
          className={activeSection === 'crm' ? 'active' : ''}
          onClick={() => scrollToSection('crm')}
        >
          CRM
        </button>
      </div>

      <main className="discovery-content">
        {/* PROCESS */}
        <section id="process" className="discovery-section">
          <div className="discovery-heading">
            <span>01</span>

            <div>
              <h2>The Discovery Process</h2>
              <p>Discovery is about understanding before recommending.</p>
            </div>
          </div>

          <div className="discovery-process-grid">
            {discoverySteps.map((step) => {
              const Icon = step.icon

              return (
                <article className="discovery-process-card" key={step.number}>
                  <div className="discovery-process-top">
                    <span>{step.number}</span>
                    <Icon size={19} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>

          <div className="discovery-principle">
            <div className="principle-icon">
              <MessageCircleQuestion size={24} />
            </div>

            <div>
              <span>CORE PRINCIPLE</span>

              <h3>
                Don't diagnose the prospect before you understand their
                situation.
              </h3>

              <p>
                Your job during discovery is to ask questions, listen carefully,
                and understand what the business actually needs.
              </p>
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section id="questions" className="discovery-section">
          <div className="discovery-heading">
            <span>02</span>

            <div>
              <h2>Discovery Questions</h2>
              <p>
                You don't need to ask every question. Choose the questions that
                fit the conversation.
              </p>
            </div>
          </div>

          <div className="question-grid">
            {questionGroups.map((group) => {
              const Icon = group.icon

              return (
                <article
                  className={`question-card ${group.color}`}
                  key={group.title}
                >
                  <div className="question-card-header">
                    <div className="question-icon">
                      <Icon size={20} />
                    </div>

                    <h3>{group.title}</h3>
                  </div>

                  <div className="question-list">
                    {group.questions.map((question, index) => (
                      <div className="question-item" key={index}>
                        <CheckCircle2 size={15} />
                        <span>{question}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* REAL PROBLEM */}
        <section id="real-problem" className="discovery-section">
          <div className="discovery-heading">
            <span>03</span>

            <div>
              <h2>Find the Real Problem</h2>
              <p>
                The first problem a prospect gives you may not be the real
                problem.
              </p>
            </div>
          </div>

          <div className="problem-discovery-layout">
            <div className="problem-chain">
              <div className="chain-card">
                <span>PROSPECT SAYS</span>

                <h3>"We need a new website."</h3>
              </div>

              <ArrowRight className="chain-arrow" size={22} />

              <div className="chain-card">
                <span>ASK</span>

                <h3>
                  "What would you like the new website to do differently?"
                </h3>
              </div>

              <ArrowRight className="chain-arrow" size={22} />

              <div className="chain-card result">
                <span>REAL NEED</span>

                <h3>"We need more people to request quotes."</h3>
              </div>
            </div>

            <div className="real-problem-card">
              <span>WHY THIS MATTERS</span>

              <h3>
                Don't sell the requested product.
                <br />
                Understand the desired outcome.
              </h3>

              <p>
                The prospect may ask for a website, SEO, an app, advertising, or
                another service. Your job is to understand <strong>why</strong>{' '}
                they want it.
              </p>
            </div>
          </div>

          <div className="five-whys">
            <div className="five-whys-title">
              <span>USE FOLLOW-UP QUESTIONS</span>

              <h3>
                Keep asking "why" until you understand the business impact.
              </h3>
            </div>

            <div className="why-chain">
              <div>
                <strong>1</strong>
                <p>We need a new website.</p>
              </div>

              <div>
                <strong>2</strong>
                <p>Why?</p>
              </div>

              <div>
                <strong>3</strong>
                <p>Our current website doesn't generate many inquiries.</p>
              </div>

              <div>
                <strong>4</strong>
                <p>Why is that important?</p>
              </div>

              <div>
                <strong>5</strong>
                <p>We want to increase the number of new customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUALIFICATION */}
        <section id="qualify" className="discovery-section">
          <div className="discovery-heading">
            <span>04</span>

            <div>
              <h2>Qualify the Opportunity</h2>
              <p>
                Interest does not automatically mean the prospect is a good
                opportunity.
              </p>
            </div>
          </div>

          <div className="qualification-intro">
            <div className="qualification-score">
              <span>GOOD OPPORTUNITY</span>

              <strong>Problem + Need + Fit + Timeline + Decision</strong>
            </div>

            <p>
              A qualified opportunity is one where there is a real problem, a
              reasonable path to solving it, and a realistic opportunity for
              StartupLift Dev to help.
            </p>
          </div>

          <div className="qualification-grid">
            {qualificationCards.map((item, index) => (
              <article className="qualification-card" key={item.title}>
                <div className="qualification-number">0{index + 1}</div>

                <h3>{item.title}</h3>

                <div className="qualification-good">
                  <CheckCircle2 size={15} />
                  <p>{item.good}</p>
                </div>

                <div className="qualification-bad">
                  <AlertTriangle size={15} />
                  <p>{item.bad}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SCRIPT */}
        <section id="script" className="discovery-section">
          <div className="discovery-heading">
            <span>05</span>

            <div>
              <h2>Discovery Call Script</h2>
              <p>
                Use this as a framework. The conversation should feel natural.
              </p>
            </div>
          </div>

          <div className="discovery-script">
            <div className="script-top">
              <div>
                <span>STARTUPLIFT DEV</span>
                <h3>Discovery Conversation</h3>
              </div>

              <div className="script-label">NEED ANALYSIS</div>
            </div>

            <div className="script-body">
              {discoveryScript.map((step) => (
                <div className="discovery-script-step" key={step.number}>
                  <div className="script-number">{step.number}</div>

                  <div>
                    <h4>{step.title}</h4>

                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRM */}
        <section id="crm" className="discovery-section">
          <div className="discovery-heading">
            <span>06</span>

            <div>
              <h2>What Should Go Into the CRM?</h2>
              <p>
                The salesperson should record the important information
                immediately after discovery.
              </p>
            </div>
          </div>

          <div className="crm-discovery-grid">
            <div className="crm-field">
              <span>01</span>
              <h3>Current Situation</h3>
              <p>How are they currently handling the problem?</p>
            </div>

            <div className="crm-field">
              <span>02</span>
              <h3>Primary Problem</h3>
              <p>What is the main problem they want solved?</p>
            </div>

            <div className="crm-field">
              <span>03</span>
              <h3>Business Impact</h3>
              <p>How is the problem affecting the business?</p>
            </div>

            <div className="crm-field">
              <span>04</span>
              <h3>Desired Outcome</h3>
              <p>What does success look like for them?</p>
            </div>

            <div className="crm-field">
              <span>05</span>
              <h3>Services Needed</h3>
              <p>What type of solution might address the need?</p>
            </div>

            <div className="crm-field">
              <span>06</span>
              <h3>Budget</h3>
              <p>Is there an identified or estimated budget?</p>
            </div>

            <div className="crm-field">
              <span>07</span>
              <h3>Timeline</h3>
              <p>When do they want to move forward?</p>
            </div>

            <div className="crm-field">
              <span>08</span>
              <h3>Decision Maker</h3>
              <p>Who needs to approve the project?</p>
            </div>

            <div className="crm-field">
              <span>09</span>
              <h3>Lead Quality</h3>
              <p>Is this a strong, medium, weak, or unqualified opportunity?</p>
            </div>

            <div className="crm-field next-step">
              <span>10</span>
              <h3>Next Step</h3>
              <p>What exactly happens after this conversation?</p>
            </div>
          </div>

          <div className="discovery-checklist">
            <div className="checklist-icon">
              <ClipboardCheck size={25} />
            </div>

            <div>
              <span>BEFORE ENDING THE DISCOVERY</span>

              <h3>Can you clearly answer these five questions?</h3>

              <ul>
                <li>What problem are they trying to solve?</li>
                <li>Why does the problem matter?</li>
                <li>What outcome do they want?</li>
                <li>When do they want it solved?</li>
                <li>What is the agreed next step?</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DiscoveryGuide
