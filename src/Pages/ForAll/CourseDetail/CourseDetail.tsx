import { useParams } from "react-router";
import { useGetSpecificCourseQuery } from "../../../redux/api/features/Course/courseManagementApi";

const CourseDetail = () => {
  const { id } = useParams();

  const { data: CourseData } = useGetSpecificCourseQuery(id);
  const course = CourseData?.data;
  console.log("Course: ", course);

  return (
    <div>
      <h1>Course detail: {id} </h1>
    </div>
  );
};

export default CourseDetail;
