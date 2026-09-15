import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Parallax from './Parallax'
import ScrambleText from './ScrambleText'
import photo from '../assets/headshot.jpg'

const sectionEntrance = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-150px' }}
      variants={sectionEntrance}
      className="max-w-content mx-auto px-6 py-24 scroll-mt-20 grid md:grid-cols-[1fr_1.3fr] gap-16 items-center"
    >
      <Parallax speed={0.12}>
        <Reveal>
          <img
            src={photo}
            alt="Devarshi Dixit"
            className="rounded-3xl border border-line w-full max-w-sm mx-auto aspect-[4/5] object-cover"
          />
        </Reveal>
      </Parallax>
      <Reveal delay={0.15}>
        <h2 className="font-display font-bold text-3xl text-ink mb-6"><ScrambleText text="About me" /></h2>
        <p className="text-ink/80 font-body leading-relaxed">
          I have spent the past two years building AI systems, automation pipelines, and
          knowledge management tools, where the interesting part was never just getting a
          model to work. It was making sure the outputs could be trusted, that the system
          stayed up, and that someone else could understand what I had done and why.
        </p>
        <p className="mt-4 text-ink/80 font-body leading-relaxed">
          Across my projects I have worked with agentic AI, MCP server integration, LLM
          APIs, workflow orchestration, and end-to-end deployment. I tend to spend as much
          time on evaluation and documentation as on the actual build.
        </p>
        <p className="mt-6 font-mono text-xs text-muted">
          M.Sc. Intelligent Interactive Systems, Universität Bielefeld &middot; Bielefeld, Germany
        </p>
      </Reveal>
    </motion.section>
  )
}