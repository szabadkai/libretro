import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Participant } from '../types'

@customElement('presence-indicator')
export class PresenceIndicator extends LitElement {
  @property({ attribute: false }) participants: Participant[] = []

  render() {
    const count = this.participants.length
    if (count === 0) {
      return html`<span class="bubble">Solo mode</span>`
    }

    return html`
      <div class="presence">
        <div class="avatars">
          ${this.participants.slice(0, 4).map(
            (participant) => html`
              <span
                class="dot"
                style=${`--color: ${participant.color}`}
                title=${participant.label}
              ></span>
            `
          )}
        </div>
        <span class="bubble">${count} participant${count > 1 ? 's' : ''}</span>
      </div>
    `
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    .presence {
      display: inline-flex;
      gap: 0.4rem;
      align-items: center;
    }

    .avatars {
      display: inline-flex;
      align-items: center;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--color, #6366f1);
      border: 2px solid #ffffff;
      margin-left: -4px;
    }

    .dot:first-child {
      margin-left: 0;
    }

    .bubble {
      background: rgba(148, 163, 184, 0.2);
      color: #0f172a;
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-size: 0.85rem;
      border: 1px solid rgba(148, 163, 184, 0.35);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'presence-indicator': PresenceIndicator
  }
}
