import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hook";
import { TCourseBox, TCourse } from "../../../../../utils/types/globalTypes"; // Ensure TCourse is imported
import CourseBox from "./CourseBox/CourseBox";
import CourseBoxLoading from "./CourseBox/CourseBoxLoading";

const CourseContainer = () => {
  const { serviceId } = useAppSelector((state) => state.selectService);
  const { courses } = useAppSelector((state) => state.courses);

  const [targetCourse, setTargetCourse] = useState<TCourseBox[]>([]);

  // Filter and map courses to TCourseBox format based on serviceId
  useEffect(() => {
    const mappedCourses: TCourseBox[] = courses.map((course: TCourse) => ({
      ...course, // Spread properties from TCourse
      courseDiscount: String(course.courseDiscount), // Convert courseDiscount to string
    }));

    if (serviceId === "0") {
      setTargetCourse(mappedCourses);
    } else {
      const filteredCourses = mappedCourses.filter(
        (course: TCourseBox) => course.refServiceId === serviceId
      );
      setTargetCourse(filteredCourses);
    }
  }, [courses, serviceId]);

  return (
    <div>
      {targetCourse.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white innerShadw p-6">
          {targetCourse?.map((data: TCourseBox, idx: number) => (
            <CourseBox key={idx} data={data} number={idx + 1} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white innerShadw p-6">
          <CourseBoxLoading />
          <CourseBoxLoading />
          <CourseBoxLoading />
          <CourseBoxLoading />
        </div>
      )}
    </div>
    // <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white innerShadw p-6">
    //   {targetCourse?.map((data: TCourseBox, idx: number) => (
    //     <CourseBox key={idx} data={data} number={idx + 1} />
    //   ))}
    // </div>
  );
};

export default CourseContainer;
