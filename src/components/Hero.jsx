import { useEffect } from 'react'
import heroPhoto from '../assets/hero-photo.webp'

export default function Hero() {
  useEffect(() => {
    const hero = document.getElementById('hero')

    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.location.hash) {
          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )
        }
      },
      {
        threshold: 0.6,
      }
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className="section hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            AI / ML Engineer · M.Sc. Intelligent Interactive Systems
          </p>

          <h1>Devarshi Dixit</h1>

          <p className="hero-lead">
            I build and evaluate AI systems with a focus on reliability,
            measurable performance, and practical deployment.
          </p>

          <div className="hero-mobile-portrait-wrap">
            <img
              className="hero-portrait"
              src={heroPhoto}
              alt="Devarshi Dixit"
              draggable="false"
            />
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects
            </a>

            <a className="button button-secondary" href="#contact">
              Contact me
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <img
            className="hero-portrait"
            src={heroPhoto}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </div>
      </div>
    </section>
  )
}