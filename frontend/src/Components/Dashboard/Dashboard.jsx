import React, { useState } from 'react';
import './Dashboard.css'; // Move styles to an external CSS file

function Dashboard() {
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setResult('Invalid file type. Please upload JPG, PNG, or GIF format.');
        setImagePreview(null); // Clear preview if invalid file
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetectClick = () => {
    if (imagePreview) {
      setLoading(true);
      setResult('');
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setResult('Fracture detected!');
      }, 3000);
    } else {
      setResult('Please upload an image.');
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setResult('');
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>Fracture Detection Portal</h1>
        <p>Upload your Bone X-Rays or CT Scans and get AI-powered Fracture Detection Results</p>
      </div>

      {/* Main Content */}
      <div className="container main-content">
        <h2>Upload Your Scan</h2>
        <p>Supported formats: JPG, PNG, GIF</p>

        {/* Upload Section */}
        <div className="upload-section">
          <input
            className="inputs"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            aria-label="Upload bone scan image"
          />
          {result && result.includes('Invalid') && (
            <p className="error-message">{result}</p>
          )}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          <button onClick={handleDetectClick} disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : 'Detect Fracture'}
          </button>
          {imagePreview && (
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
          )}
        </div>

        {/* Result Section */}
        <div id="result">{result && !result.includes('Invalid') && result}</div>
      </div>
    </div>
  );
}

export default Dashboard;
