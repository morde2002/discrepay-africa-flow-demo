
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireActive?: boolean;
}

export const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [],
  requireActive = true 
}: RoleBasedRouteProps) => {
  const { isAuthenticated, getUserRole, isAccountActive, user } = useAuth();
  const userRole = getUserRole();
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/auth" />;
  }
  
  // If there are no specified roles, check if account needs to be active
  if (allowedRoles.length === 0) {
    // If account must be active but isn't, show dashboard with status banner
    if (requireActive && !isAccountActive() && window.location.pathname !== '/') {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  }
  
  // Check if user's role is in the allowed roles list
  const hasAllowedRole = userRole && allowedRoles.includes(userRole);
  
  if (!hasAllowedRole) {
    // If user doesn't have permission, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }
  
  // If account must be active but isn't, only allow access to the dashboard
  if (requireActive && !isAccountActive() && window.location.pathname !== '/') {
    return <Navigate to="/" />;
  }
  
  // User has permission and meets all requirements
  return <>{children}</>;
};
