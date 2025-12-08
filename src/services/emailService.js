// Email service for consultation form
import CONSULTATION_CONFIG from '../config/consultationConfig.js';

class EmailService {
  constructor() {
    this.config = CONSULTATION_CONFIG;
  }

  // Validate form data against configuration rules
  validateFormData(formData) {
    const errors = {};
    const { validation } = this.config;

    Object.keys(validation).forEach(field => {
      const value = formData[field]?.toString().trim() || '';
      const rules = validation[field];

      if (rules.required && !value) {
        errors[field] = `${field} is required`;
        return;
      }

      if (value && rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} must be at least ${rules.minLength} characters`;
        return;
      }

      if (value && rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
        return;
      }

      if (value && rules.pattern && !rules.pattern.test(value)) {
        errors[field] = `${field} format is invalid`;
        return;
      }
    });

    return errors;
  }

  // Format email content
  formatEmailContent(formData) {
    const timestamp = new Date().toLocaleString('en-AE', {
      timeZone: 'Asia/Dubai',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      to: this.config.email.recipient,
      subject: this.config.email.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: #f8f9fa; padding: 10px; border-left: 4px solid #007bff; margin-top: 5px; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>🏗️ New Consultation Request</h2>
            <p>Rejlers Engineering Solutions - UAE</p>
          </div>
          
          <div class="content">
            <p><strong>Submission Time:</strong> ${timestamp} (UAE Time)</p>
            
            <div class="field">
              <div class="label">👤 Full Name:</div>
              <div class="value">${formData.name || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${formData.email || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📞 Phone:</div>
              <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">🏢 Company:</div>
              <div class="value">${formData.company || 'Not specified'}</div>
            </div>
            
            <div class="field">
              <div class="label">🔧 Project Type:</div>
              <div class="value">${this.getProjectTypeLabel(formData.projectType)}</div>
            </div>
            
            <div class="field">
              <div class="label">📝 Subject:</div>
              <div class="value">${formData.subject || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${(formData.message || 'No message provided').replace(/\\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This consultation request was submitted through the Rejlers EDRS platform.</p>
            <p><strong>Rejlers Tower, 13th floor</strong> | AI Hamdan Street | Abu Dhabi, UAE | +971 2 639 7449</p>
          </div>
        </body>
        </html>
      `,
      text: `
        New Consultation Request - ${timestamp}
        
        Name: ${formData.name || 'Not provided'}
        Email: ${formData.email || 'Not provided'}
        Phone: ${formData.phone || 'Not provided'}
        Company: ${formData.company || 'Not specified'}
        Project Type: ${this.getProjectTypeLabel(formData.projectType)}
        Subject: ${formData.subject || 'Not provided'}
        
        Message:
        ${formData.message || 'No message provided'}
        
        ---
        Submitted via Rejlers EDRS Platform
        Rejlers Tower, 13th floor | AI Hamdan Street | Abu Dhabi, UAE
      `
    };
  }

  // Get project type label from value
  getProjectTypeLabel(value) {
    const projectTypes = this.config.form.fields.projectType.options;
    const option = projectTypes.find(opt => opt.value === value);
    return option ? option.label : 'Not specified';
  }

  // Send email (using backend API)
  async sendEmail(formData) {
    try {
      // Validate form data
      const validationErrors = this.validateFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        return {
          success: false,
          errors: validationErrors,
          message: 'Please correct the validation errors'
        };
      }

      // Send to backend API
      console.log('📧 Sending consultation via backend API:', formData);

      const response = await fetch('http://localhost:8000/ai-erp/api/consultation/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Track analytics if enabled
        if (this.config.analytics.trackSubmission) {
          this.trackEvent('submit', 'Consultation form submitted successfully');
        }

        return {
          success: true,
          message: result.message || this.config.form.successMessage,
          reference: result.reference,
          submittedAt: result.submitted_at
        };
      } else {
        return {
          success: false,
          errors: result.errors || {},
          message: result.message || 'Failed to submit consultation request'
        };
      }

    } catch (error) {
      console.error('❌ Email send error:', error);
      
      // Track error if analytics enabled
      if (this.config.analytics.trackValidationErrors) {
        this.trackEvent('error', `Email send failed: ${error.message}`);
      }

      return {
        success: false,
        message: this.config.form.errorMessage,
        error: error.message
      };
    }
  }

  // Simulate email sending (replace with real implementation)
  async simulateEmailSend(emailContent) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a reference number
        const reference = `REJ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        console.log('✅ Email simulated successfully');
        console.log('📧 To:', emailContent.to);
        console.log('📋 Subject:', emailContent.subject);
        console.log('🔖 Reference:', reference);
        
        resolve({
          success: true,
          reference,
          timestamp: new Date().toISOString()
        });
      }, 1500); // Simulate network delay
    });
  }

  // Analytics tracking
  trackEvent(eventType, eventData) {
    if (typeof gtag !== 'undefined') {
      gtag('event', this.config.analytics.events[eventType], {
        event_category: this.config.analytics.eventCategory,
        event_label: eventData,
        value: 1
      });
    }
    
    console.log(`📊 Analytics: ${eventType} - ${eventData}`);
  }

  // Get form configuration
  getFormConfig() {
    return this.config.form;
  }
}

export default new EmailService();