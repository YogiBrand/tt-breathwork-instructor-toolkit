const express = require('express');
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');
const launchPlanController = require('../controllers/launchPlanController');

const router = express.Router();

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
  launchPlanController.getLaunchProgress
);

router.post(
  '/complete-week',
  auth,
  [
    body('userId')
      .trim()
      .notEmpty()
      .withMessage('userId is required')
      .isUUID()
      .withMessage('Invalid userId format'),
    body('week')
      .notEmpty()
      .withMessage('week is required')
      .isInt({ min: 1, max: 12 })
      .withMessage('week must be an integer between 1 and 12'),
    validate
  ],
  launchPlanController.completeWeek
);

module.exports = router;
