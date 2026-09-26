import { useState } from 'react'

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!ENDPOINT) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const form = event.currentTarget

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <div className="form-status" role="status">Message sent. I will get back to you soon.</div>
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" placeholder="Your name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows="6" placeholder="What would you like to discuss?" required />
      </label>
      <button className="button button-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && <p className="form-error" role="alert">The message could not be sent. Please try again.</p>}
    </form>
  )
}
