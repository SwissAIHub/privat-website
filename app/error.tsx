'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <div className="max-w-2xl text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-text-primary mb-4">
          Etwas ist schiefgelaufen
        </h2>
        <p className="text-text-secondary mb-8">
          Ein unerwarteter Fehler ist aufgetreten.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-bg-secondary rounded-lg text-left max-w-lg mx-auto">
            <p className="text-xs font-mono text-text-tertiary break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 text-sm">
          <button onClick={reset} className="text-accent hover:underline">
            Erneut versuchen
          </button>
          <button onClick={() => (window.location.href = '/')} className="text-text-secondary hover:text-text-primary">
            Startseite
          </button>
        </div>
      </div>
    </div>
  )
}
