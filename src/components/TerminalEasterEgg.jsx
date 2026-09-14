import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TRIGGER = 'sudo'

const COMMANDS = {
  help: 'available commands: whoami, skills, projects, contact, sudo make me a sandwich, clear, exit',
  whoami:
    'Devarshi Dixit — M.Sc. Intelligent Interactive Systems, Universitat Bielefeld. Building AI systems that stay up.',
  skills: 'Python, PyTorch, LangChain, FastAPI, React, and a genuine love for evaluation dashboards.',
  projects: 'AI Ticket Triage, Visual Anomaly Detection, PaperMind, RoboJEC. Scroll up to see them properly.',
  contact: 'devarshidixit01@gmail.com — or just use the contact form below, it actually works.',
  'sudo make me a sandwich': 'okay.',
  exit: '__exit__',
  clear: '__clear__',
}

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState(['type "help" to see available commands.'])
  const [input, setInput] = useState('')
  const buffer = useRef('')
  const inputRef = useRef(null)

  useEffect(() => {
    function handleKey(e) {
      if (open) return
      buffer.current = (buffer.current + e.key).slice(-TRIGGER.length).toLowerCase()
      if (buffer.current === TRIGGER) {
        setOpen(true)
        buffer.current = ''
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    const response = COMMANDS[cmd] ?? `command not found: ${cmd}`

    if (response === '__exit__') {
      setOpen(false)
      return
    }
    if (response === '__clear__') {
      setLines([])
      return
    }
    setLines((prev) => [...prev, `guest@devarshi:~$ ${raw}`, response])
  }

  function handleSubmit(e) {
    e.preventDefault()
    runCommand(input)
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-void/90 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-line bg-[#08080D] p-6 font-mono text-sm text-ink shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
              <span className="ml-2 text-muted text-xs">guest@devarshi: ~</span>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {lines.map((line, i) => (
                <p key={i} className="text-ink/80 whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
              <span className="text-fuchsia-300">guest@devarshi:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-ink"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <p className="mt-4 text-[11px] text-muted">type "exit" or click outside to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}