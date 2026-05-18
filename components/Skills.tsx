import {
  SiPython, SiPandas, SiNumpy, SiMysql,
  SiTensorflow, SiOpencv, SiPytorch, SiOpenai, SiFlask,
} from 'react-icons/si'
import { Crosshair, Wrench, Filter, TrendingUp } from 'lucide-react'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

type SkillIcon =
  | { type: 'si';     Icon: IconType;   color: string }
  | { type: 'lucide'; Icon: LucideIcon; color: string }
  | { type: 'text';   label: string;    color: string }

interface Skill { name: string; icon: SkillIcon }

const skillGroups: { category: string; skills: Skill[] }[] = [
  {
    category: 'Data & Analysis',
    skills: [
      { name: 'Python',   icon: { type: 'si',   Icon: SiPython,  color: '#3776AB' } },
      { name: 'Pandas',   icon: { type: 'si',   Icon: SiPandas,  color: '#150458' } },
      { name: 'NumPy',    icon: { type: 'si',   Icon: SiNumpy,   color: '#4DABCF' } },
      { name: 'SQL',      icon: { type: 'si',   Icon: SiMysql,   color: '#4479A1' } },
      { name: 'Power BI',   icon: { type: 'text',   label: 'PBI',          color: '#F2C811' } },
      { name: 'Excel',      icon: { type: 'text',   label: 'XLS',          color: '#217346' } },
      { name: 'Data Cleaning',     icon: { type: 'lucide', Icon: Filter,     color: '#64B5F6' } },
    ],
  },
  {
    category: 'Machine Learning & AI',
    skills: [
      { name: 'Deep Learning',   icon: { type: 'si',   Icon: SiPytorch,    color: '#EE4C2C' } },
      { name: 'Computer Vision', icon: { type: 'si',   Icon: SiOpencv,     color: '#5C3EE8' } },
      { name: 'RAG / LLM',       icon: { type: 'si',   Icon: SiOpenai,     color: '#10A37F' } },
      { name: 'TensorFlow',      icon: { type: 'si',   Icon: SiTensorflow, color: '#FF6F00' } },
      { name: 'Predictive Model', icon: { type: 'lucide', Icon: TrendingUp, color: '#FF533D' } },
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'YOLO',    icon: { type: 'lucide', Icon: Crosshair, color: '#FF533D' } },
      { name: 'Flask',   icon: { type: 'si',     Icon: SiFlask,   color: '#F5F5F5' } },
      { name: 'n8n',     icon: { type: 'text',   label: 'n8n',    color: '#EA4B71' } },
      { name: 'Dataiku', icon: { type: 'lucide', Icon: Wrench,    color: '#2AB1AC' } },
    ],
  },
]

function SkillIcon({ icon }: { icon: SkillIcon }) {
  const base: React.CSSProperties = {
    width: '44px', height: '44px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: `1.5px solid ${icon.color}40`,
    marginBottom: '8px', flexShrink: 0,
  }
  if (icon.type === 'text') return (
    <div style={base}>
      <span style={{ color: icon.color, fontFamily: 'monospace', fontWeight: 700, fontSize: '0.68rem' }}>
        {icon.label}
      </span>
    </div>
  )
  const { Icon } = icon
  return <div style={base}><Icon size={22} style={{ color: icon.color }} /></div>
}

export default function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
      <div className="mb-12 text-center">
        <span className="label">02 / Skills</span>
        <div className="section-divider" style={{ margin: '12px auto 28px' }} />
        <h2 className="font-mono font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5F5F5' }}>
          Technical Expertise
        </h2>
      </div>

      <div className="space-y-10">
        {skillGroups.map(group => (
          <div key={group.category}>
            <p className="font-mono text-xs mb-5 tracking-widest uppercase text-center" style={{ color: '#AB987A' }}>
              {group.category}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.skills.map(skill => (
                <div key={skill.name} className="skill-pill" style={{ width: '110px', flexShrink: 0 }}>
                  <SkillIcon icon={skill.icon} />
                  <span className="font-mono text-xs text-center leading-tight" style={{ color: '#F5F5F5' }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
