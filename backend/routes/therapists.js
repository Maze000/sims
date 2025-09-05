const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');
const auth = require('../middleware/auth');

// Public routes (for clients to browse)
router.get('/', therapistController.getAllTherapists);
router.get('/:id', therapistController.getTherapistById);

// Protected routes (for therapists to manage their profile)
router.post('/profile', auth, therapistController.createProfile);
router.get('/profile/me', auth, therapistController.getProfile);
router.put('/profile', auth, therapistController.updateProfile);
router.put('/services', auth, therapistController.updateServices);
router.put('/availability', auth, therapistController.updateAvailability);

module.exports = router;
