import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManagementModule = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-bg min-vh-100 p-4">
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="glass-card p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h3 className="fw-bold mb-2 text-dark">
                                        <i className="fas fa-project-diagram text-info me-3"></i>
                                        Project & Asset Management
                                    </h3>
                                    <p className="text-muted mb-0">Comprehensive project management with drawing version control and asset tracking</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-glass" onClick={() => navigate('/dashboard')}>
                                        <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        <div className="glass-card p-5 text-center">
                            <i className="fas fa-project-diagram text-info" style={{fontSize: '4rem'}}></i>
                            <h4 className="fw-bold mt-4 mb-3 text-dark">Project Management Under Development</h4>
                            <p className="text-muted mb-4">Advanced project management features with comprehensive asset tracking and version control systems.</p>
                            <div className="row g-3 justify-content-center">
                                <div className="col-md-6 col-lg-4">
                                    <div className="p-3 border border-opacity-25 rounded-3">
                                        <i className="fas fa-tasks text-primary fs-4 mb-2"></i>
                                        <h6 className="fw-bold mb-1">Multi-Project Management</h6>
                                        <small className="text-muted">Organize multiple projects</small>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="p-3 border border-opacity-25 rounded-3">
                                        <i className="fas fa-code-branch text-success fs-4 mb-2"></i>
                                        <h6 className="fw-bold mb-1">Version Control</h6>
                                        <small className="text-muted">Drawing versioning</small>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="p-3 border border-opacity-25 rounded-3">
                                        <i className="fas fa-cubes text-warning fs-4 mb-2"></i>
                                        <h6 className="fw-bold mb-1">Asset Tracking</h6>
                                        <small className="text-muted">Lifecycle management</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManagementModule;