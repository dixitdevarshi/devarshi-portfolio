import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from './CustomCursor'

export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)
  const setCursor = useCursor()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMove(e) {
    const bounds = ref.current.getBoundingClientRect()
    x.set((e.clientX - (bounds.left + bounds.width / 2)) * strength)
    y.set((e.clientY - (bounds.top + bounds.height / 2)) * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
    setCursor('default')
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setCursor('hover')}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}