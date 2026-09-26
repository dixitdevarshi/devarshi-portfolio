import Reveal from './Reveal'
export default function Publication() {
  return (
    <section id="publication" className="section">
      <Reveal className="container">
        <p className="section-kicker">Research</p>
        <h2>Publication</h2>
        <article className="publication-card">
          <p className="meta-line">IEEE ICCCMLA 2025</p>
          <h3>Intelligent Conversational Brain RoboJEC: A Personality Conversation System</h3>
          <p>Devarshi Dixit, S. Jain, A. Mishra</p>
          <a className="text-link" href="https://ieeexplore.ieee.org/document/11580747" target="_blank" rel="noreferrer">
            Read on IEEE Xplore <span aria-hidden="true">→</span>
          </a>
        </article>
      </Reveal>
    </section>
  )
}
