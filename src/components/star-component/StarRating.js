import React, { useState } from "react";
import Star from "./Star";

const container = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};
const starContainer = {
  display: "flex",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  onUserRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  const handleRating = (rate) => {
    setRating(rate);
    onUserRating(rate);
  };
  return (
    <div style={container}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
            key={i}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;
