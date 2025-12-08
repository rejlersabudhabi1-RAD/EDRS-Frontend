// Soft coding configuration for consultation form
export const CONSULTATION_CONFIG = {
  // Email configuration
  email: {
    recipient: "mohammed.agra@rejlers.ae",
    subject: "New Consultation Request - Rejlers EDRS",
    autoReply: {
      enabled: true,
      subject: "Thank you for contacting Rejlers",
      message: "We have received your consultation request and will get back to you within 24 hours."
    }
  },

  // Form validation rules
  validation: {
    name: {
      minLength: 2,
      maxLength: 50,
      required: true,
      pattern: /^[a-zA-Z\s]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: true,
      minLength: 10,
      maxLength: 15,
      pattern: /^[\+]?[0-9\s\-\(\)]+$/
    },
    subject: {
      minLength: 5,
      maxLength: 100,
      required: true
    },
    message: {
      minLength: 20,
      maxLength: 1000,
      required: true
    }
  },

  // Form configuration
  form: {
    title: "Free Consultation",
    subtitle: "Get expert advice on your engineering projects",
    submitButtonText: "Request Consultation",
    successMessage: "Thank you! We'll contact you within 24 hours.",
    errorMessage: "Sorry, there was an issue sending your message. Please try again.",
    fields: {
      name: {
        label: "Full Name",
        placeholder: "Enter your full name",
        type: "text",
        required: true,
        icon: "👤"
      },
      email: {
        label: "Email Address",
        placeholder: "your.email@company.com",
        type: "email",
        required: true,
        icon: "📧"
      },
      phone: {
        label: "Phone Number",
        placeholder: "+971 XX XXX XXXX",
        type: "tel",
        required: true,
        icon: "📞"
      },
      company: {
        label: "Company Name",
        placeholder: "Your company name (Optional)",
        type: "text",
        required: false,
        icon: "🏢"
      },
      subject: {
        label: "Subject",
        placeholder: "Brief description of your inquiry",
        type: "text",
        required: true,
        icon: "📝"
      },
      projectType: {
        label: "Project Type",
        type: "select",
        required: true,
        icon: "🔧",
        options: [
          { value: "", label: "Select project type" },
          { value: "energy-transition", label: "Energy Transition" },
          { value: "industry-transformation", label: "Industry Transformation" },
          { value: "future-proof-communities", label: "Future-Proof Communities" },
          { value: "engineering-consulting", label: "Engineering Consulting" },
          { value: "other", label: "Other" }
        ]
      },
      message: {
        label: "Message",
        placeholder: "Please describe your project requirements, timeline, and any specific questions...",
        type: "textarea",
        required: true,
        icon: "💬",
        rows: 5
      }
    }
  },

  // API configuration
  api: {
    endpoint: "/api/consultation/submit",
    method: "POST",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json"
    }
  },

  // Analytics and tracking
  analytics: {
    trackSubmission: true,
    trackValidationErrors: true,
    eventCategory: "Consultation Form",
    events: {
      submit: "Form Submitted",
      success: "Form Success",
      error: "Form Error",
      validation: "Validation Error"
    }
  }
};

export default CONSULTATION_CONFIG;