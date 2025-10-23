# Application Review — 2025-10-23

## Context
Full-stack walkthrough of the TT Breathwork Instructor Toolkit. Checked backend (Node/Express/Prisma) and frontend (React/Vite) for implementation gaps, security risks, and contract mismatches. No automated tests or CI hooks currently in place.

## Architecture Notes
- Backend serves REST API with JWT auth, Prisma models (`Code`, `User`, `Asset`, `LaunchProgress`).
- Frontend uses Zustand stores to orchestrate the wizard, assets, and authentication.
- Asset generation + downloads are still placeholders on both sides; storage/email/PDF services exist but are not wired into routes.

## Findings

### High Severity
- `backend/controllers/authController.js:151` — `POST /api/auth/login` grants a fully privileged JWT after receiving only an email. Anyone who knows an instructor's email can impersonate them. Require a second factor (code, password, magic-link) before issuing user tokens.
- `backend/controllers/assetController.js:31` & `assetController.js:103` — Routes acknowledge asset generation/download but return placeholder messages. Frontend blocks on this behaviour, so users cannot actually create or fetch deliverables.
- `frontend/src/utils/api.js:135-176` vs backend routes — Frontend calls `DELETE /assets/:id`, `PATCH /brand/:userId`, `POST /launch-plan/reset`, `/upload/*`, but the API does not expose these endpoints. Every invocation will 404.
- `frontend/src/store/assetStore.js:66-113` — `downloadAsset` expects a binary blob, yet backend returns JSON placeholder. Download button in the dashboard always fails.

### Medium Severity
- `backend/utils/logger.js:27-37` — Winston writes to `/var/log/tt-toolkit/*`. Default containers or local dev users rarely have permissions, causing logger crashes unless directories are pre-provisioned.
- Multiple Prisma clients are instantiated (`server.js`, every controller/service). Prisma warns against this pattern; reuse a singleton to avoid connection exhaustion (e.g., create `lib/prisma.js`).
- `frontend/src/pages/AssetViewer.jsx:47-55` — Customisation defaults read `brandData.tagline`, `brandData.primaryColor`, etc., but actual store fields live under `brandData.colorPalette`. Previews render with fallbacks instead of user selections.
- `frontend/src/pages/Dashboard.jsx:304-309` — "View Launch Plan" navigates to `/launch-plan`, but `App.jsx` does not register that route. Users hit redirect loop.

### Low Severity / Observations
- Asset metadata inserted by `initializeAssets` lacks titles/descriptions; UI compensates by guessing from hard-coded template lists.
- PDF/email/storage services exist but are disconnected. Keep or remove until wiring is in place.
- No rate limiting or abuse safeguards around `validate-code` and `login` endpoints.

## Recommendations
1. Introduce a proper authentication flow (passwordless magic link or code-based confirmation) before issuing user JWTs.
2. Decide on asset generation strategy; either wire the existing `pdfService` + `storageService` or downgrade promises in the UI.
3. Align API contracts: implement missing routes or remove unused frontend calls.
4. Centralise Prisma client management and configure logger transports to fall back to console/file paths inside the repo.
5. Add integration tests (at least smoke tests) covering wizard completion → dashboard asset listing.

## Testing Gaps
- No automated coverage for API endpoints, migration guardrails, or frontend stores.
- Missing fixtures for asset templates; manual QA is the only safety net today.

## Next Steps
- Track ownership of each high/medium severity item in the logbook follow-up checklist.
- Update workflows when fixes land to keep Speckit trustworthy.

## Status Update — 2025-10-23
- Authentication hardened: `/auth/validate-code` issues session + user tokens, and `/auth/login` now requires the session token (email-only login removed).
- Asset generation/download implemented end-to-end (Puppeteer render + storage service) and dashboard buttons now use real binaries.
- Frontend API surface trimmed to match the backend (removed unused upload/delete/reset routes).
- Prisma client reuse + configurable `LOG_DIR` eliminate connection/logging issues.
- Asset metadata bootstrapped from shared definitions; launch-plan CTA now a “coming soon” banner, and preview mode blocks generation/download until an account exists.
***
