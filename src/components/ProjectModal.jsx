import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCursor } from './CustomCursor'
import CountUp from './CountUp'

export default function ProjectModal({ project, onClose }) {
  const setCursor = useCursor()

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-void/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed inset-x-4 top-[8%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl max-h-[80vh] overflow-y-auto z-50 rounded-3xl border border-line bg-[#0A0A12] p-8 sm:p-10"
          >
            <button
              onClick={onClose}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="absolute top-6 right-6 text-muted hover:text-ink font-mono text-sm"
            >
              close
            </button>

            <CountUp
              value={project.metricValue}
              className="font-mono text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-300"
            />
            <p className="font-mono text-xs text-muted mt-1">{project.metricLabel}</p>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-6 pr-16">
              {project.name}
            </h3>

            <ul className="mt-6 space-y-3">
              {project.details.map((point, i) => (
                <li key={i} className="text-ink/80 text-sm leading-relaxed flex gap-3">
                  <span className="text-fuchsia-400 mt-0.5">&rsaquo;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] text-ink border border-line rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="mt-8 inline-block font-mono text-sm text-fuchsia-300 hover:text-fuchsia-200 border border-line rounded-full px-5 py-2.5"
              >
                view on github &rarr;
              </a>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}