# Restoration Lab Code Tour

Source snapshot: `5c9383a`

## The thread to follow

The project keeps one rule throughout the code: a proposed switch state is analyzed before it replaces the current state.

1. `src/data/scenario.ts` defines eight nodes, seven edges, four switches and the source limits for one fixed drill.
2. `src/lib/gridEngine.ts` builds an adjacency map from closed edges, walks outward from each source and collects four safety findings.
3. `evaluateAction()` creates a proposed switch map. If analysis returns a finding, it returns the original map unchanged.
4. `src/hooks/useRestorationLab.ts` records accepted and blocked attempts, controls the short red path flash and runs the timed demo.
5. `src/components/OneLineDiagram.tsx` converts the engine output into energized, dead and danger states on the SVG board.

## A useful pattern to reuse

Treat risky interaction as a two-phase change:

```text
current state -> proposed state -> deterministic checks -> accept or reject
```

That pattern works beyond utility training. A database migration planner, deployment gate or medical-training simulation can preview consequences without mutating the trusted state first.

## Proof points

- `src/lib/gridEngine.test.ts` checks the starting outage, two direct unsafe cases, dual-source detection, overload detection and the safe final state.
- `tests/restoration.spec.ts` checks the browser-visible block, the safe four-action path and the full Watch demo.
- `docs/screenshots/` records the start, blocked and restored states used in the README and video.
- `video/src/Composition.tsx` assembles five independently editable scenes around the real recorded browser run.
