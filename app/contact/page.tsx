'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ContactForm from '@/components/sections/contact-form'

const contactOptions = [
  {
    title: 'Email',
    value: 'hello@florianschatz.com',
    href: 'mailto:hello@florianschatz.com',
    description: 'Für alle Anfragen und Projektgespräche',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    value: 'linkedin.com/in/florian-schatz',
    href: 'https://www.linkedin.com/in/florian-schatz',
    description: 'Für Networking und professionelle Kontakte',
    external: true,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

const availabilityInfo = {
  status: 'Verfügbar',
  slots: '1 Projekt-Slot frei',
  response: 'Antwort innerhalb 24h',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 md:px-8 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="font-serif text-5xl md:text-6xl text-text-primary mb-6">
              Kontakt
            </h1>
            <p className="text-text-secondary text-lg max-w-xl">
              Haben Sie ein Projekt? Lassen Sie uns darüber sprechen.
              Keine Vorauszahlungen, erst Ergebnisse.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Availability Status */}
              <div className="p-6 bg-bg-secondary rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-text-primary font-medium">{availabilityInfo.status}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Verfügbarkeit:</span>
                    <span className="text-text-primary">{availabilityInfo.slots}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Antwortzeit:</span>
                    <span className="text-text-primary">{availabilityInfo.response}</span>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={option.title}
                    href={option.href}
                    target={option.external ? '_blank' : undefined}
                    rel={option.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-bg-secondary transition-all group"
                  >
                    <div className="text-accent group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-text-primary font-medium">{option.title}</h3>
                      <p className="text-accent text-sm">{option.value}</p>
                      <p className="text-text-tertiary text-xs mt-1">{option.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Info */}
              <div className="p-6 bg-bg-secondary/50 rounded-xl border border-border/50">
                <h3 className="text-text-primary font-medium mb-3">Was Sie erwarten können</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    Kostenloses Erstgespräch
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    Klare Einschätzung der Umsetzbarkeit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    Keine Verpflichtungen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    Erst Arbeit, dann Bezahlung
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-8 bg-bg-secondary rounded-2xl border border-border">
                <h2 className="text-text-primary font-medium text-xl mb-2">Nachricht senden</h2>
                <p className="text-text-secondary text-sm mb-8">
                  Beschreiben Sie kurz Ihr Projekt. Ich melde mich innerhalb von 24 Stunden.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
