
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Enhanced auth check - can be extended for token validation, etc.
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userRole');
  localStorage.removeItem('rememberedUser');
  // In a real app, you might want to invalidate tokens or call a logout API
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!isAuthenticated()) {
    // Redirect to /auth if user is not authenticated
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};
