---
doc: scope
status: approved
---

# Restoration Lab

One line: an interactive training drill where a junior utility engineer restores a synthetic faulted feeder without energizing the fault, creating backfeed or overloading the backup path.

Approval basis: the learner accepted the proposed Restoration Lab direction and requested an end-to-end autonomous build with no follow-up questions.

## The Unique Kernel
Every switch action is checked before it changes the network. A blocked move names the exact electrical rule it would break, while a valid move immediately changes the energized paths and restored customer count.

## Who It's For
A junior distribution engineer or engineering student learning the logic behind outage isolation and service restoration. Today they usually study static one-line diagrams or watch an experienced operator reason through a sequence.

## The Core Loop
Read the outage mission, operate one switch, inspect the changed one-line diagram and rule checks, then continue until the hospital and all possible customers are restored. Reset and try for a clean four-action sequence.

## Inspiration & Identity
It should feel like a focused training console: charcoal panels, clear one-line symbols, warm amber for attention, red only for danger and electric green for energized safe paths. It should not look like a generic chatbot or a glossy AI dashboard.

## Why This Matters to the Learner
The learner wants an original entry with a visible product moment and a specific professional audience, not another document summarizer.

## What "Working" Looks Like
The app opens on a synthetic feeder where a fault has interrupted 700 customers and a hospital. Closing a source breaker too early is blocked and the fault path flashes red. After the user opens both isolators, restores the healthy left section and closes the backup tie, the hospital turns green and the app reports a safe restoration in four accepted actions.

## The POC Boundary
One synthetic feeder, one fixed fault, four controllable switches, four deterministic safety checks, a visible event timeline, one hint at a time, reset and an automated demo sequence. All calculations run in the browser.

## Later
More scenarios, authorable networks, calculated power flow, difficulty levels and instructor analytics.

## Explicitly Cut
- Real utility data or control-system connections: they create privacy and safety risks and do not improve the proof.
- Operational switching recommendations: this is an educational simulator, not an authorization tool.
- Full AC power flow: a small graph and capacity model proves the interaction more reliably in the available time.
- Accounts, databases and cloud sync: one local training session needs none of them.
- A live model on the main path: the safety verdicts must remain deterministic and inspectable.

