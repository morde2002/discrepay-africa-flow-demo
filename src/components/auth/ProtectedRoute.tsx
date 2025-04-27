
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Mock auth check - replace with your actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!isAuthenticated()) {
    // Redirect to /auth if user is not authenticated
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};
