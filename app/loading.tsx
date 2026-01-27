export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-neutral/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text */}
        <p className="text-sm text-text-tertiary animate-pulse">Lädt...</p>
      </div>
    </div>
  )
}
