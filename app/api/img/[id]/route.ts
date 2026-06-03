import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MAP: Record<string, { file: string; type: string }> = {
  im001: { file: 'apd-1.jpg',          type: 'image/jpeg' },
  im002: { file: 'apd-2.jpg',          type: 'image/jpeg' },
  im003: { file: 'apd-3.jpg',          type: 'image/jpeg' },
  im004: { file: 'apd-4.jpg',          type: 'image/jpeg' },
  im005: { file: 'ict intern/1.png',   type: 'image/png'  },
  im006: { file: 'ict intern/2.png',   type: 'image/png'  },
  im007: { file: 'ict intern/3.png',   type: 'image/png'  },
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const entry = MAP[id]
  if (!entry) return new NextResponse('Not found', { status: 404 })

  const filePath = path.join(process.cwd(), 'public', entry.file)
  try {
    const buf = fs.readFileSync(filePath)
    return new NextResponse(buf, {
      headers: {
        'Content-Type': entry.type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}