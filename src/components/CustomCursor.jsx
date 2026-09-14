import { createContext, useContext, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorContext = createContext(() => {})

export function useCursor() {
  return useContext(CursorContext)
}

export function CursorProvider({ children }) {
  const [variant, setVariant] = useState('default')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 45, stiffness: 1000, mass: 0.15 })
  const springY = useSpring(y, { damping: 45, stiffness: 1000, mass: 0.15 })

  useEffect(() => {
    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  const sizes = { default: 16, hover: 56 }
  const size = sizes[variant] ?? sizes.default

  return (
    <CursorContext.Provider value={setVariant}>
      {children}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden rounded-full mix-blend-difference bg-white sm:block"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', damping: 35, stiffness: 600 }}
      />
    </CursorContext.Provider>
  )
}