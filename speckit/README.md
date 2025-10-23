# Speckit Operating System

This directory is the source of truth for how collaborators, automations, and AI agents work inside the TT Breathwork Instructor Toolkit. Keep it version-controlled, readable, and always up to date.

## How To Use This Folder
- **Start every task here.** Read the relevant workflow before touching code or running commands.
- **Update before you finish.** If work changes architecture, conventions, or repeatable steps, document it in the appropriate workflow and add a short entry to the logbook.
- **Reference from prompts.** Claude, Codex, Cursor, and any other assistants must load this folder (starting with `speckit/AGENTS.md`) before executing tasks.
- **Treat it as living documentation.** Prefer amending these files to creating ad-hoc notes elsewhere.

## Structure
- `AGENTS.md` – shared guardrails for AI and human collaborators.
- `workflows/` – repeatable playbooks for backend, frontend, documentation, testing, and release tasks.
- `reviews/` – point-in-time deep dives (latest: the 2025-02 application review).
- `logbook/` – chronological ledger of notable operational updates.
- `templates/` *(optional future)* – reusable markdown stubs (create as needed).

## Maintenance Pact
1. No task is "done" until the relevant workflow/logbook entries are updated.
2. When a guideline becomes stale, replace it immediately—do not leave TODOs.
3. Prefer append-only history in `logbook/`; edit past entries only to correct facts.
4. Every pull request should mention whether Speckit needed changes.

Keeping Speckit healthy keeps the whole project predictable.***
