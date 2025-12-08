import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModernDashboard = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Load user data
        const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
        const userRole = JSON.parse(localStorage.getItem('user_role') || '{}');
        
        setUser(userInfo);
        setRole(userRole);
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_profile');
        toast.success('Logged out successfully');
        navigate('/login');
    };



    // Dashboard sections with EDRS Platform
    const dashboardSections = {
        overview: {
            title: 'Dashboard Overview',
            icon: 'fas fa-home',
            color: '#3b82f6'
        },
        edrs: {
            title: 'EDRS Platform',
            icon: 'fas fa-cogs',
            color: '#10b981',
            description: 'Engineering Document Recognition System - AI-powered document processing platform',
            subsections: [
                { id: 'ai-dashboard', title: 'AI Dashboard', path: '/ai-dashboard', description: 'Real-time AI service monitoring and OpenAI integration status' },
                { id: 'pdf-to-pid', title: 'PFD to P&ID', path: '/pdf-to-pid', description: 'Convert Process Flow Diagrams (PFD) to intelligent P&ID diagrams with GPT-4 Vision' },
                { id: 'document-upload', title: 'Document Upload', path: '/document-upload', description: 'AI-powered document classification and processing' },
                { id: 'document-validation', title: 'Document Validation', path: '/document-validation', description: 'Comprehensive AI validation of engineering documents' }
            ]
        },
        csr: {
            title: 'CRS Platform',
            icon: 'fas fa-leaf',
            color: '#059669',
            description: 'Corporate Responsibility Solutions Platform',
            subsections: []
        },
        management: {
            title: 'Super Admin Control Center',
            icon: 'fas fa-crown',
            color: '#f59e0b',
            description: 'AI-Powered System Administration & User Management',
            subsections: [
                { 
                    id: 'user-management', 
                    title: 'AI User Management', 
                    path: '/admin-panel/users',
                    description: 'Comprehensive user control with AI insights and role-based access management'
                },
                { 
                    id: 'real-time-monitoring', 
                    title: 'Live System Monitor', 
                    path: '/admin-panel/activity',
                    description: 'Real-time user activity tracking and AI-powered anomaly detection'
                },
                { 
                    id: 'ai-insights', 
                    title: 'AI System Analytics', 
                    path: '/admin-panel/analytics',
                    description: 'Machine learning insights for system optimization and user behavior analysis'
                },
                { 
                    id: 'security-center', 
                    title: 'AI Security Center', 
                    path: '/admin-panel/security',
                    description: 'Advanced threat detection and automated security response systems'
                },
                { 
                    id: 'resource-optimizer', 
                    title: 'Resource AI Optimizer', 
                    path: '/admin-panel/resources',
                    description: 'AI-driven resource allocation and performance optimization'
                },
                { 
                    id: 'project-intelligence', 
                    title: 'Project AI Intelligence', 
                    path: '/admin-panel/projects',
                    description: 'Intelligent project management with predictive analytics and automation'
                }
            ]
        },
        system: {
            title: 'System',
            icon: 'fas fa-cog',
            color: '#8b5cf6',
            subsections: [
                { id: 'settings', title: 'Settings', action: () => console.log('Settings') },
                { id: 'security', title: 'Security', action: () => console.log('Security') },
                { id: 'logs', title: 'System Logs', action: () => console.log('Logs') }
            ]
        }
    };





    // Document Upload functionality
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);

    const handleFileUpload = (files) => {
        const newFiles = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'Processing',
            progress: Math.floor(Math.random() * 100)
        }));
        setUploadedFiles([...uploadedFiles, ...newFiles]);
        toast.success(`${files.length} file(s) uploaded successfully`);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    // Document Upload data
    const documentUploadModule = {
        id: 'document-upload',
        title: 'Document Upload',
        description: 'Intelligent document processing and storage system with AI-powered classification',
        icon: 'fas fa-cloud-upload-alt',
        color: '#f59e0b',
        path: '/edrs/document-upload',
        stats: {
            uploaded: '5,247',
            storage: '2.3 TB',
            processed: '4,891',
            avgSpeed: '0.8 sec'
        },
        status: 'active'
    };

    // Document Upload statistics
    const uploadStats = [
        { title: 'Files Uploaded Today', value: '487', change: '+23%', icon: 'fas fa-file', color: '#f59e0b' },
        { title: 'Total Storage', value: '2.3 TB', change: '+15%', icon: 'fas fa-hdd', color: '#10b981' },
        { title: 'Avg Upload Speed', value: '0.8 sec', change: '-18%', icon: 'fas fa-bolt', color: '#3b82f6' },
        { title: 'Security Score', value: '99.9%', change: '+0.1%', icon: 'fas fa-shield-alt', color: '#06b6d4' }
    ];

    // Document Upload activities
    const uploadActivities = [
        { id: 1, type: 'upload', message: 'Bulk upload completed: 25 engineering drawings processed', time: '3 min ago', status: 'success' },
        { id: 2, type: 'processing', message: 'AI classification completed for Project Charlie documents', time: '8 min ago', status: 'success' },
        { id: 3, type: 'storage', message: 'Document archived to secure storage - compliance maintained', time: '15 min ago', status: 'info' },
        { id: 4, type: 'validation', message: 'File format validation completed for 12 CAD files', time: '32 min ago', status: 'success' },
        { id: 5, type: 'security', message: 'Security scan completed - no threats detected', time: '1 hour ago', status: 'success' }
    ];

    // General system statistics
    const quickStats = [
        { title: 'Active Projects', value: '24', change: '+12%', color: '#10b981', icon: 'fas fa-project-diagram' },
        { title: 'Total Users', value: '156', change: '+8%', color: '#3b82f6', icon: 'fas fa-users' },
        { title: 'System Uptime', value: '99.8%', change: '+0.1%', color: '#ef4444', icon: 'fas fa-server' },
        { title: 'Performance', value: '98.5%', change: '+2%', color: '#f59e0b', icon: 'fas fa-tachometer-alt' }
    ];

    // General system activities
    const recentActivities = [
        { id: 1, type: 'system', message: 'System backup completed successfully', time: '5 min ago', status: 'success' },
        { id: 2, type: 'user', message: 'New user account created for Engineering team', time: '12 min ago', status: 'info' },
        { id: 3, type: 'project', message: 'Project Alpha milestone reached - 85% completion', time: '23 min ago', status: 'success' },
        { id: 4, type: 'security', message: 'Security audit completed with no issues found', time: '1 hour ago', status: 'success' },
        { id: 5, type: 'maintenance', message: 'Scheduled maintenance completed - system optimized', time: '2 hours ago', status: 'info' }
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="modern-dashboard">
            <style>{`
                .modern-dashboard {
                    display: flex;
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .modern-sidebar {
                    width: ${sidebarCollapsed ? '80px' : '280px'};
                    background: white;
                    border-right: 1px solid #e5e7eb;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }

                .sidebar-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #f3f4f6;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .company-logo {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                }

                .company-name {
                    font-weight: 700;
                    font-size: 18px;
                    color: #1f2937;
                    margin: 0;
                }

                .company-tagline {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0;
                }

                .sidebar-nav {
                    flex: 1;
                    padding: 1rem 0;
                }

                .nav-section {
                    margin-bottom: 0.5rem;
                }

                .nav-item {
                    margin: 0 1rem 0.25rem 1rem;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    color: #4b5563;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                    font-weight: 500;
                    font-size: 14px;
                    position: relative;
                }

                .nav-link:hover {
                    background: #f3f4f6;
                    color: #1f2937;
                }

                .nav-link.active {
                    background: #eff6ff;
                    color: #2563eb;
                }

                .nav-link.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3px;
                    height: 20px;
                    background: #2563eb;
                    border-radius: 0 2px 2px 0;
                }

                .nav-icon {
                    width: 20px;
                    margin-right: 12px;
                    text-align: center;
                }

                .nav-chevron {
                    margin-left: auto;
                    font-size: 12px;
                    transition: transform 0.2s ease;
                }

                .nav-chevron.expanded {
                    transform: rotate(180deg);
                }

                .sub-nav {
                    margin-left: 32px;
                    margin-top: 0.5rem;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .sub-nav-item {
                    padding: 0.5rem 1rem;
                    color: #6b7280;
                    text-decoration: none;
                    display: block;
                    border-radius: 6px;
                    margin-bottom: 0.25rem;
                    font-size: 13px;
                    transition: all 0.2s ease;
                }

                .sub-nav-item:hover {
                    background: #f9fafb;
                    color: #374151;
                }

                .sidebar-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid #f3f4f6;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-avatar {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                }

                .user-info h6 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #1f2937;
                }

                .user-info small {
                    color: #6b7280;
                    font-size: 12px;
                }

                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .main-header {
                    background: white;
                    padding: 1rem 2rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .header-title {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .sidebar-toggle {
                    background: none;
                    border: none;
                    color: #6b7280;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                }

                .sidebar-toggle:hover {
                    background: #f3f4f6;
                    color: #374151;
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logout-btn {
                    background: #ef4444;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .logout-btn:hover {
                    background: #dc2626;
                }

                .content-area {
                    flex: 1;
                    padding: 2rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                }

                .stat-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .stat-title {
                    font-size: 14px;
                    font-weight: 500;
                    color: #6b7280;
                    margin: 0;
                }

                .stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    color: white;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0 0 0.5rem 0;
                }

                .stat-change {
                    font-size: 12px;
                    font-weight: 500;
                }

                .stat-change.positive {
                    color: #10b981;
                }

                .welcome-section {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .welcome-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                }

                .welcome-subtitle {
                    color: #6b7280;
                    font-size: 16px;
                    margin-bottom: 2rem;
                }

                .quick-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .quick-action-btn {
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 500;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s ease;
                }

                .quick-action-btn:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
                }

                .collapsed .nav-text,
                .collapsed .company-name,
                .collapsed .company-tagline,
                .collapsed .nav-chevron {
                    display: none;
                }

                .collapsed .nav-link {
                    justify-content: center;
                    padding: 0.75rem;
                }

                .collapsed .sidebar-footer {
                    padding: 1rem 0.5rem;
                }

                .collapsed .user-info {
                    display: none;
                }

                /* EDRS Platform & General Section Styles */
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                .section-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 0 0 0.5rem 0;
                    display: flex;
                    align-items: center;
                }

                .section-subtitle {
                    color: #6b7280;
                    font-size: 16px;
                    margin: 0;
                }

                .section-actions {
                    display: flex;
                    gap: 1rem;
                }

                .btn-primary {
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-primary:hover {
                    background: #059669;
                    transform: translateY(-1px);
                }

                .modules-section {
                    margin-bottom: 3rem;
                }

                .modules-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0 0 1.5rem 0;
                }

                .modules-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 1.5rem;
                }

                .module-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid #e5e7eb;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .module-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border-color: #10b981;
                }

                .module-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .module-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 20px;
                }

                .module-status {
                    display: flex;
                    align-items: center;
                }

                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    background: #dcfce7;
                    color: #166534;
                }

                .module-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0 0 0.5rem 0;
                }

                .module-description {
                    color: #6b7280;
                    font-size: 14px;
                    margin: 0 0 1rem 0;
                    line-height: 1.5;
                }

                .module-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f9fafb;
                    border-radius: 8px;
                }

                .module-stat {
                    text-align: center;
                }

                .stat-label {
                    display: block;
                    font-size: 12px;
                    color: #6b7280;
                    margin-bottom: 0.25rem;
                }

                .module-stat .stat-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1f2937;
                }

                .module-action {
                    display: flex;
                    justify-content: center;
                }

                .module-btn {
                    background: #f3f4f6;
                    color: #374151;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 100%;
                    justify-content: center;
                }

                .module-btn:hover {
                    background: #e5e7eb;
                }

                .activities-section {
                    margin-bottom: 2rem;
                }

                .activities-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #1f2937;
                    margin: 0 0 1.5rem 0;
                }

                .activities-list {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    overflow: hidden;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f3f4f6;
                }

                .activity-item:last-child {
                    border-bottom: none;
                }

                .activity-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    color: white;
                    font-size: 16px;
                }

                .activity-icon.success {
                    background: #10b981;
                }

                .activity-icon.info {
                    background: #3b82f6;
                }

                .activity-icon.error {
                    background: #ef4444;
                }

                .activity-content {
                    flex: 1;
                }

                .activity-message {
                    color: #1f2937;
                    font-size: 14px;
                    margin: 0 0 0.25rem 0;
                    line-height: 1.4;
                }

                .activity-time {
                    color: #6b7280;
                    font-size: 12px;
                }



                @media (max-width: 768px) {
                    .modern-sidebar {
                        position: fixed;
                        left: ${sidebarCollapsed ? '-280px' : '0'};
                        z-index: 1000;
                        width: 280px;
                    }

                    .main-content {
                        margin-left: 0;
                    }

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .quick-actions {
                        flex-direction: column;
                        width: 100%;
                    }

                    .quick-action-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .modules-grid {
                        grid-template-columns: 1fr;
                    }

                    .module-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .section-actions {
                        width: 100%;
                        justify-content: flex-start;
                    }

                    .btn-primary {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            {/* Sidebar */}
            <div className={`modern-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="company-logo">
                        <i className="fas fa-oil-well"></i>
                    </div>
                    <div>
                        <h3 className="company-name">Rejlers</h3>
                        <p className="company-tagline">Engineering Excellence</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {Object.entries(dashboardSections).map(([key, section]) => (
                        <div key={key} className="nav-section">
                            <div className="nav-item">
                                <a
                                    href="#"
                                    className={`nav-link ${activeSection === key ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveSection(activeSection === key ? '' : key);
                                    }}
                                >
                                    <i className={`nav-icon ${section.icon}`} style={{ color: section.color }}></i>
                                    <span className="nav-text">{section.title}</span>
                                    {section.subsections && (
                                        <i className={`fas fa-chevron-down nav-chevron ${activeSection === key ? 'expanded' : ''}`}></i>
                                    )}
                                </a>
                            </div>

                            {section.subsections && activeSection === key && (
                                <div className="sub-nav">
                                    {section.subsections.map((sub) => (
                                        <a
                                            key={sub.id}
                                            href="#"
                                            className="sub-nav-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (sub.path) {
                                                    navigate(sub.path);
                                                } else if (sub.action) {
                                                    sub.action();
                                                }
                                            }}
                                        >
                                            {sub.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">
                            {user?.first_name?.charAt(0) || 'U'}
                        </div>
                        <div className="user-info">
                            <h6>{user?.first_name} {user?.last_name}</h6>
                            <small>{role?.description || 'User'}</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="main-header">
                    <div className="header-title">
                        <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                            <i className={`fas ${sidebarCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
                        </button>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
                                {dashboardSections[activeSection]?.title || 'Dashboard'}
                            </h1>
                            <small style={{ color: '#6b7280' }}>Oil & Gas Engineering ERP System</small>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="logout-btn" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Logout
                        </button>
                    </div>
                </header>

                <div className="content-area">
                    {activeSection === 'overview' ? (
                        <>
                            <div className="welcome-section">
                                <h2 className="welcome-title">Welcome back, {user?.first_name}!</h2>
                                <p className="welcome-subtitle">
                                    Rejlers AI-Powered ERP System for Oil & Gas Engineering
                                </p>
                                <div className="quick-actions">
                                    <button className="quick-action-btn" onClick={() => setActiveSection('edrs')}>
                                        <i className="fas fa-cogs"></i>
                                        Launch EDRS Platform
                                    </button>
                                    <button className="quick-action-btn" onClick={() => setActiveSection('management')}>
                                        <i className="fas fa-users"></i>
                                        User Management
                                    </button>
                                    <button className="quick-action-btn" onClick={() => setActiveSection('csr')}>
                                        <i className="fas fa-leaf"></i>
                                        CRS Platform
                                    </button>
                                </div>
                            </div>

                            <div className="stats-grid">
                                {quickStats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-header">
                                            <h3 className="stat-title">{stat.title}</h3>
                                            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                                                <i className={stat.icon || 'fas fa-chart-line'}></i>
                                            </div>
                                        </div>
                                        <p className="stat-value">{stat.value}</p>
                                        <span className="stat-change positive">{stat.change} from last month</span>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activities */}
                            <div className="activities-section">
                                <h3 className="activities-title">Recent System Activities</h3>
                                <div className="activities-list">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="activity-item">
                                            <div className={`activity-icon ${activity.status}`}>
                                                <i className={
                                                    activity.type === 'system' ? 'fas fa-server' :
                                                    activity.type === 'user' ? 'fas fa-user' :
                                                    activity.type === 'project' ? 'fas fa-project-diagram' :
                                                    activity.type === 'security' ? 'fas fa-shield-alt' : 'fas fa-cog'
                                                }></i>
                                            </div>
                                            <div className="activity-content">
                                                <p className="activity-message">{activity.message}</p>
                                                <span className="activity-time">{activity.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : activeSection === 'edrs' ? (
                        <>
                            {/* Document Upload Module */}
                            <div className="section-header">
                                <div>
                                    <h2 className="section-title">
                                        <i className="fas fa-cloud-upload-alt" style={{ color: '#f59e0b', marginRight: '1rem' }}></i>
                                        Document Upload - EDRS Platform
                                    </h2>
                                    <p className="section-subtitle">
                                        Intelligent document processing and storage system with AI-powered classification and security
                                    </p>
                                </div>
                            </div>

                            {/* Upload Statistics */}
                            <div className="stats-grid">
                                {uploadStats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-header">
                                            <h3 className="stat-title">{stat.title}</h3>
                                            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                                                <i className={stat.icon}></i>
                                            </div>
                                        </div>
                                        <p className="stat-value">{stat.value}</p>
                                        <span className="stat-change positive">{stat.change} improvement</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Upload Interface */}
                            <div className="modules-section">
                                <h3 className="modules-title">Quick Document Upload</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                    {/* Upload Zone */}
                                    <div style={{
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Upload Documents</h4>
                                        <div 
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            style={{
                                                border: `2px dashed ${dragOver ? '#f59e0b' : '#d1d5db'}`,
                                                borderRadius: '8px',
                                                padding: '2rem',
                                                textAlign: 'center',
                                                background: dragOver ? '#fef3c7' : '#f9fafb',
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <i className="fas fa-cloud-upload-alt" style={{ 
                                                fontSize: '2rem', 
                                                color: dragOver ? '#f59e0b' : '#6b7280', 
                                                marginBottom: '1rem' 
                                            }}></i>
                                            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
                                                Drag & drop files here or click to browse
                                            </p>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={(e) => handleFileUpload(e.target.files)}
                                                style={{ display: 'none' }}
                                                id="upload-input"
                                            />
                                            <label htmlFor="upload-input" style={{
                                                display: 'inline-block',
                                                background: '#f59e0b',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}>
                                                Choose Files
                                            </label>
                                        </div>
                                    </div>

                                    {/* Upload Progress */}
                                    <div style={{
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Upload Progress</h4>
                                        {uploadedFiles.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>
                                                <i className="fas fa-file-upload" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                                                <p>No files uploaded yet</p>
                                            </div>
                                        ) : (
                                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                {uploadedFiles.map((file) => (
                                                    <div key={file.id} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.75rem',
                                                        background: '#f9fafb',
                                                        borderRadius: '6px',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        <i className="fas fa-file" style={{ color: '#f59e0b', fontSize: '14px' }}></i>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: '12px', fontWeight: '500', color: '#1f2937' }}>{file.name}</div>
                                                            <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                                                {(file.size / 1024 / 1024).toFixed(1)}MB • {file.status}
                                                            </div>
                                                        </div>
                                                        <div style={{ fontSize: '10px', color: '#059669', fontWeight: '500' }}>
                                                            {file.progress}%
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Upload Features */}
                            <div style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 1.5rem 0' }}>Upload Features</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    <div style={{
                                        background: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                            <i className="fas fa-brain" style={{ color: '#8b5cf6', fontSize: '24px', marginRight: '0.75rem' }}></i>
                                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>AI Classification</h4>
                                        </div>
                                        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 1rem 0' }}>Automatic document type detection and intelligent categorization</p>
                                        <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '500' }}>✓ 15 Document Types</div>
                                    </div>
                                    
                                    <div style={{
                                        background: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                            <i className="fas fa-shield-alt" style={{ color: '#10b981', fontSize: '24px', marginRight: '0.75rem' }}></i>
                                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Secure Storage</h4>
                                        </div>
                                        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 1rem 0' }}>Enterprise-grade encryption and compliance-ready storage</p>
                                        <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>✓ AES-256 Encryption</div>
                                    </div>

                                    <div style={{
                                        background: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                            <i className="fas fa-bolt" style={{ color: '#f59e0b', fontSize: '24px', marginRight: '0.75rem' }}></i>
                                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Fast Processing</h4>
                                        </div>
                                        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 1rem 0' }}>High-speed upload and processing with real-time progress tracking</p>
                                        <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '500' }}>✓ Parallel Processing</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Upload Activities */}
                            <div className="activities-section">
                                <h3 className="activities-title">Recent Upload Activities</h3>
                                <div className="activities-list">
                                    {uploadActivities.map((activity) => (
                                        <div key={activity.id} className="activity-item">
                                            <div className={`activity-icon ${activity.status}`}>
                                                <i className={
                                                    activity.type === 'upload' ? 'fas fa-cloud-upload-alt' :
                                                    activity.type === 'processing' ? 'fas fa-cogs' :
                                                    activity.type === 'storage' ? 'fas fa-archive' :
                                                    activity.type === 'validation' ? 'fas fa-check-circle' : 'fas fa-shield-alt'
                                                }></i>
                                            </div>
                                            <div className="activity-content">
                                                <p className="activity-message">{activity.message}</p>
                                                <span className="activity-time">{activity.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : activeSection === 'csr' ? (
                        <div className="csr-section">
                            <div className="section-header">
                                <div>
                                    <h2 className="section-title">
                                        <i className="fas fa-leaf" style={{ color: '#059669', marginRight: '1rem' }}></i>
                                        CRS Platform - Corporate Responsibility Solutions
                                    </h2>
                                    <p className="section-subtitle">
                                        Corporate Social Responsibility platform - Features coming soon
                                    </p>
                                </div>
                            </div>
                            <div className="coming-soon-container" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '300px',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <i className="fas fa-leaf" style={{ fontSize: '48px', color: '#059669', opacity: '0.7' }}></i>
                                <h3 style={{ color: '#374151', margin: 0 }}>CRS Platform</h3>
                                <p style={{ color: '#6b7280', margin: 0, textAlign: 'center' }}>
                                    Corporate Social Responsibility features are under development.<br/>
                                    This section will include sustainability tracking, ESG reporting, and compliance management.
                                </p>
                            </div>
                        </div>
                    ) : activeSection === 'management' ? (
                        <div className="management-section">
                            <div className="section-header">
                                <div>
                                    <h2 className="section-title">
                                        <i className="fas fa-crown" style={{ color: '#f59e0b', marginRight: '1rem' }}></i>
                                        Super Admin Control Center - AI-Powered Management
                                    </h2>
                                    <p className="section-subtitle">
                                        Comprehensive system administration with AI insights, real-time monitoring, and intelligent automation
                                    </p>
                                </div>
                            </div>
                            <div className="management-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '2rem',
                                marginTop: '2rem'
                            }}>
                                {dashboardSections.management.subsections.map((subsection, index) => (
                                    <div key={index} 
                                         className="management-card" 
                                         onClick={() => navigate(subsection.path)}
                                         style={{
                                             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                             padding: '2rem',
                                             borderRadius: '16px',
                                             border: '1px solid #e5e7eb',
                                             cursor: 'pointer',
                                             transition: 'all 0.3s ease',
                                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                                             position: 'relative',
                                             overflow: 'hidden'
                                         }}
                                         onMouseEnter={(e) => {
                                             e.currentTarget.style.transform = 'translateY(-8px)';
                                             e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.15)';
                                             e.currentTarget.style.borderColor = '#f59e0b';
                                         }}
                                         onMouseLeave={(e) => {
                                             e.currentTarget.style.transform = 'translateY(0)';
                                             e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                                             e.currentTarget.style.borderColor = '#e5e7eb';
                                         }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-50%',
                                            right: '-50%',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.03) 0%, rgba(245, 158, 11, 0.08) 100%)',
                                            transform: 'rotate(12deg)',
                                            zIndex: 0
                                        }}></div>
                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '1rem'
                                            }}>
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                                    color: 'white',
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: '1rem',
                                                    fontSize: '1.2rem',
                                                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                                }}>
                                                    {index === 0 && <i className="fas fa-users-cog"></i>}
                                                    {index === 1 && <i className="fas fa-radar"></i>}
                                                    {index === 2 && <i className="fas fa-brain"></i>}
                                                    {index === 3 && <i className="fas fa-shield-alt"></i>}
                                                    {index === 4 && <i className="fas fa-microchip"></i>}
                                                    {index === 5 && <i className="fas fa-project-diagram"></i>}
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, color: '#1f2937', fontSize: '1.1rem', fontWeight: '600' }}>
                                                        {subsection.title}
                                                    </h4>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        marginTop: '0.25rem'
                                                    }}>
                                                        <span style={{
                                                            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '600',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        }}>AI-POWERED</span>
                                                        <div style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            background: '#10b981',
                                                            animation: 'pulse 2s infinite'
                                                        }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p style={{
                                                color: '#6b7280',
                                                fontSize: '0.9rem',
                                                lineHeight: '1.5',
                                                margin: 0
                                            }}>
                                                {subsection.description}
                                            </p>
                                            <div style={{
                                                marginTop: '1.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '0.5rem'
                                                }}>
                                                    <span style={{
                                                        background: '#f3f4f6',
                                                        color: '#374151',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}>Super Admin</span>
                                                    <span style={{
                                                        background: '#ecfccb',
                                                        color: '#365314',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}>Real-time</span>
                                                </div>
                                                <i className="fas fa-arrow-right" style={{
                                                    color: '#f59e0b',
                                                    fontSize: '1rem',
                                                    transition: 'transform 0.3s ease'
                                                }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Quick Stats Dashboard */}
                            <div style={{
                                marginTop: '3rem',
                                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                                padding: '2rem',
                                borderRadius: '16px',
                                color: 'white'
                            }}>
                                <h3 style={{
                                    margin: '0 0 1.5rem 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <i className="fas fa-tachometer-alt" style={{ color: '#f59e0b' }}></i>
                                    Real-time System Overview
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {[
                                        { label: 'Active Users', value: '47', icon: 'users', color: '#10b981' },
                                        { label: 'System Load', value: '23%', icon: 'server', color: '#3b82f6' },
                                        { label: 'AI Processing', value: '6 tasks', icon: 'brain', color: '#8b5cf6' },
                                        { label: 'Security Status', value: 'Secure', icon: 'shield-alt', color: '#10b981' },
                                        { label: 'Storage Used', value: '2.3TB', icon: 'hdd', color: '#f59e0b' },
                                        { label: 'Response Time', value: '0.2s', icon: 'clock', color: '#06b6d4' }
                                    ].map((stat, index) => (
                                        <div key={index} style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '1.25rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{
                                                background: stat.color,
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 0.75rem',
                                                fontSize: '1rem'
                                            }}>
                                                <i className={`fas fa-${stat.icon}`}></i>
                                            </div>
                                            <div style={{
                                                fontSize: '1.5rem',
                                                fontWeight: '700',
                                                marginBottom: '0.25rem'
                                            }}>{stat.value}</div>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                color: 'rgba(255, 255, 255, 0.7)'
                                            }}>{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                            <i className={`${dashboardSections[activeSection]?.icon} mb-3`} style={{ fontSize: '48px', color: dashboardSections[activeSection]?.color }}></i>
                            <h3>Coming Soon</h3>
                            <p>This section is under development. Use the EDRS platform for document processing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernDashboard;