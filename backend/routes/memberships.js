const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Start trial
router.post('/trial', membershipController.startTrial);

// Get membership status
router.get('/status', membershipController.getMembershipStatus);

// Create subscription after trial
router.post('/subscription', membershipController.createSubscription);

// Cancel subscription
router.put('/cancel', membershipController.cancelSubscription);

// Reactivate subscription
router.put('/reactivate', membershipController.reactivateSubscription);

// Webhook (no auth required)
router.post('/webhook', membershipController.handleWebhook);

module.exports = router;
