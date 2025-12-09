/**
 * API Configuration for EDRS Frontend
 * Soft-coded API endpoints with environment-based configuration
 */

// Get API URL based on environment
const getApiBaseUrl = () => {
    // Production: Use environment variable from Vercel
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    
    // Development: Check different environment variables
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // Default: Local development
    return 'http://localhost:8000/api/v1';
};

// Get base server URL (without /api/v1)
const getServerUrl = () => {
    const baseUrl = getApiBaseUrl();
    return baseUrl.replace('/api/v1', '');
};

const API_CONFIG = {
    // Base configuration
    BASE_URL: getApiBaseUrl(),
    SERVER_URL: getServerUrl(),
    API_VERSION: 'v1',
    TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,
    
    // Build full API URL
    getApiUrl() {
        return this.BASE_URL;
    },
    
    // Get server URL (for non-API routes)
    getServerUrl() {
        return this.SERVER_URL;
    },
    
    // Authentication endpoints
    endpoints: {
        // Auth endpoints
        LOGIN: '/auth/login/',
        REGISTER: '/auth/register/',
        LOGOUT: '/auth/logout/',
        REFRESH: '/auth/refresh/',
        USER_PROFILE: '/auth/profile/',
        
        // Health checks
        HEALTH: '/auth/health/',
        STATUS: '/auth/status/',
        
        // User management (AI-ERP endpoints)
        USER_FEATURES: '/ai-erp/api/users/features/',
        USER_CREATE: '/ai-erp/api/users/create/',
        
        // Consultation
        CONSULTATION_SUBMIT: '/ai-erp/api/consultation/submit/',
        
        // Projects
        PROJECTS: '/projects/',
        
        // Services
        SERVICES: '/services/',
        
        // Team
        TEAM: '/team/',
    },
    
    // Get full endpoint URL
    getEndpoint(endpoint) {
        const path = this.endpoints[endpoint] || endpoint;
        
        // AI-ERP endpoints need server URL (not /api/v1 prefix)
        if (path.startsWith('/ai-erp/')) {
            return `${this.getServerUrl()}${path}`;
        }
        
        // Regular API endpoints use base URL
        return `${this.getApiUrl()}${path}`;
    }
};

export default API_CONFIG;

// Export individual values for convenience
export const API_BASE_URL = API_CONFIG.BASE_URL;
export const API_TIMEOUT = API_CONFIG.TIMEOUT;
export const API_ENDPOINTS = API_CONFIG.endpoints;
