const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const generateAsset = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const { userId, customizations } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    logger.info('Asset generation requested:', { userId, templateId });

    res.json({
      success: true,
      message: 'Asset generation not yet implemented',
      asset: {
        id: 'placeholder',
        fileName: `${templateId}.pdf`,
        downloadUrl: `/api/assets/download/placeholder`
      }
    });
  } catch (error) {
    logger.error('Error generating asset:', { error: error.message });
    next(error);
  }
};

const getUserAssets = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const assets = await prisma.asset.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      assets
    });
  } catch (error) {
    logger.error('Error getting user assets:', { error: error.message });
    next(error);
  }
};

const downloadAsset = async (req, res, next) => {
  try {
    const { assetId } = req.params;

    if (!assetId) {
      return res.status(400).json({
        success: false,
        error: 'assetId is required'
      });
    }

    const asset = await prisma.asset.findUnique({
      where: { id: assetId }
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    await prisma.asset.update({
      where: { id: assetId },
      data: {
        downloads: { increment: 1 }
      }
    });

    logger.info('Asset downloaded:', { assetId });

    res.json({
      success: true,
      message: 'Asset download not yet implemented',
      asset
    });
  } catch (error) {
    logger.error('Error downloading asset:', { error: error.message });
    next(error);
  }
};

// Initialize all 19 asset templates for a user
const initializeAssets = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { code: true }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if assets already exist for this user
    const existingAssets = await prisma.asset.findMany({
      where: { userId }
    });

    if (existingAssets.length > 0) {
      logger.info('Assets already exist for user:', { userId, count: existingAssets.length });
      return res.json({
        success: true,
        message: 'Assets already initialized',
        assets: existingAssets
      });
    }

    // Define all 19 asset templates
    const assetTemplates = [
      // Personal Branding Assets (8)
      { assetType: 'onePager', fileName: 'professional-one-pager.pdf', category: 'for-you' },
      { assetType: 'businessCard', fileName: 'business-card.pdf', category: 'for-you' },
      { assetType: 'emailSignature', fileName: 'email-signature.html', category: 'for-you' },
      { assetType: 'linkedinBanner', fileName: 'linkedin-banner.png', category: 'for-you' },
      { assetType: 'instagramBio', fileName: 'instagram-bio.txt', category: 'for-you' },
      { assetType: 'websiteAbout', fileName: 'website-about.txt', category: 'for-you' },
      { assetType: 'mediaKit', fileName: 'media-kit.pdf', category: 'for-you' },
      { assetType: 'speakerSheet', fileName: 'speaker-sheet.pdf', category: 'for-you' },

      // Client Experience Assets (6)
      { assetType: 'welcomeEmail', fileName: 'welcome-email.txt', category: 'for-clients' },
      { assetType: 'healthForm', fileName: 'health-intake-form.pdf', category: 'for-clients' },
      { assetType: 'waiverForm', fileName: 'liability-waiver.pdf', category: 'for-clients' },
      { assetType: 'sessionGuide', fileName: 'session-preparation-guide.pdf', category: 'for-clients' },
      { assetType: 'followUpEmail', fileName: 'follow-up-email.txt', category: 'for-clients' },
      { assetType: 'testimonialRequest', fileName: 'testimonial-request.txt', category: 'for-clients' },

      // Corporate Partnership Assets (5)
      { assetType: 'corporatePitch', fileName: 'corporate-pitch-deck.pdf', category: 'for-companies' },
      { assetType: 'workshopProposal', fileName: 'workshop-proposal.pdf', category: 'for-companies' },
      { assetType: 'pricingSheet', fileName: 'pricing-sheet.pdf', category: 'for-companies' },
      { assetType: 'caseStudy', fileName: 'case-study-template.pdf', category: 'for-companies' },
      { assetType: 'roiCalculator', fileName: 'roi-calculator.xlsx', category: 'for-companies' }
    ];

    // Create all assets in database
    const createdAssets = await Promise.all(
      assetTemplates.map(template =>
        prisma.asset.create({
          data: {
            userId: user.id,
            assetType: template.assetType,
            fileName: template.fileName,
            filePath: `/assets/${user.id}/${template.fileName}`,
            fileSize: 0, // Placeholder until actual file is generated
            customData: {
              category: template.category,
              codeId: user.codeId
            }
          }
        })
      )
    );

    logger.info('Initialized assets for user:', {
      userId,
      count: createdAssets.length,
      codeId: user.codeId
    });

    res.json({
      success: true,
      message: `Successfully initialized ${createdAssets.length} assets`,
      assets: createdAssets
    });

  } catch (error) {
    logger.error('Error initializing assets:', { error: error.message });
    next(error);
  }
};

module.exports = {
  generateAsset,
  getUserAssets,
  downloadAsset,
  initializeAssets
};
