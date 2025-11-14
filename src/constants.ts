import type { ColumnDefinition } from './types'

export const COLUMNS: ColumnDefinition[] = [
  {
    id: 'good',
    label: 'Good',
    description: 'Wins and bright spots worth repeating',
    accent: '#34d399',
  },
  {
    id: 'bad',
    label: 'Bad',
    description: 'Pain points or risks we should address',
    accent: '#f87171',
  },
  {
    id: 'start',
    label: 'Start',
    description: 'New ideas to try next sprint',
    accent: '#60a5fa',
  },
  {
    id: 'stop',
    label: 'Stop',
    description: 'Habits that no longer serve us',
    accent: '#fbbf24',
  },
]

export const DEFAULT_NOTE_WIDTH = 110
export const DEFAULT_NOTE_HEIGHT = 70
export const NOTE_DRAG_TYPE = 'application/x-metro-note'
