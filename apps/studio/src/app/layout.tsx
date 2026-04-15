import type { Metadata } from 'next'
import { DM_Sans, Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'CampLog Studio',
  description: 'Dashboard de criadores do CampLog.',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${lato.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  )
}
