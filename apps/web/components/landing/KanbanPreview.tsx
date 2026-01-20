interface PreviewTask {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

interface PreviewColumn {
  title: string
  dotColor: string
  tasks: PreviewTask[]
}

const PREVIEW_DATA: PreviewColumn[] = [
  {
    title: 'Todo',
    dotColor: 'var(--status-todo)',
    tasks: [
      {
        title: 'Diseñar nueva landing',
        description: 'Crear wireframes y mockups para la página principal',
        priority: 'high'
      },
      {
        title: 'Configurar CI/CD',
        description: 'Pipeline de deploy automático',
        priority: 'medium'
      }
    ]
  },
  {
    title: 'Haciendo',
    dotColor: 'var(--status-doing)',
    tasks: [
      {
        title: 'Implementar auth con OAuth',
        description: 'Integrar Google y GitHub como providers',
        priority: 'high'
      }
    ]
  },
  {
    title: 'Done',
    dotColor: 'var(--status-done)',
    tasks: [
      {
        title: 'Setup inicial del proyecto',
        description: 'Next.js + TypeScript + Tailwind',
        priority: 'low'
      },
      {
        title: 'Definir estructura de DB',
        description: 'Esquema para boards y tasks',
        priority: 'medium'
      }
    ]
  }
]

const priorityStyles = {
  low: {
    className: 'bg-[rgba(107,114,128,0.2)] text-[var(--priority-low)]'
  },
  medium: {
    className: 'bg-[rgba(234,179,8,0.2)] text-[var(--priority-medium)]'
  },
  high: {
    className: 'bg-[rgba(239,68,68,0.2)] text-[var(--priority-high)]'
  }
}

export function KanbanPreview() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {PREVIEW_DATA.map((column, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
        >
          {/* Column Header */}
          <div className="mb-4 flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: column.dotColor }}
            />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {column.title}
            </span>
          </div>

          {/* Tasks */}
          <div className="flex flex-col gap-3">
            {column.tasks.map((task, taskIdx) => (
              <div
                key={taskIdx}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]"
              >
                <div className="mb-2 text-[0.85rem] font-medium text-[var(--text-primary)]">
                  {task.title}
                </div>
                <div className="mb-3 text-[0.75rem] leading-[1.5] text-[var(--text-muted)]">
                  {task.description}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded text-[0.65rem] px-2 py-1 font-medium uppercase ${priorityStyles[task.priority].className}`}
                  >
                    {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
