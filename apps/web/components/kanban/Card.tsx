'use client'

import { useDraggable } from '@dnd-kit/core'
import { Task } from '@kanban/types'
import { PriorityBadge } from './PriorityBadge'
import { PRBadge } from './PRBadge'

interface CardProps {
  task: Task
  onDelete: (taskId: string) => void
}

export function Card({ task, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
    })

  const style: React.CSSProperties = {
    backgroundColor: '#1c1c26',
    border: '1px solid rgba(255,255,255,0.05)',
    ...(transform
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : {}),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-4 rounded-lg cursor-grab active:cursor-grabbing
        transition-colors duration-200
        ${isDragging ? 'opacity-50' : ''}
      `}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#23232f'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1c1c26'
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-sm text-white flex-1">{task.title}</h4>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task.id)
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="text-gray-500 hover:text-red-400 transition-colors text-sm"
          title="Delete task"
        >
          ×
        </button>
      </div>
      <div className="flex items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <PRBadge pr={task.pr} />
      </div>
    </div>
  )
}
