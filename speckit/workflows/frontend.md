# Frontend Workflow

## Stack
- React 18 with Vite 5, Tailwind CSS, Framer Motion, Zustand, React Router.
- PDF/asset tooling: html2pdf.js, jspdf, fabric.js (planned).

## Local Setup
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` → `.env` and set `VITE_API_URL` (default `http://localhost:3000/api`)

## Running
- Dev server: `npm run dev` (Vite, port 5173 by default)
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

## State Stores
- `authStore` manages auth/session tokens.
- `brandStore` holds wizard progress, brand data (persisted to localStorage).
- `assetStore` manages asset list, downloads, and generation flow.

## Key Flows
- **Wizard → Dashboard:** Wizard completion triggers asset initialisation (API) and redirects to `/dashboard`.
- **Asset viewer:** Pulls current asset from store; downloads currently client-side only.
- **Code entry:** Staged login (code validation → claim account).

## Testing & Validation
- No automated tests yet—add React Testing Library when feasible.
- Run `npm run lint` before submitting changes.
- Smoke test: `npm run dev`, validate `/`, `/enter-code`, `/wizard`, `/dashboard`, `/asset/:id`.

## Speckit Hooks
- Document new routes/components in this file.
- Mirror API contract changes in both this workflow and `workflows/backend.md`.
- If assets or wizard steps change, update `speckit/reviews/*` or create a new review note.***
