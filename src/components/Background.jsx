import { useEffect, useRef, useState } from 'react'
import background from '../data/background'
import Reveal from './Reveal'

export default function Background() {
  const timelineRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const node = timelineRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      const travelled = viewport * 0.72 - rect.top
      const total = Math.max(rect.height - viewport * 0.18, 1)
      setProgress(Math.max(0, Math.min(1, travelled / total)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="background" className="section section-alt">
      <Reveal className="container">
        <div className="background-heading">
          <div>
            <p className="section-kicker">Background</p>
            <h2>Education, work, and research.</h2>
          </div>
          <p>How my work in AI developed across study, research, and applied engineering.</p>
        </div>
        <div className="timeline" ref={timelineRef} style={{ '--timeline-progress': `${progress * 100}%` }}>
          {background.map((item) => (
            <article className="timeline-item" key={`${item.date}-${item.title}`}>
              <div className="timeline-date">{item.date}</div>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <p className="timeline-type">{item.type}</p>
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.organisation}</p>
                {item.location && <p className="timeline-detail">{item.location}</p>}
                {item.description && <p className="timeline-detail">{item.description}</p>}
                {item.href && <a className="text-link" href={item.href} target="_blank" rel="noreferrer">View publication <span aria-hidden="true">↗</span></a>}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
