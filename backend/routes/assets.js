const express = require('express');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');
const assetController = require('../controllers/assetController');

const router = express.Router();

router.post(
  '/initialize',
  auth,
  [
    body('userId')
      .trim()
      .notEmpty()
      .withMessage('userId is required')
      .isUUID()
      .withMessage('Invalid userId format'),
    validate
  ],
  assetController.initializeAssets
);

router.post(
  '/generate/:templateId',
  auth,
  [
    param('templateId')
      .trim()
      .notEmpty()
      .withMessage('templateId is required'),
    body('userId')
      .trim()
      .notEmpty()
      .withMessage('userId is required')
      .isUUID()
      .withMessage('Invalid userId format'),
    body('customizations')
      .optional()
      .isObject()
      .withMessage('customizations must be an object'),
    validate
  ],
  assetController.generateAsset
);

router.get(
  '/:userId',
  auth,
  [
    param('userId')
      .trim()
      .notEmpty()
      .withMessage('userId is required')
      .isUUID()
      .withMessage('Invalid userId format'),
    validate
  ],
  assetController.getUserAssets
);

router.get(
  '/download/:assetId',
  auth,
  [
    param('assetId')
      .trim()
      .notEmpty()
      .withMessage('assetId is required')
      .isUUID()
      .withMessage('Invalid assetId format'),
    validate
  ],
  assetController.downloadAsset
);

module.exports = router;
