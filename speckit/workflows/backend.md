# Backend Workflow

## Stack
- Node.js 20.x, Express 4, Prisma 5, PostgreSQL 15.
- Services: Puppeteer (PDF), Sharp (image), Nodemailer (email).

## Local Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` → `.env`; fill in `DATABASE_URL`, `JWT_SECRET`, SMTP creds, `FRONTEND_URL`.
4. `npx prisma generate`
5. Run migrations: `npx prisma migrate deploy`

## Running
- Dev: `npm run dev`
- Prod: `npm start`
- Prisma Studio: `npm run prisma:studio`

## Testing & Validation
- Migrations: ensure schema diff is reflected in `prisma/migrations/`.
- Linting: (add when eslint config exists).
- Manual smoke: hit `GET /api/health`.
- When adding endpoints, update `API_REFERENCE.md` and note auth requirements.

## Common Tasks
- **Seed access codes:** `npm run seed [count]`
- **Add migration:** `npx prisma migrate dev --name your_migration`
- **Generate client:** `npm run prisma:generate`
- **Configure logging:** File logs write to `LOG_DIR` (defaults to `backend/logs`). Set `LOG_DIR` explicitly if the runtime restricts writes.

## Asset Generation
- `POST /api/assets/generate/:templateId` renders PDF output via Puppeteer using definitions in `templates/assetDefinitions.js`.
- Generated files are saved with `storageService.saveAsset` under `UPLOAD_DIR` (defaults to `/app/uploads/assets/<userId>`).
- Each asset row stores metadata (`customData`) including title/description, generated timestamp, and last customization payload.
- Downloads stream the stored PDF (`GET /api/assets/download/:assetId`). If no file exists yet, the API returns `404`.

## Deployment Notes
- Ensure `DATABASE_URL`, SMTP creds, and storage directories are set.
- Recommended env vars:
  - `UPLOAD_DIR` (default `/app/uploads`)
  - `LOG_DIR` (default `<repo>/backend/logs`)
  - `FRONTEND_URL` for email links/CORS
- Run `prisma migrate deploy` on boot.
- Monitor Puppeteer memory usage; call `pdfService.closeBrowser()` on shutdown.

## Speckit Hooks
- Document new environment variables or scripts in this file.
- Append review findings to the logbook when incidents occur.
