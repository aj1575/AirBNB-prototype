import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
        // Not logged in, redirect to appropriate login page
        return <Navigate to={requiredRole === 'owner' ? '/owner/login' : '/traveler/login'} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Wrong role, redirect to their own dashboard
        return <Navigate to={user.role === 'owner' ? '/owner/dashboard' : '/traveler/dashboard'} replace />;
    }

    return children;
};

export default ProtectedRoute;
