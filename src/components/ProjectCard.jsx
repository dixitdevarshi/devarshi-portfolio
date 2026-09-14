import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import CountUp from './CountUp'
import { useCursor } from './CustomCursor'

export default function ProjectCard({ project, onClick }) {
  const { name, description, metricValue, metricLabel, tech } = project
  const setCursor = useCursor()

  return (
    <TiltCard maxTilt={6} className="group relative">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        }}
        onClick={onClick}
        onMouseEnter={() => setCursor('hover')}
        onMouseLeave={() => setCursor('default')}
        className="relative h-full rounded-3xl border border-line bg-card backdrop-blur p-8 overflow-hidden transition-colors duration-300 group-hover:border-fuchsia-400/50 cursor-pointer"
      >
        <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-cyan-400/0 group-hover:from-violet-500/10 group-hover:via-fuchsia-500/10 group-hover:to-cyan-400/10 transition-all duration-500 pointer-events-none" />

        <CountUp
          value={metricValue}
          className="font-mono text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-300"
        />
        <p className="font-mono text-xs text-muted mt-1">{metricLabel}</p>

        <h3 className="font-display font-bold text-xl text-ink mt-6">{name}</h3>
        <p className="mt-3 text-muted text-sm leading-relaxed">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-ink border border-line rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-fuchsia-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          view details &rarr;
        </p>
      </motion.div>
    </TiltCard>
  )
}