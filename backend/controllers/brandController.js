const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const saveBrandData = async (req, res, next) => {
  try {
    const { userId, brandData } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    if (!brandData || typeof brandData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'brandData must be a valid object'
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

    const existingData = typeof user.brandData === 'object' ? user.brandData : {};
    const mergedData = { ...existingData, ...brandData };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        brandData: mergedData
      }
    });

    logger.info('Brand data saved:', { userId });

    res.json({
      success: true,
      brandData: updatedUser.brandData
    });
  } catch (error) {
    logger.error('Error saving brand data:', { error: error.message });
    next(error);
  }
};

const getBrandData = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        brandData: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      brandData: user.brandData,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    logger.error('Error getting brand data:', { error: error.message });
    next(error);
  }
};

module.exports = {
  saveBrandData,
  getBrandData
};
