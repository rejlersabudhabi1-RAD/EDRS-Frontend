import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalyticsModule = () => {
    const navigate = useNavigate();

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
                                background: 'transparent',
                                color: '#6b7280',
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
                            <button
                                onClick={() => navigate('/edrs/pdf-to-pid')}
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
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-file-pdf" style={{ width: '16px', color: '#ef4444' }}></i>
                                <span style={{ flex: 1 }}>PDF to P&ID</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></div>
                            </button>
                            <button
                                onClick={() => navigate('/edrs/document-validation')}
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
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-shield-alt" style={{ width: '16px', color: '#10b981' }}></i>
                                <span style={{ flex: 1 }}>Document Validation</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></div>
                            </button>
                            <button
                                onClick={() => navigate('/edrs/document-upload')}
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
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-upload" style={{ width: '16px', color: '#f59e0b' }}></i>
                                <span style={{ flex: 1 }}>Document Upload</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#f59e0b'
                                }}></div>
                            </button>
                            <button
onClick={() => navigate('/edrs/analytics')}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    background: '#8b5cf615',
                                    color: '#8b5cf6',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-chart-bar" style={{ width: '16px' }}></i>
                                <span style={{ flex: 1 }}>Analytics Engine</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></div>
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
                                <i className="fas fa-brain" style={{ width: '16px', color: '#06b6d4' }}></i>
                                <span style={{ flex: 1 }}>AI Processing</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></div>
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
                                <i className="fas fa-project-diagram" style={{ width: '16px', color: '#f97316' }}></i>
                                <span style={{ flex: 1 }}>Project Manager</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#f59e0b'
                                }}></div>
                            </button>
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
                                <i className="fas fa-file-export" style={{ width: '16px', color: '#8b5cf6' }}></i>
                                Export Report
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
                                <i className="fas fa-chart-line" style={{ width: '16px', color: '#10b981' }}></i>
                                Generate Report
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
                                <i className="fas fa-cog" style={{ width: '16px', color: '#f59e0b' }}></i>
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Back to Main */}
                    <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                background: '#f3f4f6',
                                color: '#374151',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left'
                            }}
                        >
                            <i className="fas fa-arrow-left" style={{ width: '16px' }}></i>
                            Main Dashboard
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-chart-bar"></i>
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                Analytics Engine
                            </h1>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '16px' }}>
                                Advanced analytics and performance insights for EDRS operations
                            </p>
                        </div>
                    </div>
                    <div>
                        <button style={{
                            background: '#8b5cf6',
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
                            <i className="fas fa-file-export"></i>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    {/* Analytics Overview Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#3b82f615',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3b82f6',
                                    fontSize: '20px'
                                }}>
                                    <i className="fas fa-file-alt"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>+12.5%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>2,847</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Documents Processed</p>
                        </div>
                        
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#10b98115',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#10b981',
                                    fontSize: '20px'
                                }}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>+8.3%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>94.2%</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Success Rate</p>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#f59e0b15',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#f59e0b',
                                    fontSize: '20px'
                                }}>
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '500' }}>-5.1%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>2.4s</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Avg Processing Time</p>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#8b5cf615',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#8b5cf6',
                                    fontSize: '20px'
                                }}>
                                    <i className="fas fa-users"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>+15.7%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>127</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Active Users</p>
                        </div>
                    </div>

                    {/* Charts and Analytics Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        {/* Main Chart */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Processing Performance
                            </h3>
                            <div style={{ 
                                height: '300px', 
                                background: '#f9fafb', 
                                borderRadius: '8px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                border: '2px dashed #e5e7eb'
                            }}>
                                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                                    <i className="fas fa-chart-line" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#8b5cf6' }}></i>
                                    <h4 style={{ margin: 0, fontWeight: '600' }}>Interactive Chart</h4>
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px' }}>Real-time processing analytics</p>
                                </div>
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                System Health
                            </h3>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '14px', color: '#6b7280' }}>CPU Usage</span>
                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>72%</span>
                                </div>
                                <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        width: '72%', 
                                        height: '100%', 
                                        background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Memory</span>
                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>58%</span>
                                </div>
                                <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        width: '58%', 
                                        height: '100%', 
                                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Storage</span>
                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>84%</span>
                                </div>
                                <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        width: '84%', 
                                        height: '100%', 
                                        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                            </div>

                            <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>System Status</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>All systems operational</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsModule;