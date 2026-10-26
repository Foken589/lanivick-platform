import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dataService, DEFAULT_USER, ADMIN_USER, AYUBA_ADMIN_USER } from '../services/dataService';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAdminWithPassword: (password: string, preferredEmail?: string) => boolean;
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
    return dataService.getCurrentUser() || null;
  });
  const { showToast } = useNotification();

  useEffect(() => {
    dataService.setCurrentUser(currentUser);
  }, [currentUser]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Ayuba F. Yohanna (Admin Account)
    if (cleanEmail === 'ayubafyohanna@gmail.com') {
      if (!password) {
        showToast('Please enter your administrator password.', 'error');
        return false;
      }
      if (dataService.verifyAdminPassword(password, 'ayubafyohanna@gmail.com')) {
        const ayuba = dataService.findAdminByEmail('ayubafyohanna@gmail.com') || AYUBA_ADMIN_USER;
        setCurrentUser(ayuba);
        showToast('Welcome back, Ayuba! (Administrator)', 'success');
        return true;
      } else {
        showToast('Incorrect administrator password for Ayuba. Access denied.', 'error');
        return false;
      }
    }

    // 2. Danladi Victoria Lanishe (Primary Proprietor)
    if (
      cleanEmail === 'lanivick555@gmail.com' ||
      cleanEmail === 'admin@lanivick.ng' ||
      cleanEmail === 'admin'
    ) {
      if (!password) {
        showToast('Please enter your administrator password.', 'error');
        return false;
      }
      if (dataService.verifyAdminPassword(password, 'lanivick555@gmail.com')) {
        const vic = dataService.findAdminByEmail('lanivick555@gmail.com') || ADMIN_USER;
        setCurrentUser(vic);
        showToast('Welcome back, Victoria! (Administrator)', 'success');
        return true;
      } else {
        showToast('Incorrect administrator password for Victoria. Access denied.', 'error');
        return false;
      }
    }

    // 3. Other Registered Co-Administrators
    const otherAdmin = dataService.getAdmins().find((a) => a.email.toLowerCase() === cleanEmail);
    if (otherAdmin) {
      if (!password) {
        showToast('Please enter your administrator password.', 'error');
        return false;
      }
      if (dataService.verifyAdminPassword(password, cleanEmail)) {
        setCurrentUser(otherAdmin);
        showToast(`Welcome back, ${otherAdmin.name}!`, 'success');
        return true;
      } else {
        showToast('Incorrect administrator password.', 'error');
        return false;
      }
    }

    // 4. Quick Unlock: Admin Password with Any Email
    if (password && dataService.verifyAdminPassword(password)) {
      const adminMatch = dataService.findAdminByPassword(password);
      if (adminMatch) {
        setCurrentUser(adminMatch);
        showToast(`Admin Console Unlocked! Welcome, ${adminMatch.name}.`, 'success');
        return true;
      }
    }

    // 5. Regular Customer Sign-In
    const customer: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: email.split('@')[0].toUpperCase(),
      phone: '',
      role: 'customer',
      savedAddresses: [],
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(customer);
    showToast(`Welcome back, ${customer.name}!`, 'success');
    return true;
  };

  const loginAdminWithPassword = (password: string, preferredEmail?: string): boolean => {
    if (!password) {
      showToast('Please enter your administrator password.', 'error');
      return false;
    }

    if (preferredEmail) {
      const cleanEmail = preferredEmail.trim().toLowerCase();
      if (dataService.verifyAdminPassword(password, cleanEmail)) {
        const adminProfile =
          dataService.findAdminByEmail(cleanEmail) ||
          (cleanEmail === 'ayubafyohanna@gmail.com' ? AYUBA_ADMIN_USER : ADMIN_USER);
        setCurrentUser(adminProfile);
        showToast(`Admin Console Unlocked! Welcome, ${adminProfile.name}.`, 'success');
        return true;
      }
    }

    const adminMatch = dataService.findAdminByPassword(password);
    if (adminMatch) {
      setCurrentUser(adminMatch);
      showToast(`Admin Console Unlocked! Welcome, ${adminMatch.name}.`, 'success');
      return true;
    }

    showToast('Incorrect administrator password. Access denied.', 'error');
    return false;
  };

  const loginDemoCustomer = () => {
    setCurrentUser(DEFAULT_USER);
    showToast(`Logged in as Customer (${DEFAULT_USER.name})`, 'info');
  };

  const loginDemoAdmin = () => {
    const admin = dataService.getAdmins()[0] || ADMIN_USER;
    setCurrentUser(admin);
    showToast(`Logged in as Administrator (${admin.name})`, 'info');
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
        loginAdminWithPassword,
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
