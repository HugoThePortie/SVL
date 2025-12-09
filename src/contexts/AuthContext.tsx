import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegistrationData } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegistrationData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // TODO: Validate token with backend
          // For now, simulate a logged-in user
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulated login for development
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        role: 'law_enforcement',
        profile: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          badgeNumber: '12345',
          department: 'Metro Police',
          jurisdiction: 'Metro City',
          phoneNumber: '555-123-4567',
          email: credentials.email,
          preferredNotificationMethod: 'email',
          notificationPreferences: {
            method: 'email',
            email: credentials.email,
            suppressionMinutes: 15,
            onlyWhenStationary: false,
          },
          isVerified: true,
          verifiedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        isVerified: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (data: RegistrationData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Registering user:', data);
      // After registration, user needs to be verified before full access
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      // TODO: Replace with actual API call
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
