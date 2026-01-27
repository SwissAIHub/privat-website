import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Ausgewaehlte Projekte — Kundenprojekte und eigene Ventures.',
}

const projects = [
  {
    title: 'Complyr',
    type: 'Eigenes Venture',
    description: 'AI-Compliance-Plattform fuer regulierte Schweizer Industrien. Automatisierte Pruefungen, Policy-Management, Audit-Trails. Aktuell in Beta.',
    tech: 'Next.js, Supabase, OpenAI, Vercel',
  },
  {
    title: 'Swiss Foundation',
    type: 'Kunde',
    description: 'Backoffice-Automatisierung fuer eine Schweizer Stiftung. Dokumentenverarbeitung, Workflow-Optimierung. 40% Kostenreduktion.',
    tech: 'Process Automation, AI Integration',
  },
  {
    title: 'Luxury Brand',
    type: 'Kunde',
    description: 'Digitale Transformation fuer eine Schweizer Luxusmarke. Prozessoptimierung und strategische Automatisierung.',
    tech: 'Strategic Automation',
  },
  {
    title: 'International Artist',
    type: 'Kunde',
    description: 'Backoffice-Management und Prozessdigitalisierung fuer einen internationalen Kuenstler.',
    tech: 'Backoffice Automation',
  },
  {
    title: 'AI Audit Study',
    type: 'Kunde',
    description: 'Umfassender AI-Readiness-Audit fuer ein mittelstaendisches Unternehmen. Assessment, Roadmap, Quick Wins.',
    tech: 'AI Assessment, Strategic Planning',
  },
]

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 md:px-8 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-16">Work</h1>

          <div className="border-t border-border">
            {projects.map((project) => (
              <div key={project.title} className="py-8 border-b border-border">
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="text-text-primary font-medium text-lg">{project.title}</h2>
                  <span className="text-sm text-text-tertiary">{project.type}</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">{project.description}</p>
                <p className="text-text-tertiary text-xs">{project.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
