import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, className = '', maxTilt = 12 }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])

  function handleMove(e) {
    const bounds = ref.current.getBoundingClientRect()
    x.set((e.clientX - bounds.left) / bounds.width)
    y.set((e.clientY - bounds.top) / bounds.height)
  }

  function handleLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}