const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const joinWaitlistController = require('../controllers/joinWaitlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Create new entry in the waitlist
router.post(
  '/:locationId',
  authMiddleware.authenticateUser,
  [
    check('firstname').notEmpty().withMessage('First name is required'),
    check('lastname').notEmpty().withMessage('Last name is required'),
    check('contactNumber').notEmpty().withMessage('Contact number is required'),
    check('purposeOfVisit').notEmpty().withMessage('Purpose of visit is required'),
  ],
  joinWaitlistController.create
);

// Retrieve all waitlist entries
router.get('/', authMiddleware.authenticateUser, joinWaitlistController.getAll);

// Update waitlist entry
router.put('/:id', authMiddleware.authenticateUser, joinWaitlistController.update);

// Delete waitlist entry
router.delete('/:id', authMiddleware.authenticateUser, joinWaitlistController.delete);

module.exports = router;
