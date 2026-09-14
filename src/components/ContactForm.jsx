import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useCursor } from './CustomCursor'

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export default function ContactForm() {
  const setCursor = useCursor()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#EC4899', '#22D3EE'],
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-fuchsia-400 transition-colors'

  if (status === 'sent') {
    return (
      <p className="font-mono text-sm text-ink">
        Sent. I will get back to you soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Name" className={fieldClass} />
        <input name="email" type="email" required placeholder="Email" className={fieldClass} />
      </div>
      <input name="subject" required placeholder="Subject" className={fieldClass} />
      <textarea name="message" required rows={5} placeholder="Message" className={fieldClass} />
      <div>
        <label className="font-mono text-xs text-muted block mb-2">
          Attachment (optional)
        </label>
        <input name="attachment" type="file" className="text-sm text-muted" />
      </div>
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        onMouseEnter={() => setCursor('hover')}
        onMouseLeave={() => setCursor('default')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="font-mono text-sm text-ink border border-line rounded-full px-6 py-3 hover:border-fuchsia-400 transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'sending...' : 'send message'}
      </motion.button>
      {status === 'error' && (
        <p className="font-mono text-xs text-red-400">
          Something went wrong, try again or email me directly.
        </p>
      )}
    </form>
  )
}