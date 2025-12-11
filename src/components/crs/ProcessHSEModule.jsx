import React, { useState } from 'react';
import CRSLayout from './CRSLayout';

const ProcessHSEModule = () => {
    const [activeTab, setActiveTab] = useState('safety-audits');

    const modules = {
        'safety-audits': {
            title: 'Safety Audits',
            icon: 'fas fa-clipboard-check',
            description: 'Comprehensive safety audit management and tracking system',
            features: [
                'Scheduled Audit Planning',
                'Audit Checklist Templates',
                'Finding Documentation',
                'Corrective Action Tracking',
                'Compliance Reporting'
            ]
        },
        'hse-compliance': {
            title: 'HSE Compliance',
            icon: 'fas fa-shield-alt',
            description: 'Health, Safety and Environment compliance monitoring',
            features: [
                'Regulatory Compliance Tracking',
                'Permit Management',
                'Environmental Impact Assessment',
                'Safety Data Sheets',
                'Compliance Calendar'
            ]
        },
        'risk-assessment': {
            title: 'Risk Assessment',
            icon: 'fas fa-exclamation-triangle',
            description: 'Systematic risk identification and mitigation',
            features: [
                'HAZOP Studies',
                'Risk Matrix Analysis',
                'Mitigation Strategies',
                'Risk Register',
                'Continuous Monitoring'
            ]
        },
        'incident-management': {
            title: 'Incident Management',
            icon: 'fas fa-ambulance',
            description: 'Incident reporting, investigation, and prevention',
            features: [
                'Incident Reporting',
                'Root Cause Analysis',
                'Investigation Tracking',
                'Corrective Actions',
                'Lessons Learned Database'
            ]
        }
    };

    return (
        <CRSLayout
            title="Process and HSE"
            description="Health, Safety and Environment Management for Process Operations"
            icon="fas fa-hard-hat"
            color="#ef4444"
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #e5e7eb',
                    paddingBottom: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {Object.entries(modules).map(([key, module]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: activeTab === key ? '#ef4444' : 'white',
                                color: activeTab === key ? 'white' : '#4b5563',
                                border: `2px solid ${activeTab === key ? '#ef4444' : '#e5e7eb'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '14px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <i className={module.icon} style={{ marginRight: '0.5rem' }}></i>
                            {module.title}
                        </button>
                    ))}
                </div>
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e5e7eb' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <i className={modules[activeTab].icon} style={{ fontSize: '24px' }}></i>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                                {modules[activeTab].title}
                            </h2>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '14px', color: '#6b7280' }}>
                                {modules[activeTab].description}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {modules[activeTab].features.map((feature, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    flexShrink: 0
                                }}>
                                    {index + 1}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        padding: '2rem',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        border: '1px solid #fbbf24',
                        textAlign: 'center'
                    }}>
                        <i className="fas fa-hammer" style={{ fontSize: '48px', color: '#d97706', marginBottom: '1rem' }}></i>
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#92400e', marginBottom: '0.5rem' }}>
                            Module Under Development
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#78350f' }}>
                            This module is currently being developed. Full functionality will be available soon.
                        </p>
                    </div>
                </div>
            </div>
        </CRSLayout>
    );
};

export default ProcessHSEModule;