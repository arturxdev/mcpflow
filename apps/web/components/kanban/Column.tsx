'use client'

import Link from 'next/link'
import { useDroppable } from '@dnd-kit/core'
import { Task, Status } from '@repo/core'
import { Card } from './Card'

interface ColumnProps {
  id: Status
  title: string
  dotColor: string
  tasks: Task[]
  boardId: string
  onDeleteTask: (taskId: string) => void
}

export function Column({
  id,
  title,
  dotColor,
  tasks,
  boardId,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      className="flex flex-col rounded-xl w-1/3"
      style={{
        backgroundColor: '#16161e',
        border: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-xs text-gray-500 ml-1">({tasks.length})</span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`
          flex-1 p-2 flex flex-col gap-3 min-h-[200px]
          transition-colors duration-200
          ${isOver ? 'bg-white/5' : ''}
        `}
      >
        {tasks.map((task) => (
          <Card key={task.id} task={task} boardId={boardId} onDelete={onDeleteTask} />
        ))}
        {id === 'todo' && (
          <Link
            href={`/boards/${boardId}/tasks/new`}
            className="w-full mt-auto p-3 border border-dashed border-gray-700 rounded-lg text-gray-500 text-sm hover:border-gray-500 hover:text-gray-300 transition-colors text-center block"
          >
            + Añadir Task
          </Link>
        )}
      </div>
    </div>
  )
}
