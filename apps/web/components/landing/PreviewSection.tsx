import { KanbanPreview } from './KanbanPreview'

export function PreviewSection() {
  return (
    <section id="preview" className="relative px-16 pb-32 pt-8">
      <div
        className="mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]"
        style={{
          boxShadow: '0 0 0 1px var(--border-subtle), 0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 100px var(--accent-indigo-glow)',
          animation: 'floatUp 1s ease 0.5s forwards',
          opacity: 0,
          transform: 'translateY(40px)'
        }}
      >
        {/* Window Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-6 py-4">
          <div className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="h-3 w-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
          <span className="ml-4 text-[0.85rem] text-[var(--text-muted)]">ZenBoard — Mi Proyecto</span>
        </div>

        {/* Kanban Preview */}
        <div className="p-6">
          <KanbanPreview />
        </div>
      </div>
    </section>
  )
}
