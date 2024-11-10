import React, { useState, useEffect } from 'react';

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
      setTimeout(() => {
        setLoading(false);
        setResult('Fracture detected!');
      }, 3000);
    } else {
      setResult('Please upload an image.');
    }
  };

  return (
    <div>
      <style>{`
        body {
          font-family: 'Arial', sans-serif;
          background-color:#e4e7eb;
          color: #333;
          margin-bottom: 60px;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .navbar {
          background-color: #007bff;
          padding: 15px 0;
          text-align: center;
          position: fixed;
          top: 0;
          width: 100%;
          height:60px;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .navbar a {
          font-size: 1.2rem;
          margin: 0 20px;
          color: #fff;
          transition: color 0.3s ease;
        }
        .navbar a:hover {
          color: #ffd700;
        }
        .hero {
          background-color: #007bff;
          color: white;
          padding: 100px 20px 80px;
          text-align: center;
          margin-top: 60px;
        }
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .hero p {
          font-size: 1.2rem;
        }
        .main-content {
          padding: 50px 20px;
          margin-top: -50px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        }
        .upload-section {
          margin-top: 20px;
          text-align: center;
        }
        input[type="file"] {
          border: 2px dashed #007bff;
          padding: 15px;
          width: 100%;
          max-width: 500px;
          background-color: #f9fafb;
          transition: border-color 0.3s ease;
          margin: 20px 0;
          cursor: pointer;
          border-radius: 8px;
        }
        input[type="file"]:hover {
          border-color: #0056b3;
        }
        button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
          margin-top: 20px;
        }
        button:hover {
          background-color: #218838;
        }
        .image-preview {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: block;
          opacity: 0;
          animation: fadeInScale 0.5s forwards;
        }
        
        .loading-spinner {
          border: 4px solid rgba(0, 123, 255, 0.3);
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }
        #result {
          margin-top: 20px;
          font-size: 1.4rem;
          color: #555;
          animation: fadeIn 1s ease;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .footer {
          background-color: #007bff;
          color: white;
          text-align: center;
          padding: 20px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero p {
            font-size: 1rem;
          }
          input[type="file"] {
            width: 90%;
          }
        }
      `}</style>
      
      <div className="navbar">
        <a href="http://localhost:5173/">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="hero">
        <h1>Fracture Detection Portal</h1>
        <p>Upload your Bone X-Rays or CT Scans and get AI-powered Fracture Detection Results</p>
      </div>

      <div className="container main-content">
        <h2>Upload Your Scan</h2>
        <p>Supported formats: JPG, PNG, GIF</p>

        <div className="upload-section">
          <input  className="inputs" type="file" onChange={handleFileChange} accept="image/*" />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
          <button onClick={handleDetectClick}>
            {loading ? <div className="loading-spinner"></div> : 'Detect Fracture'}
          </button>
        </div>

        <div id="result">{result}</div>
      </div>
    </div>
  );
}

export default Dashboard;
