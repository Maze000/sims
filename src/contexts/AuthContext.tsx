import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'client' | 'service_provider';
  isVerified: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  becomeServiceProvider: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType?: 'client' | 'service_provider';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'test@example.com',
    firstName: '',
    lastName: '',
    userType: 'client',
    isVerified: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear old localStorage data to force fresh start
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    
    // Check for existing token on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: Validate token with backend
      // This will be implemented when backend is ready
      // For now, just check if it exists
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          localStorage.removeItem('userData');
          localStorage.removeItem('authToken');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // API call will be implemented when backend is ready
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Simulate API response for now
      const mockUser: User = {
        id: '1',
        email,
        firstName: '',
        lastName: '',
        userType: 'client',
        isVerified: true
      };

      const mockToken = 'mock-jwt-token';

      // Store token and user data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // API call will be implemented when backend is ready
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();
      
      // Simulate API response for now - ALL users start as clients
      const mockUser: User = {
        id: Date.now().toString(), // Generate unique ID
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: 'client', // Always start as client
        isVerified: false
      };

      const mockToken = 'mock-jwt-token';

      // Store token and user data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const becomeServiceProvider = async () => {
    try {
      // API call will be implemented when backend is ready to become service provider
      // const response = await fetch('/api/auth/become-therapist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // Simulate API response for now
      if (user) {
        const updatedUser = { ...user, userType: 'service_provider' as const };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw new Error('Failed to become service provider');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    becomeServiceProvider
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
