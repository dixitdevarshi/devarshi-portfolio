import { useEffect, useState } from 'react'

export function useWindowMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setPos({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return pos
}