import React, { useState } from 'react';

const DocumentUploadMinimal = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select a file');
            return;
        }

        setUploading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('report_format', 'json');
            formData.append('analysis_type', 'classification');

            const response = await fetch('http://localhost:8000/ai-erp/api/ai/document-upload-report/', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setResult(data);
            alert(data.success ? 'Upload successful!' : 'Upload failed!');
        } catch (error) {
            alert('Error: ' + error.message);
            setResult({ error: error.message });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Document Upload</h1>
            <div style={{ marginBottom: '1rem' }}>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {result && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5' }}>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DocumentUploadMinimal;
