import { useEffect, useState } from 'react'

export default function LoadingIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1450)
    return () => window.clearTimeout(timer)
  }, [])

  if (!show) return null
  return (
    <div className="identity-intro" aria-hidden="true">
      <div className="identity-intro-inner">
        <span>Devarshi Dixit</span>
        <i />
      </div>
    </div>
  )
}
