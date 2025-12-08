import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                width: '90%'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <i className="fas fa-oil-well" style={{ fontSize: '4rem', color: '#667eea', marginBottom: '20px' }}></i>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
                        Rejlers EDRS
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '40px' }}>
                        AI-Powered Engineering Document & Review System for Oil & Gas Operations
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <i className="fas fa-tachometer-alt"></i>
                        Access Dashboard
                    </button>

                    <button 
                        onClick={() => navigate('/home')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#374151',
                            border: '2px solid #e5e7eb',
                            padding: '15px 30px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.borderColor = '#667eea';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.borderColor = '#e5e7eb';
                        }}
                    >
                        <i className="fas fa-home"></i>
                        Company Home
                    </button>
                </div>

                <div style={{ 
                    marginTop: '40px', 
                    padding: '20px', 
                    background: 'rgba(59, 130, 246, 0.05)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
                        EDRS Capabilities
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', fontSize: '14px', color: '#6b7280' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-exchange-alt" style={{ color: '#667eea' }}></i>
                            PFD to P&ID Conversion
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-shield-check" style={{ color: '#10b981' }}></i>
                            Document Validation
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-cloud-upload-alt" style={{ color: '#f59e0b' }}></i>
                            Intelligent Upload
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-chart-line" style={{ color: '#8b5cf6' }}></i>
                            Analytics & Reporting
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-brain" style={{ color: '#ef4444' }}></i>
                            AI Processing Engine
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-project-diagram" style={{ color: '#06b6d4' }}></i>
                            Project Management
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;