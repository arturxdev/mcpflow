export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-8 pb-16 pt-32 text-center">
      {/* Gradient orbs */}
      <div
        className="pointer-events-none absolute left-[10%] top-[10%] h-[600px] w-[600px] blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 124, 252, 0.08) 0%, transparent 70%)'
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[5%] h-[500px] w-[500px] blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-[100px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2 text-[0.8rem] text-[var(--text-secondary)]"
          style={{
            animation: 'fadeInUp 0.8s ease forwards'
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--status-done)]"
            style={{
              animation: 'pulse 2s infinite'
            }}
          />
          <span>Nuevo: Integración con MCP para agentes de IA</span>
        </div>

        {/* Main Title */}
        <h1
          className="mb-6 max-w-[900px] text-[clamp(3rem,8vw,6rem)] font-normal leading-[1.05] tracking-[-0.03em]"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            animation: 'fadeInUp 0.8s ease 0.1s forwards',
            opacity: 0
          }}
        >
          Gestiona tus proyectos con <em className="italic text-[var(--accent-indigo)]">claridad zen</em>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-12 max-w-[600px] text-[1.25rem] text-[var(--text-secondary)]"
          style={{
            animation: 'fadeInUp 0.8s ease 0.2s forwards',
            opacity: 0
          }}
        >
          Un tablero Kanban minimalista y potente. Organiza tareas, colabora con tu equipo y deja que la IA te ayude a mantener el flujo.
        </p>

        {/* CTAs */}
        <div
          className="flex justify-center gap-4"
          style={{
            animation: 'fadeInUp 0.8s ease 0.3s forwards',
            opacity: 0
          }}
        >
          <a
            href="/dashboard"
            className="rounded-lg bg-[var(--accent-indigo)] px-6 py-3 text-[0.9rem] font-medium text-[var(--bg-primary)] transition-all duration-200 hover:-translate-y-0.5"
            style={{
              boxShadow: '0 0 30px var(--accent-indigo-glow)'
            }}
          >
            Crear mi primer board
          </a>
          <a
            href="#preview"
            className="rounded-lg border border-[var(--border-hover)] bg-transparent px-6 py-3 text-[0.9rem] font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]"
          >
            Ver demo
          </a>
        </div>
      </div>
    </section>
  )
}
