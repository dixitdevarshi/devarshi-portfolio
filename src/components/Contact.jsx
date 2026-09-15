import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import ContactForm from './ContactForm'
import Reveal from './Reveal'


const sectionEntrance = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.15c-3.17.69-3.83-1.35-3.83-1.35-.52-1.32-1.26-1.68-1.26-1.68-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.53-.29-5.2-1.27-5.2-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.68 5.34-5.22 5.62.41.36.77 1.06.77 2.15v3.19c0 .3.21.66.79.55A11.1 11.1 0 0 0 23.1 11.6C23.1 5.33 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <motion.section
  id="contact"
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, margin: '-150px' }}
  variants={sectionEntrance}
  className="max-w-content mx-auto px-6 py-32 scroll-mt-20"
>
      <Reveal>
        <h2 className="font-display font-black text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300">
  "Let's talk."
</h2>
        <p className="mt-4 max-w-md text-muted font-body">
          Open to AI/ML Werkstudent roles and internships in Germany.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex gap-4">
          <Magnetic strength={0.5}>
            <a
              href="https://github.com/dixitdevarshi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-line text-ink hover:border-fuchsia-400 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a
              href="https://www.linkedin.com/in/devarshi-dixit010"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-line text-ink hover:border-fuchsia-400 transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-12">
          <ContactForm />
        </div>
      </Reveal>
    </motion.section>
  )
}