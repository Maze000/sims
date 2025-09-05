# NUmassage Backend API

A comprehensive RESTful API for the NUmassage platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user profiles with preferences and settings
- **Therapist Management**: Therapist profiles, services, and availability
- **Booking System**: Appointment scheduling with availability checking
- **Messaging System**: Real-time chat between users and therapists
- **Notification System**: Push notifications, emails, and SMS
- **Review System**: Rating and review functionality
- **Payment Integration**: Multiple payment methods support
- **Search & Filtering**: Advanced search with geolocation support
- **Security**: Rate limiting, input validation, and security headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/numassage
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:8080
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### User Endpoints

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "Auckland",
    "state": "Auckland",
    "zipCode": "1010"
  }
}
```

### Therapist Endpoints

#### Get All Therapists
```http
GET /therapists?specialty=Thai%20Massage&city=Auckland&minPrice=50&maxPrice=150&rating=4&page=1&limit=20
```

#### Get Featured Therapists
```http
GET /therapists/featured?limit=10
```

#### Get Therapist by ID
```http
GET /therapists/:id
```

#### Create Therapist Profile
```http
POST /therapists
Authorization: Bearer <token>
Content-Type: application/json

{
  "businessName": "Relaxation Spa",
  "description": "Professional massage therapy services",
  "specialties": ["Thai Massage", "Deep Tissue Massage"],
  "experience": {
    "yearsOfExperience": 5
  },
  "services": [
    {
      "name": "Thai Massage",
      "duration": 60,
      "price": 80
    }
  ],
  "location": {
    "type": "clinic",
    "address": {
      "street": "456 Queen St",
      "city": "Auckland",
      "state": "Auckland",
      "zipCode": "1010"
    }
  }
}
```

### Booking Endpoints

#### Get User Bookings
```http
GET /bookings?status=confirmed&type=upcoming&page=1&limit=20
Authorization: Bearer <token>
```

#### Create Booking
```http
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "therapistId": "therapist_id_here",
  "service": {
    "name": "Thai Massage",
    "duration": 60,
    "price": 80
  },
  "scheduledDate": "2024-01-15",
  "scheduledTime": "14:00",
  "location": {
    "type": "clinic",
    "address": {
      "street": "456 Queen St",
      "city": "Auckland"
    }
  },
  "payment": {
    "method": "credit_card"
  }
}
```

#### Update Booking Status
```http
PUT /bookings/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Message Endpoints

#### Get Conversations
```http
GET /messages/conversations?page=1&limit=20
Authorization: Bearer <token>
```

#### Get Messages in Conversation
```http
GET /messages/conversations/:id/messages?limit=50
Authorization: Bearer <token>
```

#### Send Message
```http
POST /messages/conversations/:id/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hello, I'd like to book a session"
}
```

### Notification Endpoints

#### Get Notifications
```http
GET /notifications?category=booking&isRead=false&page=1&limit=20
Authorization: Bearer <token>
```

#### Mark Notifications as Read
```http
PUT /notifications/read
Authorization: Bearer <token>
Content-Type: application/json

{
  "notificationIds": ["notification_id_1", "notification_id_2"]
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/numassage` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:8080` |

### Database Models

- **User**: User accounts and profiles
- **Therapist**: Therapist profiles and services
- **Booking**: Appointment bookings
- **Message**: Chat messages
- **Conversation**: Chat conversations
- **Notification**: System notifications

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers middleware
- **Account Locking**: Automatic account lockout after failed attempts

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Scripts

```bash
# Development
npm run dev          # Start development server with nodemon

# Production
npm start           # Start production server
npm run build       # Build for production

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode

# Database
npm run db:seed     # Seed database with sample data
npm run db:reset    # Reset database
```

## 🚀 Deployment

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t numassage-backend .
   ```

2. **Run container**
   ```bash
   docker run -p 5000:5000 --env-file .env numassage-backend
   ```

### Production Deployment

1. **Set environment variables**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/numassage
   JWT_SECRET=your-production-secret
   ```

2. **Start application**
   ```bash
   npm start
   ```

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## 🔗 Frontend Integration

The backend is designed to work seamlessly with the NUmassage frontend. Update your frontend API configuration to point to the backend URL:

```javascript
// Frontend API configuration
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added messaging system
- **v1.2.0**: Enhanced notification system
- **v1.3.0**: Added review and rating system
