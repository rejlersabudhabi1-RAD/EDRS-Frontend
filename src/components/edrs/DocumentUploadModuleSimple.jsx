import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DocumentUploadModule = () => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [processingStats, setProcessingStats] = useState({
        totalUploaded: 1247,
        successRate: 97.8,
        avgProcessingTime: 1.9,
        activeProcesses: 3
    });

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(files);
        toast.success(`${files.length} file(s) uploaded successfully`);
    };

    const startProcessing = async () => {
        if (uploadedFiles.length === 0) {
            toast.error('Please upload files first');
            return;
        }
        
        setProcessing(true);
        toast.info('🤖 Starting AI-powered document processing...');
        
        try {
            // Simulate AI processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const results = uploadedFiles.map((file, index) => ({
                id: index + 1,
                fileName: file.name,
                status: 'Processed',
                confidence: Math.floor(Math.random() * 10) + 90 + '%',
                category: ['Technical Document', 'Safety Report', 'Process Manual', 'Compliance Document'][Math.floor(Math.random() * 4)],
                processingTime: (Math.random() * 2 + 0.5).toFixed(1) + 's',
                size: (file.size / 1024 / 1024).toFixed(1) + 'MB'
            }));
            
            setProcessing(false);
            toast.success(`🎉 AI processing completed! ${results.length} files processed successfully`);
            
        } catch (error) {
            console.error('AI processing error:', error);
            setProcessing(false);
            toast.error('🔥 AI processing failed: ' + error.message);
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
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px'
                        }}>
                            <i className="fas fa-upload"></i>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                                EDRS
                            </h3>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                Document Hub
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
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'default',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                <i className="fas fa-upload" style={{ width: '16px' }}></i>
                                <span style={{ flex: 1 }}>Document Upload</span>
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
                            color: '#10b981',
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
                            color: '#10b981',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px',
                            padding: 0
                        }}
                    >
                        EDRS Dashboard
                    </button>
                    <span style={{ color: '#6b7280' }}>/</span>
                    <span style={{ color: '#374151', fontWeight: '500' }}>Document Upload</span>
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
                            background: '#10b981',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-upload"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                AI Document Upload
                            </h1>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
                                Upload documents for intelligent AI classification and processing
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
                                onClick={startProcessing}
                                style={{
                                    background: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <i className="fas fa-play" style={{ marginRight: '0.5rem' }}></i>
                                Start Processing
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{processingStats.totalUploaded.toLocaleString()}</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Total Documents</div>
                                </div>
                                <i className="fas fa-file-upload" style={{ color: '#10b981', fontSize: '20px' }}></i>
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{processingStats.successRate}%</div>
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>{processingStats.avgProcessingTime} min</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Avg Processing Time</div>
                                </div>
                                <i className="fas fa-clock" style={{ color: '#f59e0b', fontSize: '20px' }}></i>
                            </div>
                        </div>
                    </div>

                    {/* Upload and Processing Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        {/* File Upload */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Upload Documents
                            </h3>
                            <div style={{
                                border: '2px dashed #d1d5db',
                                borderRadius: '8px',
                                padding: '2rem',
                                textAlign: 'center',
                                background: '#f9fafb'
                            }}>
                                <i className="fas fa-upload" style={{ fontSize: '2rem', color: '#6b7280', marginBottom: '1rem' }}></i>
                                <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
                                    Drag & drop files or click to browse
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt,.csv,.png,.jpg,.jpeg"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" style={{
                                    display: 'inline-block',
                                    background: '#10b981',
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
                            
                            {uploadedFiles.length > 0 && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>
                                        Uploaded Files ({uploadedFiles.length})
                                    </h4>
                                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem',
                                                background: '#f3f4f6',
                                                borderRadius: '6px',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <i className="fas fa-file" style={{ color: '#10b981', fontSize: '14px' }}></i>
                                                <span style={{ fontSize: '12px', color: '#374151', flex: 1 }}>{file.name}</span>
                                                <span style={{ fontSize: '10px', color: '#6b7280' }}>
                                                    {(file.size / 1024 / 1024).toFixed(1)}MB
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Processing Status */}
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                                Processing Status
                            </h3>
                            
                            {!processing && uploadedFiles.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <i className="fas fa-brain" style={{ fontSize: '2rem', color: '#d1d5db', marginBottom: '1rem' }}></i>
                                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                        Ready to process documents with AI. Upload files and click start processing.
                                    </p>
                                </div>
                            )}

                            {!processing && uploadedFiles.length > 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <i className="fas fa-rocket" style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1rem' }}></i>
                                    <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '1rem' }}>
                                        {uploadedFiles.length} files ready for AI processing
                                    </p>
                                    <button
                                        onClick={startProcessing}
                                        style={{
                                            background: '#10b981',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        <i className="fas fa-play" style={{ marginRight: '0.5rem' }}></i>
                                        Start AI Processing
                                    </button>
                                </div>
                            )}

                            {processing && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#10b981' }}></i>
                                    </div>
                                    <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '0.5rem' }}>
                                        🤖 AI Processing Documents...
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                        Analyzing content with OpenAI GPT-4
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadModule;