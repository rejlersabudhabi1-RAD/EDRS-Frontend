import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EdrsDashboard = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');

    // Debug function to help identify navigation issues
    const handleNavigateToMain = () => {
        try {
            console.log('Attempting navigation to main dashboard...');
            console.log('Current path:', window.location.pathname);
            console.log('Auth token exists:', !!localStorage.getItem('access_token'));
            
            // First try React Router navigation
            navigate('/dashboard');
            
            // Fallback after a short delay if React Router fails
            setTimeout(() => {
                if (window.location.pathname !== '/dashboard') {
                    console.log('React Router navigation may have failed, using window.location...');
                    window.location.href = '/dashboard';
                }
            }, 500);
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = '/dashboard';
        }
    };

    // EDRS modules data
    const edrsModules = [
        {
            id: 'pdf-to-pid',
            title: 'PFD to P&ID Conversion',
            description: 'Convert Process Flow Diagrams to Piping & Instrumentation Diagrams using AI',
            icon: 'fas fa-exchange-alt',
            color: '#3b82f6',
            path: '/edrs/pdf-to-pid',
            stats: { processed: '2,847', accuracy: '98.7%', avgTime: '2.3 min' },
            status: 'active'
        },
        {
            id: 'document-upload',
            title: 'Document Checker',
            description: 'Intelligent document processing and storage system',
            icon: 'fas fa-cloud-upload-alt',
            color: '#f59e0b',
            path: '/edrs/document-upload',
            stats: { uploaded: '5,247', storage: '2.3 TB', processed: '4,891' },
            status: 'active'
        },

        {
            id: 'ai-processing',
            title: 'AI Processing Engine',
            description: 'Core AI engine for intelligent document analysis and processing',
            icon: 'fas fa-brain',
            color: '#06b6d4',
            path: '/edrs/ai-processing',
            stats: { models: '12', accuracy: '99.1%', uptime: '99.9%' },
            status: 'active'
        },
        {
            id: 'project-management',
            title: 'Project Management',
            description: 'Comprehensive project tracking and workflow management system',
            icon: 'fas fa-project-diagram',
            color: '#ef4444',
            path: '/edrs/project-management',
            stats: { projects: '47', active: '23', completed: '24' },
            status: 'active'
        }
    ];

    // Overall system stats
    const systemStats = [
        { title: 'Total Documents', value: '12,547', change: '+12%', icon: 'fas fa-file-alt', color: '#3b82f6' },
        { title: 'Processing Accuracy', value: '98.7%', change: '+0.3%', icon: 'fas fa-bullseye', color: '#10b981' },
        { title: 'Active Projects', value: '23', change: '+5', icon: 'fas fa-project-diagram', color: '#f59e0b' },
        { title: 'System Uptime', value: '99.9%', change: '0%', icon: 'fas fa-server', color: '#8b5cf6' }
    ];

    // Recent activities
    const recentActivities = [
        { id: 1, type: 'conversion', message: 'PFD to P&ID conversion completed for Project Alpha', time: '5 min ago', status: 'success' },
        { id: 2, type: 'validation', message: 'Document validation failed for Project Beta', time: '12 min ago', status: 'error' },
        { id: 3, type: 'upload', message: '15 new documents uploaded to Project Gamma', time: '23 min ago', status: 'info' },
        { id: 4, type: 'ai', message: 'AI model retrained with 95% accuracy improvement', time: '1 hour ago', status: 'success' },
        { id: 5, type: 'project', message: 'New project Delta created with 8 team members', time: '2 hours ago', status: 'info' }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return 'fas fa-check-circle';
            case 'error': return 'fas fa-exclamation-circle';
            case 'info': return 'fas fa-info-circle';
            default: return 'fas fa-circle';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'info': return '#3b82f6';
            default: return '#6b7280';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            display: 'flex'
        }}>
            {/* Sidebar */}
            <div style={{
                width: '280px',
                background: 'white',
                borderRight: '1px solid #e5e7eb',
                padding: '2rem 1.5rem',
                height: '100vh',
                position: 'sticky',
                top: 0,
                overflowY: 'auto'
            }}>
                {/* EDRS Logo */}
                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px'
                        }}>
                            <i className="fas fa-cogs"></i>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                                EDRS
                            </h3>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                Control Hub
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav>
                    {/* Dashboard Overview */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => navigate('/edrs/dashboard')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: '#3b82f615',
                                color: '#3b82f6',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left'
                            }}
                        >
                            <i className="fas fa-tachometer-alt" style={{ width: '16px' }}></i>
                            Dashboard Overview
                        </button>
                    </div>

                    {/* EDRS Modules */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ 
                            margin: '0 0 0.75rem 0', 
                            fontSize: '12px', 
                            fontWeight: '600', 
                            color: '#6b7280', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Core Modules
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {edrsModules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => navigate(module.path)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        background: 'transparent',
                                        color: '#6b7280',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        e.currentTarget.style.color = '#1f2937';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#6b7280';
                                    }}
                                >
                                    <i className={module.icon} style={{ width: '16px', color: module.color }}></i>
                                    <span style={{ flex: 1 }}>{module.title}</span>
                                    <div style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: module.status === 'active' ? '#10b981' : '#f59e0b'
                                    }}></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ 
                            margin: '0 0 0.75rem 0', 
                            fontSize: '12px', 
                            fontWeight: '600', 
                            color: '#6b7280', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Quick Actions
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                color: '#6b7280',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left'
                            }}>
                                <i className="fas fa-plus" style={{ width: '16px', color: '#10b981' }}></i>
                                New Project
                            </button>
                            <button style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                color: '#6b7280',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left'
                            }}>
                                <i className="fas fa-upload" style={{ width: '16px', color: '#f59e0b' }}></i>
                                Bulk Upload
                            </button>
                            <button style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                color: '#6b7280',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left'
                            }}>
                                <i className="fas fa-cog" style={{ width: '16px', color: '#8b5cf6' }}></i>
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Back to Main */}
                    <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
                        <button
                            onClick={handleNavigateToMain}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)';
                            }}
                        >
                            <i className="fas fa-arrow-left" style={{ width: '16px' }}></i>
                            Main Dashboard
                        </button>
                        <button
                            onClick={() => {
                                try {
                                    window.location.href = '/dashboard';
                                } catch (error) {
                                    console.error('Fallback navigation error:', error);
                                    window.location.replace('/dashboard');
                                }
                            }}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.5rem 1rem',
                                background: 'transparent',
                                color: '#6b7280',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '400',
                                textAlign: 'left',
                                marginTop: '0.5rem'
                            }}
                        >
                            <i className="fas fa-external-link-alt" style={{ width: '12px' }}></i>
                            Force Redirect
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Breadcrumb */}
                <div style={{
                    background: '#f8fafc',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
                        <button
                            onClick={handleNavigateToMain}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#3b82f6',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '14px',
                                padding: 0
                            }}
                        >
                            Main Dashboard
                        </button>
                        <span style={{ color: '#6b7280' }}>/</span>
                        <span style={{ color: '#374151', fontWeight: '500' }}>EDRS Dashboard</span>
                    </div>
                </div>
                
                {/* Header */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>
                                EDRS Dashboard
                            </h1>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '16px' }}>
                                Engineering Document Recognition System - Central Control Hub
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handleNavigateToMain}
                                style={{
                                    background: 'white',
                                    color: '#374151',
                                    border: '2px solid #e5e7eb',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.color = '#3b82f6';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.color = '#374151';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fas fa-arrow-left"></i>
                                Back to Main
                            </button>
                            <button style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <i className="fas fa-plus"></i>
                                New Project
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                {/* System Statistics */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                        System Overview
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {systemStats.map((stat, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>
                                            {stat.value}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '0.5rem' }}>
                                            {stat.title}
                                        </div>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            color: stat.change.includes('+') ? '#10b981' : '#6b7280',
                                            fontWeight: '500'
                                        }}>
                                            {stat.change} from last month
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: `${stat.color}15`,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className={stat.icon} style={{ color: stat.color, fontSize: '20px' }}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EDRS Modules Grid */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            EDRS Modules
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['all', 'active', 'processing', 'maintenance'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        background: activeFilter === filter ? '#3b82f6' : 'transparent',
                                        color: activeFilter === filter ? 'white' : '#6b7280',
                                        border: '1px solid #d1d5db',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
                        {edrsModules.map((module) => (
                            <div key={module.id} style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                ':hover': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }
                            }}
                            onClick={() => navigate(module.path)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        background: `${module.color}15`,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <i className={module.icon} style={{ color: module.color, fontSize: '24px' }}></i>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                                            {module.title}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                                            {module.description}
                                        </p>
                                    </div>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: module.status === 'active' ? '#10b981' : '#f59e0b'
                                    }}></div>
                                </div>

                                {/* Module Stats */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {Object.entries(module.stats).map(([key, value], index) => (
                                        <div key={index} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                                                {value}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'capitalize' }}>
                                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                        Recent Activity
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivities.map((activity) => (
                            <div key={activity.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f9fafb',
                                borderRadius: '8px',
                                border: '1px solid #f3f4f6'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: `${getStatusColor(activity.status)}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className={getStatusIcon(activity.status)} style={{ 
                                        color: getStatusColor(activity.status), 
                                        fontSize: '16px' 
                                    }}></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '14px', color: '#1f2937', margin: '0 0 0.25rem 0', fontWeight: '500' }}>
                                        {activity.message}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default EdrsDashboard;