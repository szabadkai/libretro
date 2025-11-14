import type { BackgroundKey, ColumnDefinition } from './types'

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

export const BOARD_BACKGROUNDS: Array<{
  id: BackgroundKey
  label: string
  description: string
  asset: string
  columns: Array<{ title: string; description: string; accent: string }>
}> = [
  {
    id: 'start-stop-continue',
    label: 'Start / Stop / Continue',
    description: 'Three-part action board',
    asset: '/start-stop-continue.png',
    columns: [
      { title: 'Start', description: 'Ideas to try', accent: '#0ea5e9' },
      { title: 'Stop', description: 'Habits to drop', accent: '#f97316' },
      { title: 'Continue', description: 'Keep doing these', accent: '#6366f1' },
    ],
  },
  {
    id: 'mad-sad-glad',
    label: 'Mad / Sad / Glad',
    description: 'Emotional check-in',
    asset: '/mad-sad-glad.png',
    columns: [
      { title: 'Mad', description: 'Frustrations & annoyances', accent: '#f87171' },
      { title: 'Sad', description: 'Letdowns & concerns', accent: '#facc15' },
      { title: 'Glad', description: 'Highlights & celebrations', accent: '#34d399' },
    ],
  },
]
