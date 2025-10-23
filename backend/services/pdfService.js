const puppeteer = require('puppeteer');
const logger = require('../utils/logger');

let browser = null;

const initBrowser = async () => {
  if (browser) {
    return browser;
  }

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    logger.info('Puppeteer browser initialized');
    return browser;
  } catch (error) {
    logger.error('Failed to initialize browser:', { error: error.message });
    throw error;
  }
};

const generatePDF = async (htmlContent, options = {}) => {
  try {
    const browserInstance = await initBrowser();
    const page = await browserInstance.newPage();

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    const pdfOptions = {
      format: options.format || 'A4',
      printBackground: true,
      margin: options.margin || {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      ...options
    };

    const pdfBuffer = await page.pdf(pdfOptions);

    await page.close();

    logger.info('PDF generated successfully');

    return pdfBuffer;
  } catch (error) {
    logger.error('Error generating PDF:', { error: error.message });
    throw error;
  }
};

const generatePDFFromTemplate = async (templateName, data, options = {}) => {
  try {
    logger.info('Generating PDF from template:', { templateName });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Inter', sans-serif;
              color: #1F2937;
            }
            .container {
              padding: 40px;
            }
            h1 {
              font-family: 'Playfair Display', serif;
              color: #0B2545;
              font-size: 32px;
              margin-bottom: 24px;
            }
            .placeholder {
              text-align: center;
              padding: 60px 20px;
              background: #F9FAFB;
              border: 2px dashed #D1D5DB;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${templateName}</h1>
            <div class="placeholder">
              <p>Template: ${templateName}</p>
              <p>PDF generation coming soon</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await generatePDF(html, options);
  } catch (error) {
    logger.error('Error generating PDF from template:', {
      error: error.message,
      templateName
    });
    throw error;
  }
};

const closeBrowser = async () => {
  if (browser) {
    await browser.close();
    browser = null;
    logger.info('Puppeteer browser closed');
  }
};

process.on('SIGTERM', closeBrowser);
process.on('SIGINT', closeBrowser);

module.exports = {
  generatePDF,
  generatePDFFromTemplate,
  closeBrowser
};
