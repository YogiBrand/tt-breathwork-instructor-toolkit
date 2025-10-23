# Asset Template Authoring Guide

This walkthrough shows how to design new toolkit templates (or refine existing ones) while keeping the backend renderer and frontend selectors in sync. Follow these steps whenever you introduce or update an asset.

---

## 1. Update Shared Definitions
- File: `backend/templates/assetDefinitions.js`
- Add/edit the object describing the asset:
  - `assetType`: machine name (used across API + frontend).
  - `category`: one of `for-you`, `for-clients`, `for-companies`.
  - `title` / `description`: human-readable metadata shown in the app.
  - `fileName`: default filename for the rendered PDF.
- Keep the array ordered logically (personal → clients → companies). This list seeds the database and drives metadata shown in the dashboard.

## 2. Render HTML for the PDF
- File: `backend/templates/pdf/templateRenderer.js`
- Add a renderer branch for your new asset type or expand the shared layout with conditionals.
  - Pull data from `definition` (title, description, category).
  - Use `brandData` values (logo/photo paths, color palette, contact info, services, etc.).
  - Read `customizations` for user-selected variation/theme details.
- Ensure all user input is HTML-escaped (use `escapeHtml`) and inline CSS uses brand colours.
- Prefer modular helpers (like `buildContactSection`) to keep templates readable.

### Variation Support
- The frontend sends `customizations.variation` and any accessory fields you surface (e.g., `headlineStyle`, `backgroundTexture`).
- Access these inside the renderer and branch as needed to change layouts/colors/sections.

## 3. Frontend Preview Components
- Folder: `frontend/src/components/templates/`
- Create a React preview component for each asset type that should render in the browser (`OnePagerTemplate.jsx` etc.).
  - Keep it visually representative, even if simplified compared to the PDF.
  - Mirror the same customization keys you consume server-side.
- Export the component and register it in `frontend/src/components/templates/index.js`.
- If you add new variation options, update `getAssetVariations` so the selector shows them.

## 4. Wizard Defaults & Brand Data
- The wizard populates `brandStore.brandData`. Confirm the fields your template expects exist (e.g., `brandData.services`, `brandData.colorPalette.primary`).
- Use `lastCustomization` in the generated asset’s `customData` (already handled in the controller) to persist user settings.

## 5. Testing Loop
1. Run backend in dev mode: `cd backend && npm run dev`
2. Run frontend dev server: `cd frontend && npm run dev`
3. Complete the wizard → visit the dashboard → open your asset.
4. Generate the asset and download the PDF; verify layout, fonts, colours, and data binding.
5. Iterate on HTML/CSS in `templateRenderer.js` until satisfied.

## 6. Asset Metadata Hygiene
- Avoid breaking existing `assetType` identifiers (front/back share them).
- Bump `fileName` versions if you don’t want to overwrite old PDFs (optional – current behaviour overwrites).
- Confirm `category` matches dashboard tab names so counts stay accurate.

## 7. Optional Enhancements
- Add thumbnail previews by storing generated images in `asset.customData` and displaying them in `AssetCard`.
- Support multi-page PDFs by expanding the HTML template and using CSS `page-break-after`.

Document major template changes (new fields, new variations) in the logbook and update this guide if the process evolves.***
