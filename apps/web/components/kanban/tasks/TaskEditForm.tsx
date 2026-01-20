'use client'

import { useState } from 'react'
import { Task, Priority } from '@repo/core'
import { MarkdownEditor } from './MarkdownEditor'
import { PrioritySelect } from './PrioritySelect'

interface TaskEditFormProps {
  boardId: string
  task: Task
  onSuccess: (updatedTask: Task) => void
  onCancel: () => void
}

interface FormErrors {
  title?: string
  priority?: string
}

const MAX_TITLE_LENGTH = 120

export function TaskEditForm({ boardId, task, onSuccess, onCancel }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState<Priority>(task.priority)
  const [description, setDescription] = useState(task.description || '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio'
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `El título no puede exceder ${MAX_TITLE_LENGTH} caracteres`
    }

    if (!priority) {
      newErrors.priority = 'Selecciona una prioridad'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/boards/${boardId}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          priority,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      const updatedTask = await response.json()
      onSuccess(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
      setErrors({ title: 'Error al guardar los cambios. Intenta de nuevo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const titleLength = title.length
  const isOverLimit = titleLength > MAX_TITLE_LENGTH

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg text-white text-sm transition-colors focus:outline-none"
          style={{
            backgroundColor: '#1c1c26',
            border: errors.title ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = errors.title ? '#f87171' : '#6366f1'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors.title ? '#f87171' : 'rgba(255,255,255,0.1)'
          }}
          placeholder="Escribe el título de la tarea..."
          autoFocus
        />
        <div className="flex justify-between items-center mt-1.5">
          {errors.title ? (
            <p className="text-sm text-red-400">{errors.title}</p>
          ) : (
            <span />
          )}
          <span
            className={`text-sm ${isOverLimit ? 'text-red-400' : 'text-gray-500'}`}
          >
            {titleLength}/{MAX_TITLE_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Prioridad <span className="text-red-400">*</span>
        </label>
        <PrioritySelect
          value={priority}
          onChange={setPriority}
          error={errors.priority}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Descripción <span className="text-gray-500">(opcional)</span>
        </label>
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          placeholder="Escribe la descripción en markdown..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  )
}
