import React, { useState } from 'react';
import './UploadMaterial.css';

function UploadMaterial() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      alert('Please fill all fields and select a file.');
      return;
    }
    console.log('Uploading Material:', { title, description, file });
    alert('Material uploaded successfully!');
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Learning Material</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter material title"
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter material description"
          />
        </label>
        <label>
          Select File:
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button type="submit" className="upload-button">Upload Material</button>
      </form>
    </div>
  );
}

export default UploadMaterial;
