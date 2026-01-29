'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const projects = [
  {
    title: 'Complyr',
    type: 'Eigenes Venture',
    description: 'AI-Compliance-Plattform für regulierte Schweizer Industrien. Automatisierte Prüfungen, Policy-Management, Audit-Trails.',
    result: 'In Beta. Erste Kunden onboarded.',
    metric: 'Beta Live',
    tech: ['Next.js', 'Supabase', 'OpenAI', 'Vercel'],
    year: '2024',
  },
  {
    title: 'Swiss Foundation',
    type: 'Kunde',
    description: 'Backoffice-Automatisierung für eine Schweizer Stiftung. Dokumentenverarbeitung, Workflow-Optimierung.',
    result: '40% Kostenreduktion in 3 Monaten.',
    metric: '-40% Kosten',
    tech: ['Process Automation', 'AI Integration'],
    year: '2024',
  },
  {
    title: 'Luxury Brand',
    type: 'Kunde',
    description: 'Digitale Transformation für eine Schweizer Luxusmarke. Prozessoptimierung und strategische Automatisierung.',
    result: '60% schnellere Prozesse.',
    metric: '+60% Speed',
    tech: ['Strategic Automation'],
    year: '2023',
  },
  {
    title: 'International Artist',
    type: 'Kunde',
    description: 'Backoffice-Management und Prozessdigitalisierung für einen internationalen Künstler.',
    result: 'Vollständige Digitalisierung.',
    metric: '100% Digital',
    tech: ['Backoffice Automation'],
    year: '2023',
  },
  {
    title: 'AI Audit Study',
    type: 'Kunde',
    description: 'Umfassender AI-Readiness-Audit für ein mittelständisches Unternehmen. Assessment, Roadmap, Quick Wins.',
    result: '5 sofort umsetzbare Quick Wins identifiziert.',
    metric: '5 Quick Wins',
    tech: ['AI Assessment', 'Strategic Planning'],
    year: '2023',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-bg-secondary rounded-2xl border border-border group-hover:border-accent/30 transition-colors duration-300 overflow-hidden">
        {/* Top Bar with Year & Type */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <span className="text-text-tertiary text-sm">{project.year}</span>
          <span className="text-xs text-text-tertiary uppercase tracking-wider">{project.type}</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-text-primary font-medium text-xl">{project.title}</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 whitespace-nowrap">
              {project.metric}
            </span>
          </div>

          <p className="text-text-secondary leading-relaxed mb-4">{project.description}</p>

          <p className="text-accent text-sm font-medium mb-4">{project.result}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-text-tertiary bg-bg-tertiary rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function WorkPage() {
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
              Work
            </h1>
            <p className="text-text-secondary text-lg max-w-xl">
              Ausgewählte Projekte — von eigenen Ventures bis zu Kundenaufträgen.
              Immer mit einem Ziel: Messbare Ergebnisse liefern.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-8 mb-16 py-8 border-y border-border"
          >
            {[
              { value: '5+', label: 'Projekte' },
              { value: '3', label: 'Jahre AI-Exp.' },
              { value: '100%', label: 'Kundenzufriedenheit' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-accent mb-1">{stat.value}</div>
                <div className="text-text-tertiary text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={`project-${index}`} project={project} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-text-secondary mb-6">
              Haben Sie ein ähnliches Projekt? Lassen Sie uns darüber sprechen.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              <span>Projekt besprechen</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
