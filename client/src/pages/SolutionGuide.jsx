import React, { useState } from 'react'
import {
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Search,
  Code2,
  Megaphone,
  TrendingUp,
  Target,
  MessageSquare,
  FileText,
  CircleDollarSign,
  Users,
  Link2,
  Sparkles,
} from 'lucide-react'

import './css/solutionGuide.css'

const presentationSteps = [
  {
    number: '01',
    title: 'Review the Problem',
    icon: Target,
    text: 'Briefly confirm the problem you discovered during the conversation.',
  },
  {
    number: '02',
    title: 'Connect the Problem',
    icon: ArrowRight,
    text: 'Explain how the problem is affecting the business or customers.',
  },
  {
    number: '03',
    title: 'Present the Solution',
    icon: Lightbulb,
    text: 'Introduce only the services that address the prospect’s needs.',
  },
  {
    number: '04',
    title: 'Explain the Benefits',
    icon: TrendingUp,
    text: 'Explain what the solution will help the business accomplish.',
  },
  {
    number: '05',
    title: 'Show the Outcome',
    icon: Sparkles,
    text: 'Connect your solution to the business result they actually want.',
  },
  {
    number: '06',
    title: 'Confirm the Fit',
    icon: CheckCircle2,
    text: 'Ask whether the proposed direction makes sense to the prospect.',
  },
  {
    number: '07',
    title: 'Handle Questions',
    icon: MessageSquare,
    text: 'Listen to concerns and answer them without becoming defensive.',
  },
  {
    number: '08',
    title: 'Move to Proposal',
    icon: FileText,
    text: 'If qualified, agree on the information needed for the proposal.',
  },
]

const solutionTypes = [
  {
    title: 'Website Development',
    icon: Globe,
    problem:
      'The business has no website or the current website is not helping generate inquiries.',
    solution:
      'Build or redesign a professional, responsive website focused on the business goals and customer journey.',
    benefits: [
      'Professional online presence',
      'Better mobile experience',
      'Clear calls-to-action',
      'Better customer experience',
      'More opportunities to generate inquiries',
    ],
  },
  {
    title: 'SEO',
    icon: Search,
    problem:
      'The business has a website but is difficult to find through search engines.',
    solution:
      'Improve the website structure, content, technical SEO, and local search visibility.',
    benefits: [
      'Improve search visibility',
      'Reach customers actively searching',
      'Improve website structure',
      'Build long-term organic traffic',
      'Increase relevant website visitors',
    ],
  },
  {
    title: 'Broken Website / Link',
    icon: Link2,
    problem:
      'The business website link is not working, is returning an error, or customers are unable to access the website properly.',
    solution:
      'Identify and fix the broken website, domain, hosting, SSL, or routing issue so customers can reliably access the business online.',
    benefits: [
      'Restore access to the website',
      'Prevent customers from losing trust',
      'Reduce missed inquiries and sales opportunities',
      'Make sure important pages and links work correctly',
      'Protect the business online presence',
    ],
  },
  {
    title: 'Web Applications',
    icon: Code2,
    problem:
      'The business is relying on manual processes or disconnected systems.',
    solution:
      'Develop a custom web application that centralizes workflows, information, and business processes.',
    benefits: [
      'Reduce repetitive work',
      'Centralize business information',
      'Improve internal workflows',
      'Automate processes',
      'Create scalable systems',
    ],
  },
  {
    title: 'Digital Marketing',
    icon: Megaphone,
    problem:
      'The business has a good service but is struggling to reach enough potential customers.',
    solution:
      'Create a digital marketing strategy focused on reaching the right audience and generating qualified opportunities.',
    benefits: [
      'Reach targeted audiences',
      'Increase visibility',
      'Generate more opportunities',
      'Track marketing performance',
      'Build a repeatable marketing system',
    ],
  },
]

const problemExamples = [
  {
    problem: 'No Website',
    solution: 'Professional Business Website',
    benefit:
      'Give customers a place to learn about the business and take action.',
    outcome:
      'Stronger online presence and more opportunities to generate inquiries.',
  },
  {
    problem: 'Outdated Website',
    solution: 'Website Redesign',
    benefit:
      'Improve usability, mobile experience, credibility, and calls-to-action.',
    outcome: 'A website that better supports the customer journey.',
  },
  {
    problem: 'Poor Mobile Experience',
    solution: 'Responsive Website Optimization',
    benefit: 'Make the website easier to use on phones and tablets.',
    outcome: 'A better experience for mobile visitors.',
  },
  {
    problem: 'Poor Search Visibility',
    solution: 'SEO Strategy',
    benefit: "Improve the website's ability to appear for relevant searches.",
    outcome: 'More opportunities to reach customers searching online.',
  },
  {
    problem: 'No Online Booking',
    solution: 'Booking System',
    benefit: 'Allow customers to request or schedule appointments online.',
    outcome: 'Less friction and less manual scheduling.',
  },
  {
    problem: 'Manual Business Processes',
    solution: 'Custom Web Application',
    benefit: 'Automate repetitive tasks and centralize information.',
    outcome: 'More efficient internal operations.',
  },
]

const objectionCards = [
  {
    objection: '"Your price is too high."',
    response:
      'I understand. Before we focus only on price, can we look at what you need the solution to accomplish? That will help us determine what should actually be included and whether we can adjust the scope.',
  },
  {
    objection: '"I need to think about it."',
    response:
      'Absolutely. Is there a specific part you would like to think through — the solution, timing, investment, or something else?',
  },
  {
    objection: '"We already have a website."',
    response:
      'That makes sense. I’m not suggesting you need a new website simply because you already have one. From what you told me, the question is whether the current website is accomplishing what you need it to accomplish.',
  },
  {
    objection: '"We can do this ourselves."',
    response:
      'You certainly can. The question is whether handling it internally is the best use of your team’s time and whether you’ll achieve the result you’re looking for.',
  },
  {
    objection: '"Send me some information."',
    response:
      'Absolutely. I can send something over. To make it useful, can I ask one quick question about what you are specifically looking to improve?',
  },
]

const presentationScript = [
  {
    number: '01',
    title: 'Confirm the Problem',
    text: `"From our conversation, it sounds like the main challenge is [problem]. Is that correct?"`,
  },
  {
    number: '02',
    title: 'Explain the Impact',
    text: `"Because of that, you're currently experiencing [business impact]."`,
  },
  {
    number: '03',
    title: 'Introduce the Solution',
    text: `"What we'd recommend is [solution], specifically designed around [their goal]."`,
  },
  {
    number: '04',
    title: 'Explain the Benefit',
    text: `"The goal here isn't simply to give you [service]. It's to help you [desired outcome]."`,
  },
  {
    number: '05',
    title: 'Explain the Approach',
    text: `"We would approach this by focusing on [key components relevant to their problem]."`,
  },
  {
    number: '06',
    title: 'Confirm',
    text: `"Based on what we've discussed, does that approach sound like it would address the problem?"`,
  },
  {
    number: '07',
    title: 'Next Step',
    text: `"If so, the next step would be for us to put together a proposal outlining the scope, timeline, and investment."`,
  },
]

function SolutionGuide() {
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
    <div className="solution-guide">
      {/* HERO */}
      <section className="solution-hero">
        <div className="solution-glow solution-glow-one"></div>
        <div className="solution-glow solution-glow-two"></div>

        <div className="solution-hero-content">
          <span className="solution-badge">SALES DEPARTMENT • STEP 5</span>

          <div className="solution-hero-icon">
            <Lightbulb size={29} />
          </div>

          <h1>
            Solution <span>Presentation</span>
          </h1>

          <p>
            Learn how to connect the prospect's problem to the right StartupLift
            Dev solution, explain the value clearly, and move naturally toward a
            proposal.
          </p>

          <div className="solution-flow">
            <span>Problem</span>
            <ArrowRight size={15} />
            <span>Impact</span>
            <ArrowRight size={15} />
            <span>Solution</span>
            <ArrowRight size={15} />
            <span>Benefit</span>
            <ArrowRight size={15} />
            <span>Outcome</span>
          </div>
        </div>
      </section>

      {/* NAV */}
      <div className="solution-nav">
        <button
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => scrollToSection('process')}
        >
          Process
        </button>

        <button
          className={activeSection === 'framework' ? 'active' : ''}
          onClick={() => scrollToSection('framework')}
        >
          Framework
        </button>

        <button
          className={activeSection === 'solutions' ? 'active' : ''}
          onClick={() => scrollToSection('solutions')}
        >
          Solutions
        </button>

        <button
          className={activeSection === 'examples' ? 'active' : ''}
          onClick={() => scrollToSection('examples')}
        >
          Examples
        </button>

        <button
          className={activeSection === 'objections' ? 'active' : ''}
          onClick={() => scrollToSection('objections')}
        >
          Objections
        </button>

        <button
          className={activeSection === 'script' ? 'active' : ''}
          onClick={() => scrollToSection('script')}
        >
          Script
        </button>

        <button
          className={activeSection === 'proposal' ? 'active' : ''}
          onClick={() => scrollToSection('proposal')}
        >
          Proposal Ready
        </button>
      </div>

      <main className="solution-content">
        {/* PROCESS */}
        <section id="process" className="solution-section">
          <div className="solution-heading">
            <span>01</span>

            <div>
              <h2>The Presentation Process</h2>
              <p>
                A good presentation should feel like the logical continuation of
                discovery.
              </p>
            </div>
          </div>

          <div className="solution-process-grid">
            {presentationSteps.map((step) => {
              const Icon = step.icon

              return (
                <article className="solution-process-card" key={step.number}>
                  <div className="solution-process-top">
                    <span>{step.number}</span>
                    <Icon size={19} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>

          <div className="solution-rule">
            <div className="solution-rule-icon">
              <Target size={23} />
            </div>

            <div>
              <span>SALES RULE</span>

              <h3>
                Never present a solution just because the client mentioned a
                service.
              </h3>

              <p>
                Present the solution because it addresses a problem you
                discovered during the conversation.
              </p>
            </div>
          </div>
        </section>

        {/* FRAMEWORK */}
        <section id="framework" className="solution-section">
          <div className="solution-heading">
            <span>02</span>

            <div>
              <h2>Problem → Solution → Benefit → Outcome</h2>
              <p>This is the core framework your sales team should use.</p>
            </div>
          </div>

          <div className="framework-grid">
            <div className="framework-card problem">
              <span>01 • PROBLEM</span>
              <h3>What is wrong?</h3>
              <p>
                "Your current website isn't generating many quote requests."
              </p>
            </div>

            <ArrowRight className="framework-arrow" size={23} />

            <div className="framework-card solution">
              <span>02 • SOLUTION</span>
              <h3>What will we do?</h3>
              <p>
                "We would redesign the website around the customer journey and
                quote-generation process."
              </p>
            </div>

            <ArrowRight className="framework-arrow" size={23} />

            <div className="framework-card benefit">
              <span>03 • BENEFIT</span>
              <h3>What improves?</h3>
              <p>
                "Customers will have clearer paths to learn about your services
                and request a quote."
              </p>
            </div>

            <ArrowRight className="framework-arrow" size={23} />

            <div className="framework-card outcome">
              <span>04 • OUTCOME</span>
              <h3>Why does it matter?</h3>
              <p>
                "The goal is to create more opportunities for the business to
                generate qualified inquiries."
              </p>
            </div>
          </div>

          <div className="features-benefits">
            <div className="feature-column">
              <span>DON'T FOCUS ONLY ON</span>
              <h3>Features</h3>

              <ul>
                <li>React website</li>
                <li>Responsive design</li>
                <li>SEO setup</li>
                <li>Contact forms</li>
                <li>Animations</li>
              </ul>
            </div>

            <div className="feature-arrow">
              <ArrowRight size={25} />
            </div>

            <div className="benefit-column">
              <span>FOCUS ON</span>
              <h3>Business Benefits</h3>

              <ul>
                <li>Better customer experience</li>
                <li>More opportunities to generate leads</li>
                <li>Better visibility</li>
                <li>Easier customer communication</li>
                <li>Better online credibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" className="solution-section">
          <div className="solution-heading">
            <span>03</span>

            <div>
              <h2>Present the Right Solution</h2>
              <p>Don't sell every service. Match the service to the problem.</p>
            </div>
          </div>

          <div className="solution-types-grid">
            {solutionTypes.map((item) => {
              const Icon = item.icon

              return (
                <article className="solution-type-card" key={item.title}>
                  <div className="solution-type-header">
                    <div className="solution-type-icon">
                      <Icon size={21} />
                    </div>

                    <h3>{item.title}</h3>
                  </div>

                  <div className="solution-type-block">
                    <span>PROBLEM</span>
                    <p>{item.problem}</p>
                  </div>

                  <div className="solution-type-block">
                    <span>SOLUTION</span>
                    <p>{item.solution}</p>
                  </div>

                  <div className="solution-benefits">
                    <span>BENEFITS</span>

                    {item.benefits.map((benefit) => (
                      <div key={benefit}>
                        <CheckCircle2 size={14} />
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* EXAMPLES */}
        <section id="examples" className="solution-section">
          <div className="solution-heading">
            <span>04</span>

            <div>
              <h2>Problem-Specific Examples</h2>
              <p>
                Use the prospect's actual problem when explaining the solution.
              </p>
            </div>
          </div>

          <div className="problem-example-grid">
            {problemExamples.map((item, index) => (
              <article className="problem-example-card" key={item.problem}>
                <div className="example-number">0{index + 1}</div>

                <div className="example-row">
                  <span>PROBLEM</span>
                  <strong>{item.problem}</strong>
                </div>

                <ArrowRight size={17} />

                <div className="example-row">
                  <span>SOLUTION</span>
                  <strong>{item.solution}</strong>
                </div>

                <div className="example-divider"></div>

                <div>
                  <span>BENEFIT</span>
                  <p>{item.benefit}</p>
                </div>

                <div>
                  <span>OUTCOME</span>
                  <p>{item.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* OBJECTIONS */}
        <section id="objections" className="solution-section">
          <div className="solution-heading">
            <span>05</span>

            <div>
              <h2>Handling Common Objections</h2>
              <p>Don't argue. Understand the concern before responding.</p>
            </div>
          </div>

          <div className="objection-grid">
            {objectionCards.map((item) => (
              <article className="objection-card" key={item.objection}>
                <div className="objection-title">
                  <AlertTriangle size={17} />
                  <h3>{item.objection}</h3>
                </div>

                <div className="objection-response">
                  <span>RESPONSE</span>
                  <p>{item.response}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="objection-rule">
            <AlertTriangle size={22} />

            <div>
              <strong>Remember:</strong>

              <p>
                An objection is usually a reason for uncertainty. Find out what
                is causing the uncertainty before trying to overcome it.
              </p>
            </div>
          </div>
        </section>

        {/* SCRIPT */}
        <section id="script" className="solution-section">
          <div className="solution-heading">
            <span>06</span>

            <div>
              <h2>Solution Presentation Script</h2>
              <p>
                Use this as a framework rather than reading it word for word.
              </p>
            </div>
          </div>

          <div className="solution-script">
            <div className="solution-script-header">
              <div>
                <span>STARTUPLIFT DEV</span>
                <h3>Solution Presentation</h3>
              </div>

              <div className="script-tag">STEP 5</div>
            </div>

            <div className="solution-script-body">
              {presentationScript.map((step) => (
                <div className="solution-script-step" key={step.number}>
                  <div className="solution-script-number">{step.number}</div>

                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPOSAL READY */}
        <section id="proposal" className="solution-section">
          <div className="solution-heading">
            <span>07</span>

            <div>
              <h2>Are They Ready for a Proposal?</h2>
              <p>
                Don't send a proposal simply because the prospect showed
                interest.
              </p>
            </div>
          </div>

          <div className="proposal-ready-grid">
            <div className="proposal-ready-card yes">
              <div className="proposal-ready-icon">
                <CheckCircle2 size={22} />
              </div>

              <h3>Proposal Ready</h3>

              <ul>
                <li>We understand the problem.</li>
                <li>We understand the desired outcome.</li>
                <li>The prospect agrees the solution makes sense.</li>
                <li>The project is within our capabilities.</li>
                <li>Timeline is reasonably understood.</li>
                <li>Decision process is understood.</li>
                <li>There is a clear next step.</li>
              </ul>
            </div>

            <div className="proposal-ready-card no">
              <div className="proposal-ready-icon">
                <AlertTriangle size={22} />
              </div>

              <h3>Do More Discovery</h3>

              <ul>
                <li>The actual problem is still unclear.</li>
                <li>The prospect doesn't know what they want.</li>
                <li>There is no clear business need.</li>
                <li>There is no realistic timeline.</li>
                <li>The decision maker is unknown.</li>
                <li>The requested project is outside our scope.</li>
                <li>The next step is unclear.</li>
              </ul>
            </div>
          </div>

          <div className="crm-solution-section">
            <div className="crm-solution-icon">
              <FileText size={24} />
            </div>

            <div>
              <span>CRM UPDATE</span>

              <h3>Before creating the proposal, update the opportunity.</h3>

              <div className="crm-solution-fields">
                <div>
                  <strong>Problem</strong>
                  <span>Primary business problem</span>
                </div>

                <div>
                  <strong>Solution</strong>
                  <span>Recommended service</span>
                </div>

                <div>
                  <strong>Outcome</strong>
                  <span>Desired business result</span>
                </div>

                <div>
                  <strong>Timeline</strong>
                  <span>Expected start/completion</span>
                </div>

                <div>
                  <strong>Budget</strong>
                  <span>Known or estimated range</span>
                </div>

                <div>
                  <strong>Next Step</strong>
                  <span>Proposal, meeting, follow-up, etc.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="final-sales-rule">
            <div>
              <Sparkles size={25} />
            </div>

            <section>
              <span>THE SALES PRINCIPLE</span>

              <h3>
                The prospect should understand why your solution matters before
                they see the price.
              </h3>

              <p>
                Value first. Price second. The proposal should be the logical
                next step of a conversation where the problem, solution, and
                expected outcome are already understood.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SolutionGuide
