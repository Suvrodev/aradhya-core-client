import "./OurCourses.css";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllServiceQuery } from "../../../../redux/api/features/Service/serviceManagementApi";
import CourseContainer from "./CourseContainer/CourseContainer";
import ServiceBox from "./ServiceBox/ServiceBox";
import { TService } from "../../../../utils/types/globalTypes";
import ServiceBoxSKL from "./ServiceBox/ServiceBoxSKL";

const OurCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllServiceQuery(undefined);
  const services = data?.data;
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

  // const isLoadings = true;

  if (isLoading) {
    return (
      <div>
        <div className="w-full md:w-1/2 h-[30px] mx-auto mb-10 skelitonAC "></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
          <div>
            <ServiceBoxSKL />
          </div>
          <div className="hidden md:block">
            <ServiceBoxSKL />
          </div>
          <div className="hidden md:block">
            <ServiceBoxSKL />
          </div>
          <div className="hidden md:block">
            <ServiceBoxSKL />
          </div>
        </div>
      </div>
    );
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
          {services?.map((service: TService, idx: number) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[90%] sm:w-[70%] md:w-[45%] lg:w-[24%]"
            >
              <ServiceBox key={idx} service={service} />
            </div>
          ))}
        </div>
        {/* Left & Right Navigation Buttons (Placed Outside) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 primaryBgColor rounded-full shadow-md hover:bg-gray-200 z-0"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-0 primaryBgColor rounded-full shadow-md hover:bg-gray-200 z-0"
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
