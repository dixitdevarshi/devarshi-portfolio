import { CursorProvider } from './components/CustomCursor'
import LoadingIntro from './components/LoadingIntro'
import ScrollProgress from './components/ScrollProgress'
import Noise from './components/Noise'
import BackgroundFX from './components/BackgroundFX'
import TerminalEasterEgg from './components/TerminalEasterEgg'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Publication from './components/Publication'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <CursorProvider>
      <LoadingIntro />
      <TerminalEasterEgg />
      <div className="min-h-screen font-body">
        <Noise />
        <BackgroundFX />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Publication />
          <Skills />
          <Contact />
        </main>
        <footer className="max-w-content mx-auto px-6 py-10 text-xs text-muted font-mono">
          built with React, Vite, Tailwind, and Framer Motion
        </footer>
      </div>
    </CursorProvider>
  )
}

export default App