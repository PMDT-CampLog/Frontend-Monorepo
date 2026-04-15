import type { Metadata } from 'next'
import { Lato, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'CampLog — Onde os devs e a comunidade se reuniem',
  description:
    'Crie sua comunidade, se junte a uma, mantenha ou consulte uma wiki, controle e reporte bugs, tudo em um só lugar para você.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${dmSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
