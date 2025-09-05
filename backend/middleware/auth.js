const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'Token is not valid.' });
      }

      // Add user to request
      req.userId = user._id;
      req.user = user;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional auth - verify JWT token if provided
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user) {
          // Add user to request
          req.userId = user._id;
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we continue without user
        console.log('Invalid token in optional auth:', error.message);
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

// Require therapist role
const requireTherapist = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.userType !== 'therapist') {
      return res.status(403).json({ message: 'Therapist access required' });
    }

    next();
  } catch (error) {
    console.error('Require therapist middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Require client role
const requireClient = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.userType !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    next();
  } catch (error) {
    console.error('Require client middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  auth,
  optionalAuth,
  requireTherapist,
  requireClient
};
