'use client'

export function Navigation() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-16 py-6 backdrop-blur-[10px]" style={{
      background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)'
    }}>
      {/* Logo */}
      <div className="text-[1.75rem] font-normal tracking-[-0.02em]" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
        Zen<span className="text-[var(--accent-indigo)]">Board</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-10">
        <a
          href="#features"
          className="text-[0.9rem] font-normal text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        >
          Características
        </a>
        <a
          href="#integracion"
          className="text-[0.9rem] font-normal text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        >
          Integración
        </a>
        <a
          href="#precios"
          className="text-[0.9rem] font-normal text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
        >
          Precios
        </a>
        <a
          href="/boards"
          className="rounded-lg bg-[var(--accent-indigo)] px-6 py-3 text-[0.9rem] font-medium text-[var(--bg-primary)] transition-all duration-200 hover:-translate-y-0.5"
          style={{
            boxShadow: '0 0 30px var(--accent-indigo-glow)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(124, 124, 252, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px var(--accent-indigo-glow)'
          }}
        >
          Comenzar gratis
        </a>
      </div>
    </nav>
  )
}
