import { useState } from 'react'

const links = [
  { href: '#featured', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#background', label: 'Background' },
  { href: '#projects', label: 'Projects' },
  { href: '#publication', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <nav className="container nav-shell" aria-label="Primary navigation">
        <a href="#hero" className="brand" aria-label="Devarshi Dixit home">DD</a>
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="primary-links" onClick={() => setOpen(v => !v)}>
          <span className="sr-only">Toggle navigation</span><span /><span />
        </button>
        <div id="primary-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        </div>
      </nav>
    </header>
  )
}
