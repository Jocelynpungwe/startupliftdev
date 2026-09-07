import React, { useState } from 'react'
import './css/salesCallGuide.css'

const problems = [
  {
    id: 'no-website',
    title: 'No Website',
    priority: 'Priority 1',
    icon: '🌐',

    scriptStart: `
    SCRIPT START

Hi, my name is Nicaise.

I'm calling from StartupLift Dev, in relation to [Company Name].

I came across your business while looking for cleaning companies in the Ottawa and Gatineau area, and I noticed that your business doesn't currently have a dedicated website.

I'm reaching out because we help local businesses build a professional online presence and make it easier for potential customers to find and contact them online.`,

    problem: `
What is the Problem?:

• Potential customers can't easily see all of your services, reviews, experience, and what makes your company different.
• Where you're located
• You're missing an opportunity to capture customers who are searching online for cleaning services.
• A professional website can also help establish more credibility and trust with new customers.
`,

    whatWeCanDo: `
The goal is to create a website that works for your business 24/7.

So when someone searches for your company or searches for cleaning services in your area, they can discover your business, learn about your services, trust your company, and contact you.`,

    howWeDoIt: `
If you're interested, what we'd like to do is create a free sample of what a website for your business could look like and send it to your email.

There's no obligation to purchase anything.

You can simply take a look at the design and see what we can create for your business.

If you like it, we can discuss the next steps.`,

    tryClose: `
What would be the best email address to send the sample to?

[GET EMAIL]

Perfect.

We'll send the sample over and give you a call in a few days to get your feedback.

StartupLift Dev

Ottawa & Gatineau

Office: Gatineau, next to Promenades Mall.`,
  },

  {
    id: 'broken-website',
    title: 'Website Link Not Working',
    priority: 'Priority 1',
    icon: '⚠️',

    scriptStart: `
Script Start
Hi, my name is Nicaise.

I'm calling from StartupLift Dev, in relation to [Company Name].

I came across your business online while looking for cleaning companies in the Ottawa and Gatineau area, and I noticed that there seems to be an issue with your website. When I tried accessing it, it wasn't working properly.

I'm reaching out because we help businesses like yours build and improve their online presence.
`,

    problem: `
What is the problem?
PROBLEM WITH THE WEBSITE

- Your website is currently not working properly.
- Potential customers may have difficulty accessing your business online.
- You're potentially losing opportunities from people who are trying to learn more about your services or request a quote.


You've already built your reputation and customer trust through your business. The problem is making sure your online presence reflects that reputation.`,

    whatWeCanDo: `
What can we do?
if is issue with keeping domain name?
- we can give a temp domain name so that you have a website online.

- we can help get you back online, with modern website
-help drive traffic to your website`,

    howWeDoIt: `
How are we going to do that?
If you're interested, what we'd like to do is create a sample redesign of your website and send it to your email.

There's no obligation. You can simply take a look at what we can create for your business.

If you like the redesign, we can discuss the next steps.`,

    tryClose: `
What would be the best email address to send the sample to?

[GET EMAIL]

Perfect.

We'll send the sample to you and give you a call in a few days to get your feedback.

StartupLift Dev

Ottawa & Gatineau

Office: Gatineau, next to Promenades Mall.`,
  },

  {
    id: 'outdated-website',
    title: 'Outdated Website',
    priority: 'Priority 2',
    icon: '🔄',

    scriptStart: `
Hi My name is Nicaise

[Redesign and create webste]

im calling you from Startup dev.
in relation with your online profile [Name of Company] 

i came across your website and noticed it could be modernized to better represent the qualifty and professionalism of your business.`,

    problem: `
PROBLEM WITH WEBSITE.

- It doesn't immediately communicate a premium/professional cleaning company
-The design feels like an older template
-Very basic page structure
- Large amounts of empty space
- Weak visual hierarchy
- Limited use of modern cards, sections, animations, and imagery`,

    whatWeCanDo: `
What can we do?
Create a more engaging homepage
Showcase services more clearly
Highlight customer reviews
Strengthen calls-to-action
Improve the quote experience
Modernize the mobile experience

You've already built the reputation and the customer trust. We want to help make sure your website reflects that.`,

    howWeDoIt: `
-overall design,
- visual presentation
- content structure,
- customer journey could be brought up to a much more modern standard.`,

    tryClose: `
if your interested, we can send you the Sample of the redesign the website to your email and call you in few days.

[GET EMAIL]


OUR LOCATION
Ottawa & Gatineau.

OFFICE IS:
Gatineau, Next to Promade Mall,`,
  },
]

function SalesCallGuide() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0])

  return (
    <div className="sales-call-guide">
      {/* HERO */}
      <section className="sales-guide-hero">
        <div className="sales-guide-glow glow-one"></div>
        <div className="sales-guide-glow glow-two"></div>

        <div className="sales-guide-hero-content">
          <span className="sales-guide-badge">SALES DEPARTMENT</span>

          <h1>
            Sales Call <span>Scripts</span>
          </h1>

          <p>
            Select the problem you identified and use the corresponding sales
            script.
          </p>
        </div>
      </section>

      {/* PROBLEM SELECTOR */}
      <section className="guide-section">
        <div className="section-heading">
          <span>01</span>

          <div>
            <h2>Choose the Problem</h2>

            <p>Select the problem you identified during your research.</p>
          </div>
        </div>

        <div className="problem-grid">
          {problems.map((problem) => (
            <button
              key={problem.id}
              className={`problem-card ${
                selectedProblem.id === problem.id ? 'active' : ''
              }`}
              onClick={() => setSelectedProblem(problem)}
            >
              <div className="problem-card-top">
                <span className="problem-icon">{problem.icon}</span>

                <span className="problem-priority">{problem.priority}</span>
              </div>

              <h3>{problem.title}</h3>

              <span className="view-script">View Script →</span>
            </button>
          ))}
        </div>
      </section>

      {/* SELECTED SCRIPT */}
      <section className="guide-section" id="script">
        <div className="section-heading">
          <span>02</span>

          <div>
            <h2>{selectedProblem.title}</h2>

            <p>Complete sales call script for this problem.</p>
          </div>
        </div>

        <div className="full-script-card">
          {/* SCRIPT START */}
          <div className="script-block">
            <div className="script-block-header">
              <span>01</span>
              <h3>Script Start</h3>
            </div>

            <div className="script-text">
              {selectedProblem.scriptStart
                .trim()
                .split('\n')
                .map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
            </div>
          </div>

          {/* PROBLEM */}
          <div className="script-block">
            <div className="script-block-header">
              <span>02</span>
              <h3>What Is the Problem?</h3>
            </div>

            <div className="script-text">
              {selectedProblem.problem
                .trim()
                .split('\n')
                .map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
            </div>
          </div>

          {/* WHAT WE CAN DO */}
          <div className="script-block">
            <div className="script-block-header">
              <span>03</span>
              <h3>What Can We Do?</h3>
            </div>

            <div className="script-text">
              {selectedProblem.whatWeCanDo
                .trim()
                .split('\n')
                .map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
            </div>
          </div>

          {/* HOW WE DO IT */}
          <div className="script-block">
            <div className="script-block-header">
              <span>04</span>
              <h3>How Are We Going to Do That?</h3>
            </div>

            <div className="script-text">
              {selectedProblem.howWeDoIt
                .trim()
                .split('\n')
                .map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
            </div>
          </div>

          {/* TRY CLOSE */}
          <div className="script-block try-close-block">
            <div className="script-block-header">
              <span>05</span>
              <h3>Try Close</h3>
            </div>

            <div className="script-text">
              {selectedProblem.tryClose
                .trim()
                .split('\n')
                .map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SalesCallGuide
