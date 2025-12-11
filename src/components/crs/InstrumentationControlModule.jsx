import React, { useState } from 'react';
import CRSLayout from './CRSLayout';

const InstrumentationControlModule = () => {
    const [activeTab, setActiveTab] = useState('control-systems');

    const modules = {
        'control-systems': {
            title: 'Control Systems',
            icon: 'fas fa-sliders-h',
            description: 'Advanced process control and automation systems',
            features: [
                'DCS Configuration',
                'PLC Programming',
                'SCADA Integration',
                'Control Loop Tuning',
                'HMI Development'
            ]
        },
        'sensor-monitoring': {
            title: 'Sensor Monitoring',
            icon: 'fas fa-broadcast-tower',
            description: 'Real-time sensor data monitoring and analysis',
            features: [
                'RTD Monitoring',
                'Thermocouple Readings',
                'Pressure Transmitters',
                'Flow Meters',
                'Level Transmitters'
            ]
        },
        'automation': {
            title: 'Automation',
            icon: 'fas fa-robot',
            description: 'Industrial automation and process optimization',
            features: [
                'Process Automation',
                'Batch Control',
                'Sequential Control',
                'Safety Instrumented Systems',
                'Emergency Shutdown Systems'
            ]
        },
        'calibration-management': {
            title: 'Calibration Management',
            icon: 'fas fa-tools',
            description: 'Instrument calibration scheduling and tracking',
            features: [
                'Calibration Scheduling',
                'Calibration Certificates',
                'Drift Analysis',
                'As-Found/As-Left Records',
                'Calibration Standards Tracking'
            ]
        }
    };

    return (
        <CRSLayout
            title="Instrumentation and Control"
            description="I and C Systems Management and Monitoring"
            icon="fas fa-microchip"
            color="#8b5cf6"
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
                                background: activeTab === key ? '#8b5cf6' : 'white',
                                color: activeTab === key ? 'white' : '#4b5563',
                                border: `2px solid ${activeTab === key ? '#8b5cf6' : '#e5e7eb'}`,
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
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
                                    background: '#8b5cf6',
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

export default InstrumentationControlModule;