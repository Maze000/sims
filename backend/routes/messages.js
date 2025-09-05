const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Send messages
router.post('/send', messageController.sendInitialMessage);
router.post('/respond', messageController.sendResponseMessage);

// Get messages
router.get('/conversations', messageController.getConversations);
router.get('/conversation/:otherUserId', messageController.getConversation);

// Manage messages
router.put('/:messageId/read', messageController.markAsRead);
router.put('/:messageId/archive', messageController.archiveMessage);

// Get unread count
router.get('/unread/count', messageController.getUnreadCount);

module.exports = router;
