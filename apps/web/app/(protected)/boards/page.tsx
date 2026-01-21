'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Board } from '@repo/core'
import { useAuth } from '@clerk/nextjs'
import { ChevronRight, X } from 'lucide-react'


export default function BoardsPage() {
  const { getToken } = useAuth()
  const [boards, setBoards] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newBoardName, setNewBoardName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const token = await getToken()
      const response = await fetch('/api/boards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Enviamos el token aquí
        }
      });
      const data = await response.json()
      setBoards(data)
    } catch (error) {
      console.error('Failed to fetch boards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBoardName.trim()) return

    setIsCreating(true)
    const token = await getToken()
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Enviamos el token aquí
        },
        body: JSON.stringify({ name: newBoardName.trim() }),
      })
      const newBoard = await response.json()
      setBoards((prev) => [...prev, newBoard])
      setNewBoardName('')
    } catch (error) {
      console.error('Failed to create board:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await fetch(`/api/boards/${boardId}`, { method: 'DELETE' })
      setBoards((prev) => prev.filter((b) => b.id !== boardId))
    } catch (error) {
      console.error('Failed to delete board:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading boards...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl italic font-bold text-white">Your Boards</h1>
      </div>
      <form onSubmit={handleCreateBoard} className="mb-8 flex gap-3">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New board name..."
          className="flex-1 max-w-sm px-4 py-2 rounded-lg text-white"
          style={{
            backgroundColor: '#1c1c26',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        <button
          type="submit"
          disabled={isCreating || !newBoardName.trim()}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create Board'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="p-6 rounded-xl transition-colors"
            style={{
              backgroundColor: '#16161e',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <Link
                href={`/boards/${board.id}`}
                className="text-lg font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                {board.name}
              </Link>
              <button
                onClick={() => handleDeleteBoard(board.id)}
                className="text-gray-500 hover:text-red-400 transition-colors"
                title="Delete board"
              >
                <X />
              </button>
            </div>
            {board.description && (
              <p className="text-sm text-gray-400">{board.description}</p>
            )}
            <Link
              href={`/boards/${board.id}`}
              className="mt-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Open board <ChevronRight />
            </Link>
          </div>
        ))}
      </div>

      {boards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No boards yet</p>
          <p className="text-gray-500 text-sm">
            Create your first board to get started
          </p>
        </div>
      )}
    </div>
  )
}
