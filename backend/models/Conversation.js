const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map()
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  groupInfo: {
    name: String,
    description: String,
    avatar: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  metadata: {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Therapist'
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  settings: {
    notifications: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Map,
      of: Boolean,
      default: new Map()
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  archivedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    archivedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.index({ 'metadata.bookingId': 1 });

// Virtual for conversation title
conversationSchema.virtual('title').get(function() {
  if (this.isGroupChat && this.groupInfo.name) {
    return this.groupInfo.name;
  }
  return 'Direct Message';
});

// Pre-save middleware to ensure participants are unique
conversationSchema.pre('save', function(next) {
  if (this.participants) {
    this.participants = [...new Set(this.participants)];
  }
  next();
});

// Static method to find or create conversation between two users
conversationSchema.statics.findOrCreateConversation = async function(user1Id, user2Id, metadata = {}) {
  // Check if conversation already exists
  let conversation = await this.findOne({
    participants: { $all: [user1Id, user2Id] },
    isGroupChat: false
  });

  if (!conversation) {
    // Create new conversation
    conversation = new this({
      participants: [user1Id, user2Id],
      metadata
    });
    await conversation.save();
  }

  return conversation;
};

// Static method to get conversations for a user
conversationSchema.statics.getUserConversations = function(userId, limit = 20, skip = 0) {
  return this.find({
    participants: userId,
    isActive: true
  })
  .populate('participants', 'username firstName lastName avatar')
  .populate('lastMessage')
  .populate('metadata.therapistId', 'businessName')
  .sort({ lastMessageAt: -1 })
  .limit(limit)
  .skip(skip);
};

// Static method to update unread count
conversationSchema.statics.updateUnreadCount = function(conversationId, recipientId) {
  return this.findByIdAndUpdate(
    conversationId,
    {
      $inc: { [`unreadCount.${recipientId}`]: 1 }
    }
  );
};

// Static method to reset unread count
conversationSchema.statics.resetUnreadCount = function(conversationId, userId) {
  return this.findByIdAndUpdate(
    conversationId,
    {
      $unset: { [`unreadCount.${userId}`]: 1 }
    }
  );
};

// Static method to archive conversation
conversationSchema.statics.archiveConversation = function(conversationId, userId) {
  return this.findByIdAndUpdate(
    conversationId,
    {
      $push: {
        archivedBy: {
          user: userId,
          archivedAt: new Date()
        }
      }
    }
  );
};

// Static method to unarchive conversation
conversationSchema.statics.unarchiveConversation = function(conversationId, userId) {
  return this.findByIdAndUpdate(
    conversationId,
    {
      $pull: {
        archivedBy: { user: userId }
      }
    }
  );
};

module.exports = mongoose.model('Conversation', conversationSchema);
