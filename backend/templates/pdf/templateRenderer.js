const escapeHtml = (input = '') =>
  String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildContactSection = (brandData = {}) => {
  const contacts = [
    brandData.email && `Email: ${brandData.email}`,
    brandData.phone && `Phone: ${brandData.phone}`,
    brandData.website && `Website: ${brandData.website}`,
    brandData.instagram && `Instagram: @${brandData.instagram.replace(/^@/, '')}`,
    brandData.linkedin && `LinkedIn: ${brandData.linkedin}`
  ].filter(Boolean);

  if (!contacts.length) {
    return '';
  }

  return `
    <section class="card">
      <h2>Contact</h2>
      <ul>
        ${contacts.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>
  `;
};

const buildServicesSection = (services = []) => {
  if (!Array.isArray(services) || services.length === 0) {
    return '';
  }

  return `
    <section class="card">
      <h2>Services</h2>
      <ul>
        ${services
          .map(
            (service) =>
              `<li><strong>${escapeHtml(service.label || service.name || service.type || 'Service')}</strong>${
                service.price ? ` — ${escapeHtml(service.price)}` : ''
              }</li>`
          )
          .join('')}
      </ul>
    </section>
  `;
};

const buildHighlightsSection = (definition, brandData) => `
  <section class="card">
    <h2>About This Asset</h2>
    <p>${escapeHtml(definition.description)}</p>
  </section>
  <section class="card">
    <h2>Why ${escapeHtml(brandData.fullName || 'Your Clients')} Will Love It</h2>
    <p>${escapeHtml(
      brandData.uniquePositioning ||
        brandData.oneLine ||
        'Professional, on-brand material created specifically for your breathwork practice.'
    )}</p>
  </section>
`;

const renderTemplate = (templateId, { definition, brandData = {}, customizations = {} }) => {
  const palette = brandData.colorPalette || {};
  const primaryColor = customizations.primaryColor || palette.primary || '#0B2545';
  const accentColor = customizations.secondaryColor || palette.accent || '#3ABAB4';

  const pageTitle = definition?.title || 'Breathwork Asset';
  const tagline =
    customizations.tagline ||
    brandData.oneLine ||
    brandData.signatureTechnique ||
    'Professional breathwork facilitation';

  const services = customizations.services || brandData.services;

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(pageTitle)}</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 40px;
          color: #1f2937;
          background: #f9fafb;
        }
        header {
          background: ${primaryColor};
          color: #fff;
          padding: 32px;
          border-radius: 16px;
          margin-bottom: 24px;
        }
        header h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }
        header p {
          margin: 0;
          font-size: 16px;
        }
        main {
          display: grid;
          gap: 16px;
        }
        .card {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }
        h2 {
          color: ${primaryColor};
          margin-top: 0;
        }
        ul {
          padding-left: 20px;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 9999px;
          background: ${accentColor};
          color: #fff;
          font-size: 12px;
          margin-bottom: 12px;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="badge">${escapeHtml(definition?.category || 'Toolkit')}</div>
        <h1>${escapeHtml(pageTitle)}</h1>
        <p>${escapeHtml(tagline)}</p>
      </header>
      <main>
        ${buildHighlightsSection(definition, brandData)}
        ${buildServicesSection(services)}
        ${buildContactSection(brandData)}
      </main>
    </body>
  </html>
  `;
};

module.exports = {
  renderTemplate
};
