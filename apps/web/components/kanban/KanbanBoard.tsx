'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { useKanban } from './hooks/useKanban'
import { Column } from './Column'
import { Card } from './Card'
import { COLUMNS } from './constants'
import { Status, Task } from '@kanban/types'

interface KanbanBoardProps {
  boardId: string
  boardName?: string
}

export function KanbanBoard({ boardId, boardName }: KanbanBoardProps) {
  const {
    tasks,
    isLoading,
    error,
    deleteTask,
    moveTask,
    getTasksByStatus,
  } = useKanban({ boardId })

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleDragStart = (event: { active: { data: { current?: { task?: Task } } } }) => {
    const task = event.active.data.current?.task
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Status

    const task = tasks.find((t) => t.id === taskId)
    if (task && task.status !== newStatus) {
      moveTask(taskId, newStatus)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading tasks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="h-full">
      {boardName && (
        <h1 className="text-2xl font-bold text-white mb-6">{boardName}</h1>
      )}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 overflow-x-auto">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              dotColor={column.dotColor}
              tasks={getTasksByStatus(column.id)}
              boardId={boardId}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <Card task={activeTask} onDelete={() => { }} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
