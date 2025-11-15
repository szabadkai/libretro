import { v4 as uuid } from 'uuid'
import type { Room } from 'trystero'
import { joinRoom, selfId } from './trystero-provider'
import type { BackgroundKey, ColumnId, Note, Participant } from './types'
import { loadSnapshot, saveSnapshot } from './utils/persist'

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

type NoteMessage =
  | { type: 'upsert'; note: Note }
  | { type: 'delete'; id: string; updatedAt: number }
  | { type: 'sync-request' }
  | { type: 'sync-response'; notes: Note[] }

type PresenceMessage = { participant: Participant }

type FunMessage = { type: 'confetti'; shot: ConfettiShot }

type SettingsMessage =
  | { type: 'background'; value: BackgroundKey }
  | { type: 'background-request' }

interface SnapshotPayload {
  notes: Note[]
}

const RELAY_SOURCE =
  import.meta.env.VITE_TRYSTERO_RELAYS ??
  import.meta.env.VITE_TORRENT_RELAYS ??
  ''
const RELAY_LIST = RELAY_SOURCE.split(',')
  .map((relay: string) => relay.trim())
  .filter(Boolean)

export interface LocalParticipantConfig {
  label?: string
  color?: string
}

const DEFAULT_BACKGROUND: BackgroundKey = 'start-stop-continue'
const BACKGROUND_VALUES: BackgroundKey[] = ['start-stop-continue', 'mad-sad-glad']
const isBackgroundKey = (value: unknown): value is BackgroundKey =>
  typeof value === 'string' && BACKGROUND_VALUES.includes(value as BackgroundKey)

export interface ConfettiShot {
  id: string
  originX: number
  originY: number
  vectorX: number
  vectorY: number
  power: number
  color: string
  createdAt: number
}

export class BoardController extends EventTarget {
  readonly boardId: string
  status: ConnectionStatus = 'connecting'

  private room?: Room
  private sendNoteMessage?: (
    payload: NoteMessage,
    targetPeers?: string | string[] | null
  ) => Promise<void[]>
  private sendPresenceMessage?: (
    payload: PresenceMessage,
    targetPeers?: string | string[] | null
  ) => Promise<void[]>
  private sendFunMessage?: (payload: FunMessage, targetPeers?: string | string[] | null) => Promise<void[]>
  private sendSettingsMessage?: (
    payload: SettingsMessage,
    targetPeers?: string | string[] | null
  ) => Promise<void[]>
  private persistHandle?: number
  private notes = new Map<string, Note>()
  private participants = new Map<string, Participant>()
  private readonly localParticipant: Participant
  private background: BackgroundKey = DEFAULT_BACKGROUND

  constructor(boardId: string, profile?: LocalParticipantConfig, initialBackground?: BackgroundKey) {
    super()
    this.boardId = boardId
    this.localParticipant = {
      id: selfId,
      label: profile?.label?.trim() || `Guest ${uuid().slice(0, 4).toUpperCase()}`,
      color: profile?.color || this.randomAccent(),
    }
    this.background = initialBackground ?? DEFAULT_BACKGROUND

    this.participants.set(selfId, this.localParticipant)
    this.restoreSnapshot()
    this.connectRoom()
  }

  dispose() {
    if (typeof window !== 'undefined') {
      window.clearTimeout(this.persistHandle)
    }
    this.room?.leave()
  }

  getNotes() {
    return Array.from(this.notes.values()).sort((a, b) => a.createdAt - b.createdAt)
  }

  getParticipants() {
    return Array.from(this.participants.values())
  }

  getLocalParticipant() {
    return this.localParticipant
  }

  getBoardBackground() {
    return this.background
  }

  setBoardBackground(value: BackgroundKey) {
    if (!value) return
    const changed = value !== this.background
    if (changed) {
      this.applyBackground(value)
    }
    this.sendSettingsMessage?.({ type: 'background', value })
  }

  fireConfetti(shot: ConfettiShot) {
    this.dispatchEvent(new CustomEvent<ConfettiShot>('confetti-fired', { detail: shot }))
    this.sendFunMessage?.({ type: 'confetti', shot })
  }

  createNote(columnId: ColumnId, rawX?: number, rawY?: number) {
    const now = Date.now()
    const note: Note = {
      id: uuid(),
      columnId,
      text: '',
      ...this.normalizePosition(rawX, rawY),
      color: this.localParticipant.color,
      authorId: this.localParticipant.id,
      createdAt: now,
      updatedAt: now,
    }

    this.applyUpsert(note)
    this.broadcastNote({ type: 'upsert', note })
  }

  updateNote(noteId: string, updates: Partial<Omit<Note, 'id'>>) {
    const existing = this.notes.get(noteId)
    if (!existing) return

    const note: Note = {
      ...existing,
      ...updates,
      updatedAt: Date.now(),
    }

    this.applyUpsert(note)
    this.broadcastNote({ type: 'upsert', note })
  }

  moveNote(noteId: string, columnId: ColumnId, rawX: number, rawY: number) {
    this.updateNote(noteId, { columnId, ...this.normalizePosition(rawX, rawY) })
  }

  deleteNote(noteId: string) {
    const existing = this.notes.get(noteId)
    if (!existing) return

    this.notes.delete(noteId)
    this.emitNotesChanged()
    this.schedulePersist()
    this.broadcastNote({ type: 'delete', id: noteId, updatedAt: Date.now() })
  }

  private connectRoom() {
    const config = {
      appId: 'metro-retro',
      relayUrls: RELAY_LIST.length ? RELAY_LIST : undefined,
    }

    this.room = joinRoom(config, this.boardId)

    this.updateStatus('connected')
    this.setupMessaging()
    this.setupPresence()
    this.setupFunChannel()
    this.setupSettingsChannel()
  }

  private setupMessaging() {
    if (!this.room) return

    const [rawSendNote, rawGetNote] = this.room.makeAction<any>('note')
    this.sendNoteMessage = (payload, targetPeers) => rawSendNote(payload, targetPeers)

    rawGetNote((message: NoteMessage, peerId: string) => {
      switch (message.type) {
        case 'upsert':
          this.applyUpsert(message.note)
          break
        case 'delete':
          this.applyDelete(message.id, message.updatedAt)
          break
        case 'sync-request':
          this.sendNoteMessage?.(
            { type: 'sync-response', notes: this.getNotes() },
            peerId
          )
          break
        case 'sync-response':
          message.notes.forEach((note) => this.applyUpsert(note))
          break
        default:
          break
      }
    })

    this.room.onPeerJoin((peerId) => {
      this.updateStatus('connected')
      this.sendPresenceMessage?.({ participant: this.localParticipant }, peerId)
      this.sendNoteMessage?.({ type: 'sync-request' }, peerId)
    })

    this.room.onPeerLeave((peerId) => {
      this.participants.delete(peerId)
      this.emitParticipantsChanged()
    })
  }

  private setupPresence() {
    if (!this.room) return

    const [rawSendPresence, rawGetPresence] = this.room.makeAction<any>('presence')
    this.sendPresenceMessage = (payload, targetPeers) =>
      rawSendPresence(payload, targetPeers)

    rawGetPresence((message: PresenceMessage) => {
      if (!message?.participant) return
      this.participants.set(message.participant.id, message.participant)
      this.emitParticipantsChanged()
    })

    this.emitParticipantsChanged()
    this.sendPresenceMessage?.({ participant: this.localParticipant })
  }

  private setupFunChannel() {
    if (!this.room) return

    const [rawSendFun, rawGetFun] = this.room.makeAction<any>('fun')
    this.sendFunMessage = (payload, targetPeers) => rawSendFun(payload, targetPeers)

    rawGetFun((message: FunMessage) => {
      if (message?.type !== 'confetti' || !message.shot) return
      this.dispatchEvent(
        new CustomEvent<ConfettiShot>('confetti-fired', { detail: message.shot })
      )
    })
  }

  private setupSettingsChannel() {
    if (!this.room) return

    const [rawSendSettings, rawGetSettings] = this.room.makeAction<any>('settings')
    this.sendSettingsMessage = (payload, targetPeers) => rawSendSettings(payload, targetPeers)

    rawGetSettings((message: SettingsMessage, peerId: string) => {
      if (message?.type === 'background' && isBackgroundKey(message.value)) {
        this.applyBackground(message.value)
      } else if (message?.type === 'background-request') {
        this.respondWithBackground(peerId)
      }
    })

    this.requestBackgroundSync()
  }

  private broadcastNote(payload: NoteMessage) {
    this.sendNoteMessage?.(payload)
  }

  private applyUpsert(note: Note) {
    const existing = this.notes.get(note.id)
    if (existing && existing.updatedAt > note.updatedAt) {
      return
    }

    this.notes.set(note.id, note)
    this.schedulePersist()
    this.emitNotesChanged()
  }

  private applyDelete(id: string, updatedAt: number) {
    const existing = this.notes.get(id)
    if (!existing || existing.updatedAt > updatedAt) {
      return
    }

    this.notes.delete(id)
    this.emitNotesChanged()
    this.schedulePersist()
  }

  private emitNotesChanged() {
    this.dispatchEvent(new CustomEvent<Note[]>('notes-changed', { detail: this.getNotes() }))
  }

  private emitParticipantsChanged() {
    this.dispatchEvent(
      new CustomEvent<Participant[]>('participants-changed', {
        detail: this.getParticipants(),
      })
    )
  }

  private applyBackground(value: BackgroundKey) {
    if (!value || value === this.background) return
    this.background = value
    this.dispatchEvent(new CustomEvent<BackgroundKey>('background-changed', { detail: value }))
  }

  private respondWithBackground(targetPeers?: string | string[] | null) {
    this.sendSettingsMessage?.({ type: 'background', value: this.background }, targetPeers ?? null)
  }

  private requestBackgroundSync() {
    this.sendSettingsMessage?.({ type: 'background-request' })
  }

  private normalizePosition(rawX?: number, rawY?: number) {
    const safeX = Number.isFinite(rawX) ? Number(rawX) : 24
    const safeY = Number.isFinite(rawY) ? Number(rawY) : 24
    return {
      x: Math.max(12, safeX),
      y: Math.max(12, safeY),
    }
  }

  private updateStatus(status: ConnectionStatus) {
    this.status = status
    this.dispatchEvent(new CustomEvent<ConnectionStatus>('status-changed', { detail: status }))
  }

  private restoreSnapshot() {
    const snapshot = loadSnapshot<SnapshotPayload>(this.boardId)
    if (!snapshot?.notes) return
    snapshot.notes.forEach((note) => this.notes.set(note.id, note))
    this.emitNotesChanged()
  }

  private schedulePersist() {
    if (typeof window === 'undefined') {
      return
    }
    window.clearTimeout(this.persistHandle)
    this.persistHandle = window.setTimeout(() => {
      saveSnapshot(this.boardId, { notes: this.getNotes() })
    }, 400)
  }

  private randomAccent() {
    const palette = ['#fbbf24', '#ef4444', '#22d3ee', '#a855f7', '#34d399', '#f472b6']
    return palette[Math.floor(Math.random() * palette.length)]
  }
}
