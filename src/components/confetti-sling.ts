import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { v4 as uuid } from 'uuid'
import type { BoardController, ConfettiShot } from '../board-controller'

const GLOBAL_CONFETTI_COLORS = ['#f87171', '#fb923c', '#facc15', '#34d399', '#38bdf8', '#a855f7', '#ec4899']

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  color: string
  life: number
  ttl: number
  shape: 'circle' | 'square'
}

@customElement('confetti-sling')
export class ConfettiSling extends LitElement {
  @property({ attribute: false }) controller?: BoardController
  @property({ type: Boolean, reflect: true }) active = false
  @state() private pulling = false
  @state() private pullVector: { x: number; y: number } = { x: 0, y: 0 }
  @state() private origin: { x: number; y: number } | null = null

  @query('canvas') private canvas?: HTMLCanvasElement

  private ctx: CanvasRenderingContext2D | null = null
  private frameHandle?: number
  private lastTick = performance.now()
  private particles: ConfettiParticle[] = []

  protected firstUpdated() {
    this.setupCanvas()
  }

  connectedCallback() {
    super.connectedCallback()
    this.startLoop()
    window.addEventListener('resize', this.handleResize)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('resize', this.handleResize)
    this.stopLoop()
    this.controller?.removeEventListener(
      'confetti-fired',
      this.onRemoteConfetti as EventListener
    )
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has('controller')) {
      const previous = changed.get('controller') as BoardController | undefined
      previous?.removeEventListener(
        'confetti-fired',
        this.onRemoteConfetti as EventListener
      )
      this.controller?.addEventListener(
        'confetti-fired',
        this.onRemoteConfetti as EventListener
      )
    }

    if (changed.has('active') && !this.active) {
      this.resetPull()
    }
  }

  render() {
    return html`
      <canvas part="canvas" aria-hidden="true"></canvas>
      <div
        class="sling-surface"
        data-active=${this.active ? 'true' : 'false'}
        data-pulling=${this.pulling ? 'true' : 'false'}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerUp}
      >
        ${this.renderReticle()}
      </div>
    `
  }

  private renderReticle() {
    if (!this.pulling || !this.origin) {
      return null
    }
    const tipX = this.origin.x + this.pullVector.x
    const tipY = this.origin.y + this.pullVector.y
    const angle = Math.atan2(this.pullVector.y, this.pullVector.x)
    const length = Math.min(this.maxPull, this.magnitude)
    return html`
      <div class="pull-reticle">
        <span
          class="reticle-band"
          style=${`left:${this.origin.x}px; top:${this.origin.y}px; width:${length}px; transform: translateY(-50%) rotate(${angle}rad);`}
        ></span>
        <span
          class="reticle-origin"
          style=${`left:${this.origin.x}px; top:${this.origin.y}px;`}
        ></span>
        <span
          class="reticle-handle"
          style=${`left:${tipX}px; top:${tipY}px;`}
        ></span>
      </div>
    `
  }

  private get magnitude() {
    return Math.hypot(this.pullVector.x, this.pullVector.y)
  }

  private get maxPull() {
    return 160
  }

  private getPointerLocal(event: PointerEvent) {
    const rect = this.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  private handlePointerDown(event: PointerEvent) {
    if (!this.active) return
    event.preventDefault()
    this.pulling = true
    this.origin = this.getPointerLocal(event)
    this.pullVector = { x: 0, y: 0 }
    const target = event.currentTarget as HTMLElement
    target.setPointerCapture?.(event.pointerId)
    this.updatePull(event)
  }

  private handlePointerMove(event: PointerEvent) {
    if (!this.pulling) return
    event.preventDefault()
    this.updatePull(event)
  }

  private handlePointerUp(event: PointerEvent) {
    if (!this.pulling || !this.origin) return
    event.preventDefault()
    this.updatePull(event)
    const magnitude = this.magnitude
    const vector = { ...this.pullVector }
    const origin = { ...this.origin }
    this.pulling = false
    const target = event.currentTarget as HTMLElement
    target.releasePointerCapture?.(event.pointerId)
    this.pullVector = { x: 0, y: 0 }
    this.origin = null
    if (magnitude < 12) return
    this.launchConfetti(magnitude, vector, origin)
  }

  private updatePull(event: PointerEvent) {
    if (!this.origin) return
    const pointer = this.getPointerLocal(event)
    const vector = { x: pointer.x - this.origin.x, y: pointer.y - this.origin.y }
    const length = Math.hypot(vector.x, vector.y) || 1
    const clamped = Math.min(length, this.maxPull)
    const scale = clamped / length
    this.pullVector = { x: vector.x * scale, y: vector.y * scale }
    this.requestUpdate()
  }

  private launchConfetti(magnitude: number, vector: { x: number; y: number }, origin: { x: number; y: number }) {
    const width = this.getCanvasWidth()
    const height = this.getCanvasHeight()
    const originX = origin.x / width
    const originY = origin.y / height
    const normalizedVector = { x: -vector.x / width, y: -vector.y / height }
    const power = Math.min(1, magnitude / this.maxPull)
    const color =
      this.controller?.getLocalParticipant()?.color ||
      '#34d399'

    const shot: ConfettiShot = {
      id: uuid(),
      originX,
      originY,
      vectorX: normalizedVector.x,
      vectorY: normalizedVector.y,
      power,
      color,
      createdAt: Date.now(),
    }

    if (this.controller) {
      this.controller.fireConfetti(shot)
    } else {
      this.spawnConfetti(shot)
    }

    this.dispatchEvent(
      new CustomEvent('confetti-shot', {
        bubbles: true,
        composed: true,
      })
    )
  }

  private spawnConfetti(shot: ConfettiShot) {
    this.ensureCanvasSize()
    const width = this.getCanvasWidth()
    const height = this.getCanvasHeight()
    const origin = { x: shot.originX * width, y: shot.originY * height }
    const vector = { x: shot.vectorX * width, y: shot.vectorY * height }
    const vectorLength = Math.hypot(vector.x, vector.y) || 1
    const baseDirection = { x: vector.x / vectorLength, y: vector.y / vectorLength }
    const baseSpeed = 400 + shot.power * 650
    const count = Math.floor(80 + shot.power * 70)
    const palette = this.buildPalette(shot.color)

    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 0.9
      const heading = Math.atan2(baseDirection.y, baseDirection.x) + spread
      const speed = baseSpeed * (0.5 + Math.random() * 0.9)
      const vx = Math.cos(heading) * speed + (Math.random() - 0.5) * 120
      const vy = Math.sin(heading) * speed + (Math.random() - 0.5) * 120
      const ttl = 2200 + Math.random() * 800
      const size = 2.8 + Math.random() * 2.8
      this.particles.push({
        x: origin.x,
        y: origin.y,
        vx,
        vy,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: ttl,
        ttl,
        shape: Math.random() > 0.4 ? 'square' : 'circle',
      })
    }
  }

  private buildPalette(base: string) {
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(base)) {
      return [...GLOBAL_CONFETTI_COLORS]
    }
    const normalized = base.replace('#', '')
    const value = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized
    const num = parseInt(value, 16)
    const clamp = (channel: number) => Math.min(255, Math.max(0, channel))
    const shift = (amount: number) => {
      const r = clamp(((num >> 16) & 255) + amount)
      const g = clamp(((num >> 8) & 255) + amount)
      const b = clamp((num & 255) + amount)
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    }

    return [
      shift(70),
      shift(30),
      base,
      shift(-30),
      '#ffffff',
      ...GLOBAL_CONFETTI_COLORS,
    ]
  }

  private onRemoteConfetti = (event: Event) => {
    const detail = (event as CustomEvent<ConfettiShot>).detail
    if (!detail) return
    this.spawnConfetti(detail)
  }

  private setupCanvas() {
    if (!this.canvas) return
    this.ctx = this.canvas.getContext('2d')
    this.ensureCanvasSize()
  }

  private ensureCanvasSize() {
    if (!this.canvas) return
    const width = this.getCanvasWidth()
    const height = this.getCanvasHeight()
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }
  }

  private getCanvasWidth() {
    return Math.floor(this.offsetWidth || window.innerWidth || 1)
  }

  private getCanvasHeight() {
    return Math.floor(this.offsetHeight || window.innerHeight || 1)
  }

  private startLoop() {
    if (this.frameHandle) return
    const tick = () => {
      this.frameHandle = window.requestAnimationFrame(tick)
      this.stepParticles()
      this.drawParticles()
    }
    this.frameHandle = window.requestAnimationFrame(tick)
  }

  private stopLoop() {
    if (this.frameHandle) {
      window.cancelAnimationFrame(this.frameHandle)
      this.frameHandle = undefined
    }
  }

  private stepParticles() {
    const now = performance.now()
    const deltaMs = Math.min(32, now - this.lastTick)
    const delta = deltaMs / 1000
    this.lastTick = now
    const gravity = 900

    this.particles = this.particles.filter((particle) => {
      particle.life -= deltaMs
      if (particle.life <= 0) {
        return false
      }
      particle.vy += gravity * delta
      particle.x += particle.vx * delta
      particle.y += particle.vy * delta
      particle.rotation += particle.rotationSpeed * delta
      return particle.y < this.getCanvasHeight() + 80
    })
  }

  private drawParticles() {
    if (!this.ctx || !this.canvas) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (const particle of this.particles) {
      const alpha = Math.max(0, particle.life / particle.ttl)
      this.ctx.save()
      this.ctx.globalAlpha = alpha
      this.ctx.translate(particle.x, particle.y)
      this.ctx.rotate(particle.rotation)
      this.ctx.fillStyle = particle.color
      if (particle.shape === 'circle') {
        this.ctx.beginPath()
        this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
        this.ctx.fill()
      } else {
        this.ctx.fillRect(
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size * 0.6
        )
      }
      this.ctx.restore()
    }
  }

  private resetPull() {
    this.pulling = false
    this.pullVector = { x: 0, y: 0 }
    this.origin = null
  }

  private handleResize = () => {
    this.ensureCanvasSize()
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      z-index: 3;
    }

    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .sling-surface {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .sling-surface[data-active='true'] {
      pointer-events: auto;
      cursor: crosshair;
      touch-action: none;
    }

    .sling-surface[data-active='true'][data-pulling='true'] {
      cursor: grabbing;
    }

    .pull-reticle {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .reticle-origin,
    .reticle-handle {
      position: absolute;
      width: 12px;
      height: 12px;
      margin-left: -6px;
      margin-top: -6px;
      border-radius: 50%;
      box-shadow: 0 10px 16px rgba(15, 23, 42, 0.2);
    }

    .reticle-origin {
      background: rgba(15, 23, 42, 0.8);
      border: 2px solid rgba(248, 250, 252, 0.8);
    }

    .reticle-handle {
      background: linear-gradient(135deg, #0ea5e9, #a855f7);
      border: 2px solid rgba(255, 255, 255, 0.9);
    }

    .reticle-band {
      position: absolute;
      height: 4px;
      border-radius: 999px;
      transform-origin: 0 50%;
      background: linear-gradient(90deg, rgba(14, 165, 233, 0.9), rgba(99, 102, 241, 0.95));
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'confetti-sling': ConfettiSling
  }
}
