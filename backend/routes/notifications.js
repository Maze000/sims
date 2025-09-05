const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', [
  protect,
  query('category')
    .optional()
    .isIn(['booking', 'payment', 'message', 'system', 'promotional'])
    .withMessage('Invalid category'),
  query('isRead')
    .optional()
    .isBoolean()
    .withMessage('isRead must be a boolean'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { category, isRead, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const query = { recipient: req.user._id };

    if (category) {
      query.category = category;
    }

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const notifications = await Notification.find(query)
      .populate('sender', 'firstName lastName avatar username')
      .populate('data.bookingId', 'service scheduledDate')
      .populate('data.messageId', 'content')
      .populate('data.paymentId', 'amount currency')
      .populate('data.therapistId', 'businessName')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Notification.countDocuments(query);

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count
// @access  Private
router.get('/unread-count', protect, async (req, res) => {
  try {
    const unreadCount = await Notification.getUnreadCount(req.user._id);

    res.json({
      success: true,
      data: { unreadCount }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/notifications/read
// @desc    Mark notifications as read
// @access  Private
router.put('/read', [
  protect,
  body('notificationIds')
    .optional()
    .isArray()
    .withMessage('Notification IDs must be an array'),
  body('notificationIds.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid notification ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { notificationIds } = req.body;

    await Notification.markAsRead(req.user._id, notificationIds);

    res.json({
      success: true,
      message: 'Notifications marked as read'
    });
  } catch (error) {
    console.error('Mark notifications as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark single notification as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await notification.deleteOne();

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/notifications
// @desc    Delete multiple notifications
// @access  Private
router.delete('/', [
  protect,
  body('notificationIds')
    .isArray({ min: 1 })
    .withMessage('Notification IDs array is required'),
  body('notificationIds.*')
    .isMongoId()
    .withMessage('Invalid notification ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { notificationIds } = req.body;

    // Verify all notifications belong to the user
    const notifications = await Notification.find({
      _id: { $in: notificationIds },
      recipient: req.user._id
    });

    if (notifications.length !== notificationIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Some notifications not found or access denied'
      });
    }

    await Notification.deleteMany({ _id: { $in: notificationIds } });

    res.json({
      success: true,
      message: `${notifications.length} notifications deleted`
    });
  } catch (error) {
    console.error('Delete notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/notifications/settings
// @desc    Update notification settings
// @access  Private
router.put('/settings', [
  protect,
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  body('notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notifications must be a boolean'),
  body('notifications.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS notifications must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const User = require('../models/User');
    const { notifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'preferences.notifications': notifications },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Notification settings updated',
      data: { notifications: user.preferences.notifications }
    });
  } catch (error) {
    console.error('Update notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/notifications/settings
// @desc    Get notification settings
// @access  Private
router.get('/settings', protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id).select('preferences.notifications');

    res.json({
      success: true,
      data: { notifications: user.preferences.notifications }
    });
  } catch (error) {
    console.error('Get notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/notifications/test
// @desc    Send test notification (for development)
// @access  Private
router.post('/test', [
  protect,
  body('type')
    .isIn([
      'booking_request',
      'booking_confirmed',
      'booking_cancelled',
      'booking_reminder',
      'payment_received',
      'payment_failed',
      'message_received',
      'review_received',
      'profile_updated',
      'account_verified',
      'subscription_expired',
      'promotional',
      'system_alert'
    ])
    .withMessage('Invalid notification type'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { type, title, message, data = {} } = req.body;

    const notification = await Notification.create({
      recipient: req.user._id,
      type,
      title,
      message,
      data,
      category: type.includes('booking') ? 'booking' : 
                type.includes('payment') ? 'payment' : 
                type.includes('message') ? 'message' : 
                type === 'promotional' ? 'promotional' : 'system'
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate('sender', 'firstName lastName avatar username');

    res.status(201).json({
      success: true,
      message: 'Test notification sent',
      data: { notification: populatedNotification }
    });
  } catch (error) {
    console.error('Send test notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
