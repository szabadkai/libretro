Below is a compact PRD draft for an MVP “Metro Retro”-style app based on what you described. You can copy this into your own doc and tweak as needed.

---

# 1. Product Overview

A lightweight, browser-based retro board tool with a default “Good / Bad / Start / Stop” format. Users can create draggable sticky notes by double-clicking on the board and collaborate with others via a shareable URL (no login required).

---

# 2. Goals & Non-Goals

## 2.1 Goals (MVP)

- Enable small teams (3–15 people) to run a retrospective session quickly.
- Provide a default “Good / Bad / Start / Stop” board layout.
- Allow users to:
    - Create sticky notes by double-clicking.
    - Edit and drag sticky notes within the board.
    - Invite others by sharing the browser URL.
- Show updates to all participants in real time.

## 2.2 Non-Goals (MVP)

- No authentication / user accounts.
- No advanced templates, voting, timers, grouping, or export.
- No mobile-optimized experience beyond “works OK” in mobile browsers.
- No integrations (Jira, Slack, etc.).

---

# 3. Users & Use Cases

## 3.1 Primary Users

- Scrum masters / engineering managers.
- Team members attending retrospectives.

## 3.2 Key Use Cases

1. **Create a retro board**
    - As a facilitator, I open the site and get a new “Good / Bad / Start / Stop” board.
2. **Invite participants**
    - I copy the URL from my browser and share it in chat; people join the same board.
3. **Add notes**
    - Any participant double-clicks on the board (or a column) to create a sticky note.
4. **Organize notes**
    - Participants drag notes to reposition them within or across columns.
5. **Edit / delete notes**
    - Participants can change the text or remove a note if it’s no longer needed.

---

# 4. Functional Requirements

## 4.1 Board & Sessions

- FR-1: Landing on the app root creates a new board session with a unique URL.
- FR-2: The board layout must default to four columns:
    - “Good”
    - “Bad”
    - “Start”
    - “Stop”
- FR-3: Board state is associated with the unique URL and is retrievable by revisiting it.
- FR-4: No login required. Any user with the link has full edit permissions.

## 4.2 Sticky Notes

- FR-5: Double-clicking on the board creates a new sticky note.
    - Option A (recommend): Double-click inside a column → note appears in that column.
    - If double-click behavior is outside defined columns, behavior must be defined
      (e.g., create under nearest column).
- FR-6: New note defaults:
    - Empty text field (focused for immediate typing).
    - Default color (e.g., yellow).
    - Default size (e.g., fits ~3 short lines of text).
- FR-7: Users can:
    - Click to edit note text (inline editing).
    - Press Enter to confirm (and/or blur to save).
    - Press Escape to cancel (optional).
- FR-8: Users can drag notes:
    - Within the same column.
    - Across columns (changing the note’s “bucket”).
- FR-9: Users can delete a note (e.g., via a small “X” button on the note).

## 4.3 Real-Time Collaboration

- FR-10: When multiple users are on the same board URL:
    - Creating, editing, deleting, and dragging notes must be reflected to others
      in near real time (e.g., <500 ms typical delay).
- FR-11: Basic presence indicator:
    - Minimum: Show that other users are connected (e.g., “3 participants” count in header).
    - Nice-to-have (optional for MVP): Anonymous avatars like “Guest A/B/C”.

## 4.4 URL-Based Invitation

- FR-12: The board URL is stable and shareable:
    - Copying the URL from the browser and opening it in another browser joins the same board.
- FR-13: No “invite” UI is required beyond this (MVP); future versions may add explicit “Copy link” button.

---

# 5. UX & UI Requirements

## 5.1 Layout

- Four columns displayed horizontally on desktop.
- Each column:
    - Has a title (“Good”, “Bad”, “Start”, “Stop”).
    - Accepts sticky notes placed inside it.
- Notes appear clearly “inside” columns; columns should visually delimit areas.

## 5.2 Interactions

- Double-click:
    - Double-click inside a column → create note at click position or column default position.
- Drag & drop:
    - Click-and-hold to drag; visual feedback (note follows cursor, slight shadow).
    - Drop snaps note to the target column area.
- Editing:
    - Single click (or double-click) on a note to edit text inline.
    - Short, text-only content (no formatting needed).
- Deleting:
    - Small icon (e.g., “X”) on the note; click to delete.
    - Optional confirmation for MVP (can be omitted for speed).

## 5.3 Visual Design (MVP)

- Clean, minimal design, default light theme.
- Column headers clearly labeled.
- Notes with:
    - Subtle drop shadow, rounded corners.
    - Legible font and contrast.
- Responsive enough to work on common laptop screen sizes; mobile can degrade gracefully.

---

# 6. Technical & Non-Functional Requirements

## 6.1 Platform & Tech (assumptions, adjustable)

- Web app, desktop-first.
- Real-time sync via WebSockets or similar.
- Data storage:
    - Persist board state (columns + notes) in a simple database or in-memory with periodic persistence.
    - Boards should persist at least X days (define: e.g., 30 days) before cleanup.

## 6.2 Performance & Scale

- NF-1: Board load in <2 seconds on standard broadband.
- NF-2: Support at least 20 concurrent users per board with smooth drag behavior.
- NF-3: Real-time updates typically visible to others within <500 ms.

## 6.3 Reliability

- NF-4: If a user reloads the page, they rejoin the same board and see the current state.
- NF-5: If connection drops, changes should resync upon reconnection (no data loss for committed actions).

---

# 7. Analytics & Metrics (MVP-level)

- A-1: Track number of boards created.
- A-2: Track average participants per board.
- A-3: Track basic engagement: number of notes per board.

Success criteria (for MVP validation):

- At least N teams (define) successfully run a retro without needing support.
- Feedback: majority of test users report “easy to use” and “good enough for basic retros”.

---

# 8. Out of Scope (Explicit)

- Voting on notes.
- Grouping/merging notes.
- Timers, stages, or facilitation flows.
- Authentication, user profiles, or permissions beyond “anyone with link can edit”.
- Export to PDF/CSV, screenshots, or integration with external tools.

---

# 9. Open Questions

You can fill these in as you decide:

1. Should notes have different colors (e.g., per column or all the same)?
2. Should deletion require confirmation?
3. How long should boards persist before they are auto-deleted?
4. Do we need a simple “home” or “list of recent boards,” or is “always create new board on landing” sufficient for MVP?
5. Do we need a minimal “board name” (e.g., “Sprint 24 Retro”) field?

---

If you want, next step I can turn this PRD into a more detailed technical spec (API shape, data model, and front-end component breakdown) for your team.
