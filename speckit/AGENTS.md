# Agent Ground Rules

All AI-first workflows (Claude Code, Codex, Cursor, etc.) must follow these guardrails before making any change.

## Core Loop
1. **Intake:** Read `speckit/README.md`, this file, and the relevant workflow(s).
2. **Plan:** Outline steps (2+ items) unless the task is trivial. Share the plan in the conversation UI.
3. **Execute deliberately:** Prefer small, testable changes. Note assumptions in-line.
4. **Validate:** Run linters/tests or explain why validation was skipped.
5. **Document:** Update workflows/logbook when behaviour, contracts, or runbooks change.
6. **Report:** Summarise changes, reference files with line numbers, and mention follow-up risks.

## Coding Standards
- Always respect existing `.editorconfig`/lint rules (run `npm run lint` where available).
- Avoid destructive git commands (`reset`, `checkout --`) unless explicitly permitted.
- Reference files with workspace-relative paths (`frontend/src/App.jsx:12`).
- Prefer `apply_patch` or editor-backed diffs; avoid bulk rewrites without context.

## Collaboration Notes
- **Claude Code:** optimise for reasoning clarity; surface trade-offs before coding.
- **Codex (this agent):** take responsibility for coordinating documentation updates in Speckit.
- **Cursor:** ensure local workspace mirror stays synced with Speckit; reflect deviations immediately.
- **Humans:** when pairing with an agent, confirm both code and Speckit changes before committing.

## When To Update Speckit
- New environment variables, scripts, or migrations.
- Breaking API/interface changes.
- Added/removed workflows or automation steps.
- Post-incident retrospectives or significant bugs discovered.

Log incremental tweaks in `logbook/YYYY-MM-DD.md` (create the file if it does not exist yet) using the template from `logbook/README.md`.***
