import { useTitle } from "../../../../Component/hook/useTitle";
import LoadingPage from "../../../../Component/LoadingPage/LoadingPage";
import { useGetAllCourseByAdminQuery } from "../../../../redux/api/features/Course/courseManagementApi";
import { TCourseBox } from "../../../../utils/types/globalTypes";
import CourseBox from "../CourseBox/CourseBox";

const AllCourses = () => {
  useTitle("All Course");
  const { data, isLoading } = useGetAllCourseByAdminQuery(undefined);
  const courses = data?.data;
  //   console.log(courses);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full p-2 md:p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">
        All Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {courses?.map((data: TCourseBox, idx: number) => (
          <CourseBox key={idx} course={data} admin={true} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
