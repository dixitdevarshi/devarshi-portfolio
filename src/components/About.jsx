import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal className="container about-editorial">
        <p className="section-kicker">About</p>
        <h2>I like figuring out why things don’t work.</h2>
        <div className="about-copy">
          <p>I studied AI and Data Science in India before moving to Bielefeld for my master’s in Intelligent Interactive Systems. Somewhere along the way, I became more interested in what happens after a model starts working.</p>
          <p>I enjoy digging into why a system fails, comparing different approaches, and finding ways to measure whether a change actually made things better. That has shaped a lot of the projects I work on, from speech recognition and anomaly detection to LLM-based systems.</p>
          <p>Outside of that, I spend a lot of time building things, learning new tools, and occasionally getting away from my laptop.</p>
        </div>
      </Reveal>
    </section>
  )
}
