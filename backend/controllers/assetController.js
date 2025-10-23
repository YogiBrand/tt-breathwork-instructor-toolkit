const logger = require('../utils/logger');
const prisma = require('../lib/prisma');
const { generatePDFFromTemplate } = require('../services/pdfService');
const storageService = require('../services/storageService');
const { getAssetDefinition, assetDefinitions } = require('../templates/assetDefinitions');

const buildAssetResponse = (asset) => ({
  ...asset,
  downloadUrl: `/api/assets/download/${asset.id}`
});

const generateAsset = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const { userId, customizations = {} } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const definition = getAssetDefinition(templateId);

    if (!definition) {
      return res.status(404).json({
        success: false,
        error: 'Unknown asset template'
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

    const pdfBuffer = await generatePDFFromTemplate(definition.title, {
      definition,
      brandData: user.brandData || {},
      customizations
    });

    const savedFile = await storageService.saveAsset(pdfBuffer, definition.fileName, userId);

    const existingAsset = await prisma.asset.findFirst({
      where: { userId, assetType: templateId }
    });

    const baseCustomData = existingAsset?.customData || {};

    const assetPayload = {
      fileName: savedFile.fileName,
      filePath: savedFile.filePath,
      fileSize: savedFile.fileSize,
      customData: {
        ...baseCustomData,
        category: definition.category,
        title: definition.title,
        description: definition.description,
        generatedAt: new Date().toISOString(),
        lastCustomization: customizations,
        brandSnapshot: user.brandData || {}
      }
    };

    let assetRecord;

    if (existingAsset) {
      assetRecord = await prisma.asset.update({
        where: { id: existingAsset.id },
        data: assetPayload
      });
    } else {
      assetRecord = await prisma.asset.create({
        data: {
          userId,
          assetType: templateId,
          ...assetPayload
        }
      });
    }

    logger.info('Asset generated successfully:', {
      userId,
      templateId,
      assetId: assetRecord.id
    });

    res.json({
      success: true,
      asset: buildAssetResponse(assetRecord)
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
      assets: assets.map(buildAssetResponse)
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

    if (!asset.filePath) {
      return res.status(404).json({
        success: false,
        error: 'Asset has not been generated yet'
      });
    }

    const fileBuffer = await storageService.getAsset(asset.filePath);

    await prisma.asset.update({
      where: { id: assetId },
      data: {
        downloads: { increment: 1 }
      }
    });

    logger.info('Asset downloaded:', { assetId });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(asset.fileName)}"`
    );

    res.send(fileBuffer);
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
        assets: existingAssets.map(buildAssetResponse)
      });
    }

    // Create all assets in database
    const createdAssets = await Promise.all(
      assetDefinitions.map(definition =>
        prisma.asset.create({
          data: {
            userId: user.id,
            assetType: definition.assetType,
            fileName: definition.fileName,
            filePath: null,
            fileSize: 0,
            customData: {
              category: definition.category,
              title: definition.title,
              description: definition.description,
              brandSnapshot: user.brandData || {}
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
      assets: createdAssets.map(buildAssetResponse)
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
