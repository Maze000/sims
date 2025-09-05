const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  specializations: [{
    type: String,
    trim: true
  }],
  services: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: Number,
      required: true,
      min: 15
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  location: {
    city: {
      type: String,
      required: true,
      trim: true
    },
    region: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      default: 'New Zealand'
    }
  },
  contactInfo: {
    phone: String,
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      linkedin: String
    }
  },
  availability: {
    monday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    tuesday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    wednesday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    thursday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    friday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    saturday: { start: String, end: String, isAvailable: { type: Boolean, default: false } },
    sunday: { start: String, end: String, isAvailable: { type: Boolean, default: false } }
  },
  photos: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  certifications: [{
    name: String,
    issuer: String,
    dateObtained: Date,
    expiryDate: Date,
    documentUrl: String
  }],
  experience: {
    yearsOfExperience: {
      type: Number,
      min: 0
    },
    previousWorkplaces: [String]
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

// Index for search functionality
therapistSchema.index({ 
  businessName: 'text', 
  description: 'text', 
  specializations: 'text',
  'location.city': 'text',
  'location.region': 'text'
});

module.exports = mongoose.model('Therapist', therapistSchema);
