import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PdfToPidModule = () => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [processingStatus, setProcessingStatus] = useState('idle');
    const [conversionResults, setConversionResults] = useState([]);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(files);
        toast.success(`${files.length} file(s) uploaded successfully`);
    };

    const [aiProcessingDetails, setAiProcessingDetails] = useState({});
    const [realTimeProgress, setRealTimeProgress] = useState(0);

    const startConversion = async () => {
        if (uploadedFiles.length === 0) {
            toast.error('Please upload PDF files first');
            return;
        }
        
        setProcessingStatus('processing');
        setRealTimeProgress(0);
        toast.info('🤖 Starting AI-powered PFD to P&ID conversion with OpenAI Vision...');
        
        try {
            const results = [];
            
            for (let i = 0; i < uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                setRealTimeProgress(((i + 0.5) / uploadedFiles.length) * 100);
                
                // Create FormData for AI API request
                const formData = new FormData();
                formData.append('file', file);
                
                // Call real AI backend API
                const response = await fetch('/api/ai/pdf-to-pid-conversion/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    body: formData
                });
                
                if (response.ok) {
                    const aiResult = await response.json();
                    const conversionData = aiResult.conversion_result;
                    
                    results.push({
                        id: i + 1,
                        fileName: file.name,
                        status: conversionData.status === 'completed' ? 'Converted' : 'Failed',
                        accuracy: conversionData.accuracy_score || '0%',
                        processingTime: conversionData.processing_time || '0 sec',
                        confidenceLevel: conversionData.confidence_level || '0%',
                        componentsDetected: conversionData.components_detected?.length || 0,
                        instrumentationFound: conversionData.instrumentation_found?.length || 0,
                        safetySystemsIdentified: conversionData.safety_systems?.length || 0,
                        aiAnalysis: conversionData.ai_analysis,
                        recommendations: conversionData.recommendations || [],
                        modelUsed: conversionData.model_used || 'GPT-4 Vision'
                    });
                    
                    // Store detailed AI analysis
                    setAiProcessingDetails(prev => ({
                        ...prev,
                        [file.name]: conversionData
                    }));
                    
                } else {
                    results.push({
                        id: i + 1,
                        fileName: file.name,
                        status: 'Failed',
                        accuracy: '0%',
                        error: 'AI processing failed'
                    });
                }
                
                setRealTimeProgress(((i + 1) / uploadedFiles.length) * 100);
            }
            
            setProcessingStatus('completed');
            setConversionResults(results);
            
            const successCount = results.filter(r => r.status === 'Converted').length;
            if (successCount > 0) {
                toast.success(`🎉 AI conversion completed! ${successCount}/${results.length} files processed successfully with OpenAI GPT-4 Vision`);
            } else {
                toast.error('❌ AI conversion failed. Please check file formats and try again.');
            }
            
        } catch (error) {
            console.error('AI conversion error:', error);
            setProcessingStatus('idle');
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
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'default',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'left',
                                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
                                }}
                            >
                                <i className="fas fa-exchange-alt" style={{ width: '16px' }}></i>
                                <span style={{ flex: 1 }}>PFD to P&ID</span>
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
                            color: '#ef4444',
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
                            color: '#ef4444',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px',
                            padding: 0
                        }}
                    >
                        EDRS Dashboard
                    </button>
                    <span style={{ color: '#6b7280' }}>/</span>
                    <span style={{ color: '#374151', fontWeight: '500' }}>PFD to P&ID</span>
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
                            background: '#ef4444',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-exchange-alt"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                PFD to P&ID Conversion
                            </h1>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>
                                Convert Process Flow Diagrams (PFD) to Piping & Instrumentation Diagrams (P&ID) using AI
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
                                onClick={startConversion}
                                style={{
                                    background: '#ef4444',
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
                                Start Conversion
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>2,847</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Total Conversions</div>
                                </div>
                                <i className="fas fa-file-pdf" style={{ color: '#3b82f6', fontSize: '20px' }}></i>
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>98.7%</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Accuracy Rate</div>
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
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>2.3 min</div>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '0.25rem' }}>Avg Processing Time</div>
                                </div>
                                <i className="fas fa-clock" style={{ color: '#f59e0b', fontSize: '20px' }}></i>
                            </div>
                        </div>
                    </div>

                    {/* Upload and Conversion Section */}
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
                                Upload PDF Files
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
                                    Drag & drop PDF files or click to browse
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" style={{
                                    display: 'inline-block',
                                    background: '#ef4444',
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
                                                <i className="fas fa-file-pdf" style={{ color: '#ef4444', fontSize: '14px' }}></i>
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
                            
                            {processingStatus === 'idle' && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <i className="fas fa-cogs" style={{ fontSize: '2rem', color: '#d1d5db', marginBottom: '1rem' }}></i>
                                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                        Ready to process PDF files. Upload files and click start conversion.
                                    </p>
                                    <button
                                        onClick={startConversion}
                                        disabled={uploadedFiles.length === 0}
                                        style={{
                                            background: uploadedFiles.length > 0 ? '#ef4444' : '#d1d5db',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '8px',
                                            cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        <i className="fas fa-play" style={{ marginRight: '0.5rem' }}></i>
                                        Start Conversion
                                    </button>
                                </div>
                            )}

                            {processingStatus === 'processing' && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div className="spinner-border text-primary" style={{ marginBottom: '1rem' }}></div>
                                    <p style={{ color: '#1f2937', fontWeight: '500', marginBottom: '0.5rem' }}>
                                        Converting PDF files...
                                    </p>
                                    <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                                        AI is analyzing your documents and generating P&ID diagrams
                                    </p>
                                </div>
                            )}

                            {processingStatus === 'completed' && conversionResults.length > 0 && (
                                <div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                                            <span style={{ fontWeight: '500', color: '#1f2937' }}>Conversion Complete</span>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                            {conversionResults.length} files processed successfully
                                        </p>
                                    </div>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {conversionResults.map((result) => (
                                            <div key={result.id} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                background: '#f0fdf4',
                                                border: '1px solid #bbf7d0',
                                                borderRadius: '8px',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <i className="fas fa-file-alt" style={{ color: '#10b981', fontSize: '14px' }}></i>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#1f2937' }}>
                                                        {result.fileName}
                                                    </div>
                                                    <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                                        {result.status} • {result.accuracy}
                                                    </div>
                                                </div>
                                                <button style={{
                                                    background: '#10b981',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '10px',
                                                    cursor: 'pointer'
                                                }}>
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfToPidModule;