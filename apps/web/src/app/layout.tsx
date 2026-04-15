import type { Metadata } from 'next'
import { Lato, DM_Sans } from 'next/font/google'
import './globals.css'

// Configuração das fontes
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'CampLog — Onde os devs e a comunidade se reúnem',
  description:
    'Crie sua comunidade, se junte a uma, mantenha ou consulte uma wiki, controle e reporte bugs, tudo em um só lugar para você.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
