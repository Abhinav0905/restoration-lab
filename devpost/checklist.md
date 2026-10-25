---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast. Approval basis: the learner requested an autonomous end-to-end build with no follow-up questions. Mechanical checks and commits remain mandatory. Learner feedback checkpoints stay recorded separately and will not be claimed without the learner.

## Slices

- [x] **1. The faulted feeder runs and reacts to switch actions**
  Becomes usable: A browser app shows the complete synthetic one-line diagram, service totals and working switch controls backed by the graph engine.
  Why now: This puts the unique kernel on screen immediately and proves the risky graph representation before visual polish.
  PRD ref: `prd.md > Interactive One-Line Diagram`, `prd.md > The Core Journey`
  Spec ref: `spec.md > OneLineDiagram`, `spec.md > Safety Gate and Network Analyzer`, `spec.md > File Structure`
  Build: Create the React/Vite project, fixed scenario, reachability analysis, drill hook, base layout and interactive SVG diagram.
  Verify (mechanical): Run unit tests for initial reachability and valid switch state changes; run the app and confirm all four switch controls update a test-visible state.
  Learner check: Open the app and operate each switch. The diagram and current state label should change without a reload.
  Commit: `Build interactive feeder drill`

- [x] **2. Unsafe moves are blocked with evidence**
  Becomes usable: The app rejects fault energization, dual-source paths and simplified overloads while the timeline and mission status explain each decision.
  Why now: This is the product's distinctive behavior and must be verified before styling or recording work.
  PRD ref: `prd.md > Pre-Action Safety Gate`, `prd.md > Mission, Feedback and Timeline`
  Spec ref: `spec.md > Safety Gate and Network Analyzer`, `spec.md > Mission and Status Panels`
  Build: Add pre-action evaluation, rule receipts, danger-path feedback, accepted and blocked timeline entries, reset, hint and completion checks.
  Verify (mechanical): Run unit tests covering both blocked source closes, a safe four-action restoration and unchanged state after rejection.
  Learner check: Try closing Source A first, then follow the safe isolation sequence. The first move should be blocked and the final state should restore 700 customers plus the hospital.
  Commit: `Add deterministic switching safety gate`

- [x] **3. The complete drill is polished and recordable**
  Becomes usable: The responsive console has clear hierarchy, keyboard controls, guided demo playback and a finish panel suitable for a short video.
  Why now: Polish follows proven behavior, and the guided sequence makes the kernel easy for judges to see without setup friction.
  PRD ref: `prd.md > Look and Feel`, `prd.md > Guided Demo`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Guided Demo Controller`, `spec.md > Important Failure Modes`
  Build: Finish responsive CSS, focus states, accessible labels, motion, Watch demo, completion panel and reduced-motion handling.
  Verify (mechanical): Run the browser test at desktop and mobile widths; confirm demo playback ends with all goals met and no accessibility-critical browser errors.
  Learner check: Run Watch demo and judge whether the blocked move, safe sequence and final result are understandable without narration.
  Commit: `Polish guided restoration experience`

- [x] **4. The project is tested, documented and mapped**
  Becomes usable: Another person can install, run and understand the proof from the repository, and the finished behavior has a reproducible test record.
  Why now: Documentation and the map must describe the real final code rather than an earlier plan.
  PRD ref: `prd.md > What We're Building`, `prd.md > Non-Goals`
  Spec ref: `spec.md > Where It Runs and How Someone Tries It`, `spec.md > File Structure`
  Build: Add README, MIT license, production checks, screenshots, app map and final secret/private-data audit. Prepare the Remotion demo project after the app checks pass.
  Verify (mechanical): Run unit tests, browser tests, production build and a secret-pattern scan; open the app map offline and inspect representative screenshots.
  Learner check: Follow the README from a fresh terminal and inspect the app map route.
  Commit: `Document and verify Restoration Lab`

## Hands-on Checkpoints
- [ ] Early usable behavior explored — planned after slice 2; pending learner review because the learner requested no questions during the autonomous run.
- [ ] Final kick-the-tires exploration and feedback completed — pending learner review after delivery.

## Final Review
- [x] Final review complete — mechanical and visual agent QA passed; learner readiness confirmation remains pending.

## Code Tour and App Map
- [x] Learning activity complete — a reference-only code tour and reusable two-phase state pattern are recorded; no learner interaction is claimed.
- [ ] Optional edit and transfer reflection addressed — pending learner choice after delivery.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Trace why CB-A is rejected before mutation; evidence is the proposed-state check, red fault path, receipt and browser test.
Route and stops: `scenario.ts` → `gridEngine.ts` → `useRestorationLab.ts` → `OneLineDiagram.tsx` → `restoration.spec.ts`.
Edit outcome: Not applicable during autonomous build.
Reflection: Not offered during the requested no-question run.
Activity mode: Reference-only route completed.

## Revisions

- 2026-10-25: Shared state, safety logic and UI were built in one implementation pass, then recorded as separate verified commits for the usable drill, safety proof, video polish and documentation.
- 2026-10-25: Mechanical review passed with 6 unit tests, 3 browser tests, a production build, visual screenshot inspection and an 84.01-second 1080p H.264/AAC video check.
- Learner hands-on checkpoints remain open because the learner asked for an uninterrupted autonomous run. No feedback was invented.

