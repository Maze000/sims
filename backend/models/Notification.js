const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
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
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  data: {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Therapist'
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    },
    url: String,
    actionText: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  category: {
    type: String,
    enum: ['booking', 'payment', 'message', 'system', 'promotional'],
    default: 'system'
  },
  expiresAt: {
    type: Date
  },
  metadata: {
    deviceToken: String,
    pushNotificationId: String,
    emailSent: {
      type: Boolean,
      default: false
    },
    smsSent: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Index for efficient querying
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for notification age
notificationSchema.virtual('age').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

// Pre-save middleware to set delivery timestamp
notificationSchema.pre('save', function(next) {
  if (this.isDelivered && !this.deliveredAt) {
    this.deliveredAt = new Date();
  }
  if (this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

// Static method to get unread count
notificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({
    recipient: userId,
    isRead: false
  });
};

// Static method to mark notifications as read
notificationSchema.statics.markAsRead = function(userId, notificationIds = null) {
  const query = {
    recipient: userId,
    isRead: false
  };

  if (notificationIds) {
    query._id = { $in: notificationIds };
  }

  return this.updateMany(query, {
    isRead: true,
    readAt: new Date()
  });
};

// Static method to mark notifications as delivered
notificationSchema.statics.markAsDelivered = function(userId, notificationIds) {
  return this.updateMany(
    {
      _id: { $in: notificationIds },
      recipient: userId,
      isDelivered: false
    },
    {
      isDelivered: true,
      deliveredAt: new Date()
    }
  );
};

// Static method to create booking notification
notificationSchema.statics.createBookingNotification = function(recipientId, type, bookingId, therapistId = null) {
  const notifications = {
    booking_request: {
      title: 'New Booking Request',
      message: 'You have received a new booking request.'
    },
    booking_confirmed: {
      title: 'Booking Confirmed',
      message: 'Your booking has been confirmed by the therapist.'
    },
    booking_cancelled: {
      title: 'Booking Cancelled',
      message: 'Your booking has been cancelled.'
    },
    booking_reminder: {
      title: 'Booking Reminder',
      message: 'You have a booking scheduled soon.'
    }
  };

  const notification = notifications[type];
  if (!notification) return null;

  return new this({
    recipient: recipientId,
    type,
    title: notification.title,
    message: notification.message,
    data: {
      bookingId,
      therapistId
    },
    category: 'booking',
    priority: type === 'booking_reminder' ? 'high' : 'normal'
  });
};

// Static method to create message notification
notificationSchema.statics.createMessageNotification = function(recipientId, senderId, messageId) {
  return new this({
    recipient: recipientId,
    sender: senderId,
    type: 'message_received',
    title: 'New Message',
    message: 'You have received a new message.',
    data: {
      messageId
    },
    category: 'message',
    priority: 'normal'
  });
};

// Static method to create payment notification
notificationSchema.statics.createPaymentNotification = function(recipientId, type, paymentId, amount = null) {
  const notifications = {
    payment_received: {
      title: 'Payment Received',
      message: `Payment of $${amount} has been received.`
    },
    payment_failed: {
      title: 'Payment Failed',
      message: 'Your payment has failed. Please try again.'
    }
  };

  const notification = notifications[type];
  if (!notification) return null;

  return new this({
    recipient: recipientId,
    type,
    title: notification.title,
    message: notification.message,
    data: {
      paymentId
    },
    category: 'payment',
    priority: type === 'payment_failed' ? 'high' : 'normal'
  });
};

module.exports = mongoose.model('Notification', notificationSchema);
