import Reveal from './Reveal'

const screenshot = 'https://raw.githubusercontent.com/dixitdevarshi/ai-ticket-triage/main/docs/screenshots/ReviewQueue.png'

export default function FeaturedWork() {
  return (
    <section id="featured" className="section featured-section">
      <Reveal className="container">
        <div className="section-heading featured-heading">
          <div>
            <p className="section-kicker">Featured work</p>
            <h2>AI Ticket Triage</h2>
          </div>
          <a className="text-link" href="/projects/ai-ticket-triage">
            Read the write-up
          </a>
        </div>
        <div className="featured-grid">
          <a className="featured-visual" href="/projects/ai-ticket-triage" aria-label="Read the AI Ticket Triage write-up">
            <img src={screenshot} alt="AI Ticket Triage human review dashboard" loading="lazy" />
          </a>
          <div className="featured-copy">
            <p className="featured-lead">A support pipeline that reads incoming Gmail tickets, classifies topic and urgency, drafts a reply, and sends anything it is unsure about to a person for review.</p>
            <div className="featured-results" aria-label="Project evaluation results">
              <div><strong>94%</strong><span>category accuracy</span></div>
              <div><strong>84%</strong><span>urgency accuracy</span></div>
              <div><strong>+20 pts</strong><span>urgency after calibration</span></div>
            </div>
            <p>The evaluation runs against a labelled 50-ticket set through the live API. The project combines Claude, FastAPI, PostgreSQL, React, MCP, n8n, Docker, Prometheus and Grafana, with OCR, link safety checks and visual anomaly detection for attachments.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
