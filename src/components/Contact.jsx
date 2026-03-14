import { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

function Contact() {
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (!status) return undefined

    const timeoutId = setTimeout(() => {
      setStatus(null)
      setErrorText('')
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setStatus(null)
    setErrorText('')

    const formData = new FormData(formRef.current)
    const fromName = String(formData.get('from_name') || '').trim()
    const fromEmail = String(formData.get('from_email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: fromName,
          from_email: fromEmail,
          email: fromEmail,
          reply_to: fromEmail,
          message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus('success')
        formRef.current.reset()
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setErrorText(err?.text || 'Configuration mismatch in EmailJS template fields.')
        setStatus('error')
      })
      .finally(() => setSending(false))
  }

  return (
    <section id="contact" className="section-shell contact-section">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-kicker">Contact</p>
        <h3 className="section-title">Let's Build Together</h3>
        <p className="section-copy">
          Open to full-stack and product-focused roles.
        </p>
      </Motion.div>

      <div className="contact-grid">
        <div className="glass-card">
          <p className="connect-kicker">Connect</p>
          <h4 className="connect-title">Reach Out</h4>
          <p className="connect-desc">
            Open to full-stack, AI, and data-focused opportunities. Happy to connect.
          </p>

          <div className="connect-links">
            <div className="connect-item">
              <GithubLogo className="contact-icon" />
              <a className="contact-link" href="https://github.com/chethans2005" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <div className="connect-item">
              <LinkedinLogo className="contact-icon" />
              <a className="contact-link" href="https://linkedin.com/in/chethan-s1122" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="connect-item">
              <EnvelopeSimple className="contact-icon" />
              <a className="contact-link" href="mailto:chetansoyal@gmail.com">
                chetansoyal@gmail.com
              </a>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="glass-card form-card">
          <h4 className="form-title">Quick Message</h4>
          <input className="input-field" type="text" name="from_name" placeholder="Your name" required />
          <input className="input-field" type="email" name="from_email" placeholder="Email" required />
          <textarea className="input-field textarea-field" name="message" placeholder="Message" required />
          <button type="submit" className="btn-primary send-btn" disabled={sending}>
            {sending ? 'Sending…' : 'Send'}
          </button>
          {status === 'success' && <p className="form-status form-status-ok">Message sent!</p>}
          {status === 'error' && (
            <p className="form-status form-status-err">
              Failed to send: {errorText || 'Something went wrong. Try again.'}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
