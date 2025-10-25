import React from "react";
import UploadForm from "../components/UploadForm";

function UploadPage() {
  const handleUpload = async (formDataState) => {
    try {
      const formData = new FormData();
      formData.append("title", formDataState.title);
      formData.append("category", formDataState.category);
      formData.append("description", formDataState.description);
      formData.append("visibility", formDataState.visibility);
      formData.append("file", formDataState.file);
      if (formDataState.image) {
        formData.append("image", formDataState.image);
      }

      const res = await fetch("http://localhost:8080/api/upload_material", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Material uploaded successfully!");
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Something went wrong while uploading.");
    }
  };

  return <UploadForm onSubmit={handleUpload} />;
}

export default UploadPage;
