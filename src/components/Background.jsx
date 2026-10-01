import { useEffect, useRef, useState } from 'react'
import background from '../data/background'
import Reveal from './Reveal'

export default function Background() {
  const timelineRef = useRef(null)
  const [progressHeight, setProgressHeight] = useState(0)
  const [reachedDots, setReachedDots] = useState([])

  useEffect(() => {
    const update = () => {
      const timeline = timelineRef.current
      if (!timeline) return

      const timelineRect = timeline.getBoundingClientRect()
      const dots = Array.from(
        timeline.querySelectorAll('.timeline-dot')
      )

      if (!dots.length) return

      // The point in the viewport that drives the timeline animation.
      const triggerY = window.innerHeight * 0.72

      // Convert that viewport position into a position inside the timeline.
      const rawProgress = triggerY - timelineRect.top

      // Get the exact centre of every dot relative to the timeline.
      const dotCenters = dots.map((dot) => {
        const rect = dot.getBoundingClientRect()

        return rect.top - timelineRect.top + rect.height / 2
      })

      const firstDot = dotCenters[0]
      const lastDot = dotCenters[dotCenters.length - 1]

      // The line starts at the centre of the first dot and can never
      // continue beyond the centre of the final dot.
      const currentPosition = Math.max(
        firstDot,
        Math.min(lastDot, rawProgress)
      )

      setProgressHeight(currentPosition - firstDot)

      // A dot becomes filled exactly when the progress line reaches it.
      setReachedDots(
        dotCenters.map((center) => rawProgress >= center)
      )
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

          <p>
            Where I have studied and worked, and the research I have been part
            of.
          </p>
        </div>

        <div
          className="timeline"
          ref={timelineRef}
          style={{
            '--timeline-progress-px': `${progressHeight}px`,
          }}
        >
          {background.map((item, index) => (
            <article
              className="timeline-item"
              key={`${item.date}-${item.title}`}
            >
              <div className="timeline-date">{item.date}</div>

              <span
                className={`timeline-dot${
                  reachedDots[index] ? ' is-reached' : ''
                }`}
                aria-hidden="true"
              />

              <div className="timeline-content">
                <p className="timeline-type">{item.type}</p>

                <h3>{item.title}</h3>

                <p className="timeline-org">{item.organisation}</p>

                {item.location && (
                  <p className="timeline-detail">{item.location}</p>
                )}

                {item.description && (
                  <p className="timeline-detail">{item.description}</p>
                )}

                {item.href && (
                  <a
                    className="text-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View publication{' '}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}