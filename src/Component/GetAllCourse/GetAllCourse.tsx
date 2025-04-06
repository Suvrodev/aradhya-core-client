import { useEffect } from "react";
import { useGetAllCourseQuery } from "../../redux/api/features/Course/courseManagementApi";
import { useAppDispatch } from "../../redux/hook";
import { setCourse } from "../../redux/api/features/Course/courseSlice";

const GetAllCourse = () => {
  const dispatch = useAppDispatch();
  const { data: CourseData, isLoading } = useGetAllCourseQuery(undefined);
  const courses = CourseData?.data;
  //   console.log("All Courses: ", courses);
  // Dispatch courses to redux
  useEffect(() => {
    if (courses?.length) {
      dispatch(setCourse(courses));
    }
  }, [courses, dispatch]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return null;
};

export default GetAllCourse;
