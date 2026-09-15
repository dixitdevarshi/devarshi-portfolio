import { useState } from 'react'
import { motion } from 'framer-motion'
import projects from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { useCursor } from './CustomCursor'

const sectionEntrance = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const setCursor = useCursor()

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-150px' }}
      variants={sectionEntrance}
      className="max-w-content mx-auto px-6 py-24 scroll-mt-20"
    >
      <Reveal>
        <h2 className="font-display font-bold text-3xl text-ink mb-12">Projects</h2>
      </Reveal>
      <motion.div variants={container} className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </motion.div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <Magnetic strength={0.35} className="inline-block">
          <a
            href="https://github.com/dixitdevarshi"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="font-mono text-sm text-muted hover:text-ink transition-colors"
          >
            view more projects &rarr;
          </a>
        </Magnetic>
      </Reveal>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </motion.section>
  )
}