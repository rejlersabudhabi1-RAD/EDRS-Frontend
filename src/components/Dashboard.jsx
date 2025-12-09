import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../config/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Load user data from localStorage
        const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
        const userRole = JSON.parse(localStorage.getItem('user_role') || '{}');
        const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');

        setUser(userInfo);
        setRole(userRole);
        setProfile(userProfile);
        setLoading(false);
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await fetch(API_CONFIG.getEndpoint('LOGOUT'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear all stored data
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_info');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_profile');
            
            toast.success('Logged out successfully');
            navigate('/login');
        }
    };

    const getWelcomeMessage = () => {
        if (role?.code === 'SA') {
            return 'Super Admin Dashboard';
        } else if (role?.code === 'ENGINEER') {
            return 'Engineering Dashboard';
        } else if (role?.code === 'PM') {
            return 'Project Manager Dashboard';
        } else {
            return 'User Dashboard';
        }
    };

    const getDashboardFeatures = () => {
        const baseFeatures = [
            {
                title: 'Profile Management',
                description: 'Manage your profile information',
                icon: '👤',
                action: () => console.log('Profile clicked')
            }
        ];

        if (role?.code === 'SA') {
            return [
                ...baseFeatures,
                {
                    title: 'User Management',
                    description: 'Manage all system users and roles',
                    icon: '👥',
                    action: () => console.log('User Management clicked')
                },
                {
                    title: 'System Settings',
                    description: 'Configure system-wide settings',
                    icon: '⚙️',
                    action: () => console.log('System Settings clicked')
                },
                {
                    title: 'AI Model Configuration',
                    description: 'Configure AI models and parameters',
                    icon: '🤖',
                    action: () => console.log('AI Config clicked')
                },
                {
                    title: 'Drawing Analysis',
                    description: 'AI-powered drawing analysis tools',
                    icon: '📐',
                    action: () => console.log('Drawing Analysis clicked')
                },
                {
                    title: 'Simulation Management',
                    description: 'Manage engineering simulations',
                    icon: '🔬',
                    action: () => console.log('Simulation Management clicked')
                },
                {
                    title: 'Reports & Analytics',
                    description: 'System-wide reports and analytics',
                    icon: '📊',
                    action: () => console.log('Reports clicked')
                },
                {
                    title: 'EDRS Platform',
                    description: 'Engineering Data & Review System',
                    icon: '⚡',
                    action: () => navigate('/edrs/dashboard')
                }
            ];
        } else if (role?.code === 'ENGINEER') {
            return [
                ...baseFeatures,
                {
                    title: 'Drawing Analysis',
                    description: 'Upload and analyze engineering drawings',
                    icon: '📐',
                    action: () => console.log('Drawing Analysis clicked')
                },
                {
                    title: 'My Simulations',
                    description: 'View and manage your simulations',
                    icon: '🔬',
                    action: () => console.log('My Simulations clicked')
                },
                {
                    title: 'Project Documents',
                    description: 'Access project-related documents',
                    icon: '📄',
                    action: () => console.log('Documents clicked')
                },
                {
                    title: 'EDRS Tools',
                    description: 'Engineering Data & Review System',
                    icon: '⚡',
                    action: () => navigate('/edrs/dashboard')
                }
            ];
        } else if (role?.code === 'PM') {
            return [
                ...baseFeatures,
                {
                    title: 'Project Overview',
                    description: 'Monitor all project activities',
                    icon: '📋',
                    action: () => console.log('Project Overview clicked')
                },
                {
                    title: 'Team Management',
                    description: 'Manage project team members',
                    icon: '👥',
                    action: () => console.log('Team Management clicked')
                },
                {
                    title: 'Progress Reports',
                    description: 'Generate project progress reports',
                    icon: '📈',
                    action: () => console.log('Progress Reports clicked')
                },
                {
                    title: 'EDRS System',
                    description: 'Engineering Data & Review System',
                    icon: '⚡',
                    action: () => navigate('/edrs/dashboard')
                }
            ];
        }

        return baseFeatures;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {getWelcomeMessage()}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <p className="text-sm text-gray-500">{role?.description}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome back, {user?.first_name}!
                        </h2>
                        <p className="text-gray-600">
                            Rejlers AI-Powered ERP System for Oil & Gas Engineering
                        </p>
                    </div>

                    {/* User Info Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-sm text-gray-900">{user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Role</p>
                                    <p className="text-sm text-gray-900">{role?.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Experience Level</p>
                                    <p className="text-sm text-gray-900">{profile?.experience_level || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Specialization</p>
                                    <p className="text-sm text-gray-900">{profile?.specialization || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Company</p>
                                    <p className="text-sm text-gray-900">{profile?.company || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                                    <p className="text-sm text-gray-900">
                                        {new Date(user?.date_joined).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getDashboardFeatures().map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={feature.action}
                            >
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-3xl">{feature.icon}</span>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;