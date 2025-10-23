# Asset Template Quickstart

Use this checklist when you want to add or iterate on templates without touching anything unrelated.

## Required Touchpoints
1. **Definitions** – `backend/templates/assetDefinitions.js`
   - Add/update the object for your template: `assetType`, `category`, `title`, `description`, `fileName`.
2. **PDF layout** – `backend/templates/pdf/templateRenderer.js`
   - Render HTML for your `assetType`, using `definition`, `brandData`, and `customizations`.
   - Keep user content escaped, inline styles applied, and return a full HTML document.
3. **Preview component** – `frontend/src/components/templates/<YourTemplate>.jsx`
   - Mirror key parts of the PDF for live editing.
   - Register the component and variations in `frontend/src/components/templates/index.js`.
4. **Variation list** – `getAssetVariations` (same `index.js`)
   - Define the options surfaced in the Asset Viewer UI.
5. **Wizard data** – `frontend/src/store/brandStore.js` (only if you need new fields)
   - Ensure the wizard collects the information your template expects.
6. **Dashboard/Viewer** – already consumes metadata from `customData`; no changes unless you introduce new categories.

## Sanity Test
```bash
cd backend && npm run dev
# in another terminal
cd frontend && npm run dev
```
1. Complete the brand wizard with sample data.
2. Open the new asset on the dashboard, customise variations, click **Generate**.
3. Download the PDF and verify branding, copy, colours, and layout.

That’s it—the rest of the system (database seeding, download endpoints, storage) keys off the files above.***
