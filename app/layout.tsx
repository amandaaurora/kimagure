import type { Metadata, Viewport } from 'next'
import { Courier_Prime } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

// Latin UI text (topbar, gloss, button) — self-hosted via next/font/google
const courier = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier',
})

// Hero word 気まぐれ — self-hosted woff2 subset (4 glyphs only, OFL licensed)
const mochiy = localFont({
  src: './fonts/MochiyPopPOne-kimagure.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-mochiy',
})

export const metadata: Metadata = {
  title: '気まぐれ · caprichos',
  description: 'caprichos — made for the fun of it.',
}

// Render light-only; emits <meta name="color-scheme" content="only light"> so
// mobile browsers don't force/auto-dark this light pastel design.
export const viewport: Viewport = {
  colorScheme: 'only light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${courier.variable} ${mochiy.variable}`}>
        {children}
      </body>
    </html>
  )
}
