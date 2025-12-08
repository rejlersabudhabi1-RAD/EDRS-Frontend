import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AIDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serviceStatus, setServiceStatus] = useState({
        openai_status: 'active',
        document_processing: 'active',
        classification_service: 'active',
        openai_model: 'gpt-4',
        openai_response_time: '1.2s',
        last_updated: '2 minutes ago',
        processing_queue: '0',
        processed_today: '127',
        avg_processing_time: '2.3s',
        classification_accuracy: '96.8%',
        available_categories: '15',
        avg_confidence: '94.2%',
        total_requests: '2,847',
        avg_response_time: '1.4s',
        success_rate: '98.7%',
        error_rate: '1.3%'
    });

    const [aiProcessingStats, setAiProcessingStats] = useState({
        totalProcessed: 2847,
        successRate: 98.7,
        avgProcessingTime: 2.3,
        activeServices: 3
    });

    const [recentActivity, setRecentActivity] = useState([
        {
            id: 1,
            service: 'Document Classification',
            file: 'technical_specs.pdf',
            status: 'completed',
            timestamp: '2024-12-05 14:30:22',
            accuracy: 96.8
        },
        {
            id: 2,
            service: 'AI Analysis',
            file: 'safety_report.docx',
            status: 'completed',
            timestamp: '2024-12-05 14:28:15',
            confidence: 94.2
        },
        {
            id: 3,
            service: 'Content Validation',
            file: 'process_flow.pdf',
            status: 'processing',
            timestamp: '2024-12-05 14:32:01',
            progress: 75
        }
    ]);

    const refreshServices = async () => {
        setLoading(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setServiceStatus(prev => ({
                ...prev,
                last_updated: 'Just now'
            }));
            toast.success('✅ AI services refreshed successfully');
        } catch (error) {
            toast.error('❌ Failed to refresh services');
        } finally {
            setLoading(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000 / 60);
        return diff < 1 ? 'Just now' : diff < 60 ? `${diff}m ago` : `${Math.floor(diff/60)}h ago`;
    };

    const getServiceIcon = (service) => {
        switch(service) {
            case 'Document Classification': return <i className="fas fa-brain"></i>;
            case 'AI Analysis': return <i className="fas fa-robot"></i>;
            case 'Content Validation': return <i className="fas fa-check-circle"></i>;
            default: return <i className="fas fa-cogs"></i>;
        }
    };

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setServiceStatus(prev => ({
                ...prev,
                processed_today: String(parseInt(prev.processed_today) + Math.floor(Math.random() * 3)),
                total_requests: String(parseInt(prev.total_requests.replace(',', '')) + Math.floor(Math.random() * 5)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

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
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px'
                        }}>
                            <i className="fas fa-robot"></i>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                                EDRS
                            </h3>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                AI Hub
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav>
                    {/* Current Module */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '1rem',
                            margin: '0 0 1rem 0'
                        }}>
                            Current Module
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'default',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)'
                                }}
                            >
                                <i className="fas fa-robot" style={{ width: '16px' }}></i>
                                <span style={{ flex: 1 }}>AI Dashboard</span>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.8)'
                                }}></div>
                            </button>
                        </div>
                    </div>

                    {/* Back to Main */}
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
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            textAlign: 'left'
                        }}
                    >
                        <i className="fas fa-arrow-left" style={{ width: '16px' }}></i>
                        <span>Back to Main</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {/* Breadcrumb */}
                <div style={{
                    background: 'white',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '14px'
                }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#8b5cf6',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px',
                            padding: 0
                        }}
                    >
                        Main Dashboard
                    </button>
                    <span style={{ color: '#6b7280' }}>/</span>
                    <button
                        onClick={() => navigate('/edrs/dashboard')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#8b5cf6',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px',
                            padding: 0
                        }}
                    >
                        EDRS Dashboard
                    </button>
                    <span style={{ color: '#6b7280' }}>/</span>
                    <span style={{ color: '#374151', fontWeight: '500' }}>AI Dashboard</span>
                </div>
                
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
                            background: '#8b5cf6',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-robot"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                AI Service Dashboard
                            </h1>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
                                Real-time monitoring and analytics for AI-powered document processing services
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => navigate('/dashboard')}
                                style={{
                                    background: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i>
                                Back to Main
                            </button>
                            <button
                                onClick={refreshServices}
                                style={{
                                    background: '#8b5cf6',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <i className="fas fa-sync-alt" style={{ marginRight: '0.5rem' }}></i>
                                Refresh Status
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    {/* Processing Statistics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{aiProcessingStats.totalProcessed.toLocaleString()}</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Total AI Processes</div>
                                </div>
                                <i className="fas fa-robot" style={{ color: '#8b5cf6', fontSize: '20px' }}></i>
                            </div>
                        </div>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{aiProcessingStats.successRate}%</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Success Rate</div>
                                </div>
                                <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '20px' }}></i>
                            </div>
                        </div>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{aiProcessingStats.avgProcessingTime} min</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Avg Processing Time</div>
                                </div>
                                <i className="fas fa-clock" style={{ color: '#f59e0b', fontSize: '20px' }}></i>
                            </div>
                        </div>
                    </div>

                    {/* AI Services Status and Recent Activity */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        {/* AI Services Status */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                AI Services Status
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* OpenAI Service */}
                                <div style={{
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <i className="fas fa-robot" style={{ color: '#8b5cf6', fontSize: '16px' }}></i>
                                        <span style={{ fontWeight: '600', color: '#1f2937' }}>OpenAI GPT-4</span>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: serviceStatus.openai_status === 'active' ? '#10b981' : '#ef4444',
                                            marginLeft: 'auto'
                                        }}></div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                        Response Time: {serviceStatus.openai_response_time} | Last Check: {serviceStatus.last_updated}
                                    </div>
                                </div>

                                {/* Document Processing */}
                                <div style={{
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <i className="fas fa-file-alt" style={{ color: '#3b82f6', fontSize: '16px' }}></i>
                                        <span style={{ fontWeight: '600', color: '#1f2937' }}>Document Processing</span>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: serviceStatus.document_processing === 'active' ? '#10b981' : '#ef4444',
                                            marginLeft: 'auto'
                                        }}></div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                        Queue: {serviceStatus.processing_queue} | Processed Today: {serviceStatus.processed_today}
                                    </div>
                                </div>

                                {/* AI Classification */}
                                <div style={{
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <i className="fas fa-brain" style={{ color: '#10b981', fontSize: '16px' }}></i>
                                        <span style={{ fontWeight: '600', color: '#1f2937' }}>AI Classification</span>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: serviceStatus.classification_service === 'active' ? '#10b981' : '#ef4444',
                                            marginLeft: 'auto'
                                        }}></div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                        Accuracy: {serviceStatus.classification_accuracy} | Categories: {serviceStatus.available_categories}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    onClick={refreshServices}
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        background: loading ? '#d1d5db' : '#8b5cf6',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                                            Refreshing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-sync-alt" style={{ marginRight: '0.5rem' }}></i>
                                            Refresh All Services
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recent AI Activity */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Recent AI Activity
                            </h3>
                            
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: '#f9fafb',
                                        borderRadius: '8px',
                                        marginBottom: '0.75rem',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: activity.status === 'completed' ? '#dcfce7' : 
                                                       activity.status === 'processing' ? '#fef3c7' : '#fecaca',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: activity.status === 'completed' ? '#16a34a' :
                                                   activity.status === 'processing' ? '#d97706' : '#dc2626'
                                        }}>
                                            {getServiceIcon(activity.service)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                                                    {activity.service}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                                    {formatTimestamp(activity.timestamp)}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                {activity.file}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {activity.status === 'completed' && activity.accuracy && (
                                                    <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '500' }}>
                                                        Accuracy: {activity.accuracy}%
                                                    </span>
                                                )}
                                                {activity.status === 'completed' && activity.confidence && (
                                                    <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '500' }}>
                                                        Confidence: {activity.confidence}%
                                                    </span>
                                                )}
                                                {activity.status === 'processing' && (
                                                    <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '500' }}>
                                                        Progress: {activity.progress}%
                                                    </span>
                                                )}
                                                <span style={{
                                                    padding: '0.125rem 0.5rem',
                                                    borderRadius: '12px',
                                                    fontSize: '10px',
                                                    fontWeight: '500',
                                                    background: activity.status === 'completed' ? '#dcfce7' : 
                                                               activity.status === 'processing' ? '#fef3c7' : '#fecaca',
                                                    color: activity.status === 'completed' ? '#16a34a' :
                                                           activity.status === 'processing' ? '#d97706' : '#dc2626'
                                                }}>
                                                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                                </span>
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
    );
};

export default AIDashboard;