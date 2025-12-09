import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import API_CONFIG from '../config/api';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    // Oil & Gas industry features
    const industryFeatures = [
        {
            icon: 'fas fa-oil-well',
            title: 'AI-Powered Drawing Analysis',
            description: 'Advanced OCR and machine learning algorithms for technical drawing interpretation and automated extraction of engineering data',
            bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: 'fas fa-industry',
            title: 'Process Simulation & Modeling',
            description: 'Real-time fluid dynamics, thermodynamic calculations, and process optimization for upstream and downstream operations',
            bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'Engineering Analytics & Insights',
            description: 'Data-driven insights for equipment performance, predictive maintenance, and operational excellence in energy sector',
            bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            icon: 'fas fa-cogs',
            title: 'Equipment Optimization',
            description: 'Predictive maintenance algorithms, performance enhancement tools, and real-time monitoring for critical assets',
            bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            icon: 'fas fa-globe',
            title: 'Global Standards Compliance',
            description: 'Integrated API, ISO, ASME, NORSOK standards validation and automated compliance checking for international projects',
            bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ];

    useEffect(() => {
        // Auto-rotate feature slides
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % industryFeatures.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(API_CONFIG.getEndpoint('LOGIN'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Store authentication data
                localStorage.setItem('access_token', data.tokens.access);
                localStorage.setItem('refresh_token', data.tokens.refresh);
                localStorage.setItem('user_info', JSON.stringify(data.user));
                localStorage.setItem('user_role', JSON.stringify(data.role));
                localStorage.setItem('user_profile', JSON.stringify(data.profile));

                toast.success(`Welcome to EDRS Dashboard, ${data.user.first_name}! All features unlocked.`);
                
                // Always redirect to dashboard with EDRS features
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                toast.error(data.error || 'Authentication failed. Please verify your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Network connectivity issue. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const loginPageStyles = `
        .oil-gas-login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
            position: relative;
            overflow: hidden;
        }

        .oil-gas-login-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
        }

        @keyframes backgroundShift {
            0%, 100% { transform: translateX(0) translateY(0); }
            33% { transform: translateX(-10px) translateY(-10px); }
            66% { transform: translateX(10px) translateY(10px); }
        }

        .industry-grid-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridFloat 30s linear infinite;
        }

        @keyframes gridFloat {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            box-shadow: 
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .feature-slide {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-slide:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .login-form-input {
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px 20px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(248, 250, 252, 0.8);
        }

        .login-form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            background: white;
            transform: translateY(-1px);
        }

        .btn-oil-gas {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
            border: none;
            border-radius: 12px;
            padding: 16px 24px;
            font-weight: 600;
            font-size: 16px;
            color: white;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-oil-gas:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
        }

        .btn-oil-gas::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .btn-oil-gas:hover::before {
            left: 100%;
        }

        .stats-counter {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .floating-element {
            position: absolute;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .security-badge {
            background: linear-gradient(135deg, #10b981, #34d399);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
    `;

    return (
        <>
            <Helmet>
                <title>Login - Rejlers AI-Powered ERP | Oil & Gas Engineering Solutions</title>
                <meta name="description" content="Access your Rejlers AI-powered ERP system for Oil & Gas engineering operations. Advanced drawing analysis, process simulation, and compliance management." />
                <style>{loginPageStyles}</style>
            </Helmet>

            <div className="oil-gas-login-container">
                <div className="industry-grid-pattern"></div>
                
                {/* Floating Elements */}
                <div className="floating-element" style={{top: '10%', left: '5%', animationDelay: '0s'}}>
                    <div style={{width: '60px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%'}}></div>
                </div>
                <div className="floating-element" style={{top: '60%', right: '8%', animationDelay: '2s'}}>
                    <div style={{width: '40px', height: '40px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%'}}></div>
                </div>
                <div className="floating-element" style={{bottom: '20%', left: '12%', animationDelay: '4s'}}>
                    <div style={{width: '50px', height: '50px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%'}}></div>
                </div>

                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center">
                        {/* Left Panel - Industry Showcase */}
                        <div className="col-lg-7 d-none d-lg-block">
                            <div className="px-5">
                                {/* Company Branding */}
                                <div className="mb-5">
                                    <div className="d-flex align-items-center mb-4">
                                        <img src="/img/logo/rejlers-logo.png" alt="REJLERS" style={{height: '60px'}} />
                                        <div className="ms-3">
                                            <h2 className="text-white mb-0 fw-bold">Rejlers</h2>
                                            <small className="text-light opacity-75">Engineering Excellence</small>
                                        </div>
                                    </div>
                                    
                                    <h1 className="display-4 fw-bold text-white mb-4">
                                        AI-Powered ERP for 
                                        <span className="d-block" style={{
                                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            Oil & Gas Engineering
                                        </span>
                                    </h1>
                                    
                                    <p className="lead text-light opacity-90 mb-5">
                                        Revolutionary engineering solutions powered by artificial intelligence for the global energy sector. 
                                        Streamline operations, optimize processes, and ensure compliance with cutting-edge technology.
                                    </p>
                                </div>

                                {/* Feature Showcase */}
                                <div className="feature-slide p-4 mb-4" style={{background: industryFeatures[currentSlide].bgColor}}>
                                    <div className="d-flex align-items-start">
                                        <div className="flex-shrink-0 me-4">
                                            <div className="d-flex align-items-center justify-content-center" 
                                                 style={{width: '70px', height: '70px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px'}}>
                                                <i className={`${industryFeatures[currentSlide].icon} text-white`} style={{fontSize: '28px'}}></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h3 className="h4 text-white fw-bold mb-3">{industryFeatures[currentSlide].title}</h3>
                                            <p className="text-white opacity-90 mb-0 lh-lg">{industryFeatures[currentSlide].description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Indicators */}
                                    <div className="d-flex justify-content-center mt-4 gap-2">
                                        {industryFeatures.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`btn p-0 ${index === currentSlide ? 'pulse-dot bg-white' : 'bg-white opacity-50'}`}
                                                style={{
                                                    width: index === currentSlide ? '24px' : '8px',
                                                    height: '8px',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onClick={() => setCurrentSlide(index)}
                                            ></button>
                                        ))}
                                    </div>
                                </div>

                                {/* Industry Statistics */}
                                <div className="row text-center">
                                    <div className="col-4">
                                        <div className="stats-counter">500+</div>
                                        <small className="text-light d-block">Projects Delivered</small>
                                    </div>
                                    <div className="col-4">
                                        <div className="stats-counter">50+</div>
                                        <small className="text-light d-block">Countries Served</small>
                                    </div>
                                    <div className="col-4">
                                        <div className="stats-counter">99.9%</div>
                                        <small className="text-light d-block">System Uptime</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Login Form */}
                        <div className="col-lg-5 col-md-8 col-sm-10 mx-auto">
                            <div className="glass-panel p-5 mx-3">
                                {/* Security Status */}
                                <div className="text-center mb-4">
                                    <div className="security-badge mx-auto">
                                        <i className="fas fa-shield-alt"></i>
                                        <span>Secure Connection Active</span>
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="text-center mb-5">
                                    <div className="d-inline-flex align-items-center justify-content-center mb-4" 
                                         style={{
                                             width: '80px', 
                                             height: '80px', 
                                             background: 'linear-gradient(135deg, #1e40af, #3b82f6)', 
                                             borderRadius: '20px',
                                             boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                                         }}>
                                        <i className="fas fa-user-shield text-white" style={{fontSize: '32px'}}></i>
                                    </div>
                                    <h2 className="h3 fw-bold text-dark mb-2">Welcome Back</h2>
                                    <p className="text-muted mb-0">Access your engineering workspace</p>
                                </div>

                                {/* Login Form */}
                                <form onSubmit={handleSubmit}>
                                    {/* Email Field */}
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-semibold text-dark">Professional Email</label>
                                        <div className="position-relative">
                                            <i className="fas fa-envelope position-absolute" 
                                               style={{left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', zIndex: 10}}></i>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control login-form-input ps-5"
                                                placeholder="your.name@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label fw-semibold text-dark">Secure Password</label>
                                        <div className="position-relative">
                                            <i className="fas fa-lock position-absolute" 
                                               style={{left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', zIndex: 10}}></i>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                className="form-control login-form-input px-5"
                                                placeholder="Enter your secure password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn position-absolute"
                                                style={{right: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10}}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                                            <label className="form-check-label text-sm" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#" className="text-decoration-none fw-medium" style={{color: '#3b82f6'}}>
                                            Forgot Password?
                                        </a>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-oil-gas w-100 mb-4"
                                    >
                                        <div className="d-flex align-items-center justify-content-center">
                                            {loading ? (
                                                <>
                                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    Authenticating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-sign-in-alt me-2"></i>
                                                    Sign In to Workspace
                                                </>
                                            )}
                                        </div>
                                    </button>

                                    {/* Divider */}
                                    <div className="text-center mb-4">
                                        <span className="text-muted small bg-white px-3">New to Rejlers ERP?</span>
                                        <hr className="mt-n2" />
                                    </div>

                                    {/* Registration Button */}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/register')}
                                        className="btn btn-outline-primary w-100"
                                        style={{borderRadius: '12px', padding: '12px 24px'}}
                                    >
                                        <i className="fas fa-user-plus me-2"></i>
                                        Create Engineering Account
                                    </button>
                                </form>

                                {/* Security Footer */}
                                <div className="text-center mt-4">
                                    <div className="d-flex justify-content-center align-items-center gap-3 text-muted small">
                                        <span className="d-flex align-items-center">
                                            <i className="fas fa-shield-alt text-success me-1"></i>
                                            ISO 27001
                                        </span>
                                        <span className="d-flex align-items-center">
                                            <i className="fas fa-lock text-success me-1"></i>
                                            GDPR Compliant
                                        </span>
                                        <span className="d-flex align-items-center">
                                            <i className="fas fa-certificate text-success me-1"></i>
                                            SOC 2 Type II
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;