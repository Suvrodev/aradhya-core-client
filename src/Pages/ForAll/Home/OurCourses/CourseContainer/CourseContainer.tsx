import { useEffect, useState } from "react";
import { useGetAllCourseQuery } from "../../../../../redux/api/features/Course/courseManagementApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { TCourseBox } from "../../../../../utils/types/globalTypes";
import CourseBox from "./CourseBox/CourseBox";
import { setCourse } from "../../../../../redux/api/features/Course/courseSlice";

const CourseContainer = () => {
  const dispatch = useAppDispatch();
  const { serviceId } = useAppSelector((state) => state.selectService);
  const { data: CourseData, isLoading } = useGetAllCourseQuery(undefined);
  const courses = CourseData?.data;

  const [targetCourse, setTargetCourse] = useState<TCourseBox[]>([]);

  // Dispatch courses to redux
  useEffect(() => {
    if (courses?.length) {
      dispatch(setCourse(courses));
    }
  }, [courses, dispatch]);

  // Filter courses based on serviceId
  useEffect(() => {
    if (serviceId === "0") {
      setTargetCourse(courses);
    } else {
      const filteredCourses = courses.filter(
        (course: TCourseBox) => course.refServiceId === serviceId
      );
      setTargetCourse(filteredCourses);
    }
  }, [courses, serviceId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 rounded-lg border-[4px] border-white innerShadw p-6">
      {targetCourse?.map((data: TCourseBox, idx: number) => (
        <CourseBox key={idx} data={data} number={idx + 1} />
      ))}
    </div>
  );
};

export default CourseContainer;
