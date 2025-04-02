
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  // Check if token is expired (in a real app you might use JWT expiration)
  useEffect(() => {
    // This could check token expiration, validate with backend, etc.
  }, []);

  if (!isAuthenticated) {
    // Redirect to the login page, but save the location they were trying to go to
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
