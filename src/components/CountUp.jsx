import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function CountUp({ value, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const match = String(value).match(/^([^\d.]*)([\d.]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const numStr = match ? match[2] : ''
  const suffix = match ? match[3] : ''
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  const target = match ? parseFloat(numStr) : 0

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    motionVal.set(isInView ? target : 0)
  }, [isInView, target, motionVal])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(v.toFixed(decimals)))
    return unsub
  }, [spring, decimals])

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}