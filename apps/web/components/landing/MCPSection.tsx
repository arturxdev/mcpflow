export function MCPSection() {
  return (
    <section id="integracion" className="relative bg-[var(--bg-secondary)] px-16 py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-24">
        {/* Left: Text Content */}
        <div>
          <h2
            className="mb-6 text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Controlado por <em className="italic text-[var(--accent-indigo)]">IA</em> cuando lo necesites
          </h2>

          <p className="mb-8 text-[1.1rem] leading-[1.7] text-[var(--text-secondary)]">
            ZenBoard incluye un servidor MCP (Model Context Protocol) que permite a agentes de IA como Claude o tu propio asistente gestionar tareas por ti.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--status-done)]">✓</span>
              <span>Crear tareas con lenguaje natural</span>
            </div>
            <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--status-done)]">✓</span>
              <span>Mover tareas entre columnas</span>
            </div>
            <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--status-done)]">✓</span>
              <span>Listar y consultar el estado del board</span>
            </div>
            <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--status-done)]">✓</span>
              <span>Eliminar tareas completadas</span>
            </div>
            <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--status-done)]">✓</span>
              <span>Compatible con OpenCode, Claude y más</span>
            </div>
          </div>
        </div>

        {/* Right: Code Block */}
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
          {/* Code Header */}
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-4">
            <span className="text-[0.8rem] text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              terminal
            </span>
          </div>

          {/* Code Content */}
          <div className="overflow-x-auto p-6">
            <pre className="text-[0.85rem] leading-[1.8] text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              <code>
                <span className="text-[var(--text-muted)]"># Desde tu agente de IA favorito</span>
                {'\n\n'}
                <span className="text-[var(--accent-indigo)]">{'>'}</span> Lista mis boards
                {'\n\n'}
                <span className="text-[var(--status-done)]">📋 Boards:</span>
                {'\n'}
                <span className="text-[var(--status-done)]">- Mi Proyecto (abc123)</span>
                {'\n'}
                <span className="text-[var(--status-done)]">- App Mobile (xyz789)</span>
                {'\n\n'}
                <span className="text-[var(--accent-indigo)]">{'>'}</span> Crea una tarea &quot;Implementar auth&quot;{'\n'}
                   con prioridad alta en abc123
                {'\n\n'}
                <span className="text-[var(--status-done)]">✅ Tarea creada: &quot;Implementar auth&quot;</span>
                {'\n\n'}
                <span className="text-[var(--accent-indigo)]">{'>'}</span> Mueve la tarea a doing
                {'\n\n'}
                <span className="text-[var(--status-done)]">✅ Tarea movida a &quot;doing&quot;</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
