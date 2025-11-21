import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Système Commercial AI - Agents Intelligents',
  description: 'Système de gestion commerciale avec agents IA pour automatiser les ventes, support client et analyses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
