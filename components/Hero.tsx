'use client'
import { Mail, Phone, Linkedin, Download, ArrowDown } from 'lucide-react'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="about"
      className="min-h-screen dot-grid flex flex-col items-center justify-center relative"
      style={{ paddingTop: '80px', paddingBottom: '60px' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,83,61,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="text-center max-w-3xl mx-auto px-6 space-y-6 relative z-10">

        {/* Badge */}
        <div className="fade-up fade-up-1">
          <span className="label">Available for opportunities</span>
        </div>

        {/* Name */}
        <div className="fade-up fade-up-2">
          <h1
            className="font-mono font-bold leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#F5F5F5' }}
          >
            Rangga <span style={{ color: '#FF533D' }}>Nur Faisal</span>
          </h1>
          <p
            className="font-mono mt-3"
            style={{ color: '#AB987A', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            Data Scientist & AI Engineer
          </p>
        </div>

        {/* Divider + Tagline */}
        <div className="fade-up fade-up-3">
          <div className="section-divider" style={{ margin: '0 auto 24px' }} />
          <p
            className="text-sm leading-relaxed mx-auto"
            style={{ color: '#AB987A', maxWidth: '520px', fontSize: '0.95rem' }}
          >
            Transforming complex data into intelligent solutions — from end-to-end ML
            development to AI-powered automation that delivers tangible business impact.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-up fade-up-4 flex flex-wrap justify-center gap-4">
          <a href="/cv-rangga.pdf" download className="btn-primary">
            <Download size={15} /> Download CV
          </a>
          <button onClick={() => scrollTo('contact')} className="btn-outline">
            <Mail size={15} /> Contact Me
          </button>
        </div>

        {/* Social Links */}
        <div className="fade-up fade-up-4 flex justify-center items-center gap-6">
          {[
            { icon: Linkedin, href: 'https://linkedin.com/in/rnf3356', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:rangganurfaisal07@gmail.com', label: 'Email' },
            { icon: Phone, href: 'https://wa.me/6281214533239', label: 'WhatsApp' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="transition-all hover:scale-110"
              style={{ color: '#AB987A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF533D')}
              onMouseLeave={e => (e.currentTarget.style.color = '#AB987A')}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('skills')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5F5F5' }}
      >
        <span className="font-mono text-xs">scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  )
}
