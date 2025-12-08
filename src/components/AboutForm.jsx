import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import emailService from '../services/emailService.js';
import '../assets/css/consultation-form.css';

const AboutForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        projectType: '',
        message: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [formConfig, setFormConfig] = useState(null);

    useEffect(() => {
        // Load form configuration using soft coding
        const config = emailService.getFormConfig();
        setFormConfig(config);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleMessage = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            // Send email using the service
            const result = await emailService.sendEmail(formData);
            
            if (result.success) {
                // Show success message with reference number
                toast.success(
                    `✅ ${result.message}${result.reference ? ` (Ref: ${result.reference})` : ''}`,
                    { autoClose: 6000 }
                );
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    subject: '',
                    projectType: '',
                    message: ''
                });
                
                event.target.reset();
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                    toast.error("Please correct the validation errors");
                } else {
                    toast.error(result.message || "Sorry, there was an issue. Please try again.");
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error("An unexpected error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!formConfig) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <div className="about-us-contact">
                <div className="about-us-contact-title">
                    <h1>{formConfig.title}</h1>
                    {formConfig.subtitle && (
                        <p className="consultation-subtitle text-muted mb-3">{formConfig.subtitle}</p>
                    )}
                    <div className="contact-title-border"></div>
                </div>
                <form onSubmit={handleMessage} className="consultation-form">
                    <div className="contact-field">
                        {/* Name Field */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.name.icon}</span>
                                <input 
                                    type={formConfig.fields.name.type}
                                    placeholder={formConfig.fields.name.placeholder}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.name.required}
                                    className={errors.name ? 'error' : ''}
                                />
                            </div>
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        {/* Email Field */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.email.icon}</span>
                                <input 
                                    type={formConfig.fields.email.type}
                                    placeholder={formConfig.fields.email.placeholder}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.email.required}
                                    className={errors.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Phone Field */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.phone.icon}</span>
                                <input 
                                    type={formConfig.fields.phone.type}
                                    placeholder={formConfig.fields.phone.placeholder}
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.phone.required}
                                    className={errors.phone ? 'error' : ''}
                                />
                            </div>
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        {/* Company Field (Optional) */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.company.icon}</span>
                                <input 
                                    type={formConfig.fields.company.type}
                                    placeholder={formConfig.fields.company.placeholder}
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.company.required}
                                />
                            </div>
                        </div>

                        {/* Project Type Selection */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.projectType.icon}</span>
                                <select 
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleInputChange}
                                    required={formConfig.fields.projectType.required}
                                    className={errors.projectType ? 'error' : ''}
                                >
                                    {formConfig.fields.projectType.options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.projectType && <span className="error-message">{errors.projectType}</span>}
                        </div>

                        {/* Subject Field */}
                        <div className="single-input-field">
                            <div className="input-with-icon">
                                <span className="input-icon">{formConfig.fields.subject.icon}</span>
                                <input 
                                    type={formConfig.fields.subject.type}
                                    placeholder={formConfig.fields.subject.placeholder}
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.subject.required}
                                    className={errors.subject ? 'error' : ''}
                                />
                            </div>
                            {errors.subject && <span className="error-message">{errors.subject}</span>}
                        </div>

                        {/* Message Field */}
                        <div className="single-input-field mt-3">
                            <div className="input-with-icon">
                                <span className="input-icon message-icon">{formConfig.fields.message.icon}</span>
                                <textarea 
                                    placeholder={formConfig.fields.message.placeholder}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    required={formConfig.fields.message.required}
                                    rows={formConfig.fields.message.rows}
                                    className={errors.message ? 'error' : ''}
                                ></textarea>
                            </div>
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="single-input-fields-button">
                            <button 
                                type="submit" 
                                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span>
                                        <span className="spinner"></span>
                                        Sending...
                                    </span>
                                ) : (
                                    formConfig.submitButtonText
                                )}
                            </button>
                        </div>

                        {/* Contact Information */}
                        <div className="contact-info-footer mt-4 p-3 bg-light rounded">
                            <h6 className="text-primary mb-2">📧 Direct Contact</h6>
                            <p className="mb-1"><strong>Email:</strong> mohammed.agra@rejlers.ae</p>
                            <p className="mb-1"><strong>Phone:</strong> +971 2 639 7449</p>
                            <p className="mb-0"><strong>Office:</strong> Rejlers Tower, 13th floor, Abu Dhabi</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AboutForm;