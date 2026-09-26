export default function ProjectCard({ project, onClick }) {
  const { name, description, metricValue, metricLabel, tech } = project

  return (
    <article className="project-entry">
      <div className="project-entry-main">
        <h3>{name}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tech" aria-label={`${name} technologies`}>
          {tech.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <div className="project-evidence">
        <strong>{metricValue}</strong>
        <span>{metricLabel}</span>
        {project.caseStudy ? (
          <a className="card-link" href={project.caseStudy}>View case study <span aria-hidden="true">↗</span></a>
        ) : (
          <button className="card-link" type="button" onClick={onClick}>View details <span aria-hidden="true">↗</span></button>
        )}
      </div>
    </article>
  )
}
