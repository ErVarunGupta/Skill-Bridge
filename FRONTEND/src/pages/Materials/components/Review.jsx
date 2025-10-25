import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { updateMaterial } from "../../../api/materialApi";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = useState(1);
  const [hover, setHover] = useState(-1);

  const [comment, setComment] = useState([]);

  const handleSubmit = async(FormData)=>{
    const formData = Object.fromEntries(FormData.entries());

    const material_id = localStorage.getItem('material_id');

    const result = updateMaterial({material_id, formData});
  }

  return (
    <form className="wow-section" action={handleSubmit}>
      <div className="wow-comment-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
        />
      </div>
      <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
        <Rating
          name="rating"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      {/* <RatingStars rating={material.rating} /> */}

      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
}
