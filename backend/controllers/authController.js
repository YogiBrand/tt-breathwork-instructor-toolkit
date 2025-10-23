const { PrismaClient } = require('@prisma/client');
const { signToken } = require('../utils/jwt');
const { validateCode, markCodeAsUsed } = require('../services/codeService');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const validateCodeController = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Code is required'
      });
    }

    const validation = await validateCode(code);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.message
      });
    }

    const sessionToken = signToken({
      codeId: validation.codeId,
      type: 'session'
    });

    logger.info('Code validated successfully:', { code });

    res.json({
      success: true,
      sessionToken,
      hasAccount: validation.hasAccount,
      codeId: validation.codeId,
      ...(validation.user && {
        user: {
          id: validation.user.id,
          email: validation.user.email
        }
      })
    });
  } catch (error) {
    logger.error('Error validating code:', { error: error.message });
    next(error);
  }
};

const claimCode = async (req, res, next) => {
  try {
    const { email, codeId, sessionToken } = req.body;

    // Accept either codeId directly or extract it from sessionToken
    let actualCodeId = codeId;

    if (!actualCodeId && sessionToken) {
      try {
        const { verifyToken } = require('../utils/jwt');
        const decoded = verifyToken(sessionToken);
        actualCodeId = decoded.codeId;
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          error: 'Invalid session token'
        });
      }
    }

    if (!email || !actualCodeId) {
      return res.status(400).json({
        success: false,
        error: 'Email and codeId (or sessionToken) are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const codeRecord = await prisma.code.findUnique({
      where: { id: actualCodeId },
      include: { user: true }
    });

    if (!codeRecord) {
      return res.status(404).json({
        success: false,
        error: 'Code not found'
      });
    }

    if (codeRecord.user) {
      return res.status(409).json({
        success: false,
        error: 'Code already claimed'
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        codeId: actualCodeId,
        brandData: {}
      }
    });

    await markCodeAsUsed(actualCodeId, email);

    const token = signToken({
      userId: user.id,
      email: user.email,
      type: 'user'
    });

    logger.info('Code claimed successfully:', { email, codeId: actualCodeId });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        brandData: user.brandData
      }
    });
  } catch (error) {
    logger.error('Error claiming code:', { error: error.message });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        code: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      type: 'user'
    });

    logger.info('User logged in:', { email });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        brandData: user.brandData,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    logger.error('Error logging in:', { error: error.message });
    next(error);
  }
};

module.exports = {
  validateCode: validateCodeController,
  claimCode,
  login
};
