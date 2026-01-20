'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { KanbanBoard } from '@/components/kanban'
import { Board } from '@repo/core'

interface BoardPageProps {
  params: Promise<{ boardId: string }>
}

export default function BoardPage({ params }: BoardPageProps) {
  const { boardId } = use(params)
  const [board, setBoard] = useState<Board | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`/api/boards/${boardId}`)
        if (!response.ok) {
          throw new Error('Board not found')
        }
        const data = await response.json()
        setBoard(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load board')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBoard()
  }, [boardId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading board...</div>
      </div>
    )
  }

  if (error || !board) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-400">{error || 'Board not found'}</div>
        <Link
          href="/boards"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          ← Back to boards
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/boards"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to boards
        </Link>
      </div>
      <KanbanBoard boardId={boardId} boardName={board.name} />
    </div>
  )
}
