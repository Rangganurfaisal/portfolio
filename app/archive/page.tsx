'use client'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const photos = [
  '/api/img/ar001',
  '/api/img/ar002',
  '/api/img/ar003',
  '/api/img/ar004',
  '/api/img/ar005',
  '/api/img/ar006',
  '/api/img/ar007',
  '/api/img/ar008',
]

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#F5F5F5' }}>
        <X size={20} />
      </button>
      <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', color: '#F5F5F5' }}>
        <ChevronLeft size={20} />
      </button>
      <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', color: '#F5F5F5' }}>
        <ChevronRight size={20} />
      </button>
      <div onClick={e => e.stopPropagation()}>
        <Image
          src={photos[current]}
          alt={`archive ${current + 1}`}
          width={1200} height={800}
          unoptimized
          style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', borderRadius: '8px', objectFit: 'contain' }}
          onContextMenu={e => e.preventDefault()}
          draggable={false}
        />
        <p className="font-mono text-xs text-center mt-2" style={{ color: '#AB987A' }}>
          {current + 1} / {photos.length}
        </p>
      </div>
    </div>
  )
}

export default function Archive() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <main style={{ background: '#0F1626', minHeight: '100vh' }}>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15,22,38,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #243048' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm transition-colors" style={{ color: '#AB987A', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF533D')}
            onMouseLeave={e => (e.currentTarget.style.color = '#AB987A')}
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
          <span className="font-mono font-bold text-lg" style={{ color: '#FF533D' }}>rnf.dev</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label">Archive</span>
          <div className="section-divider" style={{ margin: '12px auto 28px' }} />
          <h1 className="font-mono font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5F5F5' }}>
            In Action
          </h1>
          <p className="text-sm mt-3" style={{ color: '#AB987A' }}>
            A collection of moments — presentations, events, and work in the field.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={src}
                alt={`archive ${i + 1}`}
                fill unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                className="group-hover:scale-105"
                onContextMenu={e => e.preventDefault()}
                draggable={false}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(255,83,61,0.1)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} />}
    </main>
  )
}
