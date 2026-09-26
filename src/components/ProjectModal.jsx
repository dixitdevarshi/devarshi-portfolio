import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details">Close</button>
        <div className="project-result">
          <strong>{project.metricValue}</strong>
          <span>{project.metricLabel}</span>
        </div>
        <h3 id="project-modal-title">{project.name}</h3>
        <ul className="detail-list">
          {project.details.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <div className="tag-list">
          {project.tech.map((item) => <span className="tag" key={item}>{item}</span>)}
        </div>
        {project.href && (
          <a className="button button-secondary" href={project.href} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        )}
      </div>
    </div>
  )
}
