import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { v4 as uuid } from 'uuid'
import { BoardController, type LocalParticipantConfig } from './board-controller'
import type { Participant } from './types'
import './components/retro-board'

interface ProfileDraft {
  name: string
  color: string
}

const PROFILE_STORAGE_KEY = 'metro-retro-profile'
const PROFILE_COLORS = ['#fbbf24', '#ef4444', '#22d3ee', '#a855f7', '#34d399', '#f472b6']
const DEFAULT_PROFILE: ProfileDraft = { name: '', color: PROFILE_COLORS[0] }

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private boardId: string | null = null
  @state() private controller?: BoardController
  @state() private copyState: 'idle' | 'copied' | 'error' = 'idle'
  @state() private profile: ProfileDraft | null = null
  @state() private profileDraft: ProfileDraft = { ...DEFAULT_PROFILE }
  @state() private showProfileDialog = false
  @state() private participants: Participant[] = []
  @state() private highlightedParticipantId: string | null = null

  private readonly onHashChange = () => this.handleRoute()
  private readonly onParticipantsChange = (event: Event) => {
    const detail = (event as CustomEvent<Participant[]>).detail
    this.participants = detail
    if (
      this.highlightedParticipantId &&
      !detail.some((participant) => participant.id === this.highlightedParticipantId)
    ) {
      this.highlightedParticipantId = null
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.initializeProfile()
    window.addEventListener('hashchange', this.onHashChange)
    this.handleRoute()
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.onHashChange)
    this.controller?.removeEventListener('participants-changed', this.onParticipantsChange)
    this.controller?.dispose()
    super.disconnectedCallback()
  }

  render() {
    const ready = Boolean(this.boardId && this.controller && this.profile)

    return html`
      <retro-board
        .controller=${this.controller}
        .highlightedParticipantId=${this.highlightedParticipantId}
      ></retro-board>
      <div class="ui-overlay">
        ${ready
          ? html`
              <div class="toolbar">
                <div class="brand">
                  <span class="mark"></span>
                  <div>
                    <p class="title">Metro Retro</p>
                    <p class="subtitle">Board ${this.boardId}</p>
                  </div>
                </div>
                <div class="toolbar-actions">
                  ${this.renderFilterControl()}
                  <button class="ghost" @click=${this.openProfileDialog}>Profile</button>
                  <button class="ghost" @click=${this.handleCopyLink}>${this.copyLabel}</button>
                  <button class="primary" @click=${this.startFreshBoard}>New</button>
                </div>
              </div>
            `
          : html`<div class="loading">Preparing your retro board…</div>`}
        ${this.renderProfileDialog()}
      </div>
    `
  }

  private get copyLabel() {
    switch (this.copyState) {
      case 'copied':
        return 'Link copied'
      case 'error':
        return 'Copy failed'
      default:
        return 'Copy link'
    }
  }

  private handleRoute() {
    const boardId = this.extractBoardId()
    if (!boardId) {
      this.navigateToBoard(uuid())
      return
    }

    if (boardId === this.boardId && this.controller) {
      return
    }

    this.bootstrapBoard(boardId)
  }

  private extractBoardId(): string | null {
    const hash = window.location.hash.replace(/^#/, '')
    const match = hash.match(/board\/([\w-]+)/i)
    return match?.[1] ?? null
  }

  private navigateToBoard(id: string) {
    window.location.hash = `#/board/${id}`
  }

  private bootstrapBoard(id: string) {
    this.controller?.removeEventListener('participants-changed', this.onParticipantsChange)
    this.controller?.dispose()

    this.boardId = id

    if (!this.profile) {
      this.controller = undefined
      this.participants = []
      return
    }

    const controller = new BoardController(id, this.profileToParticipant(this.profile))
    controller.addEventListener('participants-changed', this.onParticipantsChange)

    this.controller = controller
    this.participants = controller.getParticipants()
    this.copyState = 'idle'
  }

  private startFreshBoard = () => {
    this.navigateToBoard(uuid())
  }

  private async handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      this.copyState = 'copied'
    } catch {
      this.copyState = 'error'
    } finally {
      window.setTimeout(() => (this.copyState = 'idle'), 2000)
    }
  }

  private initializeProfile() {
    const stored = this.readProfileFromStorage()
    if (stored) {
      this.profile = stored
      this.profileDraft = { ...stored }
      this.showProfileDialog = false
      return
    }

    this.profile = null
    this.profileDraft = { ...DEFAULT_PROFILE }
    this.showProfileDialog = true
  }

  private readProfileFromStorage(): ProfileDraft | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (typeof parsed?.name !== 'string' || typeof parsed?.color !== 'string') {
        return null
      }
      return { name: parsed.name, color: parsed.color }
    } catch {
      return null
    }
  }

  private persistProfile(profile: ProfileDraft) {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // ignore storage failures
    }
  }

  private renderProfileDialog() {
    if (!this.showProfileDialog && this.profile) {
      return null
    }

    const nameReady = this.profileDraft.name.trim().length > 0
    const canDismiss = Boolean(this.profile)

    return html`
      <div class="profile-overlay">
        <form class="profile-card" @submit=${this.handleProfileSubmit}>
          <header>
            <p class="eyebrow">Welcome</p>
            <h2>Set up your marker</h2>
            <p class="note">Pick a display name and sticky color so teammates know who is who.</p>
          </header>
          <label>
            <span>Name</span>
            <input
              type="text"
              .value=${this.profileDraft.name}
              @input=${this.handleProfileNameInput}
              placeholder="e.g. Casey"
              required
            />
          </label>
          <label>
            <span>Color</span>
            <div class="color-row">
              <input
                type="color"
                .value=${this.profileDraft.color}
                @input=${this.handleProfileColorInput}
              />
              <div class="color-swatches">
                ${PROFILE_COLORS.map(
                  (color) => html`
                    <button
                      type="button"
                      class="swatch"
                      style=${`--swatch:${color}`}
                      @click=${() => this.setProfileColor(color)}
                      aria-label=${`Use ${color}`}
                    ></button>
                  `
                )}
              </div>
              <button type="button" class="ghost" @click=${this.randomizeProfileColor}>
                Random
              </button>
            </div>
          </label>
          <div class="profile-actions">
            ${canDismiss
              ? html`<button type="button" class="ghost" @click=${this.closeProfileDialog}>
                  Cancel
                </button>`
              : null}
            <button class="primary" type="submit" ?disabled=${!nameReady}>
              ${this.profile ? 'Save' : 'Enter board'}
            </button>
          </div>
        </form>
      </div>
    `
  }

  private renderFilterControl() {
    if (!this.participants.length) {
      return null
    }

    return html`
      <label class="filter-control">
        <span>Filter</span>
        <select @change=${this.handleFilterChange} .value=${this.highlightedParticipantId ?? ''}>
          <option value="">All notes</option>
          ${this.participants.map(
            (participant) => html`<option value=${participant.id}>${participant.label}</option>`
          )}
        </select>
      </label>
    `
  }

  private handleFilterChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    this.highlightedParticipantId = value || null
  }

  private handleProfileSubmit = (event: Event) => {
    event.preventDefault()
    const trimmed = this.profileDraft.name.trim()
    if (!trimmed) return
    const profile: ProfileDraft = {
      name: trimmed,
      color: this.profileDraft.color || DEFAULT_PROFILE.color,
    }
    this.profile = profile
    this.profileDraft = { ...profile }
    this.showProfileDialog = false
    this.persistProfile(profile)
    if (this.boardId) {
      this.bootstrapBoard(this.boardId)
    } else {
      this.handleRoute()
    }
  }

  private handleProfileNameInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    this.profileDraft = { ...this.profileDraft, name: target.value }
  }

  private handleProfileColorInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    this.profileDraft = { ...this.profileDraft, color: target.value }
  }

  private setProfileColor(color: string) {
    this.profileDraft = { ...this.profileDraft, color }
  }

  private randomizeProfileColor = () => {
    const next = PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)]
    this.profileDraft = { ...this.profileDraft, color: next }
  }

  private openProfileDialog = () => {
    this.profileDraft = this.profile ? { ...this.profile } : { ...DEFAULT_PROFILE }
    this.showProfileDialog = true
  }

  private closeProfileDialog = () => {
    if (!this.profile) return
    this.profileDraft = { ...this.profile }
    this.showProfileDialog = false
  }

  private profileToParticipant(profile: ProfileDraft): LocalParticipantConfig {
    return {
      label: profile.name,
      color: profile.color,
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
    }

    retro-board {
      position: fixed;
      inset: 0;
      z-index: 0;
    }

    .ui-overlay {
      position: fixed;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: flex-start;
    }

    .loading {
      margin-top: 20vh;
      font-size: 1.125rem;
      background: rgba(255, 255, 255, 0.85);
      padding: 1rem 1.5rem;
      border-radius: 16px;
      display: inline-block;
      pointer-events: auto;
    }

    .toolbar {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid rgba(15, 23, 42, 0.08);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      width: fit-content;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }

    .mark {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      background: linear-gradient(120deg, #0ea5e9, #6366f1);
      display: inline-block;
    }

    .title {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
    }

    .subtitle {
      margin: 0;
      font-size: 0.8rem;
      color: #64748b;
    }

    .toolbar-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-left: auto;
    }

    .filter-control {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      font-size: 0.75rem;
      color: #64748b;
    }

    .filter-control select {
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      padding: 0.3rem 0.9rem;
      font-size: 0.85rem;
      background: rgba(255, 255, 255, 0.85);
    }

    .eyebrow {
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin: 0;
      color: #94a3b8;
    }

    button {
      border: none;
      border-radius: 999px;
      padding: 0.5rem 1.25rem;
      font-size: 0.95rem;
      cursor: pointer;
      transition: opacity 120ms ease;
      pointer-events: auto;
    }

    button:hover {
      opacity: 0.85;
    }

    .primary {
      background: linear-gradient(120deg, #0ea5e9, #6366f1);
      color: white;
      box-shadow: 0 12px 24px rgba(14, 165, 233, 0.25);
    }

    .ghost {
      background: rgba(148, 163, 184, 0.12);
      color: #0f172a;
      border: 1px solid rgba(148, 163, 184, 0.45);
    }

    .profile-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.3);
      display: grid;
      place-items: center;
      pointer-events: auto;
      padding: 1.5rem;
    }

    .profile-card {
      width: min(420px, 100%);
      background: #ffffff;
      border-radius: 24px;
      padding: 1.75rem;
      box-shadow: 0 30px 80px rgba(15, 23, 42, 0.2);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .profile-card header {
      margin-bottom: 0.5rem;
    }

    .profile-card h2 {
      margin: 0.15rem 0 0.25rem;
      font-size: 1.4rem;
    }

    .profile-card .note {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.9rem;
      color: #475569;
    }

    input[type='text'] {
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      padding: 0.65rem 0.9rem;
      font-size: 1rem;
    }

    input[type='color'] {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 12px;
      background: transparent;
      padding: 0;
      cursor: pointer;
    }

    .color-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .color-swatches {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: var(--swatch, #fbbf24);
      cursor: pointer;
    }

    .swatch:focus-visible {
      outline: 2px solid #0ea5e9;
      outline-offset: 2px;
    }

    .profile-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .profile-actions .primary[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .ui-overlay {
        padding: 1rem;
      }

      .toolbar {
        flex-direction: column;
        align-items: flex-start;
        border-radius: 18px;
      }

      .toolbar-actions {
        width: 100%;
      }

      .profile-card {
        padding: 1.25rem;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot
  }
}
