const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true
  },
  service: {
    name: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'NZD'
    }
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['clinic', 'home', 'hotel', 'office'],
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'New Zealand'
      }
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    instructions: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'NZD'
    },
    transactionId: String,
    paidAt: Date
  },
  notes: {
    client: {
      type: String,
      maxlength: [500, 'Client notes cannot exceed 500 characters']
    },
    therapist: {
      type: String,
      maxlength: [500, 'Therapist notes cannot exceed 500 characters']
    }
  },
  healthInfo: {
    medicalConditions: [String],
    allergies: [String],
    medications: [String],
    injuries: [String],
    pregnancy: {
      type: Boolean,
      default: false
    },
    pregnancyWeeks: Number
  },
  preferences: {
    pressure: {
      type: String,
      enum: ['light', 'medium', 'firm', 'deep'],
      default: 'medium'
    },
    focusAreas: [String],
    avoidAreas: [String],
    music: {
      type: Boolean,
      default: true
    },
    conversation: {
      type: String,
      enum: ['quiet', 'minimal', 'conversational'],
      default: 'conversational'
    }
  },
  cancellation: {
    policy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    cancelledBy: {
      type: String,
      enum: ['client', 'therapist', 'system']
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    submittedAt: Date
  },
  reminders: {
    sent24h: {
      type: Boolean,
      default: false
    },
    sent1h: {
      type: Boolean,
      default: false
    }
  },
  metadata: {
    bookingSource: {
      type: String,
      enum: ['web', 'mobile', 'phone', 'walk_in'],
      default: 'web'
    },
    ipAddress: String,
    userAgent: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
bookingSchema.index({ client: 1, scheduledDate: -1 });
bookingSchema.index({ therapist: 1, scheduledDate: -1 });
bookingSchema.index({ status: 1, scheduledDate: 1 });
bookingSchema.index({ 'payment.status': 1 });

// Virtual for booking duration in hours
bookingSchema.virtual('durationHours').get(function() {
  return this.service.duration / 60;
});

// Virtual for booking status color
bookingSchema.virtual('statusColor').get(function() {
  const colors = {
    pending: 'yellow',
    confirmed: 'green',
    in_progress: 'blue',
    completed: 'gray',
    cancelled: 'red',
    no_show: 'red'
  };
  return colors[this.status] || 'gray';
});

// Virtual for is upcoming
bookingSchema.virtual('isUpcoming').get(function() {
  return new Date(this.scheduledDate + ' ' + this.scheduledTime) > new Date();
});

// Virtual for is today
bookingSchema.virtual('isToday').get(function() {
  const today = new Date().toDateString();
  const bookingDate = new Date(this.scheduledDate).toDateString();
  return today === bookingDate;
});

// Pre-save middleware to calculate end time
bookingSchema.pre('save', function(next) {
  if (this.scheduledTime && this.service.duration) {
    const startTime = new Date(`2000-01-01 ${this.scheduledTime}`);
    const endTime = new Date(startTime.getTime() + this.service.duration * 60000);
    this.endTime = endTime.toTimeString().slice(0, 5);
  }
  next();
});

// Static method to get upcoming bookings
bookingSchema.statics.getUpcomingBookings = function(userId, limit = 10) {
  const now = new Date();
  return this.find({
    $or: [{ client: userId }, { therapist: userId }],
    scheduledDate: { $gte: now },
    status: { $in: ['pending', 'confirmed'] }
  })
  .populate('client', 'firstName lastName avatar')
  .populate('therapist', 'businessName')
  .sort({ scheduledDate: 1, scheduledTime: 1 })
  .limit(limit);
};

// Static method to get past bookings
bookingSchema.statics.getPastBookings = function(userId, limit = 10) {
  const now = new Date();
  return this.find({
    $or: [{ client: userId }, { therapist: userId }],
    scheduledDate: { $lt: now },
    status: { $in: ['completed', 'cancelled', 'no_show'] }
  })
  .populate('client', 'firstName lastName avatar')
  .populate('therapist', 'businessName')
  .sort({ scheduledDate: -1, scheduledTime: -1 })
  .limit(limit);
};

// Static method to check availability
bookingSchema.statics.checkAvailability = function(therapistId, date, startTime, duration) {
  const startDateTime = new Date(`${date} ${startTime}`);
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
  
  return this.find({
    therapist: therapistId,
    scheduledDate: date,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      {
        scheduledTime: { $lt: endDateTime.toTimeString().slice(0, 5) },
        endTime: { $gt: startTime }
      }
    ]
  });
};

// Static method to get booking statistics
bookingSchema.statics.getStats = function(userId, period = 'month') {
  const now = new Date();
  let startDate;
  
  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  return this.aggregate([
    {
      $match: {
        $or: [{ client: userId }, { therapist: userId }],
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$payment.amount' }
      }
    }
  ]);
};

module.exports = mongoose.model('Booking', bookingSchema);
