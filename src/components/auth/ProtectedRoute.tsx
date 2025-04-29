
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userRole');
  localStorage.removeItem('rememberedUser');
  localStorage.removeItem('verificationStatus');
  localStorage.removeItem('kybStatus');
  localStorage.removeItem('businessName');
  localStorage.removeItem('businessEmail');
  // In a real app, you might want to invalidate tokens or call a logout API
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    // Redirect to /auth if user is not authenticated
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};
