import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import Home from './pages/Home';
import ExploreTherapists from './pages/ExploreTherapists';
import Profile from './pages/Profile';
import TherapistProfile from './pages/TherapistProfileNew';
import CreateProfile from './pages/CreateProfile';
import Services from './pages/Services';
import Availability from './pages/Availability';
import Settings from './pages/Settings';
import ProfileStats from './pages/ProfileStats';

// Unified Layout Component - Always renders Navigation
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-transparent">
      <Navigation />
      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 lg:ml-64">
        {/* Mobile header spacer - Only visible on mobile */}
        <div className="lg:hidden h-14 sm:h-16" />
        {children}
      </main>
    </div>
  );
};

// Public Layout Component - For pages that don't need authentication
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

// Protected Route Component with role-based access
const ProtectedRoute = ({ 
  children, 
  allowedUserTypes, 
  redirectTo = '/dashboard' 
}: { 
  children: React.ReactNode, 
  allowedUserTypes?: string[], 
  redirectTo?: string 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 sm:w-12 sm:h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Main App Component
const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        
        <Route path="/home" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        
        <Route path="/login" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />

        {/* Protected Routes - Require authentication and use AppLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/therapist-dashboard" element={
          <ProtectedRoute allowedUserTypes={['service_provider']} redirectTo="/dashboard">
            <AppLayout>
              <TherapistDashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/explore" element={
          <ProtectedRoute>
            <AppLayout>
              <ExploreTherapists />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/therapist/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <TherapistProfile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/provider/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <TherapistProfile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/create-profile" element={
          <ProtectedRoute>
            <AppLayout>
              <CreateProfile />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/services" element={
          <ProtectedRoute allowedUserTypes={['service_provider']} redirectTo="/dashboard">
            <AppLayout>
              <Services />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/availability" element={
          <ProtectedRoute allowedUserTypes={['service_provider']} redirectTo="/dashboard">
            <AppLayout>
              <Availability />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <AppLayout>
              <Settings />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile-stats" element={
          <ProtectedRoute allowedUserTypes={['service_provider']} redirectTo="/dashboard">
            <AppLayout>
              <ProfileStats />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        
        {/* Catch all route - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef');

// Root App Component
function App() {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <AppContent />
      </Elements>
    </AuthProvider>
  );
}

export default App;
