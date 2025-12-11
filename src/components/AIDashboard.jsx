import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AIDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [hoveredCard, setHoveredCard] = useState(null);

    // Soft-coded AI Services Configuration
    const aiServicesConfig = [
        {
            id: 'openai',
            name: 'OpenAI GPT-4',
            icon: 'fas fa-brain',
            status: 'active',
            color: '#10b981',
            bgColor: '#d1fae5',
            model: 'GPT-4 Turbo',
            responseTime: '1.2s',
            requests: '2,847',
            successRate: '98.7%',
            description: 'Advanced language model for document analysis'
        },
        {
            id: 'vision',
            name: 'Vision AI',
            icon: 'fas fa-eye',
            status: 'active',
            color: '#3b82f6',
            bgColor: '#dbeafe',
            model: 'GPT-4 Vision',
            responseTime: '2.1s',
            requests: '1,523',
            successRate: '96.4%',
            description: 'Image and diagram processing with AI'
        },
        {
            id: 'classification',
            name: 'Document Classifier',
            icon: 'fas fa-tags',
            status: 'active',
            color: '#8b5cf6',
            bgColor: '#ede9fe',
            model: 'Custom ML',
            responseTime: '0.8s',
            requests: '5,231',
            successRate: '97.2%',
            description: 'Intelligent document categorization'
        },
        {
            id: 'extraction',
            name: 'Data Extractor',
            icon: 'fas fa-database',
            status: 'active',
            color: '#f59e0b',
            bgColor: '#fef3c7',
            model: 'NLP Pipeline',
            responseTime: '1.5s',
            requests: '3,142',
            successRate: '95.8%',
            description: 'Extract structured data from documents'
        }
    ];

    // Soft-coded Stats Cards Configuration
    const statsCardsConfig = [
        {
            id: 'total',
            title: 'Total AI Requests',
            value: '12,743',
            change: '+12.5%',
            changeType: 'increase',
            icon: 'fas fa-robot',
            color: '#8b5cf6',
            bgGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        },
        {
            id: 'success',
            title: 'Success Rate',
            value: '97.8%',
            change: '+2.3%',
            changeType: 'increase',
            icon: 'fas fa-check-circle',
            color: '#10b981',
            bgGradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        {
            id: 'processing',
            title: 'Avg Processing Time',
            value: '1.4s',
            change: '-0.3s',
            changeType: 'decrease',
            icon: 'fas fa-clock',
            color: '#3b82f6',
            bgGradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        },
        {
            id: 'active',
            title: 'Active Services',
            value: '4',
            change: '100%',
            changeType: 'stable',
            icon: 'fas fa-server',
            color: '#f59e0b',
            bgGradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
        }
    ];

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
        activeServices: 4
    });

    // Soft-coded Recent Activity Configuration
    const [recentActivity, setRecentActivity] = useState([
        {
            id: 1,
            service: 'Document Classification',
            file: 'technical_specs.pdf',
            status: 'completed',
            timestamp: '2024-12-05 14:30:22',
            accuracy: 96.8,
            icon: 'fas fa-tags',
            color: '#10b981',
            badge: 'success'
        },
        {
            id: 2,
            service: 'AI Analysis',
            file: 'safety_report.docx',
            status: 'completed',
            timestamp: '2024-12-05 14:28:15',
            confidence: 94.2,
            icon: 'fas fa-robot',
            color: '#3b82f6',
            badge: 'success'
        },
        {
            id: 3,
            service: 'Content Validation',
            file: 'process_flow.pdf',
            status: 'processing',
            timestamp: '2024-12-05 14:32:01',
            progress: 75,
            icon: 'fas fa-spinner fa-spin',
            color: '#f59e0b',
            badge: 'processing'
        },
        {
            id: 4,
            service: 'Vision AI Processing',
            file: 'pid_diagram.png',
            status: 'completed',
            timestamp: '2024-12-05 14:25:10',
            confidence: 98.1,
            icon: 'fas fa-eye',
            color: '#8b5cf6',
            badge: 'success'
        }
    ]);

    // Soft-coded AI Capabilities Configuration
    const aiCapabilitiesConfig = [
        {
            id: 'nlp',
            title: 'Natural Language Processing',
            icon: 'fas fa-language',
            color: '#10b981',
            features: ['Text Analysis', 'Sentiment Detection', 'Entity Recognition', 'Language Translation']
        },
        {
            id: 'vision',
            title: 'Computer Vision',
            icon: 'fas fa-camera',
            color: '#3b82f6',
            features: ['Image Recognition', 'Object Detection', 'Diagram Analysis', 'OCR Processing']
        },
        {
            id: 'ml',
            title: 'Machine Learning',
            icon: 'fas fa-project-diagram',
            color: '#8b5cf6',
            features: ['Document Classification', 'Pattern Recognition', 'Predictive Analysis', 'Data Mining']
        },
        {
            id: 'automation',
            title: 'Intelligent Automation',
            icon: 'fas fa-magic',
            color: '#f59e0b',
            features: ['Workflow Automation', 'Smart Routing', 'Auto-categorization', 'Quality Checks']
        }
    ];

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
                <div style={{ padding: '2rem' }}>
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
                
                {/* Header with AI Animation */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '2.5rem 2rem',
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Animated Background Pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                        opacity: 0.3
                    }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '28px',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                animation: 'pulse 2s infinite'
                            }}>
                                <i className="fas fa-brain"></i>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '32px', fontWeight: '700', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    🤖 AI Intelligence Hub
                                </h1>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: '500' }}>
                                    Real-time monitoring and analytics for AI-powered document processing • Live Status
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={refreshServices}
                                    disabled={loading}
                                    style={{
                                        background: loading ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.25)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        padding: '0.875rem 1.75rem',
                                        borderRadius: '10px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseEnter={(e) => !loading && (e.target.style.background = 'rgba(255,255,255,0.35)')}
                                    onMouseLeave={(e) => (e.target.style.background = loading ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.25)')}
                                >
                                    <i className={loading ? "fas fa-sync-alt fa-spin" : "fas fa-sync-alt"} style={{ marginRight: '0.5rem' }}></i>
                                    {loading ? 'Refreshing...' : 'Refresh'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Tab Navigation */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                            {[
                                { id: 'overview', label: 'Overview', icon: 'fas fa-home' },
                                { id: 'services', label: 'AI Services', icon: 'fas fa-cogs' },
                                { id: 'activity', label: 'Recent Activity', icon: 'fas fa-history' },
                                { id: 'capabilities', label: 'Capabilities', icon: 'fas fa-lightbulb' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        background: activeTab === tab.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white',
                                        border: activeTab === tab.id ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: activeTab === tab.id ? '600' : '500',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => activeTab !== tab.id && (e.target.style.background = 'rgba(255,255,255,0.2)')}
                                    onMouseLeave={(e) => activeTab !== tab.id && (e.target.style.background = 'rgba(255,255,255,0.1)')}
                                >
                                    <i className={tab.icon}></i>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '0 2rem 2rem 2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                    
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            {/* Interactive Stats Cards with Hover Effects */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                {statsCardsConfig.map(card => (
                                    <div
                                        key={card.id}
                                        onMouseEnter={() => setHoveredCard(card.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            background: hoveredCard === card.id ? card.bgGradient : 'white',
                                            padding: '2rem',
                                            borderRadius: '16px',
                                            border: hoveredCard === card.id ? 'none' : '2px solid #e5e7eb',
                                            boxShadow: hoveredCard === card.id ? '0 20px 40px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                                            transform: hoveredCard === card.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Background Pattern */}
                                        {hoveredCard === card.id && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                                                opacity: 0.3
                                            }}></div>
                                        )}
                                        
                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <div style={{
                                                    width: '56px',
                                                    height: '56px',
                                                    background: hoveredCard === card.id ? 'rgba(255,255,255,0.2)' : `${card.color}15`,
                                                    borderRadius: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.3s ease',
                                                    backdropFilter: hoveredCard === card.id ? 'blur(10px)' : 'none'
                                                }}>
                                                    <i className={card.icon} style={{ 
                                                        color: hoveredCard === card.id ? 'white' : card.color, 
                                                        fontSize: '24px',
                                                        transition: 'color 0.3s ease'
                                                    }}></i>
                                                </div>
                                                <div style={{
                                                    background: hoveredCard === card.id ? 'rgba(255,255,255,0.2)' : card.changeType === 'increase' ? '#d1fae5' : card.changeType === 'decrease' ? '#dbeafe' : '#f3f4f6',
                                                    color: hoveredCard === card.id ? 'white' : card.changeType === 'increase' ? '#059669' : card.changeType === 'decrease' ? '#2563eb' : '#6b7280',
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <i className={card.changeType === 'increase' ? 'fas fa-arrow-up' : card.changeType === 'decrease' ? 'fas fa-arrow-down' : 'fas fa-minus'}></i>
                                                    {card.change}
                                                </div>
                                            </div>
                                            <div style={{ 
                                                fontSize: '36px', 
                                                fontWeight: '700', 
                                                color: hoveredCard === card.id ? 'white' : '#1f2937',
                                                marginBottom: '0.5rem',
                                                transition: 'color 0.3s ease',
                                                letterSpacing: '-0.02em'
                                            }}>
                                                {card.value}
                                            </div>
                                            <div style={{ 
                                                fontSize: '15px', 
                                                color: hoveredCard === card.id ? 'rgba(255,255,255,0.9)' : '#6b7280',
                                                fontWeight: '500',
                                                transition: 'color 0.3s ease'
                                            }}>
                                                {card.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* AI Services Tab */}
                    {activeTab === 'services' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                            {aiServicesConfig.map(service => (
                                <div
                                    key={service.id}
                                    style={{
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '16px',
                                        border: '2px solid #e5e7eb',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = service.color;
                                        e.currentTarget.style.boxShadow = `0 8px 24px ${service.color}30`;
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            background: service.bgColor,
                                            borderRadius: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <i className={service.icon} style={{ color: service.color, fontSize: '24px' }}></i>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                                                    {service.name}
                                                </h4>
                                                <div style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    background: service.status === 'active' ? '#10b981' : '#ef4444',
                                                    animation: service.status === 'active' ? 'pulse 2s infinite' : 'none'
                                                }}></div>
                                            </div>
                                            <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
                                            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.25rem' }}>Model</div>
                                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>{service.model}</div>
                                        </div>
                                        <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
                                            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.25rem' }}>Response</div>
                                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>{service.responseTime}</div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: `${service.color}10`, borderRadius: '8px' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Requests</div>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: service.color }}>{service.requests}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Success Rate</div>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: service.color }}>{service.successRate}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recent Activity Tab */}
                    {activeTab === 'activity' && (
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

                        {/* Recent AI Activity - Enhanced */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '2px solid #e5e7eb',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                                    <i className="fas fa-history" style={{ marginRight: '0.75rem', color: '#8b5cf6' }}></i>
                                    Live Activity Feed
                                </h3>
                                <div style={{
                                    padding: '0.5rem 1rem',
                                    background: '#10b98115',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#059669',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        animation: 'pulse 2s infinite'
                                    }}></div>
                                    LIVE
                                </div>
                            </div>
                            
                            <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                {recentActivity.map((activity, index) => (
                                    <div key={activity.id} style={{
                                        padding: '1.25rem',
                                        background: index === 0 ? `${activity.color}08` : '#f9fafb',
                                        borderRadius: '12px',
                                        marginBottom: '1rem',
                                        border: `2px solid ${index === 0 ? activity.color + '30' : '#e5e7eb'}`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = activity.color;
                                        e.currentTarget.style.boxShadow = `0 4px 12px ${activity.color}30`;
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = index === 0 ? activity.color + '30' : '#e5e7eb';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '12px',
                                                background: `${activity.color}20`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: activity.color,
                                                fontSize: '18px',
                                                flexShrink: 0
                                            }}>
                                                <i className={activity.icon}></i>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '15px' }}>
                                                        {activity.service}
                                                    </span>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '20px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        background: activity.badge === 'success' ? '#d1fae5' : activity.badge === 'processing' ? '#fef3c7' : '#fecaca',
                                                        color: activity.badge === 'success' ? '#059669' : activity.badge === 'processing' ? '#d97706' : '#dc2626'
                                                    }}>
                                                        {activity.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <i className="fas fa-file-alt" style={{ fontSize: '11px' }}></i>
                                                    {activity.file}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        {activity.accuracy && (
                                                            <span style={{ fontSize: '12px', color: activity.color, fontWeight: '600' }}>
                                                                📊 Accuracy: {activity.accuracy}%
                                                            </span>
                                                        )}
                                                        {activity.confidence && (
                                                            <span style={{ fontSize: '12px', color: activity.color, fontWeight: '600' }}>
                                                                🎯 Confidence: {activity.confidence}%
                                                            </span>
                                                        )}
                                                        {activity.progress && (
                                                            <span style={{ fontSize: '12px', color: activity.color, fontWeight: '600' }}>
                                                                ⏳ Progress: {activity.progress}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                                                        <i className="fas fa-clock" style={{ marginRight: '0.25rem' }}></i>
                                                        {formatTimestamp(activity.timestamp)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    )}

                    {/* AI Capabilities Tab */}
                    {activeTab === 'capabilities' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                            {aiCapabilitiesConfig.map(capability => (
                                <div
                                    key={capability.id}
                                    style={{
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '16px',
                                        border: '2px solid #e5e7eb',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = capability.color;
                                        e.currentTarget.style.boxShadow = `0 8px 24px ${capability.color}30`;
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            background: `${capability.color}15`,
                                            borderRadius: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className={capability.icon} style={{ color: capability.color, fontSize: '26px' }}></i>
                                        </div>
                                        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                                            {capability.title}
                                        </h4>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                                        {capability.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    padding: '1rem',
                                                    background: '#f9fafb',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = `${capability.color}10`;
                                                    e.currentTarget.style.transform = 'translateX(4px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f9fafb';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}
                                            >
                                                <div style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: capability.color
                                                }}></div>
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                                    {feature}
                                                </span>
                                                <i className="fas fa-check-circle" style={{ marginLeft: 'auto', color: capability.color, fontSize: '14px' }}></i>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Add keyframe animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.05);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Custom scrollbar for activity feed */
                div::-webkit-scrollbar {
                    width: 8px;
                }
                
                div::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                
                div::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                
                div::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default AIDashboard;