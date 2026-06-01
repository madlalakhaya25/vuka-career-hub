import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Vuka Career Hub',
    default: 'Vuka Career Hub — Your Post-Matric Guide',
  },
  description:
    "South Africa's most comprehensive guide to TVET colleges, universities, learnerships, bursaries, and in-demand careers. Find your path after matric.",
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
      <body className="min-h-full flex flex-col antialiased bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
