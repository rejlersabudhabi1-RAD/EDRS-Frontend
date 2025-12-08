import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIProcessingModule = () => {
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
                                onClick={() => navigate('/edrs/ai-processing')}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    background: '#06b6d415',
                                    color: '#06b6d4',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-brain" style={{ width: '16px' }}></i>
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
                            AI Tools
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
                                <i className="fas fa-eye" style={{ width: '16px', color: '#06b6d4' }}></i>
                                OCR Processing
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
                                <i className="fas fa-shapes" style={{ width: '16px', color: '#10b981' }}></i>
                                Symbol Detection
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
                                <i className="fas fa-robot" style={{ width: '16px', color: '#8b5cf6' }}></i>
                                Model Training
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
                            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-brain"></i>
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                AI Processing Engine
                            </h1>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '16px' }}>
                                Advanced machine learning models for document recognition and analysis
                            </p>
                        </div>
                    </div>
                    <div>
                        <button style={{
                            background: '#06b6d4',
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
                            <i className="fas fa-play"></i>
                            Run AI Process
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    {/* AI Performance Cards */}
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
                                    background: '#06b6d415',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#06b6d4',
                                    fontSize: '20px'
                                }}>
                                    <i className="fas fa-eye"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>99.2%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>15,847</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>OCR Operations</p>
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
                                    <i className="fas fa-shapes"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>96.8%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>8,523</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Symbols Detected</p>
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
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>Active</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>7</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>ML Models Running</p>
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
                                <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '500' }}>-12%</div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>1.8s</h3>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Avg Processing Time</p>
                        </div>
                    </div>

                    {/* AI Models and Processing Queue */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        {/* Active AI Models */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Active AI Models
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { name: 'OCR-Vision v2.1', type: 'Text Recognition', status: 'Running', accuracy: '99.2%', color: '#06b6d4' },
                                    { name: 'SymbolNet Pro', type: 'Symbol Detection', status: 'Running', accuracy: '96.8%', color: '#10b981' },
                                    { name: 'LayoutAnalyzer', type: 'Structure Analysis', status: 'Running', accuracy: '94.5%', color: '#8b5cf6' },
                                    { name: 'DataExtract AI', type: 'Information Extraction', status: 'Standby', accuracy: '97.1%', color: '#f59e0b' }
                                ].map((model, index) => (
                                    <div key={index} style={{ 
                                        padding: '1rem', 
                                        background: '#f9fafb', 
                                        borderRadius: '8px',
                                        border: '1px solid #f3f4f6'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: model.status === 'Running' ? '#10b981' : '#f59e0b'
                                                }}></div>
                                                <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{model.name}</span>
                                            </div>
                                            <span style={{ 
                                                fontSize: '12px', 
                                                fontWeight: '500',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                background: model.status === 'Running' ? '#10b98115' : '#f59e0b15',
                                                color: model.status === 'Running' ? '#10b981' : '#f59e0b'
                                            }}>
                                                {model.status}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', color: '#6b7280' }}>{model.type}</span>
                                            <span style={{ fontSize: '12px', fontWeight: '500', color: model.color }}>
                                                Accuracy: {model.accuracy}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Processing Queue */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Processing Queue
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { file: 'Plant_Layout_A.pdf', progress: 85, status: 'Processing', eta: '2m' },
                                    { file: 'Equipment_Specs.dwg', progress: 45, status: 'Processing', eta: '5m' },
                                    { file: 'Process_Flow_B.pdf', progress: 0, status: 'Queued', eta: '8m' },
                                    { file: 'Instruments_List.xlsx', progress: 100, status: 'Complete', eta: 'Done' }
                                ].map((item, index) => (
                                    <div key={index} style={{ 
                                        padding: '1rem', 
                                        background: '#f9fafb', 
                                        borderRadius: '8px',
                                        border: '1px solid #f3f4f6'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <span style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>{item.file}</span>
                                            <span style={{ fontSize: '12px', color: '#6b7280' }}>ETA: {item.eta}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span style={{ 
                                                fontSize: '12px', 
                                                fontWeight: '500',
                                                color: item.status === 'Complete' ? '#10b981' : 
                                                      item.status === 'Processing' ? '#06b6d4' : '#f59e0b'
                                            }}>
                                                {item.status}
                                            </span>
                                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>
                                                {item.progress}%
                                            </span>
                                        </div>
                                        <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${item.progress}%`,
                                                height: '100%',
                                                background: item.status === 'Complete' ? '#10b981' : 
                                                          item.status === 'Processing' ? '#06b6d4' : '#f59e0b',
                                                transition: 'width 0.3s ease'
                                            }}></div>
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

export default AIProcessingModule;