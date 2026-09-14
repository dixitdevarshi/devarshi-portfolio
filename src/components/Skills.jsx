import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Marquee from './Marquee'
import skills from '../data/skills'
import ScrambleText from './ScrambleText'

const sectionEntrance = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
  const all = skills.flatMap((s) => s.items)
  const half = Math.ceil(all.length / 2)
  const row1 = all.slice(0, half)
  const row2 = all.slice(half)

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-150px' }}
      variants={sectionEntrance}
      className="py-24 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl text-ink mb-12"><ScrambleText text="Skills" /></h2>
        </Reveal>
      </div>
      <div className="space-y-6">
        <Marquee items={row1} direction="left" duration={28} />
        <Marquee items={row2} direction="right" duration={32} />
      </div>
    </motion.section>
  )
}