import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuperAdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            // Redirect to login if no token
            navigate('/login');
            return;
        }

        // Load user data from localStorage
        const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
        
        // Validate user data
        if (!userInfo.id) {
            navigate('/login');
            return;
        }

        setUser(userInfo);
        setLoading(false);
    }, [navigate]);

    // EDRS Features Configuration
    const edrsFeatures = {
        pfdToPid: {
            title: 'PFD to P&ID Conversion',
            description: 'AI-powered conversion from Process Flow Diagrams to detailed P&IDs',
            icon: 'fas fa-exchange-alt',
            status: 'active',
            processedDrawings: 2847,
            accuracy: 97.3
        },
        documentValidation: {
            title: 'Document Validation',
            description: 'Comprehensive validation engine for engineering documents',
            icon: 'fas fa-shield-check',
            status: 'active',
            validatedDocs: 1563,
            accuracy: 99.1
        },
        documentUpload: {
            title: 'Document Upload',
            description: 'Intelligent document processing and storage system',
            icon: 'fas fa-cloud-upload-alt',
            status: 'active',
            uploadedFiles: 487,
            accuracy: 98.5
        },
        analyticsReporting: {
            title: 'Analytics & Reporting',
            description: 'Advanced analytics dashboard with comprehensive reporting',
            icon: 'fas fa-chart-line',
            status: 'active',
            generatedReports: 2156,
            accuracy: 98.5
        },
        aiProcessing: {
            title: 'AI Processing Engine',
            description: 'Core AI engine handling OCR and intelligent data extraction',
            icon: 'fas fa-brain',
            status: 'active',
            processedElements: 15647,
            accuracy: 96.7
        },
        projectManagement: {
            title: 'Project Management',
            description: 'Comprehensive project management with version control',
            icon: 'fas fa-project-diagram',
            status: 'active',
            managedProjects: 342,
            accuracy: 99.2
        }
    };

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

    return (
        <div className="dashboard-bg min-vh-100">
            <div className="container-fluid p-4">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="glass-card p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2 className="fw-bold mb-2 text-dark">
                                        <i className="fas fa-tachometer-alt text-primary me-3"></i>
                                        Super Admin Dashboard
                                    </h2>
                                    <p className="text-muted mb-0">
                                        Welcome to Rejlers AI-Powered ERP System for Oil & Gas Engineering
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <div className="user-welcome me-3">
                                        <small className="text-muted">Welcome back,</small>
                                        <span className="fw-bold text-dark ms-1">
                                            {user ? `${user.first_name || user.username}` : 'Admin'}
                                        </span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">
                                        <i className="fas fa-plus me-2"></i>New Project
                                    </button>
                                    <button className="btn btn-glass btn-sm" onClick={() => {
                                        localStorage.clear();
                                        navigate('/home');
                                    }}>
                                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-xl-3 col-lg-6">
                        <div className="glass-card p-4 h-100">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                                    <i className="fas fa-project-diagram text-primary fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0 text-dark">342</h4>
                                    <small className="text-muted">Active Projects</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div className="glass-card p-4 h-100">
                            <div className="d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                                    <i className="fas fa-users text-success fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0 text-dark">1,247</h4>
                                    <small className="text-muted">Active Users</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div className="glass-card p-4 h-100">
                            <div className="d-flex align-items-center">
                                <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                                    <i className="fas fa-file-pdf text-warning fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0 text-dark">8,956</h4>
                                    <small className="text-muted">Documents Processed</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                        <div className="glass-card p-4 h-100">
                            <div className="d-flex align-items-center">
                                <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                                    <i className="fas fa-brain text-info fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0 text-dark">98.7%</h4>
                                    <small className="text-muted">AI Accuracy</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDRS Module Navigator */}
                <div className="row">
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
                                            }}>
                                                
                                                <div className="d-flex align-items-start justify-content-between mb-3">
                                                    <div className={`${
                                                        key === 'pfdToPid' ? 'bg-primary' :
                                                        key === 'documentValidation' ? 'bg-success' :
                                                        key === 'documentUpload' ? 'bg-warning' :
                                                        key === 'analyticsReporting' ? 'bg-purple' :
                                                        key === 'aiProcessing' ? 'bg-danger' :
                                                        'bg-info'
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
                                                
                                                <div className="d-grid gap-2">
                                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                                        const moduleRoutes = {
                                                            pfdToPid: '/edrs/pdf-to-pid',



                                                            aiProcessing: '/edrs/ai-engine',

                                                        };
                                                        toast.info(`Launching ${feature.title}...`);
                                                        if (moduleRoutes[key]) {
                                                            navigate(moduleRoutes[key]);
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;