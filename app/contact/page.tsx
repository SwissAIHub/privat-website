import { Metadata } from 'next'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ContactForm from '@/components/sections/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Kontakt fuer AI-Implementierung, Partnerschaften oder Complyr.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 md:px-8 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">Contact</h1>
          <p className="text-text-secondary mb-12">
            Fuer Gespraeche ueber AI-Implementierung, Partnerschaften oder Complyr.
          </p>

          <div className="mb-12 space-y-2 text-sm text-text-secondary">
            <p>
              <a href="mailto:hello@florianschatz.com" className="text-accent hover:underline">
                hello@florianschatz.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/florian-schatz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
