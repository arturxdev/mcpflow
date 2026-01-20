'use client'

import { Priority } from '@repo/core'
import { PRIORITY_STYLES } from '../constants'

interface PrioritySelectProps {
  value: Priority | ''
  onChange: (value: Priority) => void
  error?: string
}

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
]

export function PrioritySelect({ value, onChange, error }: PrioritySelectProps) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Priority)}
        className="w-full px-3 py-2.5 rounded-lg text-white text-sm appearance-none cursor-pointer transition-colors"
        style={{
          backgroundColor: '#1c1c26',
          border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.25rem',
        }}
      >
        <option value="" disabled>
          Seleccionar...
        </option>
        {PRIORITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value && (
        <div className="mt-2 flex gap-2">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs transition-all
                ${value === option.value ? '' : 'opacity-50 hover:opacity-80'}
              `}
              style={{
                backgroundColor: PRIORITY_STYLES[option.value].bg,
                color: PRIORITY_STYLES[option.value].text,
                boxShadow: value === option.value ? `0 0 0 2px ${PRIORITY_STYLES[option.value].text}` : 'none',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}
