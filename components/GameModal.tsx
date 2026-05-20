'use client'
import { useState, useEffect } from 'react'
import { X, Trophy, RotateCcw, Play } from 'lucide-react'
import Game2048 from './Game2048'

interface LeaderboardEntry {
  name: string
  score: number
  date: string
}

const LS_KEY = 'rnf_2048_leaderboard'

function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveScore(name: string, score: number) {
  const entries = getLeaderboard()
  entries.push({ name, score, date: new Date().toLocaleDateString('id-ID') })
  entries.sort((a, b) => b.score - a.score)
  localStorage.setItem(LS_KEY, JSON.stringify(entries.slice(0, 10)))
}

type Screen = 'input' | 'game' | 'gameover' | 'leaderboard'

interface Props {
  onClose: () => void
}

export default function GameModal({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>('input')
  const [name, setName] = useState('')
  const [finalScore, setFinalScore] = useState(0)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    setLeaderboard(getLeaderboard())
  }, [screen])

  const handleStart = () => {
    if (!name.trim()) return
    setScreen('game')
  }

  const handleGameOver = (score: number) => {
    setFinalScore(score)
    saveScore(name.trim(), score)
    setLeaderboard(getLeaderboard())
    setScreen('gameover')
  }

  const handleRestart = () => {
    setGameKey(k => k + 1)
    setScreen('game')
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,15,26,0.85)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#162030', border: '1px solid #243048',
          borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg" style={{ color: '#FF533D' }}>2048</span>
            <span className="font-mono text-xs" style={{ color: '#AB987A' }}>easter egg 🎮</span>
          </div>
          <div className="flex items-center gap-2">
            {screen === 'game' && (
              <button
                onClick={() => setScreen('leaderboard')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#AB987A', padding: '4px' }}
                title="Leaderboard"
              >
                <Trophy size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              style={{ background: '#243048', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#F5F5F5' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Screen: Name Input */}
        {screen === 'input' && (
          <div>
            <p className="font-mono text-sm mb-6 text-center" style={{ color: '#AB987A' }}>
              Reach <span style={{ color: '#FF533D', fontWeight: 'bold' }}>2048</span> to win!
            </p>
            <div className="mb-3">
              <label className="font-mono text-xs block mb-2" style={{ color: '#AB987A' }}>Your name</label>
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name..."
                style={{
                  width: '100%', background: '#0F1626', border: '1px solid #243048',
                  borderRadius: '8px', padding: '10px 14px', color: '#F5F5F5',
                  fontFamily: 'monospace', fontSize: '0.9rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              onClick={handleStart}
              disabled={!name.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2"
              style={{ opacity: name.trim() ? 1 : 0.4, width: '100%', justifyContent: 'center' }}
            >
              <Play size={15} /> Start Game
            </button>
            {leaderboard.length > 0 && (
              <button
                onClick={() => setScreen('leaderboard')}
                className="w-full mt-2 font-mono text-xs"
                style={{ background: 'none', border: 'none', color: '#AB987A', cursor: 'pointer', padding: '8px' }}
              >
                View Leaderboard →
              </button>
            )}
          </div>
        )}

        {/* Screen: Game */}
        {screen === 'game' && (
          <Game2048 key={gameKey} playerName={name} onGameOver={handleGameOver} />
        )}

        {/* Screen: Game Over */}
        {screen === 'gameover' && (
          <div className="text-center">
            <p className="font-mono font-bold text-xl mb-1" style={{ color: '#FF533D' }}>Game Over!</p>
            <p className="font-mono text-sm mb-1" style={{ color: '#AB987A' }}>{name}</p>
            <p className="font-mono text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>{finalScore}</p>

            <div className="mb-6" style={{ background: '#0F1626', borderRadius: '8px', padding: '12px' }}>
              <p className="font-mono text-xs mb-3" style={{ color: '#AB987A' }}>TOP 5</p>
              {leaderboard.slice(0, 5).map((e, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span className="font-mono text-xs" style={{ color: i === 0 ? '#FF533D' : '#AB987A' }}>
                    #{i + 1} {e.name}
                  </span>
                  <span className="font-mono text-xs font-bold" style={{ color: '#F5F5F5' }}>{e.score}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={handleRestart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <RotateCcw size={14} /> Play Again
              </button>
              <button onClick={() => setScreen('leaderboard')} className="btn-outline flex-1 flex items-center justify-center gap-2">
                <Trophy size={14} /> Leaderboard
              </button>
            </div>
          </div>
        )}

        {/* Screen: Leaderboard */}
        {screen === 'leaderboard' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} style={{ color: '#FF533D' }} />
              <span className="font-mono font-bold text-sm" style={{ color: '#F5F5F5' }}>Leaderboard</span>
            </div>

            {leaderboard.length === 0 ? (
              <p className="font-mono text-sm text-center py-6" style={{ color: '#AB987A' }}>No scores yet. Be the first!</p>
            ) : (
              <div style={{ background: '#0F1626', borderRadius: '8px', padding: '12px' }}>
                {leaderboard.map((e, i) => (
                  <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < leaderboard.length - 1 ? '1px solid #243048' : 'none' }}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs w-6" style={{ color: i === 0 ? '#FF533D' : '#AB987A' }}>
                        #{i + 1}
                      </span>
                      <div>
                        <p className="font-mono text-sm" style={{ color: '#F5F5F5' }}>{e.name}</p>
                        <p className="font-mono text-xs" style={{ color: '#AB987A' }}>{e.date}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm" style={{ color: i === 0 ? '#FF533D' : '#F5F5F5' }}>
                      {e.score}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setScreen(name ? 'game' : 'input')}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
            >
              <Play size={14} /> {name ? 'Back to Game' : 'Play'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}