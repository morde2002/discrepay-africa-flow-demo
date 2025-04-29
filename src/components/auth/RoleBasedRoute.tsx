
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Get the user's role from localStorage
const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

// Check if the user is authenticated
const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RoleBasedRoute = ({ children, allowedRoles = [] }: RoleBasedRouteProps) => {
  const userRole = getUserRole();
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/auth" />;
  }
  
  // If there are no specified roles, allow any authenticated user
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }
  
  // Check if user's role is in the allowed roles list
  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  
  // If user doesn't have permission, redirect to unauthorized page or dashboard
  return <Navigate to="/unauthorized" />;
};
