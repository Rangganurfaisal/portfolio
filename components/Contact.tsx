'use client'
import { useState } from 'react'
import { Mail, Phone, Linkedin, Send } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSend = () => {
    const body = encodeURIComponent(`Hi Rangga,\n\nMy name is ${form.name}.\n\n${form.message}`)
    const sub = encodeURIComponent(form.subject || 'Portfolio Inquiry')
    window.location.href = `mailto:rangganurfaisal07@gmail.com?subject=${sub}&body=${body}`
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0F1626',
    border: '1px solid #243048',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F5F5F5',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <span className="label">04 / Contact</span>
          <div className="section-divider" style={{ margin: '12px auto 28px' }} />
          <h2 className="font-mono font-bold text-2xl" style={{ color: '#F5F5F5' }}>Get In Touch</h2>
          <p className="text-sm mt-2" style={{ color: '#AB987A' }}>
            Open to new opportunities, collaborations, or just a conversation.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact info */}
        <ScrollReveal delay={100}>
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: 'rangganurfaisal07@gmail.com', href: 'mailto:rangganurfaisal07@gmail.com' },
            { icon: Phone, label: 'WhatsApp', value: '+62 812 1453 3239', href: 'https://wa.me/6281214533239' },
            { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/rnf3356', href: 'https://linkedin.com/in/rnf3356' },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 p-4"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,83,61,0.1)', border: '1px solid rgba(255,83,61,0.2)' }}
              >
                <Icon size={17} style={{ color: '#FF533D' }} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs" style={{ color: '#AB987A' }}>{label}</p>
                <p className="text-sm font-medium truncate" style={{ color: '#F5F5F5' }}>{value}</p>
              </div>
            </a>
          ))}
        </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={200}>
        <div className="card p-6 space-y-4">
          {[
            { name: 'name', label: 'Your Name', placeholder: 'John Doe' },
            { name: 'subject', label: 'Subject', placeholder: 'Project Collaboration' },
          ].map(f => (
            <div key={f.name}>
              <label className="font-mono text-xs block mb-2" style={{ color: '#AB987A' }}>{f.label}</label>
              <input
                name={f.name}
                type="text"
                placeholder={f.placeholder}
                value={form[f.name as keyof typeof form]}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#FF533D')}
                onBlur={e => (e.target.style.borderColor = '#243048')}
              />
            </div>
          ))}
          <div>
            <label className="font-mono text-xs block mb-2" style={{ color: '#AB987A' }}>Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target.style.borderColor = '#FF533D')}
              onBlur={e => (e.target.style.borderColor = '#243048')}
            />
          </div>
          <button
            onClick={handleSend}
            className="btn-primary w-full justify-center"
            disabled={!form.name || !form.message}
            style={{ width: '100%', opacity: !form.name || !form.message ? 0.5 : 1 }}
          >
            <Send size={14} /> Send Message
          </button>
          <p className="font-mono text-xs text-center" style={{ color: '#AB987A' }}>
            Opens your email app with the message pre-filled
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
