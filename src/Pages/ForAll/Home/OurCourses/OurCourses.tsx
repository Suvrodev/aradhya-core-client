import "./OurCourses.css";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TCategory } from "../../../../utils/types/globalTypes";
import { useGetAllServiceQuery } from "../../../../redux/api/features/Service/serviceManagementApi";
import CourseContainer from "./CourseContainer/CourseContainer";
import ServiceBox from "./ServiceBox/ServiceBox";

const OurCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllServiceQuery(undefined);
  const categories = data?.data;
  // console.log("categories: ", categories);

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="  relative ">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Our All Courses
      </h1>

      <div className="relative px-12 ">
        {" "}
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hidden"
        >
          {categories?.map((category: TCategory, idx: number) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[90%] sm:w-[70%] md:w-[45%] lg:w-[24%]"
            >
              <ServiceBox key={idx} category={category} />
            </div>
          ))}
        </div>
        {/* Left & Right Navigation Buttons (Placed Outside) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 primaryBgColor rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-0 primaryBgColor rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      </div>

      <div className="mt-4 courseBackground">
        <CourseContainer />
      </div>
    </div>
  );
};

export default OurCourses;
