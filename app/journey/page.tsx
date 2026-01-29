'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const timeline = [
  {
    year: '2014',
    title: 'Zurich Versicherung',
    text: 'Mit 17 in die Versicherung. Die Branche von Grund auf gelernt — Schaden, Underwriting, Kundenbetreuung.',
    highlight: false,
  },
  {
    year: '2016',
    title: 'Swiss First Broker Partners',
    text: 'Leiter Innendienst. Operative Verantwortung, Team-Koordination, Prozessoptimierung.',
    highlight: false,
  },
  {
    year: '2021',
    title: 'Pearl River Treuhand, Co-Founder',
    text: 'Treuhandgesellschaft von Null aufgebaut. Gelernt was es heisst, etwas zu besitzen. Exit.',
    highlight: true,
  },
  {
    year: '2022',
    title: 'Youplus Assurance AG',
    text: 'Senior Administrator im PPLI-Bereich. Digitalisierung und KI-Implementation in reguliertem Umfeld.',
    highlight: false,
  },
  {
    year: '2022',
    title: 'Der AI-Moment',
    text: 'ChatGPT launched. Sofort angefangen zu lernen. Self-taught. Innerhalb von Monaten: AI-Implementierung bei der Arbeit und erste Kundenprojekte.',
    highlight: true,
  },
  {
    year: '2024',
    title: 'Complyr',
    text: 'Eigene AI-Compliance-Plattform gestartet. Aktuell in Beta. Parallel: ausgewählte Kundenprojekte und Equity-Partnerschaften.',
    highlight: true,
  },
  {
    year: 'Heute',
    title: 'Wo ich stehe',
    text: 'Strategischer Aufbau mit bewusst selektiver Verfügbarkeit. Volle Unabhängigkeit ist das Ziel — aber nicht auf Kosten von Qualität. Ich nehme nur Projekte an, bei denen ich echten Impact liefern kann.',
    highlight: true,
  },
]

const skills = [
  { category: 'AI & Automation', items: ['OpenAI API', 'LangChain', 'Process Automation', 'Workflow Design'] },
  { category: 'Tech Stack', items: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind'] },
  { category: 'Branchen', items: ['Versicherung', 'Treuhand', 'Finance', 'Compliance', 'Backoffice'] },
  { category: 'Soft Skills', items: ['Schnelle Umsetzung', 'Pragmatismus', 'Selbstständigkeit', 'Eigenverantwortung'] },
]

function TimelineItem({ entry, index }: { entry: typeof timeline[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline Dot */}
      <motion.div
        className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 ${entry.highlight
          ? 'bg-accent border-accent'
          : 'bg-bg-primary border-text-tertiary'
          }`}
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      />

      {/* Content */}
      <div className={`pb-12 ${entry.highlight ? 'border-l-2 border-accent/30 -ml-[1px] pl-[31px] md:pl-[47px]' : ''}`}>
        <span className={`font-serif text-lg ${entry.highlight ? 'text-accent' : 'text-text-tertiary'}`}>
          {entry.year}
        </span>
        <h2 className="text-text-primary font-medium mt-1 mb-2 text-lg">{entry.title}</h2>
        <p className="text-text-secondary leading-relaxed">{entry.text}</p>
      </div>
    </motion.div>
  )
}

export default function JourneyPage() {
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
              Journey
            </h1>
            <p className="text-text-secondary text-lg max-w-xl">
              Von der Versicherungslehre zu AI Implementation.
              10 Jahre, die mich zu dem gemacht haben, der ich heute bin.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-8 border-y border-border"
          >
            {[
              { value: '10+', label: 'Jahre Erfahrung' },
              { value: '5', label: 'Unternehmen' },
              { value: '1', label: 'Exit' },
              { value: '∞', label: 'Learnings' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-accent mb-1">{stat.value}</div>
                <div className="text-text-tertiary text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-2xl text-text-primary mb-8"
              >
                Timeline
              </motion.h2>
              <div className="border-l border-border">
                {timeline.map((entry, index) => (
                  <TimelineItem key={`timeline-${index}`} entry={entry} index={index} />
                ))}
              </div>
            </div>

            {/* Skills Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif text-2xl text-text-primary mb-8"
                >
                  Skills & Expertise
                </motion.h2>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-text-primary font-medium mb-3">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm text-text-secondary bg-bg-secondary border border-border rounded-full hover:border-accent/30 hover:text-accent transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Philosophy Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-6 bg-bg-secondary rounded-xl border border-border"
                >
                  <h3 className="text-text-primary font-medium mb-3">Meine Philosophie</h3>
                  <blockquote className="text-text-secondary text-sm italic leading-relaxed">
                    "Erst verstehen, dann handeln. Erst liefern, dann verrechnen.
                    Keine Floskeln, nur Ergebnisse."
                  </blockquote>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
