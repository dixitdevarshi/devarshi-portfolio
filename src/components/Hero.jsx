import { motion, useSpring, useTransform } from 'framer-motion'
import Magnetic from './Magnetic'
import Parallax from './Parallax'
import ScrambleText from './ScrambleText'
import { useCursor } from './CustomCursor'
import { useWindowMouse } from '../lib/useWindowMouse'
import headshot from '../assets/headshot.jpg'

const word = { hidden: { y: '110%' }, show: { y: 0 } }

function AnimatedPhoto() {
  const { x } = useWindowMouse()
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.4 })
  const rotateY = useTransform(springX, [-1, 1], [-15, 15])

  return (
    <motion.div
      style={{ rotateY, transformPerspective: 1000 }}
      className="relative w-full max-w-sm mx-auto"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute -inset-6 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-[2.5rem] blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 opacity-70" />
        <img
          src={headshot}
          alt="Devarshi Dixit"
          className="relative rounded-[2rem] w-full aspect-square object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/25 to-cyan-400/50 mix-blend-color" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const setCursor = useCursor()
  const headline = ['Devarshi', 'Dixit']

  return (
    <section id="hero" className="max-w-content mx-auto px-6 pt-40 pb-24 grid md:grid-cols-[1.3fr_1fr] gap-16 items-center">
      <div>
        <div className="overflow-hidden">
          {headline.map((line, i) => (
            <motion.h1
              key={line}
              variants={word}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-6xl sm:text-7xl leading-[0.95] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
            >
              <ScrambleText text={line} />
            </motion.h1>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 max-w-md text-muted font-body leading-relaxed"
        >
          M.Sc. Intelligent Interactive Systems student building AI systems end to
          end, model to deployed API. Looking for an AI/ML Werkstudent role or
          internship in Germany.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Magnetic strength={0.5}>
            <a
              href="#projects"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="inline-block px-6 py-3 rounded-full border border-line font-mono text-sm text-ink hover:border-fuchsia-400 transition-colors"
            >
              see the work
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <Parallax speed={0.2}>
        <AnimatedPhoto />
      </Parallax>
    </section>
  )
}