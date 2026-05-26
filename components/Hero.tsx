'use client'
import { useEffect, useRef } from 'react'
import { Mail, Phone, Linkedin, Download, ArrowDown } from 'lucide-react'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    type Particle = { x: number; y: number; vx: number; vy: number; size: number }
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.parentElement?.addEventListener('mousemove', onMouseMove)
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave)

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.8,
      })
    }

    const CONNECT_DIST = 130
    const MOUSE_DIST = 160

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      // move particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      // draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,83,61,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // draw lines from particle to mouse
        const dx = particles[i].x - mx
        const dy = particles[i].y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const alpha = (1 - dist / MOUSE_DIST) * 0.4
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(255,83,61,${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,83,61,0.5)'
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove)
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="about"
      className="min-h-screen dot-grid flex flex-col items-center justify-center relative"
      style={{ paddingTop: '80px', paddingBottom: '60px' }}
    >
      <ParticleCanvas />

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
            style={{ color: '#AB987A', maxWidth: '535px', fontSize: '0.95rem' }}
          >
            Transforming complex data into intelligent solutions — from end-to-end ML
            development to AI-powered automation that delivers tangible business impact.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-up fade-up-4 flex flex-wrap justify-center gap-4">
          <a href="/CV.pdf" download className="btn-primary">
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
