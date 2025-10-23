const { verifyToken } = require('../utils/jwt');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      logger.warn('Invalid token attempt:', { error: error.message });
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', { error: error.message });
    return res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

module.exports = auth;
