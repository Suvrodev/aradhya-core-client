import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hook";
import {
  TCourse,
  TCourseBox,
  TService,
} from "../../../../utils/types/globalTypes";
import CourseBox from "../../Home/OurCourses/CourseContainer/CourseBox/CourseBox";

interface IProps {
  data: TService;
}
const AllCourseServiceSection = ({ data }: IProps) => {
  // console.log("Service: ", data?.serviceId);
  // const { data: courseData, isLoading } = useGetCourseUnderServiceQuery(
  //   data?.serviceId
  // );
  // const allCourses = courseData?.data;

  // // console.log("All Courses: ", allCourses);
  // if (isLoading) {
  //   return <p> Loading... </p>;
  // }

  const { courses } = useAppSelector((state) => state.courses);
  // console.log("All Courses: ", courses);
  const [targetCourse, setTargetCourse] = useState<TCourseBox[]>([]);

  // Filter and map courses to TCourseBox format based on serviceId
  useEffect(() => {
    const mappedCourses: TCourseBox[] = courses.map((course: TCourse) => ({
      ...course, // Spread properties from TCourse
      courseDiscount: String(course.courseDiscount), // Convert courseDiscount to string
    }));

    if (data?.serviceId === "0") {
      setTargetCourse(mappedCourses);
    } else {
      const filteredCourses = mappedCourses.filter(
        (course: TCourseBox) => course.refServiceId === data?.serviceId
      );
      setTargetCourse(filteredCourses);
    }
  }, [courses, data?.serviceId]);
  return (
    <div>
      <h1 className="text-center text-xl font-bold underline underline-offset-2 mb-6">
        {data?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white  innerShadw p-6">
        {targetCourse?.map((data: TCourseBox, idx: number) => (
          <CourseBox key={idx} data={data} number={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default AllCourseServiceSection;
