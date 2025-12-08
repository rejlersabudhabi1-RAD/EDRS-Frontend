/**
 * AI Service Integration for EDRS Platform
 * Provides frontend integration with OpenAI-powered backend services
 */

import { toast } from 'react-toastify';

class AIServiceClient {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL || '';
        this.authToken = localStorage.getItem('authToken');
    }

    /**
     * Get authentication headers
     */
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.authToken || ''}`,
        };
    }

    /**
     * Handle API response errors
     */
    async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    /**
     * PDF to P&ID Conversion with OpenAI Vision
     */
    async convertPdfToPid(file, onProgress = null) {
        const formData = new FormData();
        formData.append('file', file);

        if (onProgress) onProgress({ stage: 'uploading', progress: 10 });

        try {
            const response = await fetch(`${this.baseUrl}/api/ai/pdf-to-pid-conversion/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: formData
            });

            if (onProgress) onProgress({ stage: 'processing', progress: 50 });

            const result = await this.handleResponse(response);

            if (onProgress) onProgress({ stage: 'completed', progress: 100 });

            return {
                success: true,
                data: result.conversion_result,
                service: 'pdf_to_pid',
                timestamp: result.timestamp
            };

        } catch (error) {
            console.error('PDF to P&ID conversion failed:', error);
            if (onProgress) onProgress({ stage: 'error', progress: 0, error: error.message });
            
            return {
                success: false,
                error: error.message,
                service: 'pdf_to_pid'
            };
        }
    }

    /**
     * Document Classification with OpenAI
     */
    async classifyDocument(file, onProgress = null) {
        const formData = new FormData();
        formData.append('file', file);

        if (onProgress) onProgress({ stage: 'analyzing', progress: 15 });

        try {
            const response = await fetch(`${this.baseUrl}/api/ai/document-classification/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: formData
            });

            if (onProgress) onProgress({ stage: 'classifying', progress: 70 });

            const result = await this.handleResponse(response);

            if (onProgress) onProgress({ stage: 'completed', progress: 100 });

            return {
                success: true,
                data: result.classification_result,
                service: 'document_classification',
                timestamp: result.timestamp
            };

        } catch (error) {
            console.error('Document classification failed:', error);
            if (onProgress) onProgress({ stage: 'error', progress: 0, error: error.message });
            
            return {
                success: false,
                error: error.message,
                service: 'document_classification'
            };
        }
    }

    /**
     * Document Validation with AI Analysis
     */
    async validateDocument(file, validationCriteria = {}, onProgress = null) {
        const formData = new FormData();
        formData.append('file', file);
        
        if (Object.keys(validationCriteria).length > 0) {
            formData.append('validation_criteria', JSON.stringify(validationCriteria));
        }

        if (onProgress) onProgress({ stage: 'validating', progress: 20 });

        try {
            const response = await fetch(`${this.baseUrl}/api/ai/document-validation/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: formData
            });

            if (onProgress) onProgress({ stage: 'analyzing', progress: 80 });

            const result = await this.handleResponse(response);

            if (onProgress) onProgress({ stage: 'completed', progress: 100 });

            return {
                success: true,
                data: result.validation_result,
                service: 'document_validation',
                timestamp: result.timestamp
            };

        } catch (error) {
            console.error('Document validation failed:', error);
            if (onProgress) onProgress({ stage: 'error', progress: 0, error: error.message });
            
            return {
                success: false,
                error: error.message,
                service: 'document_validation'
            };
        }
    }

    /**
     * Bulk Document Processing
     */
    async processBulkDocuments(files, processingType = 'classification', onProgress = null) {
        const formData = new FormData();
        
        files.forEach((file, index) => {
            formData.append('files', file);
        });
        
        formData.append('processing_type', processingType);

        if (onProgress) onProgress({ stage: 'uploading', progress: 10, total: files.length });

        try {
            const response = await fetch(`${this.baseUrl}/api/ai/bulk-processing/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: formData
            });

            if (onProgress) onProgress({ stage: 'processing', progress: 50, total: files.length });

            const result = await this.handleResponse(response);

            if (onProgress) onProgress({ stage: 'completed', progress: 100, total: files.length });

            return {
                success: true,
                data: result.bulk_processing_result,
                service: 'bulk_processing',
                timestamp: result.timestamp
            };

        } catch (error) {
            console.error('Bulk processing failed:', error);
            if (onProgress) onProgress({ stage: 'error', progress: 0, error: error.message });
            
            return {
                success: false,
                error: error.message,
                service: 'bulk_processing'
            };
        }
    }

    /**
     * Get AI Service Status
     */
    async getServiceStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/ai/service-status/`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            const result = await this.handleResponse(response);

            return {
                success: true,
                data: result,
                timestamp: result.timestamp
            };

        } catch (error) {
            console.error('Service status check failed:', error);
            
            return {
                success: false,
                error: error.message,
                service: 'status_check'
            };
        }
    }

    /**
     * Process single file with automatic service selection
     */
    async processFile(file, options = {}) {
        const { 
            service = 'auto', 
            validationCriteria = {},
            onProgress = null 
        } = options;

        // Auto-detect service based on file type
        let selectedService = service;
        if (service === 'auto') {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            if (['pdf', 'png', 'jpg', 'jpeg', 'dwg', 'dxf'].includes(fileExtension)) {
                selectedService = 'pdf_to_pid';
            } else if (['doc', 'docx', 'txt', 'csv'].includes(fileExtension)) {
                selectedService = 'classification';
            } else {
                selectedService = 'validation';
            }
        }

        // Route to appropriate service
        switch (selectedService) {
            case 'pdf_to_pid':
                return await this.convertPdfToPid(file, onProgress);
            
            case 'classification':
                return await this.classifyDocument(file, onProgress);
            
            case 'validation':
                return await this.validateDocument(file, validationCriteria, onProgress);
            
            default:
                throw new Error(`Unknown service: ${selectedService}`);
        }
    }

    /**
     * Show AI processing notifications
     */
    showAIProcessingNotification(stage, details = {}) {
        const { fileName, progress, service } = details;

        switch (stage) {
            case 'start':
                toast.info(`🤖 Starting AI processing for ${fileName || 'file'}...`, {
                    position: "top-right",
                    autoClose: 2000
                });
                break;

            case 'processing':
                toast.info(`🔬 AI analyzing with OpenAI${progress ? ` (${progress}%)` : ''}...`, {
                    position: "top-right",
                    autoClose: 1000
                });
                break;

            case 'success':
                const serviceNames = {
                    pdf_to_pid: 'PDF to P&ID conversion',
                    document_classification: 'document classification',
                    document_validation: 'document validation'
                };
                
                toast.success(`🎉 AI ${serviceNames[service] || 'processing'} completed successfully!`, {
                    position: "top-right",
                    autoClose: 3000
                });
                break;

            case 'error':
                toast.error(`❌ AI processing failed: ${details.error || 'Unknown error'}`, {
                    position: "top-right",
                    autoClose: 5000
                });
                break;
        }
    }

    /**
     * Format AI processing results for display
     */
    formatProcessingResults(result, service) {
        if (!result.success) {
            return {
                status: 'failed',
                error: result.error,
                displayData: null
            };
        }

        const data = result.data;

        switch (service) {
            case 'pdf_to_pid':
                return {
                    status: 'success',
                    displayData: {
                        filename: data.filename,
                        accuracy: data.accuracy_score,
                        processingTime: data.processing_time,
                        componentsDetected: data.components_detected?.length || 0,
                        instrumentationFound: data.instrumentation_found?.length || 0,
                        safetySystemsIdentified: data.safety_systems?.length || 0,
                        recommendations: data.recommendations || [],
                        modelUsed: data.model_used
                    }
                };

            case 'document_classification':
                return {
                    status: 'success',
                    displayData: {
                        filename: data.filename,
                        documentType: data.classification?.primary_type,
                        confidence: Math.round((data.classification?.confidence_score || 0) * 100),
                        processingTime: data.processing_time,
                        qualityScore: data.quality_indicators?.completeness_score,
                        recommendations: data.processing_recommendations || [],
                        modelUsed: data.model_used
                    }
                };

            case 'document_validation':
                return {
                    status: 'success',
                    displayData: {
                        filename: data.filename,
                        overallScore: data.overall_score,
                        qualityMetrics: data.validation_summary,
                        complianceScore: data.compliance_assessment?.overall_compliance_score,
                        criticalIssues: data.critical_issues || [],
                        recommendations: data.recommendations || [],
                        processingTime: data.processing_metrics?.processing_time,
                        confidenceLevel: data.processing_metrics?.confidence_level
                    }
                };

            default:
                return {
                    status: 'success',
                    displayData: data
                };
        }
    }

    /**
     * Update authentication token
     */
    updateAuthToken(token) {
        this.authToken = token;
        localStorage.setItem('authToken', token);
    }

    /**
     * Clear authentication
     */
    clearAuth() {
        this.authToken = null;
        localStorage.removeItem('authToken');
    }
}

// Create singleton instance
const aiServiceClient = new AIServiceClient();

export default aiServiceClient;

// Export individual methods for convenience
export const {
    convertPdfToPid,
    classifyDocument,
    validateDocument,
    processBulkDocuments,
    getServiceStatus,
    processFile,
    showAIProcessingNotification,
    formatProcessingResults,
    updateAuthToken,
    clearAuth
} = aiServiceClient;