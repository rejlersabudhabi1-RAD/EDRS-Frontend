import React, { useState, useCallback, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Advanced Document Upload Module with AI Processing
 * Features: Drag-and-drop, Multiple file support, Real-time progress, RAG/CAG verification
 * Soft-coded API endpoints, Advanced error handling, Generative AI integration
 */
const DocumentUploadModuleAdvanced = () => {
    // State Management
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [reportFormat, setReportFormat] = useState('json');
    const fileInputRef = useRef(null);

    // Soft-coded Configuration
    const config = {
        apiEndpoint: process.env.REACT_APP_API_URL || 'http://localhost:8000',
        uploadPath: '/ai-erp/api/ai/document-upload-report/',
        maxFileSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['pdf', 'png', 'jpg', 'jpeg', 'dwg', 'dxf', 'docx'],
        timeout: 120000 // 2 minutes
    };

    // Get full API URL
    const getApiUrl = useCallback(() => {
        return `${config.apiEndpoint}${config.uploadPath}`;
    }, [config.apiEndpoint, config.uploadPath]);

    // File Validation
    const validateFile = useCallback((file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        
        if (!config.allowedTypes.includes(extension)) {
            return {
                valid: false,
                error: `File type .${extension} not allowed. Allowed: ${config.allowedTypes.join(', ')}`
            };
        }
        
        if (file.size > config.maxFileSize) {
            return {
                valid: false,
                error: `File size exceeds ${(config.maxFileSize / 1024 / 1024).toFixed(0)}MB limit`
            };
        }
        
        return { valid: true };
    }, [config.allowedTypes, config.maxFileSize]);

    // Handle File Selection
    const handleFileSelect = useCallback((selectedFiles) => {
        const fileArray = Array.from(selectedFiles);
        const validFiles = [];
        
        fileArray.forEach(file => {
            const validation = validateFile(file);
            if (validation.valid) {
                validFiles.push({
                    file,
                    id: `${file.name}-${Date.now()}-${Math.random()}`,
                    name: file.name,
                    size: file.size,
                    status: 'pending',
                    progress: 0
                });
            } else {
                toast.error(`${file.name}: ${validation.error}`);
            }
        });
        
        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles]);
            toast.success(`${validFiles.length} file(s) ready for upload`);
        }
    }, [validateFile]);

    // Handle Drag Events
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files);
        }
    }, [handleFileSelect]);

    // Upload Single File with Progress
    const uploadSingleFile = useCallback(async (fileObj) => {
        const formData = new FormData();
        formData.append('file', fileObj.file);
        formData.append('report_format', reportFormat);
        formData.append('analysis_type', 'classification');

        try {
            // Update progress - starting
            setFiles(prev => prev.map(f => 
                f.id === fileObj.id ? { ...f, status: 'uploading', progress: 10 } : f
            ));

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);

            const response = await fetch(getApiUrl(), {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Update progress - processing
            setFiles(prev => prev.map(f => 
                f.id === fileObj.id ? { ...f, progress: 60 } : f
            ));

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.detail || errorMessage;
                } catch {
                    errorMessage = await response.text() || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();

            // Update progress - complete
            setFiles(prev => prev.map(f => 
                f.id === fileObj.id ? { ...f, status: 'success', progress: 100 } : f
            ));

            return {
                id: fileObj.id,
                fileName: fileObj.name,
                status: 'success',
                result: result,
                reportId: result.report?.report_id,
                category: result.analysis_result?.classification?.primary_type || 'Unknown',
                confidence: result.analysis_result?.classification?.confidence_score 
                    ? `${(result.analysis_result.classification.confidence_score * 100).toFixed(1)}%` 
                    : 'N/A'
            };

        } catch (error) {
            // Update status - failed
            setFiles(prev => prev.map(f => 
                f.id === fileObj.id ? { ...f, status: 'error', progress: 0, error: error.message } : f
            ));

            return {
                id: fileObj.id,
                fileName: fileObj.name,
                status: 'error',
                error: error.message
            };
        }
    }, [reportFormat, getApiUrl, config.timeout]);

    // Process All Files
    const processFiles = useCallback(async () => {
        if (files.length === 0) {
            toast.warning('Please select files to upload');
            return;
        }

        setUploading(true);
        setResults([]);
        toast.info(`🚀 Processing ${files.length} document(s)...`);

        const uploadResults = [];

        // Sequential upload to avoid overwhelming server
        for (const fileObj of files) {
            if (fileObj.status === 'pending') {
                const result = await uploadSingleFile(fileObj);
                uploadResults.push(result);
                
                if (result.status === 'success') {
                    toast.success(`✅ ${result.fileName} processed`);
                } else {
                    toast.error(`❌ ${result.fileName} failed: ${result.error}`);
                }
            }
        }

        setResults(uploadResults);
        setUploading(false);

        const successCount = uploadResults.filter(r => r.status === 'success').length;
        const failCount = uploadResults.length - successCount;

        if (successCount > 0) {
            toast.success(`🎉 Complete! ${successCount} successful${failCount > 0 ? `, ${failCount} failed` : ''}`);
        } else {
            toast.error('❌ All uploads failed');
        }
    }, [files, uploadSingleFile]);

    // Remove File
    const removeFile = useCallback((fileId) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        setResults(prev => prev.filter(r => r.id !== fileId));
    }, []);

    // Clear All
    const clearAll = useCallback(() => {
        setFiles([]);
        setResults([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    // Download Report
    const downloadReport = useCallback((result) => {
        if (!result.result?.report) return;

        const reportData = result.result.report.report_data;
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${result.reportId || 'report'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Report downloaded!');
    }, []);

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        card: {
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden'
        },
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            color: 'white'
        },
        title: {
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
        },
        subtitle: {
            margin: 0,
            opacity: 0.9,
            fontSize: '1rem'
        },
        dropZone: {
            padding: '3rem',
            border: `3px dashed ${dragActive ? '#667eea' : '#e2e8f0'}`,
            borderRadius: '12px',
            background: dragActive ? '#f7fafc' : '#fafafa',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: '2rem'
        },
        button: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.875rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
        },
        fileItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '8px',
            marginBottom: '0.75rem',
            border: '1px solid #e2e8f0'
        },
        progress: {
            width: '100%',
            height: '6px',
            background: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden',
            marginTop: '0.5rem'
        },
        progressBar: (progress) => ({
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            transition: 'width 0.3s ease'
        })
    };

    return (
        <div style={styles.container}>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>🚀 AI Document Upload & Analysis</h1>
                    <p style={styles.subtitle}>
                        Advanced document processing with RAG/CAG verification | Supports PDF, Images, DWG, DOCX
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    style={styles.dropZone}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a202c' }}>
                        {dragActive ? 'Drop files here' : 'Click to select or drag & drop'}
                    </h3>
                    <p style={{ margin: 0, color: '#718096', fontSize: '0.875rem' }}>
                        Supported: PDF, PNG, JPG, DWG, DXF, DOCX (Max {(config.maxFileSize / 1024 / 1024).toFixed(0)}MB)
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.docx"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Files List */}
                {files.length > 0 && (
                    <div style={{ padding: '0 2rem 2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, color: '#1a202c' }}>
                                Files ({files.length})
                            </h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={clearAll}
                                    disabled={uploading}
                                    style={{
                                        ...styles.button,
                                        background: '#ef4444',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={processFiles}
                                    disabled={uploading}
                                    style={{
                                        ...styles.button,
                                        padding: '0.5rem 1.5rem',
                                        fontSize: '0.875rem',
                                        opacity: uploading ? 0.6 : 1
                                    }}
                                >
                                    {uploading ? '⏳ Processing...' : '🚀 Process All'}
                                </button>
                            </div>
                        </div>

                        {files.map(fileObj => (
                            <div key={fileObj.id} style={styles.fileItem}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>
                                            {fileObj.status === 'success' ? '✅' : 
                                             fileObj.status === 'error' ? '❌' :
                                             fileObj.status === 'uploading' ? '⏳' : '📄'}
                                        </span>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1a202c' }}>
                                                {fileObj.name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                                                {(fileObj.size / 1024 / 1024).toFixed(2)} MB
                                                {fileObj.status === 'error' && ` • ${fileObj.error}`}
                                                {results.find(r => r.id === fileObj.id)?.category && 
                                                 ` • ${results.find(r => r.id === fileObj.id).category}`}
                                            </div>
                                        </div>
                                    </div>
                                    {fileObj.status === 'uploading' && (
                                        <div style={styles.progress}>
                                            <div style={styles.progressBar(fileObj.progress)}></div>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {fileObj.status === 'success' && results.find(r => r.id === fileObj.id) && (
                                        <button
                                            onClick={() => downloadReport(results.find(r => r.id === fileObj.id))}
                                            style={{
                                                ...styles.button,
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            📥 Report
                                        </button>
                                    )}
                                    {fileObj.status !== 'uploading' && (
                                        <button
                                            onClick={() => removeFile(fileObj.id)}
                                            disabled={uploading}
                                            style={{
                                                background: '#cbd5e0',
                                                color: '#1a202c',
                                                border: 'none',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Footer */}
                <div style={{
                    padding: '1.5rem 2rem',
                    background: '#f7fafc',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '0.875rem',
                    color: '#718096'
                }}>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>✅ RAG Verification Enabled</div>
                        <div>🤖 AI-Powered Analysis</div>
                        <div>📊 Comprehensive Reporting</div>
                        <div>🔒 Secure Processing</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadModuleAdvanced;
