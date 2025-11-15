export type ColumnId = 'good' | 'bad' | 'start' | 'stop'
export type BackgroundKey = 'start-stop-continue' | 'mad-sad-glad'

export interface Note {
  id: string
  columnId: ColumnId
  text: string
  x: number
  y: number
  color: string
  authorId?: string
  ownerKey?: string
  createdAt: number
  updatedAt: number
}

export interface ColumnDefinition {
  id: ColumnId
  label: string
  description: string
  accent: string
}

export interface Participant {
  id: string
  label: string
  color: string
}
