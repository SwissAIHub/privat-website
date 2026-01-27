import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Journey',
  description: 'Von der Versicherungslehre zu AI Implementation.',
}

const timeline = [
  {
    year: '2014',
    title: 'Zurich Versicherung',
    text: 'Mit 17 in die Versicherung. Die Branche von Grund auf gelernt — Schaden, Underwriting, Kundenbetreuung.',
  },
  {
    year: '2016',
    title: 'Swiss First Broker Partners',
    text: 'Leiter Innendienst. Operative Verantwortung, Team-Koordination, Prozessoptimierung.',
  },
  {
    year: '2021',
    title: 'Pearl River Treuhand, Co-Founder',
    text: 'Treuhandgesellschaft von Null aufgebaut. Gelernt was es heisst, etwas zu besitzen. Exit.',
  },
  {
    year: '2022',
    title: 'Youplus Assurance AG',
    text: 'Senior Administrator im PPLI-Bereich. Digitalisierung und KI-Implementation in reguliertem Umfeld.',
  },
  {
    year: '2022',
    title: 'Der AI-Moment',
    text: 'ChatGPT launched. Sofort angefangen zu lernen. Self-taught. Innerhalb von Monaten: AI-Implementierung bei der Arbeit und erste Kundenprojekte.',
  },
  {
    year: '2024',
    title: 'Complyr',
    text: 'Eigene AI-Compliance-Plattform gestartet. Aktuell in Beta. Parallel: ausgewaehlte Kundenprojekte und Equity-Partnerschaften.',
  },
  {
    year: 'Heute',
    title: 'Wo ich stehe',
    text: 'Strategischer Aufbau mit bewusst selektiver Verfuegbarkeit. Volle Unabhaengigkeit ist das Ziel — aber nicht auf Kosten von Qualitaet. Ich nehme nur Projekte an, bei denen ich echten Impact liefern kann.',
  },
]

export default function JourneyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 md:px-8 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-16">Journey</h1>

          <div className="border-l border-border pl-8 md:pl-12 space-y-12">
            {timeline.map((entry, index) => (
              <div key={index}>
                <span className="font-serif text-accent text-lg">{entry.year}</span>
                <h2 className="text-text-primary font-medium mt-1 mb-2">{entry.title}</h2>
                <p className="text-text-secondary text-sm leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
