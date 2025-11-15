import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import type { BoardController } from '../board-controller'
import { BOARD_BACKGROUNDS, COLUMNS, DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, NOTE_DRAG_TYPE } from '../constants'
import type { BackgroundKey, ColumnId, Note } from '../types'
import './sticky-note'

interface DragPayload {
  noteId: string
  offsetX: number
  offsetY: number
}

const BOARD_WIDTH = 2200
const BOARD_HEIGHT = 1240

@customElement('retro-board')
export class RetroBoard extends LitElement {
  @property({ attribute: false }) controller?: BoardController
  @state() private notes: Note[] = []
  @state() private zoom = 1
  @state() private panX = 0
  @state() private panY = 0
  @state() private isPanning = false
  @property({ attribute: false }) highlightedParticipantId: string | null = null
  @property({ attribute: false }) background: BackgroundKey = 'start-stop-continue'
  @query('.note-layer') private noteLayer?: HTMLDivElement
  @query('.workspace') private workspace?: HTMLDivElement

  private unsubscribe?: () => void
  private panOrigin: { x: number; y: number } | null = null
  private readonly zoomStep = 0.45
  private readonly minZoom = 0.4
  private readonly maxZoom = 3
  private handleKeyZoom = (event: KeyboardEvent) => {
    if ((!event.metaKey && !event.ctrlKey) || this.shouldIgnoreKeyZoom(event)) {
      return
    }
    const rect = this.getWorkspaceRect()
    if (!rect) return

    if (event.key === '=' || event.key === '+') {
      event.preventDefault()
      this.zoomTo(this.zoom + this.zoomStep, { x: rect.width / 2, y: rect.height / 2 })
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault()
      this.zoomTo(this.zoom - this.zoomStep, { x: rect.width / 2, y: rect.height / 2 })
    } else if (event.key === '0') {
      event.preventDefault()
      this.resetView()
    }
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.handleKeyZoom, { passive: false })
    queueMicrotask(() => this.centerBoard())
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeyZoom)
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
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerUp}
      >
        <div
          class="pan-layer"
          style=${styleMap({
            '--pan-x': `${this.panX}px`,
            '--pan-y': `${this.panY}px`,
          })}
        >
          <div
            class="workspace"
            style=${styleMap({
              '--scale': `${this.zoom}`,
              '--board-width': `${BOARD_WIDTH}px`,
              '--board-height': `${BOARD_HEIGHT}px`,
            })}
          >
            ${this.renderTemplate()}
            <div class="note-layer">
              ${this.notes.map((note) => this.renderNote(note))}
            </div>
          </div>
        </div>
        <div class="canvas-controls" @click=${(event: Event) => event.stopPropagation()}>
          <button class="icon" @click=${this.zoomOut} aria-label="Zoom out">−</button>
          <span>${Math.round(this.zoom * 100)}%</span>
          <button class="icon" @click=${this.zoomIn} aria-label="Zoom in">+</button>
          <button class="reset" @click=${this.resetView} aria-label="Reset view">Reset</button>
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

  private renderTemplate() {
    const layout = this.getBackgroundLayout()
    if (!layout) return null
    return html`
      <div
        class="board-template"
        style=${styleMap({
          '--template-image': `url(${layout.asset})`,
        })}
        aria-hidden="true"
        role="presentation"
      ></div>
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
    event.preventDefault()
    if (event.ctrlKey || event.metaKey) {
      const rect = this.getWorkspaceRect()
      if (!rect) return
      const pivot = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      const factor = Math.exp(-event.deltaY * 0.0045)
      this.zoomTo(this.zoom * factor, pivot)
      return
    }
    this.panX -= event.deltaX
    this.panY -= event.deltaY
  }

  private handlePointerDown(event: PointerEvent) {
    if (event.button !== 0) return
    if (this.eventTargetsNote(event)) return
    this.isPanning = true
    this.panOrigin = { x: event.clientX, y: event.clientY }
    const target = event.currentTarget as HTMLElement
    target.setPointerCapture?.(event.pointerId)
  }

  private handlePointerMove(event: PointerEvent) {
    if (!this.isPanning || !this.panOrigin) return
    const deltaX = event.clientX - this.panOrigin.x
    const deltaY = event.clientY - this.panOrigin.y
    this.panX += deltaX
    this.panY += deltaY
    this.panOrigin = { x: event.clientX, y: event.clientY }
  }

  private handlePointerUp(event: PointerEvent) {
    if (!this.isPanning) return
    this.isPanning = false
    this.panOrigin = null
    const target = event.currentTarget as HTMLElement
    target.releasePointerCapture?.(event.pointerId)
  }

  private zoomIn = () => {
    const rect = this.getWorkspaceRect()
    this.zoomTo(this.zoom * (1 + this.zoomStep), rect ? { x: rect.width / 2, y: rect.height / 2 } : undefined)
  }

  private zoomOut = () => {
    const rect = this.getWorkspaceRect()
    this.zoomTo(this.zoom * (1 - this.zoomStep / 2), rect ? { x: rect.width / 2, y: rect.height / 2 } : undefined)
  }

  private resetView = () => {
    this.zoom = 1
    this.centerBoard()
  }

  private zoomTo(value: number, pivot?: { x: number; y: number }) {
    const clamped = Math.min(this.maxZoom, Math.max(this.minZoom, value))
    if (clamped === this.zoom) return
    if (pivot) {
      this.adjustPanForZoom(clamped, pivot)
    }
    this.zoom = Number(clamped.toFixed(2))
  }

  private adjustPanForZoom(nextZoom: number, pivot: { x: number; y: number }) {
    const oldZoom = this.zoom
    if (!oldZoom) return
    const boardX = (pivot.x - this.panX) / oldZoom
    const boardY = (pivot.y - this.panY) / oldZoom
    this.panX = pivot.x - boardX * nextZoom
    this.panY = pivot.y - boardY * nextZoom
  }

  private shouldIgnoreKeyZoom(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null
    if (!target) return false
    const tag = target.tagName
    const editable = target.getAttribute('contenteditable')?.toLowerCase() === 'true'
    return editable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
  }

  private centerBoard() {
    const viewport = this.getBoundingClientRect()
    if (!viewport.width || !viewport.height) return
    this.panX = (viewport.width - BOARD_WIDTH * this.zoom) / 2
    this.panY = (viewport.height - BOARD_HEIGHT * this.zoom) / 2
  }

  private getWorkspaceRect() {
    return this.workspace?.getBoundingClientRect() ?? this.noteLayer?.getBoundingClientRect() ?? this.getBoundingClientRect()
  }

  private get defaultColumnId() {
    return (COLUMNS[0]?.id ?? 'good') as ColumnId
  }

  private getBackgroundLayout() {
    return BOARD_BACKGROUNDS.find((layout) => layout.id === this.background)
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

    .pan-layer {
      position: absolute;
      inset: 0;
      transform: translate(var(--pan-x, 0px), var(--pan-y, 0px));
    }

    .workspace {
      position: absolute;
      width: var(--board-width, 2200px);
      height: var(--board-height, 1240px);
      transform-origin: 0 0;
      transform: scale(var(--scale, 1));
    }

    .board-template {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-image: var(--template-image);
      background-size: cover;
      background-position: center;
      border-radius: 28px;
      border: 1px solid rgba(15, 23, 42, 0.1);
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
      pointer-events: none;
      z-index: 1;
      opacity: 0.95;
    }

    .note-layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
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
      padding: 0.35rem 0.75rem;
      font-size: 0.9rem;
      color: #0f172a;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
      pointer-events: auto;
    }

    .canvas-controls button {
      border: none;
      background: rgba(15, 23, 42, 0.06);
      color: inherit;
      font-size: 0.85rem;
      cursor: pointer;
      line-height: 1;
    }

    .canvas-controls button.icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
    }

    .canvas-controls button.reset {
      border-radius: 8px;
      padding: 0.2rem 0.7rem;
      background: rgba(15, 23, 42, 0.08);
      font-size: 0.8rem;
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
