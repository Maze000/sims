const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  stripeSubscriptionId: {
    type: String
  },
  plan: {
    type: String,
    enum: ['trial', 'monthly'],
    default: 'trial'
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'past_due', 'unpaid', 'trial'],
    default: 'trial'
  },
  trialStartDate: {
    type: Date,
    default: Date.now
  },
  trialEndDate: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 14); // 2 weeks trial
      return date;
    }
  },
  subscriptionStartDate: {
    type: Date
  },
  subscriptionEndDate: {
    type: Date
  },
  nextBillingDate: {
    type: Date
  },
  amount: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'NZD'
  },
  billingCycle: {
    type: String,
    enum: ['monthly'],
    default: 'monthly'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  },
  canceledAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual to check if user is in trial period
membershipSchema.virtual('isInTrial').get(function() {
  if (this.plan === 'trial' && this.trialEndDate) {
    return new Date() < this.trialEndDate;
  }
  return false;
});

// Virtual to check if trial has expired
membershipSchema.virtual('trialExpired').get(function() {
  if (this.trialEndDate) {
    return new Date() >= this.trialEndDate;
  }
  return false;
});

// Method to check if membership is active
membershipSchema.methods.isMembershipActive = function() {
  if (this.isInTrial) return true;
  if (this.status === 'active' && this.subscriptionEndDate) {
    return new Date() < this.subscriptionEndDate;
  }
  return false;
};

// Pre-save middleware to update trial end date for new trials
membershipSchema.pre('save', function(next) {
  if (this.isNew && this.plan === 'trial' && !this.trialEndDate) {
    this.trialEndDate = new Date();
    this.trialEndDate.setDate(this.trialEndDate.getDate() + 14);
  }
  next();
});

module.exports = mongoose.model('Membership', membershipSchema);
