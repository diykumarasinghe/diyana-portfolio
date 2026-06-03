import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Prevents unauthorized users from reaching the Admin Dashboard.
 */
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if token exists
  return children;
};

export default ProtectedRoute;
