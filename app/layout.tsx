import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Rangga Nur Faisal',
  description: 'Portfolio of Rangga Nur Faisal — Data Scientist and AI Engineer specializing in end-to-end AI solutions for FMCG and Oil & Gas industries.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
