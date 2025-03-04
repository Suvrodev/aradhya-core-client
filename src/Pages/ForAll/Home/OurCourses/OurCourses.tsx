import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CategoryBox from "./CategoryBox/CategoryBox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector } from "../../../../redux/hook";
import { TCategory } from "../../../../utils/types/globalTypes";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

const OurCourses = () => {
  const { categoryId } = useAppSelector((state) => state.selectCategory);
  console.log("Select Category in Parent div: ", categoryId);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    axios.get("/categories.json").then((res) => {
      setCategories(res?.data);
    });
  }, []);

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

  return (
    <div className="py-10  relative ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our All Courses
      </h1>

      {/* Mobile Slider */}
      <div className="block lg:hidden relative ">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {categories.map((category) => (
            <div key={category.id} className="snap-center shrink-0 w-[65%]">
              <CategoryBox category={category} />
            </div>
          ))}
        </div>

        {/* Left & Right Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronLeft size={30} className="text-gray-700" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronRight size={30} className="text-gray-700" />
        </button>
      </div>

      {/* Grid for Large Screens */}
      <div className="hidden lg:grid grid-cols-4 gap-6 ">
        {categories.map((category) => (
          <CategoryBox key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default OurCourses;
