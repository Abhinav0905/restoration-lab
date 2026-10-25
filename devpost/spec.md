---
doc: spec
status: approved
---

# Restoration Lab — Technical Spec

Approval basis: the learner approved an autonomous end-to-end build. Stack and file choices below are recorded as delegated agent decisions.

## How This Works, In Plain Language
The feeder is a small graph: named points connected by lines and four controllable switches. When someone tries a switch, the app first makes a temporary copy of the network. Pure TypeScript functions trace which sections each source could energize, total the connected demand and check the safety rules. Only a passing proposal becomes the new visible state.

This keeps the product honest. The same data drives the one-line diagram, service counters, safety receipts and tests. There is no server, account, model call or hidden operational data.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

The page loads the fixed scenario from `src/data/scenario.ts` → `useRestorationLab` creates the initial drill state → `OneLineDiagram` renders nodes, paths and switches → the learner requests a switch change → `evaluateAction` builds and checks the proposed graph → a failed result becomes a blocked timeline item, or a passing result updates switch state → `analyzeNetwork` recalculates energized nodes, customer totals and completion → panels render the same analysis.

Watch demo uses the identical action path on a timer. It does not bypass validation.

## Stack
- React 19 with TypeScript: small component model and familiar browser tooling. Docs: https://react.dev/
- Vite 7: local development and static production build. Docs: https://vite.dev/
- Vitest: tests for the deterministic network engine. Docs: https://vitest.dev/
- Playwright: browser checks and repeatable demo capture. Docs: https://playwright.dev/
- Plain CSS and inline SVG: precise diagram styling without a UI kit or external assets.

Tradeoff: the project favors one clear browser experience over a reusable electrical-analysis library.

## Where It Runs and How Someone Tries It
- Requires Node.js 20 or newer.
- Install: `npm install`
- Start: `npm run dev -- --host 127.0.0.1`
- Open the URL printed by Vite, normally `http://127.0.0.1:5173`.
- Test: `npm test -- --run`
- Browser check: `npm run test:e2e`
- Production build: `npm run build`
- No API key or network connection is required after dependencies are installed.
- A deployment is optional. The recorded app and public repository are the required sharing artifacts.

## Look and Feel
Implements `prd.md > Look and Feel`.

Use a flat light-neutral page with white cards and no decorative page texture. The opening brief uses three separate cards with 14px body copy. The one-line diagram spans the full content width in a dark forest panel, while service status and mission evidence sit in two light panels beneath it. Safe energized paths use green with a moving dash cue. Warning copy uses amber. Red appears only for the physical fault and blocked-action evidence. Buttons should read like labeled equipment controls, not rounded consumer-app pills.

## Components

### RestorationLab Page
Owns the responsive layout and connects the drill hook to each panel. Before the technical console, it renders a large three-part judge brief that explains the outage problem, why order matters and how the deterministic pre-action gate teaches the solution. The diagram receives the full first row. Service status and mission evidence follow beneath it, then stack on narrower screens.
PRD ref: `prd.md > Screens and Layout`.

### OneLineDiagram
Renders fixed node coordinates, line segments, loads and switch controls in SVG. It derives visual state from network analysis and never performs safety logic itself.
PRD ref: `prd.md > Interactive One-Line Diagram`.

### Safety Gate and Network Analyzer
Pure functions build adjacency from closed edges, trace source reachability, detect fault energization and dual-source connections, estimate source demand against path limits and compute restored loads.
PRD ref: `prd.md > Pre-Action Safety Gate`.

### Mission and Status Panels
Display service totals, goal completion, latest receipt, hint and event timeline.
PRD ref: `prd.md > Mission, Feedback and Timeline`.

### Guided Demo Controller
Runs a fixed action script through the public action handler: blocked Source A close, open west isolator, open east isolator, close Source A and close backup tie.
PRD ref: `prd.md > Guided Demo`.

## Data Model

`Scenario` contains nodes, edges, switches, loads, source capacities, initial switch states and the faulted node. It is immutable.

`DrillState` contains current switch states, timeline items, blocked-attempt count, latest receipt, demo-running flag and completion flag. It lives in React memory and resets on reload.

`NetworkAnalysis` is derived after each action: energized nodes, per-source nodes and demand, restored customers, hospital state, safety findings and completion.

No project data persists because repetition should start from the same drill state.

## File Structure
```
restoration-lab/
├── src/
│   ├── components/
│   │   ├── OneLineDiagram.tsx
│   │   ├── MissionPanel.tsx
│   │   ├── StatusRail.tsx
│   │   └── Timeline.tsx
│   ├── data/
│   │   └── scenario.ts
│   ├── hooks/
│   │   └── useRestorationLab.ts
│   ├── lib/
│   │   ├── gridEngine.ts
│   │   └── gridEngine.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── e2e/
│   └── restoration.spec.ts
├── public/
│   └── favicon.svg
├── devpost/
│   ├── scope.md
│   ├── prd.md
│   ├── spec.md
│   ├── checklist.md
│   └── app-map.html
├── video/               # Remotion demo project created after app verification
├── README.md
├── LICENSE
├── package.json
└── vite.config.ts
```

## External Services and Dependencies
There are no runtime services. NPM supplies build and test dependencies during installation. The application itself makes no external request.

## Important Failure Modes
- **A proposed graph cannot be evaluated** → reject the action and show a plain internal-check message; never apply an uncertain state.
- **Demo playback is interrupted** → cancel remaining timers and return control to the learner without changing accepted past actions.
- **Viewport is narrow** → preserve diagram scale inside a scrollable frame and stack the status rails below it.

## What Was Simplified and Why
- **Reachability plus demand checks** instead of full AC power flow — it proves safe-sequence reasoning without pretending to model an operating feeder.
- **One authored scenario** instead of imports or a scenario editor — the visible learning loop is the product kernel.
- **Fixed coaching copy** instead of a model call — judge access remains free, fast and repeatable.

## Decisions and Open Issues
- Delegated agent choice: React, Vite, Vitest, Playwright, plain CSS and SVG. Reason: one process, no service setup and repeatable local recording. Tradeoff: the topology is authored in code.
- The learner requested no questions, so no personal technical uncertainty was identified. The build will still prove the network rules with unit tests and a browser journey.
- Open issue for later only: a real training product would need utility-specific review of terminology, protection behavior and switching rules.

