import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import type { BoardController } from '../board-controller'
import { DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, NOTE_DRAG_TYPE } from '../constants'
import type { ColumnDefinition, Note } from '../types'
import './sticky-note'

interface DragPayload {
  noteId: string
  offsetX: number
  offsetY: number
}

@customElement('retro-column')
export class RetroColumn extends LitElement {
  @property({ attribute: false }) column!: ColumnDefinition
  @property({ attribute: false }) notes: Note[] = []
  @property({ attribute: false }) controller?: BoardController

  @query('.note-layer') private noteLayer?: HTMLDivElement

  render() {
    return html`
      <section
        class="column"
        @dblclick=${this.handleDoubleClick}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <header class="column-head" style=${`--accent: ${this.column.accent}`}>
          <div>
            <p class="label">${this.column.label}</p>
            <p class="description">${this.column.description}</p>
          </div>
          <span class="count">${this.notes.length}</span>
        </header>
        <div class="note-layer">
          ${this.notes.map(
            (note) => html`
              <sticky-note
                style=${styleMap({
                  left: `${note.x}px`,
                  top: `${note.y}px`,
                })}
                .note=${note}
                .controller=${this.controller}
              ></sticky-note>
            `
          )}
        </div>
      </section>
    `
  }

  private handleDoubleClick(event: MouseEvent) {
    if (!this.controller) return
    const target = event.composedPath()[0] as HTMLElement
    if (target.closest('sticky-note')) {
      return
    }

    const hostRect = this.noteLayer?.getBoundingClientRect() ?? this.getBoundingClientRect()

    const x = event.clientX - hostRect.left - DEFAULT_NOTE_WIDTH / 2
    const y = event.clientY - hostRect.top - DEFAULT_NOTE_HEIGHT / 2

    this.controller.createNote(this.column.id, x, y)
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

    const rect = this.noteLayer?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left - parsed.offsetX
    const y = event.clientY - rect.top - parsed.offsetY
    this.controller.moveNote(parsed.noteId, this.column.id, x, y)
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
      display: block;
    }

    .column {
      background: rgba(15, 23, 42, 0.8);
      border-radius: 20px;
      padding: 1rem;
      border: 1px solid rgba(148, 163, 184, 0.2);
      min-height: 320px;
      position: relative;
      overflow: hidden;
    }

    .column-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.6rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    }

    .label {
      font-weight: 600;
      color: var(--accent, #fbbf24);
      margin: 0;
      font-size: 1.05rem;
    }

    .description {
      margin: 0.15rem 0 0;
      font-size: 0.85rem;
      color: #94a3b8;
    }

    .count {
      background: rgba(148, 163, 184, 0.15);
      border-radius: 999px;
      padding: 0.1rem 0.9rem;
      font-size: 0.85rem;
      color: #e2e8f0;
      min-width: 2.5rem;
      text-align: center;
    }

    .note-layer {
      position: relative;
      min-height: 260px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'retro-column': RetroColumn
  }
}
