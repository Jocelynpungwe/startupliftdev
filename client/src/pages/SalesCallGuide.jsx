import React, { useState } from 'react'
import './css/salesCallGuide.css'

const sourceExamples = [
  {
    priority: 'Priority 1',
    icon: '🔎',
    title: 'Google Maps',
    description:
      'Use this when you find a local business through Google Maps or Google Business Profile.',
    example:
      '"I came across your business while looking at local businesses in Ottawa."',
  },
  {
    priority: 'Priority 1',
    icon: '🌐',
    title: 'Google Search',
    description:
      'Use this when you found the business while searching for businesses in a specific industry or location.',
    example:
      '"I came across your company while searching for construction companies in Ottawa."',
  },
  {
    priority: 'Priority 1',
    icon: '📸',
    title: 'Instagram',
    description:
      'Especially useful when the business has an active Instagram presence.',
    example:
      '"I came across your Instagram while researching local businesses in Ottawa. I noticed you have a pretty active presence online."',
  },
  {
    priority: 'Priority 2',
    icon: '📘',
    title: 'Facebook',
    description:
      'Useful for local businesses with an active Facebook page or community presence.',
    example:
      '"I came across your business through Facebook while looking at local businesses in the area."',
  },
  {
    priority: 'Priority 2',
    icon: '💼',
    title: 'LinkedIn',
    description:
      'Best for professional services, B2B companies, agencies, contractors, and larger businesses.',
    example:
      '"I came across your company on LinkedIn while researching businesses in the construction industry."',
  },
  {
    priority: 'Priority 2',
    icon: '📇',
    title: 'Business Directory',
    description:
      'Use this when the business was discovered through an online business directory.',
    example:
      '"I came across your company while researching local businesses in the area."',
  },
  {
    priority: 'Priority 3',
    icon: '🤝',
    title: 'Networking',
    description:
      'Use this after meeting someone through a business event, networking group, or professional community.',
    example:
      '"It was great meeting you at the networking event. I wanted to follow up about your online presence."',
  },
  {
    priority: 'Priority 1',
    icon: '👥',
    title: 'Referral',
    description:
      'Referrals are warm leads. Always mention the person who referred you when appropriate.',
    example:
      '"John recommended that I reach out to you. He mentioned that you were looking at improving your online presence."',
  },
  {
    priority: 'Priority 2',
    icon: '📋',
    title: 'Existing Contact',
    description:
      'Use this for previous conversations, old leads, previous clients, or people already in your network.',
    example:
      "We spoke previously about your website, and I wanted to follow up to see if improving it is still something you're considering.",
  },
]

const problemOpenings = [
  {
    problem: 'No Website',
    bad: '"You need a website. Your business looks unprofessional without one."',
    good: '"I came across your business while researching local businesses, and I noticed you don’t currently have a website. Have you ever considered building an online presence for the business?"',
  },
  {
    problem: 'Outdated Website',
    bad: '"Your website is really old and needs to be redesigned."',
    good: '"I took a look at your website and noticed it looks like it hasn’t been updated in a while. Is improving the website something you’ve been considering?"',
  },
  {
    problem: 'Poor Mobile Experience',
    bad: '"Your website doesn’t work properly on phones."',
    good: '"I was looking at your website from my phone and noticed that some parts were difficult to navigate. Have you had a chance to review the mobile experience recently?"',
  },
  {
    problem: 'No Booking System',
    bad: '"You’re losing customers because you don’t have online booking."',
    good: '"I noticed customers currently have to call or message to book. Have you ever considered adding online booking?"',
  },
  {
    problem: 'Poor SEO',
    bad: '"Your SEO is bad and that’s why people can’t find you."',
    good: '"I was searching for businesses in your area and noticed that you’re not showing as strongly as some other businesses. Have you done any SEO work recently?"',
  },
  {
    problem: 'Weak Call-to-Action',
    bad: '"Your website doesn’t convert customers."',
    good: '"I noticed it isn’t immediately clear what you’d like a new visitor to do when they arrive on the website. Is generating more calls or inquiries from the website something you’re focused on?"',
  },
  {
    problem: 'Strong Social + Weak Website',
    bad: '"Your Instagram is good but your website is bad."',
    good: '"I came across your Instagram and noticed you’ve built a strong presence there. I also looked at your website and noticed it doesn’t really reflect the same level of activity. Have you considered improving that experience?"',
  },
  {
    problem: 'Broken Website',
    bad: '"Your website is broken. You need us to fix it."',
    good: '"I was looking at your website and noticed that one of the pages/features doesn’t appear to be working correctly. Are you aware of that issue?"',
  },
  {
    problem: 'Poor E-commerce',
    bad: '"Your online store is terrible and you’re probably losing sales."',
    good: '"I was looking through your online store and noticed a few areas that could make the purchasing process easier. Are you currently looking at improving the online shopping experience?"',
  },
]

const callSteps = [
  {
    number: '01',
    title: 'Prepare',
    text: 'Review the business, website, social media, source, decision maker, and main problem before calling.',
  },
  {
    number: '02',
    title: 'Introduce Yourself',
    text: 'Say your name, StartupLift Dev, and keep the introduction short.',
  },
  {
    number: '03',
    title: 'Explain Why You Called',
    text: 'Tell them where you found the business and mention a specific observation.',
  },
  {
    number: '04',
    title: 'Ask a Question',
    text: 'Turn your observation into a question. This starts a conversation instead of a sales pitch.',
  },
  {
    number: '05',
    title: 'Listen',
    text: 'Let the prospect explain their current situation. Do not interrupt or immediately pitch.',
  },
  {
    number: '06',
    title: 'Understand',
    text: 'Ask a few follow-up questions to understand the problem, goals, and current process.',
  },
  {
    number: '07',
    title: 'Connect',
    text: 'Explain how StartupLift Dev could potentially help based on what they told you.',
  },
  {
    number: '08',
    title: 'Next Step',
    text: 'If there is interest, ask for a short discovery meeting or another appropriate next step.',
  },
  {
    number: '09',
    title: 'Record',
    text: 'Immediately record the call outcome, notes, problem, interest level, and next follow-up in the CRM.',
  },
]

function SalesCallGuide() {
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
    <div className="sales-call-guide">
      {/* HERO */}
      <section className="sales-guide-hero">
        <div className="sales-guide-glow glow-one"></div>
        <div className="sales-guide-glow glow-two"></div>

        <div className="sales-guide-hero-content">
          <span className="sales-guide-badge">SALES DEPARTMENT</span>

          <h1>
            Sales Call <span>Guide</span>
          </h1>

          <p>
            Learn how to approach prospects, introduce yourself, identify
            problems, ask the right questions, and move conversations toward the
            next step.
          </p>

          <div className="hero-rule">
            <span>Research</span>
            <i>→</i>
            <span>Call</span>
            <i>→</i>
            <span>Listen</span>
            <i>→</i>
            <span>Qualify</span>
            <i>→</i>
            <span>Next Step</span>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <div className="sales-guide-nav">
        <button
          className={activeSection === 'process' ? 'active' : ''}
          onClick={() => scrollToSection('process')}
        >
          Call Process
        </button>

        <button
          className={activeSection === 'sources' ? 'active' : ''}
          onClick={() => scrollToSection('sources')}
        >
          Where Found
        </button>

        <button
          className={activeSection === 'problems' ? 'active' : ''}
          onClick={() => scrollToSection('problems')}
        >
          Problems
        </button>

        <button
          className={activeSection === 'script' ? 'active' : ''}
          onClick={() => scrollToSection('script')}
        >
          Call Script
        </button>

        <button
          className={activeSection === 'what-we-do' ? 'active' : ''}
          onClick={() => scrollToSection('what-we-do')}
        >
          What We Do
        </button>

        <button
          className={activeSection === 'rules' ? 'active' : ''}
          onClick={() => scrollToSection('rules')}
        >
          Rules
        </button>
      </div>

      <main className="sales-guide-content">
        {/* CALL PROCESS */}
        <section id="process" className="guide-section">
          <div className="section-heading">
            <span>01</span>
            <div>
              <h2>The Call Process</h2>
              <p>
                Follow this process instead of trying to memorize an entire
                conversation.
              </p>
            </div>
          </div>

          <div className="call-process-grid">
            {callSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <div className="process-number">{step.number}</div>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SOURCES */}
        <section id="sources" className="guide-section">
          <div className="section-heading">
            <span>02</span>
            <div>
              <h2>Where Did We Find Them?</h2>
              <p>
                Always consider the source. It helps make the introduction more
                natural and personalized.
              </p>
            </div>
          </div>

          <div className="important-note">
            <div className="note-icon">💡</div>

            <div>
              <strong>Why does the source matter?</strong>

              <p>
                Saying where you found the business explains why you're
                contacting them and makes the call feel less random.
              </p>
            </div>
          </div>

          <div className="source-grid">
            {sourceExamples.map((source) => (
              <article className="source-card" key={source.title}>
                <div className="source-top">
                  <span className="source-icon">{source.icon}</span>

                  <span className="source-priority">{source.priority}</span>
                </div>

                <h3>{source.title}</h3>

                <p>{source.description}</p>

                <div className="example-box">
                  <span>EXAMPLE</span>
                  <p>{source.example}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROBLEMS */}
        <section id="problems" className="guide-section">
          <div className="section-heading">
            <span>03</span>
            <div>
              <h2>How to Introduce the Problem</h2>
              <p>
                Never insult the business. Use your research as an observation
                and turn it into a question.
              </p>
            </div>
          </div>

          <div className="problem-method">
            <div className="method-item">
              <span>01</span>
              <strong>Observation</strong>
              <p>What did you notice?</p>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-item">
              <span>02</span>
              <strong>Question</strong>
              <p>Ask how they currently handle it.</p>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-item">
              <span>03</span>
              <strong>Listen</strong>
              <p>Let them explain their situation.</p>
            </div>
          </div>

          <div className="problem-grid">
            {problemOpenings.map((item) => (
              <article className="problem-card" key={item.problem}>
                <div className="problem-title">
                  <span>PROBLEM</span>
                  <h3>{item.problem}</h3>
                </div>

                <div className="bad-example">
                  <span>✕ DON'T SAY</span>
                  <p>{item.bad}</p>
                </div>

                <div className="good-example">
                  <span>✓ INSTEAD SAY</span>
                  <p>{item.good}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DON'T ASSUME */}
        <section className="guide-section">
          <div className="section-heading">
            <span>04</span>
            <div>
              <h2>Don't Assume the Problem</h2>
              <p>
                Your research identifies a possible problem. The prospect tells
                you whether it is actually a problem.
              </p>
            </div>
          </div>

          <div className="assumption-layout">
            <div className="assumption-card wrong">
              <span>❌ WRONG APPROACH</span>

              <h3>Tell them what their problem is.</h3>

              <blockquote>
                "You don't have online booking, so you're losing customers."
              </blockquote>

              <p>
                You don't actually know whether they're losing customers. Maybe
                their current booking process works perfectly for them.
              </p>
            </div>

            <div className="assumption-card right">
              <span>✓ BETTER APPROACH</span>

              <h3>Ask about the situation.</h3>

              <blockquote>
                "I noticed customers currently have to call or message to book.
                Have you ever considered adding online booking?"
              </blockquote>

              <p>
                Now the prospect can explain how their current process works and
                whether they actually want to change it.
              </p>
            </div>
          </div>

          <div className="golden-rule">
            <span>GOLDEN RULE</span>

            <h3>
              Research gives you the hypothesis.
              <br />
              The prospect gives you the answer.
            </h3>
          </div>
        </section>

        {/* BASIC SCRIPT */}
        <section id="script" className="guide-section">
          <div className="section-heading">
            <span>05</span>
            <div>
              <h2>Basic Cold Call Script</h2>
              <p>Use this as a framework. Don't read it like a robot.</p>
            </div>
          </div>

          <div className="script-card">
            <div className="script-header">
              <div>
                <span>STARTUPLIFT DEV</span>
                <h3>General Cold Call</h3>
              </div>

              <div className="script-status">CALL FRAMEWORK</div>
            </div>

            <div className="script-content">
              <div className="script-step">
                <span>01</span>

                <div>
                  <h4>Introduction</h4>

                  <p>"Hi, is this [Name]?"</p>

                  <p>
                    "Hi [Name], this is [Salesperson] from StartupLift Dev. I'll
                    keep this brief."
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>02</span>

                <div>
                  <h4>Where We Found Them</h4>

                  <p>
                    "I came across [Business Name] while looking at [Google /
                    Instagram / Facebook / LinkedIn] businesses in [Location]."
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>03</span>

                <div>
                  <h4>Observation</h4>

                  <p>"I noticed [specific observation]."</p>
                </div>
              </div>

              <div className="script-step">
                <span>04</span>

                <div>
                  <h4>Question</h4>

                  <p>
                    "I was curious — how are you currently handling [booking /
                    customer inquiries / online sales / getting customers from
                    Google]?"
                  </p>
                </div>
              </div>

              <div className="script-step highlight">
                <span>05</span>

                <div>
                  <h4>Listen</h4>

                  <p>Stop talking and let them answer.</p>

                  <strong>Do not immediately start selling.</strong>
                </div>
              </div>

              <div className="script-step">
                <span>06</span>

                <div>
                  <h4>Follow-Up Question</h4>

                  <p>
                    "Got it. And are you happy with how that's currently working
                    for you?"
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>07</span>

                <div>
                  <h4>Understand Their Goal</h4>

                  <p>
                    "If you could improve one thing about your online presence
                    right now, what would it be?"
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>08</span>

                <div>
                  <h4>Connect the Solution</h4>

                  <p>
                    "Based on what you've told me, I think there may be an
                    opportunity to improve [specific area]."
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>09</span>

                <div>
                  <h4>Explain StartupLift Dev</h4>

                  <p>
                    "We help businesses improve their websites and online
                    presence. The goal isn't just to build a website — it's to
                    make it easier for potential customers to [book / contact /
                    find / purchase from] your business."
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>10</span>

                <div>
                  <h4>Next Step</h4>

                  <p>
                    "Would you be open to a short 15–20 minute conversation
                    where we can show you what we noticed and discuss a few
                    options?"
                  </p>
                </div>
              </div>

              <div className="script-step">
                <span>11</span>

                <div>
                  <h4>Book the Meeting</h4>

                  <p>
                    "Great. Would [Day/Time] or [Day/Time] work better for you?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="guide-section">
          <div className="section-heading">
            <span>06</span>

            <div>
              <h2>When They Ask: "What Do You Do?"</h2>

              <p>
                Keep your answer short, clear, and focused on business outcomes.
              </p>
            </div>
          </div>

          <div className="what-we-do-card">
            <div className="company-answer">
              <span>RECOMMENDED RESPONSE</span>

              <blockquote>
                "We help small and medium-sized businesses improve their online
                presence. That usually means improving their website, helping
                them get found through search, and creating better ways for
                customers to contact, book, or buy from them."
              </blockquote>
            </div>

            <div className="conversation-return">
              <div className="return-arrow">↩</div>

              <div>
                <span>THEN RETURN THE CONVERSATION TO THEM</span>

                <p>
                  "I'm curious, what are you currently doing to bring customers
                  in online?"
                </p>
              </div>
            </div>
          </div>

          <div className="answer-options">
            <article>
              <span>IF THEY ASK ABOUT WEBSITES</span>

              <p>
                "We design and develop websites that are built around the
                business's goals — not just how the website looks."
              </p>
            </article>

            <article>
              <span>IF THEY ASK ABOUT SEO</span>

              <p>
                "We help businesses improve their visibility in search so
                potential customers have a better chance of finding them."
              </p>
            </article>

            <article>
              <span>IF THEY ASK ABOUT MARKETING</span>

              <p>
                "We help businesses improve their online presence and create
                strategies to attract more potential customers."
              </p>
            </article>
          </div>
        </section>

        {/* RULES */}
        <section id="rules" className="guide-section">
          <div className="section-heading">
            <span>07</span>

            <div>
              <h2>Call Rules</h2>

              <p>Keep these rules visible while making calls.</p>
            </div>
          </div>

          <div className="rules-grid">
            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Research First</h3>
                <p>Know who you're calling before you call.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Personalize</h3>
                <p>Mention something specific about their business.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Ask Questions</h3>
                <p>
                  Don't assume that your observation is their actual problem.
                </p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Listen</h3>
                <p>The prospect should speak more than you.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Don't Over-Sell</h3>
                <p>Don't list every service StartupLift Dev offers.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Focus on Benefits</h3>
                <p>Explain how the solution helps the business.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Have a Next Step</h3>
                <p>Always know what should happen after the call.</p>
              </div>
            </div>

            <div className="rule-card">
              <span>✓</span>
              <div>
                <h3>Record Everything</h3>
                <p>Update the CRM immediately after the call.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SalesCallGuide
