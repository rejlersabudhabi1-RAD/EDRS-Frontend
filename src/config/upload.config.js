/**
 * Smart Upload Configuration
 * Dynamic timeout and processing settings based on file characteristics
 */

const UPLOAD_CONFIG = {
    // Base timeout settings (in milliseconds)
    BASE_TIMEOUT: 120000, // 2 minutes base
    
    // Dynamic timeout calculation factors
    TIMEOUT_PER_MB: 30000, // 30 seconds per MB
    MIN_TIMEOUT: 60000, // 1 minute minimum
    MAX_TIMEOUT: 600000, // 10 minutes maximum
    
    // P&ID specific timeouts (longer processing)
    PID_BASE_TIMEOUT: 180000, // 3 minutes for P&ID
    PID_TIMEOUT_PER_MB: 60000, // 1 minute per MB for P&ID
    
    // Retry settings
    MAX_RETRIES: 2,
    RETRY_DELAY: 5000, // 5 seconds between retries
    
    // File size thresholds
    SMALL_FILE_THRESHOLD: 1 * 1024 * 1024, // 1 MB
    MEDIUM_FILE_THRESHOLD: 5 * 1024 * 1024, // 5 MB
    LARGE_FILE_THRESHOLD: 10 * 1024 * 1024, // 10 MB
    
    // Progress polling
    ENABLE_PROGRESS_POLLING: false, // Enable if backend supports it
    POLL_INTERVAL: 5000, // 5 seconds
    
    /**
     * Calculate dynamic timeout based on file size and type
     * @param {number} fileSizeBytes - File size in bytes
     * @param {boolean} isPID - Whether file is likely a P&ID
     * @returns {number} Timeout in milliseconds
     */
    calculateTimeout(fileSizeBytes, isPID = false) {
        const fileSizeMB = fileSizeBytes / (1024 * 1024);
        
        // Use P&ID-specific settings if detected
        const baseTimeout = isPID ? this.PID_BASE_TIMEOUT : this.BASE_TIMEOUT;
        const timeoutPerMB = isPID ? this.PID_TIMEOUT_PER_MB : this.TIMEOUT_PER_MB;
        
        // Calculate dynamic timeout
        let calculatedTimeout = baseTimeout + (fileSizeMB * timeoutPerMB);
        
        // Apply min/max constraints
        calculatedTimeout = Math.max(this.MIN_TIMEOUT, calculatedTimeout);
        calculatedTimeout = Math.min(this.MAX_TIMEOUT, calculatedTimeout);
        
        return Math.round(calculatedTimeout);
    },
    
    /**
     * Get timeout description for user display
     * @param {number} timeoutMs - Timeout in milliseconds
     * @returns {string} Human-readable timeout description
     */
    getTimeoutDescription(timeoutMs) {
        const minutes = Math.round(timeoutMs / 60000);
        const seconds = Math.round(timeoutMs / 1000);
        
        if (minutes >= 1) {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        return `${seconds} seconds`;
    },
    
    /**
     * Detect if file is likely a P&ID based on name
     * @param {string} fileName - File name
     * @returns {boolean} True if likely P&ID
     */
    isPIDFile(fileName) {
        const pidKeywords = ['pid', 'p&id', 'p-id', 'piping', 'instrumentation', 'pfd', 'process flow'];
        const lowerFileName = fileName.toLowerCase();
        return pidKeywords.some(keyword => lowerFileName.includes(keyword));
    },
    
    /**
     * Get file size category
     * @param {number} fileSizeBytes - File size in bytes
     * @returns {string} Size category: 'small', 'medium', 'large', 'xlarge'
     */
    getFileSizeCategory(fileSizeBytes) {
        if (fileSizeBytes <= this.SMALL_FILE_THRESHOLD) return 'small';
        if (fileSizeBytes <= this.MEDIUM_FILE_THRESHOLD) return 'medium';
        if (fileSizeBytes <= this.LARGE_FILE_THRESHOLD) return 'large';
        return 'xlarge';
    },
    
    /**
     * Get estimated processing time message
     * @param {number} fileSizeBytes - File size in bytes
     * @param {boolean} isPID - Whether file is P&ID
     * @returns {string} Processing time estimate message
     */
    getProcessingEstimate(fileSizeBytes, isPID = false) {
        const category = this.getFileSizeCategory(fileSizeBytes);
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(1);
        
        if (isPID) {
            switch (category) {
                case 'small':
                    return `P&ID analysis: ~1-2 minutes (${fileSizeMB} MB)`;
                case 'medium':
                    return `P&ID analysis: ~2-4 minutes (${fileSizeMB} MB)`;
                case 'large':
                    return `P&ID analysis: ~4-7 minutes (${fileSizeMB} MB)`;
                case 'xlarge':
                    return `P&ID analysis: ~7-10 minutes (${fileSizeMB} MB)`;
            }
        } else {
            switch (category) {
                case 'small':
                    return `Processing: ~30-60 seconds (${fileSizeMB} MB)`;
                case 'medium':
                    return `Processing: ~1-2 minutes (${fileSizeMB} MB)`;
                case 'large':
                    return `Processing: ~2-4 minutes (${fileSizeMB} MB)`;
                case 'xlarge':
                    return `Processing: ~4-6 minutes (${fileSizeMB} MB)`;
            }
        }
    }
};

export default UPLOAD_CONFIG;
