export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] px-16 py-16">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        {/* Logo */}
        <div className="text-[1.5rem] font-normal" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          Zen<span className="text-[var(--accent-indigo)]">Board</span>
        </div>

        {/* Links */}
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[0.9rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            Documentación
          </a>
          <a
            href="#"
            className="text-[0.9rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            API
          </a>
          <a
            href="#"
            className="text-[0.9rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            Blog
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.9rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.9rem] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            Twitter
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[0.85rem] text-[var(--text-muted)]">
          © 2025 ZenBoard. Hecho con ☕ y algo de zen.
        </div>
      </div>
    </footer>
  )
}
