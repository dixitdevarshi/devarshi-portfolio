import { useEffect, useState } from 'react'
import { X, Github, Linkedin, Mail } from 'lucide-react'

const links = [
  { href: '#featured', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#publication', label: 'Research' },
  { href: '#contact', label: 'Contact' },
]

const socials = [
  { href: 'https://github.com/dixitdevarshi', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/devarshi-dixit010', label: 'LinkedIn' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [showFloatingSocials, setShowFloatingSocials] = useState(true)

  useEffect(() => {
    const prev = document.body.style.overflow
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const observer = new IntersectionObserver(([entry]) => {
      setShowFloatingSocials(!entry.isIntersecting)
    }, { threshold: 0.08 })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="editorial-header">
      <a className="editorial-brand anim-fade-up" style={{animationDelay:'800ms'}} href="#hero">Devarshi</a>
      <div className="editorial-desktop-nav">
        <nav aria-label="Primary navigation">
          {links.map((link, i) => <a className="anim-fade-up" style={{animationDelay:`${1000+i*80}ms`}} key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
      </div>

      <div className={showFloatingSocials ? 'floating-socials visible' : 'floating-socials'} aria-label="Social links">
        <a href="https://github.com/dixitdevarshi" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><Github size={20} strokeWidth={1.6} /></a>
        <a href="https://www.linkedin.com/in/devarshi-dixit010" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><Linkedin size={20} strokeWidth={1.6} /></a>
        <a href="#contact" aria-label="Contact" title="Contact"><Mail size={19} strokeWidth={1.6} /></a>
      </div>

      <button className="mobile-menu-button anim-fade-up" style={{animationDelay:'900ms'}} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span className={open ? 'bar top open' : 'bar top'} /><span className={open ? 'bar middle open' : 'bar middle'} /><span className={open ? 'bar bottom open' : 'bar bottom'} />
      </button>

      <div className={open ? 'mobile-drawer-layer open' : 'mobile-drawer-layer'} onClick={() => setOpen(false)}>
        <aside className={open ? 'mobile-drawer open' : 'mobile-drawer'} onClick={e => e.stopPropagation()}>
          <button className={open ? 'drawer-close open' : 'drawer-close'} onClick={() => setOpen(false)} aria-label="Close menu"><X size={26} strokeWidth={1.5}/></button>
          <p className="drawer-label">Site Index</p>
          <nav>{links.map((link,i)=><a style={{transitionDelay:open?`${300+i*80}ms`:'0ms'}} key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.label}</a>)}</nav>
          <p className="drawer-label find">Find Me</p>
          <div className="drawer-socials">{socials.map((link,i)=><a style={{transitionDelay:open?`${550+i*60}ms`:'0ms'}} key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
        </aside>
      </div>
    </header>
  )
}
