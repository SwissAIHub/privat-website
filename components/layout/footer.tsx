export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <span>Florian Schatz — Flums, Schweiz</span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/florian-schatz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@florianschatz.com"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
