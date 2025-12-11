import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EDRSLayout = ({ children, title, description, icon, color }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
        const userRole = JSON.parse(localStorage.getItem('user_role') || '{}');
        setUser(userInfo);
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_role');
        navigate('/login');
    };

    const dashboardSections = {
        overview: { title: 'Overview', icon: 'fas fa-home', color: '#3b82f6', path: '/dashboard' },
        edrs: {
            title: 'EDRS Platform',
            icon: 'fas fa-file-alt',
            color: '#10b981',
            path: '/dashboard',
            subsections: [
                { id: 'ai-dashboard', title: 'AI Dashboard', path: '/ai-dashboard' },
                { id: 'pdf-to-pid', title: 'PFD to P&ID', path: '/pdf-to-pid' },
                { id: 'document-upload', title: 'Document Upload', path: '/document-upload' }
            ]
        },
        csr: {
            title: 'CRS Platform',
            icon: 'fas fa-shield-alt',
            color: '#8b5cf6',
            path: '/dashboard',
            subsections: [
                { id: 'process-hse', title: 'Process and HSE', path: '/crs/process-hse' },
                { id: 'civil-structure', title: 'Civil and Structure', path: '/crs/civil-structure' },
                { id: 'instrumentation-control', title: 'I&C', path: '/crs/instrumentation-control' }
            ]
        },
        analytics: { title: 'Analytics', icon: 'fas fa-chart-line', color: '#f59e0b', path: '/dashboard' },
        settings: { title: 'Settings', icon: 'fas fa-cog', color: '#6b7280', path: '/dashboard' }
    };

    return (
        <div className="edrs-layout">
            <style>{`
                .edrs-layout {
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
                    position: fixed;
                    height: 100vh;
                    overflow-y: auto;
                    z-index: 1000;
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
                    background: linear-gradient(135deg, #10b981, #059669);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    flex-shrink: 0;
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
                    cursor: pointer;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                }

                .nav-link:hover {
                    background: #f3f4f6;
                    color: #1f2937;
                }

                .nav-link.active {
                    background: #d1fae5;
                    color: #059669;
                }

                .nav-icon {
                    width: 20px;
                    margin-right: 12px;
                    flex-shrink: 0;
                }

                .nav-text {
                    flex: 1;
                    white-space: ${sidebarCollapsed ? 'nowrap' : 'normal'};
                    overflow: hidden;
                    text-overflow: ellipsis;
                    opacity: ${sidebarCollapsed ? '0' : '1'};
                    transition: opacity 0.3s ease;
                }

                .nav-chevron {
                    font-size: 12px;
                    transition: transform 0.3s ease;
                    margin-left: auto;
                }

                .nav-chevron.expanded {
                    transform: rotate(180deg);
                }

                .sub-nav {
                    padding-left: 1rem;
                    margin-top: 0.5rem;
                }

                .sub-nav-item {
                    display: block;
                    padding: 0.5rem 1rem 0.5rem 2.5rem;
                    color: #6b7280;
                    text-decoration: none;
                    font-size: 13px;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                    margin: 0.25rem 0;
                }

                .sub-nav-item:hover {
                    background: #f9fafb;
                    color: #1f2937;
                }

                .sub-nav-item.active {
                    background: #d1fae5;
                    color: #10b981;
                    font-weight: 500;
                }

                .sidebar-footer {
                    padding: 1rem;
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
                    border-radius: 8px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .user-info {
                    flex: 1;
                    opacity: ${sidebarCollapsed ? '0' : '1'};
                    transition: opacity 0.3s ease;
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

                .main-content-wrapper {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-left: ${sidebarCollapsed ? '80px' : '280px'};
                    transition: margin-left 0.3s ease;
                }

                .main-header {
                    background: white;
                    padding: 1rem 2rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: sticky;
                    top: 0;
                    z-index: 100;
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

                .header-icon {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, ${color}, ${color}dd);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
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
                    overflow-y: auto;
                }

                @media (max-width: 768px) {
                    .modern-sidebar {
                        transform: ${sidebarCollapsed ? 'translateX(-280px)' : 'translateX(0)'};
                    }

                    .main-content-wrapper {
                        margin-left: 0;
                    }
                }
            `}</style>

            {/* Sidebar */}
            <div className="modern-sidebar">
                <div className="sidebar-header">
                    <div className="company-logo">
                        <i className="fas fa-oil-well"></i>
                    </div>
                    {!sidebarCollapsed && (
                        <div>
                            <h3 className="company-name">Rejlers</h3>
                            <p className="company-tagline">Engineering Excellence</p>
                        </div>
                    )}
                </div>

                <nav className="sidebar-nav">
                    {Object.entries(dashboardSections).map(([key, section]) => {
                        const isActive = key === 'edrs';
                        const hasSubsections = section.subsections && section.subsections.length > 0;
                        
                        return (
                            <div key={key} className="nav-section">
                                <div className="nav-item">
                                    <button
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                        onClick={() => navigate(section.path)}
                                    >
                                        <i className={`nav-icon ${section.icon}`} style={{ color: section.color }}></i>
                                        <span className="nav-text">{section.title}</span>
                                    </button>
                                </div>

                                {hasSubsections && isActive && !sidebarCollapsed && (
                                    <div className="sub-nav">
                                        {section.subsections.map((sub) => (
                                            <a
                                                key={sub.id}
                                                href="#"
                                                className={`sub-nav-item ${location.pathname === sub.path ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(sub.path);
                                                }}
                                            >
                                                {sub.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">
                            {user?.first_name?.charAt(0) || 'U'}
                        </div>
                        {!sidebarCollapsed && (
                            <div className="user-info">
                                <h6>{user?.first_name} {user?.last_name}</h6>
                                <small>{role?.description || 'User'}</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content-wrapper">
                <header className="main-header">
                    <div className="header-title">
                        <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                            <i className={`fas ${sidebarCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
                        </button>
                        <div className="header-icon">
                            <i className={icon}></i>
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
                                {title}
                            </h1>
                            <small style={{ color: '#6b7280' }}>{description}</small>
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
                    {children}
                </div>
            </div>
        </div>
    );
};

export default EDRSLayout;
