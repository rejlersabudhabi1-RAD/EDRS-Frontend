import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const SuperAdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeModule, setActiveModule] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(new Set());
    const [notifications, setNotifications] = useState([]);
    const [systemStats, setSystemStats] = useState({
        totalProjects: 0,
        activeUsers: 47,
        systemLoad: 23,
        storageUsed: 2.3,
        aiTasks: 6,
        securityStatus: 'Secure',
        responseTime: 0.2
    });
    const [error, setError] = useState(null);
    
    // User Creation Modal State
    const [showUserModal, setShowUserModal] = useState(false);
    const [availableFeatures, setAvailableFeatures] = useState([]);
    const [loadingFeatures, setLoadingFeatures] = useState(false);
    const [newUserData, setNewUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        role: 'engineer',
        department: '',
        position: '',
        is_active: true,
        features: [],
        storage_quota_gb: 5.0
    });
    const [aiInsights, setAiInsights] = useState({
        userBehaviorAnalysis: 'Normal patterns detected',
        systemOptimizations: 3,
        securityThreats: 0,
        performanceScore: 94,
        recommendedActions: ['Update user permissions for 3 inactive accounts', 'Optimize storage allocation', 'Schedule system maintenance']
    });
    const [realTimeUsers, setRealTimeUsers] = useState([
        { id: 1, name: 'John Doe', role: 'Engineer', status: 'Active', currentPage: '/documents', lastActivity: '2 mins ago' },
        { id: 2, name: 'Jane Smith', role: 'Admin', status: 'Active', currentPage: '/validation-dashboard', lastActivity: '5 mins ago' },
        { id: 3, name: 'Mike Johnson', role: 'Engineer', status: 'Idle', currentPage: '/pdf-to-pid', lastActivity: '15 mins ago' }
    ]);
    const navigate = useNavigate();
    
    // User Management Functions
    const fetchAvailableFeatures = async () => {
        setLoadingFeatures(true);
        try {
            const response = await fetch('http://localhost:8000/ai-erp/api/users/features/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setAvailableFeatures(data.features || []);
            } else {
                console.error('Failed to fetch features');
                toast.error('Failed to load available features');
            }
        } catch (error) {
            console.error('Error fetching features:', error);
            toast.error('Error loading features');
        } finally {
            setLoadingFeatures(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!newUserData.first_name || !newUserData.last_name || !newUserData.email) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        if (newUserData.features.length === 0) {
            toast.error('Please select at least one feature permission');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:8000/ai-erp/api/users/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });
            
            if (response.ok) {
                const result = await response.json();
                toast.success(`User ${result.user.first_name} ${result.user.last_name} created successfully!`);
                setShowUserModal(false);
                setNewUserData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    role: 'engineer',
                    department: '',
                    position: '',
                    is_active: true,
                    features: [],
                    storage_quota_gb: 5.0
                });
                // Refresh user list or update state as needed
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Network error occurred');
        }
    };

    const handleFeatureToggle = (featureCode) => {
        setNewUserData(prev => ({
            ...prev,
            features: prev.features.includes(featureCode)
                ? prev.features.filter(code => code !== featureCode)
                : [...prev.features, featureCode]
        }));
    };

    const openUserCreationModal = () => {
        try {
            console.log('Opening user creation modal...');
            console.log('Current showUserModal state:', showUserModal);
            setShowUserModal(true);
            console.log('Modal state set to true, fetching features...');
            fetchAvailableFeatures();
        } catch (error) {
            console.error('Error opening modal:', error);
            alert('Error opening user creation modal');
        }
    };

    const closeUserCreationModal = () => {
        console.log('Closing user creation modal...');
        setShowUserModal(false);
        // Reset form data
        setNewUserData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            role: 'engineer',
            department: '',
            position: '',
            is_active: true,
            features: [],
            storage_quota_gb: 5.0
        });
        setAvailableFeatures([]);
        setLoadingFeatures(false);
    };
    
    // Detect current module from URL
    const location = window.location.pathname;
    
    useEffect(() => {
        if (location.includes('/users')) setActiveModule('users');
        else if (location.includes('/activity')) setActiveModule('activity');
        else if (location.includes('/analytics')) setActiveModule('analytics');
        else if (location.includes('/security')) setActiveModule('security');
        else if (location.includes('/resources')) setActiveModule('resources');
        else if (location.includes('/projects')) setActiveModule('projects');
        else setActiveModule('overview');
    }, [location]);

    // Error boundary to catch any rendering errors
    const handleError = (error) => {
        console.error('Dashboard Error:', error);
        setError(error.message);
    };

    // Toggle expandable menu function
    const toggleExpandableMenu = (menuId) => {
        setExpandedMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    // Comprehensive EDRS Features migrated from PID system
    const edrsFeatures = {
        pfdToPid: {
            title: 'PFD to P&ID Conversion',
            description: 'AI-powered conversion from Process Flow Diagrams to detailed P&IDs with instrumentation',
            icon: 'fas fa-exchange-alt',
            status: 'active',
            processedDrawings: 1247,
            accuracy: 97.3,
            processingModes: ['Standard', 'Advanced', 'Engineering', 'Oil & Gas Specialized'],
            features: [
                'Process Flow Enhancement',
                'Instrumentation & Controls Addition',
                'Piping & Valve Details Generation',
                'Safety & Emergency Systems Integration',
                'Equipment Specification Mapping',
                'API Standards Compliance'
            ]
        },
        documentValidation: {
            title: 'AI Document Validation',
            description: 'Comprehensive validation engine for P&ID drawings with industry standards compliance',
            icon: 'fas fa-shield-check',
            status: 'active',
            validatedDocs: 3456,
            accuracy: 99.1,
            sectors: ['Upstream', 'Midstream', 'Downstream', 'Petrochemicals', 'Offshore'],
            features: [
                'P&ID Standards Validation',
                'Equipment Tag Verification',
                'Piping Line Consistency Check',
                'Safety System Compliance',
                'Multi-Sector Standards Support',
                'Real-time Error Detection'
            ]
        },
        documentUpload: {
            title: 'Smart Document Processing',
            description: 'Intelligent document upload and processing with metadata extraction',
            icon: 'fas fa-cloud-upload-alt',
            status: 'active',
            uploadedFiles: 8934,
            accuracy: 94.8,
            supportedFormats: ['PDF', 'DWG', 'DXF', 'PNG', 'JPEG', 'DOCX'],
            features: [
                'Drag & Drop Interface',
                'Batch File Processing',
                'Metadata Auto-Extraction',
                'Version Control Integration',
                'S3 Cloud Storage',
                'Professional Field Mapping'
            ]
        },
        analyticsReporting: {
            title: 'Analytics & Reporting',
            description: 'Advanced analytics dashboard with comprehensive reporting capabilities',
            icon: 'fas fa-chart-line',
            status: 'active',
            generatedReports: 2156,
            accuracy: 98.5,
            reportTypes: ['Validation', 'Processing', 'Quality', 'Performance', 'Compliance'],
            features: [
                'Real-time Dashboard Analytics',
                'Custom Report Generation',
                'Export to Excel/PDF/CSV',
                'Performance Metrics Tracking',
                'Quality Assessment Reports',
                'Compliance Audit Trails'
            ]
        },
        aiProcessing: {
            title: 'AI Processing Engine',
            description: 'Core AI engine handling OCR, symbol recognition, and intelligent data extraction',
            icon: 'fas fa-brain',
            status: 'active',
            processedElements: 15647,
            accuracy: 96.7,
            capabilities: ['OCR', 'Symbol Detection', 'Text Recognition', 'Layout Analysis'],
            features: [
                'Advanced OCR Technology',
                'P&ID Symbol Recognition Library',
                'Intelligent Text Extraction',
                'Drawing Layout Analysis',
                'Equipment Identification',
                'Piping Network Mapping'
            ]
        },
        projectManagement: {
            title: 'Project & Asset Management',
            description: 'Comprehensive project management with drawing version control and asset tracking',
            icon: 'fas fa-project-diagram',
            status: 'active',
            managedProjects: 342,
            accuracy: 99.2,
            modules: ['Projects', 'Items', 'Legends', 'Documents', 'Reports'],
            features: [
                'Multi-Project Management',
                'Drawing Version Control',
                'Asset Lifecycle Tracking',
                'Legend & Symbol Libraries',
                'Document Relationship Mapping',
                'Progress Monitoring'
            ]
        }
    };

    const dashboardData = {
        overview: {
            kpis: [
                { title: 'Active Projects', value: '127', change: '+12%', icon: 'fas fa-project-diagram', color: 'primary' },
                { title: 'Total Users', value: '2,847', change: '+8%', icon: 'fas fa-users', color: 'success' },
                { title: 'System Uptime', value: '99.94%', change: '+0.1%', icon: 'fas fa-server', color: 'info' },
                { title: 'Revenue (YTD)', value: '$2.4M', change: '+15%', icon: 'fas fa-chart-line', color: 'warning' }
            ],
            recentActivities: [
                { type: 'user', message: 'New engineer registered: John Smith', time: '5 mins ago', icon: 'fas fa-user-plus' },
                { type: 'project', message: 'Project "North Sea Platform" completed', time: '12 mins ago', icon: 'fas fa-check-circle' },
                { type: 'alert', message: 'High CPU usage on Server-03', time: '25 mins ago', icon: 'fas fa-exclamation-triangle' },
                { type: 'system', message: 'Backup completed successfully', time: '1 hour ago', icon: 'fas fa-shield-alt' }
            ]
        },
        projects: [
            { id: 1, name: 'North Sea Platform Alpha', client: 'Shell', status: 'In Progress', progress: 78, priority: 'High' },
            { id: 2, name: 'Qatar LNG Expansion', client: 'QatarGas', status: 'Planning', progress: 23, priority: 'Medium' },
            { id: 3, name: 'Offshore Wind Farm', client: 'Ørsted', status: 'Completed', progress: 100, priority: 'Low' },
            { id: 4, name: 'Refinery Optimization', client: 'ExxonMobil', status: 'In Progress', progress: 45, priority: 'High' }
        ],
        users: [
            { id: 1, name: 'Dr. Sarah Johnson', role: 'Senior Engineer', department: 'Offshore', lastActive: '2 mins ago', status: 'online' },
            { id: 2, name: 'Michael Chen', role: 'Project Manager', department: 'Upstream', lastActive: '15 mins ago', status: 'away' },
            { id: 3, name: 'Emma Rodriguez', role: 'CAD Specialist', department: 'Design', lastActive: '1 hour ago', status: 'offline' },
            { id: 4, name: 'James Wilson', role: 'Safety Engineer', department: 'HSE', lastActive: '5 mins ago', status: 'online' }
        ]
    };

    const aiModules = [
        {
            name: 'Drawing Analysis',
            description: 'AI-powered technical drawing interpretation and data extraction',
            icon: 'fas fa-drafting-compass',
            status: 'active',
            usage: '87%',
            color: 'primary'
        },
        {
            name: 'Process Simulation',
            description: 'Advanced fluid dynamics and thermodynamic modeling',
            icon: 'fas fa-atom',
            status: 'active',
            usage: '72%',
            color: 'success'
        },
        {
            name: 'Predictive Maintenance',
            description: 'Equipment failure prediction and optimization',
            icon: 'fas fa-wrench',
            status: 'maintenance',
            usage: '45%',
            color: 'warning'
        },
        {
            name: 'Safety Analysis',
            description: 'Risk assessment and safety compliance monitoring',
            icon: 'fas fa-shield-alt',
            status: 'active',
            usage: '93%',
            color: 'info'
        }
    ];

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        // For development: create mock user if no token exists
        if (!token) {
            // Set mock user data for development
            const mockUser = { id: 1, username: 'super_admin', email: 'admin@rejlers.ae' };
            const mockRole = { role_name: 'SA', permissions: ['all'] };
            const mockProfile = { first_name: 'Super', last_name: 'Admin' };
            
            localStorage.setItem('user_info', JSON.stringify(mockUser));
            localStorage.setItem('user_role', JSON.stringify(mockRole));
            localStorage.setItem('user_profile', JSON.stringify(mockProfile));
            
            setUser(mockUser);
            setRole(mockRole);
            setProfile(mockProfile);
        } else {
            const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
            const userRole = JSON.parse(localStorage.getItem('user_role') || '{}');
            const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');

            setUser(userInfo);
            setRole(userRole);
            setProfile(userProfile);
        }
        
        setLoading(false);

        // Load system statistics
        loadSystemStats();
        loadNotifications();
    }, [navigate]);

    const loadSystemStats = async () => {
        // Simulate API call for system statistics
        setTimeout(() => {
            setSystemStats({
                totalProjects: Math.floor(Math.random() * 200) + 100,
                activeUsers: Math.floor(Math.random() * 500) + 200,
                systemLoad: Math.floor(Math.random() * 100),
                storageUsed: Math.floor(Math.random() * 100)
            });
        }, 1000);
    };

    const loadNotifications = () => {
        setNotifications([
            { id: 1, title: 'System Backup Complete', message: 'Weekly system backup completed successfully', type: 'success', time: '10 mins ago' },
            { id: 2, title: 'High CPU Usage Alert', message: 'Server cluster experiencing high CPU usage', type: 'warning', time: '25 mins ago' },
            { id: 3, title: 'New User Registration', message: '5 new users registered in the last hour', type: 'info', time: '1 hour ago' }
        ]);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await fetch('http://localhost:8000/api/v1/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_info');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_profile');
            
            toast.success('Logged out successfully');
            navigate('/login');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'In Progress': 'bg-primary',
            'Planning': 'bg-warning',
            'Completed': 'bg-success',
            'On Hold': 'bg-secondary',
            'active': 'bg-success',
            'maintenance': 'bg-warning',
            'inactive': 'bg-secondary',
            'online': 'bg-success',
            'away': 'bg-warning',
            'offline': 'bg-secondary'
        };
        return badges[status] || 'bg-secondary';
    };

    const renderOverview = () => (
        <div className="row g-4">
            {/* KPI Cards */}
            <div className="col-12">
                <div className="row g-3">
                    {dashboardData.overview.kpis.map((kpi, index) => (
                        <div key={index} className="col-xl-3 col-lg-6 col-md-6 mb-4">
                            <div className="stats-card h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-2 small fw-medium">{kpi.title}</p>
                                            <h2 className="fw-bold mb-2 text-dark">{kpi.value}</h2>
                                            <div className="d-flex align-items-center">
                                                <span className={`badge rounded-pill ${kpi.change.startsWith('+') ? 'bg-success' : 'bg-danger'} bg-opacity-15 text-${kpi.change.startsWith('+') ? 'success' : 'danger'} fw-semibold`}>
                                                    <i className={`fas ${kpi.change.startsWith('+') ? 'fa-arrow-up' : 'fa-arrow-down'} me-1`}></i>
                                                    {kpi.change}
                                                </span>
                                                <small className="text-muted ms-2">vs last month</small>
                                            </div>
                                        </div>
                                        <div className={`bg-${kpi.color} bg-opacity-10 p-3 rounded-4 d-flex align-items-center justify-content-center`} style={{width: '60px', height: '60px'}}>
                                            <i className={`${kpi.icon} text-${kpi.color} fs-3`}></i>
                                        </div>
                                    </div>
                                    <div className="progress-bar-custom">
                                        <div className="progress-fill" style={{width: `${70 + index * 10}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Row */}
            <div className="col-xl-8 mb-4">
                <div className="glass-card h-100">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-bold text-dark">System Performance Analytics</h5>
                            <div className="d-flex gap-2">
                                <span className="badge bg-success bg-opacity-10 text-success">Live</span>
                                <button className="btn btn-sm btn-glass">
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="text-center p-4 border border-opacity-50 rounded-4" style={{background: 'rgba(59, 130, 246, 0.02)'}}>
                                    <div className="mb-4">
                                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle position-relative" style={{
                                            width: '100px', 
                                            height: '100px',
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                                        }}>
                                            <i className="fas fa-server text-white fs-1"></i>
                                            <div className="position-absolute" style={{
                                                top: '-4px',
                                                right: '-4px',
                                                width: '24px',
                                                height: '24px',
                                                background: systemStats.systemLoad > 80 ? '#ef4444' : '#10b981',
                                                borderRadius: '50%',
                                                border: '3px solid white'
                                            }}></div>
                                        </div>
                                    </div>
                                    <h3 className="fw-bold mb-2 text-dark">{systemStats.systemLoad}%</h3>
                                    <p className="text-muted mb-3 fw-medium">System Load</p>
                                    <div className="progress-bar-custom">
                                        <div className="progress-fill" style={{width: `${systemStats.systemLoad}%`}}></div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <small className="text-muted">CPU Usage</small>
                                        <small className={`fw-bold ${systemStats.systemLoad > 80 ? 'text-danger' : 'text-success'}`}>
                                            {systemStats.systemLoad > 80 ? 'High' : 'Normal'}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-center p-4 border border-opacity-50 rounded-4" style={{background: 'rgba(16, 185, 129, 0.02)'}}>
                                    <div className="mb-4">
                                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle position-relative" style={{
                                            width: '100px', 
                                            height: '100px',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                                        }}>
                                            <i className="fas fa-hdd text-white fs-1"></i>
                                            <div className="position-absolute" style={{
                                                top: '-4px',
                                                right: '-4px',
                                                width: '24px',
                                                height: '24px',
                                                background: systemStats.storageUsed > 85 ? '#f59e0b' : '#10b981',
                                                borderRadius: '50%',
                                                border: '3px solid white'
                                            }}></div>
                                        </div>
                                    </div>
                                    <h3 className="fw-bold mb-2 text-dark">{systemStats.storageUsed}%</h3>
                                    <p className="text-muted mb-3 fw-medium">Storage Used</p>
                                    <div className="progress-bar-custom">
                                        <div className="progress-fill" style={{
                                            width: `${systemStats.storageUsed}%`,
                                            background: 'linear-gradient(90deg, #10b981, #34d399)'
                                        }}></div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <small className="text-muted">1.2TB / 2TB</small>
                                        <small className={`fw-bold ${systemStats.storageUsed > 85 ? 'text-warning' : 'text-success'}`}>
                                            {systemStats.storageUsed > 85 ? 'Warning' : 'Good'}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="col-xl-4 mb-4">
                <div className="glass-card h-100">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0 fw-bold text-dark">Recent Activities</h5>
                            <button className="btn btn-sm btn-glass">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="timeline-container">
                            {dashboardData.overview.recentActivities.map((activity, index) => (
                                <div key={index} className="timeline-item">
                                    <div className={`timeline-marker bg-${activity.type === 'alert' ? 'warning' : activity.type === 'user' ? 'success' : activity.type === 'system' ? 'info' : 'primary'} bg-opacity-15`}>
                                        <i className={`${activity.icon} text-${activity.type === 'alert' ? 'warning' : activity.type === 'user' ? 'success' : activity.type === 'system' ? 'info' : 'primary'}`}></i>
                                    </div>
                                    <div className="timeline-content">
                                        <p className="mb-2 text-dark fw-medium">{activity.message}</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <small className="text-muted">{activity.time}</small>
                                            <span className={`badge rounded-pill bg-${activity.type === 'alert' ? 'warning' : activity.type === 'user' ? 'success' : activity.type === 'system' ? 'info' : 'primary'} bg-opacity-10 text-${activity.type === 'alert' ? 'warning' : activity.type === 'user' ? 'success' : activity.type === 'system' ? 'info' : 'primary'}`}>
                                                {activity.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-glass btn-sm">
                                <i className="fas fa-history me-2"></i>
                                View All Activities
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Modules Status */}
            <div className="col-12">
                <div className="glass-card">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title mb-1 fw-bold text-dark">AI Modules Status</h5>
                                <p className="text-muted mb-0 small">Real-time monitoring of AI-powered systems</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-glass">
                                    <i className="fas fa-cog me-2"></i>Configure
                                </button>
                                <button className="btn btn-sm btn-glass">
                                    <i className="fas fa-chart-bar me-2"></i>Analytics
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="row g-4">
                            {aiModules.map((module, index) => (
                                <div key={index} className="col-lg-3 col-md-6">
                                    <div className="border border-opacity-50 rounded-4 p-4 h-100 position-relative" style={{
                                        background: `linear-gradient(135deg, ${
                                            module.color === 'primary' ? 'rgba(59, 130, 246, 0.02)' :
                                            module.color === 'success' ? 'rgba(16, 185, 129, 0.02)' :
                                            module.color === 'warning' ? 'rgba(245, 158, 11, 0.02)' :
                                            'rgba(99, 102, 241, 0.02)'
                                        }, transparent)`,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <div className="d-flex align-items-start justify-content-between mb-4">
                                            <div className={`bg-${module.color} bg-opacity-10 p-3 rounded-3 d-flex align-items-center justify-content-center`} style={{width: '56px', height: '56px'}}>
                                                <i className={`${module.icon} text-${module.color} fs-4`}></i>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <span className={`badge rounded-pill ${getStatusBadge(module.status)} bg-opacity-15 text-${module.status === 'active' ? 'success' : module.status === 'maintenance' ? 'warning' : 'secondary'} mb-2`}>
                                                    <i className={`fas ${module.status === 'active' ? 'fa-check-circle' : module.status === 'maintenance' ? 'fa-tools' : 'fa-pause-circle'} me-1`}></i>
                                                    {module.status}
                                                </span>
                                                {module.status === 'active' && (
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-success rounded-circle me-1" style={{width: '6px', height: '6px', animation: 'pulse 2s infinite'}}></div>
                                                        <small className="text-success fw-medium">Live</small>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h6 className="fw-bold mb-2 text-dark">{module.name}</h6>
                                        <p className="text-muted small mb-4 lh-base">{module.description}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small fw-medium">Usage</span>
                                            <span className="fw-bold small">{module.usage}</span>
                                        </div>
                                        
                                        <div className="progress-bar-custom">
                                            <div className={`progress-fill`} style={{
                                                width: module.usage,
                                                background: `linear-gradient(90deg, ${
                                                    module.color === 'primary' ? '#3b82f6, #06b6d4' :
                                                    module.color === 'success' ? '#10b981, #34d399' :
                                                    module.color === 'warning' ? '#f59e0b, #fbbf24' :
                                                    '#6366f1, #8b5cf6'
                                                })`
                                            }}></div>
                                        </div>
                                        
                                        <div className="mt-3 d-flex gap-2">
                                            <button className="btn btn-sm btn-glass flex-fill">
                                                <i className="fas fa-eye me-1"></i>
                                                Monitor
                                            </button>
                                            <button className="btn btn-sm btn-glass">
                                                <i className="fas fa-cog"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* EDRS Integration & Analytics Dashboard */}
            <div className="col-12">
                <div className="glass-card">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h5 className="card-title mb-1 fw-bold text-dark">EDRS Integration & Analytics</h5>
                                <p className="text-muted mb-0 small">Real-time processing statistics and system performance metrics</p>
                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                                <button className="btn btn-glass btn-sm">
                                    <i className="fas fa-sync-alt me-2"></i>Live Feed
                                </button>
                                <button className="btn btn-glass btn-sm">
                                    <i className="fas fa-chart-line me-2"></i>Analytics
                                </button>
                                <button className="btn btn-glass btn-sm">
                                    <i className="fas fa-download me-2"></i>Export
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        {/* Real-time Processing Statistics */}
                        <div className="row g-4 mb-4">
                            <div className="col-xl-3 col-lg-6">
                                <div className="border border-primary border-opacity-25 rounded-4 p-4" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02), transparent)'}}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                                            <i className="fas fa-file-pdf text-primary fs-4"></i>
                                        </div>
                                        <span className="badge bg-success bg-opacity-15 text-success">
                                            <i className="fas fa-arrow-up me-1"></i>+15%
                                        </span>
                                    </div>
                                    <h4 className="fw-bold mb-1 text-dark">2,847</h4>
                                    <p className="text-muted mb-2 small">PFD to PID Conversions</p>
                                    <div className="d-flex align-items-center">
                                        <div className="progress-bar-custom flex-grow-1 me-2" style={{height: '4px'}}>
                                            <div className="progress-fill" style={{width: '78%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)'}}></div>
                                        </div>
                                        <small className="text-muted">78%</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="border border-success border-opacity-25 rounded-4 p-4" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02), transparent)'}}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="bg-success bg-opacity-10 p-3 rounded-3">
                                            <i className="fas fa-check-double text-success fs-4"></i>
                                        </div>
                                        <span className="badge bg-success bg-opacity-15 text-success">
                                            <i className="fas fa-check me-1"></i>Active
                                        </span>
                                    </div>
                                    <h4 className="fw-bold mb-1 text-dark">1,563</h4>
                                    <p className="text-muted mb-2 small">Documents Validated</p>
                                    <div className="d-flex align-items-center">
                                        <div className="progress-bar-custom flex-grow-1 me-2" style={{height: '4px'}}>
                                            <div className="progress-fill" style={{width: '92%', background: 'linear-gradient(90deg, #10b981, #34d399)'}}></div>
                                        </div>
                                        <small className="text-muted">92%</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="border border-warning border-opacity-25 rounded-4 p-4" style={{background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.02), transparent)'}}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="bg-warning bg-opacity-10 p-3 rounded-3">
                                            <i className="fas fa-cloud-upload-alt text-warning fs-4"></i>
                                        </div>
                                        <span className="badge bg-warning bg-opacity-15 text-warning">
                                            <i className="fas fa-spinner fa-spin me-1"></i>Processing
                                        </span>
                                    </div>
                                    <h4 className="fw-bold mb-1 text-dark">487</h4>
                                    <p className="text-muted mb-2 small">Files Processing</p>
                                    <div className="d-flex align-items-center">
                                        <div className="progress-bar-custom flex-grow-1 me-2" style={{height: '4px'}}>
                                            <div className="progress-fill" style={{width: '65%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)'}}></div>
                                        </div>
                                        <small className="text-muted">65%</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="border border-info border-opacity-25 rounded-4 p-4" style={{background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.02), transparent)'}}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="bg-info bg-opacity-10 p-3 rounded-3">
                                            <i className="fas fa-brain text-info fs-4"></i>
                                        </div>
                                        <span className="badge bg-info bg-opacity-15 text-info">
                                            <i className="fas fa-bolt me-1"></i>AI Active
                                        </span>
                                    </div>
                                    <h4 className="fw-bold mb-1 text-dark">98.7%</h4>
                                    <p className="text-muted mb-2 small">AI Accuracy Rate</p>
                                    <div className="d-flex align-items-center">
                                        <div className="progress-bar-custom flex-grow-1 me-2" style={{height: '4px'}}>
                                            <div className="progress-fill" style={{width: '98%', background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)'}}></div>
                                        </div>
                                        <small className="text-muted">98%</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Processing Queue & System Status */}
                        <div className="row g-4">
                            <div className="col-lg-8">
                                <div className="border border-opacity-25 rounded-4 p-4" style={{background: 'rgba(248, 250, 252, 0.5)'}}>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="fw-bold mb-0 text-dark">Live Processing Queue</h6>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px', animation: 'pulse 2s infinite'}}></div>
                                            <small className="text-success fw-medium">Live Updates</small>
                                        </div>
                                    </div>
                                    <div className="processing-queue" style={{maxHeight: '200px', overflowY: 'auto'}}>
                                        {[
                                            { id: 'PID_001', file: 'Heat_Exchanger_P&ID.pdf', progress: 78, status: 'converting', module: 'PFD to PID' },
                                            { id: 'VAL_002', file: 'Piping_Layout_Rev3.dwg', progress: 92, status: 'validating', module: 'Validation' },
                                            { id: 'DOC_003', file: 'Process_Flow_Diagram.pdf', progress: 45, status: 'processing', module: 'Document Upload' },
                                            { id: 'AI_004', file: 'Equipment_List.xlsx', progress: 100, status: 'completed', module: 'AI Processing' },
                                            { id: 'RPT_005', file: 'Monthly_Report_Gen.json', progress: 67, status: 'generating', module: 'Analytics' }
                                        ].map((item, index) => (
                                            <div key={index} className="d-flex align-items-center justify-content-between p-3 mb-2 border border-opacity-25 rounded-3" style={{background: 'rgba(255, 255, 255, 0.7)'}}>
                                                <div className="d-flex align-items-center">
                                                    <div className={`bg-${
                                                        item.status === 'completed' ? 'success' :
                                                        item.status === 'converting' || item.status === 'validating' ? 'primary' :
                                                        item.status === 'processing' || item.status === 'generating' ? 'warning' :
                                                        'secondary'
                                                    } bg-opacity-10 p-2 rounded me-3`}>
                                                        <i className={`fas ${
                                                            item.status === 'completed' ? 'fa-check' :
                                                            item.status === 'converting' ? 'fa-exchange-alt' :
                                                            item.status === 'validating' ? 'fa-shield-alt' :
                                                            'fa-cog fa-spin'
                                                        } text-${
                                                            item.status === 'completed' ? 'success' :
                                                            item.status === 'converting' || item.status === 'validating' ? 'primary' :
                                                            'warning'
                                                        }`}></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 fw-medium">{item.file}</h6>
                                                        <small className="text-muted">{item.module} • ID: {item.id}</small>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="progress-bar-custom me-3" style={{width: '80px', height: '6px'}}>
                                                        <div className="progress-fill" style={{
                                                            width: `${item.progress}%`,
                                                            background: `linear-gradient(90deg, ${
                                                                item.status === 'completed' ? '#10b981, #34d399' :
                                                                item.status === 'converting' || item.status === 'validating' ? '#3b82f6, #06b6d4' :
                                                                '#f59e0b, #fbbf24'
                                                            })`
                                                        }}></div>
                                                    </div>
                                                    <span className="fw-medium small">{item.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="border border-opacity-25 rounded-4 p-4 h-100" style={{background: 'rgba(248, 250, 252, 0.5)'}}>
                                    <h6 className="fw-bold mb-4 text-dark">System Health Monitor</h6>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">CPU Usage</span>
                                            <span className="fw-bold small text-success">34%</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill" style={{width: '34%', background: 'linear-gradient(90deg, #10b981, #34d399)'}}></div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">Memory Usage</span>
                                            <span className="fw-bold small text-warning">67%</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill" style={{width: '67%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)'}}></div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">Storage Usage</span>
                                            <span className="fw-bold small text-info">45%</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill" style={{width: '45%', background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)'}}></div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">Network I/O</span>
                                            <span className="fw-bold small text-primary">89%</span>
                                        </div>
                                        <div className="progress-bar-custom">
                                            <div className="progress-fill" style={{width: '89%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)'}}></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-top border-opacity-25">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="text-success fw-medium small">
                                                <i className="fas fa-check-circle me-2"></i>All Systems Operational
                                            </span>
                                            <div className="bg-success rounded-circle" style={{width: '8px', height: '8px', animation: 'pulse 2s infinite'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderRealTimeMonitoring = () => (
        <div className="real-time-monitoring">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-2">
                                <i className="fas fa-radar me-2"></i>
                                Live System Activity Monitor - AI-Powered Surveillance
                            </h4>
                            <p className="mb-0 opacity-75">
                                Real-time tracking of user activities, system performance, and AI-driven anomaly detection
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5>Real-time Activity Stream</h5>
                            <div className="activity-stream" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {/* Activity items would be populated here */}
                                <p>Real-time monitoring interface - Advanced features under development</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderAIAnalytics = () => (
        <div className="ai-analytics">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-2">
                                <i className="fas fa-brain me-2"></i>
                                AI System Analytics & Machine Learning Insights
                            </h4>
                            <p className="mb-0 opacity-75">
                                Advanced analytics powered by machine learning for system optimization and predictive insights
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderSecurityCenter = () => (
        <div className="security-center">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-2">
                                <i className="fas fa-shield-alt me-2"></i>
                                AI Security Center - Advanced Threat Detection
                            </h4>
                            <p className="mb-0 opacity-75">
                                Intelligent security monitoring with automated threat detection and response systems
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderResourceOptimizer = () => (
        <div className="resource-optimizer">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-2">
                                <i className="fas fa-microchip me-2"></i>
                                AI Resource Optimizer - Intelligent Performance Management
                            </h4>
                            <p className="mb-0 opacity-75">
                                AI-driven resource allocation and performance optimization for maximum system efficiency
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderProjectIntelligence = () => (
        <div className="project-intelligence">
            <div className="row g-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)', color: 'white' }}>
                        <div className="card-body p-4">
                            <h4 className="mb-2">
                                <i className="fas fa-project-diagram me-2"></i>
                                Project AI Intelligence - Predictive Management
                            </h4>
                            <p className="mb-0 opacity-75">
                                Advanced project management with AI-powered predictions, automation, and intelligent insights
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderProjects = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Project Management</h5>
                    <button className="btn btn-primary btn-sm">
                        <i className="fas fa-plus me-2"></i>New Project
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Project Name</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.projects.map(project => (
                                <tr key={project.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 p-2 rounded-2 me-3">
                                                <i className="fas fa-oil-well text-primary"></i>
                                            </div>
                                            <strong>{project.name}</strong>
                                        </div>
                                    </td>
                                    <td>{project.client}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="progress me-2" style={{width: '80px', height: '6px'}}>
                                                <div className="progress-bar" style={{width: `${project.progress}%`}}></div>
                                            </div>
                                            <small>{project.progress}%</small>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${project.priority === 'High' ? 'bg-danger' : project.priority === 'Medium' ? 'bg-warning' : 'bg-success'} bg-opacity-10 text-${project.priority === 'High' ? 'danger' : project.priority === 'Medium' ? 'warning' : 'success'}`}>
                                            {project.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-primary">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-outline-secondary">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">User Management</h5>
                    <div>
                        <button 
                            className="btn btn-success btn-sm me-2" 
                            onClick={() => {
                                console.log('TEST: Setting modal to true');
                                setShowUserModal(true);
                            }}
                            type="button"
                        >
                            TEST Modal
                        </button>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Add User button clicked!');
                                openUserCreationModal();
                            }}
                            type="button"
                        >
                            <i className="fas fa-user-plus me-2"></i>Add User
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    {dashboardData.users.map(user => (
                        <div key={user.id} className="col-lg-6">
                            <div className="border rounded-3 p-3">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                                            <i className="fas fa-user text-primary"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1">{user.name}</h6>
                                            <p className="text-muted small mb-0">{user.role}</p>
                                        </div>
                                    </div>
                                    <span className={`badge ${getStatusBadge(user.status)} rounded-pill`}>
                                        {user.status}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{user.department} • {user.lastActive}</small>
                                    <div className="btn-group btn-group-sm">
                                        <button className="btn btn-outline-primary">
                                            <i className="fas fa-comment"></i>
                                        </button>
                                        <button className="btn btn-outline-secondary">
                                            <i className="fas fa-cog"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderEDRS = () => (
        <div className="row g-4">
            {/* EDRS System Overview Header */}
            <div className="col-12">
                <div className="glass-card">
                    <div className="card-body p-4">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="d-flex align-items-center justify-content-center me-4" style={{
                                        width: '72px',
                                        height: '72px',
                                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                        borderRadius: '18px',
                                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        <i className="fas fa-drafting-compass text-white fs-2"></i>
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-2 text-dark">EDRS - Engineering Drawing Recognition System</h3>
                                        <p className="text-muted mb-0 lead">Comprehensive AI-powered platform for Oil & Gas engineering document processing, validation, and conversion</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px', animation: 'pulse 2s infinite'}}></div>
                                        <small className="text-success fw-medium">All Systems Online</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-clock text-muted me-2"></i>
                                        <small className="text-muted">Last Update: 2 mins ago</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-users text-muted me-2"></i>
                                        <small className="text-muted">47 Active Users</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-server text-muted me-2"></i>
                                        <small className="text-muted">6 Processing Engines</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <div className="d-grid gap-2">
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary flex-fill">
                                            <i className="fas fa-upload me-2"></i>
                                            Upload Drawing
                                        </button>
                                        <button className="btn btn-success">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-glass flex-fill">
                                            <i className="fas fa-history me-2"></i>
                                            Processing Queue
                                        </button>
                                        <button className="btn btn-glass">
                                            <i className="fas fa-chart-bar"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDRS Quick Stats */}
            <div className="col-12">
                <div className="row g-3">
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card h-100">
                            <div className="card-body p-4 text-center">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-primary bg-opacity-10 p-3 rounded-4">
                                        <i className="fas fa-file-image text-primary fs-3"></i>
                                    </div>
                                    <span className="badge bg-success bg-opacity-15 text-success">+12%</span>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">2,847</h3>
                                <p className="text-muted mb-0 small">Total Documents Processed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card h-100">
                            <div className="card-body p-4 text-center">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-success bg-opacity-10 p-3 rounded-4">
                                        <i className="fas fa-exchange-alt text-success fs-3"></i>
                                    </div>
                                    <span className="badge bg-primary bg-opacity-15 text-primary">+8%</span>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">1,456</h3>
                                <p className="text-muted mb-0 small">PFD to P&ID Conversions</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card h-100">
                            <div className="card-body p-4 text-center">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-warning bg-opacity-10 p-3 rounded-4">
                                        <i className="fas fa-shield-check text-warning fs-3"></i>
                                    </div>
                                    <span className="badge bg-success bg-opacity-15 text-success">+15%</span>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">98.7%</h3>
                                <p className="text-muted mb-0 small">Validation Accuracy</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card h-100">
                            <div className="card-body p-4 text-center">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-info bg-opacity-10 p-3 rounded-4">
                                        <i className="fas fa-project-diagram text-info fs-3"></i>
                                    </div>
                                    <span className="badge bg-primary bg-opacity-15 text-primary">+3</span>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">342</h3>
                                <p className="text-muted mb-0 small">Active Projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDRS Module Navigator */}
            <div className="col-12">
                <div className="glass-card">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title mb-1 fw-bold text-dark">EDRS Module Navigator</h5>
                                <p className="text-muted mb-0 small">Access all EDRS features and capabilities from this central hub</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-glass btn-sm">
                                    <i className="fas fa-expand-arrows-alt me-2"></i>Full Screen
                                </button>
                                <button className="btn btn-glass btn-sm">
                                    <i className="fas fa-sync-alt me-2"></i>Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="row g-4">
                            {Object.entries(edrsFeatures).map(([key, feature]) => (
                                <div key={key} className="col-xl-4 col-lg-6">
                                    <div className="border border-opacity-50 rounded-4 p-4 h-100 position-relative" style={{
                                        background: `linear-gradient(135deg, ${
                                            key === 'pfdToPid' ? 'rgba(59, 130, 246, 0.02)' :
                                            key === 'documentValidation' ? 'rgba(16, 185, 129, 0.02)' :
                                            key === 'documentUpload' ? 'rgba(245, 158, 11, 0.02)' :
                                            key === 'analyticsReporting' ? 'rgba(168, 85, 247, 0.02)' :
                                            key === 'aiProcessing' ? 'rgba(239, 68, 68, 0.02)' :
                                            'rgba(99, 102, 241, 0.02)'
                                        }, transparent)`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }} onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                                    }} onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}>
                                        
                                        <div className="d-flex align-items-start justify-content-between mb-3">
                                            <div className={`bg-${
                                                key === 'pfdToPid' ? 'primary' :
                                                key === 'documentValidation' ? 'success' :
                                                key === 'documentUpload' ? 'warning' :
                                                key === 'analyticsReporting' ? 'purple' :
                                                key === 'aiProcessing' ? 'danger' :
                                                'info'
                                            } bg-opacity-10 p-3 rounded-3`}>
                                                <i className={`${feature.icon} text-${
                                                    key === 'pfdToPid' ? 'primary' :
                                                    key === 'documentValidation' ? 'success' :
                                                    key === 'documentUpload' ? 'warning' :
                                                    key === 'analyticsReporting' ? 'purple' :
                                                    key === 'aiProcessing' ? 'danger' :
                                                    'info'
                                                } fs-4`}></i>
                                            </div>
                                            <span className={`badge rounded-pill ${feature.status === 'active' ? 'bg-success' : 'bg-warning'} bg-opacity-15 text-${feature.status === 'active' ? 'success' : 'warning'}`}>
                                                <i className={`fas ${feature.status === 'active' ? 'fa-check-circle' : 'fa-flask'} me-1`}></i>
                                                {feature.status}
                                            </span>
                                        </div>
                                        
                                        <h6 className="fw-bold mb-2 text-dark">{feature.title}</h6>
                                        <p className="text-muted small mb-3 lh-base">{feature.description}</p>
                                        
                                        <div className="row g-2 mb-3">
                                            <div className="col-6">
                                                <div className="text-center p-2 border border-opacity-25 rounded-3">
                                                    <h6 className="fw-bold mb-0 text-primary">
                                                        {(key === 'pfdToPid' ? feature.processedDrawings :
                                                          key === 'documentValidation' ? feature.validatedDocs :
                                                          key === 'documentUpload' ? feature.uploadedFiles :
                                                          key === 'analyticsReporting' ? feature.generatedReports :
                                                          key === 'aiProcessing' ? feature.processedElements :
                                                          feature.managedProjects).toLocaleString()}
                                                    </h6>
                                                    <small className="text-muted">
                                                        {key === 'pfdToPid' ? 'Conversions' :
                                                         key === 'documentValidation' ? 'Validated' :
                                                         key === 'documentUpload' ? 'Uploaded' :
                                                         key === 'analyticsReporting' ? 'Reports' :
                                                         key === 'aiProcessing' ? 'Processed' :
                                                         'Projects'}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-center p-2 border border-opacity-25 rounded-3">
                                                    <h6 className="fw-bold mb-0 text-success">{feature.accuracy}%</h6>
                                                    <small className="text-muted">Accuracy</small>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <div className="d-flex flex-wrap gap-1">
                                                {(key === 'pfdToPid' ? feature.processingModes :
                                                  key === 'documentValidation' ? feature.sectors.slice(0,3) :
                                                  key === 'documentUpload' ? feature.supportedFormats.slice(0,3) :
                                                  key === 'analyticsReporting' ? feature.reportTypes.slice(0,3) :
                                                  key === 'aiProcessing' ? feature.capabilities :
                                                  feature.modules.slice(0,3)).map((item, index) => (
                                                    <span key={index} className="badge bg-light text-dark small">{item}</span>
                                                ))}
                                                {(key === 'documentValidation' && feature.sectors.length > 3) ||
                                                 (key === 'documentUpload' && feature.supportedFormats.length > 3) ||
                                                 (key === 'analyticsReporting' && feature.reportTypes.length > 3) ||
                                                 (key === 'projectManagement' && feature.modules.length > 3) ? (
                                                    <span className="badge bg-secondary small">+{
                                                        key === 'documentValidation' ? feature.sectors.length - 3 :
                                                        key === 'documentUpload' ? feature.supportedFormats.length - 3 :
                                                        key === 'analyticsReporting' ? feature.reportTypes.length - 3 :
                                                        feature.modules.length - 3
                                                    } more</span>
                                                ) : null}
                                            </div>
                                        </div>
                                        
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary btn-sm" onClick={() => {
                                                // Navigate to specific module
                                                const moduleRoutes = {
                                                    pfdToPid: '/edrs/pdf-to-pid',



                                                    aiProcessing: '/edrs/ai-engine',

                                                };
                                                toast.info(`Launching ${feature.title}...`);
                                                if (moduleRoutes[key]) {
                                                    window.location.href = moduleRoutes[key];
                                                } else {
                                                    toast.warning(`${feature.title} module is under development`);
                                                }
                                            }}>
                                                <i className="fas fa-external-link-alt me-2"></i>
                                                Launch Module
                                            </button>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-glass btn-sm flex-fill">
                                                    <i className="fas fa-chart-bar me-1"></i>
                                                    Stats
                                                </button>
                                                <button className="btn btn-glass btn-sm flex-fill">
                                                    <i className="fas fa-cog me-1"></i>
                                                    Config
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Module-specific indicators */}
                                        <div className="position-absolute top-0 end-0 m-3">
                                            {key === 'pfdToPid' && (
                                                <div className="bg-primary text-white rounded-pill px-2 py-1" style={{fontSize: '10px'}}>
                                                    AI CONVERSION
                                                </div>
                                            )}
                                            {key === 'documentValidation' && (
                                                <div className="bg-success text-white rounded-pill px-2 py-1" style={{fontSize: '10px'}}>
                                                    VALIDATION
                                                </div>
                                            )}
                                            {key === 'aiProcessing' && (
                                                <div className="bg-danger text-white rounded-pill px-2 py-1" style={{fontSize: '10px'}}>
                                                    AI CORE
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent EDRS Activity */}
            <div className="col-12">
                <div className="glass-card">
                    <div className="card-header bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title mb-1 fw-bold text-dark">Recent EDRS Activity</h5>
                                <p className="text-muted mb-0 small">Latest drawing analysis and document processing results</p>
                            </div>
                            <button className="btn btn-glass btn-sm">
                                <i className="fas fa-download me-2"></i>
                                Export Report
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Type</th>
                                        <th>Processing Time</th>
                                        <th>Accuracy</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-primary bg-opacity-10 p-2 rounded-2 me-3">
                                                    <i className="fas fa-file-image text-primary"></i>
                                                </div>
                                                <div>
                                                    <strong>P&ID_Platform_Alpha_Rev3.dwg</strong>
                                                    <br />
                                                    <small className="text-muted">Uploaded 15 mins ago</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-15 text-info">P&ID Drawing</span>
                                        </td>
                                        <td>2m 34s</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="progress me-2" style={{width: '60px', height: '6px'}}>
                                                    <div className="progress-bar bg-success" style={{width: '98%'}}></div>
                                                </div>
                                                <small className="text-success fw-bold">98%</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-success">Completed</span>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button className="btn btn-glass">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="btn btn-glass">
                                                    <i className="fas fa-download"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-success bg-opacity-10 p-2 rounded-2 me-3">
                                                    <i className="fas fa-file-pdf text-success"></i>
                                                </div>
                                                <div>
                                                    <strong>Equipment_Specs_LNG_Module.pdf</strong>
                                                    <br />
                                                    <small className="text-muted">Uploaded 32 mins ago</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-success bg-opacity-15 text-success">Specification</span>
                                        </td>
                                        <td>1m 18s</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="progress me-2" style={{width: '60px', height: '6px'}}>
                                                    <div className="progress-bar bg-success" style={{width: '96%'}}></div>
                                                </div>
                                                <small className="text-success fw-bold">96%</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-success">Completed</span>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button className="btn btn-glass">
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="btn btn-glass">
                                                    <i className="fas fa-download"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-warning bg-opacity-10 p-2 rounded-2 me-3">
                                                    <i className="fas fa-file-alt text-warning"></i>
                                                </div>
                                                <div>
                                                    <strong>Safety_Datasheet_H2S_Detection.docx</strong>
                                                    <br />
                                                    <small className="text-muted">Processing...</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-warning bg-opacity-15 text-warning">Safety Document</span>
                                        </td>
                                        <td>
                                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                <span className="visually-hidden">Processing...</span>
                                            </div>
                                        </td>
                                        <td>-</td>
                                        <td>
                                            <span className="badge bg-warning">Processing</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-glass btn-sm" disabled>
                                                <i className="fas fa-hourglass-half"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeModule) {
            case 'overview': return renderOverview();
            case 'users': return renderUsers();
            case 'activity': return renderRealTimeMonitoring();
            case 'analytics': return renderAIAnalytics();
            case 'security': return renderSecurityCenter();
            case 'resources': return renderResourceOptimizer();
            case 'projects': return renderProjectIntelligence();
            case 'edrs': return renderEDRS();
            case 'system': return renderSystem();
            default: return renderOverview();
        }
    };

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <div className="alert alert-danger">
                        <h4>Dashboard Error</h4>
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading Super Admin Dashboard...</p>
                </div>
            </div>
        );
    }

    const dashboardStyles = `
        .admin-dashboard {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
        }

        .admin-dashboard::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
                linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 100%);
            pointer-events: none;
            z-index: 1;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
        }

        .sidebar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 30%, rgba(168, 85, 247, 0.03) 100%);
            pointer-events: none;
        }

        .sidebar-collapsed {
            transform: translateX(-280px);
        }

        .sidebar-content {
            position: relative;
            z-index: 2;
            padding: 24px;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .sidebar-header {
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sidebar-nav .nav-link {
            color: rgba(255, 255, 255, 0.7);
            border-radius: 12px;
            margin: 4px 0;
            padding: 14px 18px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            position: relative;
            overflow: hidden;
            text-decoration: none;
        }

        .sidebar-nav .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .sidebar-nav .nav-link:hover {
            background: rgba(255, 255, 255, 0.08);
            color: white;
            transform: translateX(6px);
            border-color: rgba(59, 130, 246, 0.3);
        }

        .sidebar-nav .nav-link:hover::before {
            left: 100%;
        }

        .sidebar-nav .nav-link.active {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            box-shadow: 
                0 8px 25px rgba(59, 130, 246, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border-color: rgba(59, 130, 246, 0.5);
            transform: translateX(0);
        }

        .sidebar-nav .nav-link.active::after {
            content: '';
            position: absolute;
            right: -1px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: #60a5fa;
            border-radius: 2px 0 0 2px;
        }

        /* Dropdown menu animations */
        .expandable-submenu {
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                max-height: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                max-height: 300px;
                transform: translateY(0);
            }
        }

        .expandable-submenu .nav-link {
            transition: all 0.2s ease;
            border-radius: 6px;
            margin: 2px 0;
        }

        .expandable-submenu .nav-link:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }

        .main-content {
            margin-left: 280px;
            min-height: 100vh;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 2;
        }

        .main-content.expanded {
            margin-left: 0;
        }

        .main-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            position: sticky;
            top: 0;
            z-index: 100;
            padding: 16px 24px;
        }

        .notification-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: 2px solid white;
            border-radius: 50%;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .dashboard-content {
            padding: 24px;
            background: transparent;
        }

        .stats-card {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
                0 4px 16px rgba(0, 0, 0, 0.04),
                0 1px 4px rgba(0, 0, 0, 0.08);
            position: relative;
            overflow: hidden;
        }

        .stats-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
        }

        .stats-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 
                0 12px 40px rgba(0, 0, 0, 0.12),
                0 4px 16px rgba(0, 0, 0, 0.08);
            border-color: rgba(59, 130, 246, 0.3);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(226, 232, 240, 0.6);
            border-radius: 20px;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.08),
                0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
        }

        .glass-card:hover {
            border-color: rgba(59, 130, 246, 0.2);
            box-shadow: 
                0 12px 48px rgba(0, 0, 0, 0.12),
                0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .timeline-item {
            position: relative;
            padding-left: 48px;
            margin-bottom: 20px;
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: 18px;
            top: 0;
            bottom: -20px;
            width: 2px;
            background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
        }

        .timeline-item:last-child::before {
            bottom: 0;
        }

        .timeline-marker {
            position: absolute;
            left: 0;
            top: 4px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 3px solid white;
        }

        .user-avatar {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .progress-bar-custom {
            height: 8px;
            border-radius: 6px;
            background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #06b6d4);
            border-radius: 6px;
            transition: width 1s ease-out;
            position: relative;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .btn-glass {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .btn-glass:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .status-online { background: linear-gradient(135deg, #10b981, #34d399); }
        .status-away { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        .status-offline { background: linear-gradient(135deg, #6b7280, #9ca3af); }

        .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            animation: float 20s infinite linear;
        }

        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10px) rotate(360deg); opacity: 0; }
        }

        .sidebar-toggle {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
            background: rgba(59, 130, 246, 0.2);
            border-color: rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 1024px) {
            .main-content {
                margin-left: 0;
            }
            
            .sidebar {
                transform: translateX(-280px);
            }
            
            .sidebar.show {
                transform: translateX(0);
            }
        }

        @media (max-width: 768px) {
            .dashboard-content {
                padding: 16px;
            }
            
            .sidebar-content {
                padding: 16px;
            }
            
            .main-header {
                padding: 12px 16px;
            }
        }
    `;

    // Render sidebar component
    const renderSidebar = () => (
        <div style={{width: '250px', backgroundColor: '#343a40', color: 'white', padding: '20px', flexShrink: 0}}>
            <div style={{marginBottom: '30px'}}>
                <h5 className="text-white mb-1">Rejlers ERP</h5>
                <small className="text-light opacity-75">Super Admin Portal</small>
            </div>
            
            <nav>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'overview' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-tachometer-alt" style={{marginRight: '10px'}}></i>
                            Dashboard Overview
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/users" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'users' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-users" style={{marginRight: '10px'}}></i>
                            User Management
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/activity" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'activity' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-activity" style={{marginRight: '10px'}}></i>
                            Real-Time Activity
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/analytics" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'analytics' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-chart-bar" style={{marginRight: '10px'}}></i>
                            AI Analytics
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/security" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'security' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-shield-alt" style={{marginRight: '10px'}}></i>
                            Security Center
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/resources" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'resources' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-server" style={{marginRight: '10px'}}></i>
                            Resources
                        </a>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                        <a href="/admin-panel/projects" style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: activeModule === 'projects' ? '#495057' : 'transparent'}}>
                            <i className="fas fa-project-diagram" style={{marginRight: '10px'}}></i>
                            Project Intelligence
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );

    // Simple render for users page with sidebar
    if (activeModule === 'users') {
        return (
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex'}}>
                {renderSidebar()}
                {/* Main Content */}
                <div style={{flex: 1, padding: '20px'}}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="mb-1">AI-Powered User Management</h3>
                                <small className="text-muted">Manage users with advanced AI insights and analytics</small>
                            </div>
                            <button className="btn btn-primary" onClick={openUserCreationModal}>
                                <i className="fas fa-user-plus me-2"></i>Add New User
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {dashboardData.users.map(user => (
                                    <div key={user.id} className="col-md-6 mb-3">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                                                        <i className="fas fa-user text-primary"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="card-title mb-1">{user.name}</h5>
                                                        <p className="text-muted mb-0">{user.role}</p>
                                                    </div>
                                                    <span className={`badge ${getStatusBadge(user.status)} rounded-pill`}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <small className="text-muted">{user.department} • {user.lastActive}</small>
                                                    <div className="btn-group btn-group-sm">
                                                        <button className="btn btn-outline-primary">
                                                            <i className="fas fa-comment"></i>
                                                        </button>
                                                        <button className="btn btn-outline-secondary">
                                                            <i className="fas fa-cog"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Simple render for activity page with sidebar
    if (activeModule === 'activity') {
        return (
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex'}}>
                {renderSidebar()}
                {/* Main Content */}
                <div style={{flex: 1, padding: '20px'}}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="mb-1">Real-Time Activity Monitor</h3>
                                <small className="text-muted">Live monitoring of user activities and system events</small>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">
                                    <i className="fas fa-filter me-2"></i>Filter
                                </button>
                                <button className="btn btn-primary btn-sm">
                                    <i className="fas fa-download me-2"></i>Export
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Active Users Summary */}
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <div className="card bg-success bg-opacity-10 border-success">
                                        <div className="card-body text-center">
                                            <i className="fas fa-users fs-2 text-success mb-2"></i>
                                            <h4 className="text-success">{realTimeUsers.filter(u => u.status === 'Active').length}</h4>
                                            <small className="text-muted">Active Users</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-warning bg-opacity-10 border-warning">
                                        <div className="card-body text-center">
                                            <i className="fas fa-clock fs-2 text-warning mb-2"></i>
                                            <h4 className="text-warning">{realTimeUsers.filter(u => u.status === 'Idle').length}</h4>
                                            <small className="text-muted">Idle Users</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-info bg-opacity-10 border-info">
                                        <div className="card-body text-center">
                                            <i className="fas fa-tasks fs-2 text-info mb-2"></i>
                                            <h4 className="text-info">24</h4>
                                            <small className="text-muted">Active Tasks</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-primary bg-opacity-10 border-primary">
                                        <div className="card-body text-center">
                                            <i className="fas fa-chart-line fs-2 text-primary mb-2"></i>
                                            <h4 className="text-primary">97%</h4>
                                            <small className="text-muted">System Health</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Activity Feed */}
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>User</th>
                                            <th>Activity</th>
                                            <th>Current Page</th>
                                            <th>Status</th>
                                            <th>Last Activity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {realTimeUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '35px', height: '35px'}}>
                                                            <i className="fas fa-user text-primary"></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0">{user.name}</h6>
                                                            <small className="text-muted">{user.role}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${user.status === 'Active' ? 'bg-success' : user.status === 'Idle' ? 'bg-warning' : 'bg-secondary'}`}>
                                                        {user.status === 'Active' ? 'Working' : user.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <code className="text-muted">{user.currentPage}</code>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className={`rounded-circle me-2 ${user.status === 'Active' ? 'bg-success' : user.status === 'Idle' ? 'bg-warning' : 'bg-secondary'}`} style={{width: '8px', height: '8px'}}></div>
                                                        {user.status}
                                                    </div>
                                                </td>
                                                <td>
                                                    <small className="text-muted">{user.lastActivity}</small>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <button className="btn btn-outline-primary" title="View Details">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-outline-secondary" title="Send Message">
                                                            <i className="fas fa-comment"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    try {
        return (
            <>
                <Helmet>
                    <title>Super Admin Dashboard - Rejlers AI-Powered ERP | Oil & Gas Management</title>
                    <meta name="description" content="Advanced Super Admin Dashboard for Rejlers AI-powered ERP system. Comprehensive project management, user administration, and system analytics for Oil & Gas operations." />
                    <style>{dashboardStyles}</style>
                </Helmet>

            <div className="admin-dashboard">
                {/* Floating Particles Background */}
                <div className="floating-particles">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i} 
                            className="particle" 
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 20}s`,
                                animationDuration: `${15 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                {/* Sidebar */}
                <div className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center justify-content-center" style={{
                                    width: '48px', 
                                    height: '48px', 
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                                    borderRadius: '12px',
                                    marginRight: '12px'
                                }}>
                                    <i className="fas fa-oil-well text-white fs-5"></i>
                                </div>
                                <div>
                                    <h5 className="text-white mb-1 fw-bold">Rejlers ERP</h5>
                                    <small className="text-light opacity-75">Super Admin Portal</small>
                                </div>
                            </div>
                            
                            <nav className="sidebar-nav">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'overview' ? 'active' : ''}`} 
                                           href="#" onClick={() => setActiveModule('overview')}>
                                            <i className="fas fa-tachometer-alt me-2"></i>
                                            Dashboard Overview
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${expandedMenus.has('edrs') ? 'active' : ''}`} 
                                           href="#" onClick={() => toggleExpandableMenu('edrs')}>
                                            <i className="fas fa-drafting-compass me-2"></i>
                                            EDRS Platform
                                            <span className="badge bg-primary bg-opacity-20 text-primary ms-2 small">AI</span>
                                            <i className={`fas fa-chevron-${expandedMenus.has('edrs') ? 'up' : 'down'} ms-auto`} style={{fontSize: '12px'}}></i>
                                        </a>
                                        {expandedMenus.has('edrs') && (
                                            <ul className="nav flex-column ms-3" style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px', padding: '8px'}}>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => navigate('/edrs/dashboard')}>
                                                        <i className="fas fa-tachometer-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>EDRS Dashboard</small>
                                                    </a>
                                                </li>


                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => navigate('/edrs/pdf-to-pid')}>
                                                        <i className="fas fa-exchange-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>PFD to P&ID Conversion</small>
                                                    </a>
                                                </li>


                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => navigate('/edrs/ai-engine')}>
                                                        <i className="fas fa-brain me-2" style={{fontSize: '12px'}}></i>
                                                        <small>AI Processing Engine</small>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${expandedMenus.has('projects') ? 'active' : ''}`} 
                                           href="#" onClick={() => toggleExpandableMenu('projects')}>
                                            <i className="fas fa-project-diagram me-2"></i>
                                            Project Management
                                            <i className={`fas fa-chevron-${expandedMenus.has('projects') ? 'up' : 'down'} ms-auto`} style={{fontSize: '12px'}}></i>
                                        </a>
                                        {expandedMenus.has('projects') && (
                                            <ul className="nav flex-column ms-3" style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px', padding: '8px'}}>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Project Overview')}>
                                                        <i className="fas fa-chart-line me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Project Overview</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Active Projects')}>
                                                        <i className="fas fa-tasks me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Active Projects</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Team Management')}>
                                                        <i className="fas fa-users me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Team Management</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Resource Planning')}>
                                                        <i className="fas fa-calendar-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Resource Planning</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Project Reports')}>
                                                        <i className="fas fa-file-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Project Reports</small>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'users' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('users'); navigate('/admin-panel/users'); }}>
                                            <i className="fas fa-users-cog me-2"></i>
                                            AI User Management
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'activity' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('activity'); navigate('/admin-panel/activity'); }}>
                                            <i className="fas fa-radar me-2"></i>
                                            Live Activity Monitor
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'analytics' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('analytics'); navigate('/admin-panel/analytics'); }}>
                                            <i className="fas fa-brain me-2"></i>
                                            AI System Analytics
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'security' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('security'); navigate('/admin-panel/security'); }}>
                                            <i className="fas fa-shield-alt me-2"></i>
                                            AI Security Center
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'resources' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('resources'); navigate('/admin-panel/resources'); }}>
                                            <i className="fas fa-microchip me-2"></i>
                                            Resource AI Optimizer
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeModule === 'projects' ? 'active' : ''}`} 
                                           href="#" onClick={() => { setActiveModule('projects'); navigate('/admin-panel/projects'); }}>
                                            <i className="fas fa-project-diagram me-2"></i>
                                            Project AI Intelligence
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${expandedMenus.has('ai-modules') ? 'active' : ''}`} 
                                           href="#" onClick={() => toggleExpandableMenu('ai-modules')}>
                                            <i className="fas fa-robot me-2"></i>
                                            AI Modules
                                            <span className="badge bg-danger bg-opacity-20 text-danger ms-2 small">CORE</span>
                                            <i className={`fas fa-chevron-${expandedMenus.has('ai-modules') ? 'up' : 'down'} ms-auto`} style={{fontSize: '12px'}}></i>
                                        </a>
                                        {expandedMenus.has('ai-modules') && (
                                            <ul className="nav flex-column ms-3" style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px', padding: '8px'}}>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('AI Engine Management')}>
                                                        <i className="fas fa-cogs me-2" style={{fontSize: '12px'}}></i>
                                                        <small>AI Engine Management</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Model Configuration')}>
                                                        <i className="fas fa-brain me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Model Configuration</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Training Data')}>
                                                        <i className="fas fa-database me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Training Data</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Performance Monitoring')}>
                                                        <i className="fas fa-chart-line me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Performance Monitoring</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('API Management')}>
                                                        <i className="fas fa-plug me-2" style={{fontSize: '12px'}}></i>
                                                        <small>API Management</small>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${expandedMenus.has('analytics') ? 'active' : ''}`} 
                                           href="#" onClick={() => toggleExpandableMenu('analytics')}>
                                            <i className="fas fa-chart-bar me-2"></i>
                                            Analytics
                                            <i className={`fas fa-chevron-${expandedMenus.has('analytics') ? 'up' : 'down'} ms-auto`} style={{fontSize: '12px'}}></i>
                                        </a>
                                        {expandedMenus.has('analytics') && (
                                            <ul className="nav flex-column ms-3" style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px', padding: '8px'}}>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('System Analytics')}>
                                                        <i className="fas fa-desktop me-2" style={{fontSize: '12px'}}></i>
                                                        <small>System Analytics</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('User Activity')}>
                                                        <i className="fas fa-user-clock me-2" style={{fontSize: '12px'}}></i>
                                                        <small>User Activity</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Performance Metrics')}>
                                                        <i className="fas fa-tachometer-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Performance Metrics</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Business Intelligence')}>
                                                        <i className="fas fa-brain me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Business Intelligence</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Export Reports')}>
                                                        <i className="fas fa-download me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Export Reports</small>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${expandedMenus.has('system-settings') ? 'active' : ''}`} 
                                           href="#" onClick={() => toggleExpandableMenu('system-settings')}>
                                            <i className="fas fa-cog me-2"></i>
                                            System Settings
                                            <i className={`fas fa-chevron-${expandedMenus.has('system-settings') ? 'up' : 'down'} ms-auto`} style={{fontSize: '12px'}}></i>
                                        </a>
                                        {expandedMenus.has('system-settings') && (
                                            <ul className="nav flex-column ms-3" style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginTop: '8px', padding: '8px'}}>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('General Configuration')}>
                                                        <i className="fas fa-sliders-h me-2" style={{fontSize: '12px'}}></i>
                                                        <small>General Configuration</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Security Settings')}>
                                                        <i className="fas fa-shield-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Security Settings</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Database Management')}>
                                                        <i className="fas fa-database me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Database Management</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('Backup & Recovery')}>
                                                        <i className="fas fa-hdd me-2" style={{fontSize: '12px'}}></i>
                                                        <small>Backup & Recovery</small>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link py-2" href="#" onClick={() => console.log('System Logs')}>
                                                        <i className="fas fa-file-alt me-2" style={{fontSize: '12px'}}></i>
                                                        <small>System Logs</small>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                {/* Main Content */}
                <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
                    {/* Header */}
                    <header className="main-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <button className="btn sidebar-toggle me-4" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                                    <i className={`fas ${sidebarCollapsed ? 'fa-bars' : 'fa-times'} text-primary`}></i>
                                </button>
                                <div>
                                    <h4 className="mb-0 fw-bold text-dark">Super Admin Dashboard</h4>
                                    <small className="text-muted">Oil & Gas ERP Management System</small>
                                </div>
                            </div>
                                
                            <div className="d-flex align-items-center gap-3">
                                <div className="position-relative">
                                    <button className="btn btn-glass position-relative">
                                        <i className="fas fa-bell text-muted"></i>
                                        {notifications.length > 0 && (
                                            <span className="notification-badge">{notifications.length}</span>
                                        )}
                                    </button>
                                </div>
                                
                                <div className="position-relative">
                                    <button className="btn btn-glass">
                                        <i className="fas fa-search text-muted"></i>
                                    </button>
                                </div>
                                    
                                    <div className="dropdown">
                                        <button className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none" 
                                                data-bs-toggle="dropdown">
                                            <div className="user-avatar me-2">
                                                {user?.first_name?.[0]}{user?.last_name?.[0]}
                                            </div>
                                            <div className="text-start">
                                                <div className="fw-semibold">{user?.first_name} {user?.last_name}</div>
                                                <small className="text-muted">{role?.name}</small>
                                            </div>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </header>

                    {/* Dashboard Content */}
                    <main className="dashboard-content">
                        {renderContent()}
                    </main>
                    </div>
                </div>
            </div>

            {/* User Creation Modal */}
            {showUserModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeUserCreationModal}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-user-plus me-2"></i>Create New User
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={closeUserCreationModal}
                                ></button>
                            </div>
                            <form onSubmit={handleCreateUser}>
                                <div className="modal-body">
                                    <div className="row">
                                        {/* Basic Information */}
                                        <div className="col-md-6">
                                            <h6 className="text-primary mb-3">Basic Information</h6>
                                            <div className="mb-3">
                                                <label className="form-label">First Name *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newUserData.first_name}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, first_name: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Name *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newUserData.last_name}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, last_name: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email Address *</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={newUserData.email}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    value={newUserData.phone_number}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, phone_number: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        {/* Role and Department */}
                                        <div className="col-md-6">
                                            <h6 className="text-primary mb-3">Role & Department</h6>
                                            <div className="mb-3">
                                                <label className="form-label">Role</label>
                                                <select
                                                    className="form-select"
                                                    value={newUserData.role}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                                                >
                                                    <option value="engineer">Engineer</option>
                                                    <option value="project_manager">Project Manager</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="supervisor">Supervisor</option>
                                                    <option value="analyst">Analyst</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Department</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newUserData.department}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, department: e.target.value }))}
                                                    placeholder="e.g., Offshore, Upstream, Process"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Position</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newUserData.position}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, position: e.target.value }))}
                                                    placeholder="e.g., Senior Engineer, Team Lead"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Storage Quota (GB)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={newUserData.storage_quota_gb}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, storage_quota_gb: parseFloat(e.target.value) }))}
                                                    min="1"
                                                    max="100"
                                                    step="0.5"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature Permissions */}
                                    <div className="mt-4">
                                        <h6 className="text-primary mb-3">Feature Permissions *</h6>
                                        {loadingFeatures ? (
                                            <div className="text-center py-3">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {availableFeatures.map(feature => (
                                                    <div key={feature.feature_code} className="col-md-6 mb-3">
                                                        <div className="form-check p-3 border rounded">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`feature_${feature.feature_code}`}
                                                                checked={newUserData.features.includes(feature.feature_code)}
                                                                onChange={() => handleFeatureToggle(feature.feature_code)}
                                                            />
                                                            <label className="form-check-label w-100" htmlFor={`feature_${feature.feature_code}`}>
                                                                <div className="fw-bold">{feature.feature_name}</div>
                                                                <small className="text-muted">{feature.description}</small>
                                                                <div className="mt-1">
                                                                    <span className="badge bg-secondary">{feature.category}</span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {availableFeatures.length === 0 && !loadingFeatures && (
                                            <div className="alert alert-warning">
                                                <i className="fas fa-exclamation-triangle me-2"></i>
                                                No features available. Please contact system administrator.
                                            </div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="mt-4">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="userActiveStatus"
                                                checked={newUserData.is_active}
                                                onChange={(e) => setNewUserData(prev => ({ ...prev, is_active: e.target.checked }))}
                                            />
                                            <label className="form-check-label" htmlFor="userActiveStatus">
                                                <strong>Active User</strong>
                                                <small className="text-muted d-block">User can login and access assigned features</small>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeUserCreationModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-save me-2"></i>Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    } catch (error) {
        console.error('Render Error:', error);
        return (
            <div className="container-fluid p-4">
                <div className="alert alert-danger">
                    <h4>Dashboard Rendering Error</h4>
                    <p>There was an error rendering the dashboard. Please try refreshing the page.</p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }
};

export default SuperAdminDashboard;