import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const token = localStorage.getItem('access_token');
    const userRole = JSON.parse(localStorage.getItem('user_role') || '{}');

    // Check if user is authenticated
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check if specific role is required
    if (requiredRole) {
        // Handle role matching (case insensitive and both underscore/no underscore)
        const userRoleCode = userRole.code || '';
        const normalizedUserRole = userRoleCode.toUpperCase().replace(/_/g, '');
        const normalizedRequiredRole = requiredRole.toUpperCase().replace(/_/g, '');
        
        // Also check for exact matches and common variations
        const roleMatches = userRoleCode === requiredRole || 
                          userRoleCode.toUpperCase() === requiredRole.toUpperCase() ||
                          normalizedUserRole === normalizedRequiredRole ||
                          (requiredRole === 'super_admin' && (userRoleCode === 'SUPER_ADMIN' || userRoleCode === 'SA'));
        
        if (!roleMatches) {
            return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-600">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Access Denied
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        You don't have permission to access this page.
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={() => window.history.back()}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
        }
    }

    return children;
};

export default ProtectedRoute;