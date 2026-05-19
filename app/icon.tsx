import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0F1626',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
      }}
    >
      <span
        style={{
          color: '#FF533D',
          fontSize: 13,
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '-0.5px',
        }}
      >
        RNF
      </span>
    </div>,
    { ...size }
  )
}
