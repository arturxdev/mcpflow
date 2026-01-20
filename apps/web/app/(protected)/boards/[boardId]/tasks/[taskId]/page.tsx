'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Task } from '@repo/core'
import { PriorityBadge, PRBadge } from '@/components/kanban'
import { TaskEditForm } from '@/components/kanban/tasks/TaskEditForm'

interface PageProps {
  params: Promise<{ boardId: string; taskId: string }>
}

export default function TaskDetailPage({ params }: PageProps) {
  const { boardId, taskId } = use(params)
  const router = useRouter()
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/boards/${boardId}/tasks/${taskId}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError('Tarea no encontrada')
          } else {
            throw new Error('Failed to fetch task')
          }
          return
        }
        const data = await response.json()
        setTask(data)
      } catch (err) {
        console.error('Error fetching task:', err)
        setError('Error al cargar la tarea')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTask()
  }, [boardId, taskId])

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/boards/${boardId}/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      router.push(`/boards/${boardId}`)
    } catch (err) {
      console.error('Error deleting task:', err)
      alert('Error al eliminar la tarea')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditSuccess = (updatedTask: Task) => {
    setTask(updatedTask)
    setMode('view')
  }

  const handleEditCancel = () => {
    setMode('view')
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/boards/${boardId}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al board
          </Link>
        </div>
        <div
          className="p-6 rounded-xl animate-pulse"
          style={{
            backgroundColor: '#16161e',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="h-8 bg-gray-700/50 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-700/50 rounded w-1/4 mb-6" />
          <div className="h-32 bg-gray-700/50 rounded" />
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/boards/${boardId}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al board
          </Link>
        </div>
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: '#16161e',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p className="text-red-400">{error || 'Tarea no encontrada'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/boards/${boardId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al board
        </Link>
      </div>

      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: '#16161e',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {mode === 'view' ? (
          <>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-xl font-semibold text-white">{task.title}</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('edit')}
                  className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50"
                  title="Eliminar tarea"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <PRBadge pr={task.pr} />
              <PriorityBadge priority={task.priority} />
            </div>

            {task.description ? (
              <div
                className="p-4 rounded-lg prose prose-invert prose-sm max-w-none"
                style={{
                  backgroundColor: '#1c1c26',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <ReactMarkdown>{task.description}</ReactMarkdown>
              </div>
            ) : (
              <div
                className="p-4 rounded-lg text-gray-500 italic text-sm"
                style={{
                  backgroundColor: '#1c1c26',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                Sin descripción
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-white mb-6">Editar Tarea</h2>
            <TaskEditForm
              boardId={boardId}
              task={task}
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          </>
        )}
      </div>
    </div>
  )
}
