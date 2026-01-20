import { Status } from '@repo/core'

export const COLUMNS: { id: Status; title: string; dotColor: string }[] = [
  { id: 'todo', title: 'To Do', dotColor: 'bg-red-500' },
  { id: 'doing', title: 'Doing', dotColor: 'bg-yellow-500' },
  { id: 'done', title: 'Done', dotColor: 'bg-green-500' },
]

export const PRIORITY_STYLES = {
  high: {
    bg: 'rgba(239,68,68,0.15)',
    text: '#f87171',
  },
  medium: {
    bg: 'rgba(245,158,11,0.15)',
    text: '#fbbf24',
  },
  low: {
    bg: 'rgba(59,130,246,0.15)',
    text: '#60a5fa',
  },
} as const

export const PR_BADGE_STYLES = {
  bg: 'rgba(124,124,252,0.1)',
  text: '#7c7cfc',
} as const
