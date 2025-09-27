import React from "react";

const RatingStars = ({ rating }) => {
  return (
    <div className="rating-stars">
      {"⭐".repeat(rating)}{"☆".repeat(5 - rating)}
    </div>
  );
};

export default RatingStars;
