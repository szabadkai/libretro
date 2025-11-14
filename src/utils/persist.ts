const SNAPSHOT_PREFIX = 'metro-retro:board:'

export const snapshotKey = (boardId: string) => `${SNAPSHOT_PREFIX}${boardId}`

export function loadSnapshot<T>(boardId: string): T | null {
  if (typeof window === 'undefined') {
    return null
  }

  const payload = window.localStorage.getItem(snapshotKey(boardId))
  if (!payload) return null

  try {
    return JSON.parse(payload) as T
  } catch (error) {
    console.warn('Failed to parse snapshot', error)
    window.localStorage.removeItem(snapshotKey(boardId))
    return null
  }
}

export function saveSnapshot(boardId: string, data: unknown) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(snapshotKey(boardId), JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to persist snapshot', error)
  }
}

export function clearSnapshot(boardId: string) {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(snapshotKey(boardId))
}
