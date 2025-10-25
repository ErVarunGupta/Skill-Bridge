import React from "react";
import RatingStars from "./Review";
import "./MaterialCard.css";
import FixedRating from "./RatingStar";
import { handlePreview } from "../../../api/materialApi";

const MaterialCard = ({ material, onPreview }) => {
  let rating = 0;
  let totalRatings = material?.reviews?.length;
  material?.reviews?.map((rate) => {
    rating = rating + rate.rating;
  });

  console.log(material.fileUrl)


  return (
    <div className="material-card">
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      <p>
        <strong>Category:</strong> {material.category}
      </p>
      <FixedRating rating={rating / totalRatings} />
      <p>
        <strong>Visibility:</strong> {material.visibility}
      </p>
      <div className="card-actions">
        <button onClick={onPreview}>
          <i class="fa-solid fa-eye"></i> Preview
        </button>
        {material.visibility === "public" ? (
          <a onClick={() => handlePreview(material.fileUrl, material.title + ".pdf")} >
            <i class="fa-solid fa-download"></i> Download
          </a>
        ) : (
          <a>
            <i class="fa-solid fa-hand-holding-dollar"></i> Purchase
          </a>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
