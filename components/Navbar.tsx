'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['About', 'Skills', 'Experience', 'Contact']

const scrollTargets: Record<string, string> = {
  about: 'about-me',
  skills: 'skills',
  experience: 'experience',
  contact: 'contact',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (label: string) => {
    setOpen(false)
    const id = scrollTargets[label.toLowerCase()] || label.toLowerCase()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15,22,38,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #243048' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <span className="font-mono font-bold text-lg" style={{ color: '#FF533D' }}>rnf.dev</span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="font-mono text-sm tracking-widest uppercase transition-colors"
              style={{ color: '#F5F5F5', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF533D')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F5F5F5')}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: '#F5F5F5', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-8 pb-6 flex flex-col gap-4"
          style={{ background: '#0F1626', borderTop: '1px solid #243048' }}
        >
          {links.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="font-mono text-xs tracking-widest uppercase text-left py-2"
              style={{ color: '#F5F5F5', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
