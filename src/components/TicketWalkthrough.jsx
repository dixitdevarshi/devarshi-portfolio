import { useEffect, useRef, useState } from 'react'
import reviewQueue from '../assets/ticket-reviewqueue.webp'
import n8nWorkflow from '../assets/ticket-n8n-workflow.webp'
import grafanaDashboard from '../assets/ticket-grafana-dashboard.webp'

const steps = [
  {
    label: 'Step 1',
    title: 'n8n picks it up',
    body: 'The Gmail inbox is polled by an n8n workflow. This message has no attachment, so it goes straight to the classifier.',
  },
  {
    label: 'Step 2',
    title: 'Category classification',
    body: 'The Claude API reads the ticket and predicts a category. It returned "technical." The correct label, from the evaluation set, is "access."',
    result: { text: 'predicted: technical, expected: access', flagged: true },
  },
  {
    label: 'Step 3',
    title: 'Urgency classification',
    body: 'Urgency is classified separately from category. It returned "medium," which matches the expected label for this ticket.',
    result: { text: 'predicted: medium, expected: medium' },
  },
  {
    label: 'Step 4',
    title: 'Why the category slipped',
    body: 'A repeated logout is really an authentication problem, "access," but the phrase "it\'s making the app unusable" reads like a functional bug, which pulls toward "technical." The two categories overlap exactly at logins, and this ticket sits right on that line.',
  },
  {
    label: 'Step 5',
    title: 'Confidence-based review',
    body: 'Tickets below the confidence threshold, and a random 10% of high-confidence ones, are queued for human review instead of being auto-closed. A boundary case like this is exactly what that queue exists to catch.',
    result: { text: 'sent to review queue', flagged: true },
  },
]

const confusion = {
  categories: ['access', 'billing', 'general', 'technical'],
  matrix: [
    [11, 0, 0, 1],
    [0, 11, 0, 1],
    [0, 1, 9, 0],
    [0, 0, 0, 16],
  ],
}

export default function TicketWalkthrough() {
  const containerRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const nodes = containerRef.current
      ? Array.from(containerRef.current.querySelectorAll('.pipeline-step'))
      : []
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.step))
          }
        })
      },
      { threshold: 0.6, rootMargin: '-15% 0px -35%' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="pipeline-block">
        <h2>Following one real ticket</h2>
        <p>
          The evaluation set has 50 tickets with a known correct category and
          urgency. Rather than only show the ones the system got right, here
          is one it got wrong, and what happens next.
        </p>

        <div className="pipeline-ticket">
          <div className="pipeline-ticket-meta">
            <span>From t27@example.com</span>
          </div>
          <h4>Session keeps logging me out</h4>
          <p>
            "I get logged out every few minutes even though I didn't click
            logout, it's making the app unusable."
          </p>
        </div>

        <div className="pipeline-steps" ref={containerRef}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`pipeline-step${activeStep >= i ? ' is-active' : ''}`}
              data-step={i}
            >
              <p className="pipeline-step-label">{step.label}</p>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
              {step.result && (
                <span className={`pipeline-result${step.result.flagged ? ' is-flagged' : ''}`}>
                  {step.result.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pipeline-block">
        <h2>Where the other 49 landed</h2>
        <p>
          Category accuracy across the full evaluation set is 94%, 47 out of
          50. The row below is what the ticket above came from, expected
          category on the left, predicted category along the top.
        </p>
        <div className="confusion-wrap">
          <table className="confusion-table">
            <thead>
              <tr>
                <th aria-hidden="true" />
                {confusion.categories.map((c) => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {confusion.matrix.map((row, i) => (
                <tr key={confusion.categories[i]}>
                  <th scope="row">{confusion.categories[i]}</th>
                  {row.map((count, j) => (
                    <td key={j} className={i === j ? 'diag' : count > 0 ? 'err' : ''}>
                      {count}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="confusion-caption">
          The two off-diagonal category errors both involve billing:
          a discount question read as general support, and a payment
          outage read as a technical incident.
        </p>
      </div>

      <div className="pipeline-block">
        <h2>Fixing the urgency bias</h2>
        <p>
          The first version of the urgency prompt reflexively rounded up.
          Of the 24 tickets that were actually low urgency, 7 came back as
          medium and none came back as high, a one-directional bias, not
          random noise. Explicit tier definitions and a default-to-low
          instruction fixed most of it.
        </p>
        <div className="calibration-bars">
          <div className="calibration-row">
            <span>Before</span>
            <div className="calibration-track"><div className="calibration-fill" style={{ width: '64%' }} /></div>
            <span className="calibration-value">64%</span>
          </div>
          <div className="calibration-row">
            <span>After</span>
            <div className="calibration-track"><div className="calibration-fill is-final" style={{ width: '84%' }} /></div>
            <span className="calibration-value">84%</span>
          </div>
        </div>
      </div>

      <div className="pipeline-block">
        <h2>What the reviewer sees</h2>
        <p>
          Flagged tickets, like the one above, land in a React dashboard
          backed by an MCP server, so a correction updates the same record
          the API classified. The n8n workflow that watches the inbox and
          the Grafana dashboard that tracks the pipeline sit alongside it.
        </p>
        <figure className="case-screens">
          <div>
            <img src={reviewQueue} alt="Review queue dashboard listing tickets flagged for human correction" loading="lazy" />
            <figcaption>The review queue, showing tickets waiting on a human decision.</figcaption>
          </div>
          <div>
            <img src={n8nWorkflow} alt="n8n workflow that watches the Gmail inbox and calls the classification API" loading="lazy" />
            <figcaption>The n8n workflow that watches the inbox and calls the API.</figcaption>
          </div>
          <div>
            <img src={grafanaDashboard} alt="Grafana dashboard tracking ticket volume and classification accuracy" loading="lazy" />
            <figcaption>Grafana, tracking pipeline volume and accuracy over time.</figcaption>
          </div>
        </figure>
      </div>
    </>
  )
}
