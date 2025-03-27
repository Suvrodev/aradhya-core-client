import { useEffect, useState } from "react";
import LiveCourseBox from "./LiveCourseBox/LiveCourseBox";

const LiveCourse = () => {
  const [liveCourses, setLiveCourses] = useState([]);

  useEffect(() => {
    fetch("LiveCourse.json")
      .then((res) => res.json())
      .then((data) => setLiveCourses(data));
  }, []);

  return (
    <div className="text-center my-4 text-white">
      <h1 className="text-4xl font-bold">কি কি পাচ্ছেন লাইভ কোর্সে</h1>
      <p className="my-2">
        দেখে নিন কি কি পাচ্ছেন ওয়েভার আইটির লাইভ কোর্সে জয়েন করলে
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-4">
        {liveCourses.map((liveCourse, idx) => (
          <LiveCourseBox key={idx} liveCourse={liveCourse} />
        ))}
      </div>
    </div>
  );
};

export default LiveCourse;
