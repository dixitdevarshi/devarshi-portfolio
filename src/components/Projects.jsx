import { useState } from 'react'
import projects from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section section-alt">
      <Reveal className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Projects</h2>
          </div>
          <a className="text-link" href="https://github.com/dixitdevarshi" target="_blank" rel="noreferrer">
            More on GitHub <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} onClick={() => setSelected(project)} />
          ))}
        </div>
      </Reveal>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
