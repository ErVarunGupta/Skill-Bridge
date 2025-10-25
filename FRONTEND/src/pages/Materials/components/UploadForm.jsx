import React, { useState } from "react";
import "./UploadForm.css";

function UploadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
    image: null,
    visibility: "public"
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if(type === "radio"){
      setFormData({...formData, visibility: value})
    }
    else if (files) {
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
      visibility: "public",
    });
    e.target.reset(); 
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

        <div className="visibility">
          <h4>Visibility</h4>
          <div
            className={`option ${
              formData.visibility === "public" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="visibility"
              id="public"
              value="public"
              checked={formData.visibility === "public"}
              onChange={handleChange}
            />
            <label htmlFor="public">Public</label>
          </div>
          <div
            className={`option ${
              formData.visibility === "private" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="visibility"
              id="private"
              value="private"
              checked={formData.visibility === "private"}
              onChange={handleChange}
            />
            <label htmlFor="private">Private</label>
          </div>
        </div>

        <button type="submit" className="btn">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
