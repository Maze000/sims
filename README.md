# Numassage - MVP Platform

A modern massage therapy platform connecting clients with professional therapists in New Zealand.

## 🚀 MVP Features

### Core Functionality
- **User Authentication**: Secure login/registration system
- **Therapist Profiles**: Complete therapist management dashboard
- **Membership System**: 14-day free trial + monthly subscription
- **Messaging System**: Paid messaging ($3 NZD per initial message)
- **Stripe Integration**: Secure payment processing

### For Therapists
- **Dashboard**: Manage profile, services, and availability
- **Service Management**: Add, edit, and price massage services
- **Availability Settings**: Set working hours and availability
- **Profile Customization**: Business details, specializations, experience

### For Clients
- **Browse Therapists**: Search and filter by location, specialty
- **Membership Plans**: Free trial with automatic conversion
- **Direct Messaging**: Connect with therapists (paid service)
- **User Dashboard**: Manage account and membership

## 🛠️ Technology Stack

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** + shadcn/ui components
- **React Router** for navigation
- **Context API** for state management

### Backend
- **Node.js** + Express
- **MongoDB** with Mongoose
- **Stripe** for payment processing
- **JWT** authentication
- **Rate limiting** and security middleware

### Key Dependencies
- `@stripe/stripe-js` - Stripe payment integration
- `@radix-ui/react-*` - Accessible UI components
- `lucide-react` - Icon library
- `react-hook-form` - Form handling

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB
- Stripe account

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd numassage-platform
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   # Frontend (Terminal 1)
   npm run dev
   
   # Backend (Terminal 2)
   cd backend
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/numassage

# JWT
JWT_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend
FRONTEND_URL=http://localhost:8080
```

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Create a monthly price product
4. Set up webhook endpoints
5. Update environment variables

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/            # shadcn/ui components
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TherapistDashboard.tsx # Therapist management
│   ├── Membership.tsx  # Membership & billing
│   └── Login.tsx       # Authentication
└── App.tsx             # Main application

backend/
├── controllers/        # Route controllers
├── models/            # MongoDB schemas
├── routes/            # API endpoints
├── middleware/        # Express middleware
└── server.js          # Main server file
```

## 🚀 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Therapists
- `GET /api/therapists` - List all therapists
- `GET /api/therapists/:id` - Get therapist profile
- `POST /api/therapists/profile` - Create therapist profile
- `PUT /api/therapists/profile` - Update therapist profile

### Memberships
- `POST /api/memberships/trial` - Start free trial
- `GET /api/memberships/status` - Get membership status
- `POST /api/memberships/subscription` - Create subscription
- `PUT /api/memberships/cancel` - Cancel subscription

### Messages
- `POST /api/messages/send` - Send initial message
- `POST /api/messages/respond` - Send response
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversation/:id` - Get conversation

## 💳 Payment Flow

1. **Free Trial**: 14 days of full access
2. **Automatic Conversion**: Trial converts to monthly subscription
3. **Message Pricing**: $3 NZD per initial message to therapists
4. **Subscription Management**: Cancel or reactivate anytime

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for responsive layouts
- Optimized for all device sizes
- Touch-friendly interactions

## 🚧 Development Status

### ✅ Completed
- User authentication system
- Therapist dashboard
- Membership management
- Stripe integration
- Responsive UI components
- API endpoints structure

### 🔄 In Progress
- Real-time messaging
- Advanced search filters
- Review system
- Notification system

### 📋 Planned
- Mobile app
- Advanced analytics
- Multi-language support
- Advanced booking system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For support and questions, please contact the development team.

---

**Built with ❤️ for the New Zealand wellness community**
