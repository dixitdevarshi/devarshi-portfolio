import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useWindowMouse } from '../lib/useWindowMouse'
import { useActiveSection } from '../lib/useActiveSection'

const blobs = [
  { color: '#8B5CF6', size: 500, top: '5%', left: '10%', depth: 30, scrollDepth: -180 },
  { color: '#EC4899', size: 420, top: '40%', left: '65%', depth: 50, scrollDepth: -260 },
  { color: '#22D3EE', size: 380, top: '70%', left: '20%', depth: 20, scrollDepth: -120 },
]

const sectionHues = {
  hero: 0,
  about: 25,
  projects: 55,
  publication: 80,
  skills: 110,
  contact: 140,
}
const ids = Object.keys(sectionHues)

function BlobItem({ blob, mouseX, scrollYProgress }) {
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, blob.scrollDepth])

  return (
    <motion.div
      className="absolute rounded-full blur-[120px] opacity-30"
      style={{
        width: blob.size,
        height: blob.size,
        top: blob.top,
        left: blob.left,
        backgroundColor: blob.color,
        y: scrollShift,
      }}
      animate={{ x: mouseX * blob.depth, scale: [1, 1.08, 1] }}
      transition={{
        x: { type: 'spring', stiffness: 40, damping: 20 },
        scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  )
}

export default function BackgroundFX() {
  const { x } = useWindowMouse()
  const { scrollYProgress } = useScroll()
  const active = useActiveSection(ids)
  const hue = useMotionValue(0)
  const springHue = useSpring(hue, { stiffness: 40, damping: 20 })
  const filterValue = useTransform(springHue, (h) => `hue-rotate(${h}deg)`)

  useEffect(() => {
    hue.set(sectionHues[active] ?? 0)
  }, [active, hue])

  return (
    <motion.div style={{ filter: filterValue }} className="fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <BlobItem key={i} blob={blob} mouseX={x} scrollYProgress={scrollYProgress} />
      ))}
    </motion.div>
  )
}