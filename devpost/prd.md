---
doc: prd
status: approved
---

# Restoration Lab — Product Requirements

A single-screen outage-restoration training drill for junior distribution engineers and engineering students.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

Approval basis: the learner approved the proposed product direction and delegated the remaining product details for an autonomous build.

## The Core Journey
1. The learner lands on a ten-second brief that states the outage problem, why switching order matters and how the pre-action safety gate teaches the solution.
2. The mission says a fault has interrupted 700 customers and a hospital, and points to Watch demo as the fastest guided start.
3. The one-line diagram shows two sources, a faulted segment, four switches and three customer groups. Energized and de-energized paths are visually distinct.
4. The learner selects a switch. The app evaluates the proposed network before applying it.
5. An unsafe action is blocked. The diagram briefly marks the risky path and a receipt explains the broken rule.
6. A safe action changes the network. Customer, hospital and action counters update, and the event appears in the timeline.
7. The learner continues until the fault is isolated, the healthy left section is fed from Source A and the hospital plus Riverside are fed through the backup tie.
8. A completion panel reports the accepted action count, blocked attempts and restored service. Reset starts the drill again.

## Screens and Layout
One responsive training console.

- Top bar: product name, educational-simulator label, Reset and Watch demo controls.
- Mission strip: the outage story, named learner audience and the three restoration goals.
- Judge brief: three compact statements labeled The problem, Why it matters and How we solve it, followed by one clear starting instruction.
- Evidence strip: four safety rules, six graph tests, four browser journeys and zero live-grid connections.
- Center: the interactive one-line diagram. This is the visual focus.
- Left rail: live service totals and safety-check status.
- Right rail: coach message, optional hint and event timeline.
- Completion panel: appears over the console without leaving the page.

On narrow screens the rails stack below the diagram. The controls remain usable with a keyboard.

## Look and Feel
A calm, readable learning page rather than a crowded control-room replica. Use a light neutral canvas, white explanation and status cards and one dark forest technical panel for the interactive diagram. Give the diagram a full row, then place status and mission evidence in two roomy columns below it. Body copy should be at least 13-15px on desktop, with larger headings that can be understood at a glance. Amber marks attention, red marks danger and green marks safe energized paths. Motion should clarify power flow and blocked actions, never decorate empty space.

## Features and Behavior

### Interactive One-Line Diagram
Source: `scope.md > The Core Loop`.

- Four switches can be opened or closed from the diagram and from an accessible control list.
- Closed energized conductors glow green; de-energized conductors stay muted.
- The faulted segment is always marked and never presented as safe.
- Loads show their service state, customer count and demand.
- Hover and keyboard focus reveal the switch name and current state.

Acceptance criteria:
- [ ] The starting state shows all Source A loads off, Source B available and the backup tie open.
- [ ] Operating a valid switch updates the diagram and service totals in the same interaction.
- [ ] Every switch control works with mouse and keyboard.

### Pre-Action Safety Gate
Source: `scope.md > The Unique Kernel`.

Before a proposed switch change is applied, the app checks:

1. No source can energize the faulted segment.
2. No connected section can be fed from both sources.
3. Connected demand cannot exceed either source path's simplified capacity.
4. A completed run must restore the hospital and every healthy customer section.

Acceptance criteria:
- [ ] Closing Source A before the west isolator is open is blocked as fault energization.
- [ ] Closing the backup tie before the east isolator is open is blocked as fault energization.
- [ ] A blocked action does not alter switch state or accepted-action count.
- [ ] The receipt names the switch, attempted state and failed rule.

### Mission, Feedback and Timeline
Source: `scope.md > What "Working" Looks Like`.

- The mission stays visible and lists the goals: isolate the fault, restore the hospital and restore all healthy customers.
- A coach panel reports the latest accepted or blocked action in plain language.
- The timeline records accepted actions and blocked attempts with distinct symbols.
- Hint reveals one next safe idea. It never operates a switch automatically.

Acceptance criteria:
- [ ] Reset restores the original switch states, empty timeline and counters.
- [ ] The correct four accepted actions finish the mission.
- [ ] A run with a blocked attempt still completes but reports that attempt.

### Guided Demo
Source: `scope.md > The POC Boundary`.

- Watch demo resets the drill, shows one blocked attempt, then plays a safe restoration sequence.
- The demo can be stopped by Reset or any manual switch action.
- Each step is slow enough to understand in a short recording.

Acceptance criteria:
- [ ] The demo ends with 700 customers and the hospital restored.
- [ ] The event timeline visibly contains the blocked attempt and four accepted actions.

## States and Boundaries
- **Start** — fault marked, Source A breaker open, backup tie open, 0 of 700 customers restored.
- **Blocked action** — proposed state is rejected, danger path and receipt appear, network remains unchanged.
- **Progress** — accepted switch state, energized paths, checks and totals update together.
- **Complete** — all healthy loads and hospital restored while the fault remains isolated.
- **Reset** — original scenario returns immediately.
- **Small screen** — diagram stays horizontally scrollable instead of shrinking labels below readability.

## Product Decisions
- The learner approved Restoration Lab and requested Codex to make the remaining choices without questions.
- Agent decision: make the drill educational and synthetic so no private or operational data is needed.
- Agent decision: show one blocked move in demo mode because the safety gate is the memorable product behavior.
- Agent decision: keep all core logic deterministic. A language model is not allowed to approve switching states.

## What We're Building
The complete one-screen journey above, deterministic checks, the fixed scenario, timeline, hints, reset and guided demo.

## Deferred From the POC
- Scenario editor and saved drills: one authored scenario proves the teaching loop.
- Full distribution power flow: beyond the small proof and risky to imply operational accuracy.
- Hosted accounts or instructor dashboard: no value for the recorded demonstration.
- Generated coaching: fixed explanations are faster, safer and testable.

## Possible Later Enhancements
Add several named restoration drills, instructor-authored networks and a step-by-step replay export.

## Non-Goals
- Not a SCADA interface, digital twin or operating procedure.
- Not a replacement for utility switching orders, protection studies or operator authorization.
- Not connected to real customer, asset or outage data.

## Open Questions
None block the build. Simplified capacity checks must be described as instructional approximations in the interface and README.

