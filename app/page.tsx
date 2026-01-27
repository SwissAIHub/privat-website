'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

const projects = [
  {
    title: 'Complyr',
    type: 'Eigenes Venture',
    description: 'AI-Compliance-Plattform fuer regulierte Schweizer Industrien.',
  },
  {
    title: 'Swiss Foundation',
    type: 'Kunde',
    description: 'Backoffice-Automatisierung. 40% Kostenreduktion.',
  },
  {
    title: 'Luxury Brand',
    type: 'Kunde',
    description: 'Digitale Transformation und Prozessoptimierung.',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">

          {/* Intro */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="mb-32"
          >
            <motion.h1
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl md:text-6xl text-text-primary mb-4"
            >
              Florian Schatz
            </motion.h1>
            <motion.p
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg text-text-secondary mb-2"
            >
              AI Implementation. Regulated Finance. Building Complyr.
            </motion.p>
            <motion.p
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm text-text-tertiary"
            >
              Flums, Schweiz
            </motion.p>
          </motion.section>

          {/* Aktuell */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-32"
          >
            <h2 className="font-serif text-2xl text-text-primary mb-6">Aktuell</h2>
            <div className="border-t border-border pt-6 space-y-3 text-text-secondary">
              <p>Senior Administrator, Youplus Assurance AG</p>
              <p>Building Complyr — AI Compliance, Beta</p>
              <p>Ausgewaehlte AI-Implementierungsprojekte</p>
            </div>
          </motion.section>

          {/* Ausgewaehlte Arbeit */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-32"
          >
            <h2 className="font-serif text-2xl text-text-primary mb-6">Ausgewaehlte Arbeit</h2>
            <div className="border-t border-border">
              {projects.map((project) => (
                <div key={project.title} className="py-6 border-b border-border">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-text-primary font-medium">{project.title}</h3>
                    <span className="text-sm text-text-tertiary">{project.type}</span>
                  </div>
                  <p className="text-text-secondary text-sm">{project.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/work" className="text-sm text-accent hover:underline">
                Alle Projekte ansehen
              </Link>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-text-secondary">
              Interesse an einer Zusammenarbeit?{' '}
              <Link href="/contact" className="text-accent hover:underline">
                Kontakt aufnehmen
              </Link>
            </p>
          </motion.section>

        </div>
      </main>
      <Footer />
    </>
  )
}
