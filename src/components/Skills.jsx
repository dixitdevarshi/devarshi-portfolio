import skills from '../data/skills'
import Reveal from './Reveal'

const evidence = {
  'Programming & Automation': ['AI Ticket Triage', 'PaperMind', 'RoboJEC'],
  'Agentic AI & LLMs': ['AI Ticket Triage', 'PaperMind'],
  'Voice, Speech & NLP': ['RoboJEC', 'DRDO DYSL-AI'],
  'ML & Deep Learning': ['Visual Anomaly Detection', 'AI Ticket Triage'],
  'MLOps & Infrastructure': ['AI Ticket Triage', 'Visual Anomaly Detection', 'PaperMind'],
}

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <Reveal className="container">
        <div className="skills-heading">
          <div>
            <p className="section-kicker">Capabilities</p>
            <h2>Skills backed by work.</h2>
          </div>
          <p className="skills-intro">The tools matter less than where they have been applied, so each group points back to the systems or research behind it.</p>
        </div>
        <div className="skills-editorial">
          {skills.map((group) => (
            <article className="skill-row" key={group.category}>
              <div className="skill-category">
                <h3>{group.category}</h3>
                <p className="skill-evidence-label">Applied in</p>
                <p className="skill-evidence">{evidence[group.category].join(' · ')}</p>
              </div>
              <div className="skill-terms">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
