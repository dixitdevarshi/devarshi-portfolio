import { useCallback, useRef, useState } from 'react'

export default function CompareSlider({ original, overlay, alt, score, label }) {
  const [value, setValue] = useState(50)
  const trackRef = useRef(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setValue(Math.min(100, Math.max(0, pct)))
  }, [])

  function handlePointerDown(e) {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  function endDrag(e) {
    draggingRef.current = false
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  function handleKeyDown(e) {
    const step = e.shiftKey ? 20 : 5
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setValue((v) => Math.max(0, v - step))
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setValue((v) => Math.min(100, v + step))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setValue(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setValue(100)
    }
  }

  return (
    <div className="compare-block">
      <div className="compare-block-head">
        <h3>{label}</h3>
        <span className="compare-score">score {score}</span>
      </div>
      <div
        className="compare-slider"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <img className="compare-base" src={original} alt={alt} draggable="false" />
        <div className="compare-overlay-wrap" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <img src={overlay} alt="" aria-hidden="true" draggable="false" />
        </div>
        <div
          className="compare-handle"
          style={{ left: `${value}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`Reveal the anomaly heatmap for ${alt}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="compare-labels" aria-hidden="true">
        <span>Original</span>
        <span>Heatmap overlay</span>
      </div>
    </div>
  )
}
