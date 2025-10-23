# Documentation Workflow

## When To Document
- Architectural shifts, schema changes, or dependency upgrades.
- New or modified runbooks, scripts, or API contracts.
- Incident reports, postmortems, or recurring operational pains.

## How To Update
1. Identify target file (`workflows/*`, `reviews/*`, `logbook/*`, or new file).
2. Make the edit with clear diff context (prefer `apply_patch`).
3. For major updates, add a bullet to the current day's logbook entry.
4. Mention documentation updates in the PR/task summary.

## Reviews Folder
- Hold deep dives (`YYYY-MM-DD-topic.md`).
- Each review should include: context, affected areas, findings grouped by severity, recommended actions, testing gaps.
- Link back to the review from relevant workflows when actions land.

## Templates
- Reuse the logbook template in `logbook/README.md`.
- Add new templates under `speckit/templates/` if patterns emerge (create the folder as needed).

## Automation Ideas
- Hook CI to verify Speckit files are touched when code changes high-impact directories.
- Generate status dashboards from logbook data (future).
