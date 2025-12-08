/**
 * Simple AI Dashboard Component - Minimal version for testing
 */

import React, { useState, useEffect } from 'react';

const AIDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [serviceStatus, setServiceStatus] = useState(null);

    useEffect(() => {
        // Simple loading simulation
        setTimeout(() => {
            setLoading(false);
            setServiceStatus({
                services: {
                    ai_services_loaded: true,
                    openai_configured: true
                }
            });
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="ai-dashboard-loading">
                <div className="loading-content">
                    <span className="robot-icon">🤖</span>
                    <p>Loading AI Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ai-dashboard">
            <div className="dashboard-header">
                <div className="header-title">
                    <span className="dashboard-icon">🤖</span>
                    <h2>AI Service Dashboard</h2>
                    <span className="powered-by">Powered by OpenAI</span>
                </div>
            </div>

            <div className="dashboard-section">
                <h3>Service Status</h3>
                <div className="service-grid">
                    <div className="service-card">
                        <div className="service-header">
                            <span className="service-icon">👁️</span>
                            <span>PDF to P&ID Conversion</span>
                            <span className="status-icon">✅</span>
                        </div>
                        <div className="service-details">
                            <p>OpenAI GPT-4 Vision</p>
                            <p className="model-info">Advanced visual analysis</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-header">
                            <span className="service-icon">🧠</span>
                            <span>Document Classification</span>
                            <span className="status-icon">✅</span>
                        </div>
                        <div className="service-details">
                            <p>OpenAI GPT-4</p>
                            <p className="model-info">Intelligent content analysis</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-header">
                            <span className="service-icon">✅</span>
                            <span>Document Validation</span>
                            <span className="status-icon">✅</span>
                        </div>
                        <div className="service-details">
                            <p>OpenAI GPT-4</p>
                            <p className="model-info">Comprehensive validation</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h3>AI Processing Statistics</h3>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-icon">📊</span>
                        <div className="stat-content">
                            <div className="stat-value">1,247</div>
                            <div className="stat-label">Documents Processed</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">✅</span>
                        <div className="stat-content">
                            <div className="stat-value">97.3%</div>
                            <div className="stat-label">Success Rate</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">⚙️</span>
                        <div className="stat-content">
                            <div className="stat-value">3.2s</div>
                            <div className="stat-label">Avg Processing Time</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">🤖</span>
                        <div className="stat-content">
                            <div className="stat-value">3</div>
                            <div className="stat-label">Active AI Services</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ai-dashboard {
                    padding: 2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    color: white;
                }
                
                .ai-dashboard-loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .loading-content {
                    text-align: center;
                    animation: pulse 2s infinite;
                }
                
                .robot-icon {
                    font-size: 4rem;
                    display: block;
                    margin-bottom: 1rem;
                }
                
                .dashboard-header {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                    padding: 1.5rem 2rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .header-title {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .dashboard-icon {
                    font-size: 2.5rem;
                }
                
                .header-title h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0;
                }
                
                .powered-by {
                    background: rgba(74, 222, 128, 0.2);
                    color: #4ade80;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .dashboard-section {
                    margin-bottom: 2.5rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .dashboard-section h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #f8fafc;
                }
                
                .service-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                
                .service-card {
                    background: rgba(255, 255, 255, 0.15);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s ease;
                }
                
                .service-card:hover {
                    transform: translateY(-5px);
                }
                
                .service-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }
                
                .service-icon {
                    font-size: 1.5rem;
                    margin-right: 0.5rem;
                }
                
                .status-icon {
                    font-size: 1.2rem;
                }
                
                .service-details p {
                    margin: 0.3rem 0;
                    font-weight: 600;
                }
                
                .model-info {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 400;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                }
                
                .stat-card {
                    background: rgba(255, 255, 255, 0.15);
                    padding: 1.5rem;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .stat-icon {
                    font-size: 2.5rem;
                }
                
                .stat-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f8fafc;
                }
                
                .stat-label {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default AIDashboard;