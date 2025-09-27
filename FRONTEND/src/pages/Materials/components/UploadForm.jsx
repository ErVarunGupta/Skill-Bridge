import React, { useState } from "react";
import "./UploadForm.css";

function UploadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      category: "",
      file: null,
      image: null,
    });
    e.target.reset(); // reset file input fields
  };

  return (
    <div className="upload-container">
    <form className="upload-form" onSubmit={handleSubmit}>
      <h3>Upload Study Material</h3>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category (e.g., Web Development, Science)"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={4}
        required
      ></textarea>

      <label className="file-label">
        Upload File (PDF or document)
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
          required
        />
      </label>

      <label className="file-label">
        Upload Image (optional)
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn">
        Upload
      </button>
    </form>
    </div>
  );
}

export default UploadForm;
