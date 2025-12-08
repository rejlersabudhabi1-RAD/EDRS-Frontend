import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        projectType: 'engineering-consulting', // Default project type
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

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
                [name]: ''
            }));
        }
    };

    const handleMessage = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            // Enhanced form validation
            const validationErrors = {};
            
            if (!formData.name.trim()) {
                validationErrors.name = 'Name is required';
            } else if (formData.name.trim().length < 2) {
                validationErrors.name = 'Name must be at least 2 characters';
            }

            if (!formData.email.trim()) {
                validationErrors.email = 'Email is required';
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    validationErrors.email = 'Please enter a valid email address';
                }
            }

            if (!formData.phone.trim()) {
                validationErrors.phone = 'Phone number is required';
            } else {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                if (!phoneRegex.test(formData.phone.trim())) {
                    validationErrors.phone = 'Invalid phone number format';
                }
            }

            if (!formData.subject.trim()) {
                validationErrors.subject = 'Subject is required';
            }

            if (!formData.message.trim()) {
                validationErrors.message = 'Message is required';
            } else if (formData.message.trim().length < 20) {
                validationErrors.message = 'Message must be at least 20 characters';
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                toast.error('Please correct the validation errors');
                setIsSubmitting(false);
                return;
            }

            // Call the actual backend API endpoint
            const response = await fetch('http://localhost:8000/ai-erp/api/consultation/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    subject: formData.subject.trim(),
                    projectType: formData.projectType,
                    message: formData.message.trim(),
                    company: '', // Optional field
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(data.message || 'Thank you! We will contact you within 24 hours.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    projectType: 'engineering-consulting',
                    message: ''
                });
                setErrors({});
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                    toast.error('Please correct the validation errors');
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
            }
        } catch (error) {
            console.error('Contact form error:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                toast.error('Unable to connect to the server. Please try again later or contact us directly at info@rejlers.ae');
            } else {
                toast.error('Sorry, there was an issue sending your message. Please try again or contact us directly at info@rejlers.ae');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="contact-page-form">
                <h2>Get in Touch</h2>
                <form onSubmit={handleMessage}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input 
                                    type="text" 
                                    placeholder="Your Name*" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    autoComplete='off' 
                                    required 
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.name}</span>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input 
                                    type="email" 
                                    placeholder="E-mail*" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete='off' 
                                    required 
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.email}</span>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number*" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    autoComplete='off' 
                                    required
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.phone}</span>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="single-input-field">
                                <input 
                                    type="text" 
                                    placeholder="Subject*" 
                                    name="subject" 
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    autoComplete='off' 
                                    required 
                                    className={errors.subject ? 'error' : ''}
                                />
                                {errors.subject && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.subject}</span>}
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="single-input-field">
                                <select 
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <option value="engineering-consulting">Engineering Consulting</option>
                                    <option value="energy-transition">Energy Transition</option>
                                    <option value="industry-transformation">Industry Transformation</option>
                                    <option value="future-proof-communities">Future-Proof Communities</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.projectType && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.projectType}</span>}
                            </div>
                        </div>
                        <div className="col-sm-12 message-input">
                            <div className="single-input-field">
                                <textarea 
                                    placeholder="Write Your Message* (minimum 20 characters)" 
                                    name="message" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    autoComplete='off' 
                                    required
                                    rows="5"
                                    className={errors.message ? 'error' : ''}
                                ></textarea>
                                {errors.message && <span className="error-message" style={{color: '#dc3545', fontSize: '0.875rem'}}>{errors.message}</span>}
                            </div>
                        </div>
                        <button type="submit" className='submit-btn' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </div>
                </form>
                
                {/* Contact Information */}
                <div className="contact-form-footer mt-4 p-4" style={{ background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                    <h5 style={{ color: '#0f1934', marginBottom: '15px' }}>📧 Direct Contact Information</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href="mailto:info@rejlers.ae">info@rejlers.ae</a></p>
                            <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> <a href="tel:+971263974449">+971 2 639 7449</a></p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ marginBottom: '8px' }}><strong>Office:</strong> Rejlers Tower, 13th floor</p>
                            <p style={{ marginBottom: '8px' }}><strong>Location:</strong> Abu Dhabi, UAE</p>
                        </div>
                    </div>
                    <p style={{ marginBottom: '0', fontSize: '0.9rem', color: '#6c757d' }}>
                        💼 For EDRS platform support or technical inquiries, please mention "EDRS" in your subject line.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ContactForm;