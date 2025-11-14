import { LitElement, css, html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { customElement, property, query, state } from 'lit/decorators.js'
import type { BoardController } from '../board-controller'
import { NOTE_DRAG_TYPE } from '../constants'
import type { Note } from '../types'
import noteGraphic from '../../note.svg?raw'

@customElement('sticky-note')
export class StickyNote extends LitElement {
  @property({ attribute: false }) note!: Note
  @property({ attribute: false }) controller?: BoardController

  @state() private editing = false
  @state() private draft = ''

  @query('textarea') private textarea?: HTMLTextAreaElement

  updated(changed: Map<string, unknown>) {
    if (changed.has('note') && !this.editing) {
      this.draft = this.note?.text ?? ''
    }
  }

  render() {
    if (!this.note) {
      return null
    }

    const palette = this.getPaletteStyles(this.note.color)

    return html`
      <article
        class="note"
        draggable=${String(!this.editing)}
        style=${styleMap({
          ...palette,
          '--tilt': `${this.getTilt(this.note.id)}deg`,
        })}
        @dragstart=${this.handleDragStart}
        @dblclick=${this.beginEditing}
      >
        <div class="note-shell" aria-hidden="true">${unsafeSVG(noteGraphic)}</div>
        <button class="delete" @click=${this.handleDelete} title="Delete note">
          &times;
        </button>
        <div class="note-content">
          ${this.editing
            ? html`
                <textarea
                  .value=${this.draft}
                  @input=${this.handleInput}
                  @keydown=${this.handleKeyDown}
                  @blur=${this.commitEdit}
                ></textarea>
              `
            : html`<p ?empty=${this.note.text.length === 0} @click=${this.beginEditing}>
                ${this.note.text || 'Double-click to add text'}
              </p>`}
        </div>
      </article>
    `
  }

  private getTilt(noteId: string) {
    let hash = 0
    for (let i = 0; i < noteId.length; i++) {
      hash = (hash << 5) - hash + noteId.charCodeAt(i)
      hash |= 0
    }
    return ((hash >>> 0) % 800) / 100 - 4
  }

  private getPaletteStyles(color: string) {
    const base = this.normalizeHex(color)
    if (!base) return {}

    const lighten = (amount: number) => this.mixHex(base, '#ffffff', amount)
    const darken = (amount: number) => this.mixHex(base, '#000000', amount)

    return {
      '--note-top': lighten(0.35),
      '--note-bottom': darken(0.1),
      '--note-fold-light': lighten(0.55),
      '--note-fold-dark': darken(0.05),
      '--note-stroke': darken(0.25),
      '--note-shadow': darken(0.7),
    }
  }

  private normalizeHex(color: string) {
    const hex = color.trim().toLowerCase()
    if (/^#([0-9a-f]{3})$/i.test(hex)) {
      const [, short] = /^#([0-9a-f]{3})$/i.exec(hex) ?? []
      if (!short) return null
      return `#${short
        .split('')
        .map((char) => char + char)
        .join('')}`
    }
    if (/^#([0-9a-f]{6})$/i.test(hex)) {
      return hex
    }
    return null
  }

  private mixHex(color: string, target: string, weight: number) {
    const a = this.hexToRgb(color)
    const b = this.hexToRgb(target)
    if (!a || !b) return color
    const clampWeight = Math.min(Math.max(weight, 0), 1)
    const mixChannel = (channelA: number, channelB: number) =>
      Math.round(channelA + (channelB - channelA) * clampWeight)
    return this.rgbToHex({
      r: mixChannel(a.r, b.r),
      g: mixChannel(a.g, b.g),
      b: mixChannel(a.b, b.b),
    })
  }

  private hexToRgb(hex: string) {
    const match = /^#([0-9a-f]{6})$/i.exec(hex)
    if (!match) return null
    const value = match[1]
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return { r, g, b }
  }

  private rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    const toHex = (channel: number) => channel.toString(16).padStart(2, '0')
    return `#${toHex(Math.max(0, Math.min(255, r)))}${toHex(Math.max(0, Math.min(255, g)))}${toHex(
      Math.max(0, Math.min(255, b))
    )}`
  }

  private beginEditing(event: Event) {
    event.stopPropagation()
    if (this.editing) return
    this.editing = true
    this.draft = this.note.text
    this.updateComplete.then(() => {
      this.textarea?.focus()
      this.textarea?.select()
    })
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement
    this.draft = target.value
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      this.commitEdit()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      this.cancelEdit()
    }
  }

  private commitEdit = () => {
    if (!this.controller || !this.editing) return
    this.controller.updateNote(this.note.id, { text: this.draft.trim() })
    this.editing = false
  }

  private cancelEdit() {
    this.editing = false
    this.draft = this.note.text
  }

  private handleDelete(event: Event) {
    event.stopPropagation()
    this.controller?.deleteNote(this.note.id)
  }

  private handleDragStart(event: DragEvent) {
    if (!event.dataTransfer || this.editing) return

    const rect = this.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    event.dataTransfer.setData(
      NOTE_DRAG_TYPE,
      JSON.stringify({
        noteId: this.note.id,
        offsetX,
        offsetY,
      })
    )
    event.dataTransfer.effectAllowed = 'move'
  }

  static styles = css`
    :host {
      position: absolute;
      display: block;
      width: 110px;
      min-height: 70px;
    }

    .note {
      position: absolute;
      width: 110px;
      min-height: 70px;
      color: #4c3100;
      cursor: grab;
      transition: transform 120ms ease;
      transform-origin: center;
      transform: rotate(var(--tilt, 0deg));
    }

    .note:active {
      cursor: grabbing;
      transform: rotate(var(--tilt, 0deg)) scale(1.02);
    }

    .note-shell {
      pointer-events: none;
    }

    .note-shell svg {
      width: 100%;
      height: auto;
      display: block;
    }

    :host([dimmed]) {
      opacity: 0.25;
      filter: saturate(0.3);
    }

    .note-content {
      position: absolute;
      inset: 0.8rem 0.6rem 1.1rem;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
    }

    .note-content :is(p, textarea) {
      flex: 1;
      max-height: 100%;
    }

    p {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 0.95rem;
      line-height: 1.3;
      overflow: hidden;
    }

    p[empty] {
      opacity: 0.7;
    }

    textarea {
      width: 100%;
      min-height: 45px;
      height: 100%;
      max-height: 100%;
      border: none;
      resize: none;
      background: transparent;
      font: inherit;
      color: inherit;
      outline: none;
      overflow: auto;
    }

    .delete {
      position: absolute;
      top: 6px;
      right: 6px;
      border: none;
      background: rgba(15, 23, 42, 0.25);
      color: #2f1a00;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'sticky-note': StickyNote
  }
}
