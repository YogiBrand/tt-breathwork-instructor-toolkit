const express = require('express');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.post(
  '/save',
  auth,
  [
    body('userId')
      .trim()
      .notEmpty()
      .withMessage('userId is required')
      .isUUID()
      .withMessage('Invalid userId format'),
    body('brandData')
      .notEmpty()
      .withMessage('brandData is required')
      .isObject()
      .withMessage('brandData must be an object'),
    validate
  ],
  brandController.saveBrandData
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
  brandController.getBrandData
);

module.exports = router;
