# Sims - Service Provider Platform

A modern service provider platform connecting clients with professional service providers in New Zealand. Built with a playful, toy-like aesthetic inspired by The Sims game.

## 🎮 Platform Features

### Core Functionality
- **User Authentication**: Secure login/registration system
- **Service Provider Profiles**: Complete provider management dashboard
- **Direct Marketplace**: Simple service provider platform
- **Messaging System**: Paid messaging ($3 NZD per initial message)
- **Stripe Integration**: Secure payment processing

### For Service Providers
- **Dashboard**: Manage profile, services, and availability
- **Service Management**: Add, edit, and price services
- **Availability Settings**: Set working hours and availability
- **Profile Customization**: Business details, specializations, experience

### For Clients
- **Browse Providers**: Search and filter by location, specialty
- **Contact Requests**: Direct contact form for service inquiries
- **Direct Messaging**: Connect with providers (paid service)
- **User Dashboard**: Manage account and profile

## 🎨 Service Categories

### 1️⃣ Health and Wellness
- Masajistas
- Fisioterapeutas / Kinesiologistas
- Terapeutas ocupacionales
- Psicólogos / Consejeros
- Nutricionistas / Dietistas
- Entrenadores personales / Personal trainers
- Yoga / Pilates instructors
- Acupunturistas
- Quiroprácticos

### 2️⃣ Beauty and Aesthetics
- Estilistas / Hairdressers
- Manicuristas / Pedicuristas
- Maquilladores / Makeup artists
- Depiladores / Waxing specialists
- Barberos
- Esteticistas / Skin care specialists

### 3️⃣ Personal Care and Assistance
- Niñeras / Babysitters
- Cuidadores de ancianos / Caregivers
- Acompañantes personales / Companions
- Paseadores de perros / Dog walkers
- Entrenadores de mascotas / Pet trainers
- Cuidadores de mascotas / Pet sitters

### 4️⃣ Education and Development
- Tutores / Private tutors
- Instructores de idiomas / Language teachers
- Clases de música / Music teachers
- Clases de arte / Art instructors
- Coaching / Life coaches
- Mentores profesionales

### 5️⃣ Creative Services and Entertainment
- Fotógrafos / Videographers
- Diseñadores gráficos / Graphic designers
- DJs / Músicos
- Animadores / Performers
- Organizadores de eventos / Event coordinators
- Modelos / Talent for casting

### 6️⃣ Home and Practical Assistance
- Asistentes personales / Personal assistants
- Organización de hogar / Home organizers
- Limpieza doméstica / House cleaners
- Reparaciones menores / Handyman services

### 7️⃣ Sports and Physical Activities
- Entrenadores de fitness / Fitness instructors
- Entrenadores de deportes específicos (tenis, fútbol, natación…)
- Guías de senderismo / Hiking guides
- Monitores de actividades al aire libre / Outdoor activity instructors

### 8️⃣ Technology and Digital Support
- Asistentes virtuales / Virtual assistants
- Soporte técnico / IT support
- Community managers / Social media managers
- Desarrolladores freelance / Freelance developers

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
   cd sims-platform
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
MONGODB_URI=mongodb://localhost:27017/sims

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
├── data/              # Data and configurations
│   └── categories.ts  # Service categories
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TherapistDashboard.tsx # Provider management
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

### Service Providers
- `GET /api/providers` - List all providers
- `GET /api/providers/:id` - Get provider profile
- `POST /api/providers/profile` - Create provider profile
- `PUT /api/providers/profile` - Update provider profile


### Messages
- `POST /api/messages/send` - Send initial message
- `POST /api/messages/respond` - Send response
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversation/:id` - Get conversation

## 💳 Payment Flow

1. **Free Trial**: 14 days of full access
2. **Automatic Conversion**: Trial converts to monthly subscription
3. **Message Pricing**: $3 NZD per initial message to providers
4. **Subscription Management**: Cancel or reactivate anytime

## 🎨 Design System

### Toy-like Aesthetic
- **Plastic Button Style**: Rounded corners, gradients, and shadows
- **Vibrant Colors**: Pink (#FF6B9D), Yellow (#FF9F43), Orange (#e28000)
- **Playful Interactions**: Hover effects and smooth transitions
- **Sims-inspired**: References to the popular life simulation game

### Color Palette
- Primary: Pink (#FF6B9D)
- Secondary: Yellow (#FF9F43)
- Accent: Orange (#e28000)
- Background: Light gradients

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
- Service provider dashboard
- Profile management
- Stripe integration
- Responsive UI components
- API endpoints structure
- Service categories system
- Toy-like aesthetic design

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

**Built with ❤️ for the New Zealand service provider community**