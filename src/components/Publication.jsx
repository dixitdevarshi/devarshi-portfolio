import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import Parallax from './Parallax'
import { useCursor } from './CustomCursor'

const sectionEntrance = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Publication() {
  const setCursor = useCursor()

  return (
    <motion.section
      id="publication"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-150px' }}
      variants={sectionEntrance}
      className="max-w-content mx-auto px-6 py-24 scroll-mt-20"
    >
      <Reveal>
        <h2 className="font-display font-bold text-3xl text-ink mb-12">Publication</h2>
      </Reveal>
      <Parallax speed={0.08}>
      <Reveal delay={0.15}>
        <div className="rounded-3xl border border-line bg-card backdrop-blur p-8 sm:p-10">
          <p className="font-mono text-xs text-muted uppercase tracking-wide">
            IEEE ICCCMLA 2025 &middot; Germany
          </p>
          <h3 className="font-display font-bold text-2xl text-ink mt-4">
            Intelligent Conversational Brain RoboJEC: A Personality Conversation System
          </h3>
          <p className="mt-4 text-ink/75 font-body text-sm leading-relaxed">
            Devarshi Dixit, S. Jain, A. Mishra
          </p>
          <Magnetic strength={0.4}>
            <a
              href="https://ieeexplore.ieee.org/document/11580747"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="mt-6 inline-block font-mono text-sm text-fuchsia-300 hover:text-fuchsia-200 border border-line rounded-full px-5 py-2.5"
            >
              read on IEEE Xplore &rarr;
            </a>
          </Magnetic>
        </div>
      </Reveal>
      </Parallax>
    </motion.section>
  )
}