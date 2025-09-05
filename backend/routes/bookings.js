const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Booking = require('../models/Booking');
const Therapist = require('../models/Therapist');
const Notification = require('../models/Notification');
const { protect, requireTherapist } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', [
  protect,
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
    .withMessage('Invalid status'),
  query('type')
    .optional()
    .isIn(['upcoming', 'past'])
    .withMessage('Type must be upcoming or past'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
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

    const { status, type, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    let sortOption = { scheduledDate: -1, scheduledTime: -1 };

    // Filter by user role
    if (req.user.role === 'therapist') {
      query.therapist = req.user._id;
    } else {
      query.client = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by type (upcoming/past)
    if (type) {
      const now = new Date();
      if (type === 'upcoming') {
        query.scheduledDate = { $gte: now };
        query.status = { $in: ['pending', 'confirmed'] };
      } else if (type === 'past') {
        query.scheduledDate = { $lt: now };
        query.status = { $in: ['completed', 'cancelled', 'no_show'] };
      }
    }

    const bookings = await Booking.find(query)
      .populate('client', 'firstName lastName avatar phone')
      .populate('therapist', 'businessName')
      .populate('therapist.user', 'firstName lastName avatar phone')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client', 'firstName lastName avatar phone email')
      .populate('therapist', 'businessName')
      .populate('therapist.user', 'firstName lastName avatar phone email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has access to this booking
    if (booking.client.toString() !== req.user._id.toString() && 
        booking.therapist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', [
  protect,
  body('therapistId')
    .isMongoId()
    .withMessage('Therapist ID must be a valid ID'),
  body('service.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('service.duration')
    .isInt({ min: 15, max: 480 })
    .withMessage('Service duration must be between 15 and 480 minutes'),
  body('service.price')
    .isFloat({ min: 0 })
    .withMessage('Service price must be a positive number'),
  body('scheduledDate')
    .isISO8601()
    .withMessage('Scheduled date must be a valid date'),
  body('scheduledTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Scheduled time must be in HH:MM format'),
  body('location.type')
    .isIn(['clinic', 'home', 'hotel', 'office'])
    .withMessage('Invalid location type'),
  body('payment.method')
    .isIn(['credit_card', 'debit_card', 'paypal', 'stripe', 'cash', 'bank_transfer'])
    .withMessage('Invalid payment method'),
  body('notes.client')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Client notes cannot exceed 500 characters'),
  body('healthInfo')
    .optional()
    .isObject()
    .withMessage('Health info must be an object'),
  body('preferences')
    .optional()
    .isObject()
    .withMessage('Preferences must be an object')
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

    const {
      therapistId,
      service,
      scheduledDate,
      scheduledTime,
      location,
      payment,
      notes,
      healthInfo,
      preferences
    } = req.body;

    // Check if therapist exists and is active
    const therapist = await Therapist.findOne({
      _id: therapistId,
      isActive: true,
      status: 'approved'
    });

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found or not available'
      });
    }

    // Check availability
    const conflictingBookings = await Booking.checkAvailability(
      therapistId,
      scheduledDate,
      scheduledTime,
      service.duration
    );

    if (conflictingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Therapist is not available at this time'
      });
    }

    // Create booking
    const booking = await Booking.create({
      client: req.user._id,
      therapist: therapistId,
      service,
      scheduledDate,
      scheduledTime,
      location,
      payment: {
        ...payment,
        amount: service.price
      },
      notes,
      healthInfo,
      preferences
    });

    // Send notification to therapist
    const notification = await Notification.createBookingNotification(
      therapist.user,
      'booking_request',
      booking._id,
      therapistId
    );
    await notification.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('client', 'firstName lastName avatar phone')
      .populate('therapist', 'businessName')
      .populate('therapist.user', 'firstName lastName avatar phone');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking: populatedBooking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.put('/:id/status', [
  protect,
  body('status')
    .isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
    .withMessage('Invalid status'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters')
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

    const { status, reason } = req.body;
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId)
      .populate('client', 'firstName lastName avatar')
      .populate('therapist', 'businessName')
      .populate('therapist.user', 'firstName lastName avatar');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has permission to update this booking
    const isClient = booking.client._id.toString() === req.user._id.toString();
    const isTherapist = booking.therapist.user._id.toString() === req.user._id.toString();

    if (!isClient && !isTherapist) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update booking
    booking.status = status;
    if (reason) {
      booking.cancellation = {
        ...booking.cancellation,
        reason,
        cancelledBy: isClient ? 'client' : 'therapist',
        cancelledAt: new Date()
      };
    }

    await booking.save();

    // Send notifications
    const notificationType = status === 'confirmed' ? 'booking_confirmed' : 
                           status === 'cancelled' ? 'booking_cancelled' : null;

    if (notificationType) {
      const recipient = isClient ? booking.therapist.user._id : booking.client._id;
      const notification = await Notification.createBookingNotification(
        recipient,
        notificationType,
        booking._id,
        booking.therapist._id
      );
      await notification.save();
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bookings/:id/review
// @desc    Add review to completed booking
// @access  Private
router.post('/:id/review', [
  protect,
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Review comment cannot exceed 500 characters')
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

    const { rating, comment } = req.body;
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is the client
    if (booking.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the client can review this booking'
      });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
    }

    // Check if already reviewed
    if (booking.rating.score) {
      return res.status(400).json({
        success: false,
        message: 'Booking already reviewed'
      });
    }

    // Add review
    booking.rating = {
      score: rating,
      comment,
      submittedAt: new Date()
    };

    await booking.save();

    // Add review to therapist
    const therapist = await Therapist.findById(booking.therapist);
    if (therapist) {
      therapist.reviews.push({
        user: req.user._id,
        rating,
        comment
      });
      await therapist.save();
    }

    res.json({
      success: true,
      message: 'Review added successfully',
      data: { review: booking.rating }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/stats
// @desc    Get booking statistics
// @access  Private
router.get('/stats', [
  protect,
  query('period')
    .optional()
    .isIn(['week', 'month', 'year'])
    .withMessage('Period must be week, month, or year')
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

    const { period = 'month' } = req.query;
    const stats = await Booking.getStats(req.user._id, period);

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bookings/availability/:therapistId
// @desc    Check therapist availability
// @access  Public
router.get('/availability/:therapistId', [
  query('date')
    .isISO8601()
    .withMessage('Date must be a valid date'),
  query('startTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  query('duration')
    .isInt({ min: 15, max: 480 })
    .withMessage('Duration must be between 15 and 480 minutes')
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

    const { therapistId } = req.params;
    const { date, startTime, duration } = req.query;

    // Check if therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }

    // Check availability
    const conflictingBookings = await Booking.checkAvailability(
      therapistId,
      date,
      startTime,
      parseInt(duration)
    );

    const isAvailable = conflictingBookings.length === 0;

    res.json({
      success: true,
      data: {
        isAvailable,
        conflictingBookings: isAvailable ? [] : conflictingBookings
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
