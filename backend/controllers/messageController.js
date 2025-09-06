const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Message = require('../models/Message');
const User = require('../models/User');
const Therapist = require('../models/Therapist');

// Send initial message (requires payment)
exports.sendInitialMessage = async (req, res) => {
  try {
    const { recipientId, content, paymentMethodId } = req.body;

    // Check if recipient is a therapist
    const therapist = await Therapist.findOne({ userId: recipientId });
    if (!therapist) {
      return res.status(400).json({ message: 'Recipient must be a therapist' });
    }

    // Check if sender is authenticated
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300, // 3.00 NZD in cents
      currency: 'nzd',
      customer: req.userId,
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.FRONTEND_URL}/messages`,
      metadata: {
        senderId: req.userId.toString(),
        recipientId: recipientId.toString(),
        messageType: 'initial'
      }
    });

    if (paymentIntent.status === 'succeeded') {
      // Create message
      const message = new Message({
        senderId: req.userId,
        recipientId,
        content,
        messageType: 'initial',
        paymentStatus: 'completed',
        stripePaymentIntentId: paymentIntent.id,
        amount: 3.00,
        currency: 'NZD'
      });

      await message.save();

      res.status(201).json({
        message: 'Message sent successfully',
        messageData: {
          id: message._id,
          content: message.content,
          createdAt: message.createdAt,
          paymentStatus: message.paymentStatus
        }
      });
    } else {
      res.status(400).json({ 
        message: 'Payment failed', 
        paymentIntent: paymentIntent 
      });
    }
  } catch (error) {
    console.error('Send initial message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Send response message (free for therapists)
exports.sendResponseMessage = async (req, res) => {
  try {
    const { recipientId, content, originalMessageId } = req.body;

    // Check if sender is a therapist
    const therapist = await Therapist.findOne({ userId: req.userId });
    if (!therapist) {
      return res.status(403).json({ message: 'Only therapists can send response messages' });
    }

    // Check if there's an original message from this recipient
    const originalMessage = await Message.findOne({
      _id: originalMessageId,
      senderId: recipientId,
      recipientId: req.userId,
      messageType: 'initial'
    });

    if (!originalMessage) {
      return res.status(400).json({ message: 'Invalid original message' });
    }

    // Create response message
    const message = new Message({
      senderId: req.userId,
      recipientId,
      content,
      messageType: 'response',
      paymentStatus: 'completed', // Free for therapists
      amount: 0,
      currency: 'NZD'
    });

    await message.save();

    res.status(201).json({
      message: 'Response sent successfully',
      messageData: {
        id: message._id,
        content: message.content,
        createdAt: message.createdAt
      }
    });
  } catch (error) {
    console.error('Send response message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: req.userId, recipientId: otherUserId },
        { senderId: otherUserId, recipientId: req.userId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('senderId', 'firstName lastName')
    .populate('recipientId', 'firstName lastName');

    res.json({ messages });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all conversations for a user
exports.getConversations = async (req, res) => {
  try {
    // Get unique conversation partners
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.userId },
            { recipientId: req.userId }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$senderId', req.userId] },
              '$recipientId',
              '$senderId'
            ]
          },
          lastMessage: { $last: '$$ROOT' },
          messageCount: { $sum: 1 }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    // Populate user details
    const populatedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const user = await User.findById(conv._id).select('firstName lastName');
        return {
          ...conv,
          user
        };
      })
    );

    res.json({ conversations: populatedConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.recipientId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to mark this message as read' });
    }

    await message.markAsRead();

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Archive message
exports.archiveMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.senderId.toString() !== req.userId && 
        message.recipientId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to archive this message' });
    }

    await message.archive();

    res.json({ message: 'Message archived' });
  } catch (error) {
    console.error('Archive message error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipientId: req.userId,
      isRead: false
    });

    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
