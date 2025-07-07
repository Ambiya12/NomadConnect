import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/Login/hooks/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;