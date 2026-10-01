import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import About from './components/About'
import Background from './components/Background'
import Projects from './components/Projects'
import Publication from './components/Publication'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import LoadingIntro from './components/LoadingIntro'
import CaseStudy from './components/CaseStudy'

function Home() {
  useEffect(() => {
    const returningToProjects = window.location.hash === '#projects'

    if (returningToProjects) {
      requestAnimationFrame(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    } else {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const projects = document.getElementById('projects')
    if (!projects) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && window.location.hash === '#projects') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }, { threshold: 0.12 })

    observer.observe(projects)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <LoadingIntro />
      <Nav />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <Background />
        <Projects />
        <Publication />
        <Skills />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Devarshi Dixit</p>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="#hero" onClick={(event) => {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.replaceState(null, '', window.location.pathname + window.location.search)
            }}>Move to the top ↑</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const isCaseStudy = ['/projects/ai-ticket-triage', '/projects/visual-anomaly-detection', '/projects/papermind', '/projects/robojec'].includes(path)
  return (
    <>
      {path === '/privacy' ? <Privacy /> : isCaseStudy ? <CaseStudy path={path} /> : <Home />}
      <Analytics beforeSend={(event) => localStorage.getItem('va-disable') === '1' ? null : event} />
    </>
  )
}
