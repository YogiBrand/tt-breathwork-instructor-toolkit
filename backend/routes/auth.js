const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/validate-code',
  [
    body('code')
      .trim()
      .notEmpty()
      .withMessage('Code is required')
      .matches(/^TT-\d{4}-[A-Z0-9]{6}$/)
      .withMessage('Invalid code format'),
    validate
  ],
  authController.validateCode
);

router.post(
  '/claim-code',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    body('codeId')
      .optional()
      .trim()
      .isUUID()
      .withMessage('Invalid codeId format'),
    body('sessionToken')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('sessionToken cannot be empty'),
    validate
  ],
  authController.claimCode
);

router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    validate
  ],
  authController.login
);

module.exports = router;
