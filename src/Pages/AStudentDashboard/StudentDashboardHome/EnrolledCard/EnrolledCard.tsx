import { useState } from "react";
import "./EnrolledCard.css";

const EnrolledCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card"
      tabIndex={0}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <img src="https://i.ibb.co.com/gLNfMXc0/graphics.jpg" alt="" />
      </div>
    </div>
  );
};

export default EnrolledCard;
