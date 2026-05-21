const certs = [
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
  },
  {
    name: 'ML Practitioner Certificate',
    issuer: 'Dataiku',
    year: '2026',
  },
  {
    name: 'Data Science & AI',
    issuer: 'Startup Campus x Kampus Merdeka, MSIB Batch 6',
    year: '2024',
  },
]

import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section id="about-me" className="max-w-4xl mx-auto px-6 py-24">

      <ScrollReveal>
        <div className="mb-10 text-center">
          <span className="label">01 / About</span>
          <div className="section-divider" style={{ margin: '12px auto 28px' }} />
          <h2 className="font-mono font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5F5F5' }}>
            About Me
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <p
          className="text-sm leading-relaxed text-center mx-auto mb-12"
          style={{ color: '#AB987A', maxWidth: '620px', fontSize: '0.95rem', textWrap: 'balance' } as React.CSSProperties}
        >
          Informatics graduate from Telkom University with a focus on Data Science and AI.
          My experience spans the full ML pipeline — from data processing and feature engineering
          to model building and deployment. I have built production-ready AI systems across FMCG
          and Oil & Gas industries, creating solutions that go beyond experiments and deliver
          measurable impact in real operational environments.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-4">
        <ScrollReveal delay={150}>
          <div className="card p-5 flex items-start gap-4">
            <span className="text-2xl mt-0.5">🎓</span>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#AB987A' }}>Education</p>
              <p className="font-mono font-bold text-sm" style={{ color: '#FF533D' }}>S1 Informatics</p>
              <p className="text-sm mt-0.5" style={{ color: '#F5F5F5' }}>Telkom University</p>
              <p className="font-mono text-xs mt-1" style={{ color: '#AB987A' }}>2021 – 2025</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏅</span>
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#AB987A' }}>Certifications</p>
            </div>
            <div>
              {certs.map((cert, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: '1px', background: '#243048', margin: '10px 0' }} />}
                  <p className="text-sm font-medium leading-snug" style={{ color: '#F5F5F5' }}>{cert.name}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: '#AB987A' }}>{cert.issuer} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
