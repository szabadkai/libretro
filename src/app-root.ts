import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { v4 as uuid } from "uuid";
import {
    BoardController,
    type ConnectionStatus,
    type ControllerConnectionError,
    type LocalParticipantConfig,
    type TimerState,
} from "./board-controller";
import type { BackgroundKey, Participant } from "./types";
import { BOARD_BACKGROUNDS } from "./constants";
import "./components/retro-board";
import "./components/confetti-sling";

interface ProfileDraft {
    name: string;
    color: string;
}

const PROFILE_STORAGE_KEY = "metro-retro-profile";
const BACKGROUND_STORAGE_KEY = "metro-retro-background";
const ONBOARDING_STORAGE_KEY = "libretro-onboarding";
const RECENT_BOARDS_STORAGE_KEY = "libretro-recents";
const PROFILE_ID_STORAGE_KEY = "libretro-profile-id";
const REVEAL_STORAGE_PREFIX = "libretro-reveal-";
const PROFILE_COLORS = [
    "#fbbf24",
    "#ef4444",
    "#22d3ee",
    "#a855f7",
    "#34d399",
    "#f472b6",
];
const DEFAULT_PROFILE: ProfileDraft = { name: "", color: PROFILE_COLORS[0] };
const MINUTE = 60 * 1000;

@customElement("app-root")
export class AppRoot extends LitElement {
    @state() private boardId: string | null = null;
    @state() private controller?: BoardController;
    @state() private copyState: "idle" | "copied" | "error" = "idle";
    @state() private profile: ProfileDraft | null = null;
    @state() private profileDraft: ProfileDraft = { ...DEFAULT_PROFILE };
    @state() private showProfileDialog = false;
    @state() private participants: Participant[] = [];
    @state() private highlightedParticipantId: string | null = null;
    @state() private background: BackgroundKey = "start-stop-continue";
    @state() private confettiEnabled = false;
    @state() private showOnboarding = true;
    @state() private timerRemainingMs = 0;
    @state() private timerRunning = false;
    @state() private connectionStatus: ConnectionStatus = "connecting";
    @state() private showStaging = false;
    @state() private recentBoards: string[] = [];
    @state() private joinBoardInput = "";
    @state() private connectionError: string | null = null;
    @state() private revealAll = false;
    @state() private profileId: string | null = null;

    private timerInterval: number | null = null;
    private timerDeadline: number | null = null;
    private audioContext?: AudioContext;
    private pendingTimerBroadcastKey: string | null = null;

    private readonly onHashChange = () => this.handleRoute();
    private readonly onParticipantsChange = (event: Event) => {
        const detail = (event as CustomEvent<Participant[]>).detail;
        this.participants = detail;
        if (
            this.highlightedParticipantId &&
            !detail.some(
                (participant) =>
                    participant.id === this.highlightedParticipantId
            )
        ) {
            this.highlightedParticipantId = null;
        }
    };
    private readonly onBackgroundChange = (event: Event) => {
        const detail = (event as CustomEvent<BackgroundKey>).detail;
        if (!detail) return;
        this.background = detail;
        this.persistBackground(detail);
    };

    connectedCallback() {
        super.connectedCallback();
        this.initializeProfile();
        this.initializeProfileId();
        this.initializeBackground();
        this.initializeOnboarding();
        this.initializeRecentBoards();
        window.addEventListener("hashchange", this.onHashChange);
        window.addEventListener("keydown", this.handleConfettiShortcut);
        this.handleRoute();
    }

    disconnectedCallback() {
        window.removeEventListener("hashchange", this.onHashChange);
        window.removeEventListener("keydown", this.handleConfettiShortcut);
        this.clearTimerInterval();
        this.detachControllerListeners();
        this.controller?.dispose();
        super.disconnectedCallback();
    }

    render() {
        const ready = Boolean(this.boardId && this.controller && this.profile);
        const showStaging = this.showStaging;

        return html`
            <retro-board
                .controller=${this.controller}
                .highlightedParticipantId=${this.highlightedParticipantId}
                .background=${this.background}
                .localParticipantId=${this.localParticipantId}
                .ownerKey=${this.profileId}
                .revealAll=${this.revealAll}
            ></retro-board>
            <confetti-sling
                .controller=${this.controller}
                .active=${this.confettiEnabled && ready}
                @confetti-shot=${this.handleConfettiShot}
            ></confetti-sling>
            <div class="ui-overlay">
                ${ready
                    ? html`
                          <div class="toolbar">
                              <div class="toolbar-brand">
                                  <span class="logo-dot"></span>
                                  <div class="brand-text">
                                      <p class="title">libRetro</p>
                                      <p class="meta">
                                          Board #${this.shortBoardId}
                                      </p>
                                  </div>
                              </div>
                              <div class="toolbar-controls">
                                  ${this.renderBackgroundControl()}
                                  ${this.renderFilterControl()}
                                  ${this.renderConnectionStatus()}
                                  ${this.renderTimerControl()}
                                  <div class="toolbar-actions">
                                      <button
                                          class="ghost"
                                          type="button"
                                          ?disabled=${this.revealAll}
                                          @click=${this.handleRevealAll}
                                      >
                                          ${this.revealAll
                                              ? "Revealed"
                                              : "Reveal all"}
                                      </button>
                                      <button
                                          class="ghost"
                                          @click=${this.handleCopyLink}
                                      >
                                          ${this.copyLabel}
                                      </button>
                                  </div>
                              </div>
                          </div>
                          ${this.renderProfilePanel()}
                          ${this.renderOnboarding()}
                      `
                    : showStaging
                      ? this.renderStagingArea()
                      : html`<div class="loading">
                            Preparing your retro board…
                        </div>`}
                ${this.renderProfileDialog()}
            </div>
        `;
    }

    private get copyLabel() {
        switch (this.copyState) {
            case "copied":
                return "Link copied";
            case "error":
                return "Copy failed";
            default:
                return "Copy link";
        }
    }

    private get shortBoardId() {
        if (!this.boardId) return "—";
        return this.boardId.slice(0, 6).toUpperCase();
    }

    private handleRoute() {
        const boardId = this.extractBoardId();
        if (!boardId) {
            this.returnToStaging();
            return;
        }

        if (boardId === this.boardId && this.controller) {
            return;
        }

        this.showStaging = false;
        this.bootstrapBoard(boardId);
    }

    private returnToStaging() {
        this.detachControllerListeners();
        this.controller?.dispose();
        this.controller = undefined;
        this.boardId = null;
        this.participants = [];
        this.connectionStatus = "disconnected";
        this.applyTimerState(null);
        this.showStaging = true;
        this.joinBoardInput = "";
        this.revealAll = false;
    }

    private extractBoardId(): string | null {
        const hash = window.location.hash.replace(/^#/, "");
        const match = hash.match(/board\/([\w-]+)/i);
        return match?.[1] ?? null;
    }

    private navigateToBoard(id: string) {
        this.connectionError = null;
        window.location.hash = `#/board/${id}`;
    }

    private bootstrapBoard(id: string) {
        this.detachControllerListeners();
        this.controller?.dispose();

        this.boardId = id;

        if (!this.profile) {
            this.controller = undefined;
            this.participants = [];
            this.connectionStatus = "disconnected";
            this.applyTimerState(null);
            return;
        }

        const controller = new BoardController(
            id,
            this.profileToParticipant(this.profile),
            this.background
        );
        controller.addEventListener(
            "participants-changed",
            this.onParticipantsChange
        );
        controller.addEventListener(
            "background-changed",
            this.onBackgroundChange
        );
        controller.addEventListener(
            "status-changed",
            this.onConnectionStatusChange
        );
        controller.addEventListener(
            "timer-changed",
            this.onTimerStateChange
        );
        controller.addEventListener(
            "reveal-changed",
            this.onRevealStateChange
        );
        controller.addEventListener(
            "connection-error",
            this.onControllerError
        );

        this.controller = controller;
        this.participants = controller.getParticipants();
        this.background = controller.getBoardBackground();
        this.persistBackground(this.background);
        this.connectionStatus = controller.status;
        this.applyTimerState(controller.getTimerState());
        this.connectionError = null;
        const storedReveal = this.readRevealState(id);
        const currentReveal = controller.getRevealState();
        if (storedReveal && !currentReveal) {
            this.revealAll = true;
            controller.setRevealState(true);
        } else {
            this.revealAll = currentReveal || storedReveal;
            this.persistRevealStateValue(id, this.revealAll);
        }
        this.recordRecentBoard(id);
        this.copyState = "idle";
    }

    private startFreshBoard = () => {
        this.navigateToBoard(uuid());
    };

    private async handleCopyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            this.copyState = "copied";
        } catch {
            this.copyState = "error";
        } finally {
            window.setTimeout(() => (this.copyState = "idle"), 2000);
        }
    }

    private initializeProfile() {
        const stored = this.readProfileFromStorage();
        if (stored) {
            this.profile = stored;
            this.profileDraft = { ...stored };
            this.showProfileDialog = false;
            this.ensureProfileId();
            return;
        }

        this.profile = null;
        this.profileDraft = { ...DEFAULT_PROFILE };
        this.showProfileDialog = true;
        this.ensureProfileId();
    }

    private initializeProfileId() {
        this.profileId = this.readProfileIdFromStorage();
        if (!this.profileId) {
            this.profileId = uuid();
            this.persistProfileId(this.profileId);
        }
    }

    private initializeOnboarding() {
        if (typeof window === "undefined") {
            this.showOnboarding = true;
            return;
        }
        try {
            const stored = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
            this.showOnboarding = stored !== "dismissed";
        } catch {
            this.showOnboarding = true;
        }
    }

    private readProfileFromStorage(): ProfileDraft | null {
        if (typeof window === "undefined") return null;
        try {
            const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (
                typeof parsed?.name !== "string" ||
                typeof parsed?.color !== "string"
            ) {
                return null;
            }
            return { name: parsed.name, color: parsed.color };
        } catch {
            return null;
        }
    }

    private persistProfile(profile: ProfileDraft) {
        if (typeof window === "undefined") return;
        const id = this.ensureProfileId();
        this.profileId = id;
        try {
            window.localStorage.setItem(
                PROFILE_STORAGE_KEY,
                JSON.stringify(profile)
            );
            this.persistProfileId(id);
        } catch {
            // ignore storage failures
        }
    }

    private renderProfileDialog() {
        if (!this.showProfileDialog && this.profile) {
            return null;
        }

        const nameReady = this.profileDraft.name.trim().length > 0;
        const canDismiss = Boolean(this.profile);

        return html`
            <div class="profile-overlay">
                <form class="profile-card" @submit=${this.handleProfileSubmit}>
                    <header>
                        <p class="eyebrow">Welcome</p>
                        <h2>Set up your marker</h2>
                        <p class="note">
                            Pick a display name and sticky color so teammates
                            know who is who.
                        </p>
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
                                class="color-picker"
                                .value=${this.profileDraft.color}
                                @input=${this.handleProfileColorInput}
                            />
                            <button
                                type="button"
                                class="ghost"
                                @click=${this.randomizeProfileColor}
                            >
                                Random
                            </button>
                        </div>
                    </label>
                    <div class="profile-actions">
                        ${canDismiss
                            ? html`<button
                                  type="button"
                                  class="ghost"
                                  @click=${this.closeProfileDialog}
                              >
                                  Cancel
                              </button>`
                            : null}
                        <button
                            class="primary"
                            type="submit"
                            ?disabled=${!nameReady}
                        >
                            ${this.profile ? "Save" : "Enter board"}
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    private renderFilterControl() {
        if (!this.participants.length) {
            return null;
        }

        return html`
            <label class="filter-control">
                <select
                    @change=${this.handleFilterChange}
                    .value=${this.highlightedParticipantId ?? ""}
                >
                    <option value="">All notes</option>
                    ${this.participants.map(
                        (participant) =>
                            html`<option value=${participant.id}>
                                ${participant.label}
                            </option>`
                    )}
                </select>
            </label>
        `;
    }

    private renderProfilePanel() {
        if (!this.profile) {
            return null;
        }

        const localId = this.localParticipantId;
        const others = this.participants.filter(
            (participant) => participant.id !== localId
        );

        return html`
            <div class="profile-panel">
                <button
                    type="button"
                    class="participant-circle self"
                    style=${`--circle:${this.profile.color}`}
                    @click=${this.openProfileDialog}
                    aria-label="Edit profile"
                    title="Edit profile"
                >
                    ${this.profileInitials}
                </button>
                <div class="participant-stack" role="list">
                    ${others.map(
                        (participant) => html`
                            <span
                                class="participant-circle peer"
                                role="listitem"
                                style=${`--circle:${participant.color}`}
                                title=${participant.label}
                            >
                                ${this.participantInitials(participant.label)}
                            </span>
                        `
                    )}
                </div>
            </div>
        `;
    }

    private renderOnboarding() {
        if (!this.showOnboarding) return null;
        return html`
            <div class="onboarding-card" role="dialog" aria-live="polite">
                <div class="onboarding-header">
                    <p class="eyebrow">Quick guide</p>
                    <button
                        type="button"
                        class="ghost onboarding-dismiss"
                        aria-label="Dismiss onboarding"
                        @click=${this.dismissOnboarding}
                    >
                        ×
                    </button>
                </div>
                <h3>Welcome to libRetro</h3>
                <ul>
                    <li>Double-click anywhere on the board to drop a sticky.</li>
                    <li>Hold and drag to pan; use the +/- buttons to zoom.</li>
                    <li>Press <strong>Shift + C</strong> to fire one confetti sling.</li>
                </ul>
                <button class="primary" type="button" @click=${this.dismissOnboarding}>
                    Got it
                </button>
            </div>
        `;
    }

    private handleFilterChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement).value;
        this.highlightedParticipantId = value || null;
    };

    private handleJoinInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.joinBoardInput = target.value;
    };

    private handleJoinBoard = (event: Event) => {
        event.preventDefault();
        const trimmed = this.joinBoardInput.trim();
        if (!trimmed) return;
        if (typeof window !== "undefined") {
            try {
                const url = new URL(trimmed, window.location.origin);
                const match = url.hash.match(/board\/([\w-]+)/i);
                if (match?.[1]) {
                    this.navigateToBoard(match[1]);
                    this.joinBoardInput = "";
                    return;
                }
            } catch {
                // not a full url, fall back to raw id
            }
        }
        this.navigateToBoard(trimmed);
        this.joinBoardInput = "";
    };

    private onControllerError = (event: Event) => {
        const detail = (event as CustomEvent<ControllerConnectionError>)
            .detail;
        if (!detail) return;
        if (detail.type === "peer-limit") {
            this.connectionError =
                "Your browser hit its peer connection limit. Close other tabs using libRetro or reload to try again.";
        } else {
            this.connectionError =
                detail.message || "Failed to join the board.";
        }
        this.returnToStaging();
    };

    private renderStagingArea() {
        return html`
            <div class="staging">
                <div class="staging-card">
                    ${this.connectionError
                        ? html`<div class="staging-error">
                              ${this.connectionError}
                          </div>`
                        : null}
                    <div class="staging-header">
                        <h2>Pick a session</h2>
                        <p>
                            Create a fresh retro or jump back into one of your
                            recent boards.
                        </p>
                    </div>
                    <button
                        class="primary"
                        type="button"
                        @click=${this.startFreshBoard}
                    >
                        Start a new board
                    </button>
                    <form class="join-form" @submit=${this.handleJoinBoard}>
                        <label>
                            <span>Join by ID</span>
                            <div class="join-row">
                                <input
                                    type="text"
                                    placeholder="Enter board ID or URL"
                                    .value=${this.joinBoardInput}
                                    @input=${this.handleJoinInput}
                                />
                                <button type="submit" class="ghost">
                                    Join
                                </button>
                            </div>
                        </label>
                    </form>
                    ${this.recentBoards.length
                        ? html`
                              <div class="recent-list">
                                  <p>Recent boards</p>
                                  <div class="recent-grid">
                                      ${this.recentBoards.map(
                                          (boardId) => html`
                                              <button
                                                  type="button"
                                                  class="recent-pill"
                                                  @click=${() =>
                                                      this.navigateToBoard(
                                                          boardId
                                                      )}
                                              >
                                                  <span class="pill-title">
                                                      ${boardId.slice(0, 6).toUpperCase()}
                                                  </span>
                                                  <span class="pill-sub">
                                                      ${boardId}
                                                  </span>
                                              </button>
                                          `
                                      )}
                                  </div>
                              </div>
                          `
                        : null}
                </div>
            </div>
        `;
    }

    private onTimerStateChange = (event: Event) => {
        const detail = (event as CustomEvent<TimerState>).detail;
        if (!detail) return;
        if (
            this.pendingTimerBroadcastKey &&
            this.pendingTimerBroadcastKey === this.timerStateKey(detail)
        ) {
            this.pendingTimerBroadcastKey = null;
            return;
        }
        this.applyTimerState(detail);
    };

    private onRevealStateChange = (event: Event) => {
        const detail = (event as CustomEvent<boolean>).detail;
        this.revealAll = Boolean(detail);
        if (this.boardId) {
            this.persistRevealStateValue(this.boardId, this.revealAll);
        }
    };

    private onConnectionStatusChange = (event: Event) => {
        const detail = (event as CustomEvent<ConnectionStatus>).detail;
        if (!detail) return;
        this.connectionStatus = detail;
    };

    private renderTimerControl() {
        return html`
            <div class="timer-control">
                <button
                    type="button"
                    class="ghost timer-add"
                    @click=${this.addTimerMinute}
                >
                    +
                </button>
                <span class="timer-display" aria-live="polite">
                    ${this.formattedTimer}
                </span>
                <button
                    type="button"
                    class="ghost"
                    @click=${this.toggleTimer}
                    ?disabled=${!this.canStartTimer}
                    aria-label=${this.timerRunning ? "Pause timer" : "Start timer"}
                >
                    ${this.timerRunning ? "⏸" : "▶"}
                </button>
                <button
                    type="button"
                    class="ghost"
                    ?disabled=${!this.canResetTimer}
                    @click=${this.resetTimer}
                    aria-label="Reset timer"
                >
                    🔄
                </button>
            </div>
        `;
    }

    private renderConnectionStatus() {
        if (this.connectionStatus === "connected") {
            return null;
        }
        return html`
            <span
                class=${`connection-status ${this.connectionStatus}`}
                aria-live="polite"
            >
                ${this.connectionStatusLabel}
            </span>
        `;
    }

    private renderBackgroundControl() {
        return html`
            <label class="filter-control">
                <select
                    @change=${this.handleBackgroundChange}
                    .value=${this.background}
                >
                    ${BOARD_BACKGROUNDS.map(
                        (layout) =>
                            html`<option value=${layout.id}>
                                ${layout.label}
                            </option>`
                    )}
                </select>
            </label>
        `;
    }

    private handleBackgroundChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement)
            .value as BackgroundKey;
        this.background = value;
        this.persistBackground(value);
        this.controller?.setBoardBackground(value);
    };

    private handleConfettiShortcut = (event: KeyboardEvent) => {
        if (!this.isReadyForConfetti || !this.isShortcutEvent(event)) {
            return;
        }
        event.preventDefault();
        this.confettiEnabled = !this.confettiEnabled;
    };

    private handleConfettiShot = () => {
        this.confettiEnabled = false;
    };

    private handleRevealAll = () => {
        if (this.revealAll) return;
        if (this.controller) {
            this.controller.setRevealState(true);
        } else {
            this.revealAll = true;
        }
        if (this.boardId) {
            this.persistRevealStateValue(this.boardId, true);
        }
    };

    private toggleTimer = () => {
        if (this.timerRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    };

    private startTimer() {
        if (this.timerRunning) return;
        const remaining = this.currentTimerRemaining;
        if (remaining <= 0) return;
        this.pushTimerState(this.createTimerState(true, remaining));
    }

    private pauseTimer() {
        if (!this.timerRunning) return;
        const remaining = this.currentTimerRemaining;
        this.pushTimerState(this.createTimerState(false, remaining));
    }

    private resetTimer = () => {
        this.pushTimerState(this.createTimerState(false, 0));
    };

    private addTimerMinute = () => {
        const nextRemaining = this.currentTimerRemaining + MINUTE;
        const state = this.createTimerState(this.timerRunning, nextRemaining);
        this.pushTimerState(state);
    };

    private clearTimerInterval() {
        if (this.timerInterval === null) return;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

    private pushTimerState(state: TimerState) {
        this.applyTimerState(state);
        if (this.controller) {
            this.pendingTimerBroadcastKey = this.timerStateKey(state);
            this.controller.updateTimerState(state);
        } else {
            this.pendingTimerBroadcastKey = null;
        }
    }

    private applyTimerState(state: TimerState | null) {
        const previouslyRunning = this.timerRunning;
        this.clearTimerInterval();
        if (!state) {
            this.timerRunning = false;
            this.timerRemainingMs = 0;
            this.timerDeadline = null;
            this.pendingTimerBroadcastKey = null;
            return;
        }
        this.timerRunning = state.running;
        if (state.running && state.deadline) {
            this.timerDeadline = state.deadline;
            this.tickTimerFromDeadline();
            if (typeof window !== "undefined") {
                this.timerInterval = window.setInterval(
                    () => this.tickTimerFromDeadline(),
                    250
                );
            }
        } else {
            this.timerDeadline = null;
            this.timerRemainingMs = state.remainingMs;
            if (previouslyRunning && state.remainingMs === 0) {
                this.playTimerAlarm();
            }
        }
    }

    private tickTimerFromDeadline() {
        if (!this.timerDeadline) return;
        const remaining = Math.max(0, this.timerDeadline - Date.now());
        this.timerRemainingMs = remaining;
        if (remaining === 0) {
            this.pushTimerState(this.createTimerState(false, 0));
        }
    }

    private createTimerState(
        running: boolean,
        remainingMs: number
    ): TimerState {
        const clamped = Math.max(0, Math.round(remainingMs));
        const now = Date.now();
        return {
            running,
            remainingMs: clamped,
            deadline: running ? now + clamped : null,
            updatedAt: now,
        };
    }

    private get currentTimerRemaining() {
        if (this.timerRunning && this.timerDeadline) {
            return Math.max(0, this.timerDeadline - Date.now());
        }
        return this.timerRemainingMs;
    }

    private timerStateKey(state: TimerState) {
        return `${state.updatedAt}:${state.running ? 1 : 0}:${state.remainingMs}:${state.deadline ?? 0}`;
    }

    private detachControllerListeners() {
        this.controller?.removeEventListener(
            "participants-changed",
            this.onParticipantsChange
        );
        this.controller?.removeEventListener(
            "background-changed",
            this.onBackgroundChange
        );
        this.controller?.removeEventListener(
            "status-changed",
            this.onConnectionStatusChange
        );
        this.controller?.removeEventListener(
            "timer-changed",
            this.onTimerStateChange
        );
        this.controller?.removeEventListener(
            "connection-error",
            this.onControllerError
        );
        this.controller?.removeEventListener(
            "reveal-changed",
            this.onRevealStateChange
        );
    }

    private playTimerAlarm() {
        if (typeof window === "undefined") return;
        const AudioContextClass =
            window.AudioContext ||
            (window as typeof window & {
                webkitAudioContext?: typeof AudioContext;
            }).webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            this.audioContext ??= new AudioContextClass();
            const ctx = this.audioContext;
            if (ctx.state === "suspended") {
                void ctx.resume();
            }
            const now = ctx.currentTime;
            const beepDuration = 0.35;
            const gap = 0.12;
            for (let i = 0; i < 3; i++) {
                const start = now + i * (beepDuration + gap);
                const oscillator = ctx.createOscillator();
                oscillator.type = "square";
                oscillator.frequency.setValueAtTime(950 + i * 20, start);

                const vibrato = ctx.createOscillator();
                vibrato.type = "sine";
                vibrato.frequency.setValueAtTime(5, start);
                const vibratoGain = ctx.createGain();
                vibratoGain.gain.value = 18;
                vibrato.connect(vibratoGain).connect(oscillator.frequency);

                const filter = ctx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(1800, start);
                filter.Q.value = 0.8;

                const mainGain = ctx.createGain();
                mainGain.gain.setValueAtTime(0.0001, start);
                mainGain.gain.exponentialRampToValueAtTime(0.6, start + 0.02);
                mainGain.gain.exponentialRampToValueAtTime(
                    0.001,
                    start + beepDuration
                );

                const delay = ctx.createDelay();
                delay.delayTime.value = 0.18;
                const delayGain = ctx.createGain();
                delayGain.gain.value = 0.25;
                delay.connect(delayGain).connect(ctx.destination);

                oscillator.connect(filter);
                filter.connect(mainGain).connect(ctx.destination);
                filter.connect(delay);

                oscillator.start(start);
                oscillator.stop(start + beepDuration + 0.4);
                vibrato.start(start);
                vibrato.stop(start + beepDuration + 0.4);
            }
        } catch {
            // ignore audio failures
        }
    }

    private get canStartTimer() {
        return this.timerRunning || this.timerRemainingMs > 0;
    }

    private get canResetTimer() {
        return this.timerRunning || this.timerRemainingMs > 0;
    }

    private get formattedTimer() {
        const totalSeconds = Math.ceil(this.timerRemainingMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = (value: number) => value.toString().padStart(2, "0");
        return hours > 0
            ? `${hours}:${pad(minutes)}:${pad(seconds)}`
            : `${pad(minutes)}:${pad(seconds)}`;
    }

    private get connectionStatusLabel() {
        switch (this.connectionStatus) {
            case "connected":
                return "Connected";
            case "disconnected":
                return "Disconnected";
            default:
                return "Connecting…";
        }
    }

    private get isReadyForConfetti() {
        return Boolean(this.boardId && this.controller && this.profile);
    }

    private get localParticipantId() {
        return this.controller?.getLocalParticipant()?.id ?? null;
    }

    private get profileInitials() {
        const name = this.profile?.name?.trim();
        if (!name) {
            return "YOU";
        }
        const parts = name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("");
        return (parts || name.slice(0, 2)).toUpperCase();
    }

    private participantInitials(label?: string | null) {
        const safe = label?.trim();
        if (!safe) return "?";
        const parts = safe
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("");
        return (parts || safe.slice(0, 2)).toUpperCase();
    }

    private isShortcutEvent(event: KeyboardEvent) {
        if (!event.shiftKey || event.key.toLowerCase() !== "c") {
            return false;
        }
        const target = event.target as HTMLElement | null;
        if (!target) return true;
        const tag = target.tagName;
        const editable =
            target.getAttribute("contenteditable")?.toLowerCase() === "true";
        return !(
            editable ||
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        );
    }

    private handleProfileSubmit = (event: Event) => {
        event.preventDefault();
        const trimmed = this.profileDraft.name.trim();
        if (!trimmed) return;
        const profile: ProfileDraft = {
            name: trimmed,
            color: this.profileDraft.color || DEFAULT_PROFILE.color,
        };
        this.profile = profile;
        this.profileDraft = { ...profile };
        this.showProfileDialog = false;
        this.persistProfile(profile);
        if (this.boardId) {
            this.bootstrapBoard(this.boardId);
        } else {
            this.handleRoute();
        }
    };

    private handleProfileNameInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.profileDraft = { ...this.profileDraft, name: target.value };
    };

    private handleProfileColorInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.profileDraft = { ...this.profileDraft, color: target.value };
    };

    private randomizeProfileColor = () => {
        const next =
            PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)];
        this.profileDraft = { ...this.profileDraft, color: next };
    };

    private dismissOnboarding = () => {
        this.showOnboarding = false;
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(ONBOARDING_STORAGE_KEY, "dismissed");
        } catch {
            // ignore storage errors
        }
    };

    private openProfileDialog = () => {
        this.profileDraft = this.profile
            ? { ...this.profile }
            : { ...DEFAULT_PROFILE };
        this.showProfileDialog = true;
    };

    private closeProfileDialog = () => {
        if (!this.profile) return;
        this.profileDraft = { ...this.profile };
        this.showProfileDialog = false;
    };

    private profileToParticipant(
        profile: ProfileDraft
    ): LocalParticipantConfig {
        return {
            label: profile.name,
            color: profile.color,
            ownerKey: this.ensureProfileId(),
        };
    }

    private initializeBackground() {
        const stored = this.readBackgroundFromStorage();
        this.background = stored ?? "start-stop-continue";
    }

    private readBackgroundFromStorage(): BackgroundKey | null {
        if (typeof window === "undefined") return null;
        const value = window.localStorage.getItem(BACKGROUND_STORAGE_KEY);
        if (!value) return null;
        return BOARD_BACKGROUNDS.some((layout) => layout.id === value)
            ? (value as BackgroundKey)
            : null;
    }

    private persistBackground(value: BackgroundKey) {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(BACKGROUND_STORAGE_KEY, value);
    }

    private initializeRecentBoards() {
        if (typeof window === "undefined") {
            this.recentBoards = [];
            return;
        }
        try {
            const raw = window.localStorage.getItem(
                RECENT_BOARDS_STORAGE_KEY
            );
            if (!raw) {
                this.recentBoards = [];
                return;
            }
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                this.recentBoards = parsed
                    .filter((value) => typeof value === "string")
                    .slice(0, 8);
            } else {
                this.recentBoards = [];
            }
        } catch {
            this.recentBoards = [];
        }
    }

    private persistRecentBoards(boards: string[]) {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(
                RECENT_BOARDS_STORAGE_KEY,
                JSON.stringify(boards)
            );
        } catch {
            // ignore storage write failures
        }
    }

    private recordRecentBoard(id: string) {
        const normalized = id.trim();
        if (!normalized) return;
        const deduped = [
            normalized,
            ...this.recentBoards.filter((entry) => entry !== normalized),
        ].slice(0, 8);
        this.recentBoards = deduped;
        this.persistRecentBoards(deduped);
    }

    private readProfileIdFromStorage() {
        if (typeof window === "undefined") return null;
        try {
            const raw = window.localStorage.getItem(
                PROFILE_ID_STORAGE_KEY
            );
            return raw ?? null;
        } catch {
            return null;
        }
    }

    private persistProfileId(id: string) {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(PROFILE_ID_STORAGE_KEY, id);
        } catch {
            // ignore storage errors
        }
    }

    private ensureProfileId() {
        if (this.profileId) return this.profileId;
        const stored = this.readProfileIdFromStorage();
        if (stored) {
            this.profileId = stored;
            return stored;
        }
        const generated = uuid();
        this.profileId = generated;
        this.persistProfileId(generated);
        return generated;
    }

    private revealStorageKey(boardId: string) {
        return `${REVEAL_STORAGE_PREFIX}${boardId}`;
    }

    private readRevealState(boardId: string) {
        if (typeof window === "undefined") return false;
        try {
            return (
                window.localStorage.getItem(
                    this.revealStorageKey(boardId)
                ) === "revealed"
            );
        } catch {
            return false;
        }
    }

    private persistRevealStateValue(boardId: string, revealed: boolean) {
        if (typeof window === "undefined") return;
        try {
            const key = this.revealStorageKey(boardId);
            if (revealed) {
                window.localStorage.setItem(key, "revealed");
            } else {
                window.localStorage.removeItem(key);
            }
        } catch {
            // ignore storage errors
        }
    }

    static styles = css`
        :host {
            display: block;
            font-family:
                "Inter",
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                sans-serif;
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

        .staging {
            margin-top: 10vh;
            display: flex;
            justify-content: center;
            pointer-events: auto;
        }

        .staging-card {
            width: min(520px, 100%);
            background: rgba(255, 255, 255, 0.98);
            border-radius: 18px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            padding: 1.75rem;
            box-shadow: 0 18px 50px rgba(15, 23, 42, 0.15);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .staging-error {
            border-radius: 12px;
            border: 1px solid rgba(248, 113, 113, 0.4);
            background: rgba(254, 226, 226, 0.7);
            color: #b91c1c;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
        }

        .staging-header h2 {
            margin: 0;
        }

        .staging-header p {
            margin: 0.25rem 0 0;
            color: #475569;
        }

        .join-form label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.85rem;
            color: #475569;
        }

        .join-row {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .join-row input {
            flex: 1;
            min-width: 0;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.6);
            padding: 0.5rem 0.75rem;
            font-size: 0.95rem;
        }

        .recent-list {
            margin-top: 0.5rem;
        }

        .recent-list p {
            margin: 0 0 0.5rem;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #94a3b8;
        }

        .recent-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .recent-pill {
            border-radius: 12px;
            border: 1px solid rgba(148, 163, 184, 0.4);
            padding: 0.5rem 0.85rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background: #ffffff;
            cursor: pointer;
        }

        .pill-title {
            font-weight: 600;
            font-size: 0.9rem;
        }

        .pill-sub {
            font-size: 0.7rem;
            color: #94a3b8;
        }

        .toolbar {
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 0.85rem 1.25rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
            width: min(100%, 960px);
        }

        .toolbar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 0;
        }

        .logo-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(120deg, #0ea5e9, #6366f1);
        }

        .brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
        }

        .title {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: #111827;
        }

        .meta {
            margin: 0;
            font-size: 0.8rem;
            color: #6b7280;
        }

        .toolbar-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .timer-control {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.35rem 0.75rem;
            border-radius: 10px;
            background: rgba(15, 23, 42, 0.05);
            border: 1px solid rgba(15, 23, 42, 0.06);
            font-size: 0.9rem;
            flex-wrap: wrap;
            font-family:
                "JetBrains Mono",
                "SFMono-Regular",
                Menlo,
                Consolas,
                monospace;
        }

        .connection-status {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.8rem;
            padding: 0.25rem 0.6rem;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.06);
            color: #0f172a;
            font-weight: 500;
        }

        .connection-status.connecting::before,
        .connection-status.disconnected::before,
        .connection-status.connected::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            display: inline-block;
        }

        .connection-status.connecting {
            color: #f97316;
        }

        .connection-status.disconnected {
            color: #ef4444;
        }

        .connection-status.connected {
            color: #22c55e;
        }

        .timer-display {
            font-weight: 600;
            font-variant-numeric: tabular-nums;
            min-width: 60px;
            text-align: center;
        }

        .timer-add {
            font-size: 1.1rem;
            line-height: 1;
            padding: 0.3rem 0.75rem;
        }

        .timer-control button {
            padding: 0.3rem 0.75rem;
        }

        .timer-control button[disabled] {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .toolbar-actions {
            display: flex;
            gap: 0.45rem;
            align-items: center;
        }

        .filter-control {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.75rem;
            color: #64748b;
        }

        .filter-control span {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.7rem;
            color: #94a3b8;
        }

        .filter-control select {
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.6);
            padding: 0.35rem 0.9rem;
            font-size: 0.85rem;
            background: #ffffff;
        }

        .eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin: 0;
            color: #94a3b8;
        }

        button {
            border-radius: 8px;
            padding: 0.45rem 1.1rem;
            font-size: 0.9rem;
            cursor: pointer;
            transition:
                background 120ms ease,
                color 120ms ease;
            pointer-events: auto;
            border: 1px solid transparent;
        }

        .primary {
            background: #111827;
            color: #f8fafc;
            border-color: #111827;
        }

        .ghost {
            background: #ffffff;
            color: #111827;
            border-color: rgba(15, 23, 42, 0.15);
        }

        .profile-panel {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            pointer-events: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
        }

        .participant-stack {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            align-items: center;
        }

        .onboarding-card {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            width: min(280px, 90vw);
            background: rgba(255, 255, 255, 0.98);
            border-radius: 16px;
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.15);
            padding: 1rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }

        .onboarding-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
        }

        .onboarding-card h3 {
            margin: 0;
            font-size: 1.1rem;
        }

        .onboarding-card ul {
            margin: 0;
            padding-left: 1.1rem;
            color: #475569;
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }

        .onboarding-card strong {
            font-weight: 600;
            color: #0f172a;
        }

        .onboarding-dismiss {
            width: 28px;
            height: 28px;
            padding: 0;
            display: grid;
            place-items: center;
            font-size: 1.1rem;
            border-radius: 50%;
        }

        .participant-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--circle, #94a3b8);
            color: #0f172a;
            font-weight: 600;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(15, 23, 42, 0.18);
            box-shadow: 0 6px 12px rgba(15, 23, 42, 0.12);
        }

        .participant-circle.self {
            width: 48px;
            height: 48px;
            cursor: pointer;
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
            border-radius: 16px;
            padding: 1.75rem;
            box-shadow: 0 25px 60px rgba(15, 23, 42, 0.15);
            border: 1px solid rgba(15, 23, 42, 0.08);
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

        input[type="text"] {
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.6);
            padding: 0.65rem 0.9rem;
            font-size: 1rem;
        }

        .color-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .color-picker {
            width: 52px;
            height: 44px;
            padding: 0;
            border: 1px solid rgba(148, 163, 184, 0.6);
            border-radius: 10px;
            background: #ffffff;
            cursor: pointer;
        }

        .color-picker::-webkit-color-swatch-wrapper {
            padding: 0;
            border-radius: 8px;
        }

        .color-picker::-webkit-color-swatch {
            border: none;
            border-radius: 8px;
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
                align-items: stretch;
                gap: 0.85rem;
            }

            .toolbar-controls {
                width: 100%;
                justify-content: flex-start;
            }

            .toolbar-actions {
                width: 100%;
                justify-content: flex-start;
                flex-wrap: wrap;
            }

            .profile-card {
                padding: 1.25rem;
            }

            .staging {
                margin-top: 4vh;
            }

            .staging-card {
                padding: 1.25rem;
            }

            .join-row {
                flex-direction: column;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "app-root": AppRoot;
    }
}
