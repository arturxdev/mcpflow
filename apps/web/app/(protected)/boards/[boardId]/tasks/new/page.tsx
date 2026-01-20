'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TaskForm } from '@/components/kanban/tasks/TaskForm'

interface PageProps {
  params: Promise<{ boardId: string }>
}

export default function NewTaskPage({ params }: PageProps) {
  const { boardId } = use(params)
  const router = useRouter()

  const handleSuccess = () => {
    router.push(`/boards/${boardId}`)
  }

  const handleCancel = () => {
    router.push(`/boards/${boardId}`)
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
        <h1 className="text-xl font-semibold text-white mb-6">Nueva Tarea</h1>
        <TaskForm
          boardId={boardId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}
