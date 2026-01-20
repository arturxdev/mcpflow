'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

type EditorMode = 'edit' | 'preview'

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Escribe la descripción en markdown...',
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<EditorMode>('edit')

  return (
    <div>
      <div className="flex mb-0">
        <button
          type="button"
          onClick={() => setMode('edit')}
          className={`
            px-4 py-2 text-sm rounded-t-lg transition-colors
            ${mode === 'edit' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
          `}
          style={{
            backgroundColor: mode === 'edit' ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={`
            px-4 py-2 text-sm rounded-t-lg transition-colors
            ${mode === 'preview' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
          `}
          style={{
            backgroundColor: mode === 'preview' ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          Preview
        </button>
      </div>
      <div
        className="rounded-lg rounded-tl-none overflow-hidden"
        style={{
          backgroundColor: '#1c1c26',
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: '300px',
        }}
      >
        {mode === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[300px] p-4 text-sm text-white bg-transparent resize-none focus:outline-none placeholder-gray-500"
          />
        ) : (
          <div
            className="p-4 text-sm text-gray-300 prose prose-invert prose-sm max-w-none overflow-auto"
            style={{ minHeight: '300px' }}
          >
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 italic">Nada que previsualizar</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
