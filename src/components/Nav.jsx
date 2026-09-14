import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { useActiveSection } from '../lib/useActiveSection'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#publication', label: 'Publication' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
const ids = links.map((l) => l.href.slice(1))

export default function Nav() {
  const active = useActiveSection(ids)

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="max-w-content mx-auto px-6 h-20 flex items-center justify-between">
        <Magnetic strength={0.3}>
          <a href="#" className="font-display font-bold text-ink">
            DD
          </a>
        </Magnetic>
        <div className="flex gap-8">
          {links.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <Magnetic key={link.href} strength={0.3}>
                <a
                  href={link.href}
                  className={`relative font-body text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300"
                    />
                  )}
                </a>
              </Magnetic>
            )
          })}
        </div>
      </nav>
    </header>
  )
}