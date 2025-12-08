import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DocumentValidationModule = () => {
    const navigate = useNavigate();
    const [validationResults, setValidationResults] = useState([
        { id: 1, fileName: 'P&ID_Rev_A.pdf', status: 'Validated', issues: 2, score: 95 },
        { id: 2, fileName: 'Equipment_List.xlsx', status: 'In Progress', issues: 0, score: null },
        { id: 3, fileName: 'Process_Flow.dwg', status: 'Failed', issues: 8, score: 67 }
    ]);

    const [aiValidationInProgress, setAiValidationInProgress] = useState(false);
    const [aiValidationResults, setAiValidationResults] = useState({});
    const [validationProgress, setValidationProgress] = useState(0);

    const startValidation = async () => {
        setAiValidationInProgress(true);
        setValidationProgress(0);
        toast.info('🤖 Starting comprehensive AI-powered document validation with OpenAI...');
        
        try {
            const updatedResults = [];
            
            for (let i = 0; i < mockValidationResults.length; i++) {
                const document = mockValidationResults[i];
                setValidationProgress(((i + 0.5) / mockValidationResults.length) * 100);
                
                // Simulate file data for validation
                const mockFileData = new Blob([`Mock content for ${document.fileName}`], { type: 'text/plain' });
                const formData = new FormData();
                formData.append('file', mockFileData, document.fileName);
                
                // Add validation criteria
                formData.append('validation_criteria', JSON.stringify({
                    check_safety_compliance: true,
                    verify_technical_accuracy: true,
                    assess_completeness: true,
                    validate_standards: true
                }));
                
                try {
                    // Call AI validation API
                    const response = await fetch('/api/ai/document-validation/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        },
                        body: formData
                    });
                    
                    if (response.ok) {
                        const aiResult = await response.json();
                        const validationData = aiResult.validation_result;
                        
                        updatedResults.push({
                            ...document,
                            status: validationData.validation_status === 'completed' ? 'Validated' : 'Review Required',
                            score: Math.round(validationData.overall_score || 85),
                            issues: validationData.quality_indicators?.issues_found || 0,
                            aiAnalysis: validationData.detailed_analysis,
                            qualityMetrics: validationData.validation_summary,
                            complianceScore: validationData.compliance_assessment?.overall_compliance_score || 90,
                            recommendations: validationData.recommendations || [],
                            processingTime: validationData.processing_metrics?.processing_time,
                            confidenceLevel: validationData.processing_metrics?.confidence_level,
                            nextReviewDate: validationData.next_review_date
                        });
                        
                        // Store detailed AI results
                        setAiValidationResults(prev => ({
                            ...prev,
                            [document.fileName]: validationData
                        }));
                        
                    } else {
                        updatedResults.push({
                            ...document,
                            status: 'Validation Failed',
                            score: 0,
                            issues: 999
                        });
                    }
                    
                } catch (error) {
                    console.error(`AI validation failed for ${document.fileName}:`, error);
                    updatedResults.push({
                        ...document,
                        status: 'AI Error',
                        score: 0,
                        issues: 999
                    });
                }
                
                setValidationProgress(((i + 1) / mockValidationResults.length) * 100);
            }
            
            setValidationResults(updatedResults);
            setAiValidationInProgress(false);
            
            const successCount = updatedResults.filter(r => r.status === 'Validated').length;
            toast.success(`🎉 AI validation completed! ${successCount}/${updatedResults.length} documents validated with OpenAI`);
            
        } catch (error) {
            console.error('AI validation error:', error);
            setAiValidationInProgress(false);
            toast.error('🔥 AI validation failed: ' + error.message);
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ 
                            margin: '0 0 0.75rem 0', 
                            fontSize: '12px', 
                            fontWeight: '600', 
                            color: '#6b7280', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
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
                                    background: '#10b98115',
                                    color: '#10b981',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'default',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'left'
                                }}
                            >
                                <i className="fas fa-shield-alt" style={{ width: '16px' }}></i>
                                <span style={{ flex: 1 }}>Document Validation</span>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981'
                                }}></div>
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
                {/* Breadcrumb */}
                <div style={{
                    background: '#f8fafc',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
                        <button
                            onClick={() => {
                                try {
                                    navigate('/dashboard');
                                } catch (error) {
                                    window.location.href = '/dashboard';
                                }
                            }}
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
                            onClick={() => {
                                try {
                                    navigate('/edrs/dashboard');
                                } catch (error) {
                                    window.location.href = '/edrs/dashboard';
                                }
                            }}
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
                        <span style={{ color: '#374151', fontWeight: '500' }}>Document Validation</span>
                    </div>
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
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px'
                        }}>
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                Document Validation
                            </h1>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '16px' }}>
                                AI-powered validation of engineering documents and drawings
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => {
                                try {
                                    navigate('/dashboard');
                                } catch (error) {
                                    console.error('Navigation error:', error);
                                    window.location.href = '/dashboard';
                                }
                            }}
                            style={{
                                background: 'white',
                                color: '#374151',
                                border: '2px solid #e5e7eb',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = '#10b981';
                                e.target.style.color = '#10b981';
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.color = '#374151';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Back to Main
                        </button>
                        <button onClick={startValidation} style={{
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}>
                            <i className="fas fa-play"></i>
                            Start Validation
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '0 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                    {/* Statistics Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                                    <i className="fas fa-check-double"></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>1,563</h3>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Documents Validated</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                                    <i className="fas fa-percentage"></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>92.3%</h3>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Pass Rate</p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>124</h3>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Issues Found</p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>1.2 min</h3>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>Avg Validation Time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Validation Results Table */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '20px', fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fas fa-list-check" style={{ color: '#10b981' }}></i>
                            Validation Results
                        </h2>
                        
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Document</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Issues</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Score</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {validationResults.map((result) => (
                                        <tr key={result.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <i className="fas fa-file-alt" style={{ color: '#3b82f6' }}></i>
                                                    <span style={{ fontWeight: '500', color: '#1f2937' }}>{result.fileName}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.375rem 0.75rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    background: result.status === 'Validated' ? '#10b98115' :
                                                              result.status === 'In Progress' ? '#f59e0b15' : '#ef444415',
                                                    color: result.status === 'Validated' ? '#10b981' :
                                                          result.status === 'In Progress' ? '#f59e0b' : '#ef4444'
                                                }}>
                                                    {result.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    fontWeight: '500',
                                                    color: result.issues > 0 ? '#f59e0b' : '#10b981'
                                                }}>
                                                    {result.issues}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {result.score ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ fontWeight: '500' }}>{result.score}%</span>
                                                        <div style={{
                                                            width: '60px',
                                                            height: '4px',
                                                            background: '#f3f4f6',
                                                            borderRadius: '2px',
                                                            overflow: 'hidden'
                                                        }}>
                                                            <div style={{
                                                                width: `${result.score}%`,
                                                                height: '100%',
                                                                background: result.score >= 90 ? '#10b981' :
                                                                           result.score >= 70 ? '#f59e0b' : '#ef4444',
                                                                transition: 'width 0.3s ease'
                                                            }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: '#6b7280' }}>-</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button style={{
                                                        background: '#3b82f6',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.375rem 0.75rem',
                                                        borderRadius: '6px',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem'
                                                    }}>
                                                        <i className="fas fa-eye"></i>
                                                        View
                                                    </button>
                                                    {result.issues > 0 && (
                                                        <button style={{
                                                            background: '#f59e0b',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '0.375rem 0.75rem',
                                                            borderRadius: '6px',
                                                            fontSize: '0.75rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem'
                                                        }}>
                                                            <i className="fas fa-exclamation-triangle"></i>
                                                            Issues
                                                        </button>
                                                    )}
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
};

export default DocumentValidationModule;