import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function CountUp({ value, className }) {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  })

  const match = String(value).match(/^([^\d.]*)([\d.]+)(.*)$/)

  const prefix = match ? match[1] : ''
  const numStr = match ? match[2] : ''
  const suffix = match ? match[3] : ''

  const decimals = numStr.includes('.')
    ? numStr.split('.')[1].length
    : 0

  const target = match ? parseFloat(numStr) : 0

  const motionVal = useMotionValue(0)

  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
  })

  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionVal.set(target)
    }
  }, [isInView, target, motionVal])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(v.toFixed(decimals))
    })

    return unsubscribe
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