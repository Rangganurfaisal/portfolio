'use client'
import { useState } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Calendar, MapPin, ChevronRight, ChevronLeft } from 'lucide-react'

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#F5F5F5', zIndex: 1 }}>
        <X size={20} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', color: '#F5F5F5', zIndex: 1 }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 16, background: '#243048', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', color: '#F5F5F5', zIndex: 1 }}>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
        <Image
          src={images[current]}
          alt={`preview ${current + 1}`}
          width={1200}
          height={800}
          style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', borderRadius: '8px', objectFit: 'contain' }}
          onContextMenu={e => e.preventDefault()}
          draggable={false}
        />
        {images.length > 1 && (
          <p className="font-mono text-xs text-center mt-2" style={{ color: '#AB987A' }}>
            {current + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  )
}

interface Project {
  name: string
  description: string
  tech: string[]
  images?: string[]
}

interface Experience {
  company: string
  role: string
  period: string
  location: string
  type: string
  summary: string
  projects: Project[]
  color: string
}

const experiences: Experience[] = [
  {
    company: 'PT Garudafood Putra Putri Jaya',
    role: 'Data Analyst',
    period: 'Oct 2025 – Apr 2026',
    location: 'Sumedang, Indonesia',
    type: 'Apprenticeship',
    summary: 'Developed end-to-end ML and automation solutions at one of Indonesia\'s largest FMCG companies — building predictive models for GPM and operational performance, an internal RAG-based chatbot, and a report automation pipeline that cut manual work from 2 hours to 5 minutes.',
    color: '#FF533D',
    projects: [
      {
        name: 'GPM & OPI Predictor',
        description: 'End-to-end ML models predicting Gross Profit Margin (GPM) and Operation Performance Indicators (OPI) — covering the full pipeline from data processing and feature engineering to model training and deployment as a Flask web application.',
        tech: ['Python', 'CatBoost', 'Flask', 'Pandas', 'Power BI'],
      },
      {
        name: 'iGrow — Internal Knowledge Chatbot',
        description: 'Built "iGrow", a RAG-based internal knowledge management chatbot using n8n and an LLM. Handled the full pipeline from data preparation and chunking to deployment, significantly improving employee access to operational documentation.',
        tech: ['n8n', 'RAG', 'LLM', 'API Integration'],
      },
      {
        name: 'Automated Report Generator',
        description: 'Designed a Python automation system that extracts data directly from Excel and generates formatted PowerPoint presentations — reducing the manual reporting process from 2 hours to under 5 minutes.',
        tech: ['Python', 'openpyxl', 'python-pptx'],
      },
    ],
  },
  {
    company: 'PT Pertamina EP Zona 7',
    role: 'AI Engineer & Project Coordinator',
    period: 'Feb 2025 – Jun 2025',
    location: 'Cirebon, Indonesia',
    type: 'Freelance Project',
    summary: 'Led digitalization of HSSE compliance monitoring by implementing a real-time AI-based PPE detection system on operational CCTV infrastructure.',
    color: '#FF533D',
    projects: [
      {
        name: 'APD Safety Compliance Detection (YOLO)',
        description: 'Real-time object detection system deployed on operational CCTV to automatically monitor PPE (hard hat, vest, gloves) compliance. Dataset of ~5,170 annotated images, achieving mAP@50 >85%. Managed full ML lifecycle from data collection to hyperparameter tuning.',
        tech: ['YOLOv8', 'Python', 'OpenCV', 'Custom Dataset', 'Roboflow'],
        images: ['/apd-1.jpg', '/apd-2.jpg', '/apd-3.jpg', '/apd-4.jpg'],
      },
    ],
  },
  {
    company: 'PT Pertamina EP Regional 2',
    role: 'ICT Intern',
    period: 'Jul 2024 – Sep 2024',
    location: 'Jakarta, Indonesia',
    type: 'Internship',
    summary: 'Developed a deep learning model for gas pipeline pressure prediction and designed its integration strategy into Pertamina\'s Integrated Monitoring System.',
    color: '#FF533D',
    projects: [
      {
        name: 'Gas Pipeline Pressure Prediction',
        description: 'Deep Learning model predicting gas pipeline pressure anomalies using temperature, energy rate, and gas component variables. Designed integration into the Integrated Monitoring System (IMS) in collaboration with the operational team.',
        tech: ['Python', 'TensorFlow', 'Deep Learning', 'EDA', 'Pandas'],
        images: ['/ict%20intern/1.png', '/ict%20intern/2.png', '/ict%20intern/3.png'],
      },
    ],
  },
]

function Modal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const [openProjects, setOpenProjects] = useState<Record<number, boolean>>({})
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  const toggleProject = (i: number) =>
    setOpenProjects(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-xs px-2 py-1 rounded"
                style={{ background: 'rgba(255,83,61,0.1)', color: exp.color, border: `1px solid ${exp.color}40` }}
              >
                {exp.type}
              </span>
            </div>
            <h3 className="font-mono font-bold text-lg" style={{ color: '#F5F5F5' }}>{exp.company}</h3>
            <p className="font-mono text-sm mt-1" style={{ color: exp.color }}>{exp.role}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1 text-xs" style={{ color: '#AB987A' }}>
                <Calendar size={12} /> {exp.period}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: '#AB987A' }}>
                <MapPin size={12} /> {exp.location}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#243048', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#F5F5F5', flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Summary */}
        <p
          className="text-sm leading-relaxed mb-6 pb-6"
          style={{ color: '#AB987A', borderBottom: '1px solid #243048' }}
        >
          {exp.summary}
        </p>

        {/* Projects */}
        <div>
          <p className="label mb-4">Projects ({exp.projects.length})</p>
          <div className="space-y-4">
            {exp.projects.map((proj, i) => (
              <div
                key={i}
                className="rounded-xl"
                style={{ background: '#0F1626', border: '1px solid #243048' }}
              >
                {/* Header — always visible */}
                <div className="flex items-center gap-2 p-4">
                  {proj.images && proj.images.length > 0 ? (
                    <button
                      onClick={() => toggleProject(i)}
                      className="flex items-center gap-2 text-left"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <ChevronRight
                        size={14}
                        style={{
                          color: exp.color,
                          flexShrink: 0,
                          transition: 'transform 0.2s',
                          transform: openProjects[i] ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      />
                      <h4 className="font-mono font-bold text-sm" style={{ color: '#F5F5F5' }}>{proj.name}</h4>
                    </button>
                  ) : (
                    <>
                      <ChevronRight size={14} style={{ color: exp.color, flexShrink: 0 }} />
                      <h4 className="font-mono font-bold text-sm" style={{ color: '#F5F5F5' }}>{proj.name}</h4>
                    </>
                  )}
                </div>

                {/* Always visible: description + tech */}
                <div className="px-4 pb-4">
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#AB987A' }}>{proj.description}</p>

                  {/* Images — only shown when clicked */}
                  {proj.images && proj.images.length > 0 && openProjects[i] && (() => {
                    const imgs = proj.images!
                    // 4 images → 2x2 grid; otherwise → first full width + rest in 2-col grid
                    if (imgs.length === 4) return (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {imgs.map((src, idx) => (
                          <Image key={idx} src={src} alt={`${proj.name} ${idx + 1}`}
                            width={800} height={500}
                            className="rounded-lg w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setLightbox({ images: imgs, index: idx })}
                            onContextMenu={e => e.preventDefault()} draggable={false}
                          />
                        ))}
                      </div>
                    )
                    return (
                      <div className="mb-3 space-y-2">
                        {imgs.map((src, idx) => (
                          <Image key={idx} src={src} alt={`${proj.name} ${idx + 1}`}
                            width={1200} height={800}
                            className="rounded-lg w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setLightbox({ images: imgs, index: idx })}
                            onContextMenu={e => e.preventDefault()} draggable={false}
                          />
                        ))}
                      </div>
                    )
                  })()}

                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,83,61,0.08)', color: '#FF533D', border: '1px solid rgba(255,83,61,0.2)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {lightbox && <Lightbox images={lightbox.images} index={lightbox.index} onClose={() => setLightbox(null)} />}
    </div>
  )
}

import ScrollReveal from './ScrollReveal'

export default function Experience() {
  const [selected, setSelected] = useState<Experience | null>(null)

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <span className="label">03 / Experience</span>
          <div className="section-divider" style={{ margin: '12px auto 28px' }} />
          <h2 className="font-mono font-bold text-2xl" style={{ color: '#F5F5F5' }}>Work History</h2>
          <p className="text-sm mt-2" style={{ color: '#AB987A' }}>Click a card to see project details</p>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 100}>
          <div className="card cursor-pointer p-6" onClick={() => setSelected(exp)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                  <h3 className="font-mono font-bold truncate" style={{ color: '#F5F5F5' }}>{exp.company}</h3>
                </div>
                <p className="font-mono text-sm ml-5" style={{ color: exp.color }}>{exp.role}</p>
                <div className="flex flex-wrap gap-4 mt-2 ml-5">
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#AB987A' }}>
                    <Calendar size={11} /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#AB987A' }}>
                    <MapPin size={11} /> {exp.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-5 sm:ml-0 flex-shrink-0">
                <span
                  className="font-mono text-xs px-3 py-1 rounded-full"
                  style={{ border: '1px solid #243048', color: '#AB987A' }}
                >
                  {exp.projects.length} project{exp.projects.length > 1 ? 's' : ''}
                </span>
                <ExternalLink size={15} style={{ color: '#AB987A' }} />
              </div>
            </div>
            <p className="text-xs mt-3 ml-5 leading-relaxed" style={{ color: '#AB987A' }}>
              {exp.summary.slice(0, 120)}...
            </p>
          </div>
          </ScrollReveal>
        ))}
      </div>

      {selected && <Modal exp={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
