'use client'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import dynamic from 'next/dynamic'

const GameModal = dynamic(() => import('./GameModal'), { ssr: false })

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
  const [gameOpen, setGameOpen] = useState(false)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggered = useRef(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Desktop: press G to open game
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        setGameOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Mobile: long press logo
  const handleLogoPointerDown = () => {
    longPressTriggered.current = false
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true
      setGameOpen(true)
    }, 1000)
  }
  const handleLogoPointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }
  const handleLogoClick = () => {
    if (longPressTriggered.current) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (label: string) => {
    setOpen(false)
    const id = scrollTargets[label.toLowerCase()] || label.toLowerCase()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15,22,38,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #243048' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <span
          className="font-mono font-bold text-lg"
          style={{ color: '#FF533D', cursor: 'pointer', WebkitUserSelect: 'none' }}
          onPointerDown={handleLogoPointerDown}
          onPointerUp={handleLogoPointerUp}
          onPointerLeave={handleLogoPointerUp}
          onClick={handleLogoClick}
        >
          rnf.dev
        </span>

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

    {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}
    </>
  )
}
