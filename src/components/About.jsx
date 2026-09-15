import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Parallax from './Parallax'
import photo from '../assets/about-photo.webp'

const sectionEntrance = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        margin: '-150px',
      }}
      variants={sectionEntrance}
      className="max-w-content mx-auto px-6 py-24 scroll-mt-20 grid md:grid-cols-[1fr_1.3fr] gap-16 items-center"
    >
      {/* Professional portrait */}
      <Parallax speed={0.12} className="order-2 md:order-1">
        <Reveal>
          <div className="relative w-full max-w-[350px] mx-auto">

            {/* Subtle glow behind portrait */}
            <div
              className="
                absolute
                left-[15%]
                right-[15%]
                top-[12%]
                bottom-[8%]
                rounded-full
                bg-gradient-to-br
                from-violet-500/10
                via-fuchsia-500/[0.07]
                to-cyan-400/10
                blur-[65px]
                pointer-events-none
              "
            />

            <img
              src={photo}
              alt="Devarshi Dixit"
              draggable="false"
              className="
                relative
                w-full
                h-auto
                object-contain
                select-none
                drop-shadow-[0_20px_28px_rgba(0,0,0,0.25)]
              "
            />
          </div>
        </Reveal>
      </Parallax>

      {/* About text */}
      <Reveal delay={0.15} className="order-1 md:order-2">
        <h2 className="font-display font-bold text-3xl text-ink mb-6">
          About me
        </h2>

        <p className="text-ink/80 font-body leading-relaxed">
          I spend most of my time getting AI systems from "works on my laptop" to
          something that actually stays up and does its job. Lately that's meant
          building a support ticket pipeline that grades its own accuracy, and a
          defect detector that has to get things right without ever seeing a bad
          example during training.
        </p>

        <p className="mt-4 text-ink/80 font-body leading-relaxed">
          Before Bielefeld I did my undergrad in AI and Data Science back in India.
          Somewhere along the way I got hooked on the parts most people skip,
          writing evaluation scripts, checking whether a model is actually right
          instead of just assuming it is, documenting things well enough that I
          don't have to explain them twice. If a project doesn't already have a
          way to check itself, that's usually the first thing I build.
        </p>

        <p className="mt-6 font-mono text-xs text-muted">
          M.Sc. Intelligent Interactive Systems, Universität Bielefeld &middot;{' '}
          Bielefeld, Germany
        </p>
      </Reveal>
    </motion.section>
  )
}