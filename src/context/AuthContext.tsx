import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dataService, DEFAULT_USER, ADMIN_USER } from '../services/dataService';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginDemoCustomer: () => void;
  loginDemoAdmin: () => void;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  toggleFavorite: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return dataService.getCurrentUser() || DEFAULT_USER;
  });
  const { showToast } = useNotification();

  useEffect(() => {
    dataService.setCurrentUser(currentUser);
  }, [currentUser]);

  const login = async (email: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@lanivick.ng' || cleanEmail.includes('admin')) {
      setCurrentUser(ADMIN_USER);
      showToast(`Welcome back, Victoria (Administrator)!`, 'success');
      return true;
    }

    const customer: UserProfile = {
      ...DEFAULT_USER,
      email: cleanEmail,
      name: email.split('@')[0].toUpperCase(),
    };
    setCurrentUser(customer);
    showToast(`Welcome back, ${customer.name}!`, 'success');
    return true;
  };

  const loginDemoCustomer = () => {
    setCurrentUser(DEFAULT_USER);
    showToast(`Logged in as Demo Customer (${DEFAULT_USER.name})`, 'info');
  };

  const loginDemoAdmin = () => {
    setCurrentUser(ADMIN_USER);
    showToast(`Logged in as Administrator (${ADMIN_USER.name})`, 'info');
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      role: 'customer',
      savedAddresses: [],
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome to Lanivick, ${name}.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Profile updated successfully!', 'success');
  };

  const toggleFavorite = (productId: string) => {
    if (!currentUser) {
      showToast('Please sign in to save your favorites.', 'warning');
      return;
    }
    const exists = currentUser.favorites?.includes(productId);
    const updatedFavorites = exists
      ? currentUser.favorites.filter((id) => id !== productId)
      : [...(currentUser.favorites || []), productId];

    updateProfile({ favorites: updatedFavorites });
    showToast(exists ? 'Removed from favorites' : 'Added to favorites ❤️', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        isCustomer: currentUser?.role === 'customer',
        login,
        loginDemoCustomer,
        loginDemoAdmin,
        register,
        logout,
        updateProfile,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
