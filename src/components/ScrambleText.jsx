import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#'

export default function ScrambleText({ text, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!isInView) return

    let iteration = 0
    const totalSteps = text.length * 3
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration / 3) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration += 1
      if (iteration > totalSteps) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isInView, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}