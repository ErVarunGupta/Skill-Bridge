import React from "react";
import RatingStars from "./RatingStars";
import "./MaterialCard.css";

const MaterialCard = ({ material, onPreview }) => {
  return (
    <div className="material-card">
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      <p>
        <strong>Category:</strong> {material.category}
      </p>
      <RatingStars rating={material.rating} />
      <div className="card-actions">
        <button onClick={onPreview}>👁 Preview</button>
        <a href={material.fileUrl} download>
          ⬇ Download
        </a>
      </div>
    </div>
  );
};

export default MaterialCard;
