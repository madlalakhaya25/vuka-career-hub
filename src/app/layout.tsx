import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080d1a',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Vuka Career Hub',
    default: 'Vuka Career Hub — Your Post-Matric Guide',
  },
  description:
    "Free guides on TVET colleges, universities, learnerships, bursaries, and careers in South Africa. Everything you need after matric, in one place.",
  keywords: [
    'TVET colleges', 'learnerships 2025', 'bursaries South Africa',
    'what to study after matric', 'APS score calculator', 'NSFAS', 'NYDA',
    'careers South Africa',
  ],
  openGraph: {
    siteName: 'Vuka Career Hub',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
