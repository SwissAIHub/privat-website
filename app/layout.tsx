import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Florian Schatz',
    template: '%s — Florian Schatz',
  },
  description:
    'AI Implementation, Regulated Finance, Complyr. Schweiz.',
  keywords: ['AI Implementation', 'Complyr', 'Regulated Finance', 'Schweiz'],
  authors: [{ name: 'Florian Schatz' }],
  creator: 'Florian Schatz',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://florianschatz.com',
    title: 'Florian Schatz',
    description: 'AI Implementation, Regulated Finance, Complyr. Schweiz.',
    siteName: 'Florian Schatz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florian Schatz',
    description: 'AI Implementation, Regulated Finance, Complyr. Schweiz.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Florian Schatz',
  jobTitle: 'AI Implementation',
  description: 'AI Implementation, Regulated Finance, Building Complyr',
  url: 'https://florianschatz.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Flums',
    addressCountry: 'CH',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent focus:text-bg-primary focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
