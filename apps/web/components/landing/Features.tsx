const features = [
  {
    icon: '📋',
    title: 'Múltiples Boards',
    description:
      'Organiza diferentes proyectos en boards separados. Cada uno con su propio flujo y contexto.',
  },
  {
    icon: '🎯',
    title: 'Prioridades Claras',
    description:
      'Sistema de prioridades visual para identificar rápidamente qué necesita atención inmediata.',
  },
  {
    icon: '✨',
    title: 'Drag & Drop',
    description:
      'Mueve tareas entre columnas con fluidez. La interfaz responde a tu ritmo de trabajo.',
  },
  {
    icon: '📝',
    title: 'Markdown Nativo',
    description:
      'Descripciones ricas con formato. Documenta contexto, checklists y referencias.',
  },
  {
    icon: '🤖',
    title: 'MCP Integrado',
    description:
      'Conecta agentes de IA para automatizar la gestión de tareas desde tu terminal.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode First',
    description:
      'Diseñado para sesiones largas. Cuida tus ojos mientras mantienes el flow.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative px-16 py-32">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(124, 124, 252, 0.03) 0%, transparent 70%)'
        }}
      />

      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2
          className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          Todo lo que necesitas, nada que no
        </h2>
        <p className="mx-auto max-w-[500px] text-[1.1rem] text-[var(--text-secondary)]">
          Simplicidad intencional para mantener el foco en lo que importa
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)]"
          >
            {/* Top border highlight */}
            <div
              className="absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--accent-indigo), transparent)'
              }}
            />

            {/* Icon */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-indigo-glow)] text-2xl">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="mb-3 text-[1.25rem] font-semibold">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-[0.95rem] leading-[1.6] text-[var(--text-secondary)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
