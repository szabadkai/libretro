import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { v4 as uuid } from "uuid";
import {
    BoardController,
    type LocalParticipantConfig,
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
const PROFILE_COLORS = [
    "#fbbf24",
    "#ef4444",
    "#22d3ee",
    "#a855f7",
    "#34d399",
    "#f472b6",
];
const DEFAULT_PROFILE: ProfileDraft = { name: "", color: PROFILE_COLORS[0] };

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
        this.initializeBackground();
        this.initializeOnboarding();
        window.addEventListener("hashchange", this.onHashChange);
        window.addEventListener("keydown", this.handleConfettiShortcut);
        this.handleRoute();
    }

    disconnectedCallback() {
        window.removeEventListener("hashchange", this.onHashChange);
        window.removeEventListener("keydown", this.handleConfettiShortcut);
        this.controller?.removeEventListener(
            "participants-changed",
            this.onParticipantsChange
        );
        this.controller?.removeEventListener(
            "background-changed",
            this.onBackgroundChange
        );
        this.controller?.dispose();
        super.disconnectedCallback();
    }

    render() {
        const ready = Boolean(this.boardId && this.controller && this.profile);

        return html`
            <retro-board
                .controller=${this.controller}
                .highlightedParticipantId=${this.highlightedParticipantId}
                .background=${this.background}
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
                                  <div class="toolbar-actions">
                                      <button
                                          class="ghost"
                                          @click=${this.handleCopyLink}
                                      >
                                          ${this.copyLabel}
                                      </button>
                                      <button
                                          class="primary"
                                          @click=${this.startFreshBoard}
                                      >
                                          New
                                      </button>
                                  </div>
                              </div>
                          </div>
                          ${this.renderProfilePanel()}
                          ${this.renderOnboarding()}
                      `
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
            this.navigateToBoard(uuid());
            return;
        }

        if (boardId === this.boardId && this.controller) {
            return;
        }

        this.bootstrapBoard(boardId);
    }

    private extractBoardId(): string | null {
        const hash = window.location.hash.replace(/^#/, "");
        const match = hash.match(/board\/([\w-]+)/i);
        return match?.[1] ?? null;
    }

    private navigateToBoard(id: string) {
        window.location.hash = `#/board/${id}`;
    }

    private bootstrapBoard(id: string) {
        this.controller?.removeEventListener(
            "participants-changed",
            this.onParticipantsChange
        );
        this.controller?.removeEventListener(
            "background-changed",
            this.onBackgroundChange
        );
        this.controller?.dispose();

        this.boardId = id;

        if (!this.profile) {
            this.controller = undefined;
            this.participants = [];
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

        this.controller = controller;
        this.participants = controller.getParticipants();
        this.background = controller.getBoardBackground();
        this.persistBackground(this.background);
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
            return;
        }

        this.profile = null;
        this.profileDraft = { ...DEFAULT_PROFILE };
        this.showProfileDialog = true;
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
        try {
            window.localStorage.setItem(
                PROFILE_STORAGE_KEY,
                JSON.stringify(profile)
            );
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
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "app-root": AppRoot;
    }
}
