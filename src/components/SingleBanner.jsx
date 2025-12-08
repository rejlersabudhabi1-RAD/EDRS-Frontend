import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLink as Link } from 'react-router-hash-link';

const SingleBanner = ({ banner }) => {
    const { id, subtitle, title, highlight, text, stats, btn1, btn2, btn1Link, btn2Link } = banner;
    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true });
    const [digitalElements, setDigitalElements] = useState([]);

    // Innovative gradient themes for different slides
    const innovativeThemes = {
        1: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            accent: '#667eea',
            particles: '#ffffff'
        },
        2: {
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            accent: '#f093fb',
            particles: '#ffffff'
        },
        3: {
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            accent: '#4facfe',
            particles: '#ffffff'
        }
    };

    const currentTheme = innovativeThemes[id] || innovativeThemes[1];

    // Generate digital elements for innovation
    useEffect(() => {
        const elements = [];
        for (let i = 0; i < 30; i++) {
            elements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 2,
                opacity: Math.random() * 0.8 + 0.2,
                delay: Math.random() * 5,
                type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
            });
        }
        setDigitalElements(elements);
    }, [id]);

    const bannerStyle = {
        background: currentTheme.background,
        backgroundSize: '400% 400%'
    };

    return (
        <>
            <div className="innovative-banner-slide" style={bannerStyle}>
                {/* Digital Innovation Grid */}
                <div className="digital-grid">
                    <div className="grid-lines horizontal"></div>
                    <div className="grid-lines vertical"></div>
                </div>

                {/* Floating Digital Elements */}
                <div className="digital-elements">
                    {digitalElements.map(element => (
                        <div
                            key={element.id}
                            className={`digital-element ${element.type}`}
                            style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                opacity: element.opacity,
                                animationDelay: `${element.delay}s`,
                                backgroundColor: currentTheme.particles
                            }}
                        ></div>
                    ))}
                </div>

                {/* Innovative Geometric Overlay */}
                <div className="innovative-overlay">
                    <div className="tech-hexagon hex-1"></div>
                    <div className="tech-hexagon hex-2"></div>
                    <div className="tech-circuit"></div>
                </div>

                <div className="container-fluid h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-lg-7">
                            <div ref={contentRef} className={`innovative-banner-content ${contentInView ? 'animate-in' : ''}`}>
                                
                                {/* Subtitle Badge */}
                                <div className="subtitle-innovation">
                                    <span className="innovation-icon">⚡</span>
                                    <span className="innovation-text">{subtitle}</span>
                                    <div className="innovation-pulse"></div>
                                </div>

                                {/* Main Title with Highlight */}
                                <div className="title-innovation-wrapper">
                                    <h1 className="title-innovation-main">{title}</h1>
                                    <h2 className="title-innovation-highlight" style={{ color: currentTheme.accent }}>
                                        {highlight}
                                    </h2>
                                    <div className="title-underline" style={{ backgroundColor: currentTheme.accent }}></div>
                                </div>

                                {/* Description */}
                                <p className="description-innovation">{text}</p>

                                {/* Stats Display */}
                                {stats && (
                                    <div className="stats-innovation">
                                        {stats.map((stat, index) => (
                                            <div key={index} className="stat-innovation-item">
                                                <div className="stat-number" style={{ color: currentTheme.accent }}>
                                                    {stat.number}
                                                </div>
                                                <div className="stat-label">{stat.label}</div>
                                                <div className="stat-line" style={{ backgroundColor: currentTheme.accent }}></div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="actions-innovation">
                                    <Link to={btn1Link || "/login"} className="btn-innovation primary" style={{ borderColor: currentTheme.accent }}>
                                        <span className="btn-icon">🚀</span>
                                        <span className="btn-text">{btn1}</span>
                                        <span className="btn-arrow">→</span>
                                        <div className="btn-glow" style={{ backgroundColor: currentTheme.accent }}></div>
                                    </Link>
                                    <Link to={btn2Link || "/about"} className="btn-innovation secondary">
                                        <span className="btn-icon">💡</span>
                                        <span className="btn-text">{btn2}</span>
                                        <span className="btn-arrow">→</span>
                                        <div className="btn-glow-secondary"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Visual Innovation */}
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="innovation-visual">
                                
                                {/* EDRS Platform Mockup */}
                                <div className="platform-mockup">
                                    <div className="mockup-header">
                                        <div className="mockup-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                        <div className="mockup-title">EDRS AI Platform</div>
                                        <div className="mockup-status">
                                            <span className="status-dot active"></span>
                                            <span>Live</span>
                                        </div>
                                    </div>
                                    <div className="mockup-content">
                                        <div className="process-item">
                                            <div className="process-icon">📋</div>
                                            <div className="process-info">
                                                <span className="process-name">P&ID Processing</span>
                                                <div className="process-progress">
                                                    <div className="progress-fill" style={{width: '92%', backgroundColor: currentTheme.accent}}></div>
                                                </div>
                                                <span className="process-percent">92%</span>
                                            </div>
                                        </div>
                                        <div className="process-item">
                                            <div className="process-icon">🔍</div>
                                            <div className="process-info">
                                                <span className="process-name">AI Analysis</span>
                                                <div className="process-progress">
                                                    <div className="progress-fill" style={{width: '98%', backgroundColor: currentTheme.accent}}></div>
                                                </div>
                                                <span className="process-percent">98%</span>
                                            </div>
                                        </div>
                                        <div className="process-item">
                                            <div className="process-icon">✅</div>
                                            <div className="process-info">
                                                <span className="process-name">Validation</span>
                                                <div className="process-progress">
                                                    <div className="progress-fill" style={{width: '89%', backgroundColor: currentTheme.accent}}></div>
                                                </div>
                                                <span className="process-percent">89%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Tech Icons */}
                                <div className="floating-tech-icons">
                                    <div className="tech-icon icon-1" style={{ borderColor: currentTheme.accent }}>⚙️</div>
                                    <div className="tech-icon icon-2" style={{ borderColor: currentTheme.accent }}>🔬</div>
                                    <div className="tech-icon icon-3" style={{ borderColor: currentTheme.accent }}>📊</div>
                                    <div className="tech-icon icon-4" style={{ borderColor: currentTheme.accent }}>🏗️</div>
                                    <div className="tech-icon icon-5" style={{ borderColor: currentTheme.accent }}>🤖</div>
                                </div>

                                {/* Innovation Pulse */}
                                <div className="innovation-pulse-center" style={{ backgroundColor: currentTheme.accent }}>
                                    <div className="pulse-ring ring-1" style={{ borderColor: currentTheme.accent }}></div>
                                    <div className="pulse-ring ring-2" style={{ borderColor: currentTheme.accent }}></div>
                                    <div className="pulse-ring ring-3" style={{ borderColor: currentTheme.accent }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Innovation Lines */}
                <div className="innovation-lines">
                    <div className="line line-1" style={{ backgroundColor: currentTheme.accent }}></div>
                    <div className="line line-2" style={{ backgroundColor: currentTheme.accent }}></div>
                    <div className="line line-3" style={{ backgroundColor: currentTheme.accent }}></div>
                </div>
            </div>
        </>
    );
};

export default SingleBanner;