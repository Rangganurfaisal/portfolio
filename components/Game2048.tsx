'use client'
import { useState, useEffect, useCallback } from 'react'

type Board = (number | null)[][]

function createEmpty(): Board {
  return Array(4).fill(null).map(() => Array(4).fill(null))
}

function addRandom(board: Board): Board {
  const empty: [number, number][] = []
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!board[r][c]) empty.push([r, c])
  if (!empty.length) return board
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  const next = board.map(row => [...row])
  next[r][c] = Math.random() < 0.9 ? 2 : 4
  return next
}

function initBoard(): Board {
  return addRandom(addRandom(createEmpty()))
}

function slideRow(row: (number | null)[]): { row: (number | null)[]; score: number } {
  const nums = row.filter(Boolean) as number[]
  let score = 0
  const merged: number[] = []
  let i = 0
  while (i < nums.length) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      merged.push(nums[i] * 2)
      score += nums[i] * 2
      i += 2
    } else {
      merged.push(nums[i])
      i++
    }
  }
  while (merged.length < 4) merged.push(0)
  return { row: merged.map(v => v || null), score }
}

function move(board: Board, dir: 'left' | 'right' | 'up' | 'down'): { board: Board; score: number; moved: boolean } {
  let totalScore = 0
  const transpose = (g: Board): Board => g[0].map((_, c) => g.map(r => r[c]))

  // Normalize so we always slide left
  let grid = board.map(r => [...r])
  if (dir === 'right') grid = grid.map(r => [...r].reverse())
  if (dir === 'up') grid = transpose(grid)
  if (dir === 'down') { grid = transpose(grid); grid = grid.map(r => [...r].reverse()) }

  const slid: Board = grid.map(row => {
    const { row: s, score } = slideRow(row)
    totalScore += score
    return s
  })

  // Undo normalization
  let result = slid
  if (dir === 'right') result = result.map(r => [...r].reverse())
  if (dir === 'up') result = transpose(result)
  if (dir === 'down') { result = result.map(r => [...r].reverse()); result = transpose(result) }

  const moved = JSON.stringify(board) !== JSON.stringify(result)
  return { board: result, score: totalScore, moved }
}

function isGameOver(board: Board): boolean {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (!board[r][c]) return false
      if (c < 3 && board[r][c] === board[r][c + 1]) return false
      if (r < 3 && board[r][c] === board[r + 1][c]) return false
    }
  return true
}

const TILE_COLORS: Record<number, { bg: string; color: string }> = {
  2:    { bg: '#243048', color: '#F5F5F5' },
  4:    { bg: '#2d3d5a', color: '#F5F5F5' },
  8:    { bg: '#ff8c42', color: '#fff' },
  16:   { bg: '#ff6b35', color: '#fff' },
  32:   { bg: '#FF533D', color: '#fff' },
  64:   { bg: '#e63c2a', color: '#fff' },
  128:  { bg: '#c0392b', color: '#fff' },
  256:  { bg: '#f39c12', color: '#fff' },
  512:  { bg: '#e67e22', color: '#fff' },
  1024: { bg: '#d35400', color: '#fff' },
  2048: { bg: '#f1c40f', color: '#fff' },
}

interface Props {
  playerName: string
  onGameOver: (score: number) => void
}

export default function Game2048({ playerName, onGameOver }: Props) {
  const [board, setBoard] = useState<Board>(initBoard)
  const [score, setScore] = useState(0)
  const [over, setOver] = useState(false)

  const doMove = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    if (over) return
    setBoard(prev => {
      const { board: next, score: gained, moved } = move(prev, dir)
      if (!moved) return prev
      const withNew = addRandom(next)
      setScore(s => {
        const total = s + gained
        if (isGameOver(withNew)) {
          setOver(true)
          onGameOver(total)
        }
        return total
      })
      return withNew
    })
  }, [over, onGameOver])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
        ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
      }
      if (map[e.key]) { e.preventDefault(); doMove(map[e.key]) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [doMove])

  // touch swipe
  useEffect(() => {
    let startX = 0, startY = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) > Math.abs(dy)) doMove(dx > 0 ? 'right' : 'left')
      else doMove(dy > 0 ? 'down' : 'up')
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd) }
  }, [doMove])

  return (
    <div style={{ userSelect: 'none' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm" style={{ color: '#AB987A' }}>
          Player: <span style={{ color: '#FF533D' }}>{playerName}</span>
        </span>
        <span className="font-mono text-sm" style={{ color: '#F5F5F5' }}>
          Score: <span style={{ color: '#FF533D', fontWeight: 'bold' }}>{score}</span>
        </span>
      </div>

      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px', background: '#0a0f1a', borderRadius: '8px', padding: '8px',
        }}
      >
        {board.flat().map((val, i) => {
          const style = val ? TILE_COLORS[val] ?? { bg: '#a855f7', color: '#fff' } : { bg: '#162030', color: 'transparent' }
          return (
            <div
              key={i}
              style={{
                background: style.bg, color: style.color,
                borderRadius: '6px', aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontWeight: 'bold',
                fontSize: val && val >= 1024 ? '1rem' : val && val >= 128 ? '1.2rem' : '1.4rem',
                transition: 'background 0.1s',
              }}
            >
              {val || ''}
            </div>
          )
        })}
      </div>

      <p className="font-mono text-xs mt-3 text-center" style={{ color: '#AB987A' }}>
        Arrow keys / swipe to move
      </p>
    </div>
  )
}