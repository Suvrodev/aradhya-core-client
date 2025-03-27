import axios from "axios";
import { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";

const Review = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get("review.json").then((res) => {
      setComments(res.data);
    });
  }, []);
  return (
    <div className="mb-4">
      <h1 className="text-4xl text-center">
        দেখে নিন কি বলছেন আরাধ্য কোর এর ইন্সট্রেকটর রা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {comments.map((c, idx) => (
          <ReviewBox key={idx} c={c} />
        ))}
      </div>
    </div>
  );
};

export default Review;
