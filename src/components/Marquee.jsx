export default function Marquee({ items, direction = 'left', duration = 30 }) {
  const content = [...items, ...items]
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="overflow-hidden group">
      <div
        className={`flex gap-4 w-max ${animClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-ink border border-line rounded-2xl px-6 py-4 bg-card whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}