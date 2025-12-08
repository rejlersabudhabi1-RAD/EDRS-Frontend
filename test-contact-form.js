// Test script for Contact Form API functionality
import fetch from 'node-fetch';

async function testContactForm() {
    console.log('🧪 Testing Contact Form API...');
    
    const testData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971 50 123 4567',
        subject: 'Test Inquiry from EDRS Platform',
        projectType: 'engineering-consulting',
        message: 'This is a test message to verify the contact form functionality is working properly with the backend API. The message needs to be at least 20 characters long.'
    };
    
    try {
        console.log('📝 Sending test form data:', testData);
        
        const response = await fetch('http://localhost:8000/ai-erp/api/consultation/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('🌐 Response Status:', response.status, response.statusText);
        
        const result = await response.json();
        console.log('📨 Response Data:', result);
        
        if (response.ok && result.success) {
            console.log('✅ SUCCESS: Contact form is working properly!');
            console.log('📋 Reference Number:', result.reference);
            console.log('📅 Submitted At:', result.submitted_at);
            console.log('💬 Message:', result.message);
        } else {
            console.log('❌ ERROR: Form submission failed');
            if (result.errors) {
                console.log('📝 Validation Errors:', result.errors);
            }
        }
        
    } catch (error) {
        console.log('💥 NETWORK ERROR:', error.message);
        console.log('🔧 Possible issues:');
        console.log('   - Backend server not running on port 8000');
        console.log('   - CORS configuration issues');
        console.log('   - Network connectivity problems');
    }
}

// Test with invalid data to check validation
async function testValidation() {
    console.log('\n🧪 Testing Form Validation...');
    
    const invalidData = {
        name: '',
        email: 'invalid-email',
        phone: 'abc123',
        subject: '',
        projectType: 'engineering-consulting',
        message: 'Short msg'
    };
    
    try {
        const response = await fetch('http://localhost:8000/ai-erp/api/consultation/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(invalidData)
        });
        
        const result = await response.json();
        
        if (response.status === 400 && result.errors) {
            console.log('✅ VALIDATION: Backend validation is working correctly');
            console.log('📝 Expected Errors:', result.errors);
        } else {
            console.log('⚠️  WARNING: Validation might not be working as expected');
        }
        
    } catch (error) {
        console.log('💥 VALIDATION TEST ERROR:', error.message);
    }
}

// Run tests
async function runAllTests() {
    console.log('🚀 Starting Contact Form Tests...\n');
    
    await testContactForm();
    await testValidation();
    
    console.log('\n✨ Tests completed!');
    console.log('📌 Next steps:');
    console.log('   1. Check the contact form at http://localhost:3000/contact');
    console.log('   2. Fill out the form to test the user experience');
    console.log('   3. Verify that success/error messages appear correctly');
}

// Auto-run the tests
runAllTests();