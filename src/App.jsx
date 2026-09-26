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
    if (window.location.hash !== '#projects') return
    const timer = window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 1500)
    return () => window.clearTimeout(timer)
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
          <a href="/privacy">Privacy</a>
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
