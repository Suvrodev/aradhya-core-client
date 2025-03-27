import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface TLiveCourse {
  liveCourse: { title: string; desc: string; image: string };
}

const LiveCourseBox = ({ liveCourse }: TLiveCourse) => {
  const { title, desc, image } = liveCourse;

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div
      data-aos="flip-right"
      data-aos-anchor-placement="top-bottom"
      className="border rounded-lg p-5 m-5 md:m-0"
    >
      <img
        className="w-[105px] h-[105px] rounded-full mx-auto my-6"
        src={image}
        alt=""
      />
      <h1 className="text-2xl my-4">{title}</h1>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

export default LiveCourseBox;
