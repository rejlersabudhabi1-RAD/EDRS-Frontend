import React, { useState } from 'react';
import API_CONFIG from '../config/api';

const APITest = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testAPI = async () => {
        setLoading(true);
        try {
            // Test health endpoint first
            const healthResponse = await fetch(API_CONFIG.getEndpoint('HEALTH'));
            const healthData = await healthResponse.json();
            
            let resultText = `Health Check: ${healthResponse.status} - ${healthData.message}\n`;
            
            // Test login endpoint
            const loginResponse = await fetch(API_CONFIG.getEndpoint('LOGIN'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'tanzeem@rejlers.ae',
                    password: 'Tanzeem@123'
                })
            });
            
            const loginData = await loginResponse.json();
            resultText += `Login Test: ${loginResponse.status} - ${loginData.success ? 'Success' : 'Failed'}\n`;
            
            if (loginData.user) {
                resultText += `User: ${loginData.user.email}\n`;
                resultText += `Role: ${loginData.role?.description}\n`;
            }
            
            setResult(resultText);
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3>API Connection Test</h3>
                </div>
                <div className="card-body">
                    <button 
                        className="btn btn-primary" 
                        onClick={testAPI}
                        disabled={loading}
                    >
                        {loading ? 'Testing...' : 'Test API Connection'}
                    </button>
                    
                    {result && (
                        <div className="mt-3">
                            <h5>Test Results:</h5>
                            <pre className="bg-light p-3">{result}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default APITest;