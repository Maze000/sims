const Therapist = require('../models/Therapist');
const User = require('../models/User');

// Create therapist profile
exports.createProfile = async (req, res) => {
  try {
    const {
      businessName,
      description,
      specializations,
      services,
      location,
      contactInfo,
      availability,
      experience
    } = req.body;

    // Check if therapist profile already exists
    const existingProfile = await Therapist.findOne({ userId: req.userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Therapist profile already exists' });
    }

    // Create therapist profile
    const therapist = new Therapist({
      userId: req.userId,
      businessName,
      description,
      specializations,
      services,
      location,
      contactInfo,
      availability,
      experience
    });

    await therapist.save();

    // Update user type to therapist
    await User.findByIdAndUpdate(req.userId, { userType: 'therapist' });

    res.status(201).json({
      message: 'Therapist profile created successfully',
      therapist
    });
  } catch (error) {
    console.error('Create therapist profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get therapist profile
exports.getProfile = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({ userId: req.userId })
      .populate('userId', 'firstName lastName email phone');

    if (!therapist) {
      return res.status(404).json({ message: 'Therapist profile not found' });
    }

    res.json({ therapist });
  } catch (error) {
    console.error('Get therapist profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update therapist profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.userId; // Prevent changing user ID

    const therapist = await Therapist.findOneAndUpdate(
      { userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!therapist) {
      return res.status(404).json({ message: 'Therapist profile not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      therapist
    });
  } catch (error) {
    console.error('Update therapist profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update services
exports.updateServices = async (req, res) => {
  try {
    const { services } = req.body;

    const therapist = await Therapist.findOneAndUpdate(
      { userId: req.userId },
      { services },
      { new: true, runValidators: true }
    );

    if (!therapist) {
      return res.status(404).json({ message: 'Therapist profile not found' });
    }

    res.json({
      message: 'Services updated successfully',
      services: therapist.services
    });
  } catch (error) {
    console.error('Update services error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update availability
exports.updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const therapist = await Therapist.findOneAndUpdate(
      { userId: req.userId },
      { availability },
      { new: true, runValidators: true }
    );

    if (!therapist) {
      return res.status(404).json({ message: 'Therapist profile not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      availability: therapist.availability
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all therapists (for clients to browse)
exports.getAllTherapists = async (req, res) => {
  try {
    const { city, specialization, page = 1, limit = 10 } = req.query;
    
    const query = { isActive: true, isVerified: true };
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (specialization) {
      query.specializations = new RegExp(specialization, 'i');
    }

    const therapists = await Therapist.find(query)
      .populate('userId', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ 'rating.average': -1, createdAt: -1 });

    const total = await Therapist.countDocuments(query);

    res.json({
      therapists,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all therapists error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get therapist by ID (public profile)
exports.getTherapistById = async (req, res) => {
  try {
    const { id } = req.params;

    const therapist = await Therapist.findById(id)
      .populate('userId', 'firstName lastName email phone');

    if (!therapist || !therapist.isActive) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    res.json({ therapist });
  } catch (error) {
    console.error('Get therapist by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
