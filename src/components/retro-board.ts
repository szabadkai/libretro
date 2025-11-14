import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import type { BoardController } from '../board-controller'
import { COLUMNS, DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, NOTE_DRAG_TYPE } from '../constants'
import type { ColumnId, Note } from '../types'
import './sticky-note'

interface DragPayload {
  noteId: string
  offsetX: number
  offsetY: number
}

@customElement('retro-board')
export class RetroBoard extends LitElement {
  @property({ attribute: false }) controller?: BoardController
  @state() private notes: Note[] = []
  @state() private zoom = 1
  @property({ attribute: false }) highlightedParticipantId: string | null = null
  @query('.note-layer') private noteLayer?: HTMLDivElement

  private unsubscribe?: () => void

  disconnectedCallback() {
    this.unsubscribe?.()
    super.disconnectedCallback()
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has('controller')) {
      this.bindNotes()
    }
  }

  render() {
    return html`
      <section
        class="board"
        @dblclick=${this.handleDoubleClick}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
        @wheel=${this.handleWheel}
      >
        <div class="workspace" style=${styleMap({ '--scale': `${this.zoom}` })}>
          <div class="note-layer">
          ${this.notes.map((note) => this.renderNote(note))}
          </div>
        </div>
        <div class="canvas-controls" @click=${(event: Event) => event.stopPropagation()}>
          <button @click=${this.zoomOut} aria-label="Zoom out">−</button>
          <span>${Math.round(this.zoom * 100)}%</span>
          <button @click=${this.zoomIn} aria-label="Zoom in">+</button>
        </div>
        ${!this.controller
          ? html`<div class="board-placeholder">Connecting to board…</div>`
          : null}
      </section>
    `
  }

  private bindNotes() {
    this.unsubscribe?.()

    if (!this.controller) {
      this.notes = []
      return
    }

    const listener = (event: Event) => {
      const detail = (event as CustomEvent<Note[]>).detail
      this.notes = detail
    }

    this.controller.addEventListener('notes-changed', listener as EventListener)
    this.unsubscribe = () =>
      this.controller?.removeEventListener('notes-changed', listener as EventListener)

    this.notes = this.controller.getNotes()
  }

  private renderNote(note: Note) {
    const dimmed = Boolean(
      this.highlightedParticipantId &&
        note.authorId &&
        note.authorId !== this.highlightedParticipantId
    )

    const hiddenByFilter = Boolean(
      this.highlightedParticipantId && !note.authorId
    )

    return html`
      <sticky-note
        style=${styleMap({
          left: `${note.x}px`,
          top: `${note.y}px`,
        })}
        ?dimmed=${dimmed || hiddenByFilter}
        .note=${note}
        .controller=${this.controller}
      ></sticky-note>
    `
  }

  private handleDoubleClick(event: MouseEvent) {
    if (!this.controller) return
    if (this.eventTargetsNote(event)) return

    const rect = this.getWorkspaceRect()
    if (!rect) return

    const x = (event.clientX - rect.left) / this.zoom - DEFAULT_NOTE_WIDTH / 2
    const y = (event.clientY - rect.top) / this.zoom - DEFAULT_NOTE_HEIGHT / 2
    this.controller.createNote(this.defaultColumnId, x, y)
  }

  private handleDragOver(event: DragEvent) {
    if (!event.dataTransfer) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  private handleDrop(event: DragEvent) {
    if (!event.dataTransfer || !this.controller) return
    const payload = event.dataTransfer.getData(NOTE_DRAG_TYPE)
    if (!payload) return

    event.preventDefault()
    const parsed = this.parsePayload(payload)
    if (!parsed) return

    const fallbackColumn = this.notes.find((note) => note.id === parsed.noteId)?.columnId
    const columnId = fallbackColumn ?? this.defaultColumnId

    const rect = this.getWorkspaceRect()
    if (!rect) return

    const x = (event.clientX - rect.left) / this.zoom - parsed.offsetX
    const y = (event.clientY - rect.top) / this.zoom - parsed.offsetY
    this.controller.moveNote(parsed.noteId, columnId, x, y)
  }

  private handleWheel(event: WheelEvent) {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    const delta = -event.deltaY * 0.001
    this.setZoom(this.zoom + delta)
  }

  private zoomIn = () => {
    this.setZoom(this.zoom + 0.1)
  }

  private zoomOut = () => {
    this.setZoom(this.zoom - 0.1)
  }

  private setZoom(value: number) {
    const clamped = Math.min(2, Math.max(0.5, value))
    if (clamped === this.zoom) return
    this.zoom = Number(clamped.toFixed(2))
  }

  private getWorkspaceRect() {
    return this.noteLayer?.getBoundingClientRect() ?? this.getBoundingClientRect()
  }

  private get defaultColumnId() {
    return (COLUMNS[0]?.id ?? 'good') as ColumnId
  }

  private eventTargetsNote(event: Event) {
    return event
      .composedPath()
      .some((node) => node instanceof HTMLElement && node.tagName === 'STICKY-NOTE')
  }

  private parsePayload(payload: string): DragPayload | null {
    try {
      const data = JSON.parse(payload)
      if (typeof data.noteId !== 'string') return null
      return {
        noteId: data.noteId,
        offsetX: Number(data.offsetX) || 0,
        offsetY: Number(data.offsetY) || 0,
      }
    } catch {
      return null
    }
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: block;
      z-index: 0;
    }

    .board {
      position: absolute;
      inset: 0;
      background: #ffffff;
      overflow: hidden;
    }

    .workspace {
      position: absolute;
      inset: 0;
      transform-origin: 0 0;
      transform: scale(var(--scale, 1));
    }

    .note-layer {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
    }

    .note-layer sticky-note {
      pointer-events: auto;
    }

    .board-placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 1rem 1.5rem;
      text-align: center;
      color: #475569;
      border: 1px dashed rgba(15, 23, 42, 0.2);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.9);
    }

    .canvas-controls {
      position: absolute;
      bottom: 1.5rem;
      right: 2rem;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(15, 23, 42, 0.12);
      border-radius: 999px;
      padding: 0.25rem 0.75rem;
      font-size: 0.9rem;
      color: #0f172a;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
      pointer-events: auto;
    }

    .canvas-controls button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: rgba(15, 23, 42, 0.06);
      color: inherit;
      font-size: 1.1rem;
      cursor: pointer;
      line-height: 1;
      display: grid;
      place-items: center;
    }

    .canvas-controls span {
      min-width: 3rem;
      text-align: center;
    }

    @media (max-width: 900px) {
      .canvas-controls {
        right: 1rem;
        bottom: 1rem;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'retro-board': RetroBoard
  }
}
