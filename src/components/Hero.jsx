import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Magnetic from './Magnetic'
import Parallax from './Parallax'
import { useCursor } from './CustomCursor'
import heroPhoto from '../assets/hero-photo.webp'

const word = {
  hidden: { y: '110%' },
  show: { y: 0 },
}

function AnimatedPhoto() {
  // Mouse position normalized from -1 to 1
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement
  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 18,
    mass: 0.5,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 18,
    mass: 0.5,
  })

  // 3D rotation
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8])
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5])

  // Small physical movement
  const moveX = useTransform(smoothX, [-1, 1], [-14, 14])
  const moveY = useTransform(smoothY, [-1, 1], [-6, 6])

  // Glow moves opposite to portrait
  const glowX = useTransform(smoothX, [-1, 1], [25, -25])
  const glowY = useTransform(smoothY, [-1, 1], [15, -15])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Convert 0 → 1 into -1 → 1
    mouseX.set(x * 2 - 1)
    mouseY.set(y * 2 - 1)
  }

  const handleMouseLeave = () => {
    // Smoothly returns portrait to center
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Moving glow behind portrait */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="
          absolute
          left-[8%]
          right-[8%]
          top-[10%]
          bottom-[5%]
          rounded-full
          bg-gradient-to-br
          from-violet-500/20
          via-fuchsia-500/15
          to-cyan-400/15
          blur-[75px]
          pointer-events-none
        "
      />

      {/* Cyan depth glow */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="
          absolute
          right-[0%]
          top-[20%]
          w-[45%]
          h-[45%]
          rounded-full
          bg-cyan-400/10
          blur-[65px]
          pointer-events-none
        "
      />

      {/* Mouse-controlled portrait */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.02,
        }}
        transition={{
          scale: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="relative"
      >
        {/* Independent slow floating animation */}
        <motion.div
          animate={{
            y: [0, -9, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={heroPhoto}
            alt="Devarshi Dixit"
            draggable="false"
            className="
              relative
              w-full
              h-auto
              object-contain
              select-none
              drop-shadow-[0_24px_30px_rgba(0,0,0,0.30)]
            "
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const setCursor = useCursor()
  const headline = ['Devarshi', 'Dixit']

  return (
    <section
      id="hero"
      className="max-w-content mx-auto px-6 pt-40 pb-24 grid md:grid-cols-[1.3fr_1fr] gap-16 items-center"
    >
      <div>
        <div className="overflow-hidden">
          {headline.map((line, i) => (
            <motion.h1
              key={line}
              variants={word}
              initial="hidden"
              animate="show"
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display font-black text-6xl sm:text-7xl leading-[0.95] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="mt-6 max-w-md text-muted font-body leading-relaxed"
        >
          I build AI systems that are meant to run somewhere, not just work in a
          notebook. Currently finishing my M.Sc. in Intelligent Interactive
          Systems in Bielefeld.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
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