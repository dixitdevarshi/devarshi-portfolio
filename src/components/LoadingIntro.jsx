import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoadingIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-void flex items-center justify-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.05em' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
          >
            DEVARSHI DIXIT
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}