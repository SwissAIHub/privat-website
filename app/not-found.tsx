import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <div className="max-w-2xl text-center">
        <h1 className="font-serif text-8xl text-text-tertiary mb-8">404</h1>

        <h2 className="text-2xl font-serif text-text-primary mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-text-secondary mb-8">
          Die Seite existiert nicht oder wurde verschoben.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <Link href="/" className="text-accent hover:underline">
            Startseite
          </Link>
          <Link href="/work" className="text-text-secondary hover:text-text-primary">
            Work
          </Link>
          <Link href="/journey" className="text-text-secondary hover:text-text-primary">
            Journey
          </Link>
          <Link href="/contact" className="text-text-secondary hover:text-text-primary">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
